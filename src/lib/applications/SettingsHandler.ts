/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { NoChatHookError } from "../errors";


const POP_LINE_START = `let tweenId = "portraitPop";`;
const POP_LINE_END = `Theatre.instance._addDockTween(insert.imgId, tween, tweenId);`

const FLASH_LINE_START = `tweenId = "portraitFlash";`;
const FLASH_LINE_END = `Theatre.instance._addDockTween(insert.imgId, tween, tweenId);`;

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

      SettingsHandler.OverrideChatHook();

    });
  }

  /**
   * .... please do not look at this shameful, shameful fucntion
   */
  static OverrideChatHook() {
    const hook = SettingsHandler.FindChatHook();
    if (!hook) throw new NoChatHookError();


    let hasFunctionDeclaration: boolean = false;
    // Filter out stuff for later
    const lines: string[] = hook.fn.toString().split("\n")
      .filter((line: string, index: number, arr: string[]) => {
        // If we start with a "function" remove it
        if (line.trim().startsWith("function")) {
          hasFunctionDeclaration = true;
          return false;
        }
        // If we start with a "function", also remove the last line.
        if (hasFunctionDeclaration && index === arr.length - 1) return false;

        // Remove calls to KHelpers
        if (line.trim().startsWith("KHelpers")) return false;

        // Remove calls to Logger
        if (line.trim().startsWith("Logger")) return false;

        return true;
      });

    // Add conditionals for our tweens
    const popStart = lines.findIndex(line => line.trim() === POP_LINE_START);
    if (popStart !== -1) lines.splice(popStart, 0, `if (game.settings.get("${__MODULE_ID__}", "suppressPopAnimation") !== true) {`);
    const popEnd = lines.findIndex((line: string, index: number) => index > popStart && line.trim() === POP_LINE_END);
    if (popEnd !== -1) lines.splice(popEnd + 1, 0, `}`);

    const flashStart = lines.findIndex(line => line.trim() === FLASH_LINE_START);
    if (flashStart !== -1) lines.splice(flashStart, 0, `if (game.settings.get("${__MODULE_ID__}", "suppressFlashAnimation") !== true) {`);
    const flashEnd = lines.findIndex((line: string, index: number) => index > flashStart && line.trim() === FLASH_LINE_END);
    if (flashEnd !== -1) lines.splice(flashEnd + 1, 0, `}`);


    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const newFn = new Function("chatEntity", "_", "userId", lines.join("\n"));


    hook.fn = newFn;
  }


  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  static FindChatHook(): { hook: string, fn: Function, id: number, once: boolean } | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
    return (<any>Hooks.events).createChatMessage.find((elem: any) => elem.fn.toString().split("\n").some((line: string) => line.trim() === "let theatreId = null;"));
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
        if (!dock.typingBubble) return;
        else dock.typingBubble.renderable = false;
      })
    }, 100);
  }

  static ShowTypingIcons() {
    setTimeout(() => {
      SettingsHandler.IterateDocks(dock => {
        if (!dock.typingBubble) return;
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

    game.settings?.register(__MODULE_ID__, "suppressPopAnimation", {
      name: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDEPOPANIMATION.NAME"),
      hint: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDEPOPANIMATION.HINT"),
      default: false,
      type: Boolean,
      config: true,
      scope: "world"
    });

    game.settings?.register(__MODULE_ID__, "suppressFlashAnimation", {
      name: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDEFLASHANIMATION.NAME"),
      hint: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDEFLASHANIMATION.HINT"),
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