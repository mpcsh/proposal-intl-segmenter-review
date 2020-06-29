import ES from "es-abstract";
import SLOT from "internal-slot";

// https://tc39.es/ecma402/#sec-isstructurallyvalidlanguagetag
export default function IsStructurallyValidLanguageTag(tag) {
  // The IsStructurallyValidLanguageTag abstract operation verifies that the locale argument (which must be a String value)
  //   - represents a well-formed "Unicode BCP 47 locale identifier" as specified in Unicode Technical Standard 35 section 3.2,
  //   - does not include duplicate variant subtags, and
  //   - does not include duplicate singleton subtags.
  // The abstract operation returns true if locale can be generated from the EBNF grammar in section 3.2 of the Unicode Technical Standard 35, starting with unicode_locale_id, and does not contain duplicate variant or singleton subtags (other than as a private use subtag). It returns false otherwise.  Terminal value characters in the grammar are interpreted as the Unicode equivalents of the ASCII octet values given.

  // we will cheat here and use node's built-in Intl.Locale constructor
  try {
    new Intl.Locale(tag);
  } catch {
    return false;
  }
  return true;
}
