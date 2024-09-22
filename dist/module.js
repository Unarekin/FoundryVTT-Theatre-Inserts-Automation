"use strict";
(() => {
  // src/lib/log.ts
  var LOG_ICON = "\u{1F3AD}";
  var LOG_PREFIX = `${LOG_ICON} ${"Theatre Inserts Macros"}`;
  var log = wrappedConsoleFunc(console.log);
  var warn = wrappedConsoleFunc(console.warn);
  var error = wrappedConsoleFunc(console.error);
  var info = wrappedConsoleFunc(console.info);
  function wrappedConsoleFunc(original) {
    return function(...args) {
      const shouldLog = true ? true : typeof args[0] === "boolean" ? args[0] : false;
      const actualArgs = args;
      if (shouldLog)
        original(LOG_PREFIX, "|", ...actualArgs);
    };
  }

  // src/lib/coerceTypeOrId.ts
  function coerceActor(arg) {
    log("Coercing:", arg);
    if (arg instanceof Actor) return arg;
    if (typeof arg === "string") {
      let actor = game.actors?.get(arg);
      if (actor) return actor;
      actor = game.actors?.getName(arg);
      if (actor) return actor;
    }
  }
  function coercePlaylist(arg) {
    if (arg instanceof Playlist) return arg;
    if (typeof arg === "string") {
      let playlist = game.playlists?.get(arg);
      if (playlist) return playlist;
      playlist = game.playlists?.getName(arg);
      if (playlist) return playlist;
    }
  }
  function coerceSound(arg, playlist) {
    if (arg instanceof PlaylistSound) return arg;
    const actualPlaylist = coercePlaylist(playlist);
    if (actualPlaylist && typeof arg === "string") {
      let sound = actualPlaylist.sounds.get(arg);
      if (sound instanceof PlaylistSound) return sound;
      sound = actualPlaylist.sounds.getName(arg);
      if (sound instanceof PlaylistSound) return sound;
    }
  }

  // src/lib/misc.ts
  async function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  // src/lib/activateActor.ts
  function activateActor(...args) {
    let actor;
    let playlist;
    let sound;
    let musicWait = 0;
    let portraitWait = 0;
    let ttl = 0;
    if (typeof args[0] === "object") {
      const params = args[0];
      actor = coerceActor(params.actor);
      if (params.playlist) {
        playlist = coercePlaylist(params.playlist);
        if (!(playlist instanceof Playlist)) throw new Error(game.i18n?.localize("THEATREINSERTSMACROS.ERRORS.INVALIDPLAYLIST"));
      }
      if (params.sound && playlist instanceof Playlist) {
        sound = coerceSound(params.sound, playlist);
        if (!(sound instanceof PlaylistSound)) throw new Error(game.i18n?.localize("THEATREINSERTSMACROS.ERRORS.INVALIDSOUND"));
      }
      musicWait = params.musicWait ?? 0;
      portraitWait = params.portraitWait ?? 0;
      ttl = params.ttl ?? 0;
    } else {
      actor = coerceActor(args[0]);
    }
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREINSERTSMACROS.ERRORS.INVALIDACTOR"));
    if (!theatre.getNavItemById(`theatre-${actor.id}`))
      Theatre.addToNavBar(actor);
    const promises = [];
    if (playlist instanceof Playlist && sound instanceof PlaylistSound)
      promises.push(wait(musicWait ?? 0).then(() => {
        playlist.playSound(sound);
      }));
    promises.push(wait(portraitWait ?? 0).then(() => {
      theatre.handleNavItemMouseUp({
        currentTarget: theatre.getNavItemById(`theatre-${actor.id}`),
        button: 2
      });
    }));
    if (ttl)
      promises.push(wait(ttl));
    return Promise.all(promises).then(() => {
    });
  }

  // src/module.ts
  Hooks.on("ready", () => {
    if (game instanceof Game && !game.modules.get("theatre")?.active) {
      ui.notifications?.error(game.i18n?.format("THEATREINSERTSMACROS.ERRORS.THEATREINSERTSNOTFOUND", { MODULENAME: "Theatre Inserts Macros" }));
    } else {
      const api = {
        activateActor
      };
      window.TheatreMacros = api;
      log(`Ready!`);
    }
  });
})();
//# sourceMappingURL=module.js.map
