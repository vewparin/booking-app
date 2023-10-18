import axios from "axios";
import { useEffect, useState } from "react";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces([...response.data, ...response.data, ...response.data]);
        });
    }, []);
    // console.log('Places:', places);
    return (
        <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <div key={place._id}>
                    <div className="bg-gray-500 mb-2 rounded-2xl flex">
                        <img className="rounded-2xl object-cover aspect-square" src="https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" />
                        {/* {place.photos?.[0] && (
                            <img src={'http://localhost:4000/api/uploads/' + place.photos?.[0]} alt="" />
                        )} */}
                    </div>
                    <h2 className="font-bold">{place.address}</h2>
                    <h3 className="text-sm text-gray-500">{place.title}</h3>
                    <div className="mt-1">
                        <span className="font-bold">{place.price} ฿ per night</span>
                    </div>
                </div>
            ))}
        </div>
        // <div>
        //     {places.length > 0 && places.map(place => {
        //         console.log('Current Place:', place); // Log the current place object
        //         console.log('Image URL:', 'http://localhost:4000/uploads/' + place.photos?.[0]); // Log the generated image URL

        //         return (
        //             <div key={place._id}>
        //                 <div className="bg-gray-500">
        //                     {place.photos?.[0] && (
        //                         <img src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="" />
        //                     )}
        //                 </div>
        //                 {place.title}
        //             </div>
        //         );
        //     })}
        // </div>
        // <div>
        //     {places.length > 0 && places.map(place => {
        //         console.log('Current Place:', place);

        //         const photos = place.photos || []; // ถ้า place.photos เป็น undefined ให้ใช้ [] เป็นค่าเริ่มต้น

        //         if (photos.length > 0) {
        //             const imageUrl = 'http://localhost:4000/uploads/' + photos[0];
        //             console.log('Image URL:', imageUrl);

        //             return (
        //                 <div key={place._id}>
        //                     <div className="bg-gray-500">
        //                         <img src={imageUrl} alt="" />
        //                     </div>
        //                     {place.title}
        //                 </div>
        //             );
        //         } else {
        //             return (
        //                 <div key={place._id}>
        //                     No picture
        //                 </div>
        //             );
        //         }
        //     })}
        // </div>




    );

}   