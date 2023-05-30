// This function takes the object with properties id, fullname, and email as a parameter and returns JSX containing the employee name as a link and the employee email
export const Employee = ({ id, fullName, location, startDate, payRate }) => {
    return <section className="employee">
                    <div>Name: {fullName}</div>
                    <div>Location: {location}</div>
                    <div>Start Date: {startDate}</div>
                    <div>Pay Rate per Hour: {payRate}</div>
                </section>
}