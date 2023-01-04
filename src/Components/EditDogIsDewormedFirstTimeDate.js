import { useEffect, useState } from "react";

const EditDogIsDewormedFirstTimeDate = ({ dog }) => {
    const [error, setError] = useState(null);
    const [date, setDate] = useState(dog.DateOfFirstDeworming);
    console.log(dog.DateOfFirstDeworming);
    console.log(date);

    const handleOnChange = (e) => {

        const value = e.target.value;
        setDate(value);

        // const actualDay = new Date().getDate();
        // const actualMonth = new Date().getMonth();
        // const actualYear = new Date().getFullYear();

        // const actualDate = new Date(actualYear, actualMonth, actualDay + 1);
        // const chosenDate = new Date(value);
        
        // if (chosenDate > actualDate) {
        //     setError('Podaj poprawną datę urodzenia psa');
        //     return;
        // }

        setError(null);
        dog.DateOfFirstDeworming = value;
    };

    return (
        <span>{'Chcesz podac date odrobaczenia? ==> '}
            <input type='date' value={date} onChange={handleOnChange}/>
            {error && <h2 className='error'>{error}</h2>}
        </span>
    );
}

export default EditDogIsDewormedFirstTimeDate;