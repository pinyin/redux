import {something} from '@pinyin/types'

export type Dispatchers<Actions extends object, ActionTypes extends keyof Actions = keyof Actions> = {
    [Key in ActionTypes]: Actions[Key] extends something ?
        (payload: Actions[Key]) => void :
        () => void
}
