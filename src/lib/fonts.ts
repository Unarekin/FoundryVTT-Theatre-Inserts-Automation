import { currentlyActive, currentlySpeaking } from "./activation";
import { coerceInsert } from "./coercion";
import { ActorNotActiveError, InvalidActorError, InvalidFontColorError, InvalidFontError, InvalidFontSizeError } from "./errors";
import { FontSize, FontConfig } from "./interfaces";
import { isValidColor } from "./misc";


const DEFAULT_FONT_NAME = getFonts()[0];
const DEFAULT_FONT_SIZE = 2;
const DEFAULT_FONT_COLOR = "#ffffff";

/**
 * Retrieves a list of fonts that Theatre Inserts knows about
 */
export function getFonts(): string[] {
  return Object.values(game.settings?.settings.get("theatre.nameFont")?.choices ?? []);
}

/**
 * Returns whether or not a given font name is a valid font that Theatre Inserts knows about
 * @param {string} font 
 * @returns {boolean}
 */
export function isValidFont(font: string): boolean {
  return getFonts().includes(font);
}

/**
 * Retrieves {@link FontConfig} for the currently speaking or active {@link Actor} if there is only one
 * @returns {FontConfig} {@link FontConfig}
 */
export function getFont(): FontConfig
/**
 * Retrieves {@link FontConfig} for a given {@link Actor}
 * @param {string} id {@link Actor}'s id
 * @returns {FontConfig} {@link FontConfig}
 */
export function getFont(id: string): FontConfig
/**
 * Retrieves {@link FontConfig} for a given {@link Actor}
 * @param {string} name {@link Actor}'s name
 * @returns {FontConfig} {@link FontConfig}
 */
export function getFont(name: string): FontConfig
/**
 * Retrieves {@link FontConfig} for a given {@link Actor}
 * @param {Actor} actor {@link Actor}
 * @returns {FontConfig} {@link FontConfig}
 */
export function getFont(actor: Actor): FontConfig
/**
 * Retrieves {@link FontConfig} for a given {@link Actor}
 * @param {Token} token {@link Token}
 * @returns {FontConfig} {@link FontConfig}
 */
export function getFont(token: Token): FontConfig
/**
 * Retrieves {@link FontConfig} for the narrator
 * @returns {FontConfig} {@link FontConfig}
 */
export function getFont(name: "narrator"): FontConfig
export function getFont(arg?: unknown): FontConfig {
  if (arg === "narrator") {
    return {
      name: theatre.theatreNarrator.getAttribute("textfont") || DEFAULT_FONT_NAME,
      color: theatre.theatreNarrator.getAttribute("textcolor") || DEFAULT_FONT_COLOR,
      size: (parseInt(theatre.theatreNarrator.getAttribute("textsize") ?? "") || DEFAULT_FONT_SIZE) as FontSize
    };
  } else if (arg) {
    const insert = coerceInsert(arg);
    if (!insert) throw new InvalidActorError();

    return {
      name: insert.textFont || DEFAULT_FONT_NAME,
      color: insert.textColor || DEFAULT_FONT_COLOR,
      size: (parseInt(insert.textSize ?? "0") || DEFAULT_FONT_SIZE) as FontSize
    }
  } else {
    let actor: Actor | null = null;
    const speaking = currentlySpeaking();
    const active = currentlyActive();
    if (speaking instanceof Actor) actor = speaking;
    else if (active.length === 1 && active[0] instanceof Actor) actor = active[0];

    if (!(actor instanceof Actor)) throw new InvalidActorError();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const insert = theatre.getInsertById(`theatre-${actor.id}`);
    if (!insert) throw new ActorNotActiveError();

    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      name: insert.textFont || DEFAULT_FONT_NAME,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      color: insert.textColor || DEFAULT_FONT_COLOR,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      size: (parseInt(insert.textSize) || DEFAULT_FONT_SIZE) as FontSize
    }
  }
}

/**
 * Sets font settings for the currently speaking, or active {@link Actor} if only one
 * @param {FontConfig} config {@link FontConfig}
 */
export function setFont(config: Partial<FontConfig>): void
/**
 * Sets font settings for a given {@link Actor}
 * @param {FontConfig} config {@link FontConfig}
 * @param {string} id {@link Actor}'s id
 */
export function setFont(config: Partial<FontConfig>, id: string): void
/**
 * Sets font settings for a given {@link Actor}
 * @param {FontConfig} config {@link FontConfig}
 * @param {string} name {@link Actor}'s name
 */
export function setFont(config: Partial<FontConfig>, name: string): void
/**
 * Sets font settings for a given {@link Actor}
 * @param {FontConfig} config {@link FontConfig}
 * @param {Actor} actor {@link Actor}
 */
export function setFont(config: Partial<FontConfig>, actor: Actor): void
/**
 * Sets font settings for a given {@link Actor}
 * @param {FontConfig} config {@link FontConfig}
 * @param {Token} token {@link Token}
 */
export function setFont(config: Partial<FontConfig>, token: Token): void
/**
 * Sets font settings for the narrator
 * @param {FontConfig} config {@link FontConfig}
 */
export function setFont(config: Partial<FontConfig>, name: "narrator"): void
export function setFont(config: Partial<FontConfig>, arg?: unknown): void {
  if (config.name && !isValidFont(config.name)) throw new InvalidFontError(config.name);
  if (config.size && !(config.size > 0 && config.size < 4)) throw new InvalidFontSizeError(config.size);
  if (config.color && !isValidColor(config.color)) throw new InvalidFontColorError(config.color);
  if (arg === "narrator") {
    if (config.name) theatre.theatreNarrator.setAttribute("textfont", config.name);
    if (config.size) theatre.theatreNarrator.setAttribute("textsize", config.size.toString());
    if (config.color) theatre.theatreNarrator.setAttribute("textcolor", config.color);
  } else if (arg) {
    const insert = coerceInsert(arg);
    if (!insert) throw new InvalidActorError();
    // const actor = coerceActor(arg);
    // if (!(actor instanceof Actor)) throw new InvalidActorError();

    // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const insert = theatre.getInsertById(`theatre-${actor.id}`);
    // if (!insert) throw new ActorNotActiveError();


    if (config.name) insert.textFont = config.name;
    if (config.color) insert.textColor = config.color;
    if (config.size) insert.textSize = config.size.toString() ?? "2";
  } else {
    let actor: Actor | null = null;
    const speaking = currentlySpeaking();
    const active = currentlyActive();

    if (speaking instanceof Actor) actor = speaking;
    else if (active.length === 1 && active[0] instanceof Actor) actor = active[0];

    if (!(actor instanceof Actor)) throw new InvalidActorError();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const insert = theatre.getInsertById(`theatre-${actor.id}`);
    if (!insert) throw new ActorNotActiveError();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (config.name) insert.textFont = config.name;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (config.color) insert.textColor = config.color;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (config.size) insert.textSize = config.size;

  }
}


/**
 * Retrieve the current font for a given {@link Actor}
 * @param {string} id {@link Actor} id
 */
export function getFontName(id: string): string | null
/**
 * Retrieve the current font for a given {@link Actor}
 * @param {string} name {@link Actor} name
 */
export function getFontName(name: string): string | null
/**
 * Retrieve the current font for a given {@link Actor}
 * @param {Actor} actor {@link Actor}
 */
export function getFontName(actor: Actor): string | null
/**
 * Retrieve the current font for a given {@link Actor}
 * @param {Token} token {@link Actor}'s associated {@link Token}
 */
export function getFontName(token: Token): string | null
/**
 * Retrieve the current font for a given {@link Actor}
 * @param {"narrator"} name Retrieve the font specifically for the narrator
 */
export function getFontName(name: "narrator"): string | null
/**
 * Retrieve the current font for the currently speaking or active (if only one) {@link Actor}
 */
export function getFontName(): string
export function getFontName(arg?: unknown): string | null {
  if (arg === "narrator") {
    return (theatre.theatreNarrator.getAttribute("textfont") as string) ?? null;
  } else if (arg) {
    const insert = coerceInsert(arg);
    if (!insert) throw new InvalidActorError();
    return insert.textFont;
  } else if (currentlySpeaking()) {
    const insert = currentlySpeaking();
    if (!insert) throw new InvalidActorError();

    return insert.textFont ?? null;
  } else if (currentlyActive().length) {
    const active = currentlyActive();
    if (active.length > 1) throw new InvalidActorError();

    return active[0]?.textFont ?? null;

  } else {
    throw new InvalidActorError();
  }
}

/**
 * Sets the currently active/speaking actor's font
 * @param {string} font 
 */
export function setFontName(font: string): void
/**
 * Sets the font of a specific {@link Actor}
 * @param {string} font Name of the font
 * @param {string} id {@link Actor}'s id
 */
export function setFontName(font: string, id: string): void
/**
 * Sets the font of a specific {@link Actor}
 * @param {string} font Name of the font
 * @param {string} name Name of the {@link Actor}
 */
export function setFontName(font: string, name: string): void
/**
 * Sets the font of a specific {@link Actor}
 * @param {string} font Name of the font
 * @param {Actor} actor {@link Actor}
 */
export function setFontName(font: string, actor: Actor): void
/**
 * Sets the font of a specific {@link Actor}
 * @param {string} font Name of the font
 * @param {Token} token {@link Token} associated with the {@link Actor}
 */
export function setFontName(font: string, token: Token): void
/**
 * Sets the font of the narrator
 * @param {string} font 
 * @param {"narrator"} name Just the string "narrator"
 */
export function setFontName(font: string, name: "narrator"): void
export function setFontName(font: string, arg?: unknown): void {
  if (!isValidFont(font)) throw new InvalidFontError(font);
  if (arg === "narrator") {
    theatre.theatreNarrator.setAttribute("textfont", font);
  } else if (arg) {
    const insert = coerceInsert(arg);
    if (!insert) throw new InvalidActorError();
    insert.textFont = font;
  } else if (currentlySpeaking()) {
    const instance = currentlySpeaking();
    if (!instance) throw new InvalidActorError();

    instance.textFont = font;
  } else if (currentlyActive() && currentlyActive().length === 1) {
    currentlyActive()[0].textFont = font;
  } else {
    throw new InvalidActorError();
  }
}


/**
 * Retrieves the font size for the currently speaking / active actor if there is just one
 * @returns {number} Size, 1-3
 */
export function getFontSize(): FontSize
/**
 * Retrieves the font size for a given {@link Actor}'s insert.
 * @param {string} id {@link Actor}'s id
 * @returns {number} Size, 1-3
 */
export function getFontSize(id: string): FontSize
/**
 * Retrieves the font size for a given {@link Actor}'s insert.
 * @param {string} name {@link Actor}'s name
 * @returns {number} Size, 1-3
 */
export function getFontSize(name: string): FontSize
/**
 * Retrieves the font size for a given {@link Actor}'s insert.
 * @param {Actor} actor {@link Actor}
 * @returns {number} Size, 1-3
 */
export function getFontSize(actor: Actor): FontSize
/**
 * Retrieves the font size for a given {@link Actor}'s insert.
 * @param {Token} token {@link Token}
 * @returns {number} Size, 1-3
 */
export function getFontSize(token: Token): FontSize
/**
 * Retrieves the font size for the narrator.
 * @param {"narrator"} name
 * @returns {number} Size, 1-3
 */
export function getFontSize(name: "narrator"): FontSize
export function getFontSize(arg?: unknown): FontSize {
  if (arg === "narrator") {
    const size = parseInt(theatre.theatreNarrator.getAttribute("textsize") as string);
    if (size > 0 && size < 4) return size as FontSize;
    else throw new InvalidFontSizeError(size);
  } else if (arg) {
    const insert = coerceInsert(arg);
    if (!insert) throw new InvalidActorError();
    return parseInt(insert.textSize ?? "1") as FontSize;
  } else {
    // Get currently speakingas/active
    const current = currentlySpeaking();
    const active = currentlyActive()[0];
    const actor = current ? current : active ? active : null;
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return theatre.getInsertById(`theatre-${actor.id}`)?.textSize || 1;
  }
}

/**
 * Set the font size of the currently speaking/active actor if there is only one
 * @param {FontSize} size Size, from 1-3
 */
export function setFontSize(size: FontSize): void
/**
 * Set the font size of a particular {@link Actor}'s insert.
 * @param {FontSize} size Size, from 1-3
 * @param {string} id ID of the {@link Actor}
 */
export function setFontSize(size: FontSize, id: string): void
/**
 * Set the font size of a particular {@link Actor}'s insert.
 * @param {FontSize} size Size, from 1-3
 * @param {string} name Name of the {@link Actor}
 */
export function setFontSize(size: FontSize, name: string): void
/**
 * Set the font size of a particular {@link Actor}'s insert.
 * @param {FontSize} size Size, from 1-3
 * @param {Actor} actor {@link Actor}
 */
export function setFontSize(size: FontSize, actor: Actor): void
/**
 * Set the font size of a particular {@link Actor}'s insert.
 * @param {FontSize} size Size, from 1-3
 * @param {Token} token {@link Token}
 */
export function setFontSize(size: FontSize, token: Token): void
/**
* Set the font size of a particular {@link Actor}'s insert.
 * @param {FontSize} size Size, from 1-3
 * @param {"narrator"} name
 */
export function setFontSize(size: FontSize, name: "narrator"): void
export function setFontSize(size: FontSize, arg?: unknown): void {
  if (size < 1 || size > 3) throw new InvalidFontSizeError(size);
  if (arg === "narrator") {
    theatre.theatreNarrator.setAttribute("textsize", size.toString());
  } else if (arg) {
    const insert = coerceInsert(arg);
    if (!insert) throw new InvalidActorError();
    insert.textSize = size.toString();
  } else {
    const speaking = currentlySpeaking();
    const active = currentlyActive();
    if (speaking) speaking.textSize = size.toString();
    else if (active.length === 1) active[0].textSize = size.toString();
    throw new InvalidActorError();
  }
}

/**
 * Retrieves the font color of the {@link Actor} currently speaking or active, if there is only one
 * @returns {string}
 */
export function getFontColor(): string
/**
 * Retrieves the font color of a given {@link Actor}
 * @param {string} id {@link Actor}'s id
 */
export function getFontColor(id: string): string
/**
 * Retrieves the font color of a given {@link Actor}
 * @param {string} name {@link Actor}'s name
 */
export function getFontColor(name: string): string
/**
 * Retrieves the font color of a given {@link Actor}
 * @param {Actor} actor {@linK Actor}
 */
export function getFontColor(actor: Actor): string
/**
 * Retrieves the font color of a given {@link Actor}
 * @param {Token} token {@link Token}
 */
export function getFontColor(token: Token): string
/**
 * Retrieves the font color of the narrator
 */
export function getFontColor(name: "narrator"): string
export function getFontColor(arg?: unknown): string {
  if (arg === "narrator") {
    return theatre.theatreNarrator.getAttribute("textcolor") ?? "#ffffff";
  } else if (arg) {
    const insert = coerceInsert(arg);
    if (!insert) throw new InvalidActorError();
    return insert.textColor ?? "#ffffff";
  } else {
    const speaking = currentlySpeaking();
    const active = currentlyActive();
    if (speaking) return speaking.textColor ?? "#ffffff";
    else if (active.length === 1) return active[0].textColor ?? "#ffffff";

    throw new InvalidActorError();
  }
}

/**
 * Sets the font color of the {@link Actor} currently speaking, or active if there is only one
 * @param {string} color Hex code representing the color to set
 */
export function setFontColor(color: string): void
/**
 * Set the font color of a given {@link Actor}
 * @param {string} color Hex code representing the color to set
 * @param {string} id {@link Actor}'s id
 */
export function setFontColor(color: string, id: string): void
/**
 * Set the font color of a given {@link Actor}
 * @param {string} color Hex code representing the color to set
 * @param {string} name {@link Actor}'s name
 */
export function setFontColor(color: string, name: string): void
/**
 * Set the font color of a given {@link Actor}
 * @param {string} color Hex code representing the color to set
 * @param {Actor} actor {@link Actor}
 */
export function setFontColor(color: string, actor: Actor): void
/**
 * Set the font color of a given {@link Actor}
 * @param {string} color Hex code representing the color to set
 * @param {Token} token {@link Token}
 */
export function setFontColor(color: string, token: Token): void
/**
 * Sets the font color for the narrator.
 * @param {string} color Hex code representing the color to set
 */
export function setFontColor(color: string, name: "narrator"): void
export function setFontColor(color: string, arg?: unknown): void {
  if (!isValidColor(color)) throw new InvalidFontColorError(color);

  if (arg === "narrator") {
    theatre.theatreNarrator.setAttribute("textcolor", color);
  } else if (arg) {
    const insert = coerceInsert(arg);
    if (!insert) throw new InvalidActorError();

    insert.textColor = color;
  } else {
    const speaking = currentlySpeaking();
    const active = currentlyActive();

    if (speaking) speaking.textColor = color;
    else if (active.length === 1) active[0].textColor = color;
    else throw new InvalidActorError();
  }
}
