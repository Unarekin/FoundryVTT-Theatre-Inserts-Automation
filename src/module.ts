/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { activateActor, deactivateActor, isActorActive } from "./lib/activation";
import { log } from "./lib/log";
import { sendMessage } from "./lib/messaging";
import { wait } from "./lib/misc";
import { isActorStaged, stageActor, unstageActor } from "./lib/staging";


Hooks.on("ready", () => {
  if (game instanceof Game && !game.modules.get("theatre")?.active) {
    ui.notifications?.error(game.i18n?.format("THEATREAUTOMATION.ERRORS.THEATREINSERTSNOTFOUND", { MODULENAME: __MODULE_TITLE__ }));
  } else {

    const api: object = {
      wait,
      activateActor,
      deactivateActor,
      isActorActive,
      isActorStaged,
      stageActor,
      unstageActor,
      sendMessage
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<any>window).TheatreAutomation = api;


    log(`Ready!`);
  }

});