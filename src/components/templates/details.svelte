<script>
    import { uniqueValue } from "../../scripts/functions";

    import Volume from "./volume.svelte";

    /**
     * @type { Object<string, any> }
     */
    export let value;

    /**
     * @type { Array<Object<string, any>> }
     */
    let variants = uniqueValue(value.variants);

    $: variants = variants;
</script>

<aside class="products__item products__item--price">
    <div class="details">
        <header class="details__price">
            <p>by {value.vendor}</p>

            <h2>{value.title}</h2>
            <p>
                $ {value.price}
                <span class="line-through">$ {value.compare_at_price}</span>
            </p>
        </header>

        <div class="details__color">
            <p><strong>Color: </strong></p>
        </div>

        <div class="details__size">
            <p><strong>Size:</strong></p>

            <ul class="details__size__menu">
                {#each variants as { option2 }}
                    <li class="details__size__menu__item">
                        <a
                            href="#s{option2.replace(/[\.]/gi, '-')}"
                            id="s{option2.replace(/[\.]/gi, '-')}"
                        >
                            {option2}
                        </a>
                    </li>
                {/each}
            </ul>
        </div>

        <div class="details__volume">
            <Volume price={value.price} />
        </div>

        <div class="details__button">
            <button type="button" class="button button--favorite">Add to favourite</button>
            <button type="button" class="button button--cart">Add to cart</button>
        </div>

        <div class="details__description">
            {@html value.description}
        </div>
    </div>
</aside>
