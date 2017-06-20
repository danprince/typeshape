
<h1 align="center">
  <img src="http://i.imgur.com/rE9S6VY.png" /><br />
  Typeshape<br />
  <a href="https://travis-ci.org/danprince/typeshape">
    <img src="https://travis-ci.org/danprince/typeshape.svg?branch=master" />
  </a>
</h1>

A domain specific language for runtime type checking and dynamic object schemas.

```js
import { Types, OneOf, check } from 'typeshape';

let CardSchema = {
  suit: OneOf('Spades', 'Diamonds', 'Clubs', 'Hearts'),
  value: Types.number({ '>': 0, '<': 14 })
};

check(CardSchema, { suit: 'Spades', value: 10 })
```

# Getting Started
Typeshape exposes a `check` function which be used to check whether a value matches a given schema.

The simplest kind of schema is just a literal value.

```js
import { check } from 'typeshape';

let schema = 1;

check(schema, 1) // true
check(schema, 2) // TypeError
```

To create a more reusable schema, we can start to use types instead of literals.

```js
import { Types, check } from 'typeshape';

let schema = Types.number;

check(schema, 1) // true
check(schema, '1') // TypeError
```

We can also configure types to restrict the set of values that they will match against.

```js
import { Types, check } from 'typeshape';

let schema = Types.number({ '>': 5 });

check(schema, 10) // true
check(schema, 0) // TypeError
```

# Types
This library exports a handful of basic types and combinators that can be combined and composed to create schemas.

```js
import { Types, Combinators } from 'typeshape';
```

### `Types.number`
Checks whether a value is a JavaScript number.

```js
// Match all numbers
Types.number

// Match numbers in exclusive range
Types.number({ '>': 0, '<': 10 })

// Match numbers in inclusive range
Types.number({ '>=': 1, '<=': 9 })
```

### `Types.integer`
Checks whether a given value is a whole number without a fraction.

```js
// Match all numbers
Types.integer

// Match numbers in exclusive range
Types.integer({ '>': 0, '<': 10 })

// Match numbers in inclusive range
Types.integer({ '>=': 1, '<=': 9 })
```

### `Types.string`
Checks whether a given value is a string.

```js
// Matches all strings
Types.string

// Matches strings that match regex pattern
Types.string(/foo$/)
Types.string({ pattern: /foo$/ });

// Matches strings with exact length
Types.string({ length: 3 })

// Matches strings with length inclusive range
Types.string({ minLength: 1, maxLength: 10 })
```

### `Types.boolean`
Checks whether a given value is a boolean.

```js
// Matches all booleans
Types.boolean
```

### `Types.array`
Checks whether a given value is an array.

```js
// Matches all arrays
Types.array

// Matches array of strings
Types.array(Types.string)
Types.array({ type: Types.string })

// Matches arrays with exact length
Types.array({ length: 3 })
```

### `Types.object`
Checks whether a given value is an object.

```js
// Matches all objects
Types.object

// Matches objects where the values are strings
Types.object(Types.string)
Types.object({ type: Types.string })
```

__Note:__ Just like JavaScript, the object type also matches `null` values. Most of the time you should define schemas with object literals rather than `Types.object`.

### `Types.any`
Matches any value.

### `Types.literal`
Matches exact values.

```js
Types.literal(3)
```

### `Combinators.OneOf`
The `OneOf` combinator takes a number of schemas and matches values that match at least one of those schemas.

```js
// Matches a string OR a number
OneOf(Types.string, Types.number)

// Matches literals
OneOf('Hearts', 'Clubs', 'Diamonds', 'Spades')
```

### `Combinators.Maybe`
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

### `Combinators.Not`
The `Not` combinator negates the resulting match for a given schema.

```js
// Matches any value that isn't boolean
Not(Types.boolean)

// Matches any value that isn't 42
Not(42)
```

# Generate
It's also possible to generate a schema from an example value.

```js
import { generate, Types } from 'typeshape';

let ExampleSchema = generate({
  foo: 3
})

// is the same as

let ExampleSchema = {
  foo: Types.number
}
```

