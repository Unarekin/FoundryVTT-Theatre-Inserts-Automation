import { log } from "../log";
import EventEmitter from 'events';


type EventMap = {
  'render': [html: JQuery<HTMLElement>];
  'submit': [data: object];
  'cancel': [];
  'close': [data?: object];
}


export class IntroductionApplication extends FormApplication implements EventEmitter<EventMap> {
  protected events = new EventEmitter<EventMap>();

  protected async _updateObject(event: Event, formData?: object): Promise<unknown> {
    log("updateObject:", formData);
    return Promise.resolve();
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(
      super.defaultOptions,
      {
        template: `/modules/${__MODULE_ID__}/templates/intro/application.hbs`
      }
    );
  }


  activateListeners(html: JQuery<HTMLElement>) {
    super.activateListeners(html);
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