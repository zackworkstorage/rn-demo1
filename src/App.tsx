import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useDrawerProgress,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';

import BlueWrapper from './components/BlueWrapper';
import PurpleWrapper from './components/PurpleWrapper';
import GreenWrapper from './components/GreenWrapper';
import OrangeWrapper from './components/OrangeWrapper';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer(): JSX.Element {
  const [headerColor, setHeaderColor] = useState('#0095ff');
  const [leftSelected, setLeftSelected] = useState('all_tasks');

  function MyTabs({data}): JSX.Element{
    if(leftSelected != data){
      // setLeftSelected(data);
      // setHeaderColor('#0095ff');
    }
    return (
      <Tab.Navigator
        initialRouteName="BlueWrapper"
        screenOptions={{
          tabBarActiveTintColor: '#000',
          activeBackgroundColor: '#000',
          headerShown: false
        }}
        tabStyle={{paddingTop: 10, paddingBottom: 10}}
      >
        <Tab.Screen
          name="BlueWrapper"
          component={BlueWrapper}
          listeners={{
            tabPress: e => {
              // // Prevent default action
              // e.preventDefault();

              // //Any custom code here
              // alert(123);
              setHeaderColor('#0095ff');
            },
          }}
          options={{
            tabBarLabel: 'Blue',
            tabBarIcon: ({ color, size }) => (
              <View style={{width: 20, height: 20, backgroundColor: '#0095ff'}} />
            ),
          }}
        />
        <Tab.Screen
          name="PurpleWrapper"
          component={PurpleWrapper}
          listeners={{
            tabPress: e => {
              setHeaderColor('#9000ff');
            },
          }}
          options={{
            tabBarLabel: 'Purple',
            tabBarIcon: ({ color, size }) => (
              <View style={{width: 20, height: 20, backgroundColor: '#9000ff'}} />
            ),
            // tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="GreenWrapper"
          component={GreenWrapper}
          listeners={{
            tabPress: e => {
              setHeaderColor('#64bc00');
            },
          }}
          options={{
            tabBarLabel: 'Green',
            tabBarIcon: ({ color, size }) => (
              <View style={{width: 20, height: 20, backgroundColor: '#64bc00'}} />
            ),
          }}
        />
        <Tab.Screen
          name="OrangeWrapper"
          component={OrangeWrapper}
          listeners={{
            tabPress: e => {
              setHeaderColor('#ff8400');
            },
          }}
          options={{
            tabBarLabel: 'Orange',
            tabBarIcon: ({ color, size }) => (
              <View style={{width: 20, height: 20, backgroundColor: '#ff8400'}} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  function CustomDrawerContent(props) {
    const progress = useDrawerProgress();

    return (
      <DrawerContentScrollView {...props}>
        <Animated.View >
          {/*<DrawerItemList {...props} />*/}
          <DrawerItem label="All Tasks" onPress={() => {
            setHeaderColor('#0095ff');
            props.navigation.reset({
                 index: 0,
                 routes: [{ name: 'All Tasks' }]
            });
          }} />
          <DrawerItem label="Completed Tasks" onPress={() => {
            setHeaderColor('#0095ff');
            // props.navigation.navigate('Completed Tasks');
            props.navigation.reset({
                 index: 0,
                 routes: [{ name: 'Completed Tasks' }]
            });
          }} />
          <DrawerItem label="Incomplete Tasks" onPress={() => {
            setHeaderColor('#0095ff');
            // props.navigation.navigate('Incomplete Tasks');
            props.navigation.reset({
                 index: 0,
                 routes: [{ name: 'Incomplete Tasks' }]
            });
          }} />
        </Animated.View>
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="All Tasks" component={() => <MyTabs data={"all_tasks"}/>} 
          options={{
            title: 'All Tasks',
            headerTitleStyle: {
              color: '#fff',
            },
            headerStyle: {
              backgroundColor: headerColor,
            }
          }}/>
      <Drawer.Screen name="Completed Tasks" component={() => <MyTabs data={"completed_tasks"}/>} 
          options={{
            title: 'Completed Tasks',
            headerTitleStyle: {
              color: '#fff',
            },
            headerStyle: {
              backgroundColor: headerColor,
            },
          }}/>
      <Drawer.Screen name="Incomplete Tasks" component={() => <MyTabs data={"imcomplete_tasks"}/>} 
          options={{
            title: 'Incomplete Tasks',
            headerTitleStyle: {
              color: '#fff',
            },
            headerStyle: {
              backgroundColor: headerColor,
            },
          }}/>
    </Drawer.Navigator>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
