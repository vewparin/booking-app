import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });
    }, []);
    return (
        <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <Link to = {'/place/'+ place._id}>
                <div key={place._id}>
                    <div className="bg-gray-500 mb-2 rounded-2xl flex">
                    <img className="" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/09/ab/ab/swimming-pool-our-outdoor.jpg?w=1200&h=-1&s=1" />
                        {/* {place.addedPhotos?.[0] && (
                            <img src={'http://localhost:4000/api/uploads/' + place.addedPhotos?.[0]} alt="" />
                        )} */}
                    </div>
                    <h2 className="font-bold">{place.address}</h2>
                    <h3 className="text-sm text-gray-500">{place.title}</h3>
                    <div className="mt-1">
                        <span className="font-bold">{place.price} ฿ per night</span>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    );

}   