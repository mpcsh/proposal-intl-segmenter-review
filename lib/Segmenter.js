import ES from "es-abstract";
let CanonicalizeLocaleList = Intl.getCanonicalLocales;
import GetOption from "./GetOption.js";
import SLOT from "internal-slot";

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

// 1.1.1
function Segmenter(locales) {
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

  let options;
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

// 1.2.3
SLOT.set(Segmenter, "[[AvailableLocales]]", ["th"]);
SLOT.set(Segmenter, "[[LocaleData]]", {
  th: { ca: ["buddhist", "gregory", "chinese", "islamicc"] },
});
SLOT.set(Segmenter, "[[RelevantExtensionKeys]]", ["ca"]);

// 1.3
let SegmenterPrototype = {
  // 1.3.1
  constructor: Segmenter,
  // 1.3.3
  // TODO: segment
  // 1.3.4
  // TODO: resolvedOptions
};

// 1.3.2
Object.defineProperty(SegmenterPrototype, "@@toStringTag", {
  value: "Intl.Segmenter",
  writable: false,
  enumerable: false,
  configurable: true,
});

const s = new Segmenter("en");
