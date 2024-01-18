import IObserver from "@application/observers/IObserver";
import ISubject from "@application/observers/ISubject";
import { Producer } from "kafkajs";

class MessageSubject implements ISubject {
    private observers: IObserver[] = [];

    constructor(public readonly producer: Producer) { }

    public attach(observer: IObserver) {
        this.observers.push(observer);
    }

    public async notify() {
        for (const observer of this.observers) {
            await observer.update(this);
        }
    }
}

export default MessageSubject;