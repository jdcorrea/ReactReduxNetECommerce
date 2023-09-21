import ServerError from "@app/errors/ServerError"
import App from "@app/layout/App"
import AboutPage from "@features/about/AboutPage"
import Catalog from "@features/catalog/Catalog"
import ProductDetails from "@features/catalog/ProductDetails"
import ContactPage from "@features/contact/ContactPage"
import HomePage from "@features/home/HomePage"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {path: '', element: <HomePage />},
      {path: 'catalog', element: <Catalog />},
      {path: 'catalog/:id', element: <ProductDetails />},
      {path: 'about', element: <AboutPage />},
      {path: 'contact', element: <ContactPage />},
      {path: 'server-error', element: <ServerError />},
    ]
  }
])