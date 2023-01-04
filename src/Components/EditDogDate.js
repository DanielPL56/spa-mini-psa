import { useState } from 'react';
import { dateIsValid } from '../services/functions/dateIsValid';

const EditDogDate = ({ dog }) => {

    const [error, setError ] = useState(null);
    const [newDate, setNewDate ] = useState(dog.dateOfBirth);

    const handleOnChange = (e) => {
        const value = e.target.value;
        const chosenDate = new Date(value);

        if (dateIsValid(chosenDate)) setError(null);
        else {
            setError('Podaj poprawną datę');
            setNewDate('');
            return;
        }

        setNewDate(value);
        dog.dateOfBirth = value;
    };

    return (
        <span>
            <input type='date' required value={newDate.slice(0, 10)} onChange={handleOnChange}/>
            {error && <h2 className='error'>{error}</h2>}
        </span>
    );
}

export default EditDogDate;