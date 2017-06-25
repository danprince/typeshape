# Combinators
This library exports a handful of basic types that can be combined and composed to create schemas.

```js
import { Combinators } from 'typeshape';
// or
import { OneOf, Maybe, Not } from 'typeshape';
```

### OneOf
The `OneOf` combinator takes a number of schemas and matches values that match at least one of those schemas.

```js
// Matches a string OR a number
OneOf(Types.string, Types.number)

// Matches literals
OneOf('Hearts', 'Clubs', 'Diamonds', 'Spades')
```

### Maybe
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

### Not
The `Not` combinator negates the resulting match for a given schema.

```js
// Matches any value that isn't boolean
Not(Types.boolean)

// Matches any value that isn't 42
Not(42)
```

## Writing New Combinators
Guide on writing a combinator

