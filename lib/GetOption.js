import ES from "es-abstract";
import assert from "assert";

// https://tc39.es/ecma402/#sec-getoption
export default function GetOption(options, property, type, values, fallback) {
  // 1. Assert: Type(options) is Object.
  assert.strictEqual(ES.Type(options), "Object");

  // 2. Let value be ? Get(options, property).
  let value = ES.Get(options, property);

  // 3. If value is not undefined, then
  if (value !== undefined) {
    // a. Assert: type is "boolean" or "string".
    assert(type === "boolean" || type === "string");

    // b. If type is "boolean", then
    if (type === "boolean") {
      // i. Let value be ToBoolean(value).
      value = ES.ToBoolean(value);
    }

    // c. If type is "string", then
    else if (type === "string") {
      // i. Let value be ? ToString(value).
      value = ES.ToString(value);
    }

    // d. If values is not undefined, then
    if (values !== undefined) {
      // i. If values does not contain an element equal to value, throw a RangeError exception.
      if (!values.includes(value)) {
        throw new RangeError(
          "3.d.i: values did not contain an element equal to value"
        );
      }
    }

    // e. Return value.
    return value;
  }

  // 4. Else, return fallback.
  else {
    return fallback;
  }
}
