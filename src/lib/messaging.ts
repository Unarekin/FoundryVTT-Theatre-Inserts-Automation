import { activateActor, isActorActive } from "./activation";
import { coerceInsert } from "./coercion";
import { InvalidActorError } from "./errors";
import { getTextFlyin, setTextFlyin } from "./flyins";
import { ActorInsert } from "./interfaces";

import { sendChatMessage } from "./misc";

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
  console.log("Messaging:", arg);
  const insert = coerceInsert(arg);
  if (!insert) throw new InvalidActorError();
  return (isActorActive(insert) ? Promise.resolve() : activateActor(insert))
    .then(() => {
      if (!isActorSpeaking(insert)) setSpeakingAs(insert);
      const oldFlyin = getTextFlyin();
      setTextFlyin(flyin);
      sendChatMessage(insert.name, message);
      setTextFlyin(oldFlyin);
    });

}

function setSpeakingAs(insert: ActorInsert): void {
  if (!isActorActive(insert)) activateActor(insert);
  const navItem: HTMLElement = theatre.getNavItemById(insert.imgId) as HTMLElement;
  if (!navItem.classList.contains("theatre-control-nav-bar-item-speakingas")) {
    theatre.handleNavItemMouseUp({
      currentTarget: navItem,
      button: 0
    })
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
/**
 * Returns whether or not an {@link Actor} is activated in our chatbox
 * @param {ActorInsert} insert {@link ActorInsert}
 */
export function isActorSpeaking(insert: ActorInsert): boolean
export function isActorSpeaking(arg: unknown): boolean {
  const insert = coerceInsert(arg);
  if (!insert) throw new InvalidActorError();
  const navItem: HTMLElement = theatre.getNavItemById(insert.imgId) as HTMLElement;
  if (!navItem) throw new InvalidActorError();
  return navItem.classList.contains("theatre-control-nav-bar-item-speakingas");
}

