import {nothing} from '@pinyin/types'
import {createActionCreators} from './createActionCreators'
import {PAYLOAD} from './PAYLOAD'
import {TYPE} from './TYPE'

type A = {
    a: string
    b: number
    c?: boolean
    d: nothing
}

describe(`${createActionCreators.name}`, () => {
    test(`should return actions based on passed types`, () => {
        const creator = createActionCreators<A>(['a', 'b', 'c', 'd'])
        expect(creator.a('a')).toEqual({[TYPE]: 'a', [PAYLOAD]: 'a'})
        expect(creator.b(1)).toEqual({[TYPE]: 'b', [PAYLOAD]: 1})
        expect(creator.c(true)).toEqual({[TYPE]: 'c', [PAYLOAD]: true})
        expect(creator.c(undefined)).toEqual({[TYPE]: 'c', [PAYLOAD]: undefined})
        expect(creator.d()).toEqual({[TYPE]: 'd', [PAYLOAD]: undefined})
    })
    test(`should return actions when no type is provided`, () => {
        const creator = createActionCreators<A>()
        expect(creator.a('a')).toEqual({[TYPE]: 'a', [PAYLOAD]: 'a'})
        expect(creator.b(1)).toEqual({[TYPE]: 'b', [PAYLOAD]: 1})
        expect(creator.c(true)).toEqual({[TYPE]: 'c', [PAYLOAD]: true})
        expect(creator.c(undefined)).toEqual({[TYPE]: 'c', [PAYLOAD]: undefined})
        expect(creator.d()).toEqual({[TYPE]: 'd', [PAYLOAD]: undefined})
    })
})
