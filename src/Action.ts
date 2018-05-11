import {Message} from '@pinyin/types'

export type Action<Actions extends object = object, ActionType extends keyof Actions = keyof Actions> = Message<{
    [Type in ActionType]: Actions[Type]
}>

