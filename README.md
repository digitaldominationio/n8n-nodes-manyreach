# Manyreach Node for n8n

Official community node to integrate the Manyreach cold email platform with n8n workflows.

This node lets you send leads, manage campaigns, and automate outreach using the Manyreach API directly from n8n.

Developed by Digital Domination.

## What is Manyreach

Manyreach is a cold email platform used for outbound sales, lead generation, and automated email outreach.

It allows teams to:

• send cold email campaigns
• manage email inboxes
• automate follow-ups
• track replies and engagement
• manage lead databases

This n8n node connects Manyreach with your automation workflows so you can trigger outreach directly from data sources such as Google Sheets, NocoDB, Airtable, or CRMs.

## Features

Current node capabilities include:

• create leads in Manyreach
• update existing leads
• fetch leads from Manyreach
• manage outreach campaigns
• automate cold email workflows

Example use cases:

Lead generation automation

Google Sheets → n8n → Manyreach → start campaign

CRM outreach automation

NocoDB → n8n → Manyreach → send leads to campaign

Sales pipeline automation

Apollo leads → n8n → Manyreach → automated outreach

## Installation

Install the node inside your n8n environment.

npm install n8n-nodes-manyreach

Restart n8n after installation.

## Credentials Setup

To connect n8n with Manyreach you need your Manyreach API key.

Steps:

1. Log in to Manyreach
2. Go to Settings
3. Copy your API key
4. Add new credentials in n8n

Credential type:

Manyreach API

Paste your API key and save.

## Example Workflow

Example automation flow:

Lead source → n8n → Manyreach

Typical setup:

Google Sheets
↓
n8n workflow
↓
Manyreach node
↓
Campaign launch

This allows automatic lead import and outreach.

## Node Operations

Supported resources and operations include:

Leads

• Create Lead
• Update Lead
• Get Lead
• Get Many Leads

Campaigns

• Start Campaign
• Pause Campaign
• Get Campaigns

More operations will be added in future releases.

## Development

This project was built using the n8n node development toolkit.

To run locally:

npm install
npm run dev

This starts a local n8n instance with the node loaded for testing.

## Repository

GitHub repository

https://github.com/digitaldominationio/n8n-nodes-manyreach

## About Digital Domination

Digital Domination is a marketing automation and outreach infrastructure company.

We build tools and automation systems for:

• cold email outreach
• lead generation
• marketing automation
• WhatsApp automation
• custom workflow integrations

Website

https://www.digitaldomination.io

## Contributing

Contributions and improvements are welcome.

Open an issue or submit a pull request on GitHub.

## License

MIT License
