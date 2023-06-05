import chalk from "chalk";
import Listr from "listr";
import path from "path";

import { getTemplateDirectory } from "./utils/get-template-directory";
import { copyTemplateFiles } from "./utils/copy-template-files";
import { createProjectDirectory } from "./utils/create-project-directory";
import { initGitRepo } from "./utils/init-git-repo";
import { installPackages } from "./utils/install-packages";

import type { Options } from "./types";

export async function createProject(options: Options) {
	const templateDirectory = getTemplateDirectory(options.template);
	const targetDirectory = path.resolve(process.cwd(), options.projectName);

	const tasks = new Listr([
		{
			title: "Create project directory",
			task: () =>
				createProjectDirectory(options.projectName, process.cwd()),
		},
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
