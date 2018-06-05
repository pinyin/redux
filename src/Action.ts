import {IsAny, nothing, something, Tag, TaggedByMap} from '@pinyin/types'
import {ActionTypeMap} from './ActionTypeMap'

export type Action<A extends ActionTypeMap = DefaultActionMap, AT extends keyof A = keyof A> = TaggedByMap<{
    [Type in AT]: IsAny<A[Type]> extends true ?
        { payload: any } :
        A[Type] extends something ?
            { payload: A[Type] } :
            {}
}>

export type DefaultActionMap = {
    [K in Tag]: nothing
}
