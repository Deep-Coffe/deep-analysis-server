export default interface IAnalysis {
    author: string;
    userId: string;
    analyzedAt: Date;
    cerscospora: number;
    healthy: number;
    leafRust: number;
    miner: number;
    phoma: number;
    attachmentId?: string;
    createdAt?: Date;
}