import {MatchTag, Tag, TagOf} from '@pinyin/types';
import {Reducer} from 'redux'
import {Action} from './Action'
import {ActionTypeMap} from './ActionTypeMap'

export type Reducers<State extends object,
    Actions extends ActionTypeMap,
    ActionTypes extends TagOf<Actions> = TagOf<Actions>> = {
    [Key in ActionTypes | Tag]: Reducer<State, MatchTag<Action<Actions>, Key>>
}

