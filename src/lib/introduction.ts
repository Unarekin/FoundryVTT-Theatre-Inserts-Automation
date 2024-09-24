import { activateActor, deactivateActor } from "./activation";
import { IntroductionApplicationData } from "./applications/interfaces";
import { IntroductionApplication } from "./applications/IntroductionApplication";
import { coerceActor } from "./coercion";
import { sendMessage } from "./messaging";
import { wait } from "./misc";
import { playSound } from "./sounds";


/**
 * Displays a form to gather data about an actor to introduce with optional music
 * @param {Actor} [selectedActor] {@link Actor} to default to selected
 * @returns {Promise<IntroductionApplicationData | undefined>} A promise that resolves with the data gathered from the form
 */
export async function getActorIntroData(selectedActor: unknown): Promise<IntroductionApplicationData | undefined> {
  return new Promise((resolve, reject) => {
    const actor = coerceActor(selectedActor);
    if (selectedActor !== undefined && !(actor instanceof Actor)) reject(new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR")));
    new IntroductionApplication({
      ...(actor ? { selectedActor: actor } : {})
    }).once("submit", resolve)
      .once("cancel", () => { resolve(undefined); })
      .render(true);
  });

}

/**
 * Displays an actor's Theatre insert, sends a text message, optionally plays a sound
 * @param actor 
 * @param message 
 * @param portraitWait 
 * @param musicWait 
 * @param sound 
 * @param closeWait
 */
export async function introduceActor(actor: unknown, message: string, portraitWait: number = 0, musicWait: number = 0, sound: PlaylistSound, closeWait: number = 0) {
  const actualActor = coerceActor(actor);
  if (!(actualActor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));

  const promises: Promise<void>[] = [];
  if (sound instanceof PlaylistSound)
    promises.push(wait(musicWait).then(() => playSound(sound)));

  promises.push(wait(portraitWait).then(() => {
    if (message) return sendMessage(actualActor, message).then(() => { if (closeWait) return wait(closeWait).then(() => { deactivateActor(actualActor) }) });
    else return activateActor(actualActor).then(() => { if (closeWait) return wait(closeWait).then(() => { deactivateActor(actualActor) }) });
  }));

  await Promise.all(promises);
}
