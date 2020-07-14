import ES from "es-abstract";
import SLOT from "internal-slot";

// https://tc39.es/ecma262/#sec-requireinternalslot
export function RequireInternalSlot(O, internalSlot) {
  // 1. If Type(O) is not Object, throw a TypeError exception.
  if (ES.Type(O) !== "Object") {
    throw new TypeError(
      `262, 9.1.15, step 1: Type(O) was ${ES.Type(O)}, not Object`
    );
  }

  // 2. If O does not have an internalSlot internal slot, throw a TypeError exception.
  if (!SLOT.has(O, internalSlot)) {
    throw new TypeError(
      `262, 9.1.15, step 2: O did not have an internal slot named ${internalSlot}`
    );
  }
}
