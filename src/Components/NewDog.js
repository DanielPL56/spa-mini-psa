import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Dog from "../Model/Dog";
import EditDogBreed from "./EditDogBreed";
import EditDogName from "./EditDogName";
import EditDogDate from "./EditDogDate";
import DogManager from "../services/api/DogManager";

const NewDog = () => {
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const newDog = new Dog("", "-", "");

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(newDog.breed === "-") {
            setIsLoading(false);
            setError("Wybierz rasę");
            setTimeout(() => window.location.reload(), 1000);
        }
        else {
            const { isLoading, error, okStatus } = await DogManager.addDog(newDog);
            setIsLoading(isLoading);
            
            if (okStatus === true) navigate('/dogs');
            else setError(error);
        }
    }

    return (
        <div className="newDog">
            <h2>Dodaj psa</h2>
            <form onSubmit={handleOnSubmit}>
                <ul>
                    <li><EditDogName dog={ newDog } /></li>
                    <li><EditDogBreed dog={ newDog } /></li>
                    <li><EditDogDate dog={ newDog } /></li>
                </ul>
                <div><button>Zapisz</button></div>
            </form>

            { error && <h2 className="error">{ error }</h2>}
            { isLoading && <h2>Wczytywanie...</h2>}
        </div>
    );
}

export default NewDog;