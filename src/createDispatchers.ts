import {existing} from '@pinyin/maybe'
import {Store} from 'redux'
import {Action} from './Action'
import {ActionTypeMap} from './ActionTypeMap'
import {Dispatchers} from './Dispatchers'

export function createDispatchers<Actions extends ActionTypeMap>(
    store: Store<any, Action<Actions>>
): Dispatchers<Actions> {
    return new Proxy<Dispatchers<Actions>>({} as any, {
        get(target: {}, p: PropertyKey, receiver: any): any {
            return (payload: any) => {
                store.dispatch(
                    existing(payload) ?
                        {type: p, payload: payload} as any :
                        {type: p}
                )
            }
        }
    })
}
