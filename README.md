# Project install & dependencies

## React + Vite

```python
npm create vite@latest my-react-app --template react
cd my-react-app
npm install
```

## Install tailwindCSS

```python
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```python
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Configure template path

Add the paths to all of your template files in your **`tailwind.config.js`** file.

```python
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Add the Tailwind directives to your css

Add the **`@tailwind`** directives for each of Tailwind’s layers to your **`./src/index.css`** file.

```python
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Axios install

Install in project terminal

```python
$ npm install axios
```

## Prettier code formatter tailwind css plugin installation

uses Prettier and Tailwind CSS vscode plugin to format the className=”” automatically.

### Install in foler/project terminal locally

```python
npm install -D prettier prettier-plugin-tailwindcss
```

### Then add to Prettier configuration file:

### 1. Create a .prettierrc.json file in project root

### 2. Add the following code in the file

```python
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## Material UI icons

```python
npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
```

## Shader gradient

https://github.com/ruucm/shadergradient

```python
npm i three @react-three/fiber @react-spring/three @shadergradient/react
npm i -D @types/three
```

## Hide scrollbar plugin

<aside>

https://www.npmjs.com/package/tailwind-scrollbar-hide

</aside>

## .env React

installed in project, used for the .env that houses API keys.

```python
npm i --save-dev dotenv
```

## To run the project

Run in folder/project terminal

```python
npm run  dev
```
