import plugin from 'windicss/plugin';

export default plugin(({ addUtilities }) =>
  addUtilities({
    '.drag': {
      'app-region': 'drag',
    },
    '.no-drag': {
      'app-region': 'no-drag',
    },
  })
);
