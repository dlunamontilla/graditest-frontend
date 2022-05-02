<script>
    import { setInputValue } from "../../scripts/functions";
    /**
     * Moneda Local
     */
    let currency;

    /**
     * Datos de la Endpoint:
     * @type { Object<string, any> }
     */
    export let price;

    /**
     * @type { number }
     */
    let volume = 1;

    const number = price * volume;
    currency = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(number);

    function input(e) {
        setInputValue(e);
        const number = Number(this.value.trim()) * price;
        currency = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(number);
    }

    function clickHandler(e) {
        setInputValue(e);
        
        if (typeof inputVolume !== "undefined") {
            const number = Number(inputVolume.value) * price;
            currency = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(number);
        }

    }

    $: currency = currency;
</script>

<div
    class="volume-container"
    on:click={clickHandler}
    data-element="volume-container"
>
    <div class="volume">
        <button type="button" class="button button--count" data-element="minus-button">-</button>
        <input type="number" name="volume" id="inputVolume" min="1" value="1" on:keydown={input} />
        <button type="button" class="button button--count" data-element="sum-button">+</button>
    </div>

    <p>Total price: {currency}</p>

    <input type="hidden" name="mount" id="mount" value={currency} />
</div>
