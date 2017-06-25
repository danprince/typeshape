# Types
This library exports a handful of basic types that can be combined and composed to create schemas.

```js
import { Types } from 'typeshape';
```

### number
Checks whether a value is a JavaScript number.

```js
// Match all numbers
Types.number

// Match numbers in exclusive range
Types.number({ '>': 0, '<': 10 })

// Match numbers in inclusive range
Types.number({ '>=': 1, '<=': 9 })
```

### integer
Checks whether a given value is a whole number without a fraction.

```js
// Match all numbers
Types.integer

// Match numbers in exclusive range
Types.integer({ '>': 0, '<': 10 })

// Match numbers in inclusive range
Types.integer({ '>=': 1, '<=': 9 })
```

### string
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

### boolean
Checks whether a given value is a boolean.

```js
// Matches all booleans
Types.boolean
```

### array
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

### object
Checks whether a given value is an object.

```js
// Matches all objects
Types.object

// Matches objects where the values are strings
Types.object(Types.string)
Types.object({ type: Types.string })
```

__Note:__ Just like JavaScript, the object type also matches `null` values. Most of the time you should define schemas with object literals rather than `Types.object`.

### any
Matches any value.

## Writing New Types
Guide on writing a new type

