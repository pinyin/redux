import {existing, notExisting} from '@pinyin/maybe';
import {something, TagKey, tagMatches} from '@pinyin/types'
import {Reducer} from 'redux'
import {Action} from './Action'

export function combineNamedReducers<S extends something, A extends object>(
    defaultState: S,
    reducers: NamedReducers<S, A>
): Reducer<S, Action<A>> {
    return (state: S | undefined, action: Action<A>): S => {
        const actionType = action[TagKey]
        const matchedReducer = reducers[actionType]
        state = existing(state) ? state : defaultState
        if (notExisting(matchedReducer) || !tagMatches(action, actionType)) {
            return state
        }
        return matchedReducer(state, (action as any).payload) // TODO
    }
}

export type NamedReducers<S extends something, A extends object, K extends keyof A = keyof A> = {
    [key in K]: (state: S, payload: A[key]) => S
}
