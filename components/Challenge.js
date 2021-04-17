import React, {useState} from 'react'
import { Image, StyleSheet, TouchableOpacity, Text, View, Button, FlatList } from 'react-native';
import * as Font from 'expo-font';
// import ViewMoreText from 'react-native-view-more-text';
import ReadMore from 'react-native-read-more-text';


const fetchFonts = () => {
  return Font.loadAsync({
    'fredoka-one': require('./assets/FredokaOne-Regular.ttf'),
    'sacramento': require('./assets/Sacramento-Regular.ttf'),
    'assistant-bold': require('./assets/Assistant-Bold.ttf'),
    'assistant-light': require('./assets/Assistant-Light.ttf')
  });
};

// export class DescriptionCard extends React.Component {
//   renderViewMore(onPress){
//     return(
//       <Text onPress={onPress}>View more</Text>
//     )
//   },
//   renderViewLess(onPress){
//     return(
//       <Text onPress={onPress}>View less</Text>
//     )
//   },
//   render(){
//     return(
//       <ViewMoreText
//         numberOfLines={3}
//         renderViewMore={this.renderViewMore}
//         renderViewLess={this.renderViewLess}
//         textStyle={{textAlign: 'center'}}
//       >
//         <Text>
//           Lorem ipsum dolor sit amet, in quo dolorum ponderum, nam veri molestie constituto eu. Eum enim tantas sadipscing ne, ut omnes malorum nostrum cum. Errem populo qui ne, ea ipsum antiopam definitionem eos.
//         </Text>
//       </ViewMoreText>
//     )
//   }
// }

export default function Challenge({item }) { // pressHandler,
  return (
    <TouchableOpacity> // onPress={() => pressHandler(item.key)}
      <Text style={styles.item}>{item.text}</Text>
    </TouchableOpacity>
    )
}

// export default function TodoItem({item }) {
//   const [challenges, setChallenges] = useState([
//     {text: 'tiny plates to eliminate food waste', key: 1},
//     {text: 'allow for more white space in your fridge', key: 2},
//     {text: 'donate to an organization', key: 3}
//   ]);
//
//   const pressHandler = (key) => {
//     setChallenges(prevChallenges => {
//       return prevChallenges.filter(challenge => challenge.key != key);
//     });
//   };
//
//   return (
//     <TouchableOpacity onPress={() => pressHandler(item.key)}>
//       <View style={styles.list}>
//         <FlatList
//           data ={challenges}
//           <Text style={styles.item}>{item.text}</Text>
//         />
//       </View>
//       // <Text style={styles.item}>'Hello'</Text>
//       // <Text style={styles.item}>'Hello'</Text>
//     </TouchableOpacity>
//   )
// }

const styles = StyleSheet.create({
  item: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 10,
    marginTop: 20,
    borderColor: '#9dc9d1',
    borderWidth: 3,
    // borderStyle: "dashed",
    borderRadius: 10,
    fontFamily: 'assistant-light',
    fontSize: 18,
  },
  list: {
    marginTop: 10,
  }
});
