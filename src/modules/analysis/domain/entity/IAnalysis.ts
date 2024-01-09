export default interface IAnalysis {
    author: string;
    userId: string;
    analyzedAt: Date;
    cerscospora: number;
    healthy: number;
    leafRust: number;
    miner: number;
    phoma: number;
    createdAt?: Date;
}