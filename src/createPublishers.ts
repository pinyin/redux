import {existing} from '@pinyin/maybe'
import {TagMap} from '@pinyin/types'
import {Store} from 'redux'
import {Action} from './Action'
import {Dispatchers} from './Dispatchers'

export function createPublishers<Actions extends TagMap>(
    store: Store<any, Action<Actions>>
): Dispatchers<Actions> {
    return new Proxy<Dispatchers<Actions>>({} as any, {
        get(target: {}, p: PropertyKey, receiver: any): any {
            return (payload: any) => {
                store.dispatch(
                    existing(payload) ?
                        {type: p, payload: payload} as any :
                        {type: p}
                )
            }
        }
    })
}
