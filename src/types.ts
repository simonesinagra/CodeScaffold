export const templates = ["plain-js", "plain-ts"] as const;

export type Args = string[];

export type SupportedTemplate = (typeof templates)[number];
export type CustomTemplate = `file:${string}`;
export type Template = SupportedTemplate | CustomTemplate;

export type RawOptions = {
	git: boolean;
	install: boolean;
	projectName: string;
	skipPrompts: boolean;
	template?: Template;
};

export type Options = Omit<RawOptions, "skipPrompts"> & {
	template: Template;
};
