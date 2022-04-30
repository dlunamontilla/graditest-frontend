<script>
    import { setInputValue } from "../../scripts/functions";
</script>

<div
    class="volume-container"
    on:click={setInputValue}
    data-element="volume-container"
>
    <button data-element="minus-button">-</button>
    <input type="number" name="volume" id="volume" min="0" />
    <button data-element="sum-button">+</button>
</div>
