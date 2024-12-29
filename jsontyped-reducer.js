(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['JsontypedReducer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['JsontypedReducer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const JsontypedReducer = class {
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

  return JsontypedReducer;

});

