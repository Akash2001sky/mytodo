//@ts-nocheck
import React, {createContext} from 'react';

interface Iprops {
  children: any;
}
interface Istate {
  tododata: string;
  addtodo: any;
  remove: string;
  update: string;
  modal: boolean;
  disabled: boolean;
  categories: any;
  subtasks: any;
  subdata: any;
}
export const context = createContext({});

export class Todoprovider extends React.Component<Iprops, Istate> {
  subdata: any;
  constructor(props: Iprops) {
    super(props);
    this.state = {
      tododata: '',
      addtodo: [
        {
          title: '',
          hidden: false,
          subTasks: [],
        },
      ],
      remove: '',
      update: '',
      modal: false,
      subtasks: [],
      subdata: '',
    };
  }
  inputdata = (txt: any) => {
    this.setState({
      tododata: txt,
    });
  };

  handleadd = () => {
    const {addtodo, tododata} = this.state;

    const obj = {
      title: tododata,
      hidden: false,
      subTasks: [],
    };
    this.setState({
      addtodo: [...addtodo, obj],
      tododata: '',
    });
    console.log('pressed');
  };

  handleRemove = (id: any) => {
    const {addtodo} = this.state;
    const rem = addtodo.filter((val: any) => val.title !== id);
    this.setState({
      addtodo: rem,
    });
  };

  handleEdit = (value: any) => {
    this.setState({
      tododata: value,
      update: value,
      modal: true,
    });
  };

  UpdateHandle = () => {
    let value = this.state.addtodo;
    const item = value.filter((val: any) =>
      val.title === this.state.update
        ? (val.title = this.state.tododata)
        : val.title,
    );

    this.setState({
      addtodo: item,
      tododata: '',
      modal: false,
    });
  };

  subInputdata = (txt: any, index: number) => {
    this.setState({
      subdata: txt,
    });
  };

  handleSubadd = (id: number) => {
    const {subdata, addtodo} = this.state;

    let updatedTodos = this.state.addtodo.map((item: any, index: number) => {
      if (id == index) {
        item.subTasks.push(subdata);
      }
      return item;
    });

    this.setState({
      addtodo: updatedTodos,
      subdata: '',
    });
  };

  bin = (i: number,idx: any) => {
    const {addtodo} = this.state;
    
    let updatedTodos = this.state.addtodo.map((item: any, id: number) => {
      if (id == i) {
       let updatedSubTasks= item.subTasks.filter((val: any, index: any) => index !== idx);
        console.log("here" ,idx);
        item.subTasks=updatedSubTasks
        
      }
      return item;
    });

    //const del = addtodo[i].subTasks.filter((val, index) => index !== idx);
  

    this.setState({
      addtodo: updatedTodos,
    });
  };

  render(): React.ReactNode {
    const {disabled} = this.state;
    console.log(this.state.addtodo);
    return (
      <context.Provider
        value={{
          add: this.handleadd,
          input: this.inputdata,
          tododta: this.state.tododata,

          mytodo: this.state.addtodo,
          d: this.handleRemove,
          edit: this.handleEdit,
          update: this.UpdateHandle,
          modal: this.state.modal,
          // togel:this.toggleCategory
          subInput: this.subInputdata,
          subAdd: this.handleSubadd,
          subtxt: this.subdata,
          subtasks: this.state.subtasks,
          bin: this.bin,
        }}>
        {this.props.children}
      </context.Provider>
    );
  }
}
