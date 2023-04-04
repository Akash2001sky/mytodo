//@ts-nocheck
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {context} from './Todoprovider';
interface Iprops {
  mytodo: any;
  d: any;
}
class TodoList extends React.Component<Iprops> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      hidden: true,
      clicked: '',
      textOn: false,
    };
  }
  static contextType = context;
  listfn = (v: any) => {
    const {mytodo} = this.context;
    if (mytodo.filter((val: any, i: any) => i !== v)) {
      this.setState({hidden: !this.state.hidden});
    }
  };

  render(): React.ReactNode {
    const {
      mytodo,
      add,
      input,
      tododta,
      update,
      modal,
      subInput,
      subAdd,
      subtxt,
      subtasks,
      bin,
    } = this.context;
    return (
      <View style={{flex: 1, backgroundColor: '#146C94'}}>
        {mytodo.map((item, i) => {
          const {mytodo, d, edit} = this.context;
          return (
            <View key={i}>
              <View style={styles.flat}>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#F6F1F1',
                      marginLeft: 20,
                      marginTop: 5,
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => d(item.title)}>
                  <AntDesign name="delete" size={30} color="#146C94" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => edit(item.title)}>
                  <AntDesign name="edit" size={30} color="#146C94" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.listfn(i);
                    item.hidden = !item.hidden;
                  }}
                  style={styles.btn}>
                  <AntDesign name="plussquareo" size={30} color="#146C94" />
                </TouchableOpacity>
              </View>
              {!item.hidden ? null : (
                <View style={{marginHorizontal: 20}}>
                  <TextInput
                    style={{backgroundColor: '#ffffffaa', borderRadius: 10}}
                    placeholderTextColor={'#ffffffaa'}
                    placeholder="ADD TODO"
                    onChangeText={txt => {
                      subInput(txt, i);
                    }}
                    value={item.subTask}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      subAdd(i);
                      item.hidden = false;
                    }}
                    style={{
                      backgroundColor: '#19A7CE',
                      width: 70,
                      height: 40,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        color: '#ffffffaa',
                        fontSize: 20,
                        marginLeft: 17,
                        marginTop: 6,
                      }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {item.subTasks.map((data:string, idx:number) => {
                return (
                  <View
                    key={idx}
                    style={{
                      marginLeft: 20,
                      flexDirection: 'row',
                      backgroundColor: '#ffffffaa',
                      padding: 5,
                      width: 275,
                      borderRadius: 5,
                      marginBottom: 3,
                    }}>
                    <Text
                      style={{
                        backgroundColor: '#3795BD',
                        width: 250,
                        borderRadius: 5,
                        marginTop: 2,
                        color: '#FFFFFFaa',
                        fontSize: 15,
                        paddingLeft: 10,
                      }}>
                      {data}
                    </Text>
                    <TouchableOpacity
                      style={{marginTop: 5}}
                      onPress={() => bin(i,idx)}>
                      <AntDesign name="delete" size={15} color="#146C94" />
                    </TouchableOpacity>
                  </View>
                );
              })}
              {/* {this.state.hidden ? null : (
                <Button
                  title="Add"
                  onPress={() => {
                    this.setState({textOn: !this.state.textOn,
                    hidden:!this.state.hidden});
                  }}
                />
              )}
                {this.state.textOn ? null :(<View><TextInput
                    placeholderTextColor={'#ffffffaa'} placeholder="ADD TODO"/>
                    <Button title='inp' /></View>)} */}
            </View>
          );
        })}
        <Modal visible={modal} transparent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000aa',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.modal}>
              <TextInput
                placeholderTextColor={'#ffffffaa'}
                placeholder="ADD TODO"
                style={styles.inputStyle}
                onChangeText={txt => input(txt)}
                value={tododta}
              />
              <TouchableOpacity style={styles.butto} onPress={() => update()}>
                <Text style={styles.Addtext}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
export default TodoList;

const styles = StyleSheet.create({
  flat: {
    backgroundColor: '#19A7CE',
    margin: 20,

    flexDirection: 'row',
    height: 40,
    borderRadius: 10,
  },
  button: {
    marginLeft: 150,
  },
  btn: {
    marginLeft: 10,
  },
  modal: {
    backgroundColor: '#19A7CE',
    width: 350,
    height: 250,
    borderRadius: 20,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#ffffffaa',
    borderRadius: 10,
    marginTop: 70,
    marginHorizontal: 10,
    color: '#ffffff',
  },
  butto: {
    alignItems: 'center',
    backgroundColor: '#146C94',
    height: 30,
    marginTop: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  Addtext: {
    marginTop: 5,
    color: '#F6F1F1',
  },
});
