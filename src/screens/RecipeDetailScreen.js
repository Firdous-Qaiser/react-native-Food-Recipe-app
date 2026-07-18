import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline';
import { HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/solid';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import YouTubeIframe from 'react-native-youtube-iframe';
import Loading from '../components/loading';
import useClickSound from '../hooks/useClickSound';

export default function RecipeDetailScreen(props) {
    
    //props = Object containing the Recipe data 
    //route = info about current screen
    //params = An object parameters passed during navigation
    
    let item = props.route.params; // check that the Recipe data is pass or not 
    const [isFavorite, setIsFavorite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const playClickSound = useClickSound();

    useEffect(() => {
      getMealData(item.idMeal);
    }, [item])
    
    const getMealData = async(id) => {
    try {
      //Filter the recipes based on category presses by the user
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      //console.log('got Meal data: ' , response.data);
      if(response && response.data) {
          setMeal(response.data.meals[0]); //meals is an array of Objects
          setLoading(false);
      }
    }
    catch(err) {
      console.log("error: ", err.message);
    }
  }

  const ingredientsIndexes = (meal) => {
    if(!meal) return [];

    let indexes = [];

      for ( let i=1; i<=20; i++) {

        // meal is an array of object 
        {/* 
            This statement checks if the property "strIngredient" has value then 
            push the index into the array 
            
            if null, undefined, or not exist then drop it not add into the indexes 
            array 
        */}

        if (meal['strIngredient' + i]) {
          indexes.push(i);
      }
    }
    return indexes;
  }
  
  const getYoutubeVideoId = (url) => {
    {/*
      Full regex is:-
      Exp:-https://www.youtube.com/watch?v=dQw4w9WgXcQ 

        Match either ? or & 
     
        match this " v = "
     
        () tell JavaScript to capture or save it separately
        [^&]+: Except '&' eveything is acceptable, match one or more character
      
    */}
      const regex = /[?&]v=([^&]+)/;
      const match = url.match(regex);

      {/*
        match = [
          ?v=dQw4w9WgXcQ 
          dQw4w9WgXcQ  [ This is the video Id passing by a meal Data ]
        ]
        Some recipes has no video (no URL)
        If whole match exist then return video Id 
        Otherwise return null 
      */}

      if (match && match[1]) {
          return match[1];
      }

      return null;
  };
  
    return (
    <ScrollView
    className='flex-1 bg-white'
    showsVerticalScrollIndicator={false}
    contentContainerStyle= {{paddingBottom: 30}}>
      <StatusBar style='light'/>
      <View className='flex-row justify-center'>
          <Animated.Image
            source={{uri: item.strMealThumb}}
            cachePolicy="memory-disk"
            style={{height: hp(50), width: wp(98), borderRadius: 45, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4}}
            entering={ZoomIn.duration(700)}
          />
      </View>
      {/* back button */}
      <Animated.View entering={FadeIn.delay(200).duration(1000).springify().damping(10)} className='w-full absolute flex-row justify-between items-center pt-14'>
          <TouchableOpacity onPress={() => {
            playClickSound();
            navigation.goBack()
          }}
          className='p-2 rounded-full ml-5 bg-white'>
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color='#fbbf24' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            playClickSound();
            setIsFavorite(!isFavorite)
          }} 
            className='p-2 rounded-full mr-5 bg-white'>
            <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={ isFavorite ? 'red' : 'gray' }/>
          </TouchableOpacity>
      </Animated.View>
      
      {/* meal description */}
          {/* name and area */}
          {loading ? (
            < Loading size='large' className='mt-16' />
          ) : (
                <View className="px-4 flex justify-between gap-4 pt-8">
                    <View className="gap-2">
                      <Text
                        style={{ fontSize: hp(3) }}
                        className="font-bold flex-1 text-neutral-700"
                      >
                        {/* ?. = it's a JavaScript optional chaining means access the property strMeal when 
                        the object meal exist */}
                        {meal?.strMeal} 
                      </Text>

                      <Text
                        style={{ fontSize: hp(2) }}
                        className="font-medium flex-1 text-neutral-500"
                      >
                        {meal?.strArea}
                      </Text>
                    </View>

                    {/* misc */}
                      <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(10)} className="flex-row justify-around">
                        <View className="flex rounded-full bg-amber-300 p-2">
                          <View
                            style={{ height: hp(6.5), width: hp(6.5) }}
                            className="bg-white rounded-full flex items-center justify-center"
                          >
                            <ClockIcon
                              size={hp(4)}
                              strokeWidth={2.5}
                              color="#525252"
                            />
                          </View>

                          <View className="flex items-center py-2 space-y-1">
                            <Text
                              style={{ fontSize: hp(2) }}
                              className="font-bold text-neutral-700"
                            >
                              35
                            </Text>

                            <Text
                              style={{ fontSize: hp(1.3) }}
                              className="font-bold text-neutral-700"
                            >
                              Mins
                            </Text>
                          </View>
                        </View>
                        <View className="flex rounded-full bg-amber-300 p-2">
                          <View
                            style={{ height: hp(6.5), width: hp(6.5) }}
                            className="bg-white rounded-full flex items-center justify-center"
                          >
                            <UsersIcon
                              size={hp(4)}
                              strokeWidth={2.5}
                              color="#525252"
                            />
                          </View>

                          <View className="flex items-center py-2 space-y-1">
                            <Text
                              style={{ fontSize: hp(2) }}
                              className="font-bold text-neutral-700"
                            >
                              03
                            </Text>

                            <Text
                              style={{ fontSize: hp(1.3) }}
                              className="font-bold text-neutral-700"
                            >
                              Servings
                            </Text>
                          </View>
                      </View>
                      <View className="flex rounded-full bg-amber-300 p-2">
                          <View
                            style={{ height: hp(6.5), width: hp(6.5) }}
                            className="bg-white rounded-full flex items-center justify-center"
                          >
                            <FireIcon
                              size={hp(4)}
                              strokeWidth={2.5}
                              color="#525252"
                            />
                          </View>

                          <View className="flex items-center py-2 space-y-1">
                            <Text
                              style={{ fontSize: hp(2) }}
                              className="font-bold text-neutral-700"
                            >
                              103
                            </Text>

                            <Text
                              style={{ fontSize: hp(1.3) }}
                              className="font-bold text-neutral-700"
                            >
                              Cal
                            </Text>
                        </View>
                      </View>
                      <View className="flex rounded-full bg-amber-300 p-2">
                          <View
                            style={{ height: hp(6.5), width: hp(6.5) }}
                            className="bg-white rounded-full flex items-center justify-center"
                          >
                            <Square3Stack3DIcon
                              size={hp(4)}
                              strokeWidth={2.5}
                              color="#525252"
                            />
                          </View>

                          <View className="flex items-center py-2 space-y-1">
                            <Text
                              style={{ fontSize: hp(2) }}
                              className="font-bold text-neutral-700"
                            >
                              
                            </Text>

                            <Text
                              style={{ fontSize: hp(1.3) }}
                              className="font-bold text-neutral-700"
                            >
                              Easy
                            </Text>
                        </View>
                      </View>
                  </Animated.View>

                  {/* Ingredients */}
                  <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(10)} className='gap-4'>
                        <Text style={{fontSize: hp(2.5)}}className='font-bold flex-1 text-neutral-700'>
                           Ingredients
                        </Text>
                        <View className='gap-2 ml-3'>
                          {
                            ingredientsIndexes(meal).map(i=> {
                              return (
                                  <View
                                    key={i}
                                    className='flex-row gap-4'>
                                        <View style={{height: hp(1.5), width:hp(1.5)}}
                                        className='bg-amber-300 rounded-full'
                                        />
                                        <View className='flex-row gap-2'>
                                           <Text style={{fontSize: hp(1.7)}} className='font-extrabold text-neutral-700'>{meal['strMeasure'+i]}</Text>
                                           <Text style={{fontSize: hp(1.7)}} className='font-medium text-neutral-600'>{meal['strIngredient'+i]}</Text>
                                        </View>
                                  </View>
                              )
                            })
                          }
                      </View>
                  </Animated.View>

                  {/* Intructions */}
                  <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(10)} className='gap-4'>
                        <Text style={{fontSize: hp(2.5)}}className='font-bold flex-1 text-neutral-700'>
                           Instructions
                        </Text>
                        <Text style={{fontSize: hp(1.6)}} className='text-neutral-700'>
                          {
                            meal?.strInstructions
                          }
                        </Text>
                  </Animated.View>

                  {/* recipe video */}
                  {
                    meal.strYoutube && (
                      <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(10)} className='gap-4'>
                        <Text style={{fontSize: hp(2.5)}}className='font-bold flex-1 text-neutral-700'>
                           Recipe Video
                        </Text>
                        <View>
                          {/*
                            meal.strYoutube has 11-char Youtube video Id 
                            that will pass to a Function
                            videoId is a prop of iframe, iframe 
                            creates a Youtube URL internally by emdedding 
                            a Id from meal Data and,
                            Loads video inside iframe Player
                          */}
                            <YouTubeIframe
                                videoId={getYoutubeVideoId(meal.strYoutube)}
                                height={hp(30)}
                            />
                        </View>
                      </Animated.View>
                    )
                  }
              </View>
          )}
    </ScrollView>
  )
}