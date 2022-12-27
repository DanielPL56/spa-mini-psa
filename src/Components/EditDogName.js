import { useState } from "react";

const EditDogName = ({dog}) => {

    const [newName, setNewName ] = useState(dog.name);
    const [oldName, setOldName ] = useState(dog.name)

    const handleChange = (value) => {
        setNewName(value);
        dog.name = value;
    }

    return (
        <div className="editDogName">
            <label>Imię: <b>{ oldName }</b>{ " ==> " }</label>
            <input type="text" value={ newName } onChange={ (e) => { handleChange(e.target.value) } } />
            <label>Nowe imię: <b>{ newName }</b></label>
        </div>
    );
}

export default EditDogName;