export type Action<Actions, ActionType extends keyof Actions = keyof Actions> = {
    [Key in ActionType]: FluxStandardAction<Key, Actions[Key]>
}[ActionType]

export type FluxStandardAction<Type, Payload> = {
    type: Type
    payload: Payload
}
