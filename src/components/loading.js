import { ActivityIndicator, View } from 'react-native'

export default function Loading(props)  {
    {/* props = Pass from parent recipe component */}
  return (
    <View flex-1 flex justify-center items-center>
      <ActivityIndicator {...props} /> 
    </View>
  )
}
