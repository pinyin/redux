import {Reducer} from 'redux'
import {FluxStandardAction} from './FluxStandardAction'

export type Reducers<Store extends object, Actions extends object, ActionTypes extends keyof Actions = keyof Actions> = {
    [Key in ActionTypes]: Reducer<Store, FluxStandardAction<Key, Actions[Key]>>
}

