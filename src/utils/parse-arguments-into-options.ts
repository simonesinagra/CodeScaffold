import arg from "arg";

import { getTemplate } from "./get-template";

import type { Args, RawOptions } from "../types";

export async function parseArgumentsIntoOptions(
	rawArgs: Args
): Promise<RawOptions> {
	const args = arg(
		{
			"--git": Boolean,
			"--yes": Boolean,
			"--install": Boolean,
			"--template": String,
			"-g": "--git",
			"-y": "--yes",
			"-i": "--install",
			"-t": "--template",
		},
		{
			argv: rawArgs.slice(2),
		}
	);

	const rawTemplate = args["--template"];
	const template = await getTemplate(rawTemplate);

	const projectName = args._[0];

	return {
		git: args["--git"] || false,
		install: args["--install"] || false,
		projectName,
		skipPrompts: args["--yes"] || false,
		template,
	};
}
