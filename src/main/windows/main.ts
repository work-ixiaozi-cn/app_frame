import { app, BrowserView, BrowserWindow, shell } from 'electron';
import {
  getAssetPath,
  getPreloadPath,
  installExtensions,
  isDebug,
  resolveHtmlPath,
} from '../util';
import { Rect } from '../types';

class MainWindow {
  public static loadingRect: Rect = { width: 120, height: 120 };

  public static loginRect = { width: 840, height: 480 };

  public static primaryRect = { width: 1024, height: 768 };

  public static instance: BrowserWindow;

  public static layoutView: BrowserView;

  public static mainView: BrowserView;

  public constructor() {
    if (!MainWindow.instance) MainWindow.initWindow();
    if (!MainWindow.layoutView) MainWindow.initLayoutView();
    if (!MainWindow.mainView) MainWindow.initMainView();
    MainWindow.hideMainView();
  }

  public static hideMainView() {
    MainWindow.mainView.setAutoResize({ width: false, height: false });
    MainWindow.mainView.setBounds({
      x: -999,
      y: -999,
      width: MainWindow.mainView.getBounds().width,
      height: MainWindow.mainView.getBounds().height,
    });
  }

  public static showMainView() {
    MainWindow.mainView.setBounds({
      x: 48,
      y: 32,
      width: MainWindow.instance.getBounds().width - 48,
      height: MainWindow.instance.getBounds().height - 32,
    });
    MainWindow.mainView.setAutoResize({ width: true, height: true });
  }

  private static initWindow() {
    const instance = new BrowserWindow({
      show: true,
      ...MainWindow.loadingRect,
      resizable: false,
      minimizable: false,
      maximizable: false,
      titleBarStyle: 'hidden',
      transparent: true,
      icon: getAssetPath('icon.png'),
    });
    instance.setSkipTaskbar(true);
    if (isDebug()) installExtensions();
    //
    instance.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url).then((r) => {});
      return { action: 'deny' };
    });
    MainWindow.instance = instance;
    this.event();
  }

  // 事件
  private static event() {
    MainWindow.instance.on('ready-to-show', () => {
      // eslint-disable-next-line no-unused-expressions
      process.env.START_MINIMIZED
        ? MainWindow.instance.minimize()
        : MainWindow.instance.show();
    });
    MainWindow.instance.on('closed', () => {
      app.quit();
    });
  }

  private static initLayoutView() {
    const view = new BrowserView({
      webPreferences: {
        contextIsolation: true,
        webSecurity: false, // 关闭安全性功能，支持跨域请求
        preload: getPreloadPath(),
      },
    });
    MainWindow.instance.addBrowserView(view);
    MainWindow.instance.setTopBrowserView(view);
    view.webContents.loadURL(resolveHtmlPath('/'));
    view.webContents.once('dom-ready', () => {
      view.webContents.openDevTools();
    });
    view.setAutoResize({ width: true, height: true });
    view.setBounds({
      x: 0,
      y: 0,
      width: MainWindow.instance.getBounds().width,
      height: MainWindow.instance.getBounds().height,
    });

    MainWindow.layoutView = view;
  }

  private static initMainView() {
    const view = new BrowserView({
      webPreferences: {
        contextIsolation: true,
        devTools: true,
        webSecurity: false, // 关闭安全性功能，支持跨域请求
        preload: getPreloadPath(),
      },
    });
    MainWindow.instance.addBrowserView(view);
    // MainWindow.instance.setTopBrowserView(view);
    view.webContents.loadURL(resolveHtmlPath('/plug'));
    view.webContents.once('dom-ready', () => {
      view.webContents.openDevTools();
    });
    view.setAutoResize({ width: true, height: true });
    view.setBounds({
      x: 48,
      y: 32,
      width: MainWindow.instance.getBounds().width,
      height: MainWindow.instance.getBounds().height,
    });
    MainWindow.mainView = view;
  }
}

export default MainWindow;
