import { useEffect, useState } from 'react';
import DogManager from '../services/api/DogManager';

const defaultImageSrc = './img/defaultDogImage.png';

const initialFieldValues = {
    dogId: 0,
    dogName: '',
    dogBreed: '',
    isDewormedFirstTime: false,
    dateOfBirth: '31/08/1996',
    imageName: '',
    imageSrc: defaultImageSrc,
    imageFile: null
}



const Add = (formData, onSuccess) => {
    const url = 'https://localhost:7253/api/Dog/AddDogWithImage'

    fetch(url, {
        method: 'POST',
        body: formData
    }).then(res => {
        if (res.ok) {
            onSuccess();
            console.log(res.text());
        }
    })
    .catch(err => console.log(err));
}

const Home = () => {
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setValues(initialFieldValues);
        document.getElementById('image-uploader').value = null;
        setErrors({});
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name] : value
        })
    }

    const showPreview = (e) => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result 
                })
            }
            reader.readAsDataURL(imageFile);
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            })
        }
    }

    const validate = () => {
        let temp = {};
        temp.dogName = values.dogName === '' ? false : true;
        temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
        setErrors(temp);

        return Object.values(temp).every(x => x === true);
    }

    const handleFormSubmit = e => {
        e.preventDefault();

        if (validate()) {
            let formData = new FormData();

            formData.append('id', values.dogId);
            formData.append('name', values.dogName);
            formData.append('breed', values.dogBreed);
            formData.append('dateOfBirth', values.dateOfBirth);
            formData.append('isDewormedFirstTime', values.isDewormedFirstTime);
            formData.append('imageName', values.imageName);
            formData.append('imageFile', values.imageFile);

            Add(formData, resetForm)    
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field] === false) ? 'invalid-field' : '')

    return (
        <>
            <div className='home'>
                Dog form
            </div>
            <form autoComplete='off' noValidate onSubmit={handleFormSubmit}>
                <div>
                    <img src={values.imageSrc} alt="some text" width='150px' height='150px' />
                    
                </div>
                <div>
                    <input id='image-uploader' className={applyErrorClass('imageSrc')} type='file' accept="image/*" onChange={showPreview} />
                    <input className={applyErrorClass('dogName')} name='dogName' placeholder='Dog Name' value={values.dogName} onChange={handleInputChange} />
                    <input name='dogBreed' placeholder='Dog Breed' value={values.dogBreed} onChange={handleInputChange} />
                    <button>Submit</button>
                </div>
            </form>
        </>
    );
}

export default Home;