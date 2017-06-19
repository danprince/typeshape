# Typeshape

A domain specific language for runtime type checking and dynamic object schemas.

```js
import { Types, OneOf, check } from 'typeshape';

let CardSchema = {
  suit: OneOf('Spades', 'Diamonds', 'Clubs', 'Hearts'),
  value: Types.number({ '>': 0, '<': 14 })
};

check(CardSchema, { suit: 'Spades', value: 10 });
```

