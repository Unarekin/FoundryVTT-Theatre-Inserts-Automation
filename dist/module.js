var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/events/events.js"(exports, module) {
    "use strict";
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn) console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter2() {
      EventEmitter2.init.call(this);
    }
    module.exports = EventEmitter2;
    module.exports.once = once;
    EventEmitter2.EventEmitter = EventEmitter2;
    EventEmitter2.prototype._events = void 0;
    EventEmitter2.prototype._eventsCount = 0;
    EventEmitter2.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter2.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter2.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter2.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter2.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
    EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter2.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener") continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter2.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter2.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter2.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter2.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// src/lib/coercion.ts
function coerceActor(arg) {
  if (arg instanceof Actor) return arg;
  if (arg instanceof Token) return arg.actor;
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

// src/lib/constants.ts
var TWEEN_WAIT_TIME = 1500;
var NARRATOR_WAIT_TIME = 500;

// src/lib/misc.ts
async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
function sendChatMessage(alias, message) {
  theatre.lastTyping = Date.now();
  theatre.setUserTyping(game.user?.id, theatre.speakingAs);
  theatre._sendTypingEvent();
  const chatMessage = createChatMessage(alias, message);
  ChatMessage.create(chatMessage);
}
function createChatMessage(alias, message) {
  return {
    content: message,
    style: 2,
    author: game.user?.id,
    _id: foundry.utils.randomID(),
    type: "base",
    system: {},
    timestamp: Date.now(),
    flavor: "",
    speaker: {
      scene: null,
      actor: null,
      token: null,
      alias
    },
    whisper: [],
    blind: false,
    rolls: [],
    sound: null,
    emote: false,
    flags: {
      theatre: {
        theatreMessage: true
      }
    },
    _stats: {
      compendiumSource: null,
      duplicateSource: null,
      coreVersion: game.release?.version,
      systemId: game.system?.id,
      systemVersion: game.system?.version,
      createdTime: Date.now(),
      modifiedTime: Date.now(),
      lastModifiedBy: game.user?.id
    }
  };
}
function isValidColor(color) {
  if (!color || typeof color !== "string") return false;
  if (color.substring(0, 1) === "#") color = color.substring(1);
  switch (color.length) {
    case 3:
      return /^[0-9A-F]{3}$/i.test(color);
    case 6:
      return /^[0-9A-F]{6}$/i.test(color);
    case 8:
      return /^[0-9A-F]{8}$/i.test(color);
    default:
      return false;
  }
}
function isValidURL(url) {
  try {
    return Boolean(new URL(url, location.origin));
  } catch (err) {
    if (!(err instanceof TypeError)) throw err;
    return false;
  }
}
function randomColor() {
  const goldenRatio = 0.618033988749895;
  let h = Math.random();
  h += goldenRatio;
  h %= 1;
  const s = 0.5;
  const v = 0.95;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r = 0;
  let g = 0;
  let b = 0;
  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return [
    "#",
    Math.floor(r * 255).toString(16).padStart(2, "0"),
    Math.floor(g * 255).toString(16).padStart(2, "0"),
    Math.floor(b * 255).toString(16).padStart(2, "0")
  ].join("");
}

// src/lib/errors/LocalizedError.ts
var LocalizedError = class extends Error {
  constructor(message, subs) {
    if (message) super(game.i18n?.format(`THEATREAUTOMATION.ERRORS.${message}`, subs));
    else super();
  }
};

// src/lib/errors/ActorNotActiveError.ts
var ActorNotActiveError = class extends LocalizedError {
  constructor() {
    super("ACTORNOTACTIVE");
  }
};

// src/lib/errors/ActorNotStagedError.ts
var ActorNotStagedError = class extends LocalizedError {
  constructor() {
    super("ACTORNOTSTAGED");
  }
};

// src/lib/errors/InvalidActorError.ts
var InvalidActorError = class extends LocalizedError {
  constructor() {
    super("INVALIDACTOR");
  }
};

// src/lib/errors/InvalidColorError.ts
var InvalidColorError = class extends LocalizedError {
  constructor(color) {
    super("INVALIDCOLOR", { color });
  }
};

// src/lib/errors/InvalidFlyinError.ts
var InvalidFlyinError = class extends LocalizedError {
  constructor(flyin) {
    super("INVALIDFLYIN", { flyin });
  }
};

// src/lib/errors/InvalidFontError.ts
var InvalidFontError = class extends LocalizedError {
  constructor(font) {
    super("INVALIDFONT", { font });
  }
};

// src/lib/errors/InvalidFontSizeError.ts
var InvalidFontSizeError = class extends LocalizedError {
  constructor(size) {
    super("INVALIDSIZE", { size });
  }
};

// src/lib/errors/InvalidStandingError.ts
var InvalidStandingError = class extends LocalizedError {
  constructor(standing) {
    super("INVALIDSTANDING", { standing });
  }
};

// src/lib/errors/InvalidURLError.ts
var InvalidURLError = class extends LocalizedError {
  constructor(url) {
    super("INVALIDURL", { url });
  }
};

// src/lib/errors/NoChatHookError.ts
var NoChatHookError = class extends LocalizedError {
  constructor() {
    super("NOCHATHOOK");
  }
};

// src/lib/staging.ts
function isActorStaged(arg) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  return !!theatre.getNavItemById(`theatre-${actor.id}`);
}
function stageActor(arg) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  if (!isActorStaged(actor))
    Theatre.addToNavBar(actor);
}
function unstageActor(arg) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  if (isActorStaged(actor)) {
    theatre.handleNavItemMouseUp({
      currentTarget: theatre.getNavItemById(`theatre-${actor.id}`),
      button: 2,
      ctrlKey: true
    });
  }
}

// src/lib/activation.ts
function activateActor(arg) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  if (!isActorStaged(actor)) stageActor(actor);
  theatre.handleNavItemMouseUp({
    currentTarget: theatre.getNavItemById(`theatre-${actor.id}`),
    button: 2
  });
  return wait(TWEEN_WAIT_TIME);
}
function deactivateActor(arg, unstage) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  theatre.removeInsertById(`theatre-${actor.id}`, false);
  if (unstage) {
    theatre.handleNavItemMouseUp({
      currentTarget: theatre.getNavItemById(`theatre-${actor.id}`),
      button: 2,
      ctrlKey: true
    });
  }
  return wait(TWEEN_WAIT_TIME);
}
function isActorActive(arg) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  const navItem = theatre.getNavItemById(`theatre-${actor.id}`);
  if (!navItem) return false;
  return navItem.classList.contains("theatre-control-nav-bar-item-active");
}
function currentlySpeaking() {
  if (theatre.speakingAs) {
    const [, id] = theatre.speakingAs.split("-");
    const actor = coerceActor(id);
    return actor ?? null;
  } else {
    return null;
  }
}
function currentlyActive() {
  const activeNavItems = $(".theatre-control-nav-bar img.theatre-control-nav-bar-item-active").map(function() {
    return this.getAttribute("imgid");
  }).toArray();
  return activeNavItems.map((elemId) => {
    const [, id] = elemId.split("-");
    return game.actors.get(id);
  }).filter((elem) => !!elem);
}

// src/lib/animations.ts
function popPortrait(arg, duration) {
  return new Promise((resolve, reject) => {
    try {
      const actor = coerceActor(arg);
      if (!(actor instanceof Actor)) throw new InvalidActorError();
      const insert = theatre.getInsertById(`theatre-${actor.id}`);
      if (!insert) throw new ActorNotActiveError();
      const tweenId = "portraitPop";
      const tween = TweenMax.to(insert.portraitContainer, duration ? duration / 1e3 : 0.25, {
        pixi: { scaleX: insert.mirrored ? -1.05 : 1.05, scaleY: 1.05 },
        ease: Power3.easeOut,
        repeat: 1,
        yoyo: true,
        onComplete: function(ctx, imgId, tweenId2) {
          const insert2 = theatre.getInsertById(imgId);
          if (insert2) {
            this.targets()[0].scale.x = insert2.mirrored ? -1 : 1;
            this.targets()[0].scale.y = 1;
          }
          ctx._removeDockTween(imgId, this, tweenId2);
          resolve();
        },
        onCompleteParams: [theatre, insert.imgId, tweenId]
      });
      theatre._addDockTween(insert.imgId, tween, tweenId);
    } catch (err) {
      reject(err);
    }
  });
}
function flashPortrait(arg, color, duration) {
  return new Promise((resolve, reject) => {
    try {
      if (!isValidColor(color)) throw new InvalidColorError(color);
      const actor = coerceActor(arg);
      if (!(actor instanceof Actor)) throw new InvalidActorError();
      const insert = theatre.getInsertById(`theatre-${actor.id}`);
      if (!insert) throw new ActorNotActiveError();
      const tweenId = "portraitFlash";
      const tween = TweenMax.to(insert.portrait, duration ? duration / 1e3 : 0.25, {
        pixi: {
          tint: theatre.getPlayerFlashColor(null, color)
        },
        ease: Power3.easeOut,
        repeat: 1,
        yoyo: true,
        onComplete: function(ctx, imgId, tweenId2) {
          this.targets()[0].tint = 16777215;
          ctx._removeDockTween(imgId, this, tweenId2);
          resolve();
        },
        onCompleteParams: [theatre, insert.imgId, tweenId]
      });
      theatre._addDockTween(insert.imgId, tween, tweenId);
    } catch (err) {
      reject(err);
    }
  });
}

// src/lib/emotes.ts
function setEmote(arg, emote) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  return doSetEmote(actor, emote);
}
async function doSetEmote(actor, emote) {
  if (!isActorActive(actor)) await activateActor(actor);
  theatre.setUserEmote(
    game.user?.id,
    `theatre-${actor.id}`,
    "emote",
    emote,
    false
  );
}
function clearEmote(arg) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  theatre.setUserEmote(game.user?.id, `theatre-${actor.id}`, "emote", "", false);
}

// src/lib/narration.ts
function isNarratorBarActive() {
  return $(".theatre-control-btn .theatre-icon-narrator").parent().hasClass("theatre-control-nav-bar-item-speakingas");
}
async function activateNarratorBar() {
  theatre.toggleNarratorBar(true, false);
  await wait(NARRATOR_WAIT_TIME);
}
async function deactivateNarratorBar() {
  theatre.toggleNarratorBar(false, false);
  await wait(NARRATOR_WAIT_TIME);
}
async function sendNarration(message) {
  if (!isNarratorBarActive()) await activateNarratorBar();
  sendChatMessage("narrator", message);
}

// src/lib/flyins.ts
function getFlyinAnimations() {
  return Object.keys(Theatre.FLYIN_ANIMS);
}
function isValidFlyin(name) {
  return getFlyinAnimations().includes(name);
}
function setTextFlyin(flyin, arg) {
  if (!isValidFlyin(flyin)) throw new InvalidFlyinError(flyin);
  if (arg === "narrator") {
    theatre.theatreNarrator.setAttribute("textflyin", flyin);
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    if (!isActorActive(actor)) throw new ActorNotActiveError();
    theatre.setUserEmote(game.user?.id, `theatre-${actor.id}`, "textflyin", flyin, false);
  } else {
    theatre.setUserEmote(game.user?.id, theatre.speakingAs, "textflyin", flyin, false);
  }
}
function getTextFlyin(arg) {
  if (arg === "narrator") {
    return theatre.theatreNarrator.getAttribute("textflyin") ?? getFlyinAnimations()[0];
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    return theatre.getInsertById(`theatre-${actor.id}`).textFlyin;
  } else if (isNarratorBarActive()) {
    return theatre.theatreNarrator.getAttribute("textflyin") ?? "";
  } else if (theatre.speakingAs) {
    return theatre.getInsertById(theatre.speakingAs).textFlyin ?? "";
  } else {
    throw new InvalidActorError();
  }
}

// src/lib/log.ts
var LOG_ICON = "\u{1F3AD}";
var LOG_PREFIX = `${LOG_ICON} ${"Theatre Inserts Automation"}`;
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

// src/lib/fonts.ts
var DEFAULT_FONT_NAME = getFonts()[0];
var DEFAULT_FONT_SIZE = 2;
var DEFAULT_FONT_COLOR = "#ffffff";
function getFonts() {
  return [
    ...Object.values(game.settings?.settings.get("theatre.nameFont")?.choices ?? []),
    ...FontConfig.getAvailableFonts()
  ];
}
function isValidFont(font) {
  return getFonts().includes(font);
}
async function loadFont(name, url) {
  if (!isValidURL(url)) throw new InvalidFontError(url);
  return FontConfig.loadFont(name, {
    editor: false,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    fonts: [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { urls: [url] }
    ]
  });
}
function getFont(arg) {
  if (arg === "narrator") {
    return {
      name: theatre.theatreNarrator.getAttribute("textfont") || DEFAULT_FONT_NAME,
      color: theatre.theatreNarrator.getAttribute("textcolor") || DEFAULT_FONT_COLOR,
      size: parseInt(theatre.theatreNarrator.getAttribute("textsize") ?? "") || DEFAULT_FONT_SIZE
    };
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    const insert = theatre.getInsertById(`theatre-${actor.id}`);
    if (!insert) throw new ActorNotActiveError();
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      name: insert.textFont || DEFAULT_FONT_NAME,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      color: insert.textColor || DEFAULT_FONT_COLOR,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      size: parseInt(insert.textSize) || DEFAULT_FONT_SIZE
    };
  } else {
    let actor = null;
    const speaking = currentlySpeaking();
    const active = currentlyActive();
    if (speaking instanceof Actor) actor = speaking;
    else if (active.length === 1 && active[0] instanceof Actor) actor = active[0];
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    const insert = theatre.getInsertById(`theatre-${actor.id}`);
    if (!insert) throw new ActorNotActiveError();
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      name: insert.textFont || DEFAULT_FONT_NAME,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      color: insert.textColor || DEFAULT_FONT_COLOR,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      size: parseInt(insert.textSize) || DEFAULT_FONT_SIZE
    };
  }
}
function setFont(config, arg) {
  if (config.name && !isValidFont(config.name)) throw new InvalidFontError(config.name);
  if (config.size && !(config.size > 0 && config.size < 4)) throw new InvalidFontSizeError(config.size);
  if (config.color && !isValidColor(config.color)) throw new InvalidColorError(config.color);
  if (arg === "narrator") {
    if (config.name) theatre.theatreNarrator.setAttribute("textfont", config.name);
    if (config.size) theatre.theatreNarrator.setAttribute("textsize", config.size.toString());
    if (config.color) theatre.theatreNarrator.setAttribute("textcolor", config.color);
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    const insert = theatre.getInsertById(`theatre-${actor.id}`);
    if (!insert) throw new ActorNotActiveError();
    if (config.name) insert.textFont = config.name;
    if (config.color) insert.textColor = config.color;
    if (config.size) insert.textSize = config.size;
  } else {
    let actor = null;
    const speaking = currentlySpeaking();
    const active = currentlyActive();
    if (speaking instanceof Actor) actor = speaking;
    else if (active.length === 1 && active[0] instanceof Actor) actor = active[0];
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    const insert = theatre.getInsertById(`theatre-${actor.id}`);
    if (!insert) throw new ActorNotActiveError();
    if (config.name) insert.textFont = config.name;
    if (config.color) insert.textColor = config.color;
    if (config.size) insert.textSize = config.size;
  }
}
function getFontName(arg) {
  if (arg === "narrator") {
    return theatre.theatreNarrator.getAttribute("textfont") ?? null;
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    return theatre.getInsertById(`theatre-${actor.id}`).textFont ?? null;
  } else if (currentlySpeaking()) {
    const actor = currentlySpeaking();
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    return theatre.getInsertById(`theatre-${actor.id}`).textFont ?? null;
  } else if (currentlyActive().length) {
    const active = currentlyActive();
    if (active.length > 1) throw new InvalidActorError();
    return theatre.getInsertById(`theatre-${active[0].id}`).textFont ?? null;
  } else {
    throw new InvalidActorError();
  }
}
function setFontName(font, arg) {
  if (!isValidFont(font)) throw new InvalidFontError(font);
  if (arg === "narrator") {
    theatre.theatreNarrator.setAttribute("textfont", font);
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    if (!isActorActive(actor)) throw new ActorNotActiveError();
    theatre.getInsertById(`theatre-${actor.id}`).textFont = font;
  } else if (currentlySpeaking()) {
    const actor = currentlySpeaking();
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    theatre.getInsertById(`theatre-${actor.id}`).textFont = font;
  } else if (currentlyActive() && currentlyActive().length === 1) {
    theatre.getInsertById(`theatre-${currentlyActive()[0].id}`).textFont = font;
  } else {
    throw new InvalidActorError();
  }
}
function getFontSize(arg) {
  if (arg === "narrator") {
    const size = parseInt(theatre.theatreNarrator.getAttribute("textsize"));
    if (size > 0 && size < 4) return size;
    else throw new InvalidFontSizeError(size);
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    return theatre.getInsertById(`theatre-${actor.id}`)?.textSize || 1;
  } else {
    const current = currentlySpeaking();
    const active = currentlyActive()[0];
    const actor = current ? current : active ? active : null;
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    return theatre.getInsertById(`theatre-${actor.id}`)?.textSize || 1;
  }
}
function setFontSize(size, arg) {
  if (size < 1 || size > 3) throw new InvalidFontSizeError(size);
  if (arg === "narrator") {
    theatre.theatreNarrator.setAttribute("textsize", size.toString());
  } else if (arg) {
    const actor = coerceActor(arg);
    log("Arg:", arg, actor);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    const insert = theatre.getInsertById(`theatre-${actor.id}`);
    if (!insert) throw new ActorNotActiveError();
    insert.textSize = size;
  } else {
    let actor = null;
    const speaking = currentlySpeaking();
    if (speaking instanceof Actor) actor = speaking;
    const active = currentlyActive();
    if (active.length === 1 && active[0] instanceof Actor) actor = active[0];
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    const insert = theatre.getInsertById(`theatre-${actor.id}`);
    if (!insert) throw new ActorNotActiveError();
    insert.textSize = size;
  }
}
function getFontColor(arg) {
  if (arg === "narrator") {
    return theatre.theatreNarrator.getAttribute("textcolor") ?? "#ffffff";
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    const insert = theatre.getInsertById(`theatre-${actor.id}`);
    if (!insert) throw new ActorNotActiveError();
    return insert.textColor ?? "#ffffff";
  } else {
    let actor = null;
    const speaking = currentlySpeaking();
    const active = currentlyActive();
    if (speaking instanceof Actor) actor = speaking;
    else if (active.length === 1 && active[0] instanceof Actor) actor = active[0];
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    const insert = theatre.getInsertById(`theatre-${actor.id}`);
    if (!insert) throw new ActorNotActiveError();
    return insert.textColor ?? "#ffffff";
  }
}
function setFontColor(color, arg) {
  if (!isValidColor(color)) throw new InvalidColorError(color);
  if (arg === "narrator") {
    theatre.theatreNarrator.setAttribute("textcolor", color);
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    const insert = theatre.getInsertById(`theatre-${actor.id}`);
    if (!insert) throw new ActorNotActiveError();
    insert.textColor = color;
  } else {
    let actor = null;
    const speaking = currentlySpeaking();
    const active = currentlyActive();
    if (speaking instanceof Actor) actor = speaking;
    else if (active.length === 1 && active[0] instanceof Actor) actor = active[0];
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    const insert = theatre.getInsertById(`theatre-${actor.id}`);
    if (!insert) throw new ActorNotActiveError();
    insert.textColor = color;
  }
}

// src/lib/image.ts
function getImage(arg) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  if (isActorActive(actor))
    return theatre.getInsertById(`theatre-${actor.id}`)?.portrait.texture.textureCacheIds[1];
  return getBaseImage(actor);
}
function getBaseImage(arg) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  return actor.flags?.theatre?.baseinsert || actor.img;
}
function setBaseImage(arg, url) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  return actor.setFlag("theatre", "baseinsert", url).then(() => {
  });
}
function setImage(arg, image) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  if (!isActorActive(actor)) throw new ActorNotActiveError();
  return srcExists(image).then((val) => {
    if (val) return theatre._AddTextureResource(image, image, `theatre-${actor.id}`, false);
    else throw new InvalidURLError(image);
  }).then(() => {
  });
}

// src/lib/applications/IntroductionApplication.ts
var import_events = __toESM(require_events());

// src/lib/dynamicSelect.js
var DynamicSelect = class {
  constructor(element, options = {}) {
    let defaults = {
      placeholder: "Select an option",
      columns: 1,
      name: "",
      width: "",
      height: "",
      data: [],
      onChange: function() {
      }
    };
    this.options = Object.assign(defaults, options);
    this.selectElement = typeof element === "string" ? document.querySelector(element) : element;
    for (const prop in this.selectElement.dataset) {
      if (this.options[prop] !== void 0) {
        this.options[prop] = this.selectElement.dataset[prop];
      }
    }
    this.name = this.selectElement.getAttribute("name") ? this.selectElement.getAttribute("name") : "dynamic-select-" + Math.floor(Math.random() * 1e6);
    if (!this.options.data.length) {
      let options2 = this.selectElement.querySelectorAll("option");
      for (let i = 0; i < options2.length; i++) {
        this.options.data.push({
          value: options2[i].value,
          text: options2[i].innerHTML,
          img: options2[i].getAttribute("data-img"),
          selected: options2[i].selected,
          html: options2[i].getAttribute("data-html"),
          imgWidth: options2[i].getAttribute("data-img-width"),
          imgHeight: options2[i].getAttribute("data-img-height")
        });
      }
    }
    this.element = this._template();
    this.selectElement.replaceWith(this.element);
    this._updateSelected();
    this._eventHandlers();
  }
  _template() {
    let optionsHTML = "";
    for (let i = 0; i < this.data.length; i++) {
      let optionWidth = 100 / this.columns;
      let optionContent = "";
      if (this.data[i].html) {
        optionContent = this.data[i].html;
      } else {
        optionContent = `
                    ${this.data[i].img ? `<img src="${this.data[i].img}" alt="${this.data[i].text}" class="${this.data[i].imgWidth && this.data[i].imgHeight ? "dynamic-size" : ""}" style="${this.data[i].imgWidth ? "width:" + this.data[i].imgWidth + ";" : ""}${this.data[i].imgHeight ? "height:" + this.data[i].imgHeight + ";" : ""}">` : ""}
                    ${this.data[i].text ? '<span class="dynamic-select-option-text">' + this.data[i].text + "</span>" : ""}
                `;
      }
      optionsHTML += `
                <div class="dynamic-select-option${this.data[i].value == this.selectedValue ? " dynamic-select-selected" : ""}${this.data[i].text || this.data[i].html ? "" : " dynamic-select-no-text"}" data-value="${this.data[i].value}" style="width:${optionWidth}%;${this.height ? "height:" + this.height + ";" : ""}">
                    ${optionContent}
                </div>
            `;
    }
    let template = `
            <div class="dynamic-select ${this.name}"${this.selectElement.id ? ' id="' + this.selectElement.id + '"' : ""} style="${this.width ? "width:" + this.width + ";" : ""}${this.height ? "height:" + this.height + ";" : ""}">
                <input type="hidden" name="${this.name}" value="${this.selectedValue}">
                <div class="dynamic-select-header" style="${this.width ? "width:" + this.width + ";" : ""}${this.height ? "height:" + this.height + ";" : ""}"><span class="dynamic-select-header-placeholder">${this.placeholder}</span></div>
                <div class="dynamic-select-options" style="${this.options.dropdownWidth ? "width:" + this.options.dropdownWidth + ";" : ""}${this.options.dropdownHeight ? "height:" + this.options.dropdownHeight + ";" : ""}">${optionsHTML}</div>
            </div>
        `;
    let element = document.createElement("div");
    element.innerHTML = template;
    return element;
  }
  _eventHandlers() {
    this.element.querySelectorAll(".dynamic-select-option").forEach((option) => {
      option.onclick = () => {
        this.element.querySelectorAll(".dynamic-select-selected").forEach(
          (selected) => selected.classList.remove("dynamic-select-selected")
        );
        option.classList.add("dynamic-select-selected");
        this.element.querySelector(".dynamic-select-header").innerHTML = option.innerHTML;
        this.element.querySelector("input").value = option.getAttribute("data-value");
        this.data.forEach((data) => data.selected = false);
        this.data.filter(
          (data) => data.value == option.getAttribute("data-value")
        )[0].selected = true;
        this.element.querySelector(".dynamic-select-header").classList.remove("dynamic-select-header-active");
        this.options.onChange(
          option.getAttribute("data-value"),
          option.querySelector(".dynamic-select-option-text") ? option.querySelector(".dynamic-select-option-text").innerHTML : "",
          option
        );
      };
    });
    this.element.querySelector(".dynamic-select-header").onclick = () => {
      this.element.querySelector(".dynamic-select-header").classList.toggle("dynamic-select-header-active");
    };
    if (this.selectElement.id && document.querySelector('label[for="' + this.selectElement.id + '"]')) {
      document.querySelector(
        'label[for="' + this.selectElement.id + '"]'
      ).onclick = () => {
        this.element.querySelector(".dynamic-select-header").classList.toggle("dynamic-select-header-active");
      };
    }
    document.addEventListener("click", (event) => {
      if (!event.target.closest("." + this.name) && !event.target.closest('label[for="' + this.selectElement.id + '"]')) {
        this.element.querySelector(".dynamic-select-header").classList.remove("dynamic-select-header-active");
      }
    });
  }
  _updateSelected() {
    if (this.selectedValue) {
      this.element.querySelector(".dynamic-select-header").innerHTML = this.element.querySelector(".dynamic-select-selected").innerHTML;
    }
  }
  get selectedValue() {
    let selected = this.data.filter((option) => option.selected);
    selected = selected.length ? selected[0].value : "";
    return selected;
  }
  set data(value) {
    this.options.data = value;
  }
  get data() {
    return this.options.data;
  }
  set selectElement(value) {
    this.options.selectElement = value;
  }
  get selectElement() {
    return this.options.selectElement;
  }
  set element(value) {
    this.options.element = value;
  }
  get element() {
    return this.options.element;
  }
  set placeholder(value) {
    this.options.placeholder = value;
  }
  get placeholder() {
    return this.options.placeholder;
  }
  set columns(value) {
    this.options.columns = value;
  }
  get columns() {
    return this.options.columns;
  }
  set name(value) {
    this.options.name = value;
  }
  get name() {
    return this.options.name;
  }
  set width(value) {
    this.options.width = value;
  }
  get width() {
    return this.options.width;
  }
  set height(value) {
    this.options.height = value;
  }
  get height() {
    return this.options.height;
  }
};
document.querySelectorAll("[data-dynamic-select]").forEach((select) => new DynamicSelect(select));

// src/lib/applications/sharedFunctionality.ts
function getActorContext(actor) {
  const castActor = actor;
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    id: castActor.id,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    name: castActor.name,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    img: castActor.img,
    selected: false
  };
}
function getPlaylistContext(playlist) {
  return {
    id: playlist.id ?? "",
    name: playlist.name,
    sounds: playlist.sounds.map((sound) => getSoundContext(sound))
  };
}
function getSoundContext(sound) {
  return {
    id: sound.id ?? "",
    name: sound.name,
    duration: sound.sound?.duration || 0,
    selected: false
  };
}

// src/lib/applications/IntroductionApplication.ts
var IntroductionApplication = class extends FormApplication {
  constructor(object, options) {
    const mergedObject = foundry.utils.mergeObject(
      {
        musicWait: 0,
        portraitWait: 0,
        closeWait: 0,
        selectedActor: null,
        selectedSound: null
      },
      object
    );
    super(mergedObject, options);
    this.events = new import_events.default();
    log("Options:", this.options);
  }
  _updateObject(_event, formData) {
    log("updateObject:", formData);
    if (formData) {
      const actor = formData.actorSelect ? coerceActor(formData.actorSelect) : null;
      if (!(actor instanceof Actor)) throw new InvalidActorError();
      let playlist;
      let sound;
      if (formData.soundSelect) {
        const [playlistId, soundId] = formData.soundSelect.split("-");
        playlist = coercePlaylist(playlistId);
        if (playlist instanceof Playlist) sound = coerceSound(soundId, playlist);
      }
      this.object = {
        selectedActor: actor,
        selectedSound: sound,
        musicWait: formData.musicWait ?? 0,
        portraitWait: formData.portraitWait ?? 0,
        introMessage: formData.introMessage ?? "",
        closeWait: formData.closeWait ?? 0
      };
    }
    return Promise.resolve();
  }
  _render(force, options) {
    return super._render(force, options).then(() => {
      this.emit("render");
    });
  }
  async close(options) {
    await super.close(options);
    if (options?.submit) this.emit("submit", this.object);
    else this.emit("cancel");
    this.emit("close");
  }
  getData(options) {
    const playlists = game.playlists.contents.map((playlist) => getPlaylistContext(playlist));
    const actors = game.actors.contents.map((actor) => ({
      ...getActorContext(actor),
      ...this.object?.selectedActor?.id === actor.id ? { selected: true } : { selected: false }
    }));
    const localContext = {
      actors,
      playlists,
      introMessage: this.object.introMessage
    };
    const parentContext = super.getData(options);
    if (typeof parentContext.then === "function") {
      return parentContext.then((data) => foundry.utils.mergeObject(data, localContext));
    } else {
      return foundry.utils.mergeObject(parentContext, localContext);
    }
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(
      super.defaultOptions,
      {
        title: game.i18n?.localize("THEATREAUTOMATION.DIALOGS.INTRO.TITLE") || "",
        template: `/modules/${"theatre-inserts-automation"}/templates/intro/application.hbs`,
        closeOnSubmit: true,
        submitOnClose: false,
        submitOnChange: false
      }
    );
  }
  activateListeners(html) {
    super.activateListeners(html);
    new DynamicSelect("#actorSelect", {
      name: "actorSelect",
      onChange: (value, text, option) => {
        log("Dynamic select:", value, text, option);
      }
    });
    html.find("input[type='number']").on("focus", function() {
      $(this).trigger("select");
    });
    html.find("[data-action='submit']").on("click", (e) => {
      this.close({ submit: true });
      e.preventDefault();
    });
    html.find("[data-action='cancel']").on("click", (e) => {
      this.close({ submit: false });
      e.preventDefault();
    });
  }
  // #region EventEmitter Implementation
  addListener(eventName, listener) {
    this.events.addListener(eventName, listener);
    return this;
  }
  on(eventName, listener) {
    this.events.on(eventName, listener);
    return this;
  }
  once(eventName, listener) {
    this.events.once(eventName, listener);
    return this;
  }
  removeListener(eventName, listener) {
    this.events.removeListener(eventName, listener);
    return this;
  }
  off(eventName, listener) {
    this.events.off(eventName, listener);
    return this;
  }
  removeAllListeners(eventName) {
    this.events.removeAllListeners(eventName);
    return this;
  }
  setMaxListeners(n) {
    this.events.setMaxListeners(n);
    return this;
  }
  getMaxListeners() {
    return this.events.getMaxListeners();
  }
  listeners(eventName) {
    return this.events.listeners(eventName);
  }
  rawListeners(eventName) {
    return this.events.rawListeners(eventName);
  }
  emit(eventName, ...args) {
    return this.events.emit(eventName, ...args);
  }
  listenerCount(eventName, listener) {
    return this.events.listenerCount(eventName, listener);
  }
  prependListener(eventName, listener) {
    this.events.prependListener(eventName, listener);
    return this;
  }
  prependOnceListener(eventName, listener) {
    this.events.prependOnceListener(eventName, listener);
    return this;
  }
  eventNames() {
    return this.events.eventNames();
  }
  // #endregion
};

// src/lib/messaging.ts
function sendMessage(arg, message, flyin = "typewriter") {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  if (!isActorStaged(actor)) stageActor(actor);
  return (isActorActive(actor) ? Promise.resolve() : activateActor(actor)).then(() => {
    if (!isActorSpeaking(actor)) setSpeakingAs(actor);
    const oldFlyin = getTextFlyin();
    setTextFlyin(flyin);
    sendChatMessage(actor.name, message);
    setTextFlyin(oldFlyin);
  });
}
function setSpeakingAs(actor) {
  if (!isActorStaged(actor)) throw new ActorNotStagedError();
  if (!isActorActive) throw new ActorNotActiveError();
  const navItem = theatre.getNavItemById(`theatre-${actor.id}`);
  if (!navItem.classList.contains("theatre-control-nav-bar-item-speakingas")) {
    theatre.handleNavItemMouseUp({
      currentTarget: navItem,
      button: 0
    });
  }
}
function isActorSpeaking(arg) {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  const navItem = theatre.getNavItemById(`theatre-${actor.id}`);
  return navItem.classList.contains("theatre-control-nav-bar-item-speakingas");
}

// src/lib/sounds.ts
function playSound(sound) {
  sound?.parent?.playSound(sound);
}

// src/lib/introduction.ts
async function getActorIntroData(selectedActor) {
  return new Promise((resolve, reject) => {
    const actor = coerceActor(selectedActor);
    if (selectedActor !== void 0 && !(actor instanceof Actor)) reject(new InvalidActorError());
    new IntroductionApplication({
      ...actor ? { selectedActor: actor } : {}
    }).once("submit", resolve).once("cancel", () => {
      resolve(void 0);
    }).render(true);
  });
}
async function introduceActor(actor, message, portraitWait = 0, musicWait = 0, sound, closeWait = 0) {
  const actualActor = coerceActor(actor);
  if (!(actualActor instanceof Actor)) throw new InvalidActorError();
  const promises = [];
  if (sound instanceof PlaylistSound)
    promises.push(wait(musicWait).then(() => playSound(sound)));
  promises.push(wait(portraitWait).then(() => {
    if (message) return sendMessage(actualActor, message).then(() => {
      if (closeWait) return wait(closeWait).then(() => {
        deactivateActor(actualActor);
      });
    });
    else return activateActor(actualActor).then(() => {
      if (closeWait) return wait(closeWait).then(() => {
        deactivateActor(actualActor);
      });
    });
  }));
  await Promise.all(promises);
}

// src/lib/mirror.ts
function mirrorInsert(arg) {
  if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    theatre.mirrorInsertById(`theatre-${actor.id}`, false);
    return wait(500);
  } else {
    const speaking = currentlySpeaking();
    const active = currentlyActive();
    let actor = null;
    if (speaking instanceof Actor) actor = speaking;
    else if (active.length === 1 && active[0] instanceof Actor) actor = active[0];
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    theatre.mirrorInsertById(`theatre-${actor.id}`);
    return wait(500);
  }
}

// src/lib/standing.ts
function getStandingAnimations() {
  return [
    "none",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    ...Object.keys(Theatre.STANDING_ANIMS)
  ];
}
function isValidStandingAnimation(standing) {
  return getStandingAnimations().includes(standing);
}
function setTextStanding(standing, arg) {
  if (!isValidStandingAnimation(standing)) throw new InvalidStandingError(standing);
  if (arg === "narrator") {
    theatre.theatreNarrator.setAttribute("textstanding", standing);
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    if (!isActorActive(actor)) throw new ActorNotActiveError();
    theatre.setUserEmote(game.user?.id, `theatre-${actor.id}`, "textstanding", standing, false);
  } else if (theatre.speakingAs) {
    theatre.setUserEmote(game.user?.id, theatre.speakingAs, "textstanding", standing, false);
  } else if (isNarratorBarActive()) {
    theatre.theatreNarrator.setAttribute("textstanding", standing);
  } else {
    throw new InvalidActorError();
  }
}
function getTextStanding(arg) {
  if (arg === "narrator") {
    return theatre.theatreNarrator.getAttribute("textstanding");
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    return theatre.getInsertById(`theatre-${actor.id}`).textStanding;
  } else if (isNarratorBarActive()) {
    return theatre.theatreNarrator.getAttribute("textstanding");
  } else {
    const actor = currentlySpeaking();
    if (actor instanceof Actor) return theatre.getInsertById(`theatre-${actor.id}`).textStanding;
    throw new InvalidActorError();
  }
}

// src/lib/api.ts
var api_default = {
  wait,
  randomColor,
  activateActor,
  deactivateActor,
  isActorActive,
  isActorStaged,
  stageActor,
  unstageActor,
  sendMessage,
  setEmote,
  clearEmote,
  getActorIntroData,
  introduceActor,
  isNarratorBarActive,
  activateNarratorBar,
  deactivateNarratorBar,
  sendNarration,
  setTextFlyin,
  getTextFlyin,
  getTextStanding,
  setTextStanding,
  currentlySpeaking,
  currentlyActive,
  isValidFont,
  getFontName,
  setFontName,
  getFontSize,
  setFontSize,
  getFontColor,
  setFontColor,
  getFont,
  setFont,
  loadFont,
  mirrorInsert,
  getImage,
  setImage,
  getBaseImage,
  setBaseImage,
  popPortrait,
  flashPortrait
};

// src/lib/applications/SettingsHandler.ts
var POP_LINE_START = `let tweenId = "portraitPop";`;
var POP_LINE_END = `Theatre.instance._addDockTween(insert.imgId, tween, tweenId);`;
var FLASH_LINE_START = `tweenId = "portraitFlash";`;
var FLASH_LINE_END = `Theatre.instance._addDockTween(insert.imgId, tween, tweenId);`;
var THEATRE_CONSTANTS = {
  MODULE_ID: "theatre",
  PATH: "modules/theatre/",
  PREFIX_I18N: "Theatre",
  "API.EVENT_TYPE.sceneevent": "sceneevent",
  "API.EVENT_TYPE.typingevent": "typingevent",
  "API.EVENT_TYPE.resyncevent": "resyncevent",
  "API.EVENT_TYPE.reqresync": "reqresync",
  SOCKET: "module.theatre",
  NARRATOR: "Narrator",
  ICONLIB: "modules/theatre/assets/graphics/emotes",
  DEFAULT_PORTRAIT: "icons/mystery-man.png",
  PREFIX_ACTOR_ID: "theatre-"
};
var SettingsHandler = class _SettingsHandler {
  static {
    Hooks.on("theatreDockActive", () => {
      if (_SettingsHandler.GetSetting("hideActorName")) _SettingsHandler.HideActorNames();
      if (_SettingsHandler.GetSetting("hideTextBox")) _SettingsHandler.HideTextBox();
      if (_SettingsHandler.GetSetting("hideTypingIcon")) _SettingsHandler.HideTypingIcons();
    });
    Hooks.once("ready", () => {
      if (game.settings?.get("theatre-inserts-automation", "hideTextBox")) _SettingsHandler.HideTextBox();
      else _SettingsHandler.ShowTextBox();
      _SettingsHandler.OverrideCreateMessageHook();
    });
    Hooks.on("createChatMessage", async (message, data, userId) => {
      if (message.getFlag("theatre", "theatreMessage")) {
        if (!message.speaker.alias) {
          const typing = theatre.usersTyping[userId];
          if (!typing) return;
          const actorId = typing.theatreId.split("-")[1];
          const actor = game.actors.get(actorId);
          if (!(actor instanceof Actor)) throw new InvalidActorError();
          if (game.modules?.get("chat-portrait").active) {
            const portrait = message.getFlag("chat-portrait", "src");
            if (!portrait) {
              await message.setFlag("chat-portrait", "src", actor.img);
            }
          }
          message.updateSource({
            speaker: {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
              alias: actor.name
            }
          }, { recursive: true });
        }
      }
    });
  }
  /**
   * .... please do not look at this shameful, shameful fucntion
   */
  static OverrideCreateMessageHook() {
    const hook = _SettingsHandler.FindCreateMessageHook();
    if (!hook) throw new NoChatHookError();
    let hasFunctionDeclaration = false;
    const lines = hook.fn.toString().split("\n").filter((line, index, arr) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("function")) {
        hasFunctionDeclaration = true;
        return false;
      }
      if (index === arr.length - 1 && hasFunctionDeclaration) return false;
      if (trimmed.startsWith("KHelpers")) return false;
      if (trimmed.startsWith("Logger")) return false;
      return true;
    });
    const popStart = lines.findIndex((line) => line.trim() === POP_LINE_START);
    if (popStart !== -1) lines.splice(popStart, 0, `if (game.settings.get("${"theatre-inserts-automation"}", "suppressPopAnimation") !== true) {`);
    const popEnd = lines.findIndex((line, index) => index > popStart && line.trim() === POP_LINE_END);
    if (popEnd !== -1) lines.splice(popEnd + 1, 0, `}`);
    const flashStart = lines.findIndex((line) => line.trim() === FLASH_LINE_START);
    if (flashStart !== -1) lines.splice(flashStart, 0, `if (game.settings.get("${"theatre-inserts-automation"}", "suppressFlashAnimation") !== true) {`);
    const flashEnd = lines.findIndex((line, index) => index > flashStart && line.trim() === FLASH_LINE_END);
    if (flashEnd !== -1) lines.splice(flashEnd + 1, 0, `}`);
    let funcText = lines.join("\n");
    Object.entries(THEATRE_CONSTANTS).forEach(([key, value]) => {
      const parsedValue = typeof value === "string" ? `"${value}"` : value;
      funcText = funcText.replaceAll(new RegExp(`CONSTANTS.${key}`, "g"), parsedValue);
    });
    const newFn = new Function("chatEntity", "_", "userId", funcText);
    hook.fn = newFn;
  }
  static FindHook(name, lookup) {
    return Hooks.events[name].find((elem) => elem.fn.toString().split("\n").some((line) => line.trim() === lookup));
  }
  static FindPreCreateMessageHook() {
    return _SettingsHandler.FindHook("preCreateChatMessage", `Logger.debug("preCreateChatMessage", chatMessage);`);
  }
  static FindCreateMessageHook() {
    return _SettingsHandler.FindHook("createChatMessage", `Logger.debug("createChatMessage");`);
  }
  static GetSetting(setting) {
    return game.settings?.get("theatre-inserts-automation", setting);
  }
  static HideActorNames() {
    _SettingsHandler.IterateDocks((dock) => {
      dock.name = "";
    });
  }
  static HideTypingIcons() {
    setTimeout(() => {
      _SettingsHandler.IterateDocks((dock) => {
        if (!dock.typingBubble) return;
        else dock.typingBubble.renderable = false;
      });
    }, 100);
  }
  static ShowTypingIcons() {
    setTimeout(() => {
      _SettingsHandler.IterateDocks((dock) => {
        if (!dock.typingBubble) return;
        else dock.typingBubble.renderable = true;
      });
    }, 100);
  }
  static HideTextBox() {
    $("#theatre-bar").css("opacity", 0);
  }
  static ShowTextBox() {
    $("#theatre-bar").css("opacity", 1);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static IterateDocks(func) {
    theatre.portraitDocks.forEach(func);
  }
  static RegisterSettings() {
    game.settings?.register("theatre-inserts-automation", "hideTextBox", {
      name: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDECHATBOX.NAME"),
      hint: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDECHATBOX.HINT"),
      default: false,
      type: Boolean,
      config: true,
      scope: "world",
      onChange: (value) => {
        if (value) _SettingsHandler.HideTextBox();
        else _SettingsHandler.ShowTextBox();
      }
    });
    game.settings?.register("theatre-inserts-automation", "hideActorName", {
      name: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDEACTORNAME.NAME"),
      hint: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDEACTORNAME.HINT"),
      default: false,
      type: Boolean,
      config: true,
      scope: "world",
      onChange: (value) => {
        if (value) _SettingsHandler.HideActorNames();
      }
    });
    game.settings?.register("theatre-inserts-automation", "hideTypingIcon", {
      name: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDETYPINGICON.NAME"),
      hint: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDETYPINGICON.HINT"),
      default: false,
      type: Boolean,
      config: true,
      scope: "world",
      onChange: (hide) => {
        if (hide) _SettingsHandler.HideTypingIcons();
        else _SettingsHandler.ShowTypingIcons();
      }
    });
    game.settings?.register("theatre-inserts-automation", "suppressPopAnimation", {
      name: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDEPOPANIMATION.NAME"),
      hint: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDEPOPANIMATION.HINT"),
      default: false,
      type: Boolean,
      config: true,
      scope: "world"
    });
    game.settings?.register("theatre-inserts-automation", "suppressFlashAnimation", {
      name: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDEFLASHANIMATION.NAME"),
      hint: game.i18n?.localize("THEATREAUTOMATION.SETTINGS.HIDEFLASHANIMATION.HINT"),
      default: false,
      type: Boolean,
      config: true,
      scope: "world"
    });
  }
};

// src/module.ts
Hooks.once("init", () => {
  SettingsHandler.RegisterSettings();
});
Hooks.once("ready", async () => {
  if (game instanceof Game && !game.modules.get("theatre")?.active) {
    ui.notifications?.error(game.i18n?.format("THEATREAUTOMATION.ERRORS.THEATREINSERTSNOTFOUND", { MODULENAME: "Theatre Inserts Automation" }));
  } else {
    window.TheatreAutomation = api_default;
    await loadTemplates([
      `/modules/${"theatre-inserts-automation"}/templates/intro/application.hbs`
    ]);
    window.TheatreAutomation.STANDING_NAMES = getStandingAnimations();
    window.TheatreAutomation.FLYIN_NAMES = getFlyinAnimations();
    window.TheatreAutomation.FONT_NAMES = getFonts();
  }
});
//# sourceMappingURL=module.js.map
