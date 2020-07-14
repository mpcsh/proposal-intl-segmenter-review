import ES from "es-abstract";
import assert from "assert";

// https://tc39.es/ecma402/#sec-getoption
export function GetOption(options, property, type, values, fallback) {
  // 1. Assert: Type(options) is Object.
  assert(ES.Type(options) === "Object");

  // 2. Let value be ? Get(options, property).
  let value = ES.Get(options, property);

  // 3. If value is undefined, return fallback.
  if (value === undefined) {
    return fallback;
  }

  // 4. Assert: type is "boolean" or "string".
  assert(type === "boolean" || type === "string");

  // 5. If type is "boolean", then
  if (type === "boolean") {
    // a. Let value be ToBoolean(value).
    value = ES.ToBoolean(value);
  }

  // 6. If type is "string", then
  else if (type === "string") {
    // a. Let value be ? ToString(value).
    value = ES.ToString(value);
  }

  // 7. If values is not undefined, and does not contain an element equal to value, throw a RangeError exception.
  if (values !== undefined && !values.includes(value)) {
    throw new RangeError(
      "402, 9.2.11, step 7: values did not contain an element equal to value"
    );
  }

  // 8. Return value.
  return value;
}
