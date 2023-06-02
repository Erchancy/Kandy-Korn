import { useEffect, useState } from "react"

export const Product = ({kandyUserObject, filteredProducts}) => {

    const [purchase, updatePurchase] = useState({
        customerId: 0,
        locationInventoryId: 0,
        amount: 1
    })
    
    const [locationInventories, setLocationInventories] = useState([])
    const [customers, setCustomers] = useState([])
    
    useEffect(
        () => {
            const getLocationInventory = async () => {
                const response = await fetch(`http://localhost:8088/locationInventory?_expand=product`)
                const allInventories = await response.json()
                setLocationInventories(allInventories)
            }
            getLocationInventory()
        },
        []
    )
    
    useEffect(
        () => {
            const getCustomers = async () => {
                const response = await fetch(`http://localhost:8088/customers`)
                const allCustomers = await response.json()
                setCustomers(allCustomers)
            }
            getCustomers()
        },
        []
    )

    const productPurchase = ( product, currentUser ) => {
        const chosenInventory = locationInventories.find(locationInventory => locationInventory.productId === product.id)
        const purchaser = customers.find(customer => customer.userId === currentUser.id)
        const copy = { ...purchase }
        copy.customerId = purchaser.id
        copy.locationInventoryId = chosenInventory.id
        updatePurchase(copy)

        return fetch(`http://localhost:8088/purchases`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(purchase)
        })
            .then(response => response.json())
    }

    const purchaseButton = (product, kandyUserObject) => {
        if (locationInventories.find(locationInventory => locationInventory.productId === product.id)) {
            return kandyUserObject.staff ? "" :<button onClick={() => productPurchase(product, kandyUserObject)} >Purchase</button>
        }
        else {
            return kandyUserObject.staff ? "" :"Out Of Stock"
        }
    }

    return <>
    <ul className="product_list">
        {filteredProducts.map((product) => (
            <li className="product_item" key={`product-${product.id}`}>
                <>
                    {kandyUserObject.staff
                        ? `${product.name}
                    $${product.price}
                    ${product.productType.productType}`
                        : `${product.name}
                    $${product.price}`}
                    {purchaseButton(product, kandyUserObject)}      
                </>
            </li>
        ))}
    </ul>
    </>

}


