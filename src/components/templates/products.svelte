<script>
    import Details from "./details.svelte";
    import Views from "./views.svelte";
    import Loader from "./../loader.svelte";

    /**
     * @type { Object<string, any> }
     */
    export let data;
</script>

{#await data}
    <Loader className="loader" />
{:then value}
    <section class="main__section fadeIn">
        <p>
            Catalog / Sneckers / {value.title}
        </p>
    </section>

    <section class="main__section products fadeIn">
        <form action="" method="action" class="form products__form">
            <Views {value} />
            <Details {value} />
        </form>
    </section>
{:catch error}
    {error}
{/await}
