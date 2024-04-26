import { View, Text } from 'react-native'
import React from 'react'

interface Props {
    listings: any[];
    category: string;
}
const Listings = ({listings,category}:Props) => {
  return (
    <View>
      <Text>Listings</Text>
    </View>
  )
}

export default Listings