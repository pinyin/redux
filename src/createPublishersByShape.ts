import {existing} from '@pinyin/maybe'
import {ShapeOf} from '@pinyin/types'
import {Store} from 'redux'
import {Action} from './Action'
import {Dispatchers} from './Dispatchers'

export function createPublishersByShape<A extends object, S extends Store<any, Action<A>> = Store<any, Action<A>>>(
    store: S,
    shape: ShapeOf<A>
): Dispatchers<A> {
    const actionTypes = Object.keys(shape) as Array<keyof A>
    return actionTypes.reduce(
        (acc, curr) => Object.assign(acc, {
            [curr]: (payload: any) =>
                store.dispatch((
                    existing(payload) ?
                        {type: curr, payload: payload} :
                        {type: curr}
                ) as any)
        }),
        {} as Dispatchers<A>
    )
}
