describe('client', () => {
  it('deberia ser un objeto', () => {
    assert.equal(typeof client, 'object');
  });

  describe('client.photo', () => {
    it('deberia ser una funcion', () => {
      assert.equal(typeof client.photo, 'function');
    });
  });

  describe('client.guardar', () => {
    it('deberia ser una funcion', () => {
      assert.equal(typeof client.guardar, 'function');
    });
  });

  describe('client.edit', () => {
    it('deberia ser una funcion', () => {
      assert.equal(typeof client.edit, 'function');
    });
  });
});

describe('admin', () => {
  it('deberia ser un objeto', () => {
    assert.equal(typeof admin, 'object');
  });
  
  describe('admin.delete', () => {
    it('deberia ser una funcion', () => {
      assert.equal(typeof admin.delete, 'function');
    });
  });
});