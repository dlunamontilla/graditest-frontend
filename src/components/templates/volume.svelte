<script>
    import { setInputValue } from "../../scripts/functions";
</script>

<div
    class="volume-container"
    on:click={setInputValue}
    data-element="volume-container"
>
    <div class="volume">
        <button type="button" class="button button--count" data-element="minus-button">-</button>
        <input type="number" name="volume" id="volume" min="1" value="1" on:keydown={setInputValue} />
        <button type="button" class="button button--count" data-element="sum-button">+</button>
    </div>

    <p>Total price:</p>

    <input type="hidden" name="mount" id="mount" />
</div>
