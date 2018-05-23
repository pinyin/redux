import {nothing, something, TaggedByMap, TagMap, TagOf} from '@pinyin/types'

export type Action<A extends TagMap = TagMap, AT extends TagOf<A> = TagOf<A>> = TaggedByMap<{
    [Type in AT]: (
        A[Type] extends nothing ?
            nothing :
            something
        ) extends nothing ?
        nothing :
        { payload: A[Type] }
}>
