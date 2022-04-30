<script>
    import Volume from "./volume.svelte";
    
    /**
     * @type { Object<string, any> }
     */
    export let value;
</script>

<aside class="products__item products__item--price">
    <div class="details">
        <p>by {value.vendor}</p>

        <h2>{value.title}</h2>
        <p>
            $ {value.price}
            <span class="line-through">$ {value.compare_at_price}</span>
        </p>

        <div class="details__color">
            <p><strong>Color: </strong></p>
        </div>

        <div class="details__size">
            <p><strong>Size:</strong></p>

            <ul class="details__size__menu">
                {#each value.variants as { option2 }}
                    <li class="details__size__menu__item">{option2}</li>
                {/each}
            </ul>
        </div>

        <div class="details__volume">
            <Volume />
        </div>

        <div class="details__button">
            <button class="button button--favorite">Add to favourite</button>
            <button class="button button--cart">Add to cart</button>
        </div>

        <div class="details__description">
            {@html value.description}
        </div>
    </div>
</aside>
