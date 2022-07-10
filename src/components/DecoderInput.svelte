<script lang="ts">
  export let emoji: String = "🍑";
  export let currentLetter: String = "-";
</script>

<div class="decoderInput">
  <div class="label">{emoji}</div> <input maxlength="1" bind:value={currentLetter}  />
</div>

<style>
  .label{
    margin: 0.2em;
  }

  input {
    width: 1em;
    font-size: 100%;
  }

  .decoderInput {
    display: flex;
    justify-content: space-between;
    font-size: 200%;
    border: 0.15vh cadetblue solid;
    margin: 0.2em;
    padding: 0.2em;
  }
</style>
