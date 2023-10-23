import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlbumHeader from "../AlbumHeader";
import AlbumFooters from "../AlbumFooters";
import CarouselAlbum from "../CarouselAlbum";


export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });
    }, []);
    return (
        <div className="mt-5">
            <div className="relative">
                <CarouselAlbum />
            </div>
            <div className="absolute top-10">
                <div className="text-white">
                    <AlbumHeader />
                </div>
            </div>

            <h1 className=" mt-2 text-bold text-xl bg-sky-900 text-white p-3 rounded-xl">LIST HOTEL</h1>
            <div className="mt-1 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {places.length > 0 && places.map(place => (
                    <Link to={'/place/' + place._id}>
                        <div key={place._id}>
                            <div className="bg-gray-800 mb-2 rounded-2xl flex">
                                {place.addedPhotos?.[0] && (
                                    <img className="w-full h-full" src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="" />
                                )}
                            </div>
                            <div className=" h-[300px] bg-sky-800 bg-opacity-89 text-white p-4 rounded-2xl flex flex-col justify-between">
                                <div>
                                    <h2 className="font-bold">{place.address}</h2>
                                    <h3 className="text-sm text-gray-500 text-white mt-2">{place.title}</h3>
                                    <div className="mt-1">
                                        <span className="font-bold">{place.price} ฿ per night</span>
                                    </div></div>
                                <button className="mt-4 text-white p-2  bg-sky-500 rounded-2xl">จองเลย Click</button>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
            <AlbumFooters />
        </div>
    );

}   