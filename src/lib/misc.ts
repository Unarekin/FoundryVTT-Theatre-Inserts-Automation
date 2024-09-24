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
 * Handles actually sending a message via the chat box
 * @param {string} message Message to send
 */
export function sendChatMessage(message: string) {
  const chatBox: JQuery<HTMLTextAreaElement> = $("#chat-message");
  const previousChatValue = chatBox.val() ?? ""
  const previousChatFocus = chatBox.is(":selected");

  theatre.setUserTyping(game.user?.id, theatre.speakingAs);
  chatBox.val(message);
  chatBox.trigger("focus");

  chatBox.trigger(createEnterEvent("keydown"));
  chatBox.trigger(createEnterEvent("keyup"));

  chatBox.val(previousChatValue);
  if (!previousChatFocus) chatBox.trigger("blur");
}

/**
 * Quick wrapper to create keydown and keyup events
 * @param {string} name 
 * @returns 
 */
function createEnterEvent(name: string) {
  return jQuery.Event(name, {
    which: 13,
    keyCode: 13,
    originalEvent: new KeyboardEvent(name, {
      code: "Enter",
      key: "Enter",
      charCode: 13,
      keyCode: 13,
      view: window,
      bubbles: true
    })
  });
}