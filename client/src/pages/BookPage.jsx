import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import DatesAlbum from "../DatesAlbum";

export default function BookPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null)
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({ _id }) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            });
        }
    }, [id]);

    if (!booking) {
        return '';
    }
    return (
        <div className="mt-10">
            <div className="">
                <h1 className="text-2xl font-bold">{booking.place.title}</h1>
                <h2 className="text-xxl text-gray-500 mt-1">{booking.place.address}</h2>
            </div>
            <div className="my-1">
                <h2 className="font-bold text-2xl">Description</h2>
                {booking.place.description}
            </div>
            <div className="bg-sky-800 text-white p-3 mb-4 rounded-2xl mt-1">
                <h2 className="text-xl font-bold">ข้อมูลการจองของคุณ</h2>
                <div className="mt-2">
                    <DatesAlbum booking={booking} />
                </div>
                <div className="mt-1">
                    <h1>Price: {booking.place.price} Bath</h1>
                </div>
                <div className="pt-2 mt-2">
                    <h1 className="font-bold text-l">สิทธิพิเศษ</h1>
                    {" "+booking.place.perks+" "}
                    </div>
            </div>


        </div>
    );
}