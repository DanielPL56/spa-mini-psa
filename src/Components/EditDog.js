import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import EditDogName from "./EditDogName";
import EditDogBreed from "./EditDogBreed";
import EditDogDate from "./EditDogDate";

const EditDog = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const dog = location.state.dog;
    const url = location.state.url;

    const [oldName, setOldName ] = useState(dog.name)
    const [oldBreed, setOldBreed ] = useState(dog.breed);
    const [oldDate, setOldDate ] = useState(dog.breed);

    const handleSubmit= (e) => {
        e.preventDefault();

        fetch(url, {
            method:"PUT",
            headers: {"Content-type" : "Application/json"},
            body: JSON.stringify(dog)
        }).then(() => {
            navigate("/dogs")
        })
    }
        
    return (
        <div className="editDog">
            <form onSubmit={ (e) => handleSubmit(e)}>

                <div className="editDogName">
                    <label>Imię: <b>{ oldName }</b>{ " ==> " }</label>
                    <EditDogName dog={ dog } />
                </div>
                
                <div className="editDogBreed">
                    <label>Rasa: <b>{ oldBreed }</b> {" ==> "} </label>
                    <EditDogBreed dog={ dog } />
                </div>

                <div className="editDogDate">
                    <label>Data urodzenia: <b>{ oldDate.slice(0, 10) }</b> {" ==> "} </label>
                    <EditDogDate dog={ dog } />
                </div>

                <div className="editDogButton"><button>Zapisz</button></div>
            </form>
        </div>
    );
}

export default EditDog;