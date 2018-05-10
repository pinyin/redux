import {Reducer} from 'redux'
import {Action} from './Action'
import {FluxStandardAction} from './FluxStandardAction'

export function getEmptyReducer<Store extends object, Actions extends object>(
    defaultStore: Store
): Reducer<Store, Action<Actions>> {
    return () => defaultStore
}
