# Development

To use the development configuration, create a compose override file:

```
ln -s docker-compose.dev.yml docker-compose.override.yml
```


## State management

This app uses Recoil for state management.

Recoil freezes all objects used for state, so do not use objects that are expected to be
mutated in state, e.g. Layer objects. They are OK in derived state (with
`allowDangerousMutations`), but not state that will be directly updated.
