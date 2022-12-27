import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dog from "../Model/Dog";
import EditDogBreed from "./EditDogBreed";
import EditDogName from "./EditDogName";
import EditDogDate from "./EditDogDate";

const NewDog = () => {

    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const url = "https://localhost:7253/api/Dog";
    const navigate = useNavigate();

    const newDog = new Dog("", "", "");

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        fetch(url, { 
            method: "POST",
            headers: { "Content-type" : "Application/json"},
            body: JSON.stringify(newDog)
        }).then((response) => {
            if(response.ok){
                setIsLoading(false);
                navigate("/dogs");
                setError(null);
            }
            setError("Something gone wrong")
        }).catch((err) => {
            setError(err.message);
            setIsLoading(false);
        })
    }

    return (
        <div className="newDog">
            <h2>Dodaj psa</h2>
            <form onSubmit={ handleSubmit }>
                <EditDogName dog={ newDog } />
                <EditDogBreed dog={ newDog } />
                <EditDogDate dog={ newDog } />
                <div><button>Zapisz</button></div>
            </form>

            { error && <h2>{ error }</h2>}
            { isLoading && <h2>Wczytywanie...</h2>}
        </div>
    );
}

export default NewDog;