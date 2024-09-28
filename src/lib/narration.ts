import { NARRATOR_WAIT_TIME } from "./constants";
import { sendChatMessage, wait } from "./misc";

/**
 * Returns whether or not the narrator bar is active.
 * @returns {boolean}
 */
export function isNarratorBarActive(): boolean {
  return $(".theatre-control-btn .theatre-icon-narrator").parent().hasClass("theatre-control-nav-bar-item-speakingas");
}

/**
 * Activate narrator bar.
 */
export async function activateNarratorBar(): Promise<void> {
  theatre.toggleNarratorBar(true, false);
  await wait(NARRATOR_WAIT_TIME)
}

/**
 * Deactivates narrator bar.
 */
export async function deactivateNarratorBar(): Promise<void> {
  theatre.toggleNarratorBar(false, false);
  await wait(NARRATOR_WAIT_TIME);
}

/**
 * Sends a message via the narrator bar
 * @param {string} message Message to send
 */
export async function sendNarration(message: string): Promise<void> {
  if (!isNarratorBarActive()) await activateNarratorBar();
  sendChatMessage("narrator", message);
}