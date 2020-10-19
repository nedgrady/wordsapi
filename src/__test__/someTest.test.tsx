import someFunction from '../index'

describe("some test", () => {
    test('does something', () => {
        expect(someFunction()).toBeUndefined()
    })
})