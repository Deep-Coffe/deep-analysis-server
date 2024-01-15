import Plague from "@modules/plague/domain/entity/Plague";

export type DiagnosticType = {
    healthy: boolean;
    plague?: Plague;
}