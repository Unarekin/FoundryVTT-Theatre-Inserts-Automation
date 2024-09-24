import { activateActor, isActorActive } from "./activation";
import { coerceActor } from "./coercion";
import { getTextFlyin, setTextFlyin } from "./flyins";

import { sendChatMessage } from "./misc";
import { isActorStaged, stageActor } from "./staging";

/**
 * Sends a message as an {@link Actor}
 * @param {string} id The {@link Actor}'s id
 * @param {string} message 
 * @param {Flyin} [flyin="typewriter"] {@link Flyin} Text fly-in animation type -- Will be reset after this message
 */
export function sendMessage(id: string, message: string, flyin?: string): Promise<void>
/**
 * Sends a message as an {@link Actor}
 * @param {string} name The {@link Actor}'s name
 * @param {string} message 
 * @param {Flyin} [flyin="typewriter"] {@link Flyin} Text fly-in animation type -- Will be reset after this message
 */
export function sendMessage(name: string, message: string, flyin?: string): Promise<void>
/**
 * Sends a message as an {@link Actor}
 * @param {Actor} actor The {@link Actor} object
 * @param {string} message 
 * @param {Flyin} [flyin="typewriter"] {@link Flyin} Text fly-in animation type -- Will be reset after this message
 */
export function sendMessage(actor: Actor, message: string, flyin?: string): Promise<void>
export function sendMessage(arg: unknown, message: string, flyin: string = "typewriter"): Promise<void> {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  if (!isActorStaged(actor)) stageActor(actor);
  return (isActorActive(actor) ? Promise.resolve() : activateActor(actor))
    .then(() => {
      if (!isActorSpeaking(actor)) setSpeakingAs(actor);
      const oldFlyin = getTextFlyin();
      setTextFlyin(flyin);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      sendChatMessage((<any>actor).name, message);
      setTextFlyin(oldFlyin);
    })
}

function setSpeakingAs(actor: Actor): void {
  if (!isActorStaged(actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.ACTORNOTSTAGED"));
  if (!isActorActive(actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.ACTORNOTACTIVE"));


  const navItem: HTMLElement = theatre.getNavItemById(`theatre-${actor.id}`) as HTMLElement;
  if (!navItem.classList.contains("theatre-control-nav-bar-item-speakingas")) {
    theatre.handleNavItemMouseUp({
      currentTarget: navItem,
      button: 0
    });
  }
}

/**
 * Returns whether or not a given {@link Actor} is activated in our chatbox
 * @param {string} name {@link Actor}'s name
 */
export function isActorSpeaking(name: string): boolean
/**
 * Returns whether or not a given {@link Actor} is activated in our chatbox
 * @param {string} id {@link Actor}'s id
 */
export function isActorSpeaking(id: string): boolean
/**
 * Returns whether or not a given {@link Actor} is activated in our chatbox
 * @param {Actor} actor {@link Actor}
 */
export function isActorSpeaking(actor: Actor): boolean
/**
 * Returns whether or not a given {@link Actor} is activated in our chatbox
 * @param {Token} token {@link Token} associated with the {@link Actor}
 */
export function isActorSpeaking(token: Token): boolean
export function isActorSpeaking(arg: unknown): boolean {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  const navItem: HTMLElement = theatre.getNavItemById(`theatre-${actor.id}`) as HTMLElement;
  return navItem.classList.contains("theatre-control-nav-bar-item-speakingas");
}

