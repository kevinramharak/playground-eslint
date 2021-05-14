
# typescript-playground-plugin-vue

Easily create TypeScript [Playground Plugins](https://www.typescriptlang.org/v2/dev/playground-plugins/) with [Vue](https://v3.vuejs.org/).

> 🚧 This project is experimental. If you have any ideas on how to improve this library, any contributions are welcomed. Also, working on TypeScript Playground plugins currently only can work in Chromium based browsers.

Prefer Svelte? Check out [https://github.com/gojutin/typescript-playground-plugin-svelte](https://github.com/gojutin/typescript-playground-plugin-svelte).

Prefer React? Check out [https://github.com/gojutin/typescript-playground-plugin-react](https://github.com/gojutin/typescript-playground-plugin-react).

## About
The TypeScript Playground V2 comes packed with lots of new features, including the ability to create plugins. Per the [TypeScript docs](https://www.typescriptlang.org/dev/playground-plugins/):

> The new TypeScript Playground allows people to hook into the Playground and extend it in ways in which the TypeScript team don't expect.
>
> The sidebar of the Playground uses the same plugin infrastructure as external plugins, so you have the same level of access as the playground to build interesting projects.
>
> Playground plugins have no fancy frameworks, you're free to inject them at runtime and use them if you need to - but the current plugins are built with the DOM APIs and TypeScript.

## Getting Started

#### Step 1. Clone this repo and navigate to the directory

```sh
git clone https://github.com/kevinramharak/typescript-playground-plugin-vue.git
```

```sh
cd typescript-playground-plugin-vue
```

#### Step 2. Download dependencies

```sh
yarn install
```

#### Step 3. Start the local web server and the build process

```sh
# webserver
yarn serve

# build process
yarn watch:build
```

This will start a development server in watch mode. As you edit any files in the `src` directory, the app will recompile and update `dist/index.js`, which is the file that is served to the TypeScript Playground.

> _Note: This does not reload the browser when your files change. In order to see your changes, the browser will need to be manually reloaded each time you make changes to the plugin._

#### Step 4. Configure and use your plugin

You can further customize your plugin by modifying the `customPlugin` object in `src/index.ts`. For instance, you can change the `displayName` property to change the label of the tab for your plugin. See the `PlaygroundPlugin` interface in `vendor/playground.d.ts` for all of the available options.

Visit [https://www.typescriptlang.org/v2/en/play](https://www.typescriptlang.org/v2/en/play).

Select the **Options** tab and tick the box for **Connect to localhost:5000/index.js**.

Now, **refresh the browser**. When the playground reeoads, a new tab with your plugin should appear! 🎉

## Playground API
Currently the `sandbox: Sandbox` and `utils: PluginUtils` objects are passed down as props to the root level component. A more preferable implementation would be to expose some reactive hooks to interact with the playground. An example of this is the exported `code` reference from `src/playground`. This reference can be used to react to when the editor content changes.

For more info check the [barebones playground template](https://github.com/microsoft/TypeScript-Website/blob/v2/packages/create-typescript-playground-plugin/template/CONTRIBUTING.md).

## Lifecycle hooks
You can use the [`activated`](https://v3.vuejs.org/api/options-lifecycle-hooks.html#activated) and the [`deactivated`](https://v3.vuejs.org/api/options-lifecycle-hooks.html#deactivated) life cycle hooks to react to the tab gaining or losing focus.

## .env files
Vite supports [`.env`](https://vitejs.dev/guide/env-and-mode.html) files. These files are used for the following playground plugin properties:
```ts
const plugin: PlaygroundPlugin = {
    displayName: VITE_PLUGIN_DISPLAY_NAME,
    id: VITE_PLUGIN_ID,
}
```

## Devtools
Use the [beta version that supports v3](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg). Even if it shows 'VueJS not detected' you should be able to open the Vue tab and use the devtools.
