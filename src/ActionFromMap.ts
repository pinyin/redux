import {TagFromMap, TaggedByMap} from '@pinyin/types'

export type ActionFromMap<S, T extends TagFromMap<S> = TagFromMap<S>> = TaggedByMap<S, T>