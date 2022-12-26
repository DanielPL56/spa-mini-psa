import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Dog from "../Model/Dog";

const NewDog = () => {

    const [ name, setName ] = useState("");
    const [ breed, setBreed ] = useState("");
    const [ dateOfBirth, setDateOfBirth ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const url = "https://localhost:7253/api/Dog";
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const dog = new Dog(name, breed, dateOfBirth);

        fetch(url, { 
            method: "POST",
            headers: { "Content-type" : "Application/json"},
            body: JSON.stringify(dog)
        }).then(() => {
            setIsLoading(false);
            navigate("/dogs");
            console.log(JSON.stringify(dog));
        })

        console.log(dog);
    }

    const handleOnChange = (e) => {

        setDateOfBirth(e.target.value);

        const actualDay = new Date().getDate();
        const actualMonth = new Date().getMonth();
        const actualYear = new Date().getFullYear();

        const actualDate = new Date(actualYear, actualMonth, actualDay + 1);
        const chosenDate = new Date(e.target.value);
        
        if (chosenDate > actualDate) {
            setError("Podaj poprawną datę urodzenia psa");
            setDateOfBirth("");
            return;
        }

        setError(null);
    }

    return (
        <div className="newDog">
            <h2>Dodaj psa</h2>
            <form onSubmit={ handleSubmit }>
                <label>Imię: </label>
                <input type="text" required value={ name } onChange={ (e) => setName(e.target.value) } />

                <label>Rasa: </label>
                <select type="text" required value={ breed } onChange={ (e) => setBreed(e.target.value) }>
                    <option value="York">York</option>
                    <option value="Sznaucer">Sznaucer</option>
                    <option value="Shih-tzu">Shih-tzu</option>
                </select>

                <label>Data urodzenia: </label>
                <input id="dateInput" type="date" required value={ dateOfBirth } onChange={ handleOnChange }/>

                <button>Add</button>
            </form>

            { error && <h2>{ error }</h2>}

        </div>
    );
}

export default NewDog;