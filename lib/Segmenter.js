import assert from "assert";

import ES from "es-abstract";
import SLOT from "internal-slot";

import { GetOption } from "./402.js";
import { RequireInternalSlot } from "./262.js";
import GetIntrinsic from "es-abstract/GetIntrinsic.js";
let CanonicalizeLocaleList = Intl.getCanonicalLocales;

function ResolveLocale(
  availableLocales,
  requestedLocales,
  opt,
  relevantExtensionKeys,
  localeData
) {
  let r = {};
  SLOT.set(r, "[[locale]]", requestedLocales[0]);
  return r;
}

function SupportedLocales(availableLocales, requestedLocales, options) {
  return requestedLocales;
}

// 1.1.1
function Segmenter(locales, options) {
  // 1. If NewTarget is undefined, throw a TypeError exception.
  if (new.target === undefined) {
    throw new TypeError("1.1.1 step 1: new.target was undefined");
  }

  // 2. Let internalSlotsList be « [[InitializedSegmenter]], [[Locale]], [[SegmenterGranularity]] ».
  let internalSlotsList = [
    "[[InitializedSegmenter]]",
    "[[Locale]]",
    "[[SegmenterGranularity]]",
  ];

  // 3. Let segmenter be ? OrdinaryCreateFromConstructor(NewTarget, "%SegmenterPrototype%", internalSlotsList).
  let segmenter = ES.OrdinaryCreateFromConstructor(
    new.target,
    "%SegmenterPrototype%",
    // TODO: can't supply internal slot names because es-abstract does not yet support internal slots (201*/ObjectCreate.js:21)
    // internalSlotsList,
    [],
    SegmenterPrototype
  );

  // 4. Let requestedLocales be ? CanonicalizeLocaleList(locales).
  let requestedLocales = CanonicalizeLocaleList(locales);

  // 5. If options is undefined, then
  if (options === undefined) {
    // a. Let options be ObjectCreate(null).
    options = ES.ObjectCreate(null);
  }

  // 6. Else
  else {
    // a. Let options be ? ToObject(options).
    options = ES.ToObject(options);
  }

  // 7. Let opt be a new Record.
  let opt = {};

  // 8. Let matcher be ? GetOption(options, "localeMatcher", "string", « "lookup", "best fit" », "best fit").
  let matcher = GetOption(
    options,
    "localeMatcher",
    "string",
    ["lookup", "best fit"],
    "best fit"
  );

  // 9. Set opt.[[localeMatcher]] to matcher.
  SLOT.set(opt, "[[localeMatcher]]", matcher);

  // 10. Let localeData be %Segmenter%.[[LocaleData]].
  let localeData = SLOT.get(Segmenter, "[[LocaleData]]");

  // 11. Let r be ResolveLocale(%Segmenter%.[[AvailableLocales]], requestedLocales, opt, %Segmenter%.[[RelevantExtensionKeys]], localeData).
  let r = ResolveLocale(
    SLOT.get(Segmenter, "[[AvailableLocales]]"),
    requestedLocales,
    opt,
    SLOT.get(Segmenter, "[[RelevantExtensionKeys]]"),
    localeData
  );

  // 12. Set segmenter.[[Locale]] to the value of r.[[locale]].
  SLOT.set(segmenter, "[[Locale]]", SLOT.get(r, "[[locale]]"));

  // 13. Let granularity be ? GetOption(options, "granularity", "string", « "grapheme", "word", "sentence" », "grapheme").
  let granularity = GetOption(
    options,
    "granularity",
    "string",
    ["grapheme", "word", "sentence"],
    "grapheme"
  );

  // 14. Set segmenter.[[SegmenterGranularity]] to granularity.
  SLOT.set(segmenter, "[[SegmenterGranularity]]", granularity);

  // 15. Return segmenter.
  return segmenter;
}

// 1.3
let SegmenterPrototype = {};

// 1.3.1
Object.defineProperty(SegmenterPrototype, "constructor", { value: Segmenter });

// 1.3.2
Object.defineProperty(SegmenterPrototype, "@@toStringTag", {
  value: "Intl.Segmenter",
  "[[Writable]]": false,
  "[[Enumerable]]": false,
  "[[Configurable]]": true,
});

// 1.3.3
Object.defineProperty(SegmenterPrototype, "segment", {
  value: function (string) {
    // 1. Let segmenter be the this value.
    let segmenter = this;

    // 2. Perform ? RequireInternalSlot(segmenter, [[InitializedSegmenter]]).
    RequireInternalSlot(segmenter, "[[InitializedSegmenter]]");

    // 3. Let string be ? ToString(string).
    string = ES.ToString(string);

    // 4. Return ! CreateSegmentsObject(segmenter, string).
    return CreateSegmentsObject(segmenter, string);
  },
});

// 1.3.4
// TODO: resolvedOptions

// 1.2.1
Object.defineProperty(Segmenter, "prototype", {
  value: SegmenterPrototype,
  "[[Writable]]": false,
  "[[Enumerable]]": false,
  "[[Configurable]]": false,
});

// 1.2.2
Object.defineProperty(Segmenter, "supportedLocalesOf", {
  value: function (locales, options) {
    // 1. Let availableLocales be %Segmenter%.[[AvailableLocales]].
    let availableLocales = SLOT.get(Segmenter, "[[AvailableLocales]]");

    // 2. Let requestedLocales be ? CanonicalizeLocaleList(locales).
    let requestedLocales = CanonicalizeLocaleList(locales);

    // 3. Return ? SupportedLocales(availableLocales, requestedLocales, options).
    return SupportedLocales(availableLocales, requestedLocales, options);
  },
});

// The value of the length property of the supportedLocalesOf method is 1.
Object.defineProperty(Segmenter.supportedLocalesOf, "length", { value: 1 });

// 1.2.3
SLOT.set(Segmenter, "[[AvailableLocales]]", ["en"]);
SLOT.set(Segmenter, "[[LocaleData]]", { en: {} });
SLOT.set(Segmenter, "[[RelevantExtensionKeys]]", []);

// 1.5.1
function CreateSegmentsObject(segmenter, string) {
  // 1. Let internalSlotsList be « [[SegmentsSegmenter]], [[SegmentsString]] ».
  let internalSlotsList = ["[[SegmentsSegmenter]]", "[[SegmentsString]]"];

  // 2. Let segments be ! ObjectCreate(%SegmentsPrototype%, internalSlotsList).
  // TODO: can't supply internal slot names because es-abstract does not yet support internal slots (201*/ObjectCreate.js:21)
  let segments = ES.ObjectCreate(SegmentsPrototype, []);

  // 3. Set segments.[[SegmentsSegmenter]] to segmenter.
  SLOT.set(segments, "[[SegmentsSegmenter]]", segmenter);

  // 4. Set segments.[[SegmentsString]] to string.
  SLOT.set(segments, "[[SegmentsString]]", string);

  // 5. Return segments.
  return segments;
}

// 1.5.2
let SegmentsPrototype = {};

// 1.5.2.1
Object.defineProperty(SegmentsPrototype, "containing", {
  value: function (index) {
    // 1. Let segments be this value.
    let segments = this;

    // 2. Perform ? RequireInternalSlot(segments, [[SegmentsSegmenter]]).
    // TODO: es-abstract does not yet support internal slots
    RequireInternalSlot(segments, "[[SegmentsSegmenter]]");

    // 3. Let segmenter be segments.[[SegmentsSegmenter]].
    let segmenter = SLOT.get(segments, "[[SegmentsSegmenter]]");

    // 4. Let string be segments.[[SegmentsString]].
    let string = SLOT.get(segments, "[[SegmentsString]]");

    // 5. Let len be the length of string.
    let len = string.length;

    // 6. Let n be ? ToInteger(index).
    let n = ES.ToInteger(index);

    // 7. If n < 0 or n ≥ len, return undefined.
    if (n < 0 || n >= len) {
      return undefined;
    }

    // 8. Let startIndex be ! FindBoundary(segmenter, string, n, before).
    let startIndex = FindBoundary(segmenter, string, n, "before");

    // 9. Let endIndex be ! FindBoundary(segmenter, string, n, after).
    let endIndex = FindBoundary(segmenter, string, n, "after");

    // 10. Return ! CreateSegmentDataObject(segmenter, string, startIndex, endIndex).
    return CreateSegmentDataObject(segmenter, string, startIndex, endIndex);
  },
});

// 1.5.2.2
// TODO: is this even remotely correct?
Object.defineProperty(SegmentsPrototype, "string", {
  value: {
    // TODO: should this be set as an internal slot rather than an ordinary object attribute?
    "[[Get]]": function () {
      // 1. Let segments be this value.
      let segments = this;

      // 2. Perform ? RequireInternalSlot(segments, [[SegmentsSegmenter]]).
      RequireInternalSlot(segments, "[[SegmentsSegmenter]]");

      // 3. Return segments.[[SegmentsString]].
      return SLOT.get(segments, "[[SegmentsString]]");
    },
  },
});

// 1.5.2.3
Object.defineProperty(SegmentsPrototype, "@@iterator", {
  value: function () {
    // 1. Let segments be this value.
    let segments = this;

    // 2. Perform ? RequireInternalSlot(segments, [[SegmentsSegmenter]]).
    RequireInternalSlot(segments, "[[SegmentsSegmenter]]");

    // 3. Let segmenter be segments.[[SegmentsSegmenter]].
    let segmenter = SLOT.get(segments, "[[SegmentsSegmenter]]");

    // 4. Let string be segments.[[SegmentsString]].
    let string = SLOT.get(segments, "[[SegmentsString]]");

    // 5. Return ! CreateSegmentIterator(segmenter, string).
    return CreateSegmentIterator(segmenter, string);
  },
});

// 1.6.1
function CreateSegmentIterator(segmenter, string) {
  // 1. Let internalSlotsList be « [[IteratingSegmenter]], [[IteratedString]], [[IteratedStringNextSegmentCodeUnitIndex]] ».
  let internalSlotsList = [
    "[[IteratingSegmenter]]",
    "[[IteratedString]]",
    "[[IteratedStringNextSegmentCodeUnitIndex]]",
  ];

  // 2. Set iterator to ObjectCreate(%SegmentIteratorPrototype%, internalSlotsList).
  // TODO: can't supply internal slot names because es-abstract does not yet support internal slots (201*/ObjectCreate.js:21)
  let iterator = ES.ObjectCreate(SegmentIteratorPrototype, []);

  // 3. Set iterator.[[IteratingSegmenter]] to segmenter.
  SLOT.set(iterator, "[[IteratingSegmenter]]", segmenter);

  // 4. Set iterator.[[IteratedString]] to string.
  SLOT.set(iterator, "[[IteratedString]]", string);

  // 5. Set iterator.[[IteratedStringNextSegmentCodeUnitIndex]] to 0.
  SLOT.set(iterator, "[[IteratedStringNextSegmentCodeUnitIndex]]", 0);

  // 6. Return iterator.
  return iterator;
}

// 1.6.2
let SegmentIteratorPrototype = {};
// TODO: should this use the dotted intrinsic form?
SLOT.set(
  SegmentIteratorPrototype,
  "[[Prototype]]",
  GetIntrinsic("%IteratorPrototype%")
);

// 1.6.2.1
Object.defineProperty(SegmentIteratorPrototype, "next", {
  value: function () {
    // 1. Let iterator be this value.
    let iterator = this;

    // 2. Perform ? RequireInternalSlot(iterator, [[IteratingSegmenter]]).
    RequireInternalSlot(iterator, "[[IteratingSegmenter]]");

    // 3. Let segmenter be iterator.[[IteratingSegmenter]].
    let segmenter = SLOT.get(iterator, "[[IteratingSegmenter]]");

    // 4. Let string be iterator.[[IteratedString]].
    let string = SLOT.get(iterator, "[[IteratedString]]");

    // 5. Let startIndex be iterator.[[IteratedStringNextSegmentCodeUnitIndex]].
    let startIndex = SLOT.get(
      iterator,
      "[[IteratedStringNextSegmentCodeUnitIndex]]"
    );

    // 6. Let endIndex be ! FindBoundary(segmenter, string, startIndex, after).
    let endIndex = FindBoundary(segmenter, string, startIndex, after);

    // 7. If endIndex is not finite, then
    if (endIndex === +Infinity) {
      // a. Return ! CreateIterResultObject(undefined, true).
      return ES.CreateIterResultObject(undefined, true);
    }

    // 8. Set iterator.[[IteratedStringNextSegmentCodeUnitIndex]] to endIndex.
    SLOT.set(iterator, "[[IteratedStringNextSegmentCodeUnitIndex]]", endIndex);

    // 9. Let segmentData be ! CreateSegmentDataObject(segmenter, string, startIndex, endIndex).
    let segmentData = CreateSegmentDataObject(
      segmenter,
      string,
      startIndex,
      endIndex
    );

    // 10. Return ! CreateIterResultObject(segmentData, false).
    return ES.CreateIterResultObject(segmentData, false);
  },
});

// 1.6.2.2
Object.defineProperty(SegmentIteratorPrototype, "@@toStringTag", {
  value: "Segmenter String Iterator",
  "[[Writable]]": false,
  "[[Enumerable]]": false,
  "[[Configurable]]": true,
});

// 1.7.1
function CreateSegmentDataObject(segmenter, string, startIndex, endIndex) {
  // 1. Let len be the length of string.
  let len = string.length;

  // 2. Assert: startIndex ≥ 0.
  assert(startIndex >= 0);

  // 3. Assert: endIndex ≤ len.
  assert(endIndex <= len);

  // 4. Assert: startIndex < endIndex.
  assert(startIndex < endIndex);

  // 5. Let result be ! ObjectCreate(%ObjectPrototype%).
  // TODO: is this right?
  // TODO: should the spec text prefer "Object.prototype"? https://github.com/ljharb/es-abstract/blob/master/GetIntrinsic.js#L149
  let result = ES.ObjectCreate(GetIntrinsic("%ObjectPrototype%"));

  // 6. Let segment be the String value equal to the substring of string consisting of the code units at indices startIndex (inclusive) through endIndex (exclusive).
  let segment = string.slice(startIndex, endIndex);

  // 7. Perform ! CreateDataPropertyOrThrow(result, "segment", segment).
  ES.CreateDataPropertyOrThrow(result, "segment", segment);

  // 8. Perform ! CreateDataPropertyOrThrow(result, "index", startIndex).
  ES.CreateDataPropertyOrThrow(result, "index", startIndex);

  // 9. Let granularity be segmenter.[[SegmenterGranularity]].
  let granularity = SLOT.get("[[SegmenterGranularity]]");

  // 10. If granularity is "word", then
  let isWordLike;
  if (granularity === "word") {
    // a. Let isWordLike be a Boolean value indicating whether the segment in string is "word-like" according to locale segmenter.[[Locale]].
    isWordLike = true;
  }
  // 11. Else
  else {
    // a. Let isWordLike be undefined.
    isWordLike = undefined;
  }

  // 12. Perform ! CreateDataPropertyOrThrow(result, "isWordLike", isWordLike).
  CreateDataPropertyOrThrow(result, "isWordLike", isWordLike);

  // 13. Return result.
  return result;
}

// 1.8.1
function FindBoundary(segmenter, string, startIndex, direction) {
  // 1. Let locale be segmenter.[[Locale]].
  let locale = SLOT.get(segmenter, "[[Locale]]");

  // 2. Let granularity be segmenter.[[SegmenterGranularity]].
  let granularity = SLOT.get(segmenter, "[[SegmenterGranularity]]");

  // 3. Let len be the length of string.
  let len = string.length;

  const wordBoundaryRegex = /[^\p{Alphabetic}]/u;
  const sentenceBoundaryRegex = /\p{Sentence_Terminal}/u;

  // 4. If direction is before, then
  // TODO: should direction be a string?
  if (direction === "before") {
    // a. Assert: len > 0.
    assert(len > 0);

    // b. Assert: startIndex ≥ 0.
    assert(startIndex >= 0);

    // c. Search string for the last segmentation boundary that is preceded by at most startIndex code units from the beginning, using locale locale and text element granularity granularity.
    if (granularity === "grapheme") {
      return startIndex;
    } else {
      let boundaryRegex;
      if (granularity === "word") {
        boundaryRegex = wordBoundaryRegex;
      } else {
        assert(granularity === "sentence");
        boundaryRegex = sentenceBoundaryRegex;
      }

      for (let i = startIndex; i >= 0; i--) {
        let c = string[i];
        if (boundaryRegex.test(c)) {
          return i;
        }
      }
    }

    // d. If a boundary is found, return the count of code units in string preceding it. Otherwise, return 0.
    return len;
  }

  // 5. Else
  else {
    // a. Assert: direction is after.
    // TODO: should direction be a string?
    assert(direction === "after");

    // b. If len is 0 or startIndex ≥ len, return +∞.
    if (len === 0 || startIndex >= len) {
      return +Infinity;
    }

    // c. Search string for the first segmentation boundary that follows the code unit at index startIndex, using locale locale and text element granularity granularity.
    if (granularity === "grapheme") {
      return startIndex + 1;
    } else {
      let boundaryRegex;
      if (granularity === "word") {
        boundaryRegex = wordBoundaryRegex;
      } else {
        assert(granularity === "sentence");
        boundaryRegex = sentenceBoundaryRegex;
      }

      for (let i = startIndex; i < len; i++) {
        let c = string[i];
        if (boundaryRegex.test(c)) {
          return i;
        }
      }
    }

    // d. If a boundary is found, return the count of code units in string preceding it. Otherwise, return len.
    return len;
  }
}

const segmenter = new Segmenter("en", { granularity: "word" });

const string = "The quick brown fox jumps over the lazy dog";

console.log(FindBoundary(segmenter, string, 0, "after"));
console.log(FindBoundary(segmenter, string, 10, "before"));
