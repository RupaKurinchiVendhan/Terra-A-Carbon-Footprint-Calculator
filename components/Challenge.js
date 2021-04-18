import React, {useState} from 'react'
import { Alert, LayoutAnimation, Switch, StyleSheet, View, Text, SafeAreaView, ScrollView, UIManager, TouchableOpacity, Platform, Image } from 'react-native';
import { Button, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import * as Font from 'expo-font';

import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

var CONTENT = [
  {title: 'Eat lower on the food chain.', content: "14.5% of global greenhouse gas emissions can be attributed to the livestock industry from sources such as feed production, clearing land, and methane emissions from the animals themselves.", source: require('./assets/eat.png'), key: 1, category: "Consumption/Waste", done: False},
  {title: 'Eat on smaller plates to limit portion sizes and eliminate food waste.', content: "A study performed by Roskilde University revealed that if the plate size is reduced by just 9%, the food waste can be reduced by over 25%. In other words, by reducing the size of the plate, you ensure that you don't over feed yourself or the trash bin!", source: require('./assets/plate.png'), key: 2, category: 'Consumption/Waste', done: False},
  {title: 'Eat locally-grown foods and produce.', content: "Reduce the emissions from transport while supporting your local farmers and businesses!", source: require('./assets/produce.png'), key: 3, category: "Consumption/Waste", done: False},
  {title: 'Use your food waste as compost.', content: "Composting helps reduce food waste, decreasing the fossil fuel consumption from waste transportation and the emission of greenhouse gases from decomposition in a landfill.", source: require('./assets/compost.png'), key: 4, category: "Consumption/Waste", done: False},
  {title: 'Buy a reusable water bottle.', content: "The production of single-use plastic bottles is reported to release 2.5 million tons of carbon dioxide into the atmosphere every year.", source: require('./assets/bottle.png'), key: 5, category: "Consumption/Waste", done: False},
  {title: "Donate clothes that you don't need and repurpose un-donatable ones.", content: "Help reduce the methane emitted from decomposition of clothes in landfills while helping someone in need or crafting a fun DIY.", source: require('./assets/clothes.png'), key: 6, category: "Consumption/Waste", done: False},
  {title: 'Research the companies you purchase from.', content: "It helps to support and buy from companies that are environmentally responsible and sustainable. Energy Star products offer a wide variety of appliances that are certified to be more energy efficient.", source: require('./assets/bulbs.png'), key: 7, category: "Consumption/Waste", done: False},
  {title: 'Use reusable bags when shopping.', content: "Reusable bags are an easy way to reduce various sources of carbon emissions that accompany the waste management process.", source: require('./assets/recycle.png'), key: 8, category: "Consumption/Waste", done: False},
  {title: 'Replace all light bulbs in your home with LEDs.', content: "LEDs waste less energy and last longer, so even though they are more expensive up front, they will be beneficial both the environment and your wallet in the long term!", source: require('./assets/bulbs.png'), key: 9, category: "Utilies", done: False},
  {title: 'Turn off lights and unplug electronic devices when not in use.', content: "These small actions can help to greatly reduce any energy waste in your home.", source: require('./assets/bulbs.png'), key: 10, category: "Utilies", done: False},
  {title: 'Properly insulate and seal your home.', content: "Reducing drafts and air leaks will prevent any unnecessary heating and cooling that could waste energy in your home.", source: require('./assets/bulbs.png'), key: 11, category: "Utilies", done: False},
  {title: 'Avoid unnecessary braking and acceleration when driving.', content: "It has been shown that smoother and calmer driving reduces fuel consumption and accompanying emissions when on the road.", source: require('./assets/walk.png'), key: 12, category: "Transportation", done: False},
  {title: 'Keep your car maintenance up to date.', content: "Taking care of your car increases fuel efficiency and reduces unnecessary emissions.", source: require('./assets/walk.png'), key: 13, category: "Transportation", done: False},
  {title: 'Take other modes of transportation instead of driving or try to carpool.', content: "These alternatives can either completely cut the harmful emissions from your trip or at least decrease the fuel consumption per person on the vehicle.", source: require('./assets/walk.png'), key: 14, category: "Transportation", done: False},
  {title: 'Fly economy.', content: "Economy is the least harmful to the environment because the fuel consumption per person transported is much lower than the business and first classes.", source: require('./assets/shipping.png'), key: 15, category: "Transportation", done: False},
  {title: 'Donate to a climate science organization.', content: 'If you have the means to donate to climate change charities, consider contributing to research and raising awareness. Some high-imact, evidence-based, cost-effective organizations include The Coalition for Rainforest Nations, Clean Air Task Force, The Information Technology and Innovation Foundation, Rainforest Foundation US, Sandbag, and The Climate Emergency Fund.', source: require('./assets/donate.png'), key: 16, category: "Miscellaneous", done: False},
]

const calculator = new Footprint_Calculator(CONTENT);

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
