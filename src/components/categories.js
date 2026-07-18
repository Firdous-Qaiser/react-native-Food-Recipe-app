import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import useClickSound from '../hooks/useClickSound';

export default function Categories({categories, activeCategory, handleChangeCategory}) {
    const playClickSound = useClickSound();
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
        <ScrollView 
        horizontal
        showsHorizontalScrollIndicator= {false}
        className='gap-4'
        contentContainerStyle= {{paddingBottom: 15}}
        >
            {
                categories.map((cat, index) => {
                {/* flex: childrens share the available space using flex inside parent box */}
                {/* inside Image view we join two strings: cancatenation */}
                let isActive = cat.strCategory==activeCategory;
                let activeBtnClass = isActive ? 'bg-amber-400' : 'bg-black/10';
                    return (
                        <TouchableOpacity
                        key = {index}
                        onPress={() => {
                            playClickSound();
                            handleChangeCategory(cat.strCategory)
                        }}
                        className='flex items-center gap-1'
                        >
                            <View className={'mx-2 mt-2 rounded-full p-[6px] ' + activeBtnClass}>
                                {/*<CachedImage
                                uri={cat.strCategoryThumb}
                                style={{height: hp(6), width: hp(6)}}
                                className='rounded-full'
                                /> */}
                                <Image
                                source={{uri: cat.strCategoryThumb}}
                                style={{height: hp(6), width: hp(6)}}
                                className='rounded-full'
                                />
                            </View>
                            <Text className='text-neutral-600' style={{fontSize: hp(1.6)}}>
                                {cat.strCategory}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    </Animated.View>
  )
}