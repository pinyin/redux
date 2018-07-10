import {existing, notExisting} from '@pinyin/maybe'
import {something, TagFromMap} from '@pinyin/types'
import {Reducer} from 'redux'
import {ActionFromMap} from './ActionFromMap'
import {PAYLOAD} from './PAYLOAD'
import {TYPE} from './TYPE'

export function combineNamedReducers<S extends something, A extends object>(
    defaultState: S,
    reducers: NamedReducers<S, A>
): Reducer<S, ActionFromMap<A>> {
    return (state: S | undefined, action: ActionFromMap<A>): S => {
        const actionType = action[TYPE]
        const matchedReducer = reducers[actionType]
        state = existing(state) ? state : defaultState
        if (notExisting(matchedReducer) || action[TYPE] !== actionType) {
            return state
        }
        return matchedReducer(state, (action as any)[PAYLOAD]) // TODO
    }
}

export type NamedReducers<S extends something, A extends object> = {
    [key in TagFromMap<A>]: (state: S, payload: A[key]) => S
}
