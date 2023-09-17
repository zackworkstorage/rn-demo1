import React, {useState, useEffect, useRef} from 'react';
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
  const [subMenulist, setSubMenuList] = useState([]);
  const [addSubmenu, setAddSubmenu] = useState('');

  const refInput = useRef(null);

  useEffect(() => {
    AsyncStorage.getItem('menulist').then((jsonmenu) => {
      var arraymenu = [];
      if(jsonmenu){
        arraymenu = JSON.parse(jsonmenu);
      }
      setMenuList(arraymenu);
    });
    AsyncStorage.getItem('subMenulist').then((jsonmenu) => {
      var arraymenu = [];
      if(jsonmenu){
        arraymenu = JSON.parse(jsonmenu);
      }
      setSubMenuList(arraymenu);
    });
  }, [])

  return (
    <SafeAreaView >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
          <View style={{ flexDirection:'row', marginBottom: 20 }}>
            <TextInput
              ref={refInput}
              style={{fontSize: 16, width: '80%', borderWidth: 1}}
              placeholder={'Enter menu name'}
              value={textMenu}
              onChangeText={(value) => setTextMenu(value)}
            />
            <Button title="Add" color={defaultColor} onPress={async () => {
              if(addSubmenu != ''){
                var jsonsubmenu = await AsyncStorage.getItem('subMenulist');
                var arraysubmenu = [];
                if(jsonsubmenu){
                  arraysubmenu = JSON.parse(jsonsubmenu);
                }
                arraysubmenu.push({
                  parent: addSubmenu,
                  child: textMenu
                });
                await AsyncStorage.setItem('subMenulist', JSON.stringify(arraymenu));
                setAddSubmenu('');
              }
              else{
                var jsonmenu = await AsyncStorage.getItem('menulist');
                var arraymenu = [];
                if(jsonmenu){
                  arraymenu = JSON.parse(jsonmenu);
                }
                arraymenu.push(textMenu);

                await AsyncStorage.setItem('menulist', JSON.stringify(arraymenu));
                setMenuList(arraymenu);
              }
              setTextMenu('');
            }}>{'Add'}</Button>
          </View>

          {
            menulist.length > 0 ? menulist.map((value) => {

              var child = [];
              // var showSubMenu = subMenulist.find(data => data.parent === value);
              const showSubMenus = subMenulist.filter(obj => {
                return obj.parent === value;
              });

              return <View style={{flexDirection:'row', alignContent: 'space-between', borderBottomColor: defaultColor, borderBottomWidth: 2}}>
                <View style={{flex: 1}}>
                  <Text style={{color: '#000', paddingVertical: 10, fontSize: 18}}>{value}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity onPress={async () => {
                    setAddSubmenu(value);
                    refInput.current.focus();
                  }}>
                    <Text style={{color: defaultColor, paddingVertical: 10, fontSize: 23, fontWeight: 'bold', marginRight: 10}}>+</Text>
                  </TouchableOpacity>

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
                    <Text style={{color: defaultColor, paddingVertical: 10, fontSize: 23, fontWeight: 'bold'}}>x</Text>
                  </TouchableOpacity>
                </View>
                {
                  showSubMenus.length > 0 ? showSubMenus.map((childvalue) => {
                    return <View style={{marginTop: 10, marginBottom: 10}}>
                      {childvalue.child}
                    </View>
                  })
                  :
                  null
                }
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
