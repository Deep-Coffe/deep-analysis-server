import Plague from "@modules/valueObject/plague/Plague";

export type DiagnosticType = {
    healthy: boolean;
    plague?: Plague;
}