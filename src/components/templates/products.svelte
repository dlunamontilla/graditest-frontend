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
    <section class="main__section">d</section>

    <section class="main__section products fadeIn">
        <Views {value} />
        <Details {value} />
    </section>

{:catch error}
    {error}
{/await}
