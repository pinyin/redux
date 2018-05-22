import {nothing, TaggedByMap, TagMap} from '@pinyin/types'

export type Action<A extends TagMap = TagMap, AT extends keyof A = keyof A> = Readonly<TaggedByMap<{
    [Type in AT]: (A[Type] extends nothing ?
        {} :
        { payload: A[Type] })
}>>
