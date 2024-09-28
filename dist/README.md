![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Unarekin/FoundryVTT-Theatre-Inserts-Automation/main.yml)
![GitHub License](https://img.shields.io/github/license/Unarekin/FoundryVTT-Theatre-Inserts-Automation)
![GitHub package.json version](https://img.shields.io/github/package-json/v/Unarekin/FoundryVTT-Theatre-Inserts-Automation)

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
