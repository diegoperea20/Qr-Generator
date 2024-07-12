# Qr Generator

<p align="justify">
Qr Generator nextjs where you can generate qr image with an entered url.
</p>


<p align="center">
  <img src="README-images/qr-generate.PNG" alt="Step1">
</p>

<p align="center">
  <img src="README-images/qr-code.png" width="300" alt="Step1">
</p>


You can scan your qr at [Qr-Scanner web](https://qr-scanner-online.vercel.app/)  and there is also its repository [Qr-Scanner](https://github.com/diegoperea20/Qr-Scanner) 

-----

Fronted Nextjs Options for do it:

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
Nodejs version v20.10.0 and Next.js version v14.2.3 

First
```bash
npm install
```
run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Resolve : Error Nextjs Parsing error: Cannot find module 'next/babel'

Put this code in .eslintrc.json 
```bash
{
  "extends": ["next/babel","next/core-web-vitals"]
}
```


Created by [Diego Ivan Perea Montealegre](https://github.com/diegoperea20)