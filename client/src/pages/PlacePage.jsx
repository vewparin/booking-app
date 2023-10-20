import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) return null;

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-2xl">{place.title}</h1>
            <a className="my-2 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q=' + place.address}>{place.address}</a>
            <div className="grid gap-2 grid-cols-[2fr_1fr] ">
                <div>
                    <img className="aspect-square object-cover" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/09/ab/ab/swimming-pool-our-outdoor.jpg?w=1200&h=-1&s=1" />
                    {/* {place.photos?.[0] && (
                        <img className="aspect-square object-cover max-w-full h-auto" src={`http://localhost:4000/uploads/` + place.photos[0]} />
                    )} */}
                </div>
                <div className="grid">
                    <img className="aspect-square object-cover" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/09/a9/77/stylish-stay-our-accommodation.jpg?w=1200&h=-1&s=1" />
                    <div className="overflow-hidden">
                        <img className="aspect-square object-cover relative top-2" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/96/64/68/stylish-stay-our-accommodation.jpg?w=1200&h=-1&s=1" />
                    </div>
                    {/* {place.photos?.[0] && (
                        <img className="aspect-square object-cover max-w-full h-auto" src={`http://localhost:4000/uploads/` + place.photos[1]} />
                    )} */}
                </div>


            </div>
        </div>

    );
}
