import React from "react";
import DropDown from "../../Ui/DropDown/dropDown";
import "./statistics.css";
import axios from "axios";
import Loader from "../../Ui/Loader/Loader";

class Statistics extends React.Component {
  state = {
    showOption: false,
    openOneTime: false,
    month: "March",
    isLoading: true,
    totalSale: 0,
    totalSoldItem: 0,
    totalNotSoldItem: 0,
  };
  toggleOption = () => {
    this.setState((prevState) => ({
      ...prevState,
      showOption: !prevState.showOption,
      openOneTime: true,
    }));
  };
  updateContent = (month) => {
    //Update the Ui to Loading State and change the content
    this.setState((prevState) => ({
      ...prevState,
      showOption: !prevState.showOption,
      openOneTime: true,
      month: month,
      isLoading: true,
    }));
    axios
      .get("/api/v1/product/get-statistics", {
        params: { month: month },
      })
      .then((res) => {
        this.setState((prevState) => ({
          ...prevState,
          isLoading: false,
          totalSale: res.data.data.totalSale,
          totalSoldItem: res.data.data.soldNumber,
          totalNotSoldItem: res.data.data.notSoldNumber,
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
    axios
      .get("/api/v1/product/get-statistics", {
        params: { month: this.state.month },
      })
      .then((res) => {
        this.setState((prevState) => ({
          ...prevState,
          isLoading: false,
          totalSale: res.data.data.totalSale,
          totalSoldItem: res.data.data.soldNumber,
          totalNotSoldItem: res.data.data.notSoldNumber,
        }));
      })
      .catch((err) => {
        this.setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      });
  };
  render() {
    return (
      <div className="statistics-container">
        <div className="staistics-header">
          <div className="month">
            <h3 style={{ marginTop: 0 }}>Statistics - {this.state.month}</h3>
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
          <div className="statistics-content">
            <div className="content content-1">
              <div>Total Sale</div>
              <div>Rs. {this.state.totalSale}</div>
            </div>
            <div className="content content-1">
              <div>Total Sold Item</div>
              <div>{this.state.totalSoldItem}</div>
            </div>
            <div className="content content-1">
              <div>Total Not Sold Item</div>
              <div>{this.state.totalNotSoldItem}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Statistics;
