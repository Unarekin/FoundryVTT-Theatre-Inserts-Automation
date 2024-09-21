<<<<<<< HEAD
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Unarekin/FoundryVTT-Module-Template/main.yml)
![GitHub License](https://img.shields.io/github/license/Unarekin/FoundryVTT-Module-Template)
![GitHub package.json version](https://img.shields.io/github/package-json/v/Unarekin/FoundryVTT-Module-Template)

# What is This?

This is a version of [the League of Foundry Developers module template](https://github.com/League-of-Foundry-Developers/FoundryVTT-Module-Template) with some customizations to suit my particular preferences.

## Key Features

- esbuild build pipeline
- Supports TypeScript and SASS
- Supports language definitions being split into multiple JSON files, for easier organizing of larger projects.
- Fixes [an issue](https://github.com/League-of-Foundry-Developers/FoundryVTT-Module-Template/issues/26) from the original repository, a PR for which is still waiting to be merged.
- Lints code with ESLint and caching, to prevent having to lint the entire project every single time.

# Setup Instructions

The first step is to fork the repository into your own, then clone that.

After that, you will likely want to ensure that `build.mjs` has execute permissions

On Linux:

```console
chmod +x build.mjs
```

On Windows, it may actually just be simpler to adjust the `build` and `build:prod` scripts in `package.json` to call `node build.mjs` rather than `build.js` directly.

## Installing dependencies

The build script uses several external dependencies. To install them:

With npm:

```console
npm install
```

With yarn:

```console
yarn
```

Yeah that's it. Easy peasy.

## Building

There are two types of build: development and production. The sole difference between the two is that a production type build does not include sourcemaps.

For a development build:

npm:

```console
npm run build
```

yarn:

```console
yarn build
```

You can also just run `build.mjs` directly.

For a production build:
npm:

```console
npm run build:prod
```

yarn:

```console
yarn build:prod
```

# Versioned Module Release

For instructions on how to build a proper module release, see [the original module's README](https://github.com/League-of-Foundry-Developers/FoundryVTT-Module-Template/blob/master/README.md).
=======
![](https://img.shields.io/badge/Foundry-v10-informational)
<!--- Downloads @ Latest Badge -->
<!--- replace <user>/<repo> with your username/repository -->
<!--- ![Latest Release Download Count](https://img.shields.io/github/downloads/<user>/<repo>/latest/module.zip) -->

<!--- Forge Bazaar Install % Badge -->
<!--- replace <your-module-name> with the `name` in your manifest -->
<!--- ![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2F<your-module-name>&colorB=4aa94a) -->


# How to use this Template to create a versioned Release

1. Open your repository's releases page.

![Where to click to open repository releases.](https://user-images.githubusercontent.com/7644614/93409301-9fd25080-f864-11ea-9e0c-bdd09e4418e4.png)

2. Click "Draft a new release"

![Draft a new release button.](https://user-images.githubusercontent.com/7644614/93409364-c1333c80-f864-11ea-89f1-abfcb18a8d9f.png)

3. Fill out the release version as the tag name.

If you want to add details at this stage you can, or you can always come back later and edit them.

![Release Creation Form](https://user-images.githubusercontent.com/7644614/93409543-225b1000-f865-11ea-9a19-f1906a724421.png)

4. Hit submit.

5. Wait a few minutes.

A Github Action will run to populate the `module.json` and `module.zip` with the correct urls that you can then use to distribute this release. You can check on its status in the "Actions" tab.

![Actions Tab](https://user-images.githubusercontent.com/7644614/93409820-c1800780-f865-11ea-8c6b-c3792e35e0c8.png)

6. Grab the module.json url from the release's details page.

![image](https://user-images.githubusercontent.com/7644614/93409960-10c63800-f866-11ea-83f6-270cc5d10b71.png)

This `module.json` will only ever point at this release's `module.zip`, making it useful for sharing a specific version for compatibility purposes.

7. You can use the url `https://github.com/<user>/<repo>/releases/latest/download/module.json` to refer to the manifest.

This is the url you want to use to install the module typically, as it will get updated automatically.

# How to List Your Releases on Package Admin

To request a package listing for your first release, go to the [Package Submission Form](https://foundryvtt.com/packages/submit) (accessible via a link at the bottom of the "[Systems and Modules](https://foundryvtt.com/packages/)" page on the Foundry website).

Fill in the form. "Package Name" must match the name in the module manifest.  Package Title will be the display name for the package.  Package URL should be your repo URL.
![image](https://user-images.githubusercontent.com/36359784/120664263-b49e5500-c482-11eb-9126-af7006389903.png)


One of the Foundry staff will typically get back to you with an approval or any further questions within a few days, and give you access to the package admin pages.

Once you have access to the [module admin page](https://foundryvtt.com/admin/packages/package/), you can release a new version by going into the page for your module, scrolling to the bottom, and filling in a new Package Version.

When listing a new version, Version should be the version number you set above, and the Manifest URL should be the manifest __for that specific version__ (do not use /latest/ here).
![image](https://user-images.githubusercontent.com/36359784/120664346-c4b63480-c482-11eb-9d8b-731b50d70939.png)

> ### :warning: Important :warning:
> 
> It is very important that you use the specific release manifest url, and not the `/latest` url here. For more details about why this is important and how Foundry Installs/Updates packages, read [this wiki article](https://foundryvtt.wiki/en/development/guides/releases-and-history).

Clicking "Save" in the bottom right will save the new version, which means that anyone installing your module from within Foundry will get that version, and a post will be generated in the #release-announcements channel on the official Foundry VTT Discord.


# FoundryVTT Module

Does something, probably

## Changelog
>>>>>>> release/0.0.3
