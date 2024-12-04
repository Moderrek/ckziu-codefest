# CKZiU CodeFest

CKZiU CodeFest is a development platform where there are competitions and student projects on various topics.

[**API Repository**](https://github.com/Moderrek/ckziu-codefest-api)

<div align="center">

<img src="https://github.com/user-attachments/assets/8c713b21-d02e-4311-87c3-f085af19cf45" width="500px" height="500px">

<img src="https://github.com/user-attachments/assets/090770e1-505c-43d5-a3f6-8c28d1609f88" width="500px" height="500px">

<img src="https://github.com/user-attachments/assets/6b3341e1-76b4-4bdb-8ce1-eeee26b2881a" width="500px" height="500px">

</div>



## Quick Start

```bash
git clone https://github.com/Moderrek/ckziu-codefest
cd ckziu-codefest
pnpm i
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Requirements

* [NodeJS 22](https://nodejs.org/en/download/package-manager)
* [npm](https://nodejs.org/en/download/package-manager) or [pnpm](https://pnpm.io/)
* Connection to [official API (api.ckziucodefest.pl)](https://api.ckziucodefest.pl/) or
  host [local server](https://github.com/Moderrek/ckziu-codefest-api)

* If production mode => private key and public certificate.

## Production mode

Required keys in directory: `ssl/`

Private key: `ckziucodefest.key`  
Public certificate: `ckziucodefest.csr`

```bash
pnpm run prod
```

## Libraries

* Framework: [Next.js](https://nextjs.org/)
* UI: [React.js](https://react.dev/)
* CSS Preprocessor: [TailwindCSS](https://tailwindcss.com/)
* HTTP Client: [axios](https://axios-http.com/)
* Icons: [Lucide React](https://lucide.dev/)
* Ready UI components [shadcn-ui](https://ui.shadcn.com/)
* Uses TypeScript
