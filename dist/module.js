"use strict";
(() => {
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

  // src/module.ts
  Hooks.on("ready", () => {
    if (game instanceof Game && !game.modules.get("theatre")?.active) {
      ui.notifications?.error(game.i18n?.format("THEATREINSERTSMACROS.ERRORS.THEATREINSERTSNOTFOUND", { MODULENAME: "Theatre Inserts Macros" }));
    } else {
      log(`Ready!`);
    }
  });
})();
//# sourceMappingURL=module.js.map
