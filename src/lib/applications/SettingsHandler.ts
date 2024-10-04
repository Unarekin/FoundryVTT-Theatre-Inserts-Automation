/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { log } from "../log";



export default class SettingsHandler {
  static {
    Hooks.on("theatreDockActive", () => {
      if (SettingsHandler.GetSetting<boolean>("hideActorName")) SettingsHandler.HideActorNames();
      if (SettingsHandler.GetSetting<boolean>("hideTextBox")) SettingsHandler.HideTextBox();
      if (SettingsHandler.GetSetting<boolean>("hideTypingIcon")) SettingsHandler.HideTypingIcons();
    });


    Hooks.once("ready", () => {
      if (game.settings?.get(__MODULE_ID__, "hideTextBox")) SettingsHandler.HideTextBox();
      else SettingsHandler.ShowTextBox();
    })
  }

  static GetSetting<t = unknown>(setting: string): t {
    return game.settings?.get(__MODULE_ID__, setting) as t;
  }

  static HideActorNames() {
    SettingsHandler.IterateDocks(dock => { dock.name = ""; });
  }

  static HideTypingIcons() {
    setTimeout(() => {
      SettingsHandler.IterateDocks(dock => {
        if (!dock.typingBubble) log("No typing bubble:", dock);
        else dock.typingBubble.renderable = false;
      })
    }, 100);
  }

  static ShowTypingIcons() {
    setTimeout(() => {
      SettingsHandler.IterateDocks(dock => {
        if (!dock.typingBubble) log("No typing bubble:", dock);
        else dock.typingBubble.renderable = true;
      })
    }, 100);
  }

  static HideTextBox() {
    $("#theatre-bar").css("opacity", 0);
  }

  static ShowTextBox() {
    $("#theatre-bar").css("opacity", 1);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static IterateDocks(func: (dock: any) => void): void {
    theatre.portraitDocks.forEach(func);
  }

  static RegisterSettings() {
    game.settings?.register(__MODULE_ID__, "hideTextBox", {
      name: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDECHATBOX.NAME"),
      hint: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDECHATBOX.HINT"),
      default: false,
      type: Boolean,
      config: true,
      scope: "world",
      onChange: (value: boolean) => {
        if (value) SettingsHandler.HideTextBox();
        else SettingsHandler.ShowTextBox()
      }
    });

    game.settings?.register(__MODULE_ID__, "hideActorName", {
      name: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDEACTORNAME.NAME"),
      hint: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDEACTORNAME.HINT"),
      default: false,
      type: Boolean,
      config: true,
      scope: "world",
      onChange: (value: boolean) => {
        if (value) SettingsHandler.HideActorNames();
      }
    });

    game.settings?.register(__MODULE_ID__, "hideTypingIcon", {
      name: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDETYPINGICON.NAME"),
      hint: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDETYPINGICON.HINT"),
      default: false,
      type: Boolean,
      config: true,
      scope: "world",
      onChange: hide => {
        if (hide) SettingsHandler.HideTypingIcons();
        else SettingsHandler.ShowTypingIcons();
      }
    });

    game.settings?.register(__MODULE_ID__, "hideSpeakingAnimation", {
      name: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDESPEAKANIMATION.NAME"),
      hint: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDESPEAKANIMATION.HINT"),
      default: false,
      type: Boolean,
      config: true,
      scope: "world"
    });


    // Hooks.on("theatre")
  }
}
/*

*/