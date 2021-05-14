
import type { PluginUtils } from '../vendor/pluginUtils';
import type { PlaygroundPlugin } from '../vendor/playground';
import {
    App as VueApp, ComponentPublicInstance as VueComponent, createApp as createVueApp, defineComponent,
} from 'vue'
import { useState } from '@/composables/state';

function setupDevTools(app: VueApp) {
    if ((window as any).__VUE_DEVTOOLS_GLOBAL_HOOK__ != null) {
        (window as any).__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;
    }
}

export const [_code, setCode] = useState('');

export const code = _code;

/**
 * @param shouldBeSelected Should this plugin be selected when the plugin is first loaded? Lets you check for query vars etc to load a particular plugin
 */
export function bootstrap(App: ReturnType<typeof defineComponent>, shouldBeSelected?: () => boolean) {
    return function makePlugin(utils: PluginUtils): PlaygroundPlugin {
        const $container = document.createElement('div');
        let vm: VueComponent, app: VueApp;

        // TODO: add ref/reactive objects to interact with the playground/sandbox/monaco
        //       preferably without using props/provide/inject, just ref/reactives exported in a shared file (readonly?)

        return {
            displayName: import.meta.env.VITE_PLUGIN_DISPLAY_NAME,
            id: import.meta.env.VITE_PLUGIN_ID,
            willMount(sandbox, $root) {
                // initialize the Vue application when we have access to the `sandbox` value
                if (!vm) {
                    app = createVueApp(App, {
                        utils,
                        sandbox,
                    });
                    if (import.meta.env.DEV) {
                        setupDevTools(app);
                    }
                    vm = app.mount($container);
                }
            },
            didMount(sandbox, $root) {
                $root.appendChild($container);
                if (typeof vm.$options.activated === 'function') {
                    vm.$options.activated.call(vm);
                }
            },
            willUnmount(sandbox, $root) {
                $root.removeChild($container);
            },
            didUnmount(sandbox, $root) {
                if (typeof vm.$options.deactivated === 'function') {
                    vm.$options.deactivated.call(vm);
                }
            },
            modelChangedDebounce(sandbox, model, $root) {
                setCode(sandbox.getText());
            },
            shouldBeSelected,
        };
    }
}
