import { currentlyActive, currentlySpeaking } from "./activation";
import { coerceActor } from "./coercion";
import { InvalidActorError } from "./errors";
import { wait } from "./misc";

export function mirrorInsert(): Promise<void>
export function mirrorInsert(id: string): Promise<void>
export function mirrorInsert(name: string): Promise<void>
export function mirrorInsert(actor: Actor): Promise<void>
export function mirrorInsert(token: Token): Promise<void>
export function mirrorInsert(arg?: unknown): Promise<void> {
  if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    theatre.mirrorInsertById(`theatre-${actor.id}`, false);
    return wait(500);
  } else {
    const speaking = currentlySpeaking();
    const active = currentlyActive();
    let actor: Actor | null = null;
    if (speaking instanceof Actor) actor = speaking;
    else if (active.length === 1 && active[0] instanceof Actor) actor = active[0];

    if (!(actor instanceof Actor)) throw new InvalidActorError();
    theatre.mirrorInsertById(`theatre-${actor.id}`);
    return wait(500);
  }
}