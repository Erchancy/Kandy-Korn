export const getSingleCustomer = async (customerId) => {
    const response = await fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
    const data = await response.json()
    const singleCustomer = data[0]
    return singleCustomer
}

export const getCustomerList = async () => {
    const response = await fetch("http://localhost:8088/customers?_expand=user")
    const customers = await response.json()
    return customers
}

export const getPurchases = async () => {
    const response = await fetch("http://localhost:8088/purchases?_expand=product")
    const allPurchases = await response.json()
    return allPurchases
}

export const editLoyalty = (customer, updatedCustomer) => {
    return fetch(`http://localhost:8088/customers/${customer.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedCustomer)
    })
        .then(response => response.json())
}

export const deleteEmployee = (id, userId) => {
    return fetch(`http://localhost:8088/employees/${id}`, {
        method: "DELETE"
    })
        .then(fetch(`http://localhost:8088/users/${userId}`, {
            method: "DELETE"
        }))
}

export const getEmployeeList = async () => {
    const response = await fetch("http://localhost:8088/employees?_expand=location&_expand=user")
    const employees = await response.json()
    return employees
}

export const getLocationList = async () => {
    const response = await fetch("http://localhost:8088/locations")
    const locations = await response.json()
    return locations
}

export const getUserList = async () => {
    const response = await fetch("http://localhost:8088/users")
    const users = await response.json()
    return users
}

export const newUser = (user) => {
    return fetch(`http://localhost:8088/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
}

export const newEmployee = (employee) => {
    return fetch(`http://localhost:8088/employees`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    })
        .then(response => response.json())

}

export const getLocationInventory = async () => {
    const response = await fetch(`http://localhost:8088/locationInventory?_expand=product`)
    const allInventories = await response.json()
    return allInventories
}

export const newPurchase = (purchase) => {
    return fetch(`http://localhost:8088/purchases`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(purchase)
    })
        .then(response => response.json())
}

export const createProduct = (newProduct) => {
    return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        .then(response => response.json())
}

export const getProducts = async () => {
    const response = await fetch("http://localhost:8088/products?_expand=productType&_sort=name")
    const products = await response.json()
    return products
}