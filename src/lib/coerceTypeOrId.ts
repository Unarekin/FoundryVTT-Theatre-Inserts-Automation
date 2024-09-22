/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { log } from "./log";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/**
 * Retrieves an {@link Actor}
 * @param {unknown} arg A string id or name, or an {@link Actor}
 * @returns {Actor | undefined} {@link Actor} or undefined.
 */
export function coerceActor(arg: unknown): Actor | undefined {
  log("Coercing:", arg);
  if (arg instanceof Actor) return arg;
  if (typeof arg === "string") {
    let actor = game.actors?.get(arg);
    if (actor) return actor;
    actor = game.actors?.getName(arg);
    if (actor) return actor;
  }
}

/**
 * Retrieves a {@link Playlist}
 * @param {unkown} arg A string id or name, or a {@link Playlist}
 * @returns {Playlist | undefined} {@link Playlist} or undefined
 */
export function coercePlaylist(arg: unknown): Playlist | undefined {
  if (arg instanceof Playlist) return arg;
  if (typeof arg === "string") {
    let playlist = game.playlists?.get(arg);
    if (playlist) return playlist;
    playlist = game.playlists?.getName(arg);
    if (playlist) return playlist;
  }
}

/**
 * Retireves a {@link PlaylistSound} from a given {@link Playlist} by name, id, or {@link PlaylistSound}
 * @param {unknown} arg 
 * @param {unknown} playlist
 */
export function coerceSound(arg: unknown, playlist: unknown): PlaylistSound | undefined {
  if (arg instanceof PlaylistSound) return arg;

  const actualPlaylist = coercePlaylist(playlist);
  if (actualPlaylist && typeof arg === "string") {
    let sound = actualPlaylist.sounds.get(arg);
    if (sound instanceof PlaylistSound) return sound;
    sound = actualPlaylist.sounds.getName(arg);
    if (sound instanceof PlaylistSound) return sound;
  }
}

/**
 * Retrieves an id for an {@link Actor}, given the id, name, or {@link Actor}
 * @param {unknown} arg 
 */
export function coerceActorId(arg: unknown): string | undefined | null {
  const actor = coerceActor(arg);
  if (actor instanceof Actor) return actor.id;
}

/**
 * Retrieves an id for a given {@link Playlist}
 * @param {unknown} arg 
 * @returns 
 */
export function coercePlaylistId(arg: unknown): string | undefined | null {
  const playlist = coercePlaylist(arg);
  if (playlist instanceof Playlist) return playlist.id;
}

/**
 * Returns a {@link PlaylistSound} for a given id/name/{@link PlaylistSound} for a given {@link Playlist}
 * @param {unknown} arg 
 * @param {unknown} playlist 
 * @returns 
 */
export function coerceSoundId(arg: unknown, playlist: unknown): string | undefined | null {
  const sound = coerceSound(arg, playlist);
  if (sound instanceof PlaylistSound) return sound.id;
}