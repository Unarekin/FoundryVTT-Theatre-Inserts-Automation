import { activateActor, currentlyActive, currentlySpeaking, deactivateActor, isActorActive } from "./activation";
import { clearEmote, setEmote } from "./emotes";
import { getTextFlyin, setTextFlyin } from "./flyins";
import { getFont, getFontSize, isValidFont, setFontName, getFontName, setFontSize, setFont, getFontColor, setFontColor, loadFont } from './fonts';
import { getBaseImage, getImage, setBaseImage, setImage } from "./image";
import { getActorIntroData, introduceActor } from "./introduction";
import { sendMessage } from "./messaging";
import { mirrorInsert } from "./mirror";
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
  setBaseImage
};
