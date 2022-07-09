<script lang="ts">
  import DecoderInput from "./DecoderInput.svelte";

  const uniqueCharacters: (input: String) => String[] = (input) => {
    let stripped = input.replace(/\s+/g, "");
    return [...new Set([...stripped])];
  };

  let ciphertext: String =
    "🥒🍇\n" +
    "🧄🍒🫒\n" +
    "🫒🥝🍉🍉🥝🥥🍊\n" +
    "🥝🥥\n" +
    "🍒\n" +
    "🍉🥑🍒🫒🥒\n" +
    "🍐🍒🥥\n" +
    "🧄🥝🍉🥒\n" +
    "🥒🥝🍊🥒\n" +
    "🫒🍉🥑🍇🍇🍉\n" +
    "🍐🍑🍒🫒🫒";

  type InputState = {
    emoji: String;
    currentLetter: String;
  };

  const newDecoderState: (ciphertext: String) => InputState[] = (
    ciphertext
  ) => {
    return uniqueCharacters(ciphertext).map((emoji) => {
      return {
        emoji: emoji,
        currentLetter: "",
      };
    });
  };

  const replaceAll = (
    source: String,
    toReplace: String,
    replacement: String
  ) => {
    let current = source;
    let next = current.replace(toReplace, replacement);
    while (current != next) {
      current = next;
      next = current.replace(toReplace, replacement);
    }
    return current;
  };

  const decode = (ciphertext: String, inputs: InputState[]) => {
    let current = ciphertext;
    inputs.forEach((decoder) => {
      let replaceLetter = decoder.currentLetter;
      if (replaceLetter == "") replaceLetter = "-";
      current = replaceAll(current, decoder.emoji, replaceLetter);
    });
    return current;
  };

  let decoderState;
  $: {
    decoderState = newDecoderState(ciphertext);
    // console.log(decoderState)
    // console.log("decoding")
    // console.log(decode(ciphertext, decoderState))
  }
</script>

<div class="container">
  <div class="decoder">
    <h1>Decoder</h1>
    <textarea
      class="ciphertext"
      placeholder="ciphertext"
      bind:value={ciphertext}
    />

    <div class="inputs">
      {#each decoderState as decoder}
        <DecoderInput
          emoji={decoder.emoji}
          bind:currentLetter={decoder.currentLetter}
        />
      {/each}
    </div>

    <p>
      uniqueCharacters(ciphertext): {uniqueCharacters(ciphertext)}
      <br />
      ciphertext: {ciphertext}
      <br />
      output: {decode(ciphertext, decoderState)}
    </p>
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
  }

  .decoder {
    width: 85%;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center;
  }

  .inputs {
    display: flex;
    flex-flow: wrap;
    justify-content: center;
  }

  .ciphertext {
    width: 100%;
    min-height: 15vh;
    margin: 1em;
  }
</style>
