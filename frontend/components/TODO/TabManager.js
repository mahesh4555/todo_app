import React from "react";
import ContentManager from "./ContentManager";
// import tabsData from "./tabsData";
import "./stylestab.css";
let arr = [];
class TabManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      // tabsData: props.tabsData,
      tabList: "",
      contentList: "",
      dropDownSelect: "",
      isTodoPressed: false,
    };
  }

  handleTabChange = (event) => {
    console.log("Tab clicked:", event.target.name);
    const { id, name } = event.target;

    this.setState({
      activeTab: name,
    });
    this.dispData(name);
  };
  handleTaskStatusChange = async (event) => {
    console.log("handleTaskStatusChange");
    const { name, id, value } = event.target;
    console.log("name:", name);
    console.log("id:", id);
    console.log("value:", value);

    let data = {
      _id: id,
      changedState: parseInt(value),
    };
    await this.props.UpdateTodoData(data);
    //I got the response data   after adding to the serverand saved to this.state.data
    //So commenting the below function
    // await this.props.FetchTodoData();
    await this.dispData(this.state.activeTab);
  };

  taskStatusDropDownOptionsSet = () => {
    const dropDownSelect = this.props.tabs.map((tab) => {
      return <option value={tab.state}>{tab.label}</option>;
    });
    this.setState({
      dropDownSelect: dropDownSelect,
    });
  };

  dispData = (clickedTab) => {
    arr = [];
    console.log("dispData");

    // this.props.tabsData.forEach(this.labelCollect);
    console.log("tabList");
    let style1 = { color: "black", backgroundColor: "#666" };
    let style2 = { color: "black", backgroundColor: "#f1f1f1" };
    const tabList = this.props.tabs.map((tab) => {
      console.log("clickedTab :", clickedTab);
      console.log("tab.state :", tab.state);
      let active = "dummy";
      let style = tab.state == clickedTab ? style1 : style2;
      console.log("tab.label :", tab.label);
      console.log("tab ------ active :", style);

      // let style1={ color: "blue"  }
      // let style2={ color: "none"  }

      return (
        <button
          // style={{ color: active ? "blue" : "none" }}
          style={style}
          key={tab._id}
          id={tab._id}
          name={tab.state}
          onClick={this.handleTabChange}
        >
          {tab.label}
        </button>
      );
    });

    console.log("contentList");
    const contentList = this.props.data.map((data) => {
      let active = data.currentState == clickedTab ? true : false;
      console.log("activeTab :", this.state.activeTab);
      console.log("data.currentState :", data.currentState);
      console.log("clickedTab :", clickedTab);

      console.log("tab_id :", data._id);

      console.log("active :", active);
      return (
        <div
          style={{
            display: active ? "block" : "none",
            padding: "6px 12px",
            border: "1px solid #ccc",
            borderTop: "none",
          }}
          key={data._id}
          id={data._id}
        >
          <b>{data.name}</b>
          <p>{data.content}</p>
          <select
            name="state"
            id={data._id}
            onChange={this.handleTaskStatusChange}
          >
            {/* <option value="1">Todo</option>
            <option value="2">Inprogress</option>
            <option value="3">Completed</option> */}
            {this.state.dropDownSelect}
          </select>
        </div>
      );
    });

    this.setState({
      tabList: tabList,
      contentList: contentList,
    });
  };

  // FetchInitialState = async () => {
  //   console.log("calling FetchInitialState");
  //   this.setState({
  //     isTodoPressed: false,
  //   });

  //   await this.props.FetchTodoTabsAndData();
  //   await this.dispData(1);
  //   this.setState({
  //     isTodoPressed: true,
  //   });
  // };

  handleAddTodoButtonClick = async (event) => {
    console.log("calling handleAddTodoButtonClick");
    let new_task_header = document.getElementById("new_task_header").value;
    let new_task_text = document.getElementById("new_task_text").value;
    let new_task_state = parseInt(
      document.getElementById("new_task_state").value
    );
    console.log("new_task_header :", new_task_header);
    console.log("new_task_text :", new_task_text);
    console.log("new_task_state :", new_task_state);

    let data = {
      name: new_task_header,
      content: new_task_text,
      currentState: new_task_state,
    };
    await this.props.AddTodoData(data);
    //I got the response data   after adding to the serverand saved to this.state.data
    //So commenting the below function
    // await this.props.FetchTodoData();
    await this.dispData(1);
  };

  //both using Promise and async await are similar, refer to S44 code
  async componentDidMount() {
    await this.props.FetchTodoTabsAndData();
    await this.taskStatusDropDownOptionsSet();
    await this.dispData(1);
    this.setState({
      isTodoPressed: true,
    });
  }

  render() {
    return (
      <ContentManager
        FetchInitialState={this.FetchInitialState}
        handleAddTodoButtonClick={this.handleAddTodoButtonClick}
        tabManagerState={this.state}
      />
    );
  }
}

export default TabManager;

//   render() {
//     console.log(this.state.activeTab);
//     // console.log("Calling dispData");

//     return (
//       <div>
//         <br />
//         {/* <button onClick={this.FetchInitialState}>Press Me to Todo Tasks</button> */}

//         <br />
//         <br />

//         <div
//           style={{
//             display: this.state.isTodoPressed ? "block" : "none",
//           }}
//         >
//           <label>
//             <label htmlFor="taskname">Task name </label>
//             <input type="text" id="new_task_header" name="new_task_header" />

//             <br style={{ lineHeight: "10" }} />
//             <label htmlFor="taskcontent">Description </label>
//             <input type="text" id="new_task_text" name="new_task_text" />
//             <br />
//             <select id="new_task_state" name="new_task_state">
//               <option value="1">Todo</option>
//               <option value="2">Inprogress</option>
//               <option value="3">Completed</option>
//             </select>
//             <br />

//             <br />

//             <button id="new_task" onClick={this.handleAddTodoButtonClick}>
//               Add Todo
//             </button>
//             <br />
//             <br />
//             <br />

//             {/* <input type="button" id="new_task"> */}
//           </label>

//           <div className="tabs">{this.state.tabList}</div>
//           {this.state.contentList}
//           <br />
//           <br />
//           <br />
//         </div>

//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//       </div>
//     );
//   }
// }
