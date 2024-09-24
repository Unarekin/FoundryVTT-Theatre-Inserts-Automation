import { activateActor, currentlyActive, currentlySpeaking, deactivateActor, isActorActive } from "./activation";
import { FLYIN_NAMES } from "./constants";
import { clearEmote, getTextFlyin, setEmote, setTextFlyin } from "./emotes";
import { getActorIntroData, introduceActor } from "./introduction";
import { sendMessage } from "./messaging";
import { wait } from "./misc";
import { activateNarratorBar, deactivateNarratorBar, isNarratorBarActive, sendNarration } from "./narration";
import { isActorStaged, stageActor, unstageActor } from "./staging";
import { getTextStanding, setTextStanding } from "./standing";

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
  clearEmote,
  getActorIntroData,
  introduceActor,

  isNarratorBarActive,
  activateNarratorBar,
  deactivateNarratorBar,
  sendNarration,

  setTextFlyin,
  getTextFlyin,

  FLYIN_NAMES,

  getTextStanding,
  setTextStanding,

  currentlySpeaking,
  currentlyActive
};
