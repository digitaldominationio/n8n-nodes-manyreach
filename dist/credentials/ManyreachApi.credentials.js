"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManyreachApi = void 0;
class ManyreachApi {
    constructor() {
        this.name = 'manyreachApi';
        this.displayName = 'Manyreach API';
        this.icon = 'file:manyreach.svg';
        this.documentationUrl = 'https://app.manyreach.com/api-docs';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                required: true,
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'X-API-Key': '={{$credentials.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://api.manyreach.com/api/v2',
                url: '/workspaces',
            },
        };
    }
}
exports.ManyreachApi = ManyreachApi;
//# sourceMappingURL=ManyreachApi.credentials.js.map