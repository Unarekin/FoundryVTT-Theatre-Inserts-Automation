import { log } from "./lib/log";

Hooks.on("ready", () => {
  if (game instanceof Game && !game.modules.get("theatre")?.active) {
    ui.notifications?.error(game.i18n?.format("THEATREINSERTSMACROS.ERRORS.THEATREINSERTSNOTFOUND", { MODULENAME: __MODULE_TITLE__ }));
  } else {


    log(`Ready!`);
  }

});