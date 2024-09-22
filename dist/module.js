"use strict";
(() => {
  // src/lib/log.ts
  var LOG_ICON = "\u{1F3AD}";
  var LOG_PREFIX = `${LOG_ICON} ${"Theatre Inserts Automation"}`;
  var log = wrappedConsoleFunc(console.log);
  var warn = wrappedConsoleFunc(console.warn);
  var error = wrappedConsoleFunc(console.error);
  var info = wrappedConsoleFunc(console.info);
  function wrappedConsoleFunc(original) {
    return function(...args) {
      const shouldLog = true ? true : typeof args[0] === "boolean" ? args[0] : false;
      const actualArgs = args;
      if (shouldLog)
        original(LOG_PREFIX, "|", ...actualArgs);
    };
  }

  // src/lib/coercion.ts
  function coerceActor(arg) {
    if (arg instanceof Actor) return arg;
    if (typeof arg === "string") {
      let actor = game.actors?.get(arg);
      if (actor) return actor;
      actor = game.actors?.getName(arg);
      if (actor) return actor;
    }
  }

  // src/lib/emotes.ts
  function setEmote(arg, emote) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
    return doSetEmote(actor, emote);
  }
  async function doSetEmote(actor, emote) {
    if (!isActorActive(actor)) await activateActor(actor);
    theatre.setUserEmote(
      game.user?.id,
      `theatre-${actor.id}`,
      "emote",
      emote,
      false
    );
  }
  function clearEmote(arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
    theatre.setUserEmote(game.user?.id, `theatre-${actor.id}`, "emote", "", false);
  }

  // src/lib/misc.ts
  async function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  // src/lib/activation.ts
  function activateActor(arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREINSERTSMACROS.ERRORS.INVALIDACTOR"));
    if (!theatre.getNavItemById(`theatre-${actor.id}`))
      Theatre.addToNavBar(actor);
    theatre.handleNavItemMouseUp({
      currentTarget: theatre.getNavItemById(`theatre-${actor.id}`),
      button: 2
    });
    return wait(1e3);
  }
  function deactivateActor(arg, unstage) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREINSERTSMACROS.ERRORS.INVALIDACTOR"));
    theatre.removeInsertById(`theatre-${actor.id}`, false);
    if (unstage) {
      theatre.handleNavItemMouseUp({
        currentTarget: theatre.getNavItemById(`theatre-${actor.id}`),
        button: 2,
        ctrlKey: true
      });
    }
    clearEmote(actor);
    return wait(1e3);
  }
  function isActorActive(arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREINSERTSMACROS.ERRORS.INVALIDACTOR"));
    const navItem = theatre.getNavItemById(`theatre-${actor.id}`);
    if (!navItem) return false;
    return navItem.classList.contains("theatre-control-nav-bar-item-speakingas");
  }

  // src/lib/staging.ts
  function isActorStaged(arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREINSERTSMACROS.ERRORS.INVALIDACTOR"));
    return !!theatre.getNavItemById(`theatre-${actor.id}`);
  }
  function stageActor(arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREINSERTSMACROS.ERRORS.INVALIDACTOR"));
    if (!isActorStaged(actor))
      Theatre.addToNavBar(actor);
  }
  function unstageActor(arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREINSERTSMACROS.ERRORS.INVALIDACTOR"));
    if (isActorStaged(actor)) {
      theatre.handleNavItemMouseUp({
        currentTarget: theatre.getNavItemById(`theatre-${actor.id}`),
        button: 2,
        ctrlKey: true
      });
    }
  }

  // src/lib/messaging.ts
  function sendMessage(arg, message) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREINSERTSMACROS.ERRORS.INVALIDACTOR"));
    return doSendMessage(actor, message);
  }
  async function doSendMessage(actor, message) {
    if (!isActorStaged(actor)) stageActor(actor);
    if (!isActorActive(actor)) await activateActor(actor);
    const navItem = theatre.getNavItemById(`theatre-${actor.id}`);
    if (!navItem.classList.contains("theatre-control-nav-bar-item-speakingas")) {
      theatre.handleNavItemMouseUp({
        currentTarget: navItem,
        button: 0
      });
    }
    const chatBox = $("#chat-message");
    const previousChatValue = chatBox.val() ?? "";
    const previousChatFocus = chatBox.is(":selected");
    theatre.setUserTyping(game.user?.id, theatre.speakingAs);
    chatBox.val(message);
    chatBox.trigger("focus");
    chatBox.trigger(createEnterEvent("keydown"));
    chatBox.trigger(createEnterEvent("keyup"));
    chatBox.val(previousChatValue);
    if (!previousChatFocus) chatBox.trigger("blur");
  }
  function createEnterEvent(name) {
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

  // src/lib/api.ts
  var api_default = {
    wait,
    activateActor,
    deactivateActor,
    isActorActive,
    isActorStaged,
    stageActor,
    unstageActor,
    sendMessage,
    setEmote,
    clearEmote
  };

  // src/module.ts
  Hooks.on("ready", () => {
    if (game instanceof Game && !game.modules.get("theatre")?.active) {
      ui.notifications?.error(game.i18n?.format("THEATREAUTOMATION.ERRORS.THEATREINSERTSNOTFOUND", { MODULENAME: "Theatre Inserts Automation" }));
    } else {
      window.TheatreAutomation = api_default;
      log(`Ready!`);
    }
  });
})();
//# sourceMappingURL=module.js.map
