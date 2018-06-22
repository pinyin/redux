import {existing} from '@pinyin/maybe'
import {Action} from './Action'
import {ActionMatchers, DefaultTo} from './ActionMatchers'


export function switchAction<A extends object, B = void>(action: Action<A>): ActionMatchers<A, B> {
    const proxy = new Proxy<ActionMatchers<A, B>>({} as any, {
        get(target: any, p: PropertyKey, receiver: any): any {
            if (p === DefaultTo) {
                return (defaultValue: B) =>
                    existing(target.value) ?
                        target.value :
                        defaultValue
            } else {
                return (handler: (payload: A[keyof A]) => B) => {
                    if (action.type === p) {
                        target.value = handler((action as any).payload)
                    }
                    return proxy
                }
            }
        }
    })

    return proxy
}

