import { useEffect, useState } from "react"
import { newPurchase, getCustomerList, getLocationInventory, getLocationList } from "../ApiManager"

export const Product = ({ kandyUserObject, filteredProducts }) => {

    const [purchase, updatePurchase] = useState({
        customerId: 0,
        locationId: 0,
        productId: 0,
        amount: 1
    })

    const [locationInventories, setLocationInventories] = useState([])
    const [customers, setCustomers] = useState([])
    const [locations, setLocations] = useState([])

    useEffect(
        () => {

            getLocationInventory()
            .then((allInventories) => {
                setLocationInventories(allInventories)
            })
        },
        []
    )

    useEffect(
        () => {
            getCustomerList()
            .then((allCustomers) => {
                setCustomers(allCustomers)
            })
        },
        []
    )

    useEffect(
        () => {
            getLocationList()
            .then((allLocations) => {
                setLocations(allLocations)
            })
        },
        []
    )

    const productPurchase = (product, currentUser) => {
        const chosenInventory = locationInventories.find(locationInventory => locationInventory.productId === product.id)
        const purchaser = customers.find(customer => customer.userId === currentUser.id)
        const copy = { ...purchase }
        copy.customerId = purchaser.id
        copy.productId = chosenInventory.productId
        copy.locationId = chosenInventory.locationId
        updatePurchase(copy)

    }

    useEffect(
        () => {
            if (purchase.customerId !== 0) {
                newPurchase(purchase)
            }
        },
        [purchase]
    )

    const purchaseButton = (product, kandyUserObject) => {
        if (locationInventories.find(locationInventory => locationInventory.productId === product.id)) {
            return kandyUserObject.staff ? "" : <button onClick={() => productPurchase(product, kandyUserObject)} >Purchase</button>
        }
        else {
            return kandyUserObject.staff ? "" : "Out Of Stock"
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


