import { activateActor, isActorActive } from "./activation";
import { coerceActor } from "./coercion";
import { log } from "./log";
import { sendChatMessage } from "./misc";
import { isActorStaged, stageActor } from "./staging";

/**
 * Sends a message as an {@link Actor}
 * @param {string} id The {@link Actor}'s id
 * @param {string} message 
 */
export function sendMessage(id: string, message: string): Promise<void>
/**
 * Sends a message as an {@link Actor}
 * @param {string} name The {@link Actor}'s name
 * @param {string} message 
 */
export function sendMessage(name: string, message: string): Promise<void>
/**
 * Sends a message as an {@link Actor}
 * @param {Actor} actor The {@link Actor} object
 * @param {string} message 
 */
export function sendMessage(actor: Actor, message: string): Promise<void>
export function sendMessage(arg: unknown, message: string): Promise<void> {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  if (!isActorStaged(actor)) stageActor(actor);
  return (isActorActive(actor) ? Promise.resolve() : activateActor(actor))
    .then(() => {
      log("Activated");
      if (!isActorSpeaking(actor)) setSpeakingAs(actor);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      sendChatMessage((<any>actor).name, message);
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

// export async function testActorHook(id: string, message: string) {
//   const actor = coerceActor(id);
//   if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));

//   if (!isActorActive(actor)) await activateActor(actor);

//   // const chatMessage = {
//   //   content: message,
//   //   style: 2,
//   //   author: game.user?.id,
//   //   _id: foundry.utils.randomID(),
//   //   type: "base",
//   //   system: {},
//   //   timestamp: Date.now(),
//   //   flavor: "",
//   //   speaker: {
//   //     scene: null,
//   //     actor: null,
//   //     token: null,
//   //     // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
//   //     alias: (<any>actor).name
//   //   },
//   //   whisper: [],
//   //   blind: false,
//   //   rolls: [],
//   //   sound: null,
//   //   emote: false,
//   //   flags: {
//   //     theatre: {
//   //       theatreMessage: true
//   //     }
//   //   },
//   //   _stats: {
//   //     compendiumSource: null,
//   //     duplicateSource: null,
//   //     systemId: game.system?.id,
//   //     systemVersion: game.system?.version,
//   //     createdTime: Date.now(),
//   //     modifiedTime: Date.now(),
//   //     lastModifiedBy: game.user?.id
//   //   }
//   // };

//   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
//   const chatMessage = createChatMessage((<any>actor).name, message);

//   theatre.setUserTyping(game.user?.id, `theatre-${actor.id}`);
//   Hooks.callAll("createChatMessage", chatMessage, { modifiedTime: Date.now(), parent: null, render: true, renderSheet: false }, game.user?.id);
// }


// export function testNarrationHook(message: string) {

//   // const chatMessage = {
//   //   content: message,
//   //   style: 2,
//   //   author: game.user?.id,
//   //   _id: foundry.utils.randomID(),
//   //   type: "base",
//   //   system: {},
//   //   timestamp: Date.now(),
//   //   flavor: "",
//   //   speaker: {
//   //     scene: null,
//   //     actor: null,
//   //     token: null,
//   //     alias: "Narrator"
//   //   },
//   //   whisper: [],
//   //   blind: false,
//   //   rolls: [],
//   //   sound: null,
//   //   emote: false,
//   //   flags: {
//   //     theatre: {
//   //       theatreMessage: true
//   //     }
//   //   },
//   //   _stats: {
//   //     compendiumSource: null,
//   //     duplicateSource: null,
//   //     coreVersion: game.release?.version,
//   //     systemId: game.system?.id,
//   //     systemVersion: game.system?.version,
//   //     createdTime: Date.now(),
//   //     modifiedTime: Date.now(),
//   //     lastModifiedBy: game.user?.id
//   //   }
//   // }


//   const chatMessage = createChatMessage("narrator", message);
//   // log("Chat message:", chatMessage);
//   Hooks.callAll("createChatMessage", chatMessage, { modifiedTime: Date.now(), parent: null, render: true, renderSheet: false }, game.user?.id);
// }