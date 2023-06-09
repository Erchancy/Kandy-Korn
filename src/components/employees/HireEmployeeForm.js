import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { newEmployee, newUser, getLocationList, getUserList } from "../ApiManager"

export const HireEmployeeForm = () => {

    const [user, updateUser] = useState({
        name: "",
        isStaff: true
    })

    const [employee, updateEmployee] = useState({
        userId: 0,
        startDate: "",
        payRate: 0,
        locationId: 0
    })

    const [locations, setLocations] = useState([])
    const [users, setUsers] = useState([])

    useEffect(
        () => {
            getLocationList()
                .then((locations) => {
                    setLocations(locations)
                })
        },
        []
    )

    useEffect(
        () => {
            getUserList()
                .then((users) => {
                    setUsers(users)
                })
        },
        []
    )

    const getLocationOptions = () => {
        return locations.map((location) => (
            <div className="form-group" key={location.id}>
                <label htmlFor={location.address}>{location.address}</label>
                <input
                    required
                    autoFocus
                    type="radio"
                    name="location"
                    placeholder="The kind of product"
                    value={location.id}
                    onChange={(evt) => {
                        const copy = { ...employee };
                        copy.locationId = evt.target.value;
                        updateEmployee(copy);
                    }}
                />
            </div>
        ));
    };


    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        newUser(user)
            .then((createdUser) => {
                const copy = { ...employee };
                copy.userId = createdUser.id;
                updateEmployee(copy)
            })
    }

    useEffect(
        () => {
            if (employee.userId !== 0) {
                newEmployee(employee)
                    .then(() => {
                        navigate("/employees")
                    })
            }
        },
        [employee]
    )



    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="The name of the employee"
                        value={user.name}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.name = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locations">Location:</label>
                </div>
                {
                    getLocationOptions()
                }
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="The date they are to start on"
                        value={employee.startDate}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.startDate = evt.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="payRate">Pay Rate:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="The employee's pay rate"
                        value={employee.payRate}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.payRate = evt.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Form
            </button>
        </form>
    )
}