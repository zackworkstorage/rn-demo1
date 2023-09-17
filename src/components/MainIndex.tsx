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
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MainIndex({defaultColor}): JSX.Element {
  const [textMenu, setTextMenu] = useState('');
  const [menulist, setMenuList] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('menulist').then((jsonmenu) => {
      var arraymenu = [];
      if(jsonmenu){
        arraymenu = JSON.parse(jsonmenu);
      }
      setMenuList(arraymenu);
    });
  }, [])

  return (
    <SafeAreaView >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
          <View style={{ flexDirection:'row', marginBottom: 20 }}>
            <TextInput
              style={{fontSize: 16, width: '80%', borderWidth: 1}}
              placeholder={'Enter menu name'}
              value={textMenu}
              onChangeText={(value) => setTextMenu(value)}
            />
            <Button title="Add" color={defaultColor} onPress={async () => {
              var jsonmenu = await AsyncStorage.getItem('menulist');
              var arraymenu = [];
              if(jsonmenu){
                arraymenu = JSON.parse(jsonmenu);
              }
              arraymenu.push(textMenu);

              await AsyncStorage.setItem('menulist', JSON.stringify(arraymenu));
              setMenuList(arraymenu);
              setTextMenu('');
            }}>{'Add'}</Button>
          </View>

          {
            menulist.length > 0 ? menulist.map((value) => {
              return <View style={{flexDirection:'row', alignContent: 'space-between', borderBottomColor: defaultColor, borderBottomWidth: 2}}>
                <View style={{flex: 1}}>
                  <Text style={{color: '#000', paddingVertical: 10, fontSize: 18}}>{value}</Text>
                </View>
                <View>
                  <TouchableOpacity onPress={async () => {
                    var jsonmenu = await AsyncStorage.getItem('menulist');
                    var arraymenu = [];
                    if(jsonmenu){
                      arraymenu = JSON.parse(jsonmenu);
                      var index = arraymenu.indexOf(value)
                      if (index !== -1) {
                        arraymenu.splice(index, 1);
                        await AsyncStorage.setItem('menulist', JSON.stringify(arraymenu));

                        setMenuList(arraymenu);
                      }
                    }
                  }}>
                    <Text style={{color: defaultColor, paddingVertical: 10, fontSize: 18, fontWeight: 'bold'}}>X</Text>
                  </TouchableOpacity>
                </View>
              </View>
            })
            :
            null
          }
        </View>
      </ScrollView>
    </SafeAreaView>
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

export default MainIndex;
