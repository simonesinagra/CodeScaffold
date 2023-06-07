import inquirer from "inquirer";

import { templates, type Options, type RawOptions } from "../types";

// default values for unspecified args
const defaultOptions: Omit<Options, "projectName"> = {
	git: false,
	install: false,
	template: templates[0],
};

// --yes flag is passed
const skipOptions: Omit<Options, "projectName" | "template"> = {
	git: true,
	install: true,
};

export async function promptForMissingOptions(
	options: RawOptions
): Promise<Options> {
	if (options.skipPrompts) {
		options = { ...options, ...skipOptions };
	}

	const questions = [];

	if (!options.projectName) {
		questions.push({
			type: "input",
			name: "project",
			message: "Please type project's name (cannot be empty)",
			validate: (value: string) => value.length > 0,
		});
	}

	if (!options.template) {
		questions.push({
			type: "list",
			name: "template",
			message: "Please choose which project template to use",
			choices: [
				{ name: "TypeScript", value: "typescript" },
				{ name: "JavaScript", value: "javascript" },
			],
			default: defaultOptions.template,
		});
	}

	if (!options.git) {
		questions.push({
			type: "confirm",
			name: "git",
			message: "Initialize a git repository?",
			default: defaultOptions.git,
		});
	}

	if (!options.install) {
		questions.push({
			type: "confirm",
			name: "install",
			message: "Install packages?",
			default: defaultOptions.install,
		});
	}

	const answers = await inquirer.prompt(questions);

	return {
		git: options.git || answers.git,
		install: options.install || answers.install,
		projectName: options.projectName || answers.project,
		template: options.template || answers.template,
	};
}
