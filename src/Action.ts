import {nothing, something, Tag, TaggedByMap} from '@pinyin/types'
import {ActionTypeMap} from './ActionTypeMap'

export type Action<A extends ActionTypeMap = DefaultActionMap, AT extends keyof A = keyof A> = TaggedByMap<{
    [Type in AT]: something extends (
        A[Type] extends something ?
            something :
            nothing
        ) ?
        { payload: A[Type] } :
        {}
}>

export type DefaultActionMap = {
    [K in Tag]: nothing
}
