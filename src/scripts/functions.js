const currentValues = {
    /**
     * 
     * @param { HTMLInputElement } input
     */
    'minus-button': function(input) {
        let currentValue = Number(input.value);

        input.value = (currentValue > 0) 
            ? --currentValue
            : 0;
    },

    /**
     * 
     * @param { HTMLInputElement } input
     */
    'sum-button': function(input) {
        let currentValue = Number(input.value);
        input.value = currentValue < 0 
            ? 0
            : ++currentValue;
    }
};

/**
 * @param { string } url Ruta de la API a consumir.
 * @returns { Promise<Object<string, string|number>> }
 */
async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

/**
 * 
 * @param {*} any Evalúe si lo que pasa como argumento de la 
 * función es un elemento HTMLInputElement (inputs).
 * @returns { boolean }
 */
function isInput(any) {
    return Object.prototype.toString.call(any) === "[object HTMLInputElement]";
}

/**
 * @param { ClickEvent } e
 * @returns { void }
 */
function setInputValue(e) {
    const { target } = e;
    const { element } = target.dataset;

    /** @type { HTMLInputElement } */
    const input = target.parentNode.children[1];

    if (isInput(input)) {
        if (typeof currentValues[element] === "function") {
            currentValues[element](input);
        }
    }
}

export {
    getData,
    setInputValue
}