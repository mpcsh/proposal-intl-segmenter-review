import Segmenter from "../lib/Segmenter.js";

const segmenter = new Segmenter("en", { granularity: "word" });

const input = "The quick,    brown  !fox jumps over the lazy dog!";

let segments = segmenter.segment(input);

// Use that for segmentation!
for (let { segment, index, isWordLike } of segments) {
  console.log(
    "segment at code units [%d, %d): «%s»%s",
    index,
    index + segment.length,
    segment,
    isWordLike ? " (word-like)" : ""
  );
}
