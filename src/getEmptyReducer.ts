import {Reducer} from 'redux'
import {Action} from './Action'

export function getEmptyReducer<State extends object, Actions extends object>(
    defaultState: State
): Reducer<State, Action<Actions>> {
    return (state: State | undefined) => state || defaultState
}
