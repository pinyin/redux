import {nothing, Tagged, TagMap, TagOf} from '@pinyin/types'

export type Action<A extends TagMap = TagMap, AT extends TagOf<A> = TagOf<A>> = {
    [Type in AT]: Tagged<Type> &
    (A[Type] extends nothing ?
        {} :
        { payload: A[Type] })
}[AT]


