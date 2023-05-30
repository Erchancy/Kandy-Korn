import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {

    // This defines the product state object and allows it to be updated using update
    const [product, update] = useState({
        name: "",
        productTypeId: 0,
        price: 0
    })

    // This declares navigate as an invocation of useNavigate
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // This creates a newProduct object with values equal to certain product properties
        const newProduct = {
            name: product.name,
            productTypeId: product.productTypeId,
            price: product.price
        }

        // This posts/adds the new product to the list of products in the database and then reroutes the user to /products
        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        .then(response => response.json())
        .then(() => {
            navigate("/products")
        })
    }

    // This is the actual product form that is filled out
    return (
        <form className="productForm">
            <h2 className="productForm__title">New Candy Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="The name of the product"
                        value={product.name}
                        onChange={
                            (evt) => {
                                // This creates a copy variable of the product using the spread operator and then marks the appropriate property value to the input value and invokes update
                                const copy = {...product}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productTypeId">Product Type:</label>
                </div>
                <div className="form-group">
                    <label htmlFor="productTypeId">Chocolate</label>
                    <input 
                        required autoFocus
                        type="radio"
                        name="Chocolate"
                        placeholder="The kind of product"
                        value="1"
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.productTypeId = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="productTypeId">Hard Candy</label>
                    <input 
                        required autoFocus
                        type="radio"
                        name="Hard Candy"
                        placeholder="The kind of product"
                        value="2"
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.productTypeId = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="productTypeId">Gummy</label>
                    <input 
                        required autoFocus
                        type="radio"
                        name="Gummy"
                        placeholder="The kind of product"
                        value="3"
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.productTypeId = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="productTypeId">Licorice</label>
                    <input 
                        required autoFocus
                        type="radio"
                        name="Licorice"
                        placeholder="The kind of product"
                        value="4"
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.productTypeId = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Product Price:</label>
                    <input 
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="The price of the product"
                        value={product.price}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.price = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Product
            </button>
        </form>
    )
}