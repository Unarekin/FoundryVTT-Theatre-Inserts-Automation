import { ImageResource, ActorInsert } from "./interfaces";


const SYNTHETIC_ACTORS: { [x: string]: Actor } = {};


export function getSyntheticActor(id: string): Actor | undefined {
  return SYNTHETIC_ACTORS[id];
}


export async function createSyntheticInsert(name: string, image: string, isLeft: boolean = true): Promise<ActorInsert> {
  const id = foundry.utils.randomID();

  const portraitContainer = new PIXI.Container();
  const dockContainer = new PIXI.Container();

  dockContainer.addChild(portraitContainer);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  theatre.pixiCTX?.stage?.addChild(dockContainer);

  const insert: ActorInsert = {
    imgId: `theatre-${id}`,
    dockContainer,
    portraitContainer,
    name,
    emote: null,
    textFlyin: null,
    textStanding: null,
    textFont: null,
    textSize: null,
    textColor: null,
    portrait: null,
    label: null,
    typingBubble: null,
    exitOrientation: isLeft ? "left" : "right",
    nameOrientation: "left",
    optAlign: "top",
    mirrored: false,
    tweens: {},
    order: 0,
    renderOrder: 0,
    meta: {}
  }

  theatre.portraitDocks.push(insert);


  // Create temporary nav item
  const navItem = document.createElement("img");
  navItem.classList.add("theatre-control-nav-bar-item");
  navItem.setAttribute("imgid", `theatre-${id}`);
  navItem.setAttribute("src", image);
  navItem.setAttribute("title", name);
  navItem.setAttribute("name", name);
  navItem.setAttribute("optalign", isLeft ? "left" : "right");

  navItem.style.display = "none";

  document.querySelector(".theatre-control-nav-bar")?.appendChild(navItem);


  const imgSrcs: ImageResource[] = [
    {
      imgpath: "modules/theatre/assets/graphics/typing.png",
      resname: "modules/theatre/assets/graphics/typing.png"
    },
    {
      imgpath: image,
      resname: image
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ...(Theatre.getActorRiggingResources(id)).map(({ path }: { path: string }) => ({ imgpath: path, resname: path })) as ImageResource[]
  ];

  // console.log("Sources:", imgSrcs);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const resources = await (<any>theatre)._addSpritesToPixi(imgSrcs);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const portWidth = resources[image].width;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const initX: number = isLeft ? -1 * portWidth : theatre.theatreDock.offsetWidth + portWidth;

  dockContainer.x = initX;
  // // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  // await (<any>theatre)._setupPortraitContainer(image, "left", image, resources, true);


  // const imgResources = Object.fromEntries(imgSrcs.map(src => [src.resname, src.imgpath]));
  // console.log("Image resources:", imgResources);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  await (<any>theatre)._setupPortraitContainer(`theatre-${id}`, isLeft ? "left" : "right", image, resources, false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  (<any>theatre.stage)[insert.imgId] = { actor: null, navElement: navItem };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const actor = game.actors.createDocument({ name, type: Object.keys(game.system?.documentTypes.Actor ?? {})[0] });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  SYNTHETIC_ACTORS[id] = {
    ...actor,
    id,
    _id: id
  };

  return insert;
}