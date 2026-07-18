import { useAudioPlayer } from 'expo-audio';

{/* 
    Details 
        useClickSound() is a hook, in JavaScript any Func starts with use 
        called a react hook Function. 
        useAudioPlayer: hook will creates a audio player object that controls
        the sound.
        player.seekTo(): method changes where the sound starts [ From (0) ]

*/}

export default function useClickSound() {
  const player = useAudioPlayer(
    require('../../assets/sound/select_sound.mp3') // phone waits and find the audio file first
  );

  const playClickSound = () => {
    player.seekTo(0);
    player.play();
  };

  return playClickSound;
}