<h1 align="center">
  Typeshape
</h1>

<p align="center">
  <a href="https://travis-ci.org/danprince/typeshape"><img src="https://travis-ci.org/danprince/typeshape.svg?branch=master" height="18"/></a>
  <a href="https://badge.fury.io/js/typeshape"><img src="https://badge.fury.io/js/typeshape.svg" alt="npm version" height="18"></a>
</p>

A domain specific language for runtime type checking and dynamic object schemas.

```js
import { Types, OneOf, check } from 'typeshape';

let CardSchema = {
  suit: OneOf('Spades', 'Diamonds', 'Clubs', 'Hearts'),
  value: Types.number({ '>': 0, '<': 14 })
};

check(CardSchema, { suit: 'Spades', value: 10 })
```

Inspired by [Clojure Spec][1], [React's PropTypes][2] and [JSON Blueprint][3].

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
  * [And](docs/combinators.md#And)
  * [Explain](docs/combinators.md#Explain)
* [Writing Types & Combinators](docs/custom-types.md)

[1]: https://clojure.org/about/spec
[2]: https://www.npmjs.com/package/prop-types
[3]: http://www.json-blueprint.org/

