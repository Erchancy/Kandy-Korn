import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import { useNavigate } from "react-router-dom"
import "./CustomerList.css"

// This function creates the Customers state as an empty array, observes its initial render, fetches the user data where isStaff property is true
// and changes the array using setCustomers to reflect the fetched data
// Then it returns JSX by mapping the Customers array and invoking the Customer component, passing a key, id, fullName, and email as a prop
export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            const getCustomerList = async() => {
                const response = await fetch("http://localhost:8088/customers?_expand=user")
                const customers = await response.json()
                setCustomers(customers)
            }
            getCustomerList()
        },
        []
    )

    const navigate = useNavigate()

    return <article className="customers">
        {
            customers.map(customer => <Customer key={`customer--${customer.id}`}
                id={customer?.user?.id}
                fullName={customer?.user?.name}
                email={customer?.user?.email} />)
        }
    </article>
}