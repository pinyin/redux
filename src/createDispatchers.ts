import {existing} from '@pinyin/maybe'
import {Store} from 'redux'
import {Action} from './Action'
import {ActionTypeMap} from './ActionTypeMap'
import {Dispatchers} from './Dispatchers'

export function createDispatchers<Actions extends ActionTypeMap>(
    store: Store<any, Action<Actions>>,
    types: Iterable<keyof Actions>
): Dispatchers<Actions> {
    const dispatchWithType = (type: keyof Actions) => {
        return (payload: any) => {
            store.dispatch(
                existing(payload) ?
                    {type: type, payload: payload} as any :
                    {type: type}
            )
        }
    }

    const dispatchers = {} as any
    for (let type of types) {
        dispatchers[type] = dispatchWithType(type)
    }
    return dispatchers as Dispatchers<Actions>
}
