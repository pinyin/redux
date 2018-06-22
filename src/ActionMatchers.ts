import {something} from '@pinyin/types'

export const DefaultTo: unique symbol = Symbol('DefaultTo')

export type ActionMatchers<A extends object, B = void, C extends keyof A = keyof A> = {
    [Type in C]: (
        handler: A[Type] extends something ?
            (payload: A[Type]) => B:
            () => B
    ) => ActionMatchers<A, B, Exclude<C, Type>>
} & {
    [DefaultTo]: (defaultValue: B) => B
}

