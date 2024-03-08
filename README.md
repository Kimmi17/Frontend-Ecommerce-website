# Vascara Website

Vascara Website is an e-commerce web application built with React, offering users a seamless online shopping experience. IThe Vascara Website fetches product data from [Platzi Fake Store API](https://fakeapi.platzi.com/), providing users with a diverse selection of products to browse and explore.

1. [Getting Started](#getting-started)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Testing](#testing)
5. [Deployment](#deployment)

## Getting Started

To get started with the Vascara Website project, follow these steps:

### npm users

1. Clone the repository: `git@github.com:Kimmi17/fs17-Frontend-project.git `
2. Navigate to the project directory: `cd vascara-website`
3. Install dependencies: `npm install`
4. Run: `npm start`

### yarn users

1. Clone the repository: `git clone `
2. Navigate to the project directory: `cd vascara-website`
3. Install dependencies: `yarn install`
4. Run : `yarn start`

## Technologies Used

- TypeScript
- Redux Toolkit
- React
- Tailwind Css

## Project Structure

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

### Pages

- **Home Page:** Displays all products fetched from the API.
- **Product Detail Page:** Shows detailed information about a single product.
- **Profile Page:** Displays user information
- **Cart Page:** Displays the products added to the cart

### Redux Store

- **Actions:**
  - Fetch all products
  - Find a single product
  - Filter products by categories
  - Sort products by price
  - User registration
  - User login
  - Add product to cart
  - Remove product from cart
  - Update product quantity in cart

## Routing

- Set up routes for different pages using React Router.

## Unit Testing

## Deployment

Check out the [Live Demo](https://fs17-frontend-project-seven.vercel.app/) to experience the Vascara Website in action.
