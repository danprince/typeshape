<h1 align="center">
  Typeshape
</h1>

<p align="center">
  <a href="https://travis-ci.org/danprince/typeshape"><img src="https://travis-ci.org/danprince/typeshape.svg?branch=master" height="18"/></a>
  <a href="https://badge.fury.io/js/typeshape"><img src="https://badge.fury.io/js/typeshape.svg" alt="npm version" height="18"></a>
</p>

Runtime type checking against composable schemas.

```js
import { Types, OneOf, validate } from 'typeshape';

let CardSchema = {
  suit: OneOf('Spades', 'Diamonds', 'Clubs', 'Hearts'),
  value: Types.number({ '>': 0, '<': 14 })
};

validate(CardSchema, { suit: 'Spaded', value: 10 })

// {
//   valid: false,
//   reason: 'Expected one of "Spades" or "Diamonds" or "Clubs" or "Hearts" but got "Spaded"',
//   path: ['suit']
// }
```

Check out the [demo](https://codepen.io/danprince/full/awyREY/)!

Inspired by [Clojure Spec][1], [React PropTypes][2] and [JSON Blueprint][3].

## Docs
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
  * [And](docs/combinators.md#And)
  * [Explain](docs/combinators.md#Explain)

## Rationale
Many applications and tools operate with structured data that the user provides at runtime, such as data sets, configuration files and task descriptions. Normally, these data sources are well beyond the reach of compile-time type checks, so it's the programmer's responsibility to build parsing and validation interfaces that receive and handle the data elegantly.

Typeshape helps you write declarative, composable runtime schemas that programmers can use to validate potentially malformed data, providing the tool needed to let the user know where and why an error occurred.

[1]: https://clojure.org/about/spec
[2]: https://www.npmjs.com/package/prop-types
[3]: http://www.json-blueprint.org/

