import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import DatesAlbum from "../DatesAlbum";



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
            <div>
                {bookings?.length > 0 && bookings.map(booking => (
                    <Link to={`/account/bookings/${booking._id}`} className="gap-6 bg-gray-800 rounded-1xl overflow-hidden">
                        <div className="bg-sky-100 p-2  rounded-xl gap-5">
                            <div>
                                
                            </div>
                            <div className="py-3 pr-3 grow  ">
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
        </div>

    );
};