export const templates = [
	"plain-js",
	"plain-ts",
	"react-ts-tailwind",
	"nextjs-ts-tailwind (Pages Router)",
	"nextjs-ts-tailwind (App Router)",
] as const;

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
