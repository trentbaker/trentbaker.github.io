<script lang="ts">
    import DecoderInput from "../components/DecoderInput.svelte";
    import DecoderStatistic from "../components/DecoderStatistic.svelte";

    const uniqueCharacters = (input) => {
        let stripped = input.replace(/\s+/g, "");
        return [...new Set([...stripped])];
    };

    let ciphertext: String = "🍑 🥕🫒🥑🥥 🍒🌽🍑🍌🍌🥥🧄 🍌🥕🍑🍓 🍓🥥🧄🍌🥥🧄🍋🥥 🍑🧄 🫒 🍋🍍🥦🥥 🍎🫒🥦🥥 🍅🥔 🍍🍇 🥥🍎🍍🍏🍑🍓 🍌🍍 🥕🍑🥦🥥 🍌🥕🥥 🍑🧄🍇🍍🌽🍎🫒🍌🍑🍍🧄 🍇🌽🍍🍎 🍌🥕🍍🍓🥥 🧄🍍🍌 🍒🍑🥬🥬🍑🧄🥒 🍌🍍 🥦🥥🍋🍍🥦🥥 🍑🍌"

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

    const decode = (ciphertext: String, inputs: InputState[]) => {
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

        let current = ciphertext;
        inputs.forEach((decoder) => {
            let replaceLetter = decoder.currentLetter;
            if (replaceLetter == "") replaceLetter = decoder.emoji;
            current = replaceAll(current, decoder.emoji, replaceLetter);
        });
        current = current.replace(/\s+/g, "\n")
        return current;
    };

    const countOccurrencesOfEach = (input: String) => Object.entries([...input.replace(/\s+/g, "")].reduce((occurrences, item) => {
        occurrences[item] = (occurrences[item] || 0) + 1;
        return occurrences;
    }, {}))

    const inputErrors = (decoderState: InputState[]) => {
        const inputString = decoderState.map((decoder) => decoder.currentLetter).filter((letter) => letter != "").join("")
        const inputOccurrences = countOccurrencesOfEach(inputString)
        const out = inputOccurrences.filter((a) => {
            return a[1] > 1
        }).map((error) => { return `using ${error[0]} too many times`})
        return out.join("\n")
    }

    $: occurrences = countOccurrencesOfEach(ciphertext).sort((a, b) => {
        return b[1] - a[1]
    }).map((item) => item.join(":")).join("\t\t")

    $: oneLetterWords = [...new Set(ciphertext.split(/\s+/g).filter((word) => {
        return [...word].length == 1
    }))].join("\t")
    $: twoLetterWords = [...new Set(ciphertext.split(/\s+/g).filter((word) => {
        return [...word].length == 2
    }))].join("\t")
    $: threeLetterWords = [...new Set(ciphertext.split(/\s+/g).filter((word) => {
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
    $: errors = inputErrors(decoderState)

</script>

<div class="container">
    <div class="decoder">
        <h1>Emoji Decoder</h1>

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

        <div class="decoded">{decoded}</div>

        <div class="stats">
            <DecoderStatistic label="occurrences" data={occurrences}></DecoderStatistic>
            <DecoderStatistic label="one letter words" data="{oneLetterWords}"></DecoderStatistic>
            <DecoderStatistic label="two letter words" data="{twoLetterWords}"></DecoderStatistic>
            <DecoderStatistic label="three letter words" data="{threeLetterWords}"></DecoderStatistic>
            <DecoderStatistic label="repeating digraphs" data="{repeatingDigraphs}"></DecoderStatistic>
            <DecoderStatistic label="input errors" data="{errors}" wordSpacing="normal"></DecoderStatistic>
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
        align-items: start;
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
        font-size: 2em;
        word-spacing: 1.5em;
        white-space: pre-line;
        margin: 0.5em;
    }

    .stats {
        width: 100%;
        font-size: 2em;
    }
</style>
