import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { View, Platform } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Constants from 'expo-constants';
import { Icon } from 'react-native-elements';



const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu },
  Dishdetail: { screen: Dishdetail }
},
{
  initialRouteName: 'Menu',
  navigationOptions: {
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      }
  }
}
);


const HomeNavigator = createStackNavigator({
  Home: { screen: Home },
},
{
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
      color: "#fff"            
    },
    headerTintColor: "#fff"  
  }) 
});


const AboutNavigator = createStackNavigator({
  About: { screen: About },
},
{
  navigationOptions: {
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      }
  }
}
);

const ContactNavigator =  createStackNavigator({
  Contact: { screen: Contact} ,
},
{
  navigationOptions: {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: "#fff"            
    }
}
}) 
const MainNavigator = createDrawerNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home'
    }
  },
  About: {
    screen: AboutNavigator,
    navigationOptions: {
      title: 'About Us',
      drawerLabel: 'About Us'
    }
  },
  Menu: {
    screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu'
    }
  },
  Contact: {
    screen: ContactNavigator,
    navigationOptions: {
      title: 'Contact Us',
      drawerLabel: 'Contact Us'
    }
  }
}, {
  drawerBackgroundColor: '#D1C4E9'
})

class Main extends Component {
  render() {
    return (
      <View style={{flex:1 , paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
         <MainNavigator />
      </View>
    );
  }
}
  
export default Main;

