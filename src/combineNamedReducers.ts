import {notExisting} from '@pinyin/maybe';
import {TagKey, tagMatches} from '@pinyin/types'
import {Reducer} from 'redux'
import {Action} from './Action'
import {Reducers} from './Reducers'

export function combineNamedReducers<S extends object, A extends object>(
    defaultState: S,
    reducers: Reducers<S, A>
): Reducer<S, Action<A>> {
    return (state: S | undefined, action: Action<A>): S => {
        const actionType = action[TagKey]
        const matchedReducer = reducers[actionType]
        if (notExisting(matchedReducer) || !tagMatches(action, actionType)) {
            return state || defaultState
        }
        return matchedReducer(state, action)
    }
}
