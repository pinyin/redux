import {EventHandlers, TagMap} from '@pinyin/types'
import {Store} from 'redux'
import {Action} from './Action'

export function createActionPublishers<Actions extends TagMap>(
    store: Store<any, Action<Actions>>
): EventHandlers<Actions> {
    return new Proxy<EventHandlers<Actions>>({} as any, {
        get(target: {}, p: PropertyKey, receiver: any): any {
            return (payload: any) => {
                store.dispatch({type: p, payload: payload} as any)
            }
        }
    })
}
