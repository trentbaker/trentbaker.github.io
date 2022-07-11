import { c as create_ssr_component, e as escape, a as add_attribute, b as each, v as validate_component } from "../../chunks/index-1259f1f6.js";
var DecoderInput_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".label.svelte-181c3y5{margin:0.2em}input.svelte-181c3y5{width:1em;font-size:100%}.decoderInput.svelte-181c3y5{display:flex;justify-content:space-between;font-size:200%;border:0.15vh cadetblue solid;margin:0.2em;padding:0.2em}")();
const css$1 = {
  code: ".label.svelte-181c3y5{margin:0.2em}input.svelte-181c3y5{width:1em;font-size:100%}.decoderInput.svelte-181c3y5{display:flex;justify-content:space-between;font-size:200%;border:0.15vh cadetblue solid;margin:0.2em;padding:0.2em}",
  map: null
};
const DecoderInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { emoji = "\u{1F351}" } = $$props;
  let { currentLetter = "-" } = $$props;
  if ($$props.emoji === void 0 && $$bindings.emoji && emoji !== void 0)
    $$bindings.emoji(emoji);
  if ($$props.currentLetter === void 0 && $$bindings.currentLetter && currentLetter !== void 0)
    $$bindings.currentLetter(currentLetter);
  $$result.css.add(css$1);
  return `<div class="${"decoderInput svelte-181c3y5"}"><div class="${"label svelte-181c3y5"}">${escape(emoji)}</div> <input maxlength="${"1"}" class="${"svelte-181c3y5"}"${add_attribute("value", currentLetter, 0)}>
</div>`;
});
var index_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".container.svelte-1xyg9ub{display:flex;justify-content:center}.decoder.svelte-1xyg9ub{display:flex;flex-direction:column;min-height:100vh;align-items:center;width:85%}.inputs.svelte-1xyg9ub{display:flex;flex-flow:wrap;justify-content:center}.ciphertext.svelte-1xyg9ub{width:100%;min-height:15vh;margin:1em;font-size:2em}.decoded.svelte-1xyg9ub{word-break:keep-all}.output.svelte-1xyg9ub{width:100%;font-size:2em;word-spacing:1em;white-space:pre-wrap;word-break:break-word}")();
const css = {
  code: ".container.svelte-1xyg9ub{display:flex;justify-content:center}.decoder.svelte-1xyg9ub{display:flex;flex-direction:column;min-height:100vh;align-items:center;width:85%}.inputs.svelte-1xyg9ub{display:flex;flex-flow:wrap;justify-content:center}.ciphertext.svelte-1xyg9ub{width:100%;min-height:15vh;margin:1em;font-size:2em}.decoded.svelte-1xyg9ub{word-break:keep-all}.output.svelte-1xyg9ub{width:100%;font-size:2em;word-spacing:1em;white-space:pre-wrap;word-break:break-word}",
  map: null
};
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let occurrences;
  let oneLetterWords;
  let twoLetterWords;
  let threeLetterWords;
  let words;
  let digraphs;
  let repeatingDigraphs;
  let decoderState;
  let decoded;
  const uniqueCharacters = (input) => {
    let stripped = input.replace(/\s+/g, "");
    return [.../* @__PURE__ */ new Set([...stripped])];
  };
  let ciphertext = "";
  const newDecoderState = (ciphertext2) => {
    return uniqueCharacters(ciphertext2).map((emoji) => {
      return { emoji, currentLetter: "" };
    });
  };
  const replaceAll = (source, toReplace, replacement) => {
    let current = source;
    let next = current.replace(toReplace, replacement);
    while (current != next) {
      current = next;
      next = current.replace(toReplace, replacement);
    }
    return current;
  };
  const decode = (ciphertext2, inputs) => {
    let current = ciphertext2;
    inputs.forEach((decoder) => {
      let replaceLetter = decoder.currentLetter;
      if (replaceLetter == "")
        replaceLetter = decoder.emoji;
      current = replaceAll(current, decoder.emoji, replaceLetter);
    });
    current = current.replace(/\s+/g, "\n");
    return current;
  };
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    occurrences = Object.entries([...ciphertext.replace(/\s+/g, "")].reduce((occurrences2, item) => {
      occurrences2[item] = (occurrences2[item] || 0) + 1;
      return occurrences2;
    }, {})).sort((a, b) => {
      return b[1] - a[1];
    }).map((item) => item.join(":")).join("		");
    oneLetterWords = [
      ...new Set(ciphertext.split(/\s+/g).filter((word) => {
        return [...word].length == 1;
      }))
    ].join("	");
    twoLetterWords = [
      ...new Set(ciphertext.split(/\s+/g).filter((word) => {
        return [...word].length == 2;
      }))
    ].join("	");
    threeLetterWords = [
      ...new Set(ciphertext.split(/\s+/g).filter((word) => {
        return [...word].length == 3;
      }))
    ].join("	");
    words = ciphertext.split(/\s+/g);
    digraphs = words.flatMap((word) => {
      const chars = [...word.replace(/\s+/g, "")];
      let out = [];
      for (let i = 0; i < word.length; i++) {
        const a = chars[i];
        const b = chars[i + 1] || false;
        if (a && b) {
          out.push([a, b]);
        }
      }
      return out;
    });
    repeatingDigraphs = [
      ...new Set(digraphs.filter((digraph) => {
        return digraph[0] == digraph[1];
      }).map((item) => item.join("")))
    ].join("	");
    decoderState = newDecoderState(ciphertext);
    decoded = decode(ciphertext, decoderState);
    $$rendered = `<div class="${"container svelte-1xyg9ub"}"><div class="${"decoder svelte-1xyg9ub"}"><h1>Emoji Decoder</h1>
        <textarea class="${"ciphertext svelte-1xyg9ub"}" placeholder="${"ciphertext"}">${""}</textarea>

        <div class="${"inputs svelte-1xyg9ub"}">${each(decoderState, (decoder) => {
      return `${validate_component(DecoderInput, "DecoderInput").$$render($$result, {
        emoji: decoder.emoji,
        currentLetter: decoder.currentLetter
      }, {
        currentLetter: ($$value) => {
          decoder.currentLetter = $$value;
          $$settled = false;
        }
      }, {})}`;
    })}</div>


        <div class="${"output svelte-1xyg9ub"}"><hr>
            <div class="${"decoded svelte-1xyg9ub"}">${escape(decoded)}</div>
            <hr>
            <div>occurrences: ${escape(occurrences)}</div>
            <div>oneLetterWords: ${escape(oneLetterWords)}</div>
            <div>twoLetterWords: ${escape(twoLetterWords)}</div>
            <div>threeLetterWords: ${escape(threeLetterWords)}</div>
            <div>repeatingDigraphs: ${escape(repeatingDigraphs)}</div></div></div>
</div>`;
  } while (!$$settled);
  return $$rendered;
});
export { Routes as default };
