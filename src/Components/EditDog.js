import { useLocation, useNavigate } from "react-router-dom";
import EditDogName from "./EditDogName";
import EditDogBreed from "./EditDogBreed";
import EditDogDate from "./EditDogDate";

const EditDog = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const dog = location.state.dog;
    const url = location.state.url;

    const handleSubmit= (e) => {
        e.preventDefault();

        fetch(url, {
            method:"PUT",
            headers: {"Content-type" : "Application/json"},
            body: JSON.stringify(dog)
        }).then(() => {
            navigate("/dogs")
        })
    }
        
    return (
        <div className="editDog">
            <form onSubmit={ (e) => handleSubmit(e)}>
                <EditDogName dog={ dog } />
                <EditDogBreed dog={ dog } />
                <EditDogDate dog={ dog } />
                <div className="editDogButton"><button>Zapisz</button></div>
            </form>
        </div>
    );
}

export default EditDog;