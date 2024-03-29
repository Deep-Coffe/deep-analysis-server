export default interface IAnalysis {
    author: string;
    name: string;
    analyzedAt: Date;
    cerscospora: number;
    healthy: number;
    leafRust: number;
    miner: number;
    phoma: number;
    attachmentId?: string;
    createdAt?: Date;
}