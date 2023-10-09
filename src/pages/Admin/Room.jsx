import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "./Pagination.styles.css"

export default class Room extends React.Component {
  constructor() {
    super();
    this.state = {
      room: [],
      typeroom: [],
      id_room_type: "",
      id_room: "",
      name_room_type: "",
      room_number: "",
      role: "",
      token: "",
      keyword: "",
      action: "",
      currentPage: 1,
      itemsPerPage: 5,
    };

    if (localStorage.getItem("token")) {
      if (
        localStorage.getItem("role") === "admin" ||
        localStorage.getItem("role") === "resepsionis"
      ) {
        this.state.token = localStorage.getItem("token");
        this.state.role = localStorage.getItem("role");
      } else {
        window.alert("You're not admin or resepsionis!");
        window.location = "/";
      }
    }
  }

  setCurrentPage = (page) => {
    this.setState({ currentPage: page });
  };

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClose = () => {
    $("#modal_room").hide();
  };

  handleAdd = () => {
    $("#modal_room").show();
    this.setState({
      room_number: "",
      id_room_type: "",
      action: "insert",
    });
  };

  handleEdit = (item) => {
    $("#modal_room").show();
    this.setState({
      id_room: item.id_room,
      room_number: item.room_number,
      id_room_type: item.id_room_type,
      action: "update",
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    let data = {
      room_number: this.state.room_number,
      id_room_type: this.state.id_room_type,
    };

    if (this.state.action === "insert") {
      let url = "http://localhost:8080/room/add";
      axios
        .post(url, data, this.headerConfig())
        .then((response) => {
          this.getRoom();
          this.handleClose();
        })
        .catch((error) => {
          console.log("error add data", error.response.status);
          if (error.response.status === 500) {
            window.alert("Failed to add data");
          }
        });
    } else {
      let url = "http://localhost:8080/room/update/" + this.state.id_room;
      axios
        .put(url, data, this.headerConfig())
        .then((response) => {
          this.getRoom();
          this.handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleDrop = (id) => {
    let url = "http://localhost:8080/room/delete/" + id;
    if (window.confirm("Are tou sure to delete this type room ? ")) {
      axios
        .delete(url, this.headerConfig())
        .then((response) => {
          console.log(response.data.message);
          this.getRoom();
        })
        .catch((error) => {
          if (error.response.status === 500) {
            window.alert("You can't delete this data");
          }
        });
    }
  };

  handleSearch = () => {
    let data = {
      keyword: this.state.keyword,
    };
    let url = "http://localhost:8080/room/find/filter";
    axios
      .post(url, data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            room: response.data.data,
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

  getRoom = () => {
    let url = "http://localhost:8080/room/";
    axios
      .get(url)
      .then((response) => {
        const sortedRoom = response.data.data.sort((a, b) =>
          moment(a.room_number).diff(b.room_number)
        );
        this.setState({
          room: sortedRoom,
        });
      })
      .catch((error) => {
        console.log(error);
      });
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

  checkRole = () => {
    if (this.state.role !== "admin") {
      localStorage.clear();
      window.location = "/";
    }
  };

  componentDidMount() {
    this.getRoom();
    this.checkRole();
    this.getTypeRoom();
  }

  formatIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  render() {
    const room = "Room";

    const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
    const currentItems = this.state.room.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    const totalPageCount = Math.ceil(
      this.state.room.length / this.state.itemsPerPage
    );
    
    const pageNumbers = [];
    if (totalPageCount <= 6) {
      for (let i = 1; i <= totalPageCount; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (this.state.currentPage <= 3) {
        pageNumbers.push(1, 2, 3, "...", totalPageCount);
      } else if (this.state.currentPage >= totalPageCount - 2) {
        pageNumbers.push(1, "...", totalPageCount - 2, totalPageCount - 1, totalPageCount);
      } else {
        pageNumbers.push(1, "...", this.state.currentPage - 1, this.state.currentPage, this.state.currentPage + 1, "...", totalPageCount);
      }
    }
    
    const renderPageNumbers = pageNumbers.map((number, index) => {
      if (number === "...") {
        return (
          <li key={index} className="disabled">
            ...
          </li>
        );
      }
      return (
        <li
          key={index}
          className={number === this.state.currentPage ? "active" : ""}
          onClick={() => this.setCurrentPage(number)}
        >
          {number}
        </li>
      );
    });

    return (
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <Sidebar />
        <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <Header title={room} />
          <div class="main-content flex flex-col flex-grow p-4">
            <div class="mb-4 flex flex-row">
              <div className="justify-items-center w-1/2">
                <div className="rounded ml-5">
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
                      placeholder="Please search only by room number"
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
              <button
                className="ml-2 px-4 text-white bg-sky-600 rounded hover:bg-sky-700"
                onClick={() => this.handleAdd()}
              >
                <FontAwesomeIcon icon={faPlus} /> Add
              </button>
            </div>
            <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
              <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                      ID Room
                    </th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                      Room Number
                    </th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                      ID Room Type
                    </th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                      Room Name
                    </th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                  {currentItems.map((item, index) => {
                    return (
                      <tr class="hover:bg-gray-50" key={index}>
                        <td class="px-6 py-4">{item.id_room}</td>
                        <td class="px-6 py-4">{item.room_number}</td>
                        <td class="px-6 py-4">{item.id_room_type}</td>
                        <td class="px-6 py-4">
                          {item.room_type.name_room_type}
                        </td>
                        <td class="px-6 py-4">
                          {this.formatIDR(item.room_type.price)}
                        </td>
                        <td class="px-6 py-4">
                          <button
                            class="mr-2 hover:bg-red-500 hover:text-white transition transfrom duration-300 p-2 rounded-md hover:shadow-lg"
                            onClick={() => this.handleDrop(item.id_room)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="h-6 w-6"
                              x-tooltip="tooltip"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                          <button
                            className="hover:bg-yellow-500 hover:text-white transition transfrom duration-300 p-2 rounded-md hover:shadow-lg"
                            onClick={() => this.handleEdit(item)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="h-6 w-6"
                              x-tooltip="tooltip"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <ul className="pagination">{renderPageNumbers}</ul>
          </div>

          <footer class="footer px-4 py-2">
            <div class="footer-content">
              <p class="text-sm text-gray-600 text-center">
                © 2023 Wikusama Hotel
              </p>
            </div>
          </footer>
        </main>

        <div
          id="modal_room"
          tabindex="-1"
          aria-hidden="true"
          class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
        >
          <div class="flex lg:h-auto w-auto justify-center ">
            <div class="relative bg-white rounded-lg shadow dark:bg-white w-1/3">
              <button
                type="button"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
                <span class="sr-only">Tutup modal</span>
              </button>
              <div class="px-6 py-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-black">
                  Edit Room
                </h3>
                <form
                  class="space-y-6"
                  onSubmit={(event) => this.handleSave(event)}
                >
                  <div>
                    <label
                      for="room_number"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                    >
                      Room Number
                    </label>
                    <input
                      type="number"
                      name="room_number"
                      id="room_number"
                      value={this.state.room_number}
                      onChange={this.handleChange}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                      placeholder="Input room number"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="id_room_type"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                    >
                      Room Type
                    </label>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                      placeholder="ID Room Type"
                      name="id_room_type"
                      value={this.state.id_room_type}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Choose Room Type </option>
                      {this.state.typeroom.map((item, index) => (
                        <option value={item.id_room_type}>
                          {item.name_room_type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    class="w-full text-white bg-gradient-to-br from-purple-600 to-sky-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
