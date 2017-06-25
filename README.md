
<h1 align="center">
  <img src="http://i.imgur.com/rE9S6VY.png" /><br />
  Typeshape<br />
  <a href="https://travis-ci.org/danprince/typeshape"><img src="https://travis-ci.org/danprince/typeshape.svg?branch=master" height="18"/></a>
  <a href="https://badge.fury.io/js/typeshape"><img src="https://badge.fury.io/js/typeshape.svg" alt="npm version" height="18"></a>
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

Inspired by [React's PropTypes][1] and [JSON Blueprint][2].

# Docs
* [Getting started](docs/getting-started.md)
* [Types](docs/types.md)
  * [number](docs/types.md#number)
  * [integer](docs/types.md#integer)
  * [string](docs/types.md#string)
  * [boolean](docs/types.md#boolean)
  * [array](docs/types.md#array)
  * [object](docs/types.md#object)
  * [any](docs/types.md#any)
* [Combinators](docs/combinators.md)
  * [OneOf](docs/combinators.md#OneOf)
  * [Maybe](docs/combinators.md#Maybe)
  * [Not](docs/combinators.md#Not)

# Getting Started
Typeshape exposes a `check` function which be used to check whether a value matches a given schema.

The simplest kind of schema is just a literal value.

```js
import { check } from 'typeshape';

let schema = 1;

check(schema, 1) // true
check(schema, 2) // TypeError
```

To create a less specific schema, we can use types instead of literals.

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


[1]: https://www.npmjs.com/package/prop-types
[2]: http://www.json-blueprint.org/
