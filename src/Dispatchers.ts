export type Dispatchers<Actions extends object, ActionTypes extends keyof Actions = keyof Actions> = {
    [Key in ActionTypes]: Actions[Key] extends null | undefined | never ?
        () => void :
        (payload: Actions[Key]) => void
}
