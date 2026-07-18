import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import useClickSound from '../hooks/useClickSound';

export default function SearchBar({isSearching, setIsSearching, searchText, setSearchText,
  searchResults, setSearchResults, selectedRecipe, setSelectedRecipe}) {
  const navigation = useNavigation();
  const playClickSound = useClickSound();   {/* invoke the hook that passed the 
  sound playing Func */}

  {/*
    Details:-
      create a searchRecipes Func that will calls a searchAPI to search 
      recipe by its Letters, First it checked if the searchBar is empty 
      if yes then show no results, but if user is searching by entering 
      characters then call the SearchAPI (it display recipe data that 
      matches the letters that users entering into searchBar)
    
    Interface of SearchBar
      Create a textInput with playholder text of color gray and value 
      is set to state variable which is a 'null string'
      It Calls a searchrecipe Func when the text changes menas when we 
      select any recipe from the search meal data 
      
    Search result 
      check the searching result is greater than 0, if yes then create 
      a scrollbarView that contains recipe image and text having 
      Touchable opacity.

      This view display the number of recipes that matches with the 
      user search by using map (it iterates over each recipe items) 
      in JavaScript [map] is used to iterates over array values 
      store in consecutive indexes.

  
    */}
  {/*
    useFocusEffect code runs everytime the screen is focused (Open) or unfocused (Leave)
    usecallback Func used to tell REACT to not create a copy of this Func whenever 
    the component re-renders
    Everything inside the return Func runs, when we leave the screen
  */}
    useFocusEffect( 
      React.useCallback(() => { 
        return () => { 
            setSearchText(''); 
            setSearchResults([]); 
            setIsSearching(false); 
            setSelectedRecipe(null); }; 
      }, []))   
    
    const searchRecipes = async (text) => {
      setSearchText(text);

      if (text.trim().length < 2) {
        setSearchResults([]);
        setIsSearching(false); //Turn it off, in case user first write then delete it
        return;
      }
      setIsSearching(true);
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`
        );

        setSearchResults(response.data.meals || []);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <View className="mx-4">
      {/* Search Bar */}
      <View className="flex-row items-center rounded-full bg-black/5 p-[6px]" >
        <TextInput
          placeholder="Search any recipe"
          placeholderTextColor="gray"
          value={searchText}
          onChangeText={searchRecipes}
          style={{ fontSize: hp(1.8) }}
          className="flex-1 text-base mb-1 pl-3 tracking-wider"
        />
        {/* 
          text-base: standard font-size
          tracking-wider: means increase space btw letters
          strokeWidth: controls thickness of icon's outline 
        */}
        <TouchableOpacity className="bg-white rounded-full p-3">
          <MagnifyingGlassIcon
            size={hp(2.5)}
            strokeWidth={3}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <ScrollView
          className="bg-white rounded-xl mt-3"
          style={{ maxHeight: hp(80) }}
          showsVerticalScrollIndicator={false}
        >
          {/* item returns one recipe */}
          {searchResults.map((item) => (
            <TouchableOpacity
              key={item.idMeal}
              className={`flex-row items-center p-3 border-b border-gray-200 rounded-[14px] 
              ${selectedRecipe === item.idMeal ? 'bg-amber-400' : 'bg-white'
              }`}
                onPress={() => {
                      playClickSound();
                      setSelectedRecipe(item.idMeal);
                      navigation.navigate('RecipeDetail', item);
                }}>
              <Image
                source={{ uri: item.strMealThumb }}
                style={{
                  width:  hp(6.7),
                  height: hp(6.5),
                  //borderRadius: 10,
                }}
                className='border-black-200 rounded-full p-3'
              />

              <Text className="ml-4 flex-1 text-base font-medium">
                {item.strMeal}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}