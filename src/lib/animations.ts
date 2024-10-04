/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { coerceActor } from "./coercion";
import { ActorNotActiveError, InvalidActorError, InvalidColorError } from "./errors";
import { isValidColor } from "./misc";

/**
 * Plays the "pop" animation for an {@link Actor}'s portrait, similar to when sending a chat message.
 * @param {string} id 
 * @param {number} [duration=250] Duration, in milliseconds, of animation
 */
export function popPortrait(id: string, duration?: number): Promise<void>
/**
 * Plays the "pop" animation for an {@link Actor}'s portrait, similar to when sending a chat message.
 * @param {string} name 
 * @param {number} [duration=250] Duration, in milliseconds, of animation
 */
export function popPortrait(name: string, duration?: number): Promise<void>
/**
 * Plays the "pop" animation for an {@link Actor}'s portrait, similar to when sending a chat message.
 * @param {Actor} actor {@link Actor}
 * @param {number} [duration=250] Duration, in milliseconds, of animation
 */
export function popPortrait(actor: Actor, duration?: number): Promise<void>
/**
 * Plays the "pop" animation for an {@link Actor}'s portrait, similar to when sending a chat message.
 * @param {Token} token {@link Token}
 * @param {number} [duration=250] Duration, in milliseconds, of animation
 */
export function popPortrait(token: Token, duration?: number): Promise<void>
export function popPortrait(arg: unknown, duration?: number): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      
      const actor = coerceActor(arg);
      if (!(actor instanceof Actor)) throw new InvalidActorError();

      const insert = theatre.getInsertById(`theatre-${actor.id}`);
      if (!insert) throw new ActorNotActiveError();

      const tweenId = "portraitPop";
      const tween = TweenMax.to(insert.portraitContainer, duration ? duration/1000 : 0.25, {
        pixi: { scaleX: insert.mirrored ? -1.05 : 1.05, scaleY: 1.05 },
        ease: Power3.easeOut,
        repeat: 1,
        yoyo: true,
        onComplete: function (ctx: any, imgId: string, tweenId: string) {
          const insert = theatre.getInsertById(imgId);
          if (insert) {
            this.targets()[0].scale.x = insert.mirrored ? -1 : 1;
            this.targets()[0].scale.y = 1;
          }
          ctx._removeDockTween(imgId, this, tweenId);
          resolve();
        },
        onCompleteParams: [theatre, insert.imgId, tweenId]
      });
      (<any>theatre)._addDockTween(insert.imgId, tween, tweenId);
    } catch (err: any) {
      reject(err);
    }
  });
}

/**
 * Flashes an {@link Actor}'s portrait a given color.
 * @param {string} {string} id 
 * @param {string} color Color to flash.  Will be adjusted slightly so as to not be too dark.
 * @param {number} [duration=250] Duration, in milliseconds, of the animation.
 */
export function flashPortrait(id: string, color: string, duration?: number): Promise<void>
/**
 * Flashes an {@link Actor}'s portrait a given color.
 * @param {string} name 
 * @param {string} color Color to flash.  Will be adjusted slightly so as to not be too dark.
 * @param {number} [duration=250] Duration, in milliseconds, of the animation.
 */
export function flashPortrait(name: string, color: string, duration?: number): Promise<void>
/**
 * Flashes an {@link Actor}'s portrait a given color.
 * @param {Actor} actor {@link Actor}
 * @param {string} color Color to flash.  Will be adjusted slightly so as to not be too dark.
 * @param {number} [duration=250] Duration, in milliseconds, of the animation.
 */
export function flashPortrait(actor: Actor, color: string, duration?: number): Promise<void>
/**
 * Flashes an {@link Actor}'s portrait a given color.
 * @param {Token} token {@link Token}
 * @param {string} color Color to flash.  Will be adjusted slightly so as to not be too dark.
 * @param {number} [duration=250] Duration, in milliseconds, of the animation.
 */
export function flashPortrait(token: Token, color: string, duration?: number): Promise<void>
export function flashPortrait(arg: unknown, color: string, duration?: number): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      if (!isValidColor(color)) throw new InvalidColorError(color);
      const actor = coerceActor(arg);
      if (!(actor instanceof Actor)) throw new InvalidActorError();
      const insert = theatre.getInsertById(`theatre-${actor.id}`);
      if (!insert) throw new ActorNotActiveError();

      const tweenId = "portraitFlash";
      const tween = TweenMax.to(insert.portrait, duration ? duration/1000 : 0.25, {
        pixi: {
          tint: theatre.getPlayerFlashColor(null, color)
        },
        ease: Power3.easeOut,
        repeat: 1,
        yoyo: true,
        onComplete: function(ctx: any, imgId: string, tweenId: string) {
          this.targets()[0].tint=0xffffff;
          ctx._removeDockTween(imgId, this, tweenId);
          resolve();
        },
        onCompleteParams: [theatre, insert.imgId, tweenId]
      });
      (<any>theatre)._addDockTween(insert.imgId, tween, tweenId);

    } catch (err: any) {
      reject(err);
    }
  })
}