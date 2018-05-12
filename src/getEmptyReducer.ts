import {Reducer} from 'redux'

export function getEmptyReducer<State extends object>(
    getDefaultState: () => State
): Reducer<State, any> {
    return (state: State | undefined) => state || getDefaultState()
}
