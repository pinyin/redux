import {nothing} from '@pinyin/types'
import {Reducer} from 'redux'
import {ActionFromMap} from './ActionFromMap'
import {PAYLOAD} from './PAYLOAD'

const SymbolType = Symbol('SymbolType')

type ActionFromMapTest = ActionFromMap<{
    stringType: {
        stringType: true
    }
    [SymbolType]: {
        symbolType: true
    }
    anyType: any
    0: {
        numberType: true
    }
}>

const action: ActionFromMapTest = {} as any

if (action.type === 'stringType') {
    let b = action[PAYLOAD]
    b = {stringType: true}
}

if (action.type === SymbolType) {
    let b = action[PAYLOAD]
    b = {symbolType: true}
}

if (action.type === 'anyType') {
    let b = action[PAYLOAD]
    b = {stringType: true}
    b = {symbolType: true}
    b = {}
}

let reducer: Reducer<any, ActionFromMapTest>

type A = any extends nothing ? 'a' : 'b'

let a: A = 'a'
let b: A = 'b'
// let c: A = 'c' // this should report an error

describe('ActionFromMap', () => {
    test("who needs tests?", () => {}) // must have at least one test or Jest will complain
})
