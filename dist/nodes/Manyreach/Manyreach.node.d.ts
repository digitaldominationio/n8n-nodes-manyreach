import { IExecuteFunctions, INodeType, INodeTypeDescription, NodeOutput } from 'n8n-workflow';
export declare class Manyreach implements INodeType {
    description: INodeTypeDescription;
    execute(this: IExecuteFunctions): Promise<NodeOutput>;
}
