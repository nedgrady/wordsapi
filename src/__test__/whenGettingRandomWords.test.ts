import setupWordsApiClient from '../index'
import MockAdapter from 'axios-mock-adapter'
import axios, { AxiosRequestConfig } from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe('Getting a random word', () => {

    const mockSettings = {
        baseUrl: "http://someurl",
        'x-rapidapi-host' : 'SAMPLE.x-rapidapi-host',
        'x-rapidapi-key' : 'e788e233c7msh0834b7cafa54af6p1ccdc4jsnd5a8c3dddc7d'
    }

    let wordsApiClientUnderTest = setupWordsApiClient(mockSettings)

    let mockFetch: jest.SpyInstance<Promise<Response>>

    let invokedUrl : URL

    let fetchRequest : RequestInit

    let fetchRequestHeaders : any

    const mockWordObject = {
        "word" :"deerberry",
        "results":[
          {
            "definition":"small branching blueberry common in marshy areas of the eastern United States having greenish or yellowish unpalatable berries reputedly eaten by deer",
            "partOfSpeech":"noun",
            "synonyms":[
              "squaw huckleberry",
              "vaccinium stamineum"
            ],
            "typeOf":[
              "blueberry",
              "blueberry bush"
            ]
          }
        ]
      }

    let returnedWordObject : RandomWordResponse

    beforeAll(async () => {

        mockedAxios.get.mockResolvedValue(mockWordObject);

        returnedWordObject = await wordsApiClientUnderTest.getRandomWord()

        invokedUrl = new URL(mockedAxios.get.mock.calls[0][0])

        fetchRequestHeaders = (mockedAxios.get.mock.calls[0][1] as AxiosRequestConfig).headers
    })

    afterAll(() => {
        
    })

    test('Getting words uses a GET request', async () => {
        expect(mockedAxios.get).toHaveBeenCalled()
    })

     test('Getting words hits the base url', async () => {
        expect(invokedUrl.host).toMatch('someurl')
    })

    test('Getting words hits the /words endpoint', async () => {
        expect(invokedUrl.pathname).toMatch('/words')
    })

    test('The word object returned by the api is returned', () => {
        expect(returnedWordObject).toMatchObject(mockWordObject);
    })

    describe('Getting words auth headers', () => {
        test('include x-rapidapi-host set correctly', async () => {
            const hostHeader = fetchRequestHeaders['x-rapidapi-host']
            expect(hostHeader).toBe(mockSettings["x-rapidapi-host"])
        })

        test('include x-rapidapi-key set correctly', async () => {
            const apiKeyHeader = fetchRequestHeaders['x-rapidapi-key']
            expect(apiKeyHeader).toBe(mockSettings["x-rapidapi-key"])
        })
    })
})
