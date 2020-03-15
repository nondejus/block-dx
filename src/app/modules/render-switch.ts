import uuid from 'uuid';

const switchEventKeys = {
  REGULAR: 'aaaafdc5-9186-4aff-8731-52159ff92d85'
};

class RenderSwitch {

  async send(key, params, multiThread = false) {
    const { ipcRenderer } = window.electron;
    const id = uuid.v4();
    const data = await new Promise((resolve, reject) => {
      ipcRenderer.once(id, (e, err, res) => {
        if(err) {
          reject(new Error(err.message));
        } else {
          resolve(res);
        }
      });
      ipcRenderer.send(switchEventKeys.REGULAR, id, key, params);
    });
    return data;
  }

}

const renderSwitch = new RenderSwitch();

export {renderSwitch};
