import React from "react";
import LinesEllipsis from "react-lines-ellipsis";
import Navbar from "../../../components/Navbar";
import "./styles.css";
import axios from "axios";
import $ from "jquery";
import Footer from "../../../components/Footer";

export default class RoomTypeCustomer extends React.Component {
  constructor() {
    super();
    this.state = {
      typeroom: [],
      id_room_type: "",
      name_room_type: "",
      price: "",
      description: "",
      photo: "",
      role: "",
      keyword: "",
      token: "",
    };

    if (localStorage.getItem("token")) {
      if (localStorage.getItem("role") === "customer") {
        this.state.email = localStorage.getItem("email");
        this.state.role = localStorage.getItem("role");
        this.state.token = localStorage.getItem("token");
      } else {
        window.alert("You're not customer!");
        window.location = "/login";
      }
    }
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };

  getTypeRoom = () => {
    let url = "http://localhost:8080/room-type";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          typeroom: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSearch = () => {
    let data = {
      keyword: this.state.keyword,
    };
    let url = "http://localhost:8080/room-type/find/filter";
    axios
      .post(url, data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            typeroom: response.data.data,
          });
        } else {
          alert(response.data.message);
          this.setState({ message: response.data.message });
        }
      })
      .catch((error) => {
        console.log("error", error.response.status);
      });
  };

  handleClose = () => {
    $("#modal_detail").hide();
  };

  handleDetail = (item) => {
    $("#modal_detail").show();
    this.setState({
      id_room_type: item.id_room_type,
      name_room_type: item.name_room_type,
      price: item.price,
      description: item.description,
      photo: item.photo,
    });
  };

  componentDidMount() {
    this.getTypeRoom();
  }

  render() {
    return (
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800 pt-20">
        <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-300 ease-in">
          <Navbar />
          <div class="main-content flex flex-col flex-grow p-4 pl-16 mb-16 ">
            <div class="mb-4">
              <div className="justify-items-center w-1/2">
                <div className="rounded mb-5">
                  <label
                    for="default-search"
                    class="mb-2 text-sm font-medium text-gray-900 sr-only"
                  >
                    Search
                  </label>
                  <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg
                        class="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-sky-500 focus:border-sky-500"
                      placeholder="Search Room Type"
                      name="keyword"
                      value={this.state.keyword}
                      onChange={this.handleChange}
                    />
                    <button
                      type="submit"
                      class="text-white absolute right-2.5 bottom-2.5 bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-4 py-2"
                      onClick={this.handleSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-y-4">
              {this.state.typeroom.map((item, index) => (
                <div class="col-span-1">
                  <div class="CardEvent" key={index}>
                    <div class="max-w-sm rounded overflow-hidden shadow-lg">
                      <img
                        class="w-full h-48"
                        src={
                          "http://localhost:8080/uploads/image/" + item.photo
                        }
                        alt="images not found"
                      />
                      <div class="px-6 py-4">
                        <div class="font-bold text-2xl mb-2">
                          {item.name_room_type}
                        </div>
                        <div class="font-bold text-xl mb-2 text-sky-600">
                          Rp {item.price}/Night
                        </div>
                        <p class="text-gray-700 text-base">
                          <LinesEllipsis
                            text={item.description}
                            maxLine="3"
                            ellipsis="..."
                          />
                        </p>
                      </div>
                      <div class="ml-1 pt-4 pb-2">
                        <button
                          class="mb-2 ml-40 bg-sky-600 hover:bg-sky-700 text-white font-bold p-2 w-1/3 rounded focus:outline-none focus:shadow-outline transition transform duration-300"
                          type="button"
                          onClick={() => this.handleDetail(item)}
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            id="modal_detail"
            tabindex="-1"
            class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full pt-10 pb-10 pl-96 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
          >
            <div class="relative w-full h-full max-w-lg md:h-auto border-2 border-gray-500 rounded-lg shadow-2xl items-center justify-center">
              <div class="relative bg-white rounded-lg">
                <div class="flex items-center justify-between p-5 border-b rounded-t border-gray-500">
                  <h3 class="p-2 text-xl font-medium text-gray-900 ">
                    {this.state.name_room_type} Room
                  </h3>
                  <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-red-500 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:text-white"
                    data-modal-hide="medium-modal"
                    onClick={() => this.handleClose()}
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div class="p-6">
                  <div className="container">
                    <img
                      class="rounded-md w-full h-64"
                      alt="images not found"
                      src={
                        "http://localhost:8080/uploads/image/" +
                        this.state.photo
                      }
                    />
                  </div>
                  <div class="px-2 py-4">
                    <div class="font-bold text-2xl mb-2">
                      {this.state.name_room_type}
                    </div>
                    <div class="font-bold text-xl mb-2 text-sky-600">
                      Rp {this.state.price}/Night
                    </div>
                    <p class="text-black-700 text-base">
                      {this.state.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}
