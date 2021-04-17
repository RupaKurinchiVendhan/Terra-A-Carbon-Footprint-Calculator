import React from 'react';
import { View, Linking, TouchableNativeFeedback } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-elements';
import moment from 'moment';

let customFonts = {
  'fredoka-one': require('./fonts/FredokaOne-Regular.ttf'),
  'sacramento': require('./fonts/Sacramento-Regular.ttf'),
  'assistant-bold': require('./fonts/Assistant-Bold.ttf'),
  'assistant-semi': require('./fonts/Assistant-SemiBold.ttf'),
  'assistant-light': require('./fonts/Assistant-Light.ttf')
};

export default class Article extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    const {
      title,
      description,
      publishedAt,
      source,
      urlToImage,
      url
    } = this.props.article;
    const { noteStyle, featuredTitleStyle } = styles;
    const time = moment(publishedAt || moment.now()).fromNow();
    const defaultImg =
      'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg';

    return (
      <TouchableNativeFeedback
        useForeground
        onPress={() => Linking.openURL(url)}
      >
        <Card
          featuredTitle={title}
          featuredTitleStyle={featuredTitleStyle}
          image={{
            uri: urlToImage || defaultImg
          }}
        >
          <Text style={{ marginBottom: 10, fontFamily: 'assistant-light' }}>
            {description || 'Read More..'}
          </Text>
          <Divider style={{ backgroundColor: '#9dc9d1' }} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={noteStyle}>{source.name.toUpperCase()}</Text>
            <Text style={noteStyle}>{time}</Text>
          </View>
        </Card>
      </TouchableNativeFeedback>
    );
  }
}

const styles = {
  noteStyle: {
    margin: 5,
    fontStyle: 'italic',
    color: '#9dc9d1',
    fontSize: 10,
    fontFamily: 'assistant-semi'
  },
  featuredTitleStyle: {
    marginHorizontal: 5,
    textShadowColor: '#69941c',
    // textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
    fontFamily: 'assistant-bold'
  }
};
