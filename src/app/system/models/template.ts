
export interface DmTemplate {
    devices: TemplateConfig[];
    flows: TemplateConfig[];
}

interface TemplateConfig {
    id: string;
    label: string;
    selected?: string;
}

export interface TemplateOutput {
    [key: string]: number[];
}
