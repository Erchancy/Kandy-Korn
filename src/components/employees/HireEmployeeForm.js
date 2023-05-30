import { useEffect, useState, useSyncExternalStore } from "react"
import { useNavigate, useResolvedPath } from "react-router-dom"

export const HireEmployeeForm = () => {

    const [user, updateUser] = useState({
        name: "",
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
            const getLocationList = async() => {
                const response = await fetch("http://localhost:8088/locations")
                const locations = await response.json()
                setLocations(locations)
            }
            getLocationList()
        },
        []
    )

    useEffect(
        () => {
            const getUserList = async() => {
                const response = await fetch("http://localhost:8088/users")
                const users = await response.json()
                setUsers(users)
            }
            getUserList()
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

        const newUser = {
            name: user.name,
            isStaff: true
        }

        const newEmployee = {
            userId: users.length+1,
            startDate: employee.startDate,
            payRate: employee.payRate,
            locationId: employee.locationId
        }

        fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())

        return fetch(`http://localhost:8088/employees`, {
               method: "POST",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify(newEmployee)
           })
           .then(response => response.json())
           .then(() => {
           navigate("/employees")
       })
    }

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
                                const copy = {...user}
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
                                const copy = {...employee}
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
                                const copy = {...employee}
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
    )}