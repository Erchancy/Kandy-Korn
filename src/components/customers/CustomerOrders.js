import { useEffect, useState } from "react"

export const CustomerOrders = () => {
    
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const [currentUser, updateCurrentUser] = useState({})
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            const getCustomers = async() => {
                const response = await fetch("http://localhost:8088/customers?_expand=user")
                const customers = await response.json()
                setCustomers(customers)
            }
            getCustomers()
        },
        []
    )
}