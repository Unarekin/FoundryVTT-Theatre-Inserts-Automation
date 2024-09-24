import { log } from "../log";
import EventEmitter from 'events';
import { ActorContext, EventMap, IntroductionApplicationData, IntroductionApplicationFormData, PlaylistContext } from "./interfaces";
import { DynamicSelect } from '../dynamicSelect.js';
import { getActorContext, getPlaylistContext } from "./sharedFunctionality";
import { MaybePromise, GetDataReturnType } from "@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs";
import { coerceActor, coercePlaylist, coerceSound } from "../coercion";





/**
 * 
 */
export class IntroductionApplication extends FormApplication<FormApplicationOptions, IntroductionApplicationData> implements EventEmitter<EventMap> {

  protected events = new EventEmitter<EventMap>();

  constructor(object: IntroductionApplicationData, options?: Partial<FormApplicationOptions>) {
    const mergedObject = foundry.utils.mergeObject(
      {
        musicWait: 0,
        portraitWait: 0,
        closeWait: 0,
        selectedActor: null,
        selectedSound: null
      },
      object
    )

    super(mergedObject, options);
    log("Options:", this.options);
  }

  protected _updateObject(_event: Event, formData?: IntroductionApplicationFormData): Promise<unknown> {
    log("updateObject:", formData);
    if (formData) {

      const actor = (formData.actorSelect ? coerceActor(formData.actorSelect) : null);
      if (!(actor instanceof Actor)) throw new Error("THEATREAUTOMATION.ERRORS.INVALIDACTOR");

      let playlist: Playlist | undefined;
      let sound: PlaylistSound | undefined;
      if (formData.soundSelect) {
        const [playlistId, soundId] = formData.soundSelect.split("-");
        playlist = coercePlaylist(playlistId);
        if (playlist instanceof Playlist) sound = coerceSound(soundId, playlist);
      }

      this.object = {
        selectedActor: actor,
        selectedSound: sound,
        musicWait: formData.musicWait ?? 0,
        portraitWait: formData.portraitWait ?? 0,
        introMessage: formData.introMessage ?? "",
        closeWait: formData.closeWait ?? 0
      }
    }

    return Promise.resolve();
  }

  protected override _render(force?: boolean, options?: Application.RenderOptions<FormApplicationOptions>): Promise<void> {
    return super._render(force, options)
      .then(() => { this.emit("render"); });
  }

  override async close(options?: FormApplication.CloseOptions): Promise<void> {
    await super.close(options);
    if (options?.submit) this.emit("submit", this.object);
    else this.emit("cancel");
    this.emit("close");
  }

  override getData(options?: Partial<FormApplicationOptions>): MaybePromise<GetDataReturnType<FormApplication.FormApplicationData<FormApplicationOptions, IntroductionApplicationData>>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const playlists: PlaylistContext[] = game.playlists.contents.map((playlist: Playlist) => getPlaylistContext(playlist)) as PlaylistContext[];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const actors: ActorContext[] = game.actors.contents.map((actor: Actor) => ({
      ...getActorContext(actor),
      ...(this.object?.selectedActor?.id === actor.id ? { selected: true } : { selected: false })
    }));

    const localContext = {
      actors,
      playlists,
      introMessage: this.object.introMessage
    };

    const parentContext = super.getData(options);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    if (typeof (<any>parentContext).then === "function") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (<Promise<any>>parentContext).then((data: object) => foundry.utils.mergeObject(data, localContext));
    } else {
      return foundry.utils.mergeObject(parentContext, localContext);
    }
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(
      super.defaultOptions,
      {
        title: game.i18n?.localize("THEATREAUTOMATION.DIALOGS.INTRO.TITLE") || "",
        template: `/modules/${__MODULE_ID__}/templates/intro/application.hbs`,
        closeOnSubmit: true,
        submitOnClose: false,
        submitOnChange: false
      }
    );
  }


  activateListeners(html: JQuery<HTMLElement>) {
    super.activateListeners(html);

    new DynamicSelect("#actorSelect", {
      name: "actorSelect",
      onChange: (value: string, text: string, option: unknown) => {
        log("Dynamic select:", value, text, option);
      }
    });


    html.find("input[type='number']").on("focus", function () { $(this).trigger("select"); });

    html.find("[data-action='submit']").on("click", (e) => {
      this.close({ submit: true });
      e.preventDefault();
    });
    html.find("[data-action='cancel']").on("click", (e) => {
      this.close({ submit: false });
      e.preventDefault();
    })
  }

  // #region EventEmitter Implementation

  // [EventEmitter.captureRejectionSymbol]?<K>(error: Error, event: keyof EventMap | K, ...args: K extends keyof EventMap ? EventMap[K] : never): void {
  //   throw new Error("Method not implemented.");
  // }
  addListener<K>(eventName: keyof EventMap | K, listener: K extends keyof EventMap ? EventMap[K] extends unknown[] ? (...args: EventMap[K]) => void : never : never): this {
    this.events.addListener<K>(eventName, listener);
    return this;
  }
  on<K>(eventName: keyof EventMap | K, listener: K extends keyof EventMap ? EventMap[K] extends unknown[] ? (...args: EventMap[K]) => void : never : never): this {
    this.events.on<K>(eventName, listener);
    return this;
  }
  once<K>(eventName: keyof EventMap | K, listener: K extends keyof EventMap ? EventMap[K] extends unknown[] ? (...args: EventMap[K]) => void : never : never): this {
    this.events.once<K>(eventName, listener);
    return this;
  }
  removeListener<K>(eventName: keyof EventMap | K, listener: K extends keyof EventMap ? EventMap[K] extends unknown[] ? (...args: EventMap[K]) => void : never : never): this {
    this.events.removeListener<K>(eventName, listener);
    return this;
  }
  off<K>(eventName: keyof EventMap | K, listener: K extends keyof EventMap ? EventMap[K] extends unknown[] ? (...args: EventMap[K]) => void : never : never): this {
    this.events.off<K>(eventName, listener);
    return this;
  }
  removeAllListeners(eventName?: unknown): this {
    this.events.removeAllListeners(eventName);
    return this;
  }
  setMaxListeners(n: number): this {
    this.events.setMaxListeners(n);
    return this;
  }
  getMaxListeners(): number {
    return this.events.getMaxListeners();
  }
  listeners<K>(eventName: keyof EventMap | K): (K extends keyof EventMap ? EventMap[K] extends unknown[] ? (...args: EventMap[K]) => void : never : never)[] {
    return this.events.listeners<K>(eventName);
  }
  rawListeners<K>(eventName: keyof EventMap | K): (K extends keyof EventMap ? EventMap[K] extends unknown[] ? (...args: EventMap[K]) => void : never : never)[] {
    return this.events.rawListeners<K>(eventName);
  }
  emit<K>(eventName: keyof EventMap | K, ...args: K extends keyof EventMap ? EventMap[K] : never): boolean {
    return this.events.emit<K>(eventName, ...args);
  }
  listenerCount<K>(eventName: keyof EventMap | K, listener?: (K extends keyof EventMap ? EventMap[K] extends unknown[] ? (...args: EventMap[K]) => void : never : never)): number {
    return this.events.listenerCount<K>(eventName, listener);
  }
  prependListener<K>(eventName: keyof EventMap | K, listener: K extends keyof EventMap ? EventMap[K] extends unknown[] ? (...args: EventMap[K]) => void : never : never): this {
    this.events.prependListener<K>(eventName, listener);
    return this;
  }
  prependOnceListener<K>(eventName: keyof EventMap | K, listener: K extends keyof EventMap ? EventMap[K] extends unknown[] ? (...args: EventMap[K]) => void : never : never): this {
    this.events.prependOnceListener<K>(eventName, listener);
    return this;
  }
  eventNames(): ("render" | "submit" | "cancel" | "close")[] {
    return this.events.eventNames();
  }

  // #endregion

}