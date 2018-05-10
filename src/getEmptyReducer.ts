import {Reducer} from 'redux'
import {Action} from './Action'

export function getEmptyReducer<Store extends object, Actions extends object>(
    defaultStore: Store
): Reducer<Store, Action<Actions>> {
    return (store: Store | undefined) => store || defaultStore
}
