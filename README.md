![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Unarekin/FoundryVTT-Theatre-Inserts-Automation/main.yml)
![GitHub License](https://img.shields.io/github/license/Unarekin/FoundryVTT-Theatre-Inserts-Automation)
![GitHub package.json version](https://img.shields.io/github/package-json/v/Unarekin/FoundryVTT-Theatre-Inserts-Automation)

## Maintenance Mode
**This module is now in maintenance mode**

As this module has developed, it has clearly outgrown what is reasonable to implement as a module meant to extend another, and as such it will be entering maintenance mode.  I will be patching any bugs that crop up, but not adding new functionality.
Instead, I will be working on a module meant as a full replacement directy integrating much of the functionality added in this one, available here:

[Stage Manager](https://github.com/Unarekin/FoundryVTT-Stage-Manager)

# Theatre Inserts Automation

This module provides some convenience functions for interacting with the [Theatre Inserts](https://github.com/League-of-Foundry-Developers/fvtt-module-theatre) module.

This module began as an attempt to update the macros posted in [this reddit thread](https://www.reddit.com/r/FoundryVTT/comments/qhpgg0/comment/hie32h9/) several years ago, which have since stopped functioning.

As the tweaks and updates I was adding grew, it became more reasonable to maintain the code as part of a module.

The module contains a few sample macros for interacting with the module's provided functionality,

# Prerequisites

- [Theatre Inserts](https://github.com/League-of-Foundry-Developers/fvtt-module-theatre)
  - [libWrapper](https://github.com/ruipin/fvtt-lib-wrapper) - Required by Theatre Inserts
  - [socketlib](https://github.com/manuelVo/foundryvtt-socketlib) - Required by Theatre Inserts

The module is developed and tested against FoundryVTT v12, but doesn't do anything terribly ambitious in regards to interacting with Foundry, so should maintain backwards compatibility with v11.

# Installation
1. In Foundry, open the 'Add-on Modules' tab
2. Click 'Install Module'
3. In the 'Manifest URL' field, enter the following:
```
https://github.com/Unarekin/FoundryVTT-Theatre-Inserts-Automation/releases/latest/download/module.json
```
5. Click 'Install'
6. Ensure the module is enabled in your game world with the 'Manage Modules' button

# Example Usage

### Sending simple messages

This snippet will send a couple of text messages, waiting for a couple of seconds between.

```javascript
await TheatreAutomation.sendMessage("MyActor", "This is my message!");
await TheatreAutomation.wait(2000);
await TheatreAutomation.sendMessage(
  "MyActor",
  "And here's a second message, 2 seconds later."
);
await TheatreAutomation.wait(3000);
await TheatreAutomation.deactivateActor("MyActor");
```

### Dramatic introduction

This snippet will display a dialog, allowing you to select an actor, optional intro sound/music, and some other things to display that actor's Theatre Insert, playing the selected sound. You know, for a villain's dramatic entrance with theme music and all.

```javascript
const dialogResult = await TheatreAutomation.getActorIntroData();
if (res) {
  await TheatreAutomation.introduceActor(
    dialogResult.selectedActor
    dialogResult.introMessage,
    dialogResult.portraitWait,
    dialogResult.musicWait,
    dialogResult.selectedSound,
    dialogResult.closeWait
  );
}
```
### Automated dialogue

This allows for automated dialogue between characters with calculated line duration for smooth correspondence.

```javascript
function calculateWaitTime(message, msPerChar = 50, buffer = 1000) { // This calculates the duration of the lines displayed on screen, tested only with the "Typewriter" fly in. Default is 50ms per character with 1000ms buffer.
    return message.length * msPerChar + buffer; 
}

async function sendAndWait(speaker, message) {                  // This sends the line and waits for the calculated time before proceeding.
    await TheatreAutomation.sendMessage(speaker, message);
    await TheatreAutomation.wait(calculateWaitTime(message));
}

await TheatreAutomation.activateActor("Actor Name"); // Replace with the actual actor name. You don't have to activate an actor here as the sendAndWait function will handle it automatically. 
// However, Theatre Inserts will always place the first activated actor to the left side of the screen, so you might want to activate the actor you want to be on the left side of the screen first if there are multiple actors participating.
await sendAndWait("Actor Name", "Hello, this is a line from a character.");
await sendAndWait("Actor Name 2", "This is a line from another character.");
// Add more lines as wished
await TheatreAutomation.deactivateActor("Actor Name"); // This deactivates the actor after all lines have been sent. This will not remove the actor from the stage.
```
### Automated dialogue with audio

Similar to previous, but with the option to use voiced lines. Supports multiple characters just as well.

```javascript
function calculateWaitTime(message, msPerChar = 50, buffer = 1000) {
    return message.length * msPerChar + buffer;
}

async function sendAndWait(speaker, message, voiceFile = null) {   // This function sends a line and plays a voice file, then waits for the calculated time before proceeding.
    let audioPromise = Promise.resolve();
    if (voiceFile) {
        audioPromise = playVoice(voiceFile);
    }
    await TheatreAutomation.sendMessage(speaker, message);

    // Wait for whichever is longer, audio or text
    await Promise.all([
        audioPromise,
        TheatreAutomation.wait(calculateWaitTime(message))
    ]);
}

function playVoice(filePath) {  
    return new Promise(resolve => {
        const audio = new Audio(filePath);
        audio.onended = resolve;
        audio.play();
    });
}

await TheatreAutomation.activateActor("Actor Name");    // Replace with the actual actor name. Activating an actor beforehand helps to sync the audio with the dialogue, but it's not strictly necessary.
await sendAndWait("Actor Name", "Here's the message and after this is the path for the corresponding audio", "audio/dialogue_line1.mp3");
await sendAndWait("Actor Name", "Here's the second message, and this is the path for the second audio", "audio/dialogue_line2.mp3");
// Add more messages and audio files as needed. Multiple actors can be used just as well.  
await TheatreAutomation.deactivateActor("Actor Name");
