import { ipcRenderer } from 'electron';

const prefix = 'plug:ai';

export default {
  openai: (content: string, id: number = undefined) =>
    ipcRenderer.invoke(`${prefix}:openai`, content, id),
};
