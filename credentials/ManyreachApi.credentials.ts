import {
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class ManyreachApi implements ICredentialType {
	name = 'manyreachApi';
	displayName = 'Manyreach API';
	icon = 'file:manyreach.svg' as const;
	documentationUrl = 'https://app.manyreach.com/api-docs';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	];
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.manyreach.com/api/v2',
			url: '/workspaces',
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};
}