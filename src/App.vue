<template>
</template>

<style>
</style>

<script lang="ts">
import { defineComponent, PropType, watch } from "vue";

import type { PluginUtils } from "./vendor/pluginUtils";
import type { Sandbox } from "./vendor/sandbox";

import { code } from './playground';

import ts from 'typescript';

export default defineComponent({
    name: "Plugin",
    components: {},
    props: {
        utils: Object as PropType<PluginUtils>,
        sandbox: Object as PropType<Sandbox>,
    },
    mounted() {
        console.log('ts', ts);

        watch(code, code => {
            console.log(`the current editor model has a length of ${code.length}`);
        });
    },
    activated() {
        console.log('actived');
    },
    deactivated() {
        console.log('deactived');
    }
});
</script>
