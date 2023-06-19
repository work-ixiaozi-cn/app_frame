/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import { app } from 'electron';
import installer from 'electron-devtools-installer';

export const AppUpdater = () => {
  log.transports.file.level = 'info';
  autoUpdater.logger = log;
  autoUpdater.checkForUpdatesAndNotify().then((_) => {});
};

export const isDebug = () => {
  return (
    process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'
  );
};

export const getAssetPath = (...paths: string[]): string => {
  return app.isPackaged
    ? path.join(process.resourcesPath, 'assets', ...paths)
    : path.join(__dirname, '../assets', ...paths);
};

export const getPreloadPath = () => {
  return app.isPackaged
    ? path.join(__dirname, './preload.js')
    : path.join(__dirname, '../../.erb/dll/preload.js');
};

export const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

export function resolveHtmlPath(htmlFileName: string) {
  if (isDebug()) {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    // url.pathname = htmlFileName;
    url.hash = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(
    __dirname,
    '../renderer/index.html'
  )}#${htmlFileName}`;
}

export function resolvePlugPath(plug: string, uri: string = '/') {
  if (isDebug() && uri.indexOf('http') > -1) return uri;
  return `file://${path.resolve(
    isDebug() ? path.dirname(path.dirname(__dirname)) : process.resourcesPath,
    'plugs',
    `${plug}.asar/index.html`
  )}#${uri}`;
}
