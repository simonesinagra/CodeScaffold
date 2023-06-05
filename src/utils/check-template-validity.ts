import { templates } from "../types";

import type { Template } from "../types";

export function checkTemplateValidity(template: unknown): template is Template {
	return (
		typeof template === "undefined" ||
		(typeof template == "string" &&
			(template.startsWith("file:") || template in templates))
	);
}
