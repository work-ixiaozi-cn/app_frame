// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import ai from './plugs/ai/preload';
import tools from './plugs/tools/preload';
import { Paginate, Rect } from './types';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  window: {
    minimize: () => ipcRenderer.send('layout:minimize'),
    maximize: () => ipcRenderer.send('layout:maximize'),
    close: () => ipcRenderer.send('layout:close'),
    resizeWithoutMain: (url: string, rect?: Rect) =>
      ipcRenderer.send('layout:resizeWithoutMain', url, rect),
    resizeWithMain: (url: string, uri?: string, rect?: Rect) => {
      ipcRenderer.send('layout:resizeWithMain', url, uri, rect);
    },
    openPlug: (plug: string, uri: string) => {
      ipcRenderer.send('layout:openPlug', plug, uri);
    },
  },
  main: {
    hide: () => ipcRenderer.send('main:hide'),
    show: () => ipcRenderer.send('main:show'),
    to: (url: string) => ipcRenderer.send('main:to', url),
  },
  db: {
    find: (id: string) => ipcRenderer.invoke('db:find', id),
    paginate: (
      key: string,
      search: Object = {},
      option: Paginate = { page: 1, page_size: 15 }
    ) => ipcRenderer.invoke('db:paginate', key, search, option),
    create: (key: string, value: any) =>
      ipcRenderer.invoke('db:create', key, value),
  },
  system: {
    init: () => ipcRenderer.invoke('system:init'),
    layoutTop: (): Promise<boolean> => ipcRenderer.invoke('system:layoutTop'),
    mainTop: (): Promise<boolean> => ipcRenderer.invoke('system:mainTop'),
  },
  dialog: {
    showSaveDialog: () => ipcRenderer.invoke('dialog:showSaveDialog'),
  },
  plug: {
    list: () => ipcRenderer.invoke('plug:list'),
    current: () => ipcRenderer.invoke('plug:current'),
    search: (key: string) => ipcRenderer.invoke('plug:search', key),
    ai,
    tools,
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
