import { useState } from 'react';

const EditDogName = ({ dog }) => {

    const [newName, setNewName ] = useState(dog.name);
    
    const handleChange = (value) => {
        setNewName(value);
        dog.name = value;
    }

    return (
        <span>
            <input type='text' required value={newName} onChange={(e) => {handleChange(e.target.value)}} />
        </span>
    );
}

export default EditDogName;