<script>
    export let className = "";
</script>

<div class="caja giro-constante {className}" id="animacion-carga">
    <svg viewBox="0 0 140 140" class="lienzo giro-intervalo loader">
        
        <!-- Circunferencia con borde fijo-->
        <circle class="cir cir--fijo" cx="70" cy="70" r="65" />

        <!-- Circunferencia con borde animado -->
        <circle
            class="cir cir--completando giro-trazo"
            cx="70"
            cy="70"
            r="65"
        />
    </svg>
</div>

<style>
    @charset "UTF-8";
    
    @keyframes giro-trazo {
        50% {
            stroke-dashoffset: 440;
        }
    }
    /* Giro en intervalo. Se aplicará en el lienzo */
    @keyframes giro-intervalo {
        0% {
            transform: rotateZ(-449deg);
        }
        50%,
        100% {
            transform: rotateZ(-90deg);
        }
    }
    /* Animación para giro constante de 360 grados */
    @keyframes giro-constante {
        from {
            transform: rotateZ(-359deg);
        }
    }

    /* Lienzo donde se ubica la circunferencia */
    .lienzo {
        transform: rotateZ(-90deg);

        --size: calc(var(--loader-size) * 0.8 );

        width: var(--size);
        height: var(--size);
    }

    .cir {
        fill: none;
    }
    .cir--completando {
        stroke: var(--loader-color);
        stroke-width: 10;

        /* Matriz de guiones */
        stroke-dasharray: 440;
        stroke-dashoffset: 80;
        stroke-linecap:round;
    }

    .giro-trazo {
        animation: 2s ease giro-trazo infinite;
    }
    .giro-intervalo {
        animation: 2s ease giro-intervalo infinite;
    }
    .giro-constante {
        animation: 1.5s linear giro-constante infinite;
    }

    .caja {
        background-color: var(--loader-background);
        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;

        --size: calc(var(--loader-size) * 1.4);
        width: var(--size);
        height: var(--size);
    }
</style>
