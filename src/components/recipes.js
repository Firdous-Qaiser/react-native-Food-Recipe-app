import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import useClickSound from '../hooks/useClickSound';
import Loading from './loading';

export default function Recipes({meals, categories}) {
  const navigation = useNavigation();
  const playClickSound = useClickSound();

  {/* Sound
        playClickSound Func lies inside the recipes component, 
        We need to pass the Func as a prop to recipe card then,
        we will be able to play the sound on press  
  */}
  
  return (
    <View className='mx-4 gap-3'>
        <Text style={{fontSize: hp(3)}} className='font-semibold text-neutral-600'>Recipes</Text>
      <View>
        {categories.length==0 || meals.length==0 ? ( 
          <Loading size='large' className='mt-20'/> ) : (
            <MasonryList
                  data={meals}
                  keyExtractor={(item) => item.idMeal}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, i}) => <RecipeCard item={item} index={i} navigation={navigation} playClickSound={playClickSound}/>}
                  onEndReachedThreshold={0.1}
            />
        )}
      </View>
    </View>
  )
}

const RecipeCard = ({item, index, navigation, playClickSound}) => {
  {/*
    
    Animation details: 
      delay:- delay animation for each item 
      springify:- To make animation more natural apply Spring physics rather than 
      constant time animation
      damping:- controls the animation bounce

  */}
  let isEven = index%2==0;
  return (
    <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(10)}>
      <Pressable
          style={{width:'100%', paddingLeft: isEven ? 0:8 ,paddingRight: isEven ? 8:0 }}
          className='flex justify-center mb-4 gap-1'
          onPress={() => 
            {
            playClickSound();
            navigation.navigate('RecipeDetail', {...item});
            
              // pass the recipeData saved in item variable
              
          }}
      >
            {/*<CachedImage
            uri={item.strMealThumb}
            style={{width: '100%', height: index%3==0 ? hp(25):hp(35), borderRadius: 35}}
            className='bg-black/10'
            />*/}
            
            {/*                        IMPORTANT     
                      expo-image has a built-in memory and disk caching,
                      Downloads the image once, then saves or caches it 
                      on a disk auto, next time loads it from the cache, 
                      no need of AsyncStorage
            */}
            <Image
            source={{uri:item.strMealThumb}}
            cachePolicy="memory-disk"
            style={{width: '100%', height: index%3==0 ? hp(25):hp(35), borderRadius: 35}}
            className='bg-black/10'
            />
            <Text style={{fontSize: hp(1.5)}} className='font-semibold ml-2 text-neutral-600'>
              { item.strMeal.length>20 ? item.strMeal.slice(0, 20)+'...' : item.strMeal }
            </Text>
      </Pressable>
    </Animated.View>
  )
}
