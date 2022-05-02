const currentValues = {
    /**
     * 
     * @param { HTMLInputElement } input
     */
    'minus-button': function (input) {
        let currentValue = Number(input.value);

        input.value = (currentValue > 1)
            ? --currentValue
            : 1;
    },

    /**
     * 
     * @param { HTMLInputElement } input
     */
    'sum-button': function (input) {
        let currentValue = Number(input.value);
        input.value = currentValue < 1
            ? 1
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
 * 
 * @param {any} any Evaluar si el valor que se pasa como argumento es un objeto.
 * @returns { boolean }
 */
const isObject = (any) => Object.prototype.toString.call(any) === "[object Object]";

/**
 * @param { ClickEvent } e
 * @returns { void }
 */
function setInputValue(e) {
    const { target, key } = e;
    const { element } = target.dataset;

    const regex = /([0-9]|Backspace|Control|Delete|Tab|Shift)/i


    if (key) {
        if (!regex.test(key)) e.preventDefault();
    }

    /** @type { HTMLInputElement } */
    const input = target.parentNode.children[1];

    if (isInput(input)) {
        if (typeof currentValues[element] === "function") {
            currentValues[element](input);
        }
    }
}

/**
 * 
 * @param {Array<Object<string, any>>} array Eliminar duplicados en un array de objetos.
 * @param { string } property Propiedad de referencia del objeto.
 * @returns { Array<Object<string, any>> }
 */
const uniqueValue = (array, property = "option2") => {
    if (!Array.isArray(array)) return [{}];

    const object = {};
    const variants = [];

    array.forEach(element => {
        if (isObject(element) && (property in element)) {
            object[element[property]] = element;
        }
    });

    for (const property in object) {
        variants.push(object[property]);
    }

    array.length = 0;
    array.push(...variants);
    variants.length = 0;
    
    return array;
}

export {
    getData,
    setInputValue,
    uniqueValue
}