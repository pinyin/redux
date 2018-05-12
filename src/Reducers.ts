import {MatchTag} from '@pinyin/types';
import {Reducer} from 'redux'
import {Action} from './Action'

export type Reducers<State extends object, Actions extends object, ActionTypes extends keyof Actions = keyof Actions> = {
    [Key in ActionTypes]: Reducer<State, MatchTag<Action<Actions>, Key>>
}

