import React,{ Component} from "react";
import Todoinput from "./components/Todoinput";
import Todolist from "./components/Todolist";
import "bootstrap/dist/css/bootstrap.min.css";
import {v1 as uuid} from "uuid";
import "./App.css"

class App extends Component {



  state ={
    items :[],
    id: uuid(), //uuid creates unique id
    item : "",
    editItem: false
  }
  handleChange =(e)=>{
    this.setState({
      item: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
  
    const newItem = {
      id: this.state.id,
      title: this.state.item
    }
  
    let updatedItems;
  
    if (this.state.editItem) {
      // Find the index of the item being edited in the items array
      const index = this.state.items.findIndex(item => item.id === this.state.id);
  
      // Create a copy of the items array with the edited item
      updatedItems = [...this.state.items];
      updatedItems[index] = newItem;
    } else {
      // Create a copy of the items array with the new item
      updatedItems = [...this.state.items, newItem];
    }
  
    // Update local storage with the updated items
    localStorage.setItem('todoItems', JSON.stringify(updatedItems));
  
    this.setState({
      items: updatedItems,
      item: "",
      id: uuid(),
      editItem: false
    });
  }
  
  clearList = () => {
    // Clear the items array and update local storage
    this.setState({
      items: []
    }, () => {
      localStorage.setItem('todoItems', JSON.stringify(this.state.items));
    });
  }
  
  handleDelete = (id) => {
    const filteredItems = this.state.items.filter((item) => {
      return item.id !== id
    })
  
    // Update local storage with the filtered items
    localStorage.setItem('todoItems', JSON.stringify(filteredItems));
  
    this.setState({
      items: filteredItems
    })
  }
  
  handleEdit = (id) => {
    const filteredItems = this.state.items.filter((item) => {
      return item.id !== id
    })
  
    const selectedItem = this.state.items.find(item => item.id === id);
    console.log(selectedItem);
    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      editItem: false,
      id: id
    })
  }
  
  



  componentDidMount() {
    const storedItems = JSON.parse(localStorage.getItem('todoItems'));
    if (storedItems) {
      this.setState({ items: storedItems });
    }
  }
  
  render(){

  return (
    <div className="container">
      <div className="row">
        <div className="col-10 mx-auto col-md-8 mt-4">
          <h3 className="text-capitalize text-center">ToDo Input</h3>
        <Todoinput item={this.state.item} handleChange={this.handleChange} handleSubmit={this.handleSubmit} editItem={this.state.editItem}/>
        <Todolist items={this.state.items} clearList={this.clearList} handleDelete={this.handleDelete} handleEdit={this.handleEdit}/>
        </div>
      </div>
    </div>
    
  );
}
}



export default App;


