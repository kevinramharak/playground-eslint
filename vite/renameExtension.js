
/**
 * @param {string} endsWith
 * @param {string} replaceValue
 */
export function renameExtension(endsWith, replaceValue) {
    const regex = new RegExp(`${endsWith}$`);
    return {
        name: 'rename-extension',
        /**
         * @this {import('rollup').PluginContext}
         * @param {import('rollup').PluginContext} this
         * @param {import('rollup').NormalizedOutputOptions} options 
         * @param {import('rollup').OutputBundle} bundle 
         * @param {boolean} isWrite 
         */
        generateBundle(options, bundle, isWrite) {
            for (const [,info] of Object.entries(bundle)) {
                switch (info.type) {
                    case 'asset':
                        continue;
                }
                if (regex.test(info.fileName)) {
                    info.fileName = info.fileName.replace(regex, replaceValue);
                }
            }
        }
    }
}