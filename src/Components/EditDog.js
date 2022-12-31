import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import EditDogName from "./EditDogName";
import EditDogBreed from "./EditDogBreed";
import EditDogDate from "./EditDogDate";

const EditDog = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const dog = location.state.dog;
    //const url = location.state.url;

    const [oldName, setOldName ] = useState(dog.name)
    const [oldBreed, setOldBreed ] = useState(dog.breed);
    const [oldDate, setOldDate ] = useState(dog.dateOfBirth);

    const handleSubmit= (e) => {
        e.preventDefault();

        // fetch(url, {
        //     method:"PUT",
        //     headers: {"Content-type" : "Application/json"},
        //     body: JSON.stringify(dog)
        // }).then(() => {
        //     navigate("/dogs")
        // })
    }
        
    return (
        <div className="editDog">
            <form onSubmit={ (e) => handleSubmit(e)}>
                <ul>
                    <li>
                        <span>Imię: <b>{ oldName }</b>{ " ==> " }</span>
                        <EditDogName dog={ dog } />
                    </li>
                    <li>
                        <span>Rasa: <b>{ oldBreed }</b> {" ==> "} </span>
                        <EditDogBreed dog={ dog } />    
                    </li>
                    <li>
                        <span>Data urodzenia: <b>{ oldDate.slice(0, 10) }</b> {" ==> "} </span>
                        <EditDogDate dog={ dog } />
                    </li>
                </ul>
                <div className="save"><button>Zapisz</button></div>
            </form>
        </div>
    );
}

export default EditDog;