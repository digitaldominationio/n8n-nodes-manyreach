import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
	NodeConnectionTypes,
} from 'n8n-workflow';

export class Manyreach implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Manyreach',
		name: 'manyreach',
		icon: 'file:manyreach.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Manyreach API v2',
		defaults: { name: 'Manyreach' },
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'manyreachApi', required: true }],
		properties: [
			// ══════════════════════════════════════════════════════
			// RESOURCE
			// ══════════════════════════════════════════════════════
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Campaign', value: 'campaign' },
					{ name: 'Clientspace', value: 'clientspace' },
					{ name: 'Follow-Up', value: 'followup' },
					{ name: 'List', value: 'list' },
					{ name: 'Message', value: 'message' },
					{ name: 'Prospect', value: 'prospect' },
					{ name: 'Sender', value: 'sender' },
					{ name: 'Sequence', value: 'sequence' },
					{ name: 'Tag', value: 'tag' },
					{ name: 'User', value: 'user' },
					{ name: 'Whitelabel', value: 'whitelabel' },
					{ name: 'Workspace', value: 'workspace' },
				],
				default: 'campaign',
			},

			// ══════════════════════════════════════════════════════
			// OPERATIONS per resource
			// ══════════════════════════════════════════════════════
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['campaign'] } },
				options: [
					{ name: 'Copy', value: 'copy', action: 'Copy a campaign' },
					{ name: 'Create', value: 'create', action: 'Create a campaign' },
					{
						name: 'Create Sequence',
						value: 'createSequence',
						action: 'Create a campaign sequence',
					},
					{ name: 'Delete', value: 'delete', action: 'Delete a campaign' },
					{
						name: 'Delete Prospect',
						value: 'deleteProspect',
						action: 'Remove prospect from campaign',
					},
					{ name: 'Get By ID', value: 'getById', action: 'Get a campaign by ID' },
					{ name: 'Get Many', value: 'getMany', action: 'Get many campaigns' },
					{ name: 'Get Sequences', value: 'getSequences', action: 'Get campaign sequences' },
					{ name: 'Get Stats', value: 'getStats', action: 'Get campaign statistics' },
					{ name: 'Pause', value: 'pause', action: 'Pause a campaign' },
					{ name: 'Start', value: 'start', action: 'Start a campaign' },
					{ name: 'Update', value: 'update', action: 'Update a campaign' },
				],
				default: 'getMany',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['clientspace'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create a clientspace' },
					{ name: 'Delete', value: 'delete', action: 'Delete a clientspace' },
					{ name: 'Get By ID', value: 'getById', action: 'Get a clientspace by ID' },
					{ name: 'Get Many', value: 'getMany', action: 'Get many clientspaces' },
					{ name: 'Update', value: 'update', action: 'Update a clientspace' },
				],
				default: 'getMany',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['followup'] } },
				options: [
					{ name: 'Delete', value: 'delete', action: 'Delete a follow up' },
					{ name: 'Get By ID', value: 'getById', action: 'Get a follow up by id' },
					{ name: 'Update', value: 'update', action: 'Update a follow up' },
				],
				default: 'getById',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['list'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create a list' },
					{ name: 'Delete', value: 'delete', action: 'Delete a list' },
					{ name: 'Get By ID', value: 'getById', action: 'Get a list by ID' },
					{ name: 'Get Many', value: 'getMany', action: 'Get many lists' },
					{ name: 'Remove Prospect', value: 'removeProspect', action: 'Remove prospect from list' },
					{ name: 'Update', value: 'update', action: 'Update a list' },
				],
				default: 'getMany',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['message'] } },
				options: [
					{ name: 'Get Many', value: 'getMany', action: 'Get many messages' },
					{ name: 'Reply', value: 'reply', action: 'Reply to a message' },
				],
				default: 'getMany',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['prospect'] } },
				options: [
					{ name: 'Add Tag', value: 'addTag', action: 'Add tag to prospect' },
					{ name: 'Bulk Add', value: 'bulkAdd', action: 'Bulk add prospects to list campaign' },
					{ name: 'Create', value: 'create', action: 'Create a prospect' },
					{ name: 'Delete', value: 'delete', action: 'Delete a prospect' },
					{ name: 'Get By ID', value: 'getById', action: 'Get a prospect by ID' },
					{ name: 'Get Many', value: 'getMany', action: 'Get many prospects' },
					{ name: 'Get Messages', value: 'getMessages', action: 'Get prospect message history' },
					{ name: 'Get Tags', value: 'getTags', action: 'Get prospect tags' },
					{ name: 'Remove Tag', value: 'removeTag', action: 'Remove tag from prospect' },
					{ name: 'Update', value: 'update', action: 'Update a prospect' },
				],
				default: 'getMany',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['sender'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create a sender' },
					{ name: 'Delete', value: 'delete', action: 'Delete a sender' },
					{ name: 'Get By ID', value: 'getById', action: 'Get a sender by ID' },
					{ name: 'Get Errors', value: 'getErrors', action: 'Get sender errors' },
					{ name: 'Get Many', value: 'getMany', action: 'Get many senders' },
					{ name: 'Update', value: 'update', action: 'Update a sender' },
				],
				default: 'getMany',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['sequence'] } },
				options: [
					{
						name: 'Create Follow-Up',
						value: 'createFollowup',
						action: 'Create sequence follow up',
					},
					{ name: 'Delete', value: 'delete', action: 'Delete a sequence' },
					{ name: 'Get Follow-Ups', value: 'getFollowups', action: 'Get sequence follow ups' },
					{ name: 'Update', value: 'update', action: 'Update a sequence' },
				],
				default: 'getFollowups',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['tag'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create a tag' },
					{ name: 'Delete', value: 'delete', action: 'Delete a tag' },
					{ name: 'Get By ID', value: 'getById', action: 'Get a tag by ID' },
					{ name: 'Get Many', value: 'getMany', action: 'Get many tags' },
					{ name: 'Get Prospects', value: 'getProspects', action: 'Get prospects with tag' },
					{ name: 'Update', value: 'update', action: 'Update a tag' },
				],
				default: 'getMany',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['user'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create a user' },
					{ name: 'Delete', value: 'delete', action: 'Delete a user' },
					{ name: 'Get By ID', value: 'getById', action: 'Get a user by ID' },
					{ name: 'Get Many', value: 'getMany', action: 'Get many users' },
					{ name: 'Update', value: 'update', action: 'Update a user' },
				],
				default: 'getMany',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['whitelabel'] } },
				options: [{ name: 'Update', value: 'update', action: 'Update whitelabel settings' }],
				default: 'update',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['workspace'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create a workspace' },
					{ name: 'Delete', value: 'delete', action: 'Delete a workspace' },
					{ name: 'Get By ID', value: 'getById', action: 'Get a workspace by ID' },
					{ name: 'Get Many', value: 'getMany', action: 'Get many workspaces' },
					{ name: 'Update', value: 'update', action: 'Update a workspace' },
				],
				default: 'getMany',
			},

			// ══════════════════════════════════════════════════════
			// SHARED ID FIELDS
			// ══════════════════════════════════════════════════════

			// Integer IDs
			{
				displayName: 'ID',
				name: 'resourceId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: [
							'getById',
							'update',
							'delete',
							'start',
							'pause',
							'copy',
							'getStats',
							'getSequences',
							'createSequence',
							'deleteProspect',
						],
					},
				},
				description: 'Campaign ID',
			},
			{
				displayName: 'ID',
				name: 'resourceId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: { resource: ['clientspace'], operation: ['getById', 'update', 'delete'] },
				},
				description: 'Clientspace ID',
			},
			{
				displayName: 'ID',
				name: 'resourceId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: { resource: ['followup'], operation: ['getById', 'update', 'delete'] },
				},
				description: 'Follow-up ID',
			},
			{
				displayName: 'ID',
				name: 'resourceId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: {
						resource: ['list'],
						operation: ['getById', 'update', 'delete', 'removeProspect'],
					},
				},
				description: 'List ID',
			},
			{
				displayName: 'ID',
				name: 'resourceId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: {
						resource: ['prospect'],
						operation: [
							'getById',
							'update',
							'delete',
							'getTags',
							'addTag',
							'removeTag',
							'getMessages',
						],
					},
				},
				description: 'Prospect ID',
			},
			{
				displayName: 'ID',
				name: 'resourceId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: { resource: ['sender'], operation: ['getById', 'update', 'delete', 'getErrors'] },
				},
				description: 'Sender ID',
			},
			{
				displayName: 'ID',
				name: 'resourceId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: {
						resource: ['sequence'],
						operation: ['update', 'delete', 'getFollowups', 'createFollowup'],
					},
				},
				description: 'Sequence ID',
			},
			{
				displayName: 'ID',
				name: 'resourceId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: { resource: ['tag'], operation: ['getById', 'update', 'delete', 'getProspects'] },
				},
				description: 'Tag ID',
			},
			{
				displayName: 'ID',
				name: 'resourceId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: { resource: ['user'], operation: ['getById', 'update', 'delete'] },
				},
				description: 'User ID (GUID)',
			},
			{
				displayName: 'ID',
				name: 'resourceId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: { resource: ['workspace'], operation: ['getById', 'update', 'delete'] },
				},
				description: 'Workspace ID',
			},

			// Sub-resource IDs
			{
				displayName: 'Prospect ID',
				name: 'prospectId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: { resource: ['campaign', 'list'], operation: ['deleteProspect', 'removeProspect'] },
				},
			},
			{
				displayName: 'Tag ID',
				name: 'tagId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: { show: { resource: ['prospect'], operation: ['removeTag'] } },
			},

			// ══════════════════════════════════════════════════════
			// PAGINATION (shared list operations)
			// ══════════════════════════════════════════════════════
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				displayOptions: {
					show: {
						resource: [
							'campaign',
							'clientspace',
							'list',
							'prospect',
							'sender',
							'tag',
							'user',
							'workspace',
						],
						operation: ['getMany'],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				displayOptions: {
					show: {
						resource: [
							'campaign',
							'clientspace',
							'list',
							'prospect',
							'sender',
							'tag',
							'user',
							'workspace',
						],
						operation: ['getMany'],
					},
				},
				description: 'Max number of results to return',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				displayOptions: { show: { resource: ['prospect'], operation: ['getTags', 'getMessages'] } },
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				description: 'Max number of results to return',
				default: 50,
				displayOptions: { show: { resource: ['prospect'], operation: ['getTags', 'getMessages'] } },
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				displayOptions: { show: { resource: ['tag'], operation: ['getProspects'] } },
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				description: 'Max number of results to return',
				default: 50,
				displayOptions: { show: { resource: ['tag'], operation: ['getProspects'] } },
			},

			// ══════════════════════════════════════════════════════
			// CAMPAIGN FIELDS
			// ══════════════════════════════════════════════════════
			{
				displayName: 'Name',
				name: 'campaignName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['campaign'], operation: ['create'] } },
				description: 'Campaign display name (max 256 chars)',
			},
			{
				displayName: 'Additional Fields',
				name: 'campaignCreateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['campaign'], operation: ['create'] } },
				options: [
					{ displayName: 'BCC Emails', name: 'bccEmails', type: 'string', default: '' },
					{
						displayName: 'Body (HTML)',
						name: 'body',
						type: 'string',
						typeOptions: { rows: 4 },
						default: '',
					},
					{ displayName: 'CC Emails', name: 'ccEmails', type: 'string', default: '' },
					{ displayName: 'Daily Limit', name: 'dailyLimit', type: 'number', default: 100 },
					{
						displayName: 'Daily Limit Per',
						name: 'dailyLimitPer',
						type: 'options',
						options: [
							{ name: 'Campaign', value: 'campaign' },
							{ name: 'Sender', value: 'sender' },
						],
						default: 'campaign',
					},
					{
						displayName: 'Deactivate If Missing Placeholder',
						name: 'deactivateIfMissingPlaceholder',
						type: 'boolean',
						default: false,
					},
					{ displayName: 'Description', name: 'description', type: 'string', default: '' },
					{ displayName: 'Folder ID', name: 'folderId', type: 'number', default: 0 },
					{ displayName: 'From Emails', name: 'fromEmails', type: 'string', default: '' },
					{ displayName: 'From Name', name: 'fromName', type: 'string', default: '' },
					{ displayName: 'Reply BCC Emails', name: 'replyBccEmails', type: 'string', default: '' },
					{ displayName: 'Reply CC Emails', name: 'replyCcEmails', type: 'string', default: '' },
					{ displayName: 'Reply To Email', name: 'replyToEmail', type: 'string', default: '' },
					{
						displayName: 'Schedule Timezone',
						name: 'scheduleTimeZone',
						type: 'string',
						default: '',
					},
					{ displayName: 'Send Friday', name: 'sendFri', type: 'boolean', default: true },
					{ displayName: 'Send Monday', name: 'sendMon', type: 'boolean', default: true },
					{ displayName: 'Send Saturday', name: 'sendSat', type: 'boolean', default: false },
					{ displayName: 'Send Sunday', name: 'sendSun', type: 'boolean', default: false },
					{ displayName: 'Send Thursday', name: 'sendThu', type: 'boolean', default: true },
					{ displayName: 'Send Tuesday', name: 'sendTue', type: 'boolean', default: true },
					{ displayName: 'Send Wednesday', name: 'sendWed', type: 'boolean', default: true },
					{ displayName: 'Subject', name: 'subject', type: 'string', default: '' },
					{
						displayName: 'Text Only Emails',
						name: 'textOnlyEmails',
						type: 'boolean',
						default: false,
					},
					{ displayName: 'Track Clicks', name: 'trackClicks', type: 'boolean', default: true },
					{ displayName: 'Track Opens', name: 'trackOpens', type: 'boolean', default: true },
				],
			},
			{
				displayName: 'Update Fields',
				name: 'campaignUpdateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['campaign'], operation: ['update'] } },
				options: [
					{ displayName: 'BCC Emails', name: 'bccEmails', type: 'string', default: '' },
					{
						displayName: 'Body (HTML)',
						name: 'body',
						type: 'string',
						typeOptions: { rows: 4 },
						default: '',
					},
					{ displayName: 'CC Emails', name: 'ccEmails', type: 'string', default: '' },
					{ displayName: 'Daily Limit', name: 'dailyLimit', type: 'number', default: 100 },
					{
						displayName: 'Daily Limit Per',
						name: 'dailyLimitPer',
						type: 'options',
						options: [
							{ name: 'Campaign', value: 'campaign' },
							{ name: 'Sender', value: 'sender' },
						],
						default: 'campaign',
					},
					{
						displayName: 'Deactivate If Missing Placeholder',
						name: 'deactivateIfMissingPlaceholder',
						type: 'boolean',
						default: false,
					},
					{ displayName: 'Description', name: 'description', type: 'string', default: '' },
					{ displayName: 'Folder ID', name: 'folderId', type: 'number', default: 0 },
					{ displayName: 'From Emails', name: 'fromEmails', type: 'string', default: '' },
					{ displayName: 'From Name', name: 'fromName', type: 'string', default: '' },
					{ displayName: 'Name', name: 'name', type: 'string', default: '' },
					{ displayName: 'Reply BCC Emails', name: 'replyBccEmails', type: 'string', default: '' },
					{ displayName: 'Reply CC Emails', name: 'replyCcEmails', type: 'string', default: '' },
					{ displayName: 'Reply To Email', name: 'replyToEmail', type: 'string', default: '' },
					{
						displayName: 'Schedule Timezone',
						name: 'scheduleTimeZone',
						type: 'string',
						default: '',
					},
					{ displayName: 'Send Friday', name: 'sendFri', type: 'boolean', default: true },
					{ displayName: 'Send Monday', name: 'sendMon', type: 'boolean', default: true },
					{ displayName: 'Send Saturday', name: 'sendSat', type: 'boolean', default: false },
					{ displayName: 'Send Sunday', name: 'sendSun', type: 'boolean', default: false },
					{ displayName: 'Send Thursday', name: 'sendThu', type: 'boolean', default: true },
					{ displayName: 'Send Tuesday', name: 'sendTue', type: 'boolean', default: true },
					{ displayName: 'Send Wednesday', name: 'sendWed', type: 'boolean', default: true },
					{ displayName: 'Subject', name: 'subject', type: 'string', default: '' },
					{
						displayName: 'Text Only Emails',
						name: 'textOnlyEmails',
						type: 'boolean',
						default: false,
					},
					{ displayName: 'Track Clicks', name: 'trackClicks', type: 'boolean', default: true },
					{ displayName: 'Track Opens', name: 'trackOpens', type: 'boolean', default: true },
				],
			},
			{
				displayName: 'New Campaign Name',
				name: 'newCampaignName',
				type: 'string',
				default: '',
				displayOptions: { show: { resource: ['campaign'], operation: ['copy'] } },
			},
			{
				displayName: 'Date Start',
				name: 'dateStart',
				type: 'string',
				default: '',
				displayOptions: { show: { resource: ['campaign'], operation: ['getStats'] } },
				description: 'ISO date string',
			},
			{
				displayName: 'Date End',
				name: 'dateEnd',
				type: 'string',
				default: '',
				displayOptions: { show: { resource: ['campaign'], operation: ['getStats'] } },
			},
			{
				displayName: 'Sequence Fields',
				name: 'sequenceCreateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['campaign'], operation: ['createSequence'] } },
				options: [
					{ displayName: 'Condition Action', name: 'conditionAction', type: 'string', default: '' },
					{
						displayName: 'Condition Extra',
						name: 'conditionExtra',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Condition Negate',
						name: 'conditionNegate',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Condition Operator',
						name: 'conditionOperator',
						type: 'string',
						default: '',
					},
					{ displayName: 'Condition Reply', name: 'conditionReply', type: 'string', default: '' },
					{ displayName: 'Condition Times', name: 'conditionTimes', type: 'number', default: 0 },
					{ displayName: 'Name', name: 'name', type: 'string', default: '' },
					{ displayName: 'Short Name', name: 'shortName', type: 'string', default: '' },
				],
			},

			// ══════════════════════════════════════════════════════
			// CLIENTSPACE FIELDS
			// ══════════════════════════════════════════════════════
			{
				displayName: 'Title',
				name: 'clientspaceTitle',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['clientspace'], operation: ['create'] } },
			},
			{
				displayName: 'Additional Fields',
				name: 'clientspaceCreateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['clientspace'], operation: ['create'] } },
				options: [
					{
						displayName: 'Auto Allocate Credits',
						name: 'autoAllocate',
						type: 'boolean',
						default: false,
					},
					{ displayName: 'Credit Amount', name: 'creditAmount', type: 'number', default: 0 },
					{
						displayName: 'Separate Credits',
						name: 'separateCredits',
						type: 'boolean',
						default: false,
					},
				],
			},
			{
				displayName: 'Update Fields',
				name: 'clientspaceUpdateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['clientspace'], operation: ['update'] } },
				options: [
					{
						displayName: 'Auto Allocate Credits',
						name: 'autoAllocate',
						type: 'boolean',
						default: false,
					},
					{ displayName: 'Credit Amount', name: 'creditAmount', type: 'number', default: 0 },
					{
						displayName: 'Separate Credits',
						name: 'separateCredits',
						type: 'boolean',
						default: false,
					},
					{ displayName: 'Title', name: 'title', type: 'string', default: '' },
				],
			},

			// ══════════════════════════════════════════════════════
			// FOLLOW-UP FIELDS
			// ══════════════════════════════════════════════════════
			{
				displayName: 'Update Fields',
				name: 'followupUpdateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['followup'], operation: ['update'] } },
				options: [
					{
						displayName: 'Body (HTML)',
						name: 'body',
						type: 'string',
						typeOptions: { rows: 4 },
						default: '',
					},
					{
						displayName: 'Reply In Thread',
						name: 'replyInThread',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Reply In Thread To Followup ID',
						name: 'replyInThreadToFollowupId',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Send In Same Thread',
						name: 'sendInSameThread',
						type: 'boolean',
						default: false,
					},
					{ displayName: 'Subject', name: 'subject', type: 'string', default: '' },
					{
						displayName: 'Use Original Subject',
						name: 'useOriginalSubject',
						type: 'boolean',
						default: false,
					},
					{ displayName: 'Wait Min', name: 'waitMin', type: 'number', default: 1 },
					{
						displayName: 'Wait Units',
						name: 'waitUnits',
						type: 'options',
						options: [
							{ name: 'Days', value: 'days' },
							{ name: 'Hours', value: 'hours' },
							{ name: 'Minutes', value: 'minutes' },
						],
						default: 'days',
					},
				],
			},

			// ══════════════════════════════════════════════════════
			// LIST FIELDS
			// ══════════════════════════════════════════════════════
			{
				displayName: 'Title',
				name: 'listTitle',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['list'], operation: ['create'] } },
			},
			{
				displayName: 'Additional Fields',
				name: 'listCreateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['list'], operation: ['create'] } },
				options: [{ displayName: 'Folder ID', name: 'folderId', type: 'number', default: 0 }],
			},
			{
				displayName: 'Update Fields',
				name: 'listUpdateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['list'], operation: ['update'] } },
				options: [
					{ displayName: 'Folder ID', name: 'folderId', type: 'number', default: 0 },
					{ displayName: 'Title', name: 'title', type: 'string', default: '' },
				],
			},

			// ══════════════════════════════════════════════════════
			// MESSAGE FIELDS
			// ══════════════════════════════════════════════════════
			{
				displayName: 'Type',
				name: 'messageType',
				type: 'options',
				required: true,
				displayOptions: { show: { resource: ['message'], operation: ['getMany'] } },
				options: [
					{ name: 'Reply', value: 'Reply' },
					{ name: 'Sent', value: 'Sent' },
					{ name: 'Sent Manual', value: 'SentManual' },
				],
				default: 'Sent',
			},
			{
				displayName: 'Filters',
				name: 'messageFilters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: { show: { resource: ['message'], operation: ['getMany'] } },
				options: [
					{ displayName: 'Campaign ID', name: 'campaignId', type: 'number', default: 0 },
					{ displayName: 'Confirmed Status', name: 'confirmedStatus', type: 'string', default: '' },
					{ displayName: 'Email From', name: 'emailFrom', type: 'string', default: '' },
					{ displayName: 'Email To', name: 'emailTo', type: 'string', default: '' },
					{ displayName: 'Followup ID', name: 'followupId', type: 'number', default: 0 },
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: { minValue: 1 },
						description: 'Max number of results to return',
						default: 50,
					},
					{ displayName: 'Page', name: 'page', type: 'number', default: 1 },
					{ displayName: 'Sender ID', name: 'senderId', type: 'number', default: 0 },
					{ displayName: 'Subject', name: 'subject', type: 'string', default: '' },
				],
			},
			{
				displayName: 'Message ID',
				name: 'messageId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['message'], operation: ['reply'] } },
				description: 'The Message-ID header value from the received email',
			},
			{
				displayName: 'Reply Fields',
				name: 'messageReplyFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['message'], operation: ['reply'] } },
				options: [
					{ displayName: 'BCC Emails', name: 'bccEmails', type: 'string', default: '' },
					{
						displayName: 'Body (HTML)',
						name: 'body',
						type: 'string',
						typeOptions: { rows: 4 },
						default: '',
					},
					{ displayName: 'CC Emails', name: 'ccEmails', type: 'string', default: '' },
					{ displayName: 'From Email', name: 'fromEmail', type: 'string', default: '' },
					{ displayName: 'Reply To Email', name: 'replyToEmail', type: 'string', default: '' },
					{ displayName: 'Send As Reply', name: 'sendAsReply', type: 'boolean', default: false },
					{ displayName: 'Subject', name: 'subject', type: 'string', default: '' },
				],
			},

			// ══════════════════════════════════════════════════════
			// PROSPECT FIELDS
			// ══════════════════════════════════════════════════════
			{
				displayName: 'Filters',
				name: 'prospectFilters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: { show: { resource: ['prospect'], operation: ['getMany'] } },
				options: [
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						placeholder: 'name@email.com',
						default: '',
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						description: 'Max number of results to return',
						default: 50,
					},
					{ displayName: 'Page', name: 'page', type: 'number', default: 1 },
					{ displayName: 'Search', name: 'search', type: 'string', default: '' },
					{ displayName: 'Status', name: 'status', type: 'string', default: '' },
					{ displayName: 'Tags', name: 'tags', type: 'string', default: '' },
				],
			},
			{
				displayName: 'Email',
				name: 'prospectEmail',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['prospect'], operation: ['create'] } },
			},
			{
				displayName: 'Base List ID',
				name: 'prospectBaseListId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: { show: { resource: ['prospect'], operation: ['create'] } },
			},
			{
				displayName: 'Additional Fields',
				name: 'prospectCreateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['prospect'], operation: ['create'] } },
				options: [
					{ displayName: 'City', name: 'city', type: 'string', default: '' },
					{ displayName: 'Company', name: 'company', type: 'string', default: '' },
					{ displayName: 'Company Size', name: 'companySize', type: 'string', default: '' },
					{ displayName: 'Company Social', name: 'companySocial', type: 'string', default: '' },
					{ displayName: 'Country', name: 'country', type: 'string', default: '' },
					{ displayName: 'Custom 1', name: 'custom1', type: 'string', default: '' },
					{ displayName: 'Custom 10', name: 'custom10', type: 'string', default: '' },
					{ displayName: 'Custom 2', name: 'custom2', type: 'string', default: '' },
					{ displayName: 'Custom 3', name: 'custom3', type: 'string', default: '' },
					{ displayName: 'Custom 4', name: 'custom4', type: 'string', default: '' },
					{ displayName: 'Custom 5', name: 'custom5', type: 'string', default: '' },
					{ displayName: 'Custom 6', name: 'custom6', type: 'string', default: '' },
					{ displayName: 'Custom 7', name: 'custom7', type: 'string', default: '' },
					{ displayName: 'Custom 8', name: 'custom8', type: 'string', default: '' },
					{ displayName: 'Custom 9', name: 'custom9', type: 'string', default: '' },
					{ displayName: 'Domain', name: 'domain', type: 'string', default: '' },
					{ displayName: 'First Name', name: 'firstName', type: 'string', default: '' },
					{ displayName: 'Icebreaker', name: 'icebreaker', type: 'string', default: '' },
					{ displayName: 'Industry', name: 'industry', type: 'string', default: '' },
					{ displayName: 'Job Position', name: 'jobPosition', type: 'string', default: '' },
					{ displayName: 'Last Name', name: 'lastName', type: 'string', default: '' },
					{ displayName: 'Location', name: 'location', type: 'string', default: '' },
					{ displayName: 'Logo URL', name: 'logoUrl', type: 'string', default: '' },
					{ displayName: 'Notes', name: 'notes', type: 'string', default: '' },
					{ displayName: 'Personal Social', name: 'personalSocial', type: 'string', default: '' },
					{ displayName: 'Phone', name: 'phone', type: 'string', default: '' },
					{ displayName: 'Sending Active', name: 'sendingActive', type: 'boolean', default: true },
					{ displayName: 'Sending Status', name: 'sendingStatus', type: 'string', default: '' },
					{ displayName: 'State', name: 'state', type: 'string', default: '' },
					{ displayName: 'Website', name: 'website', type: 'string', default: '' },
				],
			},
			{
				displayName: 'Update Fields',
				name: 'prospectUpdateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['prospect'], operation: ['update'] } },
				options: [
					{ displayName: 'Base List ID', name: 'baseListId', type: 'number', default: 0 },
					{ displayName: 'City', name: 'city', type: 'string', default: '' },
					{ displayName: 'Company', name: 'company', type: 'string', default: '' },
					{ displayName: 'Company Size', name: 'companySize', type: 'string', default: '' },
					{ displayName: 'Company Social', name: 'companySocial', type: 'string', default: '' },
					{ displayName: 'Country', name: 'country', type: 'string', default: '' },
					{ displayName: 'Custom 1', name: 'custom1', type: 'string', default: '' },
					{ displayName: 'Custom 2', name: 'custom2', type: 'string', default: '' },
					{ displayName: 'Custom 3', name: 'custom3', type: 'string', default: '' },
					{ displayName: 'Custom 4', name: 'custom4', type: 'string', default: '' },
					{ displayName: 'Custom 5', name: 'custom5', type: 'string', default: '' },
					{ displayName: 'Domain', name: 'domain', type: 'string', default: '' },
					{ displayName: 'First Name', name: 'firstName', type: 'string', default: '' },
					{ displayName: 'Icebreaker', name: 'icebreaker', type: 'string', default: '' },
					{ displayName: 'Industry', name: 'industry', type: 'string', default: '' },
					{ displayName: 'Job Position', name: 'jobPosition', type: 'string', default: '' },
					{ displayName: 'Last Name', name: 'lastName', type: 'string', default: '' },
					{ displayName: 'Location', name: 'location', type: 'string', default: '' },
					{ displayName: 'Notes', name: 'notes', type: 'string', default: '' },
					{ displayName: 'Personal Social', name: 'personalSocial', type: 'string', default: '' },
					{ displayName: 'Phone', name: 'phone', type: 'string', default: '' },
					{ displayName: 'Sending Active', name: 'sendingActive', type: 'boolean', default: true },
					{ displayName: 'Sending Status', name: 'sendingStatus', type: 'string', default: '' },
					{ displayName: 'State', name: 'state', type: 'string', default: '' },
					{ displayName: 'Website', name: 'website', type: 'string', default: '' },
				],
			},
			{
				displayName: 'List ID',
				name: 'bulkListId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: { show: { resource: ['prospect'], operation: ['bulkAdd'] } },
			},
			{
				displayName: 'Prospect IDs',
				name: 'bulkProspectIds',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['prospect'], operation: ['bulkAdd'] } },
				description: 'Comma-separated list of prospect IDs to add',
			},
			{
				displayName: 'Options',
				name: 'bulkAddOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: { show: { resource: ['prospect'], operation: ['bulkAdd'] } },
				options: [
					{ displayName: 'Add Only If New', name: 'addOnlyIfNew', type: 'boolean', default: false },
					{ displayName: 'Campaign ID', name: 'campaignId', type: 'number', default: 0 },
					{
						displayName: 'Not In Other Campaign',
						name: 'notInOtherCampaign',
						type: 'boolean',
						default: false,
					},
				],
			},
			{
				displayName: 'Tag ID',
				name: 'addTagId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: { show: { resource: ['prospect'], operation: ['addTag'] } },
			},

			// ══════════════════════════════════════════════════════
			// SENDER FIELDS
			// ══════════════════════════════════════════════════════
			{
				displayName: 'Filters',
				name: 'senderFilters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: { show: { resource: ['sender'], operation: ['getMany'] } },
				options: [
					{ displayName: 'Folder', name: 'folder', type: 'string', default: '' },
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						description: 'Max number of results to return',
						default: 50,
					},
					{ displayName: 'Page', name: 'page', type: 'number', default: 1 },
					{ displayName: 'Search', name: 'search', type: 'string', default: '' },
					{ displayName: 'Status', name: 'status', type: 'string', default: '' },
					{ displayName: 'Warmup Only', name: 'warmup', type: 'boolean', default: false },
				],
			},
			{
				displayName: 'Email',
				name: 'senderEmail',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['sender'], operation: ['create'] } },
			},
			{
				displayName: 'Daily Limit',
				name: 'senderDailyLimit',
				type: 'number',
				default: 50,
				required: true,
				displayOptions: { show: { resource: ['sender'], operation: ['create'] } },
				description: 'Max emails per day (1–10,000)',
			},
			{
				displayName: 'SMTP Server',
				name: 'senderSmtpServer',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['sender'], operation: ['create'] } },
			},
			{
				displayName: 'SMTP Port',
				name: 'senderSmtpPort',
				type: 'number',
				default: 587,
				required: true,
				displayOptions: { show: { resource: ['sender'], operation: ['create'] } },
			},
			{
				displayName: 'SMTP Password',
				name: 'senderSmtpPass',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				required: true,
				displayOptions: { show: { resource: ['sender'], operation: ['create'] } },
			},
			{
				displayName: 'IMAP Server',
				name: 'senderImapServer',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['sender'], operation: ['create'] } },
			},
			{
				displayName: 'IMAP Port',
				name: 'senderImapPort',
				type: 'string',
				default: '993',
				required: true,
				displayOptions: { show: { resource: ['sender'], operation: ['create'] } },
			},
			{
				displayName: 'IMAP Password',
				name: 'senderImapPass',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				required: true,
				displayOptions: { show: { resource: ['sender'], operation: ['create'] } },
			},
			{
				displayName: 'Additional Fields',
				name: 'senderCreateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['sender'], operation: ['create'] } },
				options: [
					{
						displayName: 'Custom IMAP Username',
						name: 'customImapUsername',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Custom SMTP Username',
						name: 'customSmtpUsername',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Daily Limit Increase',
						name: 'dailyLimitIncrease',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Daily Limit Increase Percent',
						name: 'dailyLimitIncreasePercent',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Daily Limit Increase To Max',
						name: 'dailyLimitIncreaseToMax',
						type: 'number',
						default: 0,
					},
					{ displayName: 'Delay Min (Seconds)', name: 'delayMin', type: 'number', default: 120 },
					{ displayName: 'First Name', name: 'firstName', type: 'string', default: '' },
					{ displayName: 'Folder', name: 'folder', type: 'string', default: '' },
					{ displayName: 'From Name', name: 'fromName', type: 'string', default: '' },
					{ displayName: 'Last Name', name: 'lastName', type: 'string', default: '' },
					{ displayName: 'Reply To', name: 'replyTo', type: 'string', default: '' },
					{
						displayName: 'Signature (HTML)',
						name: 'signature',
						type: 'string',
						typeOptions: { rows: 4 },
						default: '',
					},
					{ displayName: 'Tracking Domain', name: 'trackingDomain', type: 'string', default: '' },
					{
						displayName: 'Warmup Daily Limit',
						name: 'warmupDailyLimit',
						type: 'number',
						default: 10,
					},
					{ displayName: 'Warmup Enabled', name: 'warmup', type: 'boolean', default: false },
					{
						displayName: 'Warmup Reply Percent',
						name: 'warmupReplyPercent',
						type: 'number',
						default: 50,
					},
					{
						displayName: 'Warmup Skip Weekends',
						name: 'warmupSkipWeekends',
						type: 'boolean',
						default: false,
					},
				],
			},
			{
				displayName: 'Update Fields',
				name: 'senderUpdateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['sender'], operation: ['update'] } },
				options: [
					{
						displayName: 'Custom IMAP Password',
						name: 'customImapPass',
						type: 'string',
						typeOptions: { password: true },
						default: '',
					},
					{ displayName: 'Custom IMAP Port', name: 'customImapPort', type: 'string', default: '' },
					{
						displayName: 'Custom IMAP Server',
						name: 'customImapServer',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Custom IMAP Username',
						name: 'customImapUsername',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Custom SMTP Password',
						name: 'customSmtpPass',
						type: 'string',
						typeOptions: { password: true },
						default: '',
					},
					{ displayName: 'Custom SMTP Port', name: 'customSmtpPort', type: 'number', default: 0 },
					{
						displayName: 'Custom SMTP Server',
						name: 'customSmtpServer',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Custom SMTP Username',
						name: 'customSmtpUsername',
						type: 'string',
						default: '',
					},
					{ displayName: 'Daily Limit', name: 'dailyLimit', type: 'number', default: 50 },
					{
						displayName: 'Daily Limit Increase',
						name: 'dailyLimitIncrease',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Daily Limit Increase Percent',
						name: 'dailyLimitIncreasePercent',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Daily Limit Increase To Max',
						name: 'dailyLimitIncreaseToMax',
						type: 'number',
						default: 0,
					},
					{ displayName: 'Delay Min (Seconds)', name: 'delayMin', type: 'number', default: 120 },
					{ displayName: 'First Name', name: 'firstName', type: 'string', default: '' },
					{ displayName: 'Folder', name: 'folder', type: 'string', default: '' },
					{ displayName: 'From Name', name: 'fromName', type: 'string', default: '' },
					{ displayName: 'Last Name', name: 'lastName', type: 'string', default: '' },
					{ displayName: 'Reply To', name: 'replyTo', type: 'string', default: '' },
					{
						displayName: 'Signature (HTML)',
						name: 'signature',
						type: 'string',
						typeOptions: { rows: 4 },
						default: '',
					},
					{ displayName: 'Tracking Domain', name: 'trackingDomain', type: 'string', default: '' },
					{
						displayName: 'Warmup Daily Limit',
						name: 'warmupDailyLimit',
						type: 'number',
						default: 10,
					},
					{ displayName: 'Warmup Enabled', name: 'warmup', type: 'boolean', default: false },
					{
						displayName: 'Warmup Reply Percent',
						name: 'warmupReplyPercent',
						type: 'number',
						default: 50,
					},
					{
						displayName: 'Warmup Skip Weekends',
						name: 'warmupSkipWeekends',
						type: 'boolean',
						default: false,
					},
				],
			},

			// ══════════════════════════════════════════════════════
			// SEQUENCE FIELDS
			// ══════════════════════════════════════════════════════
			{
				displayName: 'Update Fields',
				name: 'sequenceUpdateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['sequence'], operation: ['update'] } },
				options: [
					{ displayName: 'Condition Action', name: 'conditionAction', type: 'string', default: '' },
					{
						displayName: 'Condition Extra',
						name: 'conditionExtra',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Condition Negate',
						name: 'conditionNegate',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Condition Operator',
						name: 'conditionOperator',
						type: 'string',
						default: '',
					},
					{ displayName: 'Condition Reply', name: 'conditionReply', type: 'string', default: '' },
					{ displayName: 'Condition Times', name: 'conditionTimes', type: 'number', default: 0 },
					{ displayName: 'Name', name: 'name', type: 'string', default: '' },
					{ displayName: 'Short Name', name: 'shortName', type: 'string', default: '' },
				],
			},
			{
				displayName: 'Wait Min',
				name: 'followupWaitMin',
				type: 'number',
				default: 1,
				required: true,
				displayOptions: { show: { resource: ['sequence'], operation: ['createFollowup'] } },
				description: 'Wait time before sending (1–1000)',
			},
			{
				displayName: 'Wait Units',
				name: 'followupWaitUnits',
				type: 'options',
				options: [
					{ name: 'Days', value: 'days' },
					{ name: 'Hours', value: 'hours' },
					{ name: 'Minutes', value: 'minutes' },
				],
				default: 'days',
				required: true,
				displayOptions: { show: { resource: ['sequence'], operation: ['createFollowup'] } },
			},
			{
				displayName: 'Additional Fields',
				name: 'followupCreateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['sequence'], operation: ['createFollowup'] } },
				options: [
					{
						displayName: 'Body (HTML)',
						name: 'body',
						type: 'string',
						typeOptions: { rows: 4 },
						default: '',
					},
					{
						displayName: 'Reply In Thread',
						name: 'replyInThread',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Reply In Thread To Followup ID',
						name: 'replyInThreadToFollowupId',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Send In Same Thread',
						name: 'sendInSameThread',
						type: 'boolean',
						default: false,
					},
					{ displayName: 'Subject', name: 'subject', type: 'string', default: '' },
					{
						displayName: 'Use Original Subject',
						name: 'useOriginalSubject',
						type: 'boolean',
						default: false,
					},
				],
			},

			// ══════════════════════════════════════════════════════
			// TAG FIELDS
			// ══════════════════════════════════════════════════════
			{
				displayName: 'Filters',
				name: 'tagFilters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: { show: { resource: ['tag'], operation: ['getMany'] } },
				options: [
					{ displayName: 'Include', name: 'include', type: 'string', default: '' },
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						description: 'Max number of results to return',
						default: 50,
					},
					{ displayName: 'Page', name: 'page', type: 'number', default: 1 },
					{ displayName: 'Search', name: 'search', type: 'string', default: '' },
				],
			},
			{
				displayName: 'Title',
				name: 'tagTitle',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['tag'], operation: ['create'] } },
				description: 'Tag name (max 128 chars)',
			},
			{
				displayName: 'Additional Fields',
				name: 'tagCreateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['tag'], operation: ['create'] } },
				options: [{ displayName: 'Description', name: 'description', type: 'string', default: '' }],
			},
			{
				displayName: 'Update Fields',
				name: 'tagUpdateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['tag'], operation: ['update'] } },
				options: [
					{ displayName: 'Description', name: 'description', type: 'string', default: '' },
					{ displayName: 'Title', name: 'title', type: 'string', default: '' },
				],
			},
			{
				displayName: 'Force Delete',
				name: 'tagForceDelete',
				type: 'boolean',
				default: false,
				displayOptions: { show: { resource: ['tag'], operation: ['delete'] } },
				description: 'Whether to force delete even if tag is in use',
			},

			// ══════════════════════════════════════════════════════
			// USER FIELDS
			// ══════════════════════════════════════════════════════
			{
				displayName: 'Fields',
				name: 'userCreateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['user'], operation: ['create'] } },
				options: [
					{
						displayName: 'Account Type',
						name: 'accountType',
						type: 'string',
						default: '',
						description:
							'110=SuperAdmin, 100=Admin, 30=User, 23=SenderOnly, 22=ReportOnly, 21=Unibox Only',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						placeholder: 'name@email.com',
						default: '',
					},
					{ displayName: 'First Name', name: 'firstName', type: 'string', default: '' },
					{ displayName: 'Last Name', name: 'lastName', type: 'string', default: '' },
				],
			},
			{
				displayName: 'Update Fields',
				name: 'userUpdateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['user'], operation: ['update'] } },
				options: [
					{ displayName: 'Account Type', name: 'accountType', type: 'string', default: '' },
					{ displayName: 'First Name', name: 'firstName', type: 'string', default: '' },
					{ displayName: 'Last Name', name: 'lastName', type: 'string', default: '' },
				],
			},

			// ══════════════════════════════════════════════════════
			// WHITELABEL FIELDS
			// ══════════════════════════════════════════════════════
			{
				displayName: 'Update Fields',
				name: 'whitelabelUpdateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['whitelabel'], operation: ['update'] } },
				options: [
					{ displayName: 'Color', name: 'color', type: 'color', default: '' },
					{ displayName: 'Custom Domain', name: 'customDomain', type: 'string', default: '' },
					{ displayName: 'Logo Image URL', name: 'logoImageUrl', type: 'string', default: '' },
				],
			},

			// ══════════════════════════════════════════════════════
			// WORKSPACE FIELDS
			// ══════════════════════════════════════════════════════
			{
				displayName: 'Title',
				name: 'workspaceTitle',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['workspace'], operation: ['create'] } },
			},
			{
				displayName: 'Update Fields',
				name: 'workspaceUpdateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['workspace'], operation: ['update'] } },
				options: [{ displayName: 'Title', name: 'title', type: 'string', default: '' }],
			},
		],
		usableAsTool: true,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const base = 'https://api.manyreach.com/api/v2';

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;

			try {
				let response: unknown;

				// ─────────────── CAMPAIGN ────────────────────────────
				if (resource === 'campaign') {
					if (operation === 'getMany') {
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/campaigns`,
							qs: { page, limit },
							json: true,
						});
					} else if (operation === 'getById') {
						const id = this.getNodeParameter('resourceId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/campaigns/${id}`,
							json: true,
						});
					} else if (operation === 'create') {
						const name = this.getNodeParameter('campaignName', i) as string;
						const extra = this.getNodeParameter('campaignCreateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'POST',
							url: `${base}/campaigns`,
							body: { name, ...extra },
							json: true,
						});
					} else if (operation === 'update') {
						const id = this.getNodeParameter('resourceId', i);
						const fields = this.getNodeParameter('campaignUpdateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'PATCH',
							url: `${base}/campaigns/${id}`,
							body: fields,
							json: true,
						});
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('resourceId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'DELETE',
							url: `${base}/campaigns/${id}`,
							json: true,
						});
					} else if (operation === 'start') {
						const id = this.getNodeParameter('resourceId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'POST',
							url: `${base}/campaigns/${id}/start`,
							json: true,
						});
					} else if (operation === 'pause') {
						const id = this.getNodeParameter('resourceId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'POST',
							url: `${base}/campaigns/${id}/pause`,
							json: true,
						});
					} else if (operation === 'copy') {
						const id = this.getNodeParameter('resourceId', i);
						const newName = this.getNodeParameter('newCampaignName', i, '') as string;
						const qs: IDataObject = {};
						if (newName) qs.newCampaignName = newName;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'POST',
							url: `${base}/campaigns/${id}/copy`,
							qs,
							json: true,
						});
					} else if (operation === 'getStats') {
						const id = this.getNodeParameter('resourceId', i);
						const dateStart = this.getNodeParameter('dateStart', i, '') as string;
						const dateEnd = this.getNodeParameter('dateEnd', i, '') as string;
						const qs: IDataObject = {};
						if (dateStart) qs.dateStart = dateStart;
						if (dateEnd) qs.dateEnd = dateEnd;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/campaigns/${id}/stats`,
							qs,
							json: true,
						});
					} else if (operation === 'getSequences') {
						const id = this.getNodeParameter('resourceId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/campaigns/${id}/sequences`,
							json: true,
						});
					} else if (operation === 'createSequence') {
						const id = this.getNodeParameter('resourceId', i);
						const fields = this.getNodeParameter('sequenceCreateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'POST',
							url: `${base}/campaigns/${id}/sequences`,
							body: fields,
							json: true,
						});
					} else if (operation === 'deleteProspect') {
						const id = this.getNodeParameter('resourceId', i);
						const prospectId = this.getNodeParameter('prospectId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'DELETE',
							url: `${base}/campaigns/${id}/prospects/${prospectId}`,
							json: true,
						});
					}
				}

				// ─────────────── CLIENTSPACE ─────────────────────────
				else if (resource === 'clientspace') {
					if (operation === 'getMany') {
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/clientspaces`,
							qs: { page, limit },
							json: true,
						});
					} else if (operation === 'getById') {
						const id = this.getNodeParameter('resourceId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/clientspaces/${id}`,
							json: true,
						});
					} else if (operation === 'create') {
						const title = this.getNodeParameter('clientspaceTitle', i) as string;
						const extra = this.getNodeParameter('clientspaceCreateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'POST',
							url: `${base}/clientspaces`,
							body: { title, ...extra },
							json: true,
						});
					} else if (operation === 'update') {
						const id = this.getNodeParameter('resourceId', i);
						const fields = this.getNodeParameter('clientspaceUpdateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'PATCH',
							url: `${base}/clientspaces/${id}`,
							body: fields,
							json: true,
						});
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('resourceId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'DELETE',
							url: `${base}/clientspaces/${id}`,
							json: true,
						});
					}
				}

				// ─────────────── FOLLOW-UP ────────────────────────────
				else if (resource === 'followup') {
					const id = this.getNodeParameter('resourceId', i);
					if (operation === 'getById') {
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/followups/${id}`,
							json: true,
						});
					} else if (operation === 'update') {
						const fields = this.getNodeParameter('followupUpdateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'PATCH',
							url: `${base}/followups/${id}`,
							body: fields,
							json: true,
						});
					} else if (operation === 'delete') {
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'DELETE',
							url: `${base}/followups/${id}`,
							json: true,
						});
					}
				}

				// ─────────────── LIST ─────────────────────────────────
				else if (resource === 'list') {
					if (operation === 'getMany') {
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/lists`,
							qs: { page, limit },
							json: true,
						});
					} else if (operation === 'getById') {
						const id = this.getNodeParameter('resourceId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/lists/${id}`,
							json: true,
						});
					} else if (operation === 'create') {
						const title = this.getNodeParameter('listTitle', i) as string;
						const extra = this.getNodeParameter('listCreateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'POST',
							url: `${base}/lists`,
							body: { title, ...extra },
							json: true,
						});
					} else if (operation === 'update') {
						const id = this.getNodeParameter('resourceId', i);
						const fields = this.getNodeParameter('listUpdateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'PATCH',
							url: `${base}/lists/${id}`,
							body: fields,
							json: true,
						});
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('resourceId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'DELETE',
							url: `${base}/lists/${id}`,
							json: true,
						});
					} else if (operation === 'removeProspect') {
						const id = this.getNodeParameter('resourceId', i);
						const prospectId = this.getNodeParameter('prospectId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'DELETE',
							url: `${base}/lists/${id}/prospects/${prospectId}`,
							json: true,
						});
					}
				}

				// ─────────────── MESSAGE ──────────────────────────────
				else if (resource === 'message') {
					if (operation === 'getMany') {
						const filters = this.getNodeParameter('messageFilters', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/messages`,
							qs: filters,
							json: true,
						});
					} else if (operation === 'reply') {
						const messageId = this.getNodeParameter('messageId', i) as string;
						const fields = this.getNodeParameter('messageReplyFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'POST',
							url: `${base}/messages/reply`,
							body: { messageId, ...fields },
							json: true,
						});
					}
				}

				// ─────────────── PROSPECT ─────────────────────────────
				else if (resource === 'prospect') {
					if (operation === 'getMany') {
						const filters = this.getNodeParameter('prospectFilters', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/prospects`,
							qs: filters,
							json: true,
						});
					} else if (operation === 'getById') {
						const id = this.getNodeParameter('resourceId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/prospects/${id}`,
							json: true,
						});
					} else if (operation === 'create') {
						const email = this.getNodeParameter('prospectEmail', i) as string;
						const baseListId = this.getNodeParameter('prospectBaseListId', i) as number;
						const extra = this.getNodeParameter('prospectCreateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'POST',
							url: `${base}/prospects`,
							body: { email, baseListId, ...extra },
							json: true,
						});
					} else if (operation === 'bulkAdd') {
						const listId = this.getNodeParameter('bulkListId', i) as number;
						const idsRaw = this.getNodeParameter('bulkProspectIds', i) as string;
						const prospects = idsRaw
							.split(',')
							.map((s) => parseInt(s.trim(), 10))
							.filter((n) => !isNaN(n));
						const options = this.getNodeParameter('bulkAddOptions', i) as IDataObject;
						const qs: IDataObject = { listId };
						if (options.campaignId) qs.campaignId = options.campaignId;
						if (options.addOnlyIfNew !== undefined) qs.addOnlyIfNew = options.addOnlyIfNew;
						if (options.notInOtherCampaign !== undefined)
							qs.notInOtherCampaign = options.notInOtherCampaign;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'POST',
							url: `${base}/prospects/bulk`,
							qs,
							body: { prospects },
							json: true,
						});
					} else if (operation === 'update') {
						const id = this.getNodeParameter('resourceId', i);
						const fields = this.getNodeParameter('prospectUpdateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'PATCH',
							url: `${base}/prospects/${id}`,
							body: fields,
							json: true,
						});
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('resourceId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'DELETE',
							url: `${base}/prospects/${id}`,
							json: true,
						});
					} else if (operation === 'getTags') {
						const id = this.getNodeParameter('resourceId', i);
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/prospects/${id}/tags`,
							qs: { page, limit },
							json: true,
						});
					} else if (operation === 'addTag') {
						const id = this.getNodeParameter('resourceId', i);
						const tagId = this.getNodeParameter('addTagId', i) as number;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'POST',
							url: `${base}/prospects/${id}/tags`,
							body: { tagId },
							json: true,
						});
					} else if (operation === 'removeTag') {
						const id = this.getNodeParameter('resourceId', i);
						const tagId = this.getNodeParameter('tagId', i) as number;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'DELETE',
							url: `${base}/prospects/${id}/tags/${tagId}`,
							json: true,
						});
					} else if (operation === 'getMessages') {
						const id = this.getNodeParameter('resourceId', i);
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/prospects/${id}/messages`,
							qs: { page, limit },
							json: true,
						});
					}
				}

				// ─────────────── SENDER ───────────────────────────────
				else if (resource === 'sender') {
					if (operation === 'getMany') {
						const filters = this.getNodeParameter('senderFilters', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/senders`,
							qs: filters,
							json: true,
						});
					} else if (operation === 'getById') {
						const id = this.getNodeParameter('resourceId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/senders/${id}`,
							json: true,
						});
					} else if (operation === 'create') {
						const email = this.getNodeParameter('senderEmail', i) as string;
						const dailyLimit = this.getNodeParameter('senderDailyLimit', i) as number;
						const customSmtpServer = this.getNodeParameter('senderSmtpServer', i) as string;
						const customSmtpPort = this.getNodeParameter('senderSmtpPort', i) as number;
						const customSmtpPass = this.getNodeParameter('senderSmtpPass', i) as string;
						const customImapServer = this.getNodeParameter('senderImapServer', i) as string;
						const customImapPort = this.getNodeParameter('senderImapPort', i) as string;
						const customImapPass = this.getNodeParameter('senderImapPass', i) as string;
						const extra = this.getNodeParameter('senderCreateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'POST',
							url: `${base}/senders`,
							json: true,
							body: {
								email,
								dailyLimit,
								customSmtpServer,
								customSmtpPort,
								customSmtpPass,
								customImapServer,
								customImapPort,
								customImapPass,
								...extra,
							},
						});
					} else if (operation === 'update') {
						const id = this.getNodeParameter('resourceId', i);
						const fields = this.getNodeParameter('senderUpdateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'PATCH',
							url: `${base}/senders/${id}`,
							body: fields,
							json: true,
						});
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('resourceId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'DELETE',
							url: `${base}/senders/${id}`,
							json: true,
						});
					} else if (operation === 'getErrors') {
						const id = this.getNodeParameter('resourceId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/senders/${id}/errors`,
							json: true,
						});
					}
				}

				// ─────────────── SEQUENCE ─────────────────────────────
				else if (resource === 'sequence') {
					const id = this.getNodeParameter('resourceId', i);
					if (operation === 'update') {
						const fields = this.getNodeParameter('sequenceUpdateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'PATCH',
							url: `${base}/sequences/${id}`,
							body: fields,
							json: true,
						});
					} else if (operation === 'delete') {
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'DELETE',
							url: `${base}/sequences/${id}`,
							json: true,
						});
					} else if (operation === 'getFollowups') {
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/sequences/${id}/followups`,
							json: true,
						});
					} else if (operation === 'createFollowup') {
						const waitMin = this.getNodeParameter('followupWaitMin', i) as number;
						const waitUnits = this.getNodeParameter('followupWaitUnits', i) as string;
						const extra = this.getNodeParameter('followupCreateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'POST',
							url: `${base}/sequences/${id}/followups`,
							body: { waitMin, waitUnits, ...extra },
							json: true,
						});
					}
				}

				// ─────────────── TAG ──────────────────────────────────
				else if (resource === 'tag') {
					if (operation === 'getMany') {
						const filters = this.getNodeParameter('tagFilters', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/tags`,
							qs: filters,
							json: true,
						});
					} else if (operation === 'getById') {
						const id = this.getNodeParameter('resourceId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/tags/${id}`,
							json: true,
						});
					} else if (operation === 'create') {
						const title = this.getNodeParameter('tagTitle', i) as string;
						const extra = this.getNodeParameter('tagCreateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'POST',
							url: `${base}/tags`,
							body: { title, ...extra },
							json: true,
						});
					} else if (operation === 'update') {
						const id = this.getNodeParameter('resourceId', i);
						const fields = this.getNodeParameter('tagUpdateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'PATCH',
							url: `${base}/tags/${id}`,
							body: fields,
							json: true,
						});
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('resourceId', i);
						const force = this.getNodeParameter('tagForceDelete', i) as boolean;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'DELETE',
							url: `${base}/tags/${id}`,
							qs: force ? { force: true } : {},
							json: true,
						});
					} else if (operation === 'getProspects') {
						const id = this.getNodeParameter('resourceId', i);
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/tags/${id}/prospects`,
							qs: { page, limit },
							json: true,
						});
					}
				}

				// ─────────────── USER ─────────────────────────────────
				else if (resource === 'user') {
					if (operation === 'getMany') {
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/users`,
							qs: { page, limit },
							json: true,
						});
					} else if (operation === 'getById') {
						const id = this.getNodeParameter('resourceId', i) as string;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/users/${id}`,
							json: true,
						});
					} else if (operation === 'create') {
						const fields = this.getNodeParameter('userCreateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'POST',
							url: `${base}/users`,
							body: fields,
							json: true,
						});
					} else if (operation === 'update') {
						const id = this.getNodeParameter('resourceId', i) as string;
						const fields = this.getNodeParameter('userUpdateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'PATCH',
							url: `${base}/users/${id}`,
							body: fields,
							json: true,
						});
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('resourceId', i) as string;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'DELETE',
							url: `${base}/users/${id}`,
							json: true,
						});
					}
				}

				// ─────────────── WHITELABEL ───────────────────────────
				else if (resource === 'whitelabel') {
					if (operation === 'update') {
						const fields = this.getNodeParameter('whitelabelUpdateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'PATCH',
							url: `${base}/whitelabel`,
							body: fields,
							json: true,
						});
					}
				}

				// ─────────────── WORKSPACE ────────────────────────────
				else if (resource === 'workspace') {
					if (operation === 'getMany') {
						const page = this.getNodeParameter('page', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/workspaces`,
							qs: { page, limit },
							json: true,
						});
					} else if (operation === 'getById') {
						const id = this.getNodeParameter('resourceId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'GET',
							url: `${base}/workspaces/${id}`,
							json: true,
						});
					} else if (operation === 'create') {
						const title = this.getNodeParameter('workspaceTitle', i) as string;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'POST',
							url: `${base}/workspaces`,
							body: { title },
							json: true,
						});
					} else if (operation === 'update') {
						const id = this.getNodeParameter('resourceId', i);
						const fields = this.getNodeParameter('workspaceUpdateFields', i) as IDataObject;
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'PATCH',
							url: `${base}/workspaces/${id}`,
							body: fields,
							json: true,
						});
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('resourceId', i);
						response = await this.helpers.httpRequestWithAuthentication.call(this, 'manyreachApi', {
							method: 'DELETE',
							url: `${base}/workspaces/${id}`,
							json: true,
						});
					}
				}

				returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeApiError(this.getNode(), error as never);
			}
		}

		return [returnData];
	}
}
