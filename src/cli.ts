import { parseArgumentsIntoOptions } from './utils/parse-arguments-into-options';

import type { Args } from './types';

export function cli(args: Args) {
    const options = parseArgumentsIntoOptions(args);

    console.log(options);
}