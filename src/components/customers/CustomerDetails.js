import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { LoyaltyEdit } from "./LoyaltyEdit"
import { getSingleCustomer } from "../ApiManager"


// This function creates CustomerId state through useParam to dynamically fill the object depending on the currrent url route?
// Then it creates Customer state and sets it as an empty object
// It then observes the CustomerId state and whenever it changes fetches the Customer, CustomerTickets, and user data of the Customer with CustomerId matching the userId
// Finally it returns JSX of the Customer name, email, specialty, rate, and number of active tickets using the optional chaining operator to avoid null/undefined errors
export const CustomerDetails = () => {
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState({})

    useEffect(
        () => {
            getSingleCustomer(customerId)
            .then((singleCustomer) => {
                updateCustomer(singleCustomer)
            })
        },
        [customerId]
    )

    return <section className="customer__details">
    <header className="customer__header">{customer?.user?.name}</header>
    <div>Email: {customer?.user?.email}</div>
    <LoyaltyEdit customerId={customerId} customer={customer}/>
    <footer></footer>
</section>
}