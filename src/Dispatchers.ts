export type Dispatchers<Actions extends object, ActionTypes extends keyof Actions = keyof Actions> = {
    [Key in ActionTypes]: (payload: Actions[Key]) => void
}
