import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { editLoyalty } from "../ApiManager"

export const LoyaltyEdit = ({ customerId, customer }) => {

    // This defines the customer state object and allows it to be updated using update
    const [loyaltyId, updateLoyaltyId] = useState({
        loyaltyId: customer.loyaltyId
    })

    // This declares navigate as an invocation of useNavigate
    const navigate = useNavigate()

    // Activates on Save Button Click, saves the edits to the database and returns the employee to the customers page
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const updatedCustomer = {
            id: customer.id,
            userId: parseInt(customerId),
            loyaltyId: loyaltyId.loyaltyId
        }

        // Perform the fetch() PUT to alter the object in the database
        editLoyalty(customer, updatedCustomer)
        .then(() => { navigate("/customers") })
    }

    return (
        <>
            <form className="customerForm">
                <h2 className="customerForm__title">Edit Loyalty Id</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="loyaltyId">Current Loyalty Id: {customer.loyaltyId}</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            value={loyaltyId.loyaltyId}
                            onChange={
                                (evt) => {
                                    const copy = {...customer }
                                    copy.loyaltyId = parseInt(evt.target.value)
                                    updateLoyaltyId(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save
                </button>
            </form>
        </>
    )
}