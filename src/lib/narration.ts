/**
 * Returns whether or not the narrator bar is active.
 * @returns {boolean}
 */
export function isNarratorBarActive(): boolean {
  return $(".theatre-control-btn .theatre-icon-narrator").parent().hasClass("theatre-control-nav-bar-item-speakingas");
}

export function activateNarratorBar() {
  theatre.toggleNarratorBar(true, false);
}

export function deactivateNarratorBar() {
  theatre.toggleNarratorBar(false, false);
}