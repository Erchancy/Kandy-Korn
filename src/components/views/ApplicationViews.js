import { CustomerViews } from "./CustomerViews.js"
import { EmployeeViews } from "./EmployeeViews.js"

export const ApplicationViews = () => {

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    if (kandyUserObject.staff) {
        // Return employee views
        return <EmployeeViews />
    }
    else {
        // Return customer views
        return <CustomerViews />
    }
}

