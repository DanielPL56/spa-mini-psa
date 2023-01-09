import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditDogBreed from './EditDogBreed';
import EditDogName from './EditDogName';
import EditDogDate from './EditDogDate';
import EditDogIsDewormedFirstTime from './EditDogIsDewormedFirstTime';
import EditDogImages from './EditDogImages';
import DogManager from '../services/api/DogManager';

const NewDog = () => {
    const defaultImage = './img/defaultDogImage.png';

    const initialFieldValues = {
        name: '',
        breed: '-',
        dateOfBirth: '',
        isDewormedFirstTime: false,
        dateOfFirstDeworming: '',
        profileImage: defaultImage
    }

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newDog, setNewDog] = useState(initialFieldValues);
    const [images, setImages] = useState({
        imgToUpload: null,
        imagesToDisplay: []
    });

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (validate()) {
            setError(null);

            let formData = new FormData();

            let imgs = images.imgToUpload;
            let imgCount = imgs ? imgs.length : 0;
            if (imgs && imgCount > 0) {
                for (let i = 0; i < imgCount; i++) {
                    formData.append('files', imgs[i])
                }
            }
            else formData.append('files', imgs);
            formData.append('dog', JSON.stringify(newDog));

            const { isLoading, error, okStatus } = await DogManager.addDogWithImage(formData);
            setIsLoading(isLoading);

            if (okStatus === true) navigate('/dogs');
            else setError(error);
        }
        else {
            setIsLoading(false);
            return
        }
    }

    const validate = () => {
        let errors = []
        let dogWithImages = images.imgToUpload && images.imgToUpload.length > 0 ? true : false;
        let isValid = {};
        isValid.breed = newDog.breed === '-' ? false : true;
        
        if (dogWithImages === true) isValid.profileImage = newDog.profileImage === defaultImage ? false : true;
        if (dogWithImages === true && isValid.profileImage === false) errors = [...errors, 'Wybierz zdjęcie profilowe'];
        if (isValid.breed === false) errors = [...errors, 'Wybierz rasę'];
        if (dogWithImages === false) {
            newDog.profileImage = null;
            isValid.profileImage = true;
        }

        setError(errors.join(' ,'))

        return Object.values(isValid).every(x => x === true);
    }

    const selectProfileImage = e => {
        const img = e.target.src;
        const strToRemove = img.substring(0, img.indexOf(',') + 1);
        const profileImage = img.replace(strToRemove , '');
        document.querySelector('.profileImage').setAttribute('src', img);
        setNewDog({
            ...newDog,
            profileImage
        })
    }

    return (
        <div className='newDog'>
            <h2>Dodaj psa</h2>
            <form onSubmit={handleOnSubmit} autoComplete='off'>
                <ul>
                    <EditDogImages setImages={setImages} defaultImage={defaultImage} />
                    <li><EditDogName dog={newDog} /></li>
                    <li><EditDogBreed dog={newDog} /></li>
                    <li><EditDogDate dog={newDog} /></li>
                    <li><EditDogIsDewormedFirstTime dog={newDog} /></li>
                </ul>
                <div><button>Zapisz</button></div>
            </form>
            {error && <h2 className='error'>{error}</h2>}
            {isLoading && <h2>Wczytywanie...</h2>}
            <div>
                {images.imagesToDisplay && images.imagesToDisplay.map(img => (
                    <img key={img.id} src={img.src} onClick={selectProfileImage} alt=''></img>
                ))}
            </div>
        </div>
    );
}

export default NewDog;