import axios from "axios";
import { useEffect, useState } from "react";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });
    }, []);
    // console.log('Places:', places);
    return (
        // <div>
        //     {places.length > 0 && places.map(place => (
        //         <div key={place._id}>
        //             <div key={place._id} className="bg-gray-500">
        //                 {place.photos?.[0] && (
        //                     <img src={'http://localhost:4000/api/uploads/' + places.photos?.[0]} alt="" />
        //                 )}
        //             </div>
        //             {place.title}
        //         </div>
        //     ))}
        // </div>
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
        <div>
            {places.length > 0 && places.map(place => {
                console.log('Current Place:', place);

                const photos = place.photos || []; // ถ้า place.photos เป็น undefined ให้ใช้ [] เป็นค่าเริ่มต้น

                if (photos.length > 0) {
                    const imageUrl = 'http://localhost:4000/uploads/' + photos[0];
                    console.log('Image URL:', imageUrl);

                    return (
                        <div key={place._id}>
                            <div className="bg-gray-500">
                                <img src={imageUrl} alt="" />
                            </div>
                            {place.title}
                        </div>
                    );
                } else {
                    return (
                        <div key={place._id}>
                            No picture
                        </div>
                    );
                }
            })}
        </div>




    );

}   