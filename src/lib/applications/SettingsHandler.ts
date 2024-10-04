/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { InvalidActorError, NoChatHookError } from "../errors";


const POP_LINE_START = `let tweenId = "portraitPop";`;
const POP_LINE_END = `Theatre.instance._addDockTween(insert.imgId, tween, tweenId);`

const FLASH_LINE_START = `tweenId = "portraitFlash";`;
const FLASH_LINE_END = `Theatre.instance._addDockTween(insert.imgId, tween, tweenId);`;

interface MessageHook {
  hook: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  fn: Function;
  once: boolean;
}

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

      SettingsHandler.OverrideCreateMessageHook();

    });

    Hooks.on("createChatMessage", async (message: ChatMessage, data: unknown, userId: string) => {
      if (message.getFlag("theatre", "theatreMessage")) {
        // It's a theatre message, yo
        if (!message.speaker.alias) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          const typing = (<any>theatre).usersTyping[userId];
          if (!typing) return;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
          const actorId = typing.theatreId.split("-")[1];
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
          const actor = game.actors.get(actorId);
          if (!(actor instanceof Actor)) throw new InvalidActorError();


          // Add the actor portrait to the message if Chat Portraits is active and one isn't set
          if (game.modules?.get("chat-portrait").active) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const portrait = message.getFlag("chat-portrait", "src");
            if (!portrait) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              await message.setFlag("chat-portrait", "src", (<any>actor).img);
            }
          }
          message.updateSource({
            speaker: {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
              alias: (<any>actor).name,
            }
          }, { recursive: true });
        }
      }
    });
  }

  /**
   * .... please do not look at this shameful, shameful fucntion
   */
  static OverrideCreateMessageHook() {
    const hook = SettingsHandler.FindCreateMessageHook();
    if (!hook) throw new NoChatHookError();


    let hasFunctionDeclaration: boolean = false;

    const lines: string[] = hook.fn
      .toString()
      .split("\n")
      .filter((line: string, index: number, arr: string[]): boolean => {
        const trimmed = line.trim();

        // Trim out function declaration
        if (trimmed.startsWith("function")) {
          hasFunctionDeclaration = true;
          return false;
        }

        // And final closing brace if there's a function definition
        if (index === arr.length - 1 && hasFunctionDeclaration) return false;

        // Remove calls to KHelpers, because the object won't be in scope
        if (trimmed.startsWith("KHelpers")) return false;
        // Same with calls to Logger
        if (trimmed.startsWith("Logger")) return false;

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

    console.log(lines.join("\n"));


    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const newFn = new Function("chatEntity", "_", "userId", lines.join("\n"));

    // console.log(newFn.toString());

    hook.fn = newFn;
  }

  static FindHook(name: string, lookup: string): MessageHook | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
    return (<any>Hooks.events)[name].find((elem: any) => elem.fn.toString().split("\n").some((line: string) => line.trim() === lookup));
  }

  static FindPreCreateMessageHook(): MessageHook | undefined {
    return SettingsHandler.FindHook("preCreateChatMessage", `Logger.debug("preCreateChatMessage", chatMessage);`);
  }

  static FindCreateMessageHook(): MessageHook | undefined {
    return SettingsHandler.FindHook("createChatMessage", `Logger.debug("createChatMessage");`);
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