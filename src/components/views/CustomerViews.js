import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/Locations"
import { ProductList } from "../products/ProductList"
import { ProductSearch } from "../products/ProductSearch"
import { ProductContainer } from "../products/ProductContainer"
import { CustomerOrders } from "../customers/CustomerOrders"

export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
					<Outlet />
                </>
            }>
                <Route path="locations" element={ <LocationList /> } />
                <Route path="products" element={ <ProductList /> } />
                <Route path="search" element={ <ProductContainer /> } />
                <Route path="orders" element={ <CustomerOrders /> } />
            </Route>
        </Routes>
    )
}

