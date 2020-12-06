const keymaps = [
  {
    color: 'blue',
    name: '1.mp3',
  },
  {
    color: 'red',
    name: '2.mp3',
  },
  {
    color: 'yellow',
    name: '3.mp3',
  },
  {
    color: 'green',
    name: '4.mp3',
  },
];

const Lvls = {
  easy: {
    value: 'easy',
    text: 'Легкий',
    interval: 1500,
  },
  medium: {
    value: 'medium',
    text: 'Средний',
    interval: 1000,
  },
  hard: {
    value: 'hard',
    text: 'Сложный',
    interval: 400,
  },
};

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export {
  keymaps,
  Lvls,
  timeout
}