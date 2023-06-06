import { useEffect, useState } from "react"
import { getCustomerList, getPurchases } from "../ApiManager"

export const CustomerOrders = () => {

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const [customers, setCustomers] = useState([])
    const [purchases, setPurchases] = useState([])
    const [filteredPurchases, filterPurchases] = useState([])

    useEffect(
        () => {
            getCustomerList()
            .then((customers) => {
                setCustomers(customers)
            })
        },
        []
    )

    useEffect(
        () => {
            getPurchases()
            .then((allPurchases) => {
                setPurchases(allPurchases)
            })
        },
        []
    )

    useEffect(
        () => {
            const findPurchases = purchases.filter((purchase) => { return purchase.customerId === currentUser.id })
            filterPurchases(findPurchases)
        },
        [purchases]
    )

    const currentUser = customers.find(customer => customer.userId === kandyUserObject.id)

    return <>
        <ul>
            {
                filteredPurchases.map((purchase) => (
                    <li className="purchase_item" key={`purchase-${purchase.id}`}>
                        {purchase.product.name} ${purchase.product.price}
                    </li>
                ))
            }
        </ul>
    </>

}