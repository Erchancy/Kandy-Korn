import { useEffect, useState } from "react"
import "./Locations.css"
import { getLocationList } from "../ApiManager"

export const LocationList = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            getLocationList()
            .then((locations) => {
                setLocations(locations)
        })},
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
