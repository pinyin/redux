import {createStore} from 'redux'
import {Action} from './Action'
import {createDispatchers} from './createDispatchers'

type State = number

type Actions = {
    plus: number
    minus: number
}

const types: Array<keyof Actions> = ['plus', 'minus']

describe(`${createDispatchers.name}`, () => {
    const store = createStore((state: State | undefined, action: Action<Actions>) => {
        state = state || 0
        switch (action.type) {
            case 'plus':
                state += action.payload
                break;
            case 'minus':
                state -= action.payload
                break;
        }
        return state
    })

    test('state should be 0 after creation', () => {
        expect(store.getState()).toBe(0)
    })

    test('state should change with dispatched action', () => {
        store.dispatch({type: 'plus', payload: 1})
        expect(store.getState()).toBe(1)
        store.dispatch({type: 'minus', payload: -2})
        expect(store.getState()).toBe(3)
    })

    const publishers = createDispatchers<Actions>(store, types)

    test('publishers should have methods with the same name as action types', () => {
        expect(publishers.plus).toBeInstanceOf(Function)
        expect(publishers.minus).toBeInstanceOf(Function)
    })

    test('publishers should function just like store\'s dispatch method', () => {
        publishers.plus(2)
        expect(store.getState()).toBe(5)
        publishers.minus(20)
        expect(store.getState()).toBe(-15)
    })

})
