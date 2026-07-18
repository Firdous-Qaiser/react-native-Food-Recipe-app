import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { BellIcon } from 'react-native-heroicons/outline';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Categories from '../components/categories';
import Recipes from '../components/recipes';
import SearchBar from '../components/searchBar';

// Flex-1 means in NativeWind:- Take over all the available space on the screen  
// scrollView: let user to scroll over the content on page, scrollbar is hide, 
// but page still scrollable
// Give a 50pixels of padding at bottom of scrollable items
// set a gap of 2 between each items 

export default function HomeScreen() {
  
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [meals, setMeals] = useState([]);
  
  useEffect(() => {
    getCategories();
    getRecipes();
  }, [])
  
  const handleChangeCategory = category=> {
    getRecipes(category); //when user presses the category, getRecipes Func gets the recipes for that category
    setActiveCategory(category);
    setMeals([]); //whenever new category selected
  }
  //Async Function
  const getCategories = async() => {
    {/*
    axios.get() is method from axios Library, used to send HTTP URL request to server 
    for Fetching data without modification.
    */}
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      //console.log('got categories: ' , response.data);
      if(response && response.data) {
        setCategories(response.data.categories);
      }
    }
    catch(err) {
      console.log("error: ", err.message);
    }
  }
  const getRecipes = async(category='Beef') => {
    try {
      //Filter the recipes based on category presses by the user
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      //console.log('got recipes: ' , response.data);
      if(response && response.data) {
          setMeals(response.data.meals);
      }
    }
    catch(err) {
      console.log("error: ", err.message);
    }
  }
  return (
    <View className='flex-1 bg-white'>
      <StatusBar style= 'dark' />
      <ScrollView
      showsVerticalScrollIndicator = {false}
      contentContainerStyle = {{paddingBottom: 50}}
      className='gap-2 pt-14'
      > 
      
      {/* avatar and bell icon */}
      <View className='mx-4 flex-row justify-between items-center mb-2'>
        <Image source={require('../../assets/images/avatar.png')} style={{height:hp(5), width:hp(5.5)}} />
        <BellIcon size={hp(4)} color='gray' />
      </View>  
      
      {/* greetings and punchline */}
      <View className='mx-4 gap-2 mb-2'>
        <Text style={{fontSize: hp(1.7)}} className='text-neutral-600'>Hello, Firdous!</Text>
        <View>
          <Text style={{fontSize: hp(3.8)}}className='font-semibold text-neutral-600'>Make your own food,</Text>
        </View>
        <Text style={{fontSize: hp(3.8)}}className='font-semibold text-neutral-600'>
          stay at <Text className='text-amber-600'>home</Text></Text>
      </View>
      
      {/* search bar */}
            
      <View>
        <SearchBar isSearching={isSearching} setIsSearching= {setIsSearching} 
        searchText={searchText} setSearchText={setSearchText} searchResults=
        {searchResults} setSearchResults={setSearchResults} selectedRecipe=
        {selectedRecipe} setSelectedRecipe={setSelectedRecipe} />
      </View>

      {/* This view add the items horizontally (row) [TextInput and searchIcon], items are align in the center 
      with bg black of opacity 5% and pad of 6 on all sides*/}
      {/* <View className='mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]'>
        <TextInput
        placeholder= 'Search any recipe'
        placeholderTextColor={'gray'}
        style={{fontSize: hp(1.8)}}
        className='flex-1 text-base mb-1 pl-3 tracking-wider' 
        />
        <View className='bg-white rounded-full p-3'>
          <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color='gray'/>
        </View>
      </View> */}

      {/* categories */}
      
      {/* 
      if the condition [!isSearching] is true then render the compoennets 
      on right */}
      
      {
      !isSearching && (
      <>
          <View>
            {/* Set a condition that render the component when the api categories data Loaded */}
            { categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} /> }
          </View>

          {/* Recipes */}
          <View>
            <Recipes meals={meals} categories={categories} />
          </View>
      </>
    )}
    </ScrollView>
  </View>
  )
}