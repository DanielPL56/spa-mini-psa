import { useState } from "react";
import useFetch from "../Functions/useFetch";

const EditDogBreed = ({dog}) => {

    const [newBreed, setNewBreed ] = useState(dog.breed);
    const [oldBreed, setOldBreed ] = useState(dog.breed);

    const url = "https://localhost:7253/api/breed";
    const { data: breeds } = useFetch(url);
    
    const handleChange = (value) => {
        setNewBreed(value);
        dog.breed = value;
    }

    return (
        <div className="editDogBreed">
            <label>Rasa: <b>{ oldBreed }</b> {" ==> "} </label>
            <select type="text" value={ newBreed } onChange={ (e) => handleChange(e.target.value) }>
                { breeds && breeds.map((b) => (
                    <option key={ b.id } value={ b.name }>{ b.name }</option>
                ))}
            </select>
            <label>Nowa rasa: <b>{ newBreed }</b></label>
        </div>
    );
}

export default EditDogBreed;