import { ActorContext, PlaylistContext, SoundContext } from "./interfaces";

/**
 * Returns a simplified version of an {@link Actor}, appropriate for passing to an application form
 * @param {Actor} actor {@link Actor}
 * @returns {ActorContext} {@link ActorContext}
 */
export function getActorContext(actor: Actor): ActorContext {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const castActor: any = actor;
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    id: castActor.id,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    name: castActor.name,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    img: castActor.img,
    selected: false
  }
}

export function getPlaylistContext(playlist: Playlist): PlaylistContext {
  return {
    id: playlist.id ?? "",
    name: playlist.name,
    sounds: playlist.sounds.map(sound => getSoundContext(sound))
  }
}

/**
 * 
 * @param sound 
 * @returns 
 */
export function getSoundContext(sound: PlaylistSound): SoundContext {
  return {
    id: sound.id ?? "",
    name: sound.name,
    duration: sound.sound?.duration || 0,
    selected: false
  }
}