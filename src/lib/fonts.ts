import { currentlyActive, currentlySpeaking, isActorActive } from "./activation";
import { coerceActor } from "./coercion";
import { ActorNotActiveError, InvalidActorError, InvalidFontError, InvalidFontSizeError } from "./errors";
import { log } from "./log";

export type FontSize = 1 | 2 | 3;

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
 * Retrieve the current font for a given {@link Actor}
 * @param {string} id {@link Actor} id
 */
export function getFont(id: string): string | null
/**
 * Retrieve the current font for a given {@link Actor}
 * @param {string} name {@link Actor} name
 */
export function getFont(name: string): string | null
/**
 * Retrieve the current font for a given {@link Actor}
 * @param {Actor} actor {@link Actor}
 */
export function getFont(actor: Actor): string | null
/**
 * Retrieve the current font for a given {@link Actor}
 * @param {Token} token {@link Actor}'s associated {@link Token}
 */
export function getFont(token: Token): string | null
/**
 * Retrieve the current font for a given {@link Actor}
 * @param {"narrator"} name Retrieve the font specifically for the narrator
 */
export function getFont(name: "narrator"): string | null
/**
 * Retrieve the current font for the currently speaking or active (if only one) {@link Actor}
 */
export function getFont(): string
export function getFont(arg?: unknown): string | null {
  if (arg === "narrator") {
    return (theatre.theatreNarrator.getAttribute("textfont") as string) ?? null;
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return theatre.getInsertById(`theatre-${actor.id}`).textFont ?? null;
  } else if (currentlySpeaking()) {
    const actor = currentlySpeaking();
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return theatre.getInsertById(`theatre-${actor.id}`).textFont ?? null;
  } else if (currentlyActive().length) {
    const active = currentlyActive();
    if (active.length > 1) throw new InvalidActorError();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return theatre.getInsertById(`theatre-${active[0].id}`).textFont ?? null;

  } else {
    throw new InvalidActorError();
  }
}

/**
 * Sets the currently active/speaking actor's font
 * @param {string} font 
 */
export function setFont(font: string): void
/**
 * Sets the font of a specific {@link Actor}
 * @param {string} font Name of the font
 * @param {string} id {@link Actor}'s id
 */
export function setFont(font: string, id: string): void
/**
 * Sets the font of a specific {@link Actor}
 * @param {string} font Name of the font
 * @param {string} name Name of the {@link Actor}
 */
export function setFont(font: string, name: string): void
/**
 * Sets the font of a specific {@link Actor}
 * @param {string} font Name of the font
 * @param {Actor} actor {@link Actor}
 */
export function setFont(font: string, actor: Actor): void
/**
 * Sets the font of a specific {@link Actor}
 * @param {string} font Name of the font
 * @param {Token} token {@link Token} associated with the {@link Actor}
 */
export function setFont(font: string, token: Token): void
/**
 * Sets the font of the narrator
 * @param {string} font 
 * @param {"narrator"} name Just the string "narrator"
 */
export function setFont(font: string, name: "narrator"): void
export function setFont(font: string, arg?: unknown): void {
  if (!isValidFont(font)) throw new InvalidFontError(font);
  if (arg === "narrator") {
    theatre.theatreNarrator.setAttribute("textfont", font);
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    if (!isActorActive(actor)) throw new ActorNotActiveError();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    theatre.getInsertById(`theatre-${actor.id}`).textFont = font;
  } else if (currentlySpeaking()) {
    const actor = currentlySpeaking();
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    theatre.getInsertById(`theatre-${actor.id}`).textFont = font;
  } else if (currentlyActive() && currentlyActive().length === 1) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    theatre.getInsertById(`theatre-${currentlyActive()[0].id}`).textFont = font;
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
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return theatre.getInsertById(`theatre-${actor.id}`)?.textSize || 1;
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
    const actor = coerceActor(arg);
    log("Arg:", arg, actor);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const insert = theatre.getInsertById(`theatre-${actor.id}`);
    if (!insert) throw new ActorNotActiveError();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    insert.textSize = size;
  } else {
    let actor: Actor | null = null;
    const speaking = currentlySpeaking();
    if (speaking instanceof Actor) actor = speaking;
    const active = currentlyActive();
    if (active.length === 1 && active[0] instanceof Actor) actor = active[0];

    if (!(actor instanceof Actor)) throw new InvalidActorError();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const insert = theatre.getInsertById(`theatre-${actor.id}`);
    if (!insert) throw new ActorNotActiveError();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    insert.textSize = size;
  }
}