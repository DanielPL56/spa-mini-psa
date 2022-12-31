import { useState } from 'react';

const EditDogDate = ({ dog }) => {

    const [error, setError ] = useState(null);
    const [newDate, setNewDate ] = useState(dog.dateOfBirth);

    const handleOnChange = (e) => {

        const value = e.target.value;

        const actualDay = new Date().getDate();
        const actualMonth = new Date().getMonth();
        const actualYear = new Date().getFullYear();

        const actualDate = new Date(actualYear, actualMonth, actualDay + 1);
        const chosenDate = new Date(value);
        
        if (chosenDate > actualDate) {
            setError('Podaj poprawną datę urodzenia psa');
            setNewDate('');
            return;
        }

        setError(null);
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