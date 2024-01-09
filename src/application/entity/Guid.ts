import { v4 as uuidv4 } from 'uuid';

class Guid {
    private readonly id: string;

    constructor(id?: string) {
        this.id = id ?? uuidv4()
    }

    public toString() {
        return this.id;
    }

    public equals(otherId: Guid) {
        return otherId.id === this.id;
    }
}

export default Guid;