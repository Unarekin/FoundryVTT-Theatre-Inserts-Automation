/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { activateActor } from "./activation";
import { coerceActor } from "./coercion";
import { wait } from "./misc";

export function sendTheatreMessage(actor: Actor, message: string, emote?: string, ttl?: number, deactivate?: boolean, unstage?: boolean): Promise<void>
export function sendTheatreMessage(id: string, message: string, emote?: string, ttl?: number, deactivate?: boolean, unstage?: boolean): Promise<void>
export function sendTheatreMessage(arg: Actor | string, message: string, emote?: string, ttl?: number, deactivate?: boolean, unstage?: boolean): Promise<void> {
  return doSendTheatreMessage(arg, message, emote, ttl, deactivate, unstage);
}


async function doSendTheatreMessage(arg: Actor | string, message: string, emote?: string, ttl?: number, deactivate?: boolean, unstage?: boolean): Promise<void> {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREINSERTMACROS.ERRORS.INVALIDACTOR"));

  await activateActor(actor);

  const navItem = theatre.getNavItemById(`theatre-${actor.id}`);

  // Activate insert in case it isn't for some reason
  if (!navItem.classList.contains("theatre-control-nav-bar-item-speakingas")) {
    theatre.handleNavItemMouseUp({
      currentTarget: navItem,
      button: 0
    });
  }

  const chatBox: JQuery<HTMLTextAreaElement> = $("#chat-message");
  const previousValue: string = chatBox.val() ?? "";
  const prevFocus: boolean = chatBox.is(":selected");


  theatre.setUserTyping(game.user?.id, theatre.speakingAs);

  if (emote) {
    theatre.isDelayEmote = true;
    theatre.setUserEmote(
      game.user?.id,
      `theatre-${actor.id}`,
      "emote",
      emote,
      false
    );

    if (ttl) {
      setTimeout(() => {
        theatre.isDelayEmote = false;
        theatre.setUserEmote(
          game.user?.id,
          `theatre-${actor.id}`,
          "emote",
          "",
          false
        );
      }, ttl);
    }
  }

  chatBox.trigger("focus");
  chatBox.val(message);
  chatBox.trigger(
    jQuery.Event("keydown", {
      which: 13,
      keyCode: 13,
      originalEvent: new KeyboardEvent("keydown", {
        code: "Enter",
        key: "Enter",
        charCode: 13,
        keyCode: 13,
        view: window,
        bubbles: true
      })
    })
  );

  chatBox.trigger(
    jQuery.Event("keyup", {
      which: 13,
      keyCode: 13,
      originalEvent: new KeyboardEvent("keyup", {
        code: "Enter",
        key: "Enter",
        charCode: 13,
        keyCode: 13,
        view: window,
        bubbles: true
      })
    })
  );


  // Return to previous state
  if (!prevFocus) chatBox.trigger("blur");
  chatBox.val(previousValue);


  await wait(ttl ?? 0)
  if (deactivate) theatre.removeInsertById(`theatre-${actor.id}`, false);
  if (unstage) {
    theatre.handleNavItemMouseUp({
      currentTarget: navItem,
      button: 2,
      ctrlKey: true
    })
  }
}
