const apiServiceWithFiles = async (url, method = 'GET', formData) => {
    let error = null;
    let isLoading = true;
    let data = null;
    let okStatus = false;

    try {
        const response = await fetch(url, {
            method,
            body: formData
        })

        if (response.ok) {
            isLoading = false;
            okStatus = true;
            data = await response.json();
        }
        else {
            error = 'Something gone wrong';
            isLoading = false;
        }
    } catch (exception) {
        error = exception.message;
        isLoading = false;
    }

    return { error, isLoading, data, okStatus };
}

export default apiServiceWithFiles;