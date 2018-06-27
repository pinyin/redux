import {nothing} from '@pinyin/types'
import {createActionCreators} from './createActionCreators'

type A = {
    a: string
    b: number
    c?: boolean
    d: nothing
}

describe(`${createActionCreators.name}`, () => {
    test(`should return actions based on passed types`, () => {
        const creator = createActionCreators<A>(['a', 'b', 'c', 'd'])
        expect(creator.a('a')).toEqual({type: 'a', payload: 'a'})
        expect(creator.b(1)).toEqual({type: 'b', payload: 1})
        expect(creator.c(true)).toEqual({type: 'c', payload: true})
        expect(creator.c(undefined)).toEqual({type: 'c', payload: undefined})
        expect(creator.d()).toEqual({type: 'd', payload: undefined})
    })
    test(`should return actions when no type is provided`, () => {
        const creator = createActionCreators<A>()
        expect(creator.a('a')).toEqual({type: 'a', payload: 'a'})
        expect(creator.b(1)).toEqual({type: 'b', payload: 1})
        expect(creator.c(true)).toEqual({type: 'c', payload: true})
        expect(creator.c(undefined)).toEqual({type: 'c', payload: undefined})
        expect(creator.d()).toEqual({type: 'd', payload: undefined})
    })
})
