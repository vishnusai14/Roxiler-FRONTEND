import React from "react";
import BarChart from "../BarChart/BarChart";
import PieChart from "../PieChart/PieChart";
import Statistics from "../Statistics/statistics";
import Transaction from "../Transaction/Transaction";
import "./Main.css";
class Main extends React.Component {
  state = {
    selectedHeader: "Transaction",
  };
  changePage = (page) => {
    this.setState((prevState) => ({
      ...prevState,
      selectedHeader: page,
    }));
  };
  render() {
    return (
      <div className="container">
        <div className="headers">
          <div
            onClick={() => {
              this.changePage("Transaction");
            }}
            className={`header table ${
              this.state.selectedHeader === "Transaction"
                ? "header-selected"
                : ""
            }`}
          >
            <p>Transaction New</p>
          </div>

          <div
            onClick={() => {
              this.changePage("Statistics");
            }}
            className={`header statistics ${
              this.state.selectedHeader === "Statistics"
                ? "header-selected"
                : ""
            }`}
          >
            <p>Statistics New</p>
          </div>

          <div
            onClick={() => {
              this.changePage("Bar");
            }}
            className={`header barchart ${
              this.state.selectedHeader === "Bar" ? "header-selected" : ""
            }`}
          >
            <p>Bar Chart New</p>
          </div>

          <div
            onClick={() => {
              this.changePage("Pie");
            }}
            className={`header piechart ${
              this.state.selectedHeader === "Pie" ? "header-selected" : ""
            }`}
          >
            <p>Pie Chart New</p>
          </div>
        </div>

        <div className="main-content">
          {this.state.selectedHeader === "Statistics" ? <Statistics /> : null}

          {this.state.selectedHeader === "Transaction" ? <Transaction /> : null}
          {this.state.selectedHeader === "Bar" ? <BarChart /> : null}
          {this.state.selectedHeader === "Pie" ? <PieChart /> : null}
        </div>
      </div>
    );
  }
}

export default Main;
