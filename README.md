# jsontyped-reducer

Reduces recusively JSON objects with $type property through customizable reducers. Uses JSON.stringify.

## Installation

```sh
npm i -s @allnulled/jsontyped-reducer
```

## Importation

In node.js:

```js
require("@allnulled/jsontyped-reducer")
```

In browser:

```html
<script src="node_modules/@allnulled/jsontyped-reducer/jsontyped-reducer.js"></script>
```

## Usage

This is the current test.

```js
require(__dirname + "/jsontyped-reducer.js");

describe("JsontypedReducer API Test", function () {
  it("can reduce types as expected in test 1", async function () {
    try {
      console.log(JsontypedReducer.reduce([{
        $type: "sumar",
        $operands: ["a", "b", "c"],
        a: 1,
        b: 2,
        c: 3
      },
      {
        $type: "restar",
        $operands: ["c", "b", "a"],
        a: 1,
        b: 2,
        c: 3
      }
      ], [
        function (node) {
          if (node.$type === "sumar") {
            return node.$operands.reduce((out, it) => {
              out += node[it];
              return out;
            }, 0);
          }
        },
        function (node) {
          if (node.$type === "restar") {
            return node.$operands.reduce((out, it) => {
              out -= node[it];
              return out;
            }, 0);
          }
        },
      ]));
    } catch (error) {
      console.log(error);
    }
  });
});

describe("JsontypedReducer API Test", function () {
  it("can reduce types as expected in test 2", async function () {
    try {
      const input = {
        data: [
          { $type: "sumar", $operands: ["a", "b", "c"], a: 1, b: 2, c: 3 },
          { $type: "restar", $operands: ["c", "b", "a"], a: 1, b: 2, c: 3 },
          { randomKey: "no debería cambiar" },
        ],
        nested: {
          another: {
            $type: "sumar",
            $operands: ["x", "y"],
            x: 10,
            y: 20,
          },
        },
      };

      const reducers = [
        function (node) {
          if (node.$type === "sumar") {
            return node.$operands.reduce((out, it) => out + (node[it] || 0), 0);
          }
        },
        function (node) {
          if (node.$type === "restar") {
            return node.$operands.reduce((out, it) => out - (node[it] || 0), 0);
          }
        },
      ];

      const result = JsontypedReducer.reduce(input, reducers);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  });
});
```

## Notes

Note: this project is **TOTALLY PROGRAMMATICALLY** independant from [jsontyped](https://github.com/allnulled/jsontyped/blob/main/jsontyped.js). However, the *bundled* version of this module ships with [jsontyped](https://github.com/allnulled/jsontyped/blob/main/jsontyped.js). Absolutely unnecesarily, you can choose a lighter version with the *unbundled* file.

Note 2: the package, by default, does not use at all [jsontyped](https://github.com/allnulled/jsontyped/blob/main/jsontyped.js), neither does the *unbundled* distribution. It is just that *bundled* comes with `jsontyped`, for me it is easier because it is only a little parser and the functionality is always from sources to distribution.

Okay. The...

La idea detrás de este paquete es poder reducir los `{ $type: algo, ... }` que es un patrón muy lógico: agrupar objetos según tipo. La idea es crear una capa de abstracción con `$type`, y descomponerla a elementos más bajos mediante esta librería/función: con recursividad y total personalización, no es una librería invasiva (excepto por el global, yo siempre voy a globals, y si quieres y necesitas, cambias la cabecera, que siempre es la misma).

Entonces: `json(with $types) + jsontyped-reducer` nos da `+1 abstraction layer`.

Esta capa de abstracción nos permite encapsular lógicas.

La idea es que ahoooora esta es la idea.

> La idea es que `jsontyped-reducer` actúe como un descompresor de la salida de `jsontyped`

```txt
jsontyped + texto        = json(width $types) = ast
jsontyped-reducer + ast  = +1 json layer
```

This is basically the idea, to pipe outputs in order to **DECOMPRESS** what a JSON can be saying.