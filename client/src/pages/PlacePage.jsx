import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingDetail from "../bookingDetail";
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
            <div className="relative">
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

            <button className="flex gap-1 absolute bottom-10 right-8 py-2 px-6 bg-white rounded-2xl border border-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Show more photos
            </button>

            <div className="mt-9 grid gap-3 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-bold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn}<br />
                    Check-out: {place.checkOut}<br />
                    สามารถเข้าพักได้ทั้งหมด: {place.maxGuests} คน
                    <div>
                        <h2 className="mt-5 text-bold text-2xl"> ข้อมูลเพิ่มเติม</h2>
                    </div>
                    <div className="">{place.extraInfo}</div>
                </div>
                <div>
                    <BookingDetail place={place}/>
                </div>
            </div>
        </div>



    );
}
