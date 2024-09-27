/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ActorInsert } from "./interfaces";
import { getInserts } from "./misc";

/**
 * Retrieves an {@link Actor}
 * @param {unknown} arg A string id or name, or an {@link Actor}
 * @returns {Actor | undefined} {@link Actor} or undefined.
 */
export function coerceActor(arg: unknown): Actor | undefined | null {
  if (arg instanceof Actor) return arg;
  if (arg instanceof Token) return arg.actor;
  if (typeof arg === "string") {
    let actor = game.actors?.get(arg);
    if (actor) return actor;
    actor = game.actors?.getName(arg);
    if (actor) return actor;

  }
}

/**
 * Retrieves an {@link ActorInsert} by id, name, Actor, Token, or an actual {@link ActorInsert}
 * @param {unknown} arg 
 */
export function coerceInsert(arg: unknown): ActorInsert | undefined {
  if (arg instanceof Actor) return coerceInsert(arg.id);
  if (arg instanceof Token && arg.actor instanceof Actor) return coerceInsert(arg.actor.id);
  if ((arg as ActorInsert)?.imgId !== undefined) return arg as ActorInsert;
  if (typeof arg === "string") {
    return getInserts().find(insert => insert.imgId === `theatre-${arg}` || insert.name === arg);
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