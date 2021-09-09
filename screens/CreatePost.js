import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';

const customFonts = {
  'Bubblegum-Sans': require('../assets/BubblegumSans-Regular.ttf'),
};

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      dropDownHeight: 40,
      previewImage: 'image_1',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({
      fontsLoaded: true,
    });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      var previewImages = {
        image_1: require('../assets/jared-evans-Wwg1TzCuV9E-unsplash.jpg'),

        image_2: require('../assets/fabrice-villard-QrRSm-QbjW0-unsplash.jpg'),
        image_3: require('../assets/caseen-kyle-registos-dAoDS8XeEe0-unsplash.jpg'),
        image_4: require('../assets/tanya-grypachevskaya-80x3QULJDN4-unsplash.jpg'),
        image_5: require('../assets/fitore-fazliu-qKs8Oq4D_R0-unsplash.jpg'),
      };
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}
              />
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Upload New Photo</Text>
            </View>
          </View>
          <ScrollView>
            <Image
              source={previewImages[this.state.previewImage]}
              style={styles.previewImage}
            />
            <View style={{ height: RFValue(this.state.dropDownHeight) }}>
              <DropDownPicker
                items={[
                  { label: 'Image 1', value: 'image_1' },
                  { label: 'Image 2', value: 'image_2' },
                  { label: 'Image 3', value: 'image_3' },
                  { label: 'Image 4', value: 'image_4' },
                  { label: 'Image 5', value: 'image_5' },
                ]}
                defaultValue={this.state.previewImage}
                containerStyle={{
                  height: 40,
                  borderRadius: 20,
                  marginBottom: 10,
                }}
                onOpen={() => {
                  this.setState({
                    dropDownHeight: 170,
                  });
                }}
                onClose={() => {
                  this.setState({
                    dropDownHeight: 40,
                  });
                }}
                style={{ backgroundColor: 'transparent' }}
                itemStyle={{ justifyContent: 'flex-start' }}
                dropDownStyle={{ backgroundColor: '#2f345d' }}
                labelStyle={{ color: 'white', fontFamily: 'Bubblegum-Sans' }}
                arrowStyle={{
                  color: '#ffffff',
                  fontFamily: 'Bubblegum-Sans',
                }}
                onChangeItem={(item) => {
                  this.setState({
                    previewImage: item.value,
                  });
                }}
              />
            </View>
            <TextInput
            style={styles.inputFont}
             onChangeText={(caption) => {
                  this.setState({
                    caption,
                  });
                }}
                placeholder="Caption"
                placeholderTextColor="white"
            />
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  previewImage: {
    width: '93%',
    height: RFValue(250),
    alignSelf: 'center',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: 'contain',
  },
  inputFont: {
    height: RFValue(50),
    borderColor: 'white',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
    marginTop: 20,
  },
});
