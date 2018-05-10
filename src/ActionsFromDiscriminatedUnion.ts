import {Action} from './Action'

export type ActionsFromDiscriminatedUnion<Union extends Action<any>, ActionType extends Union['type'] = Union['type']> = {
    [Type in ActionType]: Union extends { type: Type } ? Union : never
}

type T = { type: 'a', payload: number } | { type: 'b', payload: string }
type TA = ActionsFromDiscriminatedUnion<T>





