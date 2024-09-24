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
