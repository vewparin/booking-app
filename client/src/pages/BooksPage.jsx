import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import DatesAlbum from "../DatesAlbum";
import AlbumFooters from "../AlbumFooters";



export default function BooksPage() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });
    }, [])
    return (
        <div>
            <AccountNav />
            <div className="flex flex-wrap gap-3">
                {bookings?.length > 0 && bookings.map(booking => (
                    <Link to={`/account/bookings/${booking._id}`} className="rounded-1xl overflow-hidden">
                        <div className="bg-sky-800 p-2  rounded-xl gap-5">
                            <div className="py-3 pr-3 grow text-white">
                                <h2 className="font-bold text-xl">{booking.place.title}</h2>
                                <div className="mt-2">
                                    <DatesAlbum booking={booking} />
                                </div>
                                <div>
                                    จำนวนวันที่พัก: {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} คืน <br />
                                    ราคาทั้งหมด: {booking.price} Bath
                                </div>
                            </div>
                        </div>

                    </Link>
                ))}
            </div>
            <AlbumFooters />
        </div>
    );
};