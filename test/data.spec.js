describe('data', () => {
    it('deberia ser un objeto', () => {
        assert.equal(typeof data, 'object')
    });

    describe('data.toRegister', () => {
        it('deberia ser una funcion', () => {
            assert.equal(typeof data.toRegister, 'function');
        });
    });
})