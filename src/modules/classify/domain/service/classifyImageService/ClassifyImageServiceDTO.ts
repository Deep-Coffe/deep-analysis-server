export type ClassifyImageInputDTO = {
    image: string;
}

export type ClassifyImageOutputDTO = {
    cerscospora: number;
    healthy: number;
    leafRust: number;
    miner: number;
    phoma: number;
}