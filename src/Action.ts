import {nothing, something, Tag, TaggedByMap, TagOf} from '@pinyin/types'

export type Action<A extends ActionTypeMap = ActionTypeMap, AT extends TagOf<A> = TagOf<A>> = TaggedByMap<{
    [Type in AT]: something extends (
        A[Type] extends something ?
            something :
            nothing
        ) ?
        { payload: A[Type] } :
        {}
}>

export type ActionTypeMap = {
    [K in Tag]: any
}
