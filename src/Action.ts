import {Message} from '@pinyin/types'

export type Action<A extends object = object, AT extends NonNullable<keyof A> = NonNullable<keyof A>> = Message<A, AT>

