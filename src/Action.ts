import {ExtractByTag, TagFromMap, TaggedByMap, TagMap} from '@pinyin/types'

export type Action<A extends TagMap = TagMap, T extends TagFromMap<A> = TagFromMap<A>> =
    ExtractByTag<TaggedByMap<A>, T>

