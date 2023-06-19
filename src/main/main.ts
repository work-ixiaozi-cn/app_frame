import { app } from 'electron';
import { isDebug } from './util';
import MainWindow from './windows/main';
import './ipc.window';
import './ipc.layout';
import './ipc.main';
import './ipc.db';
import './plugs/ai/main';

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

// eslint-disable-next-line global-require
if (isDebug()) require('electron-debug')();

app
  .whenReady()
  // eslint-disable-next-line promise/always-return
  .then(() => {
    // eslint-disable-next-line no-new
    new MainWindow();
    process.env.PLUG_ENV = 'development';
    app.on('activate', () => {
      // eslint-disable-next-line no-new
      if (MainWindow.instance === null) new MainWindow();
    });
  })
  // eslint-disable-next-line no-console
  .catch(console.log);

app.on('window-all-closed', () => {
  console.log('====window-all-closed=============');
  if (process.platform !== 'darwin') app.quit();
});
