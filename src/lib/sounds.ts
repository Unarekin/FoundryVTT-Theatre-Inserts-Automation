import { coerceActor, coercePlaylist, coerceSound } from "./coercion";

/**
 * Plays a given {@link PlaylistSound}
 * @param {PlaylistSound} sound {@link PlaylistSound} to play
 */
export function playSound(sound: PlaylistSound) {
  sound?.parent?.playSound(sound);
}

/**
 * Fades a given sound out, by a given duration.
 * @param {PlaylistSound} sound {@link PlaylistSound} to fade
 * @param {number} [duration=500] Duration of the fade, in milliseconds
 * @returns {Promise<void>} A Promise<void> that resolves when the fade is complete.
 */
export function fadeOutSound(sound: PlaylistSound, duration: number = 500): Promise<void> {
  return fadeSoundFrom(sound, duration, sound.sound?.volume || 0);
}

/**
 * Fades a given sound in, by a given duration
 * @param {PlaylistSound} sound {@link PlaylistSound} to fade in.
 * @param {number} [duration=500] Duration of the fade, in milliseconds.
 * @param {number} volume 
 * @returns {Promise<void>} A Promise<void> that reoslves when the fade is complete.
 */
export function fadeInSound(sound: PlaylistSound, duration: number = 500, volume: number = 1): Promise<void> {
  return fadeSoundFrom(sound, duration, 0, volume);
}

/**
 * Crossfades between two {@link PlaylistSound}s
 * @param {PlaylistSound} currentSound {@link PlaylistSound} that is currently playing, will be faded out
 * @param {PlaylistSound} newSound {@link PlaylistSound} that will be faded to
 * @param {number} [duration=500] Duration of hte fade out and in, in milliseconds
 * @param {number} [newSoundVolume=1] Ending volume of the new sound, from 0-1
 */
export function crossFadeSounds(currentSound: PlaylistSound, newSound: PlaylistSound, duration: number, newSoundVolume: number = 1): Promise<void> {
  return Promise.all([
    fadeOutSound(currentSound, duration),
    fadeInSound(newSound, duration, newSoundVolume)
  ])
    .then(() => { });
}

/**
 * 
 * @param {PlaylistSound} sound {@link PlaylistSound} to fade
 * @param {number} duration Duration of the fade, in milliseconds
 * @param {number} [startVolume] Starting volume from which to fade, from 0-1
 * @param {number} [endVolume=1] Ending volume to which to fade, from 0-1
 * @returns {Promise<void>} A Promise<void> that resolves when the fade is complete.
 */
function fadeSoundFrom(sound: PlaylistSound, duration: number, startVolume: number = 0, endVolume: number = 1): Promise<void> {
  if (!(sound?.sound instanceof Sound)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDSOUND"));

  if (typeof startVolume === "undefined") startVolume = sound.sound.volume || 0;
  sound.sound.volume = startVolume;

  return sound.sound.fade(endVolume, { duration });
}


/**
 * Retrieves a {@link PlaylistSound} named "Intro" on a {@link Playlist} that shares a name with the supplied {@link Actor}
 * @param {Actor} actor {@link Actor} for which to get the default sound
 * @returns {PlaylistSound|undefined} The {@link PlaylistSound}, or undefined if it was not found.
 */
export function getDefaultIntroSong(actor: unknown): PlaylistSound | undefined {
  const actualActor = coerceActor(actor);
  if (!(actualActor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR") || "Invalid actor");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  const playlist = coercePlaylist((<any>actualActor).name);
  if (!(playlist instanceof Playlist)) return;

  const song = coerceSound("Intro", playlist);
  if (song instanceof PlaylistSound) return song;
}