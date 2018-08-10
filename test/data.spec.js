describe('client', () => {
  it('deberia ser un objeto', () => {
    assert.equal(typeof client, 'object');
  });

  describe('client.register', () => {
    it('deberia ser una funcion', () => {
      assert.equal(typeof client.register, 'function');
    });
  });

  describe('client.photo', () => {
    it('deberia ser una funcion', () => {
      assert.equal(typeof client.photo, 'function');
    });
  });
});

describe('admin', () => {
  it('deberia ser un objeto', () => {
    assert.equal(typeof admin, 'object');
  });
  
  describe('admin.stats', () => {
    it('deberia ser una funcion', () => {
      assert.equal(typeof admin.stats, 'function');
    });
  });
});