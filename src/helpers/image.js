import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image } from "react-native";

export const CachedImage = (props) => {
  const [cachedSource, setCachedSource] = useState(null);
  const { uri } = props;

  useEffect(() => {
    const getCachedImage = async () => {
      try { 
        //  check if image is already being saved on Local device
            const cachedImageData = await AsyncStorage.getItem(uri);

            // Yes
            if (cachedImageData) {
              //displayed the saved images
            setCachedSource({ uri: cachedImageData });
            } 
            else {
            // if not, Download the image from the URL
            const response = await fetch(uri);
            //convert downloaded image into binary raw data '10011001'
            const imageBlob = await response.blob();

            // Convert Blob to Base64 a string #'ABCDEF'
            // Async storage only saved text or strings, not Image, or objects,
            // for that, it need conversion 

            // create a new instance of Promise object: 
            // This object represents a value that available later
            const base64Data = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(imageBlob);
                // when we finish reading the image URL, return the Base64
                reader.onloadend = () => 
                    resolve(reader.result);
            });
                //saved or cached it into storage
                await AsyncStorage.setItem(uri, base64Data);
                //display the saved images
                setCachedSource({ uri: base64Data });
                } 
            }
            catch(error) {
                    console.error("Error caching image:", error);
                    // If anything fails, use the original URL
                    setCachedSource({ uri });
                }
            };
    getCachedImage();
  }, []);

  // Return animated version if Image: 
  // SOURCE = says to display image saved in the cachedsource state variable 
  // which contains the base64 string 
  // {..props} = apply or display the remaining props came from parent component 
  
  return <Image source={cachedSource} {...props} />
}