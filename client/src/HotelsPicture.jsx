import Image from "./Image.jsx";

export default function PlaceImg({ place, index = 0, className = null }) {
    if (!place.photos?.length) {
        return '';
    }
    if (!className) {
        className = 'object-cover';
    }
    return (
        <Image className={className} src={place.photos[index]} alt="" />
    );
}
// export default function HotelsPicture(place, index = 0, className = null) {
//     if (!place.photos?.length) {
//         return '';
//     }
//     if (!className) {
//         className = 'object-cover';
//     }
//     return (
//         <img className={className} src={'http://localhost:4000/uploads/' + place.photos[index]} alt="" />
//     );
// }