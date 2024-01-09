/* eslint-disable @typescript-eslint/no-explicit-any */

export type Types<T = any> = new (...agrs: any[]) => T; 