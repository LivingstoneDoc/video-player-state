import { createMachine, assign } from 'xstate';

export const playerMachine = createMachine({
  id: 'videoPlayer',
  initial: 'idle',
  context: {
    isPlaying: false,
    // videoUrl: 'https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8',
  },
  states: {
    idle: {
      on: {
        OPEN_MODAL: {
          target: 'playing',
          actions: assign({ isPlaying: true }),
        },
      },
    },
    playing: {
      on: {
        CLOSE_MODAL: {
          target: 'idle',
          actions: assign({ isPlaying: false }),
        },
        PAUSE: {
          target: 'paused',
          actions: assign({ isPlaying: false }),
        },
      },
    },
    paused: {
      on: {
        PLAY: {
          target: 'playing',
          actions: assign({ isPlaying: true }),
        },
      },
    },
  },
});
