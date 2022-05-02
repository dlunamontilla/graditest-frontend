<script>
	import Arrow from './../icons/arrow.svelte';
    /**
     * @type { Object<string, any> }
     */
    export let value;

    const { images, media } = value;
    const { length } = media;

    /**
     * @type { Object<string, Function|undefined> }
     */
    const translateA = {
        left: (container) => {
            const { lastChild } = container;
            container.insertAdjacentElement("afterbegin", lastChild);
            container.classList.add("translate-left-x");
        },

        right: (container) => {
            container.classList.add("translate-right-x");
        },
    };

    let posX = 0;
    let translateX = 100;

    /**
     *
     * @param { ClickEvent } e
     */
    function clickHandle(e) {
        const { target } = e;
        const { name } = target.dataset;

        const [inner] = this.childNodes;

        if (inner?.dataset?.name === "inner") {
            if (typeof translateA[name] === "function") {
                translateA[name](inner);
            }
        }
    }

    function animationEnd() {
        const { firstChild } = this;

        if (this.classList.contains("translate-right-x")) {
            this.insertAdjacentElement("beforeend", firstChild);
            posX = posX > length - 2 ? 0 : ++posX;
        }

        if (this.classList.contains("translate-left-x")) {
            posX = posX < 1 ? length - 1 : --posX;
        }

        this.classList.remove("translate-left-x");
        this.classList.remove("translate-right-x");
    }

    $: posX = posX;
</script>

<div class="products__item products__item--views">
    <div class="carousel-container">
        <!-- Vista de producto -->
        <div class="carousel" on:click={clickHandle} style="--x: {posX}">
            <div
                class="carousel__inner"
                data-name="inner"
                on:animationend={animationEnd}
            >
                {#each media as { src }, index}
                    <div class="carousel__inner__item" data-id="{index}">
                        <div class="carousel__inner__item__image">
                            <img {src} alt="Imagen" />
                        </div>
                    </div>
                {/each}
            </div>

            <div class="carousel__arrow">
                <div class="carousel__arrow__left" data-name="left"><Arrow /></div>
                <div class="carousel__arrow__right" data-name="right"><Arrow /></div>
            </div>
        </div>

        <!-- Thumbnail -->
        <div class="thumbnail" style="--posX: -{posX < 3 ? 0: ((100 / 3) * (posX - 2))}%">
            <div class="thumbnail__inner">
                {#each media as { src }, index}
                    <div class="thumbnail__inner__item">
                        <div class="thumbnail__inner__item__images" data-id="{index}">
                            <img {src} alt="thumbnail" class="{index === posX ? 'focused': ''}" />
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Indicador de posición de imagen -->
        <ul class="carousel carousel--indicators">
            {#each media as { }, index}
                <li data-id={index + 1}>{index + 1}</li>
            {/each}
        </ul>

        <div>{posX}</div>
    </div>
</div>
