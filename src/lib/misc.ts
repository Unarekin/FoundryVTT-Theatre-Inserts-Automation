
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


/**
 * Generates a semi-random color, returning a hex string
 * @returns 
 */
export function randomColor(): string {
  const goldenRatio = 0.618033988749895;
  let h = Math.random();
  h += goldenRatio;
  h %= 1;

  const s = 0.5;
  const v = 0.95;

  // Convert to RGB
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  let r=0;
  let g=0;
  let b=0;

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return [
    "#",
    Math.floor(r*255).toString(16).padStart(2,"0"),
    Math.floor(g*255).toString(16).padStart(2,"0"),
    Math.floor(b*255).toString(16).padStart(2,"0")
  ].join("");
}