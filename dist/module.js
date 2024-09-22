"use strict";
(() => {
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
    return wait(1e3);
  }
  function isActorActive(arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREINSERTSMACROS.ERRORS.INVALIDACTOR"));
    const navItem = theatre.getNavItemById(`theatre-${actor.id}`);
    if (!navItem) return false;
    return navItem.classList.contains("theatre-control-nav-bar-item-speakingas");
  }

  // src/lib/log.ts
  var LOG_ICON = "\u{1F3AD}";
  var LOG_PREFIX = `${LOG_ICON} ${"Theatre Inserts Macros"}`;
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

  // src/lib/sendTheatreMessage.ts
  function sendTheatreMessage(arg, message, emote, ttl, deactivate, unstage) {
    return doSendTheatreMessage(arg, message, emote, ttl, deactivate, unstage);
  }
  async function doSendTheatreMessage(arg, message, emote, ttl, deactivate, unstage) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREINSERTMACROS.ERRORS.INVALIDACTOR"));
    await activateActor(actor);
    const navItem = theatre.getNavItemById(`theatre-${actor.id}`);
    if (!navItem.classList.contains("theatre-control-nav-bar-item-speakingas")) {
      theatre.handleNavItemMouseUp({
        currentTarget: navItem,
        button: 0
      });
    }
    const chatBox = $("#chat-message");
    const previousValue = chatBox.val() ?? "";
    const prevFocus = chatBox.is(":selected");
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
    if (!prevFocus) chatBox.trigger("blur");
    chatBox.val(previousValue);
    await wait(ttl ?? 0);
    if (deactivate) theatre.removeInsertById(`theatre-${actor.id}`, false);
    if (unstage) {
      theatre.handleNavItemMouseUp({
        currentTarget: navItem,
        button: 2,
        ctrlKey: true
      });
    }
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
    log("Staging:", actor, isActorStaged(actor));
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

  // src/module.ts
  Hooks.on("ready", () => {
    if (game instanceof Game && !game.modules.get("theatre")?.active) {
      ui.notifications?.error(game.i18n?.format("THEATREINSERTSMACROS.ERRORS.THEATREINSERTSNOTFOUND", { MODULENAME: "Theatre Inserts Macros" }));
    } else {
      const api = {
        wait,
        activateActor,
        deactivateActor,
        isActorActive,
        isActorStaged,
        stageActor,
        unstageActor,
        sendTheatreMessage
      };
      window.TheatreMacros = api;
      log(`Ready!`);
    }
  });
})();
//# sourceMappingURL=module.js.map
