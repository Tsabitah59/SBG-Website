import { animate, splitText, stagger } from 'https://esm.sh/animejs';

const { words } = splitText('.text-animate', {
  words: { wrap: 'clip' },
})

animate(words, {
  y: [
    { to: ['100%', '0%'] },
  ],
  duration: 750,
  ease: 'out(3)',
  delay: stagger(100),
});