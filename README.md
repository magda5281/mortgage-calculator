# 🏡 Mortgage Repayment Calculator

🚀 **Live Demo**: [https://mortgage-calculator-lemon-sigma.vercel.app](https://mortgage-calculator-lemon-sigma.vercel.app)

A simple, accessible, and responsive **Mortgage Repayment Calculator** built with **React**, **TypeScript**, **Vanilla CSS** and **Zod**.

The calculator allows users to estimate their monthly mortgage repayments and view a detailed breakdown including interest, monthly totals, and remaining balance over time — all within a modal popup.

---

## 🚀 Getting Started

These instructions will help you set up and run the project locally.

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

---

### 📦 Install dependencies

```bash
npm install
```

---

### 💻 Start the development server

```bash
npm start
```

This will start the app at [http://localhost:3000](http://localhost:3000) and reload on changes.

---

### 🧪 Run tests

```bash
npm test
```

Runs unit tests using **Jest** and **React Testing Library**.

---

### 🧹 Lint your code

```bash
npm run lint
```

Uses **ESLint** and **Prettier** to enforce consistent code style and catch errors early.

---

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
├── hooks/           # Reusable hooks
├── styles/          # Global and modular CSS
├── tests/           # Unit and component tests
├── utils/           # Mortgage calculation logic
└── App.tsx          # Main app component
types.ts
```

---

## ✨ Features

- ✅ **Modal-based UI** – Opens in a popup window sized 500x500px on desktop
- ✅ **Mobile-first responsive design**
- ✅ **Fluid typography** for responsive design
- ✅ **Accessible** form fields with labels and hints
- ✅ **Strong TypeScript typing**
- ✅ **Zod validation** with cross-field rules
- ✅ **Reusable FormField and Modal component**
- ✅ **Simple table with monthly breakdown**
- ✅ **Tests using Jest + React Testing Library**
- ✅ **Prettier & ESLint** for clean code

---

## 🛠 Built With

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

---

## 📦 Build for Production

```bash
npm run build
```

Builds the app for production to the `/build` folder.

---

## 📝 Developer Notes

For implementation details, design decisions, or technical reasoning behind certain components (e.g., the modal), please refer to [NOTES.md](./NOTES.md).

## 📄 License

This project is for educational/demo purposes. No license currently applied.
