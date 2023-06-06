import { useEffect, useState } from "react"
import { Route, useNavigate } from "react-router-dom"
import "./ProductList.css"
import { Product } from "./Product"
import { getProducts } from "../ApiManager"

export const ProductList = ({ searchTermState }) => {
    const [products, setProducts] = useState([])
    const [pricedProducts, setPriced] = useState(false)
    const [filteredProducts, setFiltered] = useState([])
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    // This filters products according to what has been typed in the search bar
    useEffect(
        () => {
            const searchedProducts = products.filter(product => {
                return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedProducts)
        },
        [searchTermState]
    )

    useEffect(
        () => {
            getProducts()
            .then((products) => {
                setProducts(products)
            })
        },
        []
    )

    useEffect(
        () => {
            setFiltered(products)
        },
        [products]
    )

    useEffect(
        () => {
            if (pricedProducts) {
                const topPriced = products.filter(product => product.price > 2)
                setProducts(topPriced)
            }
            else {
                setProducts(products)
            }
        },
        [pricedProducts]
    )

    return <>
        {
            kandyUserObject.staff
                ? <>
                    <button onClick={() => { setPriced(true) }} >Top Priced</button>
                    <button onClick={() => navigate("/product/create")}>Create Product</button>
                </>
                : ""
        }
        <Product kandyUserObject={kandyUserObject} filteredProducts={filteredProducts} />
    </>
}