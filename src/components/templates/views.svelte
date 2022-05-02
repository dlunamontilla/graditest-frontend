<script>
    import { isInput } from "../../scripts/functions";

    import Arrow from "./../icons/arrow.svelte";
    /**
     * @type { Object<string, any> }
     */
    export let value;

    const { media } = value;
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
    let thumbnailX = 0;

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

    /**
     * Establecer la posición seleccionada. Es decir, el
     * elemento seleccionado por el usaurio.
     * @param { string } name
     * @param { boolean } defaults
     * @returns { void }
     */
    function setPosition(name, defaults = true) {
        if (!name) return;

        if (defaults) {
            if (name === "left") {
                posX = posX > length - 2 ? 0 : ++posX;
            }

            if (name === "right") {
                posX = posX < 1 ? length - 1 : --posX;
            }
            return;
        }

        if (name === "left") {
        }
        if (name === "right") --thumbnailX;
    }

    function animationEnd() {
        const { firstChild } = this;

        if (this.classList.contains("translate-right-x")) {
            this.insertAdjacentElement("beforeend", firstChild);
            setPosition("left", true);
        }

        if (this.classList.contains("translate-left-x"))
            setPosition("right", true);

        this.classList.remove("translate-left-x");
        this.classList.remove("translate-right-x");
        this.classList.remove("fadeIn");
    }

    function selected() {
        if (typeof carousel === "undefined") return;
        const { firstChild } = carousel;

        const childNodes = [];
        childNodes.push(...carousel.firstChild.childNodes);

        for (const node of childNodes) {
            const { id } = node.dataset;
            if (id === this.dataset.id) break;

            node.remove();
            firstChild.appendChild(node);
        }

        firstChild.classList.add("fadeIn");

        posX = Number(this.dataset.id);
    }

    function thumbnail(e) {
        if (typeof carousel === "undefined") return;

        const { name } = e.target.dataset;
        const inner = this.firstChild;

        console.log({ inner });
        if (name === "left" && thumbnailX > 0) {
            --thumbnailX;
        }

        if (name === "right" && thumbnailX < length - 3) {
            ++thumbnailX;
        }

        this.setAttribute("style", `--posX: -${thumbnailX * (100 / 3)}%`);
    }

    function getPosition() {
        return posX < 3 ? 0 : (100 / 3) * (posX - 2);
    }

    $: posX = posX;

    onkeydown = (e) => {
        if (typeof carousel === "undefined") return;

        const { target } = e;

        const { key } = e;
        const { firstChild, lastChild } = carousel?.lastChild;

        if (firstChild && lastChild && !isInput(target)) {
            if (key === "ArrowLeft") firstChild?.click();
            if (key === "ArrowRight") lastChild?.click();
        }
    };
</script>

<div class="products__item products__item--views">
    <div class="carousel-container">
        <!-- Vista de producto -->
        <div
            class="carousel"
            on:click={clickHandle}
            style="--x: {posX}"
            id="carousel"
        >
            <div
                class="carousel__inner"
                data-name="inner"
                on:animationend={animationEnd}
            >
                {#each media as { src }, index}
                    <div class="carousel__inner__item" data-id={index}>
                        <div class="carousel__inner__item__image">
                            <img {src} alt="Imagen" />
                        </div>
                    </div>
                {/each}
            </div>

            <div class="carousel__arrow">
                <div class="carousel__arrow__left" data-name="left">
                    <Arrow />
                </div>
                <div class="carousel__arrow__right" data-name="right">
                    <Arrow />
                </div>
            </div>
        </div>

        <!-- Thumbnail -->
        <div
            class="thumbnail"
            style="--posX: -{posX < 3 ? 0 : (100 / 3) * (posX - 2)}%"
            on:click={thumbnail}
        >
            <div class="thumbnail__inner">
                {#each media as { src }, index}
                    <div
                        class="thumbnail__inner__item"
                        data-id={index}
                        on:click={selected}
                    >
                        <div
                            class="thumbnail__inner__item__images"
                            data-id={index}
                        >
                            <img
                                {src}
                                alt="thumbnail"
                                class={index === posX ? "focused" : ""}
                            />
                        </div>
                    </div>
                {/each}
            </div>

            <div class="thumbnail__arrow">
                <div class="thumbnail__arrow__left" data-name="left">
                    <Arrow />
                </div>

                <div class="thumbnail__arrow__right" data-name="right">
                    <Arrow />
                </div>
            </div>
        </div>

        <!-- Indicador de posición de imagen -->
        <ul class="carousel-container__indicators">
            {#each media as { }, index}
                <li
                    data-id={index}
                    on:click={selected}
                    class={index === posX ? "focused" : ""}
                />
            {/each}
        </ul>
    </div>
</div>
