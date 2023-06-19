export const NavTo = (url: string) => {
  window.electron.main.to(url);
};

export const PlugTo = (plug: string, uri: string) => {
  window.electron.window.openPlug(plug, uri);
};
