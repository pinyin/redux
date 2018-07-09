import {nothing} from '@pinyin/types'
import {Reducer} from 'redux'
import {Action} from './Action'
import {PAYLOAD} from './PAYLOAD'

const SymbolType = Symbol('SymbolType')

type ActionTest = Action<{
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

const action: ActionTest = {} as any

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

let reducer: Reducer<any, Action>

type A = any extends nothing ? 'a' : 'b'

let a: A = 'a'
let b: A = 'b'
// let c: A = 'c' // this should report an error

describe("Action", () => {
    test("who needs tests?", () => {}) // must have at least one test or Jest will complain
})
