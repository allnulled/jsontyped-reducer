class JsontypedReducer {
  static reduce(input, reducers) {
    return JSON.stringify(input, (key, value) => {
      if (value && typeof value === 'object' && typeof value.$type === 'string') {
        for (const reducer of reducers) {
          const result = reducer(value);
          if (result !== undefined) {
            return result;
          }
        }
      }
      return value;
    }, 2);
  }
}

// Ejemplo de uso
const main = async function () {
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
};

main();

return JsontypedReducer;