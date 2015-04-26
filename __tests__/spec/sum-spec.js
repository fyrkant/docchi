jest.dontMock('../../src/components/sum.js');

describe('sum', function() {
    it('adds 1 + 2 to equal 3', function() {
        var sum = require('../../src/components/sum');
        expect(sum(1, 2)).toBe(3);
    });
});