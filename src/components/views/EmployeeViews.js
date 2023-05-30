import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/Locations"
import { ProductList } from "../products/ProductList"
import { ProductForm } from "../products/ProductForm"
import { EmployeeList } from "../employees/EmployeeList"
import { HireEmployeeForm } from "../employees/HireEmployeeForm"

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
            </Route>
        </Routes>
    )
}

