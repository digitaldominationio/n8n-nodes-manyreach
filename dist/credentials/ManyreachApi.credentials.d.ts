import { ICredentialType, INodeProperties, ICredentialTestRequest } from 'n8n-workflow';
export declare class ManyreachApi implements ICredentialType {
    name: string;
    displayName: string;
    icon: "file:manyreach.svg";
    documentationUrl: string;
    properties: INodeProperties[];
    test: ICredentialTestRequest;
}
