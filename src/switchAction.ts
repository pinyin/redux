import {existing} from '@pinyin/maybe'
import {nothing} from '@pinyin/types'
import {Action} from './Action'

export const DefaultTo = Symbol('Default')

export function switchAction<A extends object, B = void>(action: Action<A>): Matchers<A, B> {
    const proxy = new Proxy<Matchers<A, B>>({[DefaultTo]: nothing} as any, {
        get(target: any, p: PropertyKey, receiver: any): any {
            if (p === DefaultTo) {
                return (defaultValue: B) => existing(target[DefaultTo]) ?
                    target[DefaultTo] :
                    defaultValue
            } else {
                return (handler: (payload: A[keyof A]) => B) => {
                    if (action.type === p) {
                        target[DefaultTo] = handler((action as any).payload)
                    }
                    return proxy
                }
            }
        }
    })

    return proxy
}

export type Matchers<A extends object, B = void, C extends keyof A = keyof A> = {
    [Type in C]: (
        handler: A[Type] extends nothing ?
            () => B:
            (payload: A[Type]) => B
    ) => Matchers<A, B, Exclude<C, Type>>
} & {
    [DefaultTo]: (defaultValue: B) => B
}


