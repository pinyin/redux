import {notExisting} from '@pinyin/maybe'
import {Discriminate} from '@pinyin/types'
import {Reducer} from 'redux'
import {Action} from './Action'
import {Reducers} from './Reducers'

export function combineNamedReducers<State extends object, Actions extends object>(
    defaultState: State,
    reducers: Reducers<State, Actions>
): Reducer<State, Action<Actions>> {
    return (state: State | undefined, action: Action<Actions>): State => {
        const actionType = action.type
        const matchedReducer = reducers[actionType]
        if (notExisting(matchedReducer)) {
            return state || defaultState
        }
        return matchedReducer(state, action as Discriminate<Action<Actions>, typeof actionType>)
    }
}
