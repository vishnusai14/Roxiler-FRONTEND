import React from "react";
import DropDown from "../../Ui/DropDown/dropDown";
import "./Transaction.css";
import axios from "axios";
import Loader from "../../Ui/Loader/Loader";

class Transaction extends React.Component {
  state = {
    showOption: false,
    openOneTime: false,
    month: "March",
    limit: 10,
    searchTerm: "",
    currentPage: 1,
    totalCount: 0,
    data: [],
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
    //Update the Ui to Loading State and change the content
    this.setState((prevState) => ({
      ...prevState,
      showOption: !prevState.showOption,
      openOneTime: true,
      month: month,
    }));
    this.getData(month, this.state.searchTerm, 1, this.state.limit);
  };
  updatePerPage = (e) => {
    console.log(e);
    this.setState((prevState) => ({
      ...prevState,
      limit: e.target.value,
    }));
    this.getData(this.state.month, this.state.searchTerm, 1, e.target.value);
  };
  updateSearch = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      searchTerm: e.target.value,
    }));
  };
  moveBack = () => {
    console.log("Moving Back");
    if (this.state.currentPage !== 1) {
      this.setState((prevState) => ({
        ...prevState,
        currentPage: this.state.currentPage - 1,
      }));
      this.getData(
        this.state.month,
        this.state.searchTerm,
        this.state.currentPage - 1,
        this.state.limit
      );
    }
  };
  moveFront = () => {
    if (!(this.state.limit * this.state.currentPage >= this.state.totalCount)) {
      this.setState((prevState) => ({
        ...prevState,
        currentPage: this.state.currentPage + 1,
      }));
      this.getData(
        this.state.month,
        this.state.searchTerm,
        this.state.currentPage + 1,
        this.state.limit
      );
    }
  };

  searchTerm = () => {
    this.getData(this.state.month, this.state.searchTerm, 1, this.state.limit);
  };

  getData = (month, searchTerm, page, limit) => {
    this.setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    axios
      .get("/api/v1/product/get-data", {
        params: {
          month: month,
          page: page,
          limit: limit,
          searchTerm: searchTerm,
        },
      })
      .then((res) => {
        this.setState((prevState) => ({
          ...prevState,
          isLoading: false,
          data: res.data.data,
          totalCount: res.data.totalData,
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
    this.getData("March", "", 1, 10);
  };

  render() {
    return (
      <div className="transaction-container">
        <div className="transaction-header">
          <div className="search">
            <input
              className="input-tag"
              readOnly={false}
              placeholder="Search Transaction"
              value={this.state.searchTerm}
              onChange={(e) => {
                this.updateSearch(e);
              }}
            />{" "}
            <div
              onClick={() => {
                this.searchTerm();
              }}
              style={{ cursor: "pointer", marginLeft: "4px" }}
            >
              <i
                style={{ color: "#ebb840" }}
                class="fa-solid fa-magnifying-glass"
              ></i>
            </div>
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
            <div style={{ height: "450px", overflowY: "auto" }}>
              <table>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Sold</th>
                  <th>Image</th>
                </tr>

                {this.state.data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                      <td>{item.category}</td>
                      <td>{item.sold}</td>
                      <td>{item.image}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
            <div className="footer">
              <div>Page Number : {this.state.currentPage}</div>
              <div style={{ display: "flex" }}>
                <div
                  className={this.state.currentPage === 1 ? "disable" : ""}
                  onClick={() => {
                    this.moveBack();
                  }}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                >
                  Previous
                </div>
                <div
                  className={
                    this.state.limit * this.state.currentPage >=
                    this.state.totalCount
                      ? "disable"
                      : ""
                  }
                  onClick={() => {
                    this.moveFront();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Next
                </div>
              </div>
              <div>
                Per Page :{" "}
                <select
                  onChange={(e) => {
                    this.updatePerPage(e);
                  }}
                >
                  <option
                    selected={this.state.limit === parseInt("1") ? true : false}
                    value={1}
                  >
                    1
                  </option>
                  <option
                    selected={this.state.limit === parseInt("2") ? true : false}
                    value={2}
                  >
                    2
                  </option>
                  <option
                    selected={this.state.limit === parseInt("3") ? true : false}
                    value={3}
                  >
                    3
                  </option>
                  <option
                    selected={this.state.limit === parseInt("4") ? true : false}
                    value={4}
                  >
                    4
                  </option>
                  <option
                    selected={this.state.limit === parseInt("5") ? true : false}
                    value={5}
                  >
                    5
                  </option>
                  <option
                    selected={this.state.limit === parseInt("6") ? true : false}
                    value={6}
                  >
                    6
                  </option>
                  <option
                    selected={this.state.limit === parseInt("7") ? true : false}
                    value={7}
                  >
                    7
                  </option>
                  <option
                    selected={this.state.limit === parseInt("8") ? true : false}
                    value={8}
                  >
                    8
                  </option>
                  <option
                    selected={this.state.limit === parseInt("9") ? true : false}
                    value={9}
                  >
                    9
                  </option>
                  <option
                    selected={
                      this.state.limit === parseInt("10") ? true : false
                    }
                    value={10}
                  >
                    10
                  </option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Transaction;
