import { c as create_ssr_component, b as each, e as escape, v as validate_component } from "../../chunks/index-1259f1f6.js";
import DecoderInput from "./DecoderInput.svelte.js";
var index_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".container.svelte-1e9k5yd{display:flex;justify-content:center}.decoder.svelte-1e9k5yd{width:85%;display:flex;flex-direction:column;min-height:100vh;align-items:center}.inputs.svelte-1e9k5yd{display:flex;flex-flow:wrap;justify-content:center}.ciphertext.svelte-1e9k5yd{width:100%;min-height:15vh;margin:1em}")();
const css = {
  code: ".container.svelte-1e9k5yd{display:flex;justify-content:center}.decoder.svelte-1e9k5yd{width:85%;display:flex;flex-direction:column;min-height:100vh;align-items:center}.inputs.svelte-1e9k5yd{display:flex;flex-flow:wrap;justify-content:center}.ciphertext.svelte-1e9k5yd{width:100%;min-height:15vh;margin:1em}",
  map: null
};
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const uniqueCharacters = (input) => {
    let stripped = input.replace(/\s+/g, "");
    return [.../* @__PURE__ */ new Set([...stripped])];
  };
  let ciphertext = "\u{1F952}\u{1F347}\n\u{1F9C4}\u{1F352}\u{1FAD2}\n\u{1FAD2}\u{1F95D}\u{1F349}\u{1F349}\u{1F95D}\u{1F965}\u{1F34A}\n\u{1F95D}\u{1F965}\n\u{1F352}\n\u{1F349}\u{1F951}\u{1F352}\u{1FAD2}\u{1F952}\n\u{1F350}\u{1F352}\u{1F965}\n\u{1F9C4}\u{1F95D}\u{1F349}\u{1F952}\n\u{1F952}\u{1F95D}\u{1F34A}\u{1F952}\n\u{1FAD2}\u{1F349}\u{1F951}\u{1F347}\u{1F347}\u{1F349}\n\u{1F350}\u{1F351}\u{1F352}\u{1FAD2}\u{1FAD2}";
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
    return current;
  };
  let decoderState;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        decoderState = newDecoderState(ciphertext);
      }
    }
    $$rendered = `<div class="${"container svelte-1e9k5yd"}"><div class="${"decoder svelte-1e9k5yd"}"><h1>Decoder</h1>
    <textarea class="${"ciphertext svelte-1e9k5yd"}" placeholder="${"ciphertext"}">${ciphertext}</textarea>

    <div class="${"inputs svelte-1e9k5yd"}">${each(decoderState, (decoder) => {
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

    <p>uniqueCharacters(ciphertext): ${escape(uniqueCharacters(ciphertext))}
      <br>
      ciphertext: ${escape(ciphertext)}
      <br>
      output: ${escape(decode(ciphertext, decoderState))}</p></div>
</div>`;
  } while (!$$settled);
  return $$rendered;
});
export { Routes as default };
