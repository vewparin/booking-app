import PhotosUploader from "../PhotosUploader";
import Perk from "../Perks";
import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
export default function PlacesFormPage() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price,setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) {
        return (
            <h2 className="text-gray-500 text-sm">{text}</h2>
        );
    }
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }
    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests,price
        };
        if (id) {
            //update
            await axios.put('/places', {
                id, ...placeData

            });
            setRedirect(true);
        } else {
            //new places
            await axios.post('/places', placeData);
            setRedirect(true);
        }

    }
    if (redirect) {
        return <Navigate to={'/account/places'} />
    }
    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'เพิ่มชื่อ Title')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="โรงแรม Avani ... " />
                {preInput('Address', 'ที่อยู่ของโรมแรม')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                {preInput('Photos','')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput('รายละเอียด', 'รายละเอียดเพิ่มเติม หรือ ข้อมูลของโรงแรม')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                {preInput('สิ่งอำนวยความสะดวก', 'Select all the perks of your Place')}
                <div className="mt-1 flex flex-wrap justify-around">
                    <Perk selected={perks} onChange={setPerks} />
                </div>
                {preInput('ข้อมูลเพิ่มเติม', 'เช่น กฎระเบียบของโรงแรม etc.')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                {preInput('check in and check out', 'เพิ่มเวลาเข้าและออกแล้วจำนวนผู้เข้าพักสูงสุด')}
                <div className="mt-2 flex flex-wrap justify-around">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in Time.</h3>
                        <input type="text"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                            placeholder="14" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out Time.</h3>
                        <input type="text"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                            placeholder="11" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">จำนวนผู้เข้าพักสูงสุด</h3>
                        <input type="number"
                            value={maxGuests}
                            onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">ราคาต่อคืน</h3>
                        <input type="number"
                            value={price}
                            onChange={ev => setPrice(ev.target.value)} />
                    </div>
                </div>
                <button className="primary mt-4">Save</button>
            </form>
        </div>
    );
}