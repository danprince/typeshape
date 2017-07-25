# Combinators
This library exports a handful of basic types that can be combined and composed to create schemas.

```js
import { Combinators } from 'typeshape';
// or
import { OneOf, Maybe, Not, All, Explain } from 'typeshape';
```

## OneOf
The `OneOf` combinator takes a number of schemas and matches values that match at least one of those schemas.

```js
// Matches a string OR a number
OneOf(Types.string, Types.number)

// Matches literals
OneOf('Hearts', 'Clubs', 'Diamonds', 'Spades')
```

## Maybe
The `Maybe` combinator takes a schema and matches values that are either `undefined`, `null` or match that schema.

```js
// Matches strings or undefined/null
Maybe(Types.string)
```

`Maybe` can be used to add optional properties to objects.

```js
let PersonSchema = {
  name: Maybe(Types.string)
}
```

The `Maybe` combinator could also be created from the `OneOf` combinator.

```js
let MaybeString = OneOf(Types.string, null, undefined);
```

## Not
The `Not` combinator negates the resulting match for a given schema.

```js
// Matches any value that isn't boolean
Not(Types.boolean)

// Matches any value that isn't 42
Not(42)
```

## All
The `All` matches values that match all of its schemas.

```js
// Matches objects with name and score properties that are also instances of Player
All({ name: Types.string, score: Types.integer }, Types.instance(Player))
```

## Explain
The `Explain` combinator can be used to attach specific explanations to a given schema.

```js
let HouseSchema = Explain(
  OneOf('Stark', 'Lannister', 'Martell', 'Targaryen'),
  'Must be one of the Great Houses!'
);

HouseSchema('Snow')
// TypeError: Must be one of the Great Houses!
```

This error message will show up in the `reason` field of the validation result returned by the `validate` function.

