import { currentlyActive, currentlySpeaking, isActorActive } from "./activation";
import { coerceActor } from "./coercion";
import { ActorNotActiveError, InvalidActorError, InvalidFontError } from "./errors";

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
