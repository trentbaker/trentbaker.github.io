import { c as create_ssr_component, e as escape, a as add_attribute } from "../../chunks/index-1259f1f6.js";
var DecoderInput_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".label.svelte-181c3y5{margin:0.2em}input.svelte-181c3y5{width:1em;font-size:100%}.decoderInput.svelte-181c3y5{display:flex;justify-content:space-between;font-size:200%;border:0.15vh cadetblue solid;margin:0.2em;padding:0.2em}")();
const css = {
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
  $$result.css.add(css);
  return `<div class="${"decoderInput svelte-181c3y5"}"><div class="${"label svelte-181c3y5"}">${escape(emoji)}</div> <input maxlength="${"1"}" class="${"svelte-181c3y5"}"${add_attribute("value", currentLetter, 0)}>
</div>`;
});
export { DecoderInput as default };
