import {existing} from '@pinyin/maybe'
import {Action} from './Action'

export function switchAction<A extends object, B = void>(
    action: Action<A>,
    matcher: Matcher<A, B>
): B {
    const handler = matcher[action.type]

    if (existing(handler)) {
        return (handler as any)((action as any).payload) as B
    }

    return matcher[Default]
}

export const Default = Symbol('Default')

type Matcher<A extends object, B> = {
    [type in keyof A]?: (payload: A[type]) => B
} & {
    [Default]: B
}

