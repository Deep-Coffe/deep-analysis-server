import { DateMetadata } from "./DateMetadata";
import Guid from "./Guid";



class Entity<T> {
    public id: Guid;
    public props: T;
    public createdAt: Date;
    public updatedAt?: Date;

    constructor(props: T, id?: string, dateMetadata?: DateMetadata) {
        this.id = new Guid(id);
        this.props = props;
        this.createdAt = dateMetadata?.createdAt ?? new Date();
        this.updatedAt = dateMetadata?.updatedAt ?? (id ? new Date() : undefined);
    }

    public presenter<E = Record<string, unknown>>() {
        const data: Record<string, unknown> = {
            id: this.id.toString(),
        };

        Object.entries(this.props as Record<string, unknown>).forEach(([key, value]) => {
            if (value instanceof Entity) {
                data[key] = value.presenter();
            } else if (Array.isArray(value)) {
                data[key] = value.map(item => item instanceof Entity ? item.presenter() : item);
            } else {
                data[key] = value;
            }
        });

        return data as E;
    }

    public equals(other: Entity<T>): boolean {
        if (this === other) {
            return true
        } else if (this.id.equals(other.id)) {
            return true
        }

        return false;
    }
}

export default Entity;