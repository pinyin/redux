import {existing} from '@pinyin/maybe'
import {IsNothing} from '@pinyin/types'
import {ActionFromMap} from './ActionFromMap'
import {PAYLOAD} from './PAYLOAD'
import {TYPE} from './TYPE'

export function createActionCreators<A extends object, T extends NonNullable<keyof A> = NonNullable<keyof A>>(
    shape?: Iterable<T>
): ActionCreators<A, T> {
    if (existing(shape)) {
        const creators = {} as any
        for (const type of shape) {
            creators[type] = (payload: any) => ({[TYPE]: type, [PAYLOAD]: payload})
        }
        return creators
    } else {
        return new Proxy({} as any, {
            get(target: T, p: PropertyKey, receiver: any): any {
                return (payload: any) => ({[TYPE]: p, [PAYLOAD]: payload})
            }
        })
    }
}

export type ActionCreators<A extends object, T extends NonNullable<keyof A> = NonNullable<keyof A>> = {
    [type in T]: IsNothing<A[type]> extends true ?
        () => ActionFromMap<A, type> :
        (payload: A[type]) => ActionFromMap<A, type>
}
