import chalk from "chalk";
import Listr from "listr";
import path from "path";
import { fileURLToPath } from "url";

import { copyTemplateFiles } from "./utils/copy-template-files";
import { initGitRepo } from "./utils/init-git-repo";
import { installPackages } from "./utils/install-packages";

import type { Options } from "./types";

export async function createProject(options: Options) {
	const targetDirectory = process.cwd();
	const currentFileUrl = import.meta.url;
	const templateDirectory = path.resolve(
		decodeURI(fileURLToPath(currentFileUrl)),
		"../../templates",
		options.template.toLowerCase()
	);

	const tasks = new Listr([
		{
			title: "Copy project files",
			task: () => copyTemplateFiles(templateDirectory, targetDirectory),
		},
		{
			title: "Initialize git",
			task: () => initGitRepo(targetDirectory),
			enabled: () => options.git,
		},
		{
			title: "Install dependencies",
			task: () => installPackages(targetDirectory),
			skip: () => {
				if (!options.install) {
					return "Pass --install or -i to automatically install dependencies";
				}
			},
		},
	]);

	try {
		await tasks.run();

		console.log("%s Project ready", chalk.green.bold("DONE"));
	} catch (error) {
		console.log("%s Error occurred", chalk.red.bold("ERROR"));
	}
}
