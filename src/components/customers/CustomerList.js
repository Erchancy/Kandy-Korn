import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import "./CustomerList.css"
import { getCustomerList, getPurchases } from "../ApiManager"

// This function creates the Customers state as an empty array, observes its initial render, fetches the user data where isStaff property is true
// and changes the array using setCustomers to reflect the fetched data
// Then it returns JSX by mapping the Customers array and invoking the Customer component, passing a key, id, fullName, and email as a prop
export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const [purchases, setPurchases] = useState([])


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
                .then((purchases) => {
                    setPurchases(purchases)
                })
        },
        []
    )

    return <article className="customers">
        {customers
            .map((customer) => ({
                ...customer,
                numberOfPurchases: purchases.filter((purchase) => purchase.customerId === customer.id).length,
            }))
            .sort((a, b) => b.numberOfPurchases - a.numberOfPurchases)
            .map((customer) => (
                <Customer
                    key={`customer--${customer.id}`}
                    id={customer?.user?.id}
                    fullName={customer?.user?.name}
                    email={customer?.user?.email}
                    customerId={customer.id}
                    purchases={purchases}
                />
            ))}
    </article>
}

