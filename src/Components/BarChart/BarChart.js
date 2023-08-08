import React from "react";
import DropDown from "../../Ui/DropDown/dropDown";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import Loader from "../../Ui/Loader/Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sold Item Statistics",
    },
  },
};

class BarChart extends React.Component {
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
      .get("/api/v1/product/get-barchart", {
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

        console.log(labels);
        console.log(dataToDisplay);
        let dataToPopulate = {
          labels,
          datasets: [
            {
              label: "Sold Item",
              data: dataToDisplay,
              backgroundColor: "rgb(108, 229,232)",
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
            <h3 style={{ marginTop: 0 }}>Bar Chart - {this.state.month}</h3>
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
            <Bar options={options} data={this.state.data} />
          </div>
        )}
      </div>
    );
  }
}

export default BarChart;
