import { activateActor, isActorActive } from "./activation";
import { coerceActor } from "./coercion";
import { ActorNotActiveError, ActorNotStagedError, InvalidActorError } from "./errors";

import { sendChatMessage } from "./misc";
import { isActorStaged, stageActor } from "./staging";

/**
 * Sends a message as an {@link Actor}
 * @param {string} id The {@link Actor}'s id
 * @param {string} message 
 */
export function sendMessage(id: string, message: string,): Promise<void>
/**
 * Sends a message as an {@link Actor}
 * @param {string} name The {@link Actor}'s name
 * @param {string} message 
 */
export function sendMessage(name: string, message: string,): Promise<void>
/**
 * Sends a message as an {@link Actor}
 * @param {Actor} actor The {@link Actor} object
 * @param {string} message 
 */
export function sendMessage(actor: Actor, message: string): Promise<void>
export function sendMessage(arg: unknown, message: string): Promise<void> {

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const actor = coerceActor(arg);
        if (!(actor instanceof Actor)) throw new InvalidActorError();
        if (!isActorStaged(actor)) stageActor(actor);
        if (!isActorActive(actor)) await activateActor(actor);
        if (!isActorSpeaking(actor)) setSpeakingAs(actor);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        sendChatMessage((<any>actor).name, message);

        resolve();
      } catch (err) {
        reject(err as Error);
      }
    })();
  });
}

function setSpeakingAs(actor: Actor): void {
  if (!isActorStaged(actor)) throw new ActorNotStagedError();
  if (!isActorActive) throw new ActorNotActiveError();


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
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  const navItem: HTMLElement = theatre.getNavItemById(`theatre-${actor.id}`) as HTMLElement;
  return navItem.classList.contains("theatre-control-nav-bar-item-speakingas");
}

