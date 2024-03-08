# Vascara Website

Vascara Website is an e-commerce web application built with React, offering users a seamless online shopping experience. It fetches product data from various sources and provides features such as browsing products, managing categories, and user authentication.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)
5. [Testing](#testing)
6. [Deployment](#deployment)

## Getting Started

To get started with the Vascara Website project, follow these steps:

### For npm users

1. Clone the repository:

git clone
cd vascara-website
npm install
git clone https://github.com/your-username/vascara-website
yarn install
yarn start
Product Details
Category Management
User Authentication
Demo Account

Toast Notifications
Responsive Design
Technologies Used
TypeScript
Redux Toolkit
React
Material UI
Project Structure
css
Copy code
project-root/
├── node_modules/
├── package-lock.json
├── package.json
├── public/
│ ├── ...
├── README.md
├── src/
│ ├── App.test.tsx
│ ├── App.tsx
│ ├── components/
│ │ ├── AuthModal.tsx
│ │ ├── Category/
│ │ │ ├── CategoryCard.tsx
│ │ │ └── Category.tsx
│ │ ├── FilterForm.tsx
│ │ ├── Footer.tsx
│ │ ├── LoginForm.tsx
│ │ ├── Navbar.tsx
│ │ ├── Product/
│ │ │ ├── Product.tsx
│ │ │ ├── ProductCard.tsx
│ │ │ ├── ProductForm.tsx
│ │ │ ├── ProductList.tsx
│ │ │ └── ProductDetailsPage.tsx
│ │ ├── SignUpForm.tsx
│ │ ├── Slider.tsx
│ │ └── ui/
│ │ ├── alert-dialog.tsx
│ │ ├── button.tsx
│ │ ├── dialog.tsx
│ │ ├── pagination.tsx
│ │ ├── popover.tsx
│ │ ├── table.tsx
│ │ ├── tabs.tsx
│ │ ├── toast.tsx
│ │ ├── toaster.tsx
│ │ ├── use-toast.ts
│ │ └── UserInfo.tsx
│ ├── index.css
│ ├── index.tsx
│ ├── lib/
│ │ └── utils.ts
│ ├── logo.svg
│ ├── miscs/
│ │ └── types/
│ │ ├── CartState.ts
│ │ ├── CategoryState.ts
│ │ ├── FilterState.ts
│ │ ├── ProductState.ts
│ │ └── UserState.ts
│ ├── pages/
│ │ ├── AboutPage.tsx
│ │ ├── CartPage.tsx
│ │ ├── CategoryProductsPage.tsx
│ │ ├── ContactPage.tsx
│ │ ├── HomePage.tsx
│ │ ├── ProductDetailsPage.tsx
│ │ ├── ProductsPage.tsx
│ │ ├── ProfilePage.tsx
│ │ └── Register.tsx
│ ├── react-app-env.d.ts
│ ├── redux/
│ │ ├── slices/
│ │ │ ├── cartSlice.ts
│ │ │ ├── categorySlice.ts
│ │ │ ├── filterSlice.ts
│ │ │ ├── productSlice.ts
│ │ │ └── userSlice.ts
│ │ └── store.ts
│ ├── reportWebVitals.ts
│ └── setupTests.ts
├── tailwind.config.js
├── test/
│ ├── cartSlice.test.ts
│ ├── categorySlice.test.ts
│ ├── productSlice.test.ts
│ └── userSlice.test.ts
├── tsconfig.json
└── yarn.lock
Testing
For npm users
Ensure all dependencies are installed:
bash

npm install
Run the test suite:

Copy code
npm test
Live link " User
https://fs17-frontend-project-seven.vercel.app/"
