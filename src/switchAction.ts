import {Maybe} from '@pinyin/maybe'
import {nothing, TagFromMap, TagMap} from '@pinyin/types'
import {ActionFromMap} from './ActionFromMap'
import {PAYLOAD} from './PAYLOAD'
import {TYPE} from './TYPE'

export function switchAction<A extends TagMap, B>(
    action: ActionFromMap<A>,
    types: Maybe<ReadonlyArray<TagFromMap<A>>> = nothing,
): ActionMatcher<A, B> {
    if (types) {
        const target: any = {}
        let result: B = undefined as any
        types.forEach(tag =>
            target[tag] = (matched: (content: TagMap[TagFromMap<A>]) => B) => {
                if (action[TYPE] === tag as any) {
                    result = matched(action[PAYLOAD])
                }
                return target
            },
        )
        target[Others] = (value: B) =>
            result === undefined ? value : result
        return target
    } else {
        const proxy = new Proxy<ActionMatcher<A, B>>({[Others]: undefined} as any, {
            get(target: any, tag: TagFromMap<A>, receiver: any): any {
                if (tag === Others) {
                    return (value: B) => target[Others] === undefined ? value : target[Others]
                } else {
                    return (matched: (content: TagMap[TagFromMap<A>]) => B) => {
                        if (action[TYPE] === tag as any) {
                            target[Others] = matched(action[PAYLOAD])
                        }
                        return proxy
                    }
                }
            },
        })
        return proxy
    }
}

export const Others = Symbol('Others')

export type ActionMatcher<A extends TagMap, B, T extends TagFromMap<A> = TagFromMap<A>> = {
    [type in T]: (matched: (content: TagMap[type]) => B) => ActionMatcher<A, B, NonNullable<Exclude<T, type>>>
} & {
    [Others]: (value: B) => B
}
