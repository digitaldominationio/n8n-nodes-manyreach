import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ManyreachApi implements ICredentialType {
	name = 'manyreachApi';
	displayName = 'Manyreach API';
	documentationUrl = '';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
	];
}