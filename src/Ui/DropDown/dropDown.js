import React from "react";
import "./dropDown.css";

class DropDown extends React.Component {
  state = {
    month: "March",
  };
  changeMonth = (month) => {
    //Call The Function in main class to change the Content
    this.props.updateContent(month);
    this.setState((prevState) => ({
      ...prevState,
      month: month,
    }));
  };
  render() {
    return (
      <>
        <div className={"inputContainer"}>
          <input readOnly={true} placeholder={this.state.month} />
          <div onClick={this.props.toggleOption} className="dropdownicon">
            <i
              class="fa-solid fa-chevron-down"
              style={{ color: "#ebb840" }}
            ></i>
          </div>
        </div>
        <div
          className={`option ${
            this.props.showOption
              ? "animate-option"
              : this.props.openOneTime
              ? "deanimate-option"
              : ""
          }`}
        >
          <div
            onClick={() => {
              this.changeMonth("January");
            }}
          >
            January
          </div>
          <hr />
          <div
            onClick={() => {
              this.changeMonth("February");
            }}
          >
            February
          </div>
          <hr />
          <div
            onClick={() => {
              this.changeMonth("March");
            }}
          >
            March
          </div>
          <hr />
          <div
            onClick={() => {
              this.changeMonth("April");
            }}
          >
            April
          </div>
          <hr />
          <div
            onClick={() => {
              this.changeMonth("May");
            }}
          >
            May
          </div>
          <hr />
          <div
            onClick={() => {
              this.changeMonth("June");
            }}
          >
            June
          </div>
          <hr />
          <div
            onClick={() => {
              this.changeMonth("July");
            }}
          >
            July
          </div>
          <hr />
          <div
            onClick={() => {
              this.changeMonth("August");
            }}
          >
            August
          </div>
          <hr />
          <div
            onClick={() => {
              this.changeMonth("September");
            }}
          >
            September
          </div>
          <hr />
          <div
            onClick={() => {
              this.changeMonth("October");
            }}
          >
            October
          </div>
          <hr />
          <div
            onClick={() => {
              this.changeMonth("November");
            }}
          >
            November
          </div>
          <hr />
          <div
            onClick={() => {
              this.changeMonth("December");
            }}
          >
            December
          </div>
          <hr />
        </div>
      </>
    );
  }
}

export default DropDown;
