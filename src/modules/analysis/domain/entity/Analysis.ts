import Entity from "@application/entity/Entity";
import IAnalysis from "./IAnalysis";
import Plague from "@modules/valueObject/plague/Plague";
import IPlagueStrategy from "../strategy/plague/IPlagueStrategy";
import LeafRustStrategy from "../strategy/plague/LeafRustStrategy";
import PhomaStrategy from "../strategy/plague/PhomaStrategy";
import MinerStrategy from "../strategy/plague/MinerStrategy";
import CerscosporaStrategy from "../strategy/plague/CerscosporaStrategy";
import UnknownPlagueStrategy from "../strategy/plague/UnknownPlagueStrategy";
import { DiagnosticType } from "./DiagnosticType";

class Analysis extends Entity<IAnalysis> {
    private _plague?: Plague;
    private _healthy: boolean = false;
    private _plagueId?: string;

    private readonly strategies: IPlagueStrategy[] = [
        new LeafRustStrategy(),
        new PhomaStrategy(),
        new MinerStrategy(),
        new CerscosporaStrategy(),
        new UnknownPlagueStrategy(),
    ]

    private constructor(props: IAnalysis, id?: string) {
        super(props, id);
    }

    private isHealthy() {
        return this.props.healthy >= 0.9;
    }

    public setPlagueId(plagueId: string) {
        this._plagueId = plagueId;
    }

    public getPlagueId() {
        return this._plagueId;
    }

    public analyser(): DiagnosticType {
        const plagues = [];

        for (const strategy of this.strategies) {
            const possiblePlague = strategy.analyser(this.props);
            if (possiblePlague) plagues.push(possiblePlague);
        }

        this._plague = plagues.reduce((previousPlague, current) => {
            return current.percent > previousPlague.percent ? current : previousPlague;
        }, plagues[0]);

        if (!this._plague && this.isHealthy()) {
            this._healthy = true;
        }

        return {
            healthy: this._healthy,
            plague: this._plague,
        }
    }

    static createAnalysis(props: IAnalysis, id?: string) {
        return new Analysis(props, id);
    }
}

export default Analysis;