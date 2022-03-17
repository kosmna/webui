
export interface SelectVersion {
    label: string;
    options: string[];
}

export const DefualtInputs = [
    {
        'description': 'Enter stack name',
        'label': 'Name',
        'required': true,
        'variable': 'stack_name',
        'type': 'string'
    },
    {
        'description': 'Enter stack description',
        'label': 'Description',
        'required': true,
        'variable': 'stack_description',
        'type': 'string'
    }
];
