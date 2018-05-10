import {ShapeOf} from '@pinyin/types'
import {Store} from 'redux'
import {Action} from './Action'
import {Dispatchers} from './Dispatchers'

export function createNamedDispatchers<Actions extends object, TargetStore extends Store<any, Action<Actions>>>(
    store: Store,
    shape: ShapeOf<Actions>
): Dispatchers<Actions> {
    const actionTypes = Object.keys(shape) as Array<keyof Actions>
    return actionTypes.reduce(
        (acc, curr) => Object.assign(acc, {[curr]: (payload: Actions[typeof curr]) => store.dispatch({type: curr, payload: payload})}),
        {} as Dispatchers<Actions>
    )
}
