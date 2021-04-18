import React, {useState} from 'react'
import { Alert, LayoutAnimation, Switch, StyleSheet, View, Text, SafeAreaView, ScrollView, UIManager, TouchableOpacity, Platform, Image } from 'react-native';
import { Button, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import * as Font from 'expo-font';

import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const CONTENT = [
  {title: 'Eat on tiny plates to limit portion sizes and eliminate food waste.', content: "A study performed by Roskilde University revealed that if the plate size is reduced by just 9%, the food waste can be reduced by over 25%. In other words, by reducing the size of the plate, you ensure that you don't over feed yourself or the trash bin!", source: require('./../assets/plates.png'), key: 1},
  {title: 'Allow for more white space in your fridge.', content: 'Oftentimes, we fill up our shopping carts so that we can fill up our fridge. Leaving white space in your refrigerator is a great way to limit food waste by making sure that you get a chance to eat everything you buy.', source: require('./../assets/fridge.png'), key: 2},
  {title: 'Donate to a climate science organization.', content: 'If you have the means to donate to climate change charities, consider contributing to research and raising awareness. Some high-imact, evidence-based, cost-effective organizations include The Coalition for Rainforest Nations, Clean Air Task Force, The Information Technology and Innovation Foundation, Rainforest Foundation US, Sandbag, and The Climate Emergency Fund.', source: require('./../assets/donate.png'), key: 3},
  {title: 'Separate the bottle caps from your bottles when recycling.', content: 'sdfljskdflskdjf', source: require('./../assets/recycle.png'), key: 4},
  {title: 'Try to replace disposable containers with jars or bottles.', content: 'sdfljskdflskdjf', source: require('./../assets/jars.png'), key: 5},
  {title: 'Use your food waste as compost.', content: 'sdfljskdflskdjf', source: require('./../assets/compost.png'), key: 6},
  {title: 'Replace incandescent light bulbs with compact fluorescent bulbs (CFLs).', content: 'sdfljskdflskdjf', source: require('./../assets/bulbs.png'), key: 7},
  {title: 'Buy a reusable water bottle.', content: 'sdfljskdflskdjf', source: require('./../assets/bottle.png'), key: 8},
  {title: 'Eat locally-grown foods and produce.', content: 'sdfljskdflskdjf', source: require('./../assets/eat.png'), key: 9},
  {title: 'Try growing your own vegetables.', content: 'sdfljskdflskdjf', source: require('./../assets/produce.png'), key: 10},
  {title: "Donate clothes that you don't need and repurpose un-donatable ones.", content: 'sdfljskdflskdjf', source: require('./../assets/clothes.png'), key: 11},
  {title: 'Drink filtered tap water.', content: 'sdfljskdflskdjf', source: require('./../assets/water.png'), key: 12},
  {title: 'Only use 2-day shipping if you need the item immediately.', content: 'sdfljskdflskdjf', source: require('./../assets/shipping.png'), key: 13},
  {title: "If you can walk or bike there, don't drive.", content: 'sdfljskdflskdjf', source: require('./../assets/walk.png'), key: 14}
]

const SELECTORS = CONTENT.map(function(x) {return {title: x.title}});

const layoutAnimConfig = {
  duration: 300,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 100,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

const ChallengeList = () => {
  const [data, setData] = useState(CONTENT);

  const removeItem = (title) => {
     let arr = data.filter(function(item) {
       return item.title !== title
     })
     setData(arr);
     // after removing the item, we start animation
     LayoutAnimation.configureNext(layoutAnimConfig)
  };

  const renderItem = ({ item }) => {
    return (
      <Challenge
        item={item}
        remove={removeItem}
      />
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.list}>
            <FlatList
              contentInset= {{bottom: 80}}
              data={data}
              renderItem={renderItem}
            />
        </View>
    </View>
  );
};
export default ChallengeList;

function Challenge({item, remove}) { // pressHandler,
  const [collapsed, setCollapsed] = useState(true);
  const [isSelected, setSelection] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };


  return (
    <TouchableOpacity onPress={toggleCollapse}>
      <View style={styles2.item}>
        <View style={styles2.taskHead}>
          <CheckBox
            style={styles2.checkbox}
            checked={isSelected}
            onValueChange={setSelection}
            onPress={() => {
              setSelection(!isSelected);
              setTimeout(function(){remove(item.title)}, 1000)}}
          />
          <Text style={styles2.taskText}>
            {item.title}
          </Text>
          <Image
            style={styles2.tinyLogo}
            source={item.source}
          />
        </View>
        <Collapsible
          collapsed={collapsed}
          align="center"
        >
          <View style={styles2.mainText}>
            <Text style={{textAlign: 'center'}}>
              {item.content}
            </Text>
          </View>
        </Collapsible>
      </View>
    </TouchableOpacity>
    )
}


const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 40,
  },
  mainText: {
    fontFamily: 'assistant-light',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    marginTop: 10
  },
  checkbox: {
    justifyContent: 'flex-start'
  },
  titleText: {
    fontFamily: 'assistant-bold',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    color: '#69941c',
  },
  taskHead: {
    flexDirection: 'row'
  },
  taskText: {
    fontFamily: 'assistant-bold',
    // alignItems: 'center',
    textAlign: 'center',
    // justifyContent: 'center',
    fontSize: 18,
    color: '#69941c',
    flex:3
  },
  buttonText: {
    fontSize: 10,
    color: '#69941c',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    fontFamily: 'assistant-light',
    fontSize: 18,
  },
  item: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderColor: '#9dc9d1',
    borderWidth: 3,
    // borderStyle: "dashed",
    borderRadius: 10,
    fontFamily: 'assistant-light',
    fontSize: 18,
    // alignItems: 'center',
    flex: 1,
    // justifyContent: 'center'
  },
  tinyLogo: {
    width: 50,
    height: 50,
    justifyContent: 'flex-end',
    // alignItems: 'center'
  },
  list: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    flex:1,
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 20,
    borderColor: '#9dc9d1',
    borderWidth: 3,
    // borderStyle: "dashed",
    borderRadius: 10,
    fontFamily: 'assistant-light',
    fontSize: 18,
    // alignItems: 'center',
    flex: 1,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  selector: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 20,
    borderColor: '#9dc9d1',
    borderWidth: 3,
    // borderStyle: "dashed",
    borderRadius: 10,
    fontFamily: 'assistant-light',
    fontSize: 18,
    fontWeight: 'bold',
    // alignItems: 'center',
    flex: 1,
    // justifyContent: 'center'
  },
  activeSelector: {
    fontWeight: 'bold',
  }
});
