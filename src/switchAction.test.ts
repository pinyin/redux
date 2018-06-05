import {createStore} from 'redux'
import {Action} from './Action'
import {DefaultTo, switchAction} from './switchAction'

type State = number

type Actions = {
    plus: number
    minus: number
}

type MathAction = Action<Actions>

describe(`${switchAction.name}`, () => {
    const store = createStore((state: State | undefined, action: MathAction) => {
        const prev: State = state || 0

        const next: State = switchAction<Actions, State>(action)
            .plus(num => prev + num)
            .minus(num => prev - num)
            [DefaultTo](prev)

        return next
    })

    test('state should be 0 after creation', () => {
        expect(store.getState()).toBe(0)
    })

    test('state should change with dispatched action', () => {
        store.dispatch({type: 'plus', payload: 1})
        expect(store.getState()).toBe(1)
        store.dispatch({type: 'minus', payload: -2})
        expect(store.getState()).toBe(3)
        store.dispatch({type: 's', payload: -1} as any)
        expect(store.getState()).toBe(3)
    })
})
