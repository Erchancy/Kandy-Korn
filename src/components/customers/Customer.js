import { Link } from "react-router-dom"

// This function takes the object with properties id, fullname, and email as a parameter and returns JSX containing the customer name as a link and the customer email
export const Customer = ({ id, fullName, email }) => {
    return <section className="customer">
                    <div>
                        <Link to={`/customer/${id}`}>Name: {fullName}</Link>
                    </div>
                    <div>Email: {email}</div>
                </section>
}