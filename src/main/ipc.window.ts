import { ipcMain } from 'electron';
import { resolveHtmlPath, resolvePlugPath } from './util';
import MainWindow from './windows/main';
import { Rect } from './types';

ipcMain.on('window:minimize', () => MainWindow.instance.minimize());
ipcMain.on('window:maximize', () => MainWindow.instance.maximize());
ipcMain.on('window:close', () => MainWindow.instance.close());

ipcMain.on('window:openPlug', (event, plug: string, url: string) => {
  MainWindow.mainView.webContents.loadURL(resolvePlugPath(plug, url));
});

ipcMain.on(
  'window:resizeWithMain',
  (event, url: string, uri: string, rect: Rect = MainWindow.primaryRect) => {
    console.log({ url, uri, rect });
    MainWindow.instance.hide();
    MainWindow.instance.setSize(rect.width, rect.height);
    MainWindow.showMainView();

    MainWindow.layoutView.webContents.loadURL(resolveHtmlPath(uri));
    MainWindow.mainView.webContents.loadURL(resolveHtmlPath(url));
    // MainWindow.layoutView.webContents.openDevTools();

    MainWindow.instance.setMaximizable(true);
    MainWindow.instance.setMinimizable(true);
    MainWindow.instance.setResizable(true);
    // MainWindow.layoutView.setBounds({ x: 0, y: 0, ...rect });
    MainWindow.instance.center();
    MainWindow.instance.show();
    MainWindow.instance.setSkipTaskbar(false);
  }
);

ipcMain.on(
  'window:resizeWithoutMain',
  (event, url: string, rect: Rect = MainWindow.loginRect) => {
    console.log({ rect });
    MainWindow.instance.hide();
    MainWindow.instance.setSize(rect.width, rect.height);
    MainWindow.hideMainView();
    MainWindow.layoutView.webContents.loadURL(resolveHtmlPath(url));
    MainWindow.layoutView.setBounds({ x: 0, y: 0, ...rect });
    MainWindow.instance.setMaximizable(false); // false
    MainWindow.instance.setMinimizable(true);
    MainWindow.instance.setResizable(false); // false
    MainWindow.instance.center();
    MainWindow.instance.show();
    MainWindow.instance.setSkipTaskbar(false);
  }
);
