npm i -D typescript
npm i -D @types/node
npm i -D @types/jest
npm i -D @types/react
npm i -D @types/react-dom
npm i -D @types/redux
npm i -D @types/react-router-dom

redux toolkit ha già i types

tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```