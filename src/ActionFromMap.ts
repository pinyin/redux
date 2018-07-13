import {IsNothing, TagFromMap} from '@pinyin/types'
import {PAYLOAD} from './PAYLOAD'
import {TYPE} from './TYPE'

export type ActionFromMap<S, T extends TagFromMap<S> = TagFromMap<S>> = {
    [key in T]: IsNothing<S[key]> extends true ?
        { [TYPE]: key, [PAYLOAD]?: S[key] } :
        { [TYPE]: key, [PAYLOAD]: S[key] }
}[T]
