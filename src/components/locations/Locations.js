import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Locations.css"

export const LocationList = () => {
    const [locations, setLocations] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            const getLocations = async() => {
                const response = await fetch("http://localhost:8088/locations")
                const locations = await response.json()
                setLocations(locations)
            }
            getLocations()
        },
        []
    )

    return <>
    <ul className="location_list">
        {
            locations.map((location) => { 
                return <li className="location_item" key={`location-${location.id}`}>{`${location.address}
                ${location.squareFt} square feet`}</li>
            })
        }
    </ul>
</>  

}
