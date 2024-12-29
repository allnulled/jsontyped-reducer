# jsontyped-reducer

Reduces recusively JSON objects with $type property with customizable reducers. Uses JSON.stringify.

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