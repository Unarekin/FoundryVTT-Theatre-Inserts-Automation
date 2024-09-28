
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
  theatre.lastTyping = Date.now();
  theatre.setUserTyping(game.user?.id, theatre.speakingAs);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  (<any>theatre)._sendTypingEvent();

  const chatMessage = createChatMessage(alias, message);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
  ChatMessage.create(chatMessage as any);
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

/**
 * Determine if a given string is a valid hex color
 * @param {string} color 
 * @returns {boolean}
 */
export function isValidColor(color: string): boolean {
  if (!color || typeof color !== "string") return false;
  if (color.substring(0, 1) === "#") color = color.substring(1);
  switch (color.length) {
    case 3: return /^[0-9A-F]{3}$/i.test(color);
    case 6: return /^[0-9A-F]{6}$/i.test(color);
    case 8: return /^[0-9A-F]{8}$/i.test(color);
    default: return false;
  }
}

/**
 * 
 * @param url 
 * @returns 
 */
export function isValidURL(url: string): boolean {
  try {
    return Boolean(new URL(url, location.origin));
  } catch (err: unknown) {
    if (!(err instanceof TypeError)) throw err;
    return false;
  }
}

