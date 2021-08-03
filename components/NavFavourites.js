import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import tw from 'tailwind-react-native-classnames';

const data = [
  {
    id: '123',
    icon: 'home',
    location: 'Home',
    destination: 'Jangpura, Delhi',
  },
  {
    id: '456',
    icon: 'briefcase',
    location: 'Work',
    destination: 'India Gate',
  },
];

const NavFavourites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200 h-1`, {height: 0.5}]} />
      )}
      renderItem={({item: {location, destination, icon}}) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;

const styles = StyleSheet.create({});
