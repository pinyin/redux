import {createStore} from 'redux'
import {ActionFromMap} from './ActionFromMap'
import {combineNamedReducers, NamedReducers} from './combineNamedReducers'
import {PAYLOAD} from './PAYLOAD'
import {TYPE} from './TYPE'

type A = {
    add: number
    minus: number
}

type MathAction = ActionFromMap<A>

type State = number

describe(`${combineNamedReducers.name}`, () => {
    const reducers: NamedReducers<State, A> = {
        add: (state, payload) => state + payload,
        minus: (state, payload) => state - payload,
    }
    const store = createStore(combineNamedReducers<State, A>(0, reducers))

    it(`should set default value`, () => {
        expect(store.getState()).toEqual(0)
    })

    it(`should handle known actions`, () => {
        store.dispatch({[TYPE]: 'add', [PAYLOAD]: 8})
        expect(store.getState()).toEqual(8)
        store.dispatch({[TYPE]: 'minus', [PAYLOAD]: 3})
        expect(store.getState()).toEqual(5)
    })

    it(`should handle unknown actions`, () => {
        store.dispatch({[TYPE]: 'any', [PAYLOAD]: 8} as any)
        expect(store.getState()).toEqual(5)
    })

})