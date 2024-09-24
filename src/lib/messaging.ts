import { activateActor, isActorActive } from "./activation";
import { coerceActor } from "./coercion";
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
  return doSendMessage(actor, message);
}

/**
 * Convenience function to allow for awaiting
 * @param actor 
 * @param message 
 */
async function doSendMessage(actor: Actor, message: string): Promise<void> {
  if (!isActorStaged(actor)) stageActor(actor);
  if (!isActorActive(actor)) await activateActor(actor);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const navItem: HTMLElement = theatre.getNavItemById(`theatre-${actor.id}`);
  if (!navItem.classList.contains("theatre-control-nav-bar-item-speakingas")) {
    theatre.handleNavItemMouseUp({
      currentTarget: navItem,
      button: 0
    });
  }

  const chatBox: JQuery<HTMLTextAreaElement> = $("#chat-message");
  const previousChatValue = chatBox.val() ?? ""
  const previousChatFocus = chatBox.is(":selected");

  theatre.setUserTyping(game.user?.id, theatre.speakingAs);
  chatBox.val(message);
  chatBox.trigger("focus");

  chatBox.trigger(createEnterEvent("keydown"));
  chatBox.trigger(createEnterEvent("keyup"));

  chatBox.val(previousChatValue);
  if (!previousChatFocus) chatBox.trigger("blur");
}

function createEnterEvent(name: string) {
  return jQuery.Event(name, {
    which: 13,
    keyCode: 13,
    originalEvent: new KeyboardEvent(name, {
      code: "Enter",
      key: "Enter",
      charCode: 13,
      keyCode: 13,
      view: window,
      bubbles: true
    })
  });
}