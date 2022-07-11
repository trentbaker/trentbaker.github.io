<script lang="ts">
    export let label: String = "statistic"
    export let data: String = "data"
    export let wordSpacing: String = "1.5em"
</script>

<div class="container" style="--wordSpacing: {wordSpacing}">
    {label}
    <br>
    <div class="data">
        {#if (data)}
            {data}
        {:else }
            None
        {/if}
    </div>
</div>

<style>
    .container {
        border: 0.15vh cadetblue solid;
        padding: 0.2em;
        margin: 0.5em;
    }
    .data {
        word-spacing: var(--wordSpacing);
        white-space: pre-line;
    }
</style>