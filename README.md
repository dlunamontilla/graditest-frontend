# Instalación del proyecto

Clone el proyecto mediante la siguiente línea:

```bash
git clone git@github.com:dlunamontilla/graditest-frontend.git
```

Si ya cuenta con una llave SSH instalada en su computador y la llave pública en su cuenta **GitHub.**

O mediante HTTP:

```bash
git clone https://github.com/dlunamontilla/graditest-frontend.git
```

Despues de clonar el proyecto proceda a instalar las dependencias.

```bash
npm install
```

## Otras dependencias

Dado que se está utilizando un pre-procesador **`SASS`** debe instalar las siguientes dependencias.

```bash
npm install --save-dev rollup-plugin-scss@3 scss sass
```

## Correr el proyecto

Después de haber seguido los pasos anteriores puede correr el proyecto:

```bash
npm run dev
```

> Preparándose para Heroku...