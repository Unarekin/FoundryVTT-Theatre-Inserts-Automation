export type FontSize = 1 | 2 | 3;

export interface IntroductionApplicationData {
  selectedActor?: Actor;
  selectedSound?: PlaylistSound;
  musicWait?: number;
  portraitWait?: number;
  introMessage?: string;
  closeWait?: number;
}

export interface IntroductionApplicationFormData {
  actorSelect: string;
  soundSelect: string;
  musicWait: number;
  portraitWait: number;
  introMessage: string;
  closeWait: number;
}

export interface ActorContext {
  name: string;
  id: string;
  img: string;
  selected: boolean;
}

export interface SoundContext {
  name: string;
  id: string;
  duration: number;
  selected: boolean;
}

export interface PlaylistContext {
  name: string;
  id: string;
  sounds: SoundContext[]
}

export type EventMap = {
  'render': [];
  'submit': [response: IntroductionApplicationData];
  'cancel': [];
  'close': [];
}


export interface FontConfig {
  name: string;
  size: FontSize;
  color: string;
}


export interface ImageResource {
  imgpath: string;
  resname: string;
}

export type Orientation = "left" | "right";

export interface ActorInsert {
  dockContainer: PIXI.Container;
  emote: string | null;
  exitOrientation: Orientation;
  imgId: string;
  meta: unknown;
  mirrored: boolean;
  name: string;
  nameOrientation: Orientation;
  optAlign: string;
  order: number;
  portraitContainer: PIXI.Container;
  portrait: PIXI.Sprite | null;
  renderOrder: number;
  textColor: string | null;
  textFlyin: string | null;
  textFont: string | null;
  textSize: string | null;
  textStanding: string | null;
  tweens: unknown;
  typingBubble: PIXI.Sprite | null;
  label: PIXI.Text | null;
}