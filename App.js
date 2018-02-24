import React from 'react';
import {
    Animated,
    View,
    Text,
    Dimensions,
    RefreshControl,
    Modal,
    ScrollView,
    ListView,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    Keyboard,
    Button,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';

import PubNubReact from 'pubnub-react';

export default class App extends React.Component {
  constructor(props) {
    super(props);


  }

  componentWillMount() {
    this.pubnub = new PubNubReact({
        publishKey: 'pub-c-b8fd1056-99b5-4f8b-8986-ce1ab877240b',
        subscribeKey: 'sub-c-f10175d6-fa3c-11e7-8a22-26ec4b06f838',
        uuid: 1
    });

    this.pubnub.init(this);
    this.pubnub.subscribe({ channels: ['channel1'], triggerEvents: true, withPresence: true, });

    this.pubnub.history(
      {
          channel: 'channel1',
          reverse: false, // false is the default
          count: 100, // 100 is the default
          stringifiedTimeToken: true // false is the default
      },
      (status, response) => {
          console.log(response);
      }
    );
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({ channels: ['channel1'] });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
