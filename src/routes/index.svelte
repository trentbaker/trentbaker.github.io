<script lang="ts">
    import DecoderInput from "../components/DecoderInput.svelte";

    const uniqueCharacters: (input: String) => String[] = (input) => {
        let stripped = input.replace(/\s+/g, "");
        return [...new Set([...stripped])];
    };

    let ciphertext: String = "🥑\n" +
        "🍈🧅🍎\n" +
        "🫐🍓🍓🍒🍊🍉🍒🍉\n" +
        "🥬🥝\n" +
        "🌽🍑🍒\n" +
        "🍎🥒🥔🥔🍒🍎🌽🥑🫐🍊\n" +
        "🌽🍑🧅🌽\n" +
        "🥥🥝\n" +
        "🥬🧅🥬🥝\n" +
        "🥬🥦🫐🌽🍑🍒🥦\n" +
        "🍈🧅🍎\n" +
        "🧅\n" +
        "🍅🍒🍈🍒🫒\n" +
        "🌽🍑🥑🍒🍓"

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
            if (replaceLetter == "") replaceLetter = decoder.emoji;
            current = replaceAll(current, decoder.emoji, replaceLetter);
        });
        current = current.replace(/\s+/g, "\n")
        return current;
    };

    $: occurrences = Object.entries([...ciphertext.replace(/\s+/g, "")].reduce((occurrences, item) => {
        occurrences[item] = (occurrences[item] || 0) + 1;
        return occurrences;
    }, {})).sort((a, b) => { return b[1] - a[1] }).map((item) => item.join(":")).join("\t\t")

    $: oneLetterWords = [... new Set(ciphertext.split(/\s+/g).filter((word) => {
        return [...word].length == 1
    }))].join("\t")
    $: twoLetterWords = [... new Set(ciphertext.split(/\s+/g).filter((word) => {
        return [...word].length == 2
    }))].join("\t")
    $: threeLetterWords = [... new Set(ciphertext.split(/\s+/g).filter((word) => {
        return [...word].length == 3
    }))].join("\t")

    $: words = ciphertext.split(/\s+/g)
    $: digraphs = words.flatMap((word) => {
        const chars = [...word.replace(/\s+/g, "")]
        let out = []
        for (let i = 0; i < word.length; i++) {
            const a = chars[i]
            const b = chars[i + 1] || false

            if (a && b) {
                out.push([a, b])
            }
        }
        return out
    })

    $: repeatingDigraphs = [...new Set(digraphs.filter((digraph) => {
        return digraph[0] == digraph[1]
    }).map((item) => item.join("")))].join("\t")

    $: decoderState = newDecoderState(ciphertext);
    $: decoded = decode(ciphertext, decoderState);
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


        <div class="output">
            <hr>
            <div class="decoded">{decoded}</div>
            <hr>
            <div>occurrences: {occurrences}</div>
            <div>oneLetterWords: {oneLetterWords}</div>
            <div>twoLetterWords: {twoLetterWords}</div>
            <div>threeLetterWords: {threeLetterWords}</div>
            <div>repeatingDigraphs: {repeatingDigraphs}</div>
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
    }

    .decoder {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        align-items: center;
        width: 85%;

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
        font-size: 2em;
    }

    .decoded {
       word-break: keep-all;
    }

    .output {
        width: 100%;
        font-size: 2em;
        word-spacing: 1em;
        white-space: pre-wrap;
        word-break: break-word;
    }
</style>
