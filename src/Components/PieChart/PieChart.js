import React from "react";
import DropDown from "../../Ui/DropDown/dropDown";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import axios from "axios";
import Loader from "../../Ui/Loader/Loader";

ChartJS.register(ArcElement, Tooltip, Legend);

export const bgColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];

class PieChart extends React.Component {
  state = {
    showOption: false,
    openOneTime: false,
    month: "March",
    data: {},
    isLoading: true,
  };
  toggleOption = () => {
    this.setState((prevState) => ({
      ...prevState,
      showOption: !prevState.showOption,
      openOneTime: true,
    }));
  };
  updateContent = (month) => {
    this.setState((prevState) => ({
      ...prevState,
      showOption: !prevState.showOption,
      openOneTime: true,
      month: month,
    }));
    this.getData(month);
  };
  getData = (month) => {
    axios
      .get("/api/v1/product/get-piechart", {
        params: { month: month },
      })
      .then((res) => {
        let data = res.data.data;
        let labels = [];
        let dataToDisplay = [];
        Object.keys(data).forEach((key) => {
          labels.push(key);
          dataToDisplay.push(data[key]);
        });

        let dataToPopulate = {
          labels,
          datasets: [
            {
              label: "Sold Item",
              data: dataToDisplay,
              backgroundColor: bgColor.slice(0, dataToDisplay.length),
              borderColor: bgColor.slice(0, dataToDisplay.length),
              borderWidth: 1,
            },
          ],
        };

        console.log(dataToPopulate);
        this.setState((prevState) => ({
          ...prevState,
          isLoading: false,
          data: dataToPopulate,
        }));
      })
      .catch((err) => {
        this.setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      });
  };
  componentDidMount = () => {
    this.setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    this.getData("March");
  };
  render() {
    return (
      <div className="Bar-container">
        <div className="Bar-header">
          <div className="month">
            <h3 style={{ marginTop: 0 }}>Pie Chart - {this.state.month}</h3>
          </div>
          <div className="select-month">
            <DropDown
              toggleOption={this.toggleOption}
              showOption={this.state.showOption}
              openOneTime={this.state.openOneTime}
              updateContent={this.updateContent}
            />
          </div>
        </div>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div className="transaction-content">
            <Pie data={this.state.data} />
          </div>
        )}
      </div>
    );
  }
}

export default PieChart;
