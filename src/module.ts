/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import api from "./lib/api";
import { getEmoteNames } from "./lib/emotes";
import { getFlyinAnimations } from "./lib/flyins";
import { getFonts } from "./lib/fonts";
import { getStandingAnimations } from "./lib/standing";
import { getSyntheticActor } from "./lib/synthetic";


Hooks.once("ready", async () => {
  if (game instanceof Game && !game.modules.get("theatre")?.active) {
    ui.notifications?.error(game.i18n?.format("THEATREAUTOMATION.ERRORS.THEATREINSERTSNOTFOUND", { MODULENAME: __MODULE_TITLE__ }));

  } else {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<any>window).TheatreAutomation = api;

    // Register templates
    await loadTemplates([
      `/modules/${__MODULE_ID__}/templates/intro/application.hbs`,
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<any>window).TheatreAutomation.STANDING_NAMES = getStandingAnimations();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<any>window).TheatreAutomation.FLYIN_NAMES = getFlyinAnimations();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<any>window).TheatreAutomation.FONT_NAMES = getFonts();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<any>window).TheatreAutomation.EMOTE_NAMES = getEmoteNames()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    libWrapper.register("theatre-inserts-automation", "Actors.prototype.get", function (wrapped: Function, ...args: unknown[]) {
      const synthetic = getSyntheticActor(args[0] as string);
      if (synthetic) {
        console.log("Synthetic actor:", synthetic);
        return synthetic;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      else return wrapped(...args);
    })
  }
});