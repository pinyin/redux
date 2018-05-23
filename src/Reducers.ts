import {MatchTag, Tag, TagMap, TagOf} from '@pinyin/types';
import {Reducer} from 'redux'
import {Action} from './Action'

export type Reducers<State extends object,
    Actions extends TagMap,
    ActionTypes extends TagOf<Actions> = TagOf<Actions>> = {
    [Key in ActionTypes | Tag]: Reducer<State, MatchTag<Action<Actions>, Key>>
}

