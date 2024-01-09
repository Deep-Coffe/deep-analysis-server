/* eslint-disable @typescript-eslint/no-explicit-any */
export type ControllerInput<T = any> = {
    payload: T,
    user: {
        id: string
    }
}

export type ControllerOutput<T = any> = T 