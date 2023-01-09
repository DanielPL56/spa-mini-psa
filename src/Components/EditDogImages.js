const EditDogImages = ({ setImages, defaultImage }) => {
    const loadImages = e => {
        const files = e.target.files;
        if (files && files[0]) {
            let selectedImg = [];
            for (let i = 0; i < files.length; i++) {
                let img = files[i];
                const reader = new FileReader();
                reader.onload = x => {
                    img = x.target.result;
                    selectedImg.push({id: i, src: img});
                }
                reader.readAsDataURL(img);
                reader.onloadend = x => {
                    setImages({
                        imgToUpload: files,
                        imagesToDisplay: selectedImg
                    })
                }
            }
        }
        else {
            setImages({});
            document.querySelector('.profileImage').setAttribute('src', defaultImage);
        }
    }

    return (
        <>
        <img className='profileImage' src={defaultImage} alt='Zdjęcie profilowe' />
        <li><input type='file' accept='image/*' multiple onChange={loadImages} /></li>
        </>
    );
}

export default EditDogImages;