import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

{/* hp = height percentage of current device, wp = width percentage of currrent device 
This method helps to add responsiveness to the app on diff phone screens */}

export default function WelcomeScreen() {

  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  // Navigation hook
  const navigation = useNavigation();

  // components mounts

  { /*             code details:                    */}
  {/*     code runs when the components first loaded     */}
  {/*     set ring1pad to 0, wait for 100ms, increase pad to 1, animate the change with spring     */}
  
  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(() => ring1padding.value = withSpring(ring1padding.value+hp(4)), 100);
    setTimeout(() => ring2padding.value = withSpring(ring1padding.value+hp(4.5)), 300);

    setTimeout(() => { 
      navigation.navigate('Home');
    }, 2500);
  }, [])
  
  return (
    <View className="flex-1 items-center justify-center bg-amber-500">
      <StatusBar style='light' />

      {/* Logo image with rings  */}
      <Animated.View className='bg-white/20 rounded-full' style={{padding: ring2padding}}>
        <Animated.View className='bg-white/20 rounded-full' style={{padding: ring1padding}}>
          <Image source={require('../../assets/images/logo.png')}
            style={{height: hp(20), width: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View className='items-center gap-2'>
        <Text style= {{fontSize: hp(5)}} className='font-bold text-white tracking-widest text-6xl mt-10'>
          Foody
        </Text>
        <Text style= {{fontSize: hp(2.5)}} className='font-medium text-white tracking-widest text-lg'>
          Food is always right
        </Text>
      </View>
    </View>
  );
}

