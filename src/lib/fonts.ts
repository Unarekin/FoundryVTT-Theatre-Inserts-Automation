
export function getFont(id: string): string | null
export function getFont(name: string): string | null
export function getFont(actor: Actor): string | null
export function getFont(token: Token): string | null
export function getFont(name: "narrator"): string | null
export function getFont(): string
export function getFont(arg?: unknown): string | null {
  if (arg === "narrator") {
    return (theatre.theatreNarrator.getAttribute("textfont") as string) ?? null;
  } else if (arg) {

  }
}

export function setFont(font: string): void
export function setFont(font: string, id: string): void
export function setFont(font: string, name: string): void
export function setFont(font: string, actor: Actor): void
export function setFont(font: string, token: Token): void
export function setFont(font: string, name: "narrator"): void
export function setFont(font: string, arg?: unknown): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  if (!Theatre.getFonts().includes(font)) throw new Error(game.i18n?.format("THEATREAUTOMATION.ERRORS.INVALIDFONT", { font }));
  if (arg === "narrator") {

  }
}