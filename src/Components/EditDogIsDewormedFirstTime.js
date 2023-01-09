import { useEffect, useState } from "react";
import { dateIsValid } from "../services/functions/dateIsValid";

const EditDogIsDewormedFirstTime = ({ dog }) => {
    const [error, setError] = useState(null);
    const [isDewormedFirstTime, setIsDewormedFirstTime] = useState(false);
    const [date, setDate] = useState('');
    
    useEffect(() => {
        if (dog.isDewormedFirstTime !== null) setIsDewormedFirstTime(dog.isDewormedFirstTime)
        if (dog.dateOfFirstDeworming !== null) setDate(dog.dateOfFirstDeworming.slice(0, 10));
        if (dog.isDewormedFirstTime === false) dog.dateOfFirstDeworming = null;
    }, [])

    const handleOnCheckboxChange = () => {
        const isDewormed = !isDewormedFirstTime;
        setIsDewormedFirstTime(isDewormed);
        dog.isDewormedFirstTime = isDewormed;

        if (dog.isDewormedFirstTime === false) dog.dateOfFirstDeworming = null;
    }

    const handleOnDateChange = (e) => {
        const value = e.target.value;
        const chosenDate = new Date(value);
        const dogBirthDate = new Date(dog.dateOfBirth);

        if (dateIsValid(chosenDate) && chosenDate > dogBirthDate) setError(null);
        else {
            setError('Podaj poprawną datę');
            setDate('');
            return;
        }

        setDate(value);
        dog.dateOfFirstDeworming = value;
    }

    return (
        <span>
            Czy pies jest odrobaczony: <input type='checkbox' checked={isDewormedFirstTime} onChange={handleOnCheckboxChange} />
            {dog.isDewormedFirstTime && 
            <span>{'Podaj datę odrobaczenia '}
            <p><input id="input" type='date' required value={date} onChange={handleOnDateChange} />
            {error && <span className='error'>{error}</span>}</p>
            </span>}
        </span>
        
    );
}

export default EditDogIsDewormedFirstTime;