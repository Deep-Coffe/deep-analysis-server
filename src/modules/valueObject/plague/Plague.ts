import { PlagueEnum } from "@common/enum/Plague";

class Plague {
    public readonly name: PlagueEnum;
    public readonly percent: number;

    constructor(name: PlagueEnum, percent: number) {
        this.name = name;
        this.percent = percent
    }
}

export default Plague;