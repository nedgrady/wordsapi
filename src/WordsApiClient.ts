import Axios, { AxiosRequestConfig } from "axios"

function setupWordsApiClient(settings: 
    { 
        baseUrl: string, 
        'x-rapidapi-host': string, 
        'x-rapidapi-key': string 
    }
    ) {
    const baseUrl = settings.baseUrl.toString()

    return {
        getRandomWord : async () : Promise<RandomWordResponse> => {
            const url = new URL("/words", baseUrl)

            const requestConfig : AxiosRequestConfig = {
                headers: {
                    'x-rapidapi-host': settings["x-rapidapi-host"],
                    'x-rapidapi-key': settings['x-rapidapi-key']
                }
            };
            return await Axios.get(url.toString(), requestConfig)
        }
    }
}

export default setupWordsApiClient