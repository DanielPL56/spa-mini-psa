import { useState } from "react";

const EditDogDate = ({dog}) => {

    const [error, setError ] = useState(null);
    const [newDate, setNewDate ] = useState(dog.dateOfBirth);
    const [oldDate, setOldDate ] = useState(dog.dateOfBirth);
    

    const handleOnChange = (e) => {

        const value = e.target.value;

        const actualDay = new Date().getDate();
        const actualMonth = new Date().getMonth();
        const actualYear = new Date().getFullYear();

        const actualDate = new Date(actualYear, actualMonth, actualDay + 1);
        const chosenDate = new Date(value);
        
        if (chosenDate > actualDate) {
            setError("Podaj poprawną datę urodzenia psa");
            setNewDate("");
            return;
        }

        setError(null);
        setNewDate(value);
        dog.dateOfBirth = value;
    };

    return (
        <div className="editDogDate">
            <label>Data urodzenia: <b>{ oldDate.slice(0, 10) }</b> {" ==> "} </label>
            <input type="date" value={ newDate.slice(0, 10) } onChange={ handleOnChange }/>
            <label>Nowa data urodzenia: <b>{ newDate.slice(0, 10) }</b></label>

            { error && <h2>{ error }</h2>}
        </div>
    );
}

export default EditDogDate;