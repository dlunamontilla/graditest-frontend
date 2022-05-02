<script>
    import Products from "./components/templates/products.svelte";
    import { getData } from "./scripts/functions";

    /**
     * Datos de la API de productos
     * @type { Promise<Object<string, any>> }
     */
    // let data = getData("api/");
    let data = getData("https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js");
</script>

<main id="app" class="main">
    <Products {data} />
</main>
