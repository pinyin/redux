import {nothing} from '@pinyin/types'
import {Action} from './Action'

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
    let b = action.payload
    b = {stringType: true}
}

if (action.type === SymbolType) {
    let b = action.payload
    b = {symbolType: true}
}

if (action.type === 'anyType') {
    let b = action.payload
    b = {stringType: true}
    b = {symbolType: true}

}


type A = any extends nothing ? 'a' : 'b'

let a: A = 'a'
let b: A = 'b'
// let c: A = 'c' // this should report an error

describe("Action", () => {
    test("who needs tests?") // must have at least one test or Jest will complain
})
