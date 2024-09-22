/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { activateActor } from "./lib/activateActor";
import { log } from "./lib/log";


Hooks.on("ready", () => {
  if (game instanceof Game && !game.modules.get("theatre")?.active) {
    ui.notifications?.error(game.i18n?.format("THEATREINSERTSMACROS.ERRORS.THEATREINSERTSNOTFOUND", { MODULENAME: __MODULE_TITLE__ }));
  } else {

    const api: object = {
      activateActor
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<any>window).TheatreMacros = api;


    log(`Ready!`);
  }

});