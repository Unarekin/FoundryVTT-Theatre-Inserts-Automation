import { activateActor, deactivateActor, isActorActive } from "./activation";
import { clearEmote, setEmote } from "./emotes";
import { sendMessage } from "./messaging";
import { wait } from "./misc";
import { isActorStaged, stageActor, unstageActor } from "./staging";

export default {
  wait,
  activateActor,
  deactivateActor,
  isActorActive,
  isActorStaged,
  stageActor,
  unstageActor,
  sendMessage,
  setEmote,
  clearEmote
};
