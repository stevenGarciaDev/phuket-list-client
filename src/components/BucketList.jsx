import React, { Component } from "react";
import ListItem from "./ListItem";
import Downshift from "downshift";
import SearchResults from 'react-filter-search';
import { Dropdown } from 'react-bootstrap';
import {
  getListItems,
  getLikeTasks,
  findOrCreateTask,
  removeTask,
  toggleComplete,
  updateTask
} from "../services/bucketListService";
import { getCurrentUser } from "../services/authService";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";
import {createPublicGroupChat, updateGroupName, removeFromChat } from '../services/messageService';

// max length for taskName is 60 char
class BucketList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [], // User's bucket list items
      newTaskInput: '', // "Add New Task" form
      searchResults: [], // for autocomplete search NOT BucketList search
      loading: "",
      listFilterSearch: '',
      listFilterItems: [],
      inputError: null,
      filter: 2,
      selectedFilter:'',
      listItemsRenderType: 0 // Flag for type of tasks to render
    };
  }

  async componentDidMount() {
    // get bucket list items
    const user = getCurrentUser();
    const jwt = localStorage.getItem("token");

    // need to pass request headers
    const response = await getListItems(user, jwt);
    const listItems = response.data[0].listItems;
    this.setState({ listItems: listItems });
  }

  handleAdd = e => {
    e.preventDefault();
    const minTaskNameLength = 5;
    const maxTaskNameLength = 50;
    const newTaskName = document.getElementById("new_task").value;
    if (newTaskName.length === 0) {
      this.setState({ inputError: "Must add a task first" });
      return;
    } else if (newTaskName.length < minTaskNameLength) {
      this.setState({ inputError: `Task must be more than ${minTaskNameLength} letters` });
      return;
    } else if (newTaskName.length > maxTaskNameLength) {
      this.setState({ inputError: `Task must be less than ${maxTaskNameLength} letters` });
      return;
    }

    //const originalList = this.state.listItems;
    // check if already have item in the list
    //for (let item of originalList) {
    //  if (item.taskName.toLowerCase() === newTaskName.toLowerCase()) {
    //    this.setState({ inputError: "Unable to add duplicate" });
    //    return;
    //  }
    //}
    //let updatedList = [...this.state.listItems];
    //const newItem = { taskName: newTaskName, isCompleted: false };
    //updatedList.push(newItem);
    //this.setState({ listItems: updatedList });

    try {
      const user = getCurrentUser();
      const jwt = localStorage.getItem("token");

      // create a new list item
      const response = findOrCreateTask(user, newTaskName, jwt);


      // create a new message group for that task

      createPublicGroupChat( user._id , newTaskName);// make new group chat


      response.then(result => {
        const listItems = result.data;
        console.log(listItems);
        var newlist = this.listsort(listItems,this.state.filter);
        console.log(newlist);
        this.setState({listItems: newlist });
      });
      this.setState({newTaskInput: ''}); // resets form value
    } catch (ex) {
      alert("Unable to add item.");
      //this.setState({ listItems: originalList });
    }
  };

  listsort = (list,value) =>{
    console.log(list);
    switch(value) {
      case 0: // Alphabetical sort (ascending)
        list.sort(function (a, b) {
                    var textA = a.taskName.toUpperCase();
                    var textB = b.taskName.toUpperCase();

                    return textA.localeCompare(textB);
                  });
        //this.setState({listItems: sortedArray});
        return list;
      case 1: // Alphabetical sort (descending)
        list.sort(function (a, b) {
                    var textA = a.taskName.toUpperCase();
                    var textB = b.taskName.toUpperCase();

                    return textB.localeCompare(textA);
                  });
        //this.setState({listItems: sortedArray});
        return list;
        case 3:
            list.sort(function (a, b) {
              var textA = a.dateAdded;
              var textB = b.dateAdded;

              return textB.localeCompare(textA);
            });
            //this.setState({listItems: sortedArray});
            return list;
      default:
        console.log("Sorting: invalid");
        return list;
    }
  }

  handleUpdate = (item, newText) => {
    const user = getCurrentUser();
    const jwt = localStorage.getItem("token");

    console.log("Itemmm: " ,item.taskName);

    const response = updateTask(user, item, newText, jwt);
    //updateGroupName;
    removeFromChat(item.taskName, user._id);// remove user from group chat
    createPublicGroupChat( user._id , newText);// make new group chat


    response.then(result => {
      const updatedList = result.data;
      this.setState({ listItems: updatedList });
    });
  };

  handleDelete = async item => {
    const originalList = this.state.listItems;
    const modifiedList = [...this.state.listItems];
    const index = modifiedList.indexOf(item);
    modifiedList.splice(index, 1);
    this.setState({ listItems: modifiedList });

    try {
      const user = getCurrentUser();
      const jwt = localStorage.getItem("token");

      await removeTask(user, item, jwt);

      removeFromChat(item.taskName, user._id);// remove user from group chat
      console.log("delte : ", item.taskName);
      console.log("delte : ", user._id);

        //const listItems = response.data;
    } catch (ex) {
      alert('Unable to delete item.');
      this.setState({ listItems: originalList });
    }
    //if (this.confirmDelete(item)) {
    //
    //}
  };

  handleCompleted = async item => {
    const originalList = this.state.listItems;
    const modifiedList = [...this.state.listItems];
    const index = modifiedList.indexOf(item);
    modifiedList[index].isCompleted = !modifiedList[index].isCompleted;
    this.setState({ listItems: modifiedList });

    try {
      const user = getCurrentUser();
      const jwt = localStorage.getItem("token");

      await toggleComplete(user, item, jwt);
    } catch (ex) {
      this.setState({ listItems: originalList });
    }
  };

  confirmDelete = item => {
    const answer = window.confirm(
      `Are you sure you want to delete task, "${item.taskName}?"`
    );
    if (answer) {
      return true;
    }
    return false;
  };

  // onChange function for Add New Task input
  onChange = e => {
    if (!e) {
      return;
    }
    var newTaskInput = e.target.value;

    //console.log("search input is ", newTaskInput);

    this.setState({newTaskInput: newTaskInput});
    newTaskInput = newTaskInput.toLowerCase(); // Lowercase for uniform search
    if (newTaskInput.length > 0) {
      const response = getLikeTasks(newTaskInput); // Query from
      response.then(
        function(results) {
          this.setState({ searchResults: results.data });
        }.bind(this)
      );
    }
  };

  // onChange function for user list filter search.
  onFilterSearch = e => {
    var searchInput = e.target.value;
    if (searchInput.length > 0) {
      this.setState({listFilterSearch: searchInput})
    } else {
      this.setState({listFilterSearch: ''})
    }
  }

  async filterSort(value) {
    this.state.filter = value;
    console.log("Sorting started...");
    var sortedArray = this.state.listItems;
    switch(value) {
      case 0: // Alphabetical sort (ascending)
        sortedArray.sort(function (a, b) {
                    var textA = a.taskName.toUpperCase();
                    var textB = b.taskName.toUpperCase();

                    return textA.localeCompare(textB);
                  });
        this.setState({listItems: sortedArray});
        return;
      case 1: // Alphabetical sort (descending)
        sortedArray.sort(function (a, b) {
                    var textA = a.taskName.toUpperCase();
                    var textB = b.taskName.toUpperCase();

                    return textB.localeCompare(textA);
                  });
        this.setState({listItems: sortedArray});
        return;
      case 2:
        // get bucket list items
        const user = getCurrentUser();
        const jwt = localStorage.getItem("token");

        // need to pass request headers
        const response = await getListItems(user, jwt);
        const listItems = response.data[0].listItems;
        this.setState({ listItems: listItems });
        return;
        case 3:
            this.state.selectedFilter = 'Newest';
            sortedArray.sort(function (a, b) {
              var textA = a.dateAdded;
              var textB = b.dateAdded;

              return textB.localeCompare(textA);
            });
            this.setState({listItems: sortedArray});
            return;
      default:
        console.log("Sorting: invalid");
        return;
    }
  }

  setSelectedFilter(e) {
    console.log(e);
    if(typeof e != null)
      this.setState({ selectedFilter: e.target.value });
    else
      return;
  }

  taskItemRenderTypeFilter(item) {
    try {
      // Filter by type will be determined by this switch statement
      switch(this.state.listItemsRenderType) {
        case 0: // All
          return (<ListItem key={item._id}  task={item} onDelete={this.handleDelete} onComplete={this.handleCompleted} onUpdate={this.handleUpdate}/>);
        case 1: // Complete
          if (item.isCompleted) {
            return (<ListItem key={item._id}  task={item} onDelete={this.handleDelete} onComplete={this.handleCompleted} onUpdate={this.handleUpdate}/>);
          }
          return;
        case 2: // Incomplete
          if (!item.isCompleted) {
            return (<ListItem key={item._id}  task={item} onDelete={this.handleDelete} onComplete={this.handleCompleted} onUpdate={this.handleUpdate}/>);
          }
          return;
        default:
          console.log("Sorting: invalid");
          return;
      }
    } catch (e) {
      console.log("Error: Cannot filter by task type", e)
    }
  }


  render() {
    const { user } = this.props;
    const { inputError, filter, listItemsRenderType } = this.state;

    return (
      <div>
        <div className="jumbotron text-center" id="bucket-list-jumbotron">
          <div className="jumbotron-content">
            <h1 className="page-title"> {`${user.name}'s bucket list.`}</h1>
            <h2 className="sub-header">What have you always wanted to do?</h2>
            <SearchStyles>
              <Downshift
                itemToString={item => (item === null ? "" : item.title)}
                onChange={selection =>
                  ( this.setState({newTaskInput: selection.taskName}))
                }
              >
                {({
                  getInputProps,
                  getItemProps,
                  getLabelProps,
                  getMenuProps,
                  isOpen,
                  inputValue,
                  highlightedIndex,
                  selectedItem
                }) => (
                  <div>
                    <form
                      onSubmit={this.handleAdd}
                      className="input-group col-md-6 col-md-offset-3"
                    >
                      <input
                        {...getInputProps({
                          type: "search",
                          placeholder: "Enter a bucket list item!",
                          id: "new_task",
                          name: "new_task",
                          value: this.state.newTaskInput,
                          className: this.state.loading ? "loading" : "",
                          onChange: e => {
                            e.persist();
                            this.onChange(e);
                          }
                        })}
                        autoComplete="off"
                        className="form-control"
                        aria-describedby="inputGroup-sizing-default"
                      />

                      <div>
                        <button className="btn btn-outline-success" type="submit">
                          Add New Task
                        </button>
                      </div>

                      {isOpen && (
                        <DropDown>
                          {this.state.searchResults.map((item, index) => (
                            <DropDownItem
                              {...getItemProps({ item })}
                              key={item.taskName}
                              highlighted={index === highlightedIndex}
                            >
                              {item.taskName}
                            </DropDownItem>
                          ))}
                          {!this.state.searchResults.length &&
                            !this.state.loading && (
                              <DropDownItem>
                                {" "}
                                Nothing Found For: {inputValue}
                              </DropDownItem>
                            )}
                        </DropDown>
                      )}
                    </form>
                    {inputError &&
                      <div id="alert-container" className="col-md-6 col-md-offset-3 alert alert-danger">
                        <strong>{inputError}</strong>
                      </div>}
                  </div>
                )}

              </Downshift>
            </SearchStyles>
          </div>
        </div>

        <div className="bucket-list-content">
          <div className="row nopadding">
            <div className="bucket-list-count col-md-12">
              <p>
                {`There are currently ${
                  this.state.listItems.length
                } items in your bucket list`}
              </p>
            </div>
          </div>
          <ul id="bucket-list-items" className="bucket-list-items">
            <div className="row container-list-filter">
              {/* Search bar to filter user's list items. */}
              <input    onChange={this.onFilterSearch}
                        type="text"
                        placeholder="Search for an item on your list..."
                        id="filter_list"
                        name="filter_list"
                        autoComplete="off"
                        className="list-filter col-md-8 mb-1"
                        aria-describedby="inputGroup-sizing-default"
                />
                {/* Drop down for task type filter */}
                <Dropdown className="col-md-2 mb-1" selectedvalue = {filter}>
                  <Dropdown.Toggle className="btn btn-info list-filter-dropdown" variant="success" id="dropdown-basic">
                    Show...
                  </Dropdown.Toggle>
                  <Dropdown.Menu  className="col-md-2">
                  {listItemsRenderType === 0 ?
                    <Dropdown.Item active onClick={() => { this.setState({listItemsRenderType: 0})}} value={0}>All</Dropdown.Item>
                    :
                    <Dropdown.Item onClick={() => { this.setState({listItemsRenderType: 0})}} value={0}>All</Dropdown.Item>
                  }
                  {listItemsRenderType === 1 ?
                    <Dropdown.Item active onClick={() => { this.setState({listItemsRenderType: 1})}} value={1}>Completed</Dropdown.Item>
                    :
                    <Dropdown.Item onClick={() => { this.setState({listItemsRenderType: 1})}} value={1}>Completed</Dropdown.Item>
                  }
                  {listItemsRenderType === 2 ?
                    <Dropdown.Item active onClick={() => { this.setState({listItemsRenderType: 2})}} value={2}>Incomplete</Dropdown.Item>
                    :
                    <Dropdown.Item onClick={() => { this.setState({listItemsRenderType: 2})}} value={2}>Incomplete</Dropdown.Item>
                  }
                  </Dropdown.Menu>
                </Dropdown>

                {/* Drop down for filter type */}
                <Dropdown className="col-md-2 mb-1" selectedvalue = {filter}>
                  <Dropdown.Toggle className="btn btn-info list-filter-dropdown" variant="success" id="dropdown-basic">
                    Filter by..
                  </Dropdown.Toggle>
                  <Dropdown.Menu  className="col-md-2">
                  <Dropdown.Item disabled >Select a Filter</Dropdown.Item>
                  <Dropdown.Item divider />
                  {filter === 3?
                    <Dropdown.Item active onClick={() => { this.filterSort(3) }}value={3}>Newest</Dropdown.Item>
                    :<Dropdown.Item onClick={() => { this.filterSort(3) }}value={3}>Newest</Dropdown.Item>
                  }
                  {filter === 2?
                    <Dropdown.Item active onClick={() => { this.filterSort(2) }}value={2}>Default</Dropdown.Item>
                    : <Dropdown.Item onClick={() => { this.filterSort(2) }}value={2}>Default</Dropdown.Item>
                  }
                  {filter === 0?
                    <Dropdown.Item active onClick={() => { this.filterSort(0) }}value={0}>A &rarr; Z</Dropdown.Item>
                    :<Dropdown.Item onClick={() => { this.filterSort(0) }}value={0}>A &rarr; Z</Dropdown.Item>
                  }
                  {filter === 1?
                    <Dropdown.Item active onClick={() => { this.filterSort(1) }}value={1}>Z &rarr; A</Dropdown.Item>
                    :<Dropdown.Item onClick={() => { this.filterSort(1) }}value={1}>Z &rarr; A</Dropdown.Item>
                  }


                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <SearchResults
                value={this.state.listFilterSearch}
                data={this.state.listItems}
                renderResults={results => (
                  <div className="col-md-12 nopadding">
                    {results.length > 0 &&
                      results.map(item => (
                        this.taskItemRenderTypeFilter(item)
                      ))}
                    {results.length < 1 &&
                      <p>Sorry, nothing was found. Try a different search term.</p>
                    }
                  </div>
                )}
              />
          </ul>
        </div>
      </div>
    );
  }
}

export default BucketList;
