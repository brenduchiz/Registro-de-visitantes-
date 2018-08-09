describe('client', () => {
  it('deberia ser un objeto', () => {
    assert.equal(typeof client, 'object');
  });

  describe('client.save', () => {
    it('deberia ser una funcion', () => {
      assert.equal(typeof client.save, 'function');
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
  
  describe('admin.showTable', () => {
    it('deberia ser una funcion', () => {
      assert.equal(typeof admin.showTable, 'function');
    });
  });

  describe('admin.delete', () => {
    it('deberia ser una funcion', () => {
      assert.equal(typeof admin.delete, 'function');
    });
  });

  describe('admin.edit', () => {
    it('deberia ser una funcion', () => {
      assert.equal(typeof admin.edit, 'function');
    });
  });
});