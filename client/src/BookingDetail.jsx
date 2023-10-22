import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from 'date-fns';
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
export default function BookingDetail({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user])

    let numberOfDays = 0;
    if (checkIn && checkOut) {
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }
    async function bookingPlaces() {
        const response = await axios.post('/bookings', {
            checkIn, checkOut, numberOfGuests, name, telephone,
            place: place._id, price: numberOfGuests * place.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }


    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: {place.price} บาท / ต่อคืน
            </div>

            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>Check-in: </label>
                        <input type="date" value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check-out: </label>
                        <input type="date" value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className="py-3 px-4 border-l">
                    <label>จำนวนผู้เข้าพัก: </label>
                    <input type="number" value={numberOfGuests}
                        onChange={ev => setNumberOfGuests(ev.target.value)} />
                </div>
                {numberOfDays > 0 && (
                    <div className="py-3 px-4 border-l">
                        <label>ชื่อของคุณ</label>
                        <input type="text" value={name}
                            onChange={ev => setName(ev.target.value)} />
                        <label>เบอร์โทรศัพท์</label>
                        <input type="tel" value={telephone}
                            onChange={ev => setTelephone(ev.target.value)} />
                    </div>
                )}
            </div>
            <button onClick={bookingPlaces} className="primary mt-2">
                จองเลย {" "}
                {numberOfDays > 0 && (
                    <span>{numberOfDays * place.price} BATH</span>
                )}
            </button>
        </div>
    );
}