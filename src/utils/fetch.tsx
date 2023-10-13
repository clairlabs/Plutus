const fetch = async (url: string, options = {method: "GET"}): Promise<Record<string, any>> => {
    try {
        const response = await fetch(url, options);

        return await response.json();
    }
}

export default fetch