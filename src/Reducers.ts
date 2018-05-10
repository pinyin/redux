import {Reducer} from 'redux'
import {FluxStandardAction} from './Action'

export type Reducers<State extends object, Actions extends object, ActionTypes extends keyof Actions = keyof Actions> = {
    [Key in ActionTypes]: Reducer<State, FluxStandardAction<Key, Actions[Key]>>
}

