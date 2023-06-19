import { ipcMain, dialog } from 'electron';
import type { SaveDialogOptions } from 'electron';
import { WgConfig } from 'wireguard-tools';
import { resolveHtmlPath } from './util';
import MainWindow from './windows/main';

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('main:hide', () => MainWindow.hideMainView());
ipcMain.on('main:show', () => MainWindow.showMainView());
ipcMain.on('main:to', (_, url: string) =>
  MainWindow.mainView.webContents.loadURL(resolveHtmlPath(url))
);
ipcMain.handle('system:layoutTop', () => {
  MainWindow.instance.setTopBrowserView(MainWindow.layoutView);
  return true;
});
ipcMain.handle('system:mainTop', () => {
  MainWindow.instance.setTopBrowserView(MainWindow.mainView);
  return true;
});
// 对话框
ipcMain.handle('dialog:showSaveDialog', (_, ...options: SaveDialogOptions) => {
  return dialog.showSaveDialog(options);
});

ipcMain.handle('main:vpn', () => {
  const config = new WgConfig();
  console.log(config);
  return true;
});
