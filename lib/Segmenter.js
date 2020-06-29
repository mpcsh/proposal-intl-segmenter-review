import ES from "es-abstract";
import SLOT from "internal-slot";

let CanonicalizeLocaleList = Intl.getCanonicalLocales;

export class Segmenter {
  // 1.1.1
  constructor(locales) {
    // 1. If NewTarget is undefined, throw a TypeError exception.
    if (new.target === undefined) {
      throw new TypeError("1.1.1 step 1: new.target was undefined");
    }

    // 2. Let internalSlotsList be « [[InitializedSegmenter]], [[Locale]], [[SegmenterGranularity]] ».
    let internalSlotsList = [
      "InitializedSegmenter",
      "Locale",
      "SegmenterGranularity",
    ];

    // 3. Let segmenter be ? OrdinaryCreateFromConstructor(NewTarget, "%SegmenterPrototype%", internalSlotsList).
    // the ? operator is a shorthand for ReturnIfAbrupt: https://tc39.es/ecma262/#sec-returnifabrupt-shorthands
    // TODO: do I need to do anything about ReturnIfAbrupt?
    let segmenter = ES.OrdinaryCreateFromConstructor(
      new.target,
      "%SegmenterPrototype%",
      // TODO: can't supply internal slot names because es-abstract does not yet support internal slots (201*/ObjectCreate.js:21)
      // internalSlotsList,
      [],
      // TODO: create an ecma-402-abstract? where should this thing go?
      SegmenterPrototype
    );

    // 4. Let requestedLocales be ? CanonicalizeLocaleList(locales).
    let requestedLocales = CanonicalizeLocaleList(locales);
  }
}

let SegmenterPrototype = {
  constructor: Segmenter,
  // TODO: segment
  // TODO: resolvedOptions
};

Object.defineProperty(SegmenterPrototype, "@@toStringTag", {
  value: "Intl.Segmenter",
  writable: false,
  enumerable: false,
  configurable: true,
});

const s = new Segmenter("en");
