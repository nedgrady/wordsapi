declare interface RandomWordResponse {
    word: string;
    results: {
        definition: string;
        partOfSpeech: string;
        synonyms: string[];
        typeOf: string[];
    }[];
}