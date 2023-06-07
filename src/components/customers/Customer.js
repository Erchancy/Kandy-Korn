import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// This function takes the object with properties id, fullname, and email as a parameter and returns JSX containing the customer name as a link and the customer email
export const Customer = ({ id, fullName, email, purchases, customerId }) => {

    const findPurchases = purchases.filter((purchase) => { return purchase.customerId === customerId })

    return <section className="customer" id={findPurchases.length}>
        <div>
            <div>
                <Link to={`/customer/${id}`}>Name: {fullName}</Link>
            </div>
            <div>Email: {email}</div>
        </div>
        <div>
            <dt className="customer__candiesBought">Candies Bought</dt>
            <dd>{findPurchases.length}</dd>
        </div>
    </section>
}