# Getting Started
Typeshape exposes a `validate` function which be used to check whether a value matches a given schema.

The simplest kind of schema is just a literal value.

```js
import { validate } from 'typeshape';

let schema = 1;

validate(schema, 1) // { valid: true, ... }
validate(schema, 2) // { valid: false, ... }
```

To create a less specific schema, we can use types instead of literals.

```js
import { Types, validate } from 'typeshape';

let schema = Types.number;

validate(schema, 1)   // { valid: true, ... }
validate(schema, '1') // { valid: false, ... }
```

We can also configure types to restrict the set of values that they will match against.

```js
import { Types, validate } from 'typeshape';

let schema = Types.number({ '>': 5 });

validate(schema, 10) // { valid: true, ... }
validate(schema, 0)  // { valid: false, ... }
```

## Composing Schemas
Typeshape's checkers are designed to be used together or _composed_ to create more complex schemas.

For example the array type can be configured with a single argument, specifying the schema that each element of an array must match.

```js
import { Types, validate } from 'typeshape';

let schema = Types.array(Types.number);

validate(schema, [1, 2, 3, 4])               // { valid: true, ... }
validate(schema, [true, true, false, false]) // { valid: false, ... }
```

Object literal schemas take this idea one step further. We could take a complicated `ProfileSchema` and rewrite it as the composition of several smaller schemas instead.

```js
import { Types, validate } from 'typeshape';

let ProfileSchema = {
  name: {
    firstName: Types.string,
    secondName: Types.string
  },
  address: {
    addressLine1: Types.string,
    addressLine2: Types.string,
    county: Types.string,
    country: Types.string
  }
}

// Could be rewritten as:

let NameSchema = {
  firstName: Types.string,
  secondName: Types.string
};

let AddressSchema = {
  addressLine1: Types.string,
  addressLine2: Types.string,
  county: Types.string,
  country: Types.string
};

let ProfileSchema = {
  name: NameSchema,
  address: AddressSchema
}
```

This technique is particularly handy if you need to share sub-schemas between multiple high level schemas.

## Reporting Errors
The validate function returns an object with the following fields:

```js
{
  // Result of the validation
  valid: boolean;

  // Description of the error
  reason: string;

  // Key based path to value that caused validation to fail
  path: string[];
}
```

A combination of the `reason` and the `path` fields should often be all that's required to generate a user-friendly error describing the problem.
