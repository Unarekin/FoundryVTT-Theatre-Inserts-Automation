/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { log } from "./lib/log";
import api from "./lib/api";


Hooks.on("ready", () => {
  if (game instanceof Game && !game.modules.get("theatre")?.active) {
    ui.notifications?.error(game.i18n?.format("THEATREAUTOMATION.ERRORS.THEATREINSERTSNOTFOUND", { MODULENAME: __MODULE_TITLE__ }));
  } else {


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<any>window).TheatreAutomation = api;


    log(`Ready!`);
  }

});