import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/Locations"
import { ProductList } from "../products/ProductList"
import { ProductForm } from "../products/ProductForm"
import { EmployeeList } from "../employees/EmployeeList"
import { HireEmployeeForm } from "../employees/HireEmployeeForm"
import { CustomerList } from "../customers/CustomerList"
import { CustomerDetails } from "../customers/CustomerDetails"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
					<Outlet />
                </>
            }>
                <Route path="locations" element={ <LocationList /> } />
				<Route path="products" element={ <ProductList /> } />
				<Route path="product/create" element={ <ProductForm /> } />
                <Route path="employees" element={ <EmployeeList /> } />
                <Route path="employee/hire" element={ <HireEmployeeForm /> } />
                <Route path="customers" element={ <CustomerList /> } />
                <Route path="customer/:customerId" element={ <CustomerDetails /> } />
            </Route>
        </Routes>
    )
}

