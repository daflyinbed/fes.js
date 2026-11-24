import type { IPluginAPI } from '@fesjs/shared';

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pkg from '../package.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (api: IPluginAPI) => {
    api.addRuntimePluginKey(() => 'request');

    const namespace = 'plugin-request';
    const absoluteFilePath = `${namespace}/request.js`;

    const { Mustache, winPath } = api.utils;
    api.onGenerateFiles(() => {
        api.writeTmpFile({
            path: absoluteFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'template/request.js.tpl'), 'utf-8'), {
                clientPath: JSON.stringify(winPath(join(__dirname, 'client.mjs'))),
            }),
        });
    });

    api.addPluginExports(() => [
        {
            exportAll: true,
            source: absoluteFilePath,
        },
    ]);

    api.addConfigType(() => ({
        source: pkg.name,
    }));
};
