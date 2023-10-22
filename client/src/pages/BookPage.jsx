import { useParams } from "react-router-dom";

export default function BookPage(){
    const {id} = useParams();
    return(
        <div>
            Single Booking: {id}
        </div>
    );
}