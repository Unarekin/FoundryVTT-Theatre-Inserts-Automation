import { IntroductionApplication } from "./applications/IntroductionApplication";

export async function introduceActor(): Promise<object | undefined> {

  return new Promise(resolve => {
    const app = new IntroductionApplication({}, {});
    app.once("close", data => { resolve(data); });
    app.render(true);
  });

}