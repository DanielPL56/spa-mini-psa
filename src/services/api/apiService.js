const apiService = async (url, method = 'GET', body) => {
    let error = null;
    let isLoading = true;
    let data = null;
    let okStatus = false;

    try {
        const response = await fetch(url, {
            method,
            headers: {'Content-type' : 'Application/json'},
            body: JSON.stringify(body)
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

export default apiService;