import ES from "es-abstract";
import SLOT from "internal-slot";

import IsStructurallyValidLanguageTag from "./IsStructurallyValidLanguageTag.js";

// https://tc39.es/ecma402/#sec-canonicalizelocalelist
export default function CanonicalizeLocaleList(locales) {
  // 1. If locales is undefined, then
  if (locales === undefined) {
    // a. Return a new empty List.
    return [];
  }

  // 2. Let seen be a new empty List.
  let seen = [];

  // 3. If Type(locales) is String or Type(locales) is Object and locales has an [[InitializedLocale]] internal slot, then
  let O;
  if (
    ES.Type(locales) === "String" ||
    (ES.Type(locales) === "Object" && SLOT.has(locales, "InitializedLocale"))
  ) {
    // a. Let O be CreateArrayFromList(« locales »).
    O = [locales];
  }

  // 4. Else,
  else {
    // Let O be ? ToObject(locales).
    O = ES.ToObject(locales);
  }

  // 5. Let len be ? ToLength(? Get(O, "length")).
  let len = ES.ToLength(ES.Get(O, "length"));

  // 6. Let k be 0.
  let k = 0;

  // 7. Repeat, while k < len
  while (k < len) {
    // a. Let Pk be ToString(k).
    let Pk = ES.ToString(k);
    // b. Let kPresent be ? HasProperty(O, Pk).
    let kPresent = ES.HasProperty(O, Pk);
    // c. If kPresent is true, then
    if (kPresent) {
      // i. Let kValue be ? Get(O, Pk).
      let kValue = ES.Get(O, Pk);
      // ii. If Type(kValue) is not String or Object, throw a TypeError exception.
      if (ES.Type(kValue) !== "String" && ES.Type(kValue) !== "Object") {
        throw new TypeError(
          "9.2.1 step 7.c.ii: Type(kValue) was neither String nor Object"
        );
      }
      // iii. If Type(kValue) is Object and kValue has an [[InitializedLocale]] internal slot, then
      let tag;
      if (
        ES.Type(kValue) === "Object" &&
        SLOT.has(kValue, "InitializedLocale")
      ) {
        // 1. Let tag be kValue.[[Locale]].
        // TODO: is this an internal slot get?
        tag = SLOT.get(kValue, "Locale");
      }
      // iv. Else,
      else {
        // 1. Let tag be ? ToString(kValue).
        tag = ES.ToString(kValue);
      }
      // v. If IsStructurallyValidLanguageTag(tag) is false, throw a RangeError exception.
      if (!IsStructurallyValidLanguageTag(tag)) {
        throw new RangeError(
          "9.2.1 step 7.c.v: IsStructurallyValidLanguageTag(tag) was false"
        );
      }
      // vi. Let canonicalizedTag be CanonicalizeUnicodeLocaleId(tag).
      // TODO: implement CanonicalizeUnicodeLocaleId
      let canonicalizedTag = CanonicalizeUnicodeLocaleId(tag);

      // vii. If canonicalizedTag is not an element of seen, append canonicalizedTag as the last element of seen.
      if (!seen.includes(canonicalizedTag)) {
        seen.push(canonicalizedTag);
      }
    }
    // d. Increase k by 1.
    k += 1;
  }
  // 8. Return seen.
  return seen;
}
