import Entity from "@application/entity/Entity";
import IAnalysis from "./IAnalysis";
import IPlagueStrategy from "../strategy/plague/IPlagueStrategy";
import LeafRustStrategy from "../strategy/plague/LeafRustStrategy";
import PhomaStrategy from "../strategy/plague/PhomaStrategy";
import MinerStrategy from "../strategy/plague/MinerStrategy";
import CerscosporaStrategy from "../strategy/plague/CerscosporaStrategy";
import UnknownPlagueStrategy from "../strategy/plague/UnknownPlagueStrategy";
import { DiagnosticType } from "./DiagnosticType";
import { DateMetadata } from "@application/entity/DateMetadata";
import Plague from "@modules/plague/domain/entity/Plague";

class Analysis extends Entity<IAnalysis> {
    private _plague?: Plague;
    private _healthy: boolean = false;

    private readonly strategies: IPlagueStrategy[] = [
        new LeafRustStrategy(),
        new PhomaStrategy(),
        new MinerStrategy(),
        new CerscosporaStrategy(),
        new UnknownPlagueStrategy(),
    ]

    private constructor(props: IAnalysis, id?: string, date?: DateMetadata) {
        super(props, id, date);
    }

    private isHealthy() {
        return this.props.healthy >= 0.9;
    }

    private getMaxPercentPlague() {
        return (previousPlague: Plague, current: Plague) => {
            if (!previousPlague.percent || !current.percent) return previousPlague;

            return current.percent > previousPlague.percent ? current : previousPlague;
        };
    }

    public analyser(): DiagnosticType {
        const plagues = [];

        for (const strategy of this.strategies) {
            const possiblePlague = strategy.analyser(this.props);
            if (possiblePlague) plagues.push(possiblePlague);
        }

        this._plague = plagues.reduce(this.getMaxPercentPlague(), plagues[0]);

        if (!this._plague && this.isHealthy()) {
            this._healthy = true;
        }

        return {
            healthy: this._healthy,
            plague: this._plague,
        }
    }

    public getPlague() {
        return this._plague;
    }

    static createAnalysis(props: Omit<IAnalysis, 'analyzedAt'> & { analyzedAt?: Date }, id?: string, date?: DateMetadata) {
        props.analyzedAt ??= new Date();

        return new Analysis(props as IAnalysis, id, date);
    }
}

export default Analysis;