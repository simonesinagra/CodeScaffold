import { templates } from '../types';

import type { Template } from '../types';

export function checkTemplateValidity(template: unknown): template is Template {
    return typeof template == 'string' && template in templates;
}