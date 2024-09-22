/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */




import { coerceActor, coercePlaylist, coerceSound } from './coerceTypeOrId'
import { wait } from './misc';

export interface ActivateParams {
  actor: string | Actor,
  playlist?: string | Playlist,
  sound?: string | PlaylistSound,
  portraitWait?: number,
  musicWait?: number,
  ttl?: number
}

/**
 * Activates the insert for an {@link Actor}, staging it if necessary.
 * @param {string} id ID for the {@link Actor}
 * @returns {Promise<void>} A promise that resolves immediately.
 */
export function activateActor(id: string): void
/**
 * Activates the insert for an {@link Actor}, staging it if necessary.
 * @param {Actor} actor The {@link Actor} to activate.
 * @returns {Promise<void>} A promise that resolves immediately.
 */
export function activateActor(actor: Actor): void
/**
 * Activates the insert for an {@link Actor}, staging it if necessary.
 * @param {ActivateParams} params {@link ActivateParams}
 * @return {Promise<void>} A promise that resolves when all of ttl, musicWait, and portraitWait have elapsed.
 */
export function activateActor(params: ActivateParams): Promise<void>
export function activateActor(...args: unknown[]): Promise<void> {
  let actor: Actor | undefined;
  let playlist: Playlist | undefined;
  let sound: PlaylistSound | undefined;

  let musicWait = 0;
  let portraitWait = 0;

  let ttl = 0;


  if (typeof args[0] === "object") {
    const params = args[0] as ActivateParams;
    actor = coerceActor(params.actor);
    if (params.playlist) {
      playlist = coercePlaylist(params.playlist);
      if (!(playlist instanceof Playlist)) throw new Error(game.i18n?.localize("THEATREINSERTSMACROS.ERRORS.INVALIDPLAYLIST"));
    }
    if (params.sound && playlist instanceof Playlist) {
      sound = coerceSound(params.sound, playlist);
      if (!(sound instanceof PlaylistSound)) throw new Error(game.i18n?.localize("THEATREINSERTSMACROS.ERRORS.INVALIDSOUND"));
    }
    musicWait = params.musicWait ?? 0;
    portraitWait = params.portraitWait ?? 0;
    ttl = params.ttl ?? 0;

  } else {
    actor = coerceActor(args[0]);
  }

  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREINSERTSMACROS.ERRORS.INVALIDACTOR"));

  // Stage if necessary
  if (!theatre.getNavItemById(`theatre-${actor.id}`))
    Theatre.addToNavBar(actor);

  const promises: Promise<void>[] = [];
  if (playlist instanceof Playlist && sound instanceof PlaylistSound)
    promises.push(wait(musicWait ?? 0).then(() => { playlist.playSound(sound); }));

  promises.push(wait(portraitWait ?? 0).then(() => {
    theatre.handleNavItemMouseUp({
      currentTarget: theatre.getNavItemById(`theatre-${actor.id}`),
      button: 2
    });
  }));

  if (ttl)
    promises.push(wait(ttl));

  return Promise.all(promises).then(() => { });

}
