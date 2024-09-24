import { log } from "./log";

/**
 * Waits a specified amount of time, then resolves.
 * @param {number} ms Time, in milliseconds, to wait.
 * @returns 
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

/**
 * 
 * @param alias 
 * @param message 
 */
export function sendChatMessage(alias: string, message: string) {
  const chatMessage = createChatMessage(alias, message);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
  const actualMessage = ChatMessage.create(chatMessage as any);
  actualMessage.then((...args: unknown[]) => { log("Message:", ...args) });
  // Hooks.callAll("createChatMessage", chatMessage, { modifiedTime: Date.now(), parent: null, render: true, renderSheet: false }, game.user?.id);
}

/**
 * Creates a {@link ChatMessage}-like object to be passed to the createChatMessage hook to spoof input from a user
 * @param {string} alias Alias to set for the string.  Set to actor's name if an actor, "narrator" if narrator
 * @param {string} message 
 */
export function createChatMessage(alias: string, message: string) {
  return {
    content: message,
    style: 2,
    author: game.user?.id,
    _id: foundry.utils.randomID(),
    type: "base",
    system: {},
    timestamp: Date.now(),
    flavor: "",
    speaker: {
      scene: null,
      actor: null,
      token: null,
      alias
    },
    whisper: [],
    blind: false,
    rolls: [],
    sound: null,
    emote: false,
    flags: {
      theatre: {
        theatreMessage: true
      }
    },
    _stats: {
      compendiumSource: null,
      duplicateSource: null,
      coreVersion: game.release?.version,
      systemId: game.system?.id,
      systemVersion: game.system?.version,
      createdTime: Date.now(),
      modifiedTime: Date.now(),
      lastModifiedBy: game.user?.id
    }
  };
}
