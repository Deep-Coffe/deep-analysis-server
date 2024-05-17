/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter } from 'events'
import crypto from 'crypto';
import { Fn } from './IQueue';

class Queue {
    static instance: Queue

    readonly queue: { id: string, data: any }[];

    readonly event: EventEmitter;

    private hasProcess = false;

    private constructor(eventEmitter: EventEmitter) {
        this.queue = [];
        this.event = eventEmitter;

        this.event.addListener('hasProcessing', () => this.hasProcess = true);
    }

    static getInstance() {
        if (!Queue.instance) Queue.instance = new Queue(new EventEmitter());

        return Queue.instance;
    }

    async enqueue<R, T>(req: T): Promise<R> {
        const uuid = crypto.randomUUID();
        this.queue.push({
            id: uuid,
            data: req,
        });
        this.event.emit('push_data');

        const { data } = await new Promise<{ data: R }>((resolver, reject) => {
            this.event.addListener('process', ({ error, data }: { error?: Error, data: any }) => {
                if (error) reject(error);

                if (uuid == data.id)
                    resolver(data);
            });
        });

        return data
    }

    public addJob(fn: Fn) {
        this.event.addListener('push_data', async () => {
            console.log(this.queue);
            console.log(this.hasProcess);


            if (this.queue.length > 1 || this.hasProcess) return;

            const item = this.queue.shift();
            if (item) {
                this.event.emit('hasProcessing')
                const res = await fn(item.data);

                this.event.emit('process', { data: { id: item.id, data: res } });
                this.event.emit('get_next');

                return;
            }

            this.event.emit('process', { error: new Error('Queue failed') });
        });

        this.event.addListener('get_next', async () => {
            if (this.queue.length === 0) {
                this.hasProcess = false
                return;
            }

            const item = this.queue.shift();
            if (item) {
                this.event.emit('hasProcessing')
                const res = await fn(item.data);

                this.event.emit('process', { data: { id: item.id, data: res } });
                this.event.emit('get_next');
                return;
            }

            this.event.emit('process', { error: new Error('Queue failed') });
        });
    }

}

export default Queue