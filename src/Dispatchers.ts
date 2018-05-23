import {something} from '@pinyin/types'
import {ActionTypeMap} from './ActionTypeMap'

export type Dispatchers<Actions extends ActionTypeMap, ActionTypes extends keyof Actions = keyof Actions> = {
    [Key in ActionTypes]: Actions[Key] extends something ?
        (payload: Actions[Key]) => void :
        () => void
}
