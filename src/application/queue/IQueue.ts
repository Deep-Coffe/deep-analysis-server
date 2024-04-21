/* eslint-disable @typescript-eslint/no-explicit-any */
export type Fn = (data: any) => Promise<any>;

export default interface IQueue {
    enqueue<R, T>(data: T): Promise<R>;
    addJob(job: Fn): void;
}