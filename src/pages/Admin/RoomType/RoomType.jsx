import React from "react";
import LinesEllipsis from "react-lines-ellipsis";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencilSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import $ from "jquery";

export default class RoomType extends React.Component {
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
      token: "",
      action: "",
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

  handleFile = (e) => {
    this.setState({
      photo: e.target.files[0],
    });
  };

  handleClose = () => {
    $("#modal_roomType").hide();
    $("#modal_detail").hide();
  };

  handleAdd = () => {
    $("#modal_roomType").show();
    this.setState({
      id_room_type: "",
      name_room_type: "",
      price: "",
      description: "",
      photo: "",
      action: "insert",
    });
  };

  handleEdit = (item) => {
    $("#modal_roomType").show();
    this.setState({
      id_room_type: item.id_room_type,
      name_room_type: item.name_room_type,
      price: item.price,
      description: item.description,
      photo: item.photo,
      action: "update",
    });
  };

  handleSave = (e) => {
    e.preventDefault();

    let form = new FormData();
    form.append("id_room_type", this.state.id_room_type);
    form.append("name_room_type", this.state.name_room_type);
    form.append("price", this.state.price);
    form.append("description", this.state.description);
    form.append("photo", this.state.photo);

    if (this.state.action === "insert") {
      let url = "http://localhost:8080/room-type/add";
      axios
        .post(url, form, this.headerConfig())
        .then((response) => {
          this.getTypeRoom();
          this.handleClose();
        })
        .catch((error) => {
          console.log("error add data", error.response.status);
          if (error.response.status === 500) {
            window.alert("Failed to add data");
          }
        });
    } else {
      let url =
        "http://localhost:8080/room-type/update/" + this.state.id_room_type;
      axios
        .put(url, form, this.headerConfig())
        .then((response) => {
          this.getTypeRoom();
          this.handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleDrop = (id) => {
    let url = "http://localhost:8080/room-type/delete/" + id;
    if (window.confirm("Are tou sure to delete this type room ? ")) {
      axios
        .delete(url, this.headerConfig())
        .then((response) => {
          console.log(response.data.message);
          this.getTypeRoom();
        })
        .catch((error) => {
          if (error.response.status === 500) {
            window.alert("You can't delete this data");
          }
        });
    }
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

  componentDidMount() {
    this.getTypeRoom();
  }

  formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  render() {
    const roomType = "Room Type";
    return (
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <Sidebar />
        <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <Header title={roomType} />
          <div class="main-content flex flex-col flex-grow p-4">
            <div class="mb-4 flex flex-row">
              <div className="justify-items-center w-1/2">
                <div className="rounded">
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
              <button
                className="ml-2 px-4 font-bold text-white bg-sky-600 rounded hover:bg-sky-700"
                onClick={() => this.handleAdd()}
              >
                <FontAwesomeIcon icon={faPlus} /> Add
              </button>
            </div>
            <div class="grid grid-cols-3 gap-4">
              {this.state.typeroom.map((item, index) => (
               
                <div class="col-span-1">
                  {/* Card untuk type room */}
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
                          {this.formatIDR(item.price)}/Night
                        </div>
                        <p class="text-gray-700 text-base">
                          <LinesEllipsis
                            text={item.description}
                            maxLine="3"
                            ellipsis="..."
                          />
                          <button
                            onClick={() => this.handleDetail(item)}
                            class="text-sky-800 font-bold"
                          >
                            See All
                          </button>
                        </p>
                      </div>
                      <div class="button mb-14 mt-4">
                        <button
                          class="edit"
                          onClick={() => this.handleEdit(item)}
                        >
                          <FontAwesomeIcon
                            icon={faPencilSquare}
                            size="xl"
                            color="#fff"
                          />
                        </button>
                        <button
                          class="delete"
                          onClick={() => this.handleDrop(item.id_room_type)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            size="lg"
                            color="red"
                          />
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
                      {this.formatIDR(this.state.price)}/night
                    </div>
                    <p class="text-black-700 text-base">
                      {this.state.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
          id="modal_roomType"
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
                  Edit Type Room
                </h3>
                <form
                  class="space-y-6"
                  onSubmit={(event) => this.handleSave(event)}
                >
                  <div>
                    <label
                      for="name_room_type"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                    >
                      Name Room Type
                    </label>
                    <input
                      type="text"
                      name="name_room_type"
                      id="name_room_type"
                      value={this.state.name_room_type}
                      onChange={this.handleChange}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                      placeholder="Masukkan name room type"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                    >
                      Price Room Type
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={this.state.price}
                      onChange={this.handleChange}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                      placeholder="Masukkan price room type"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="description"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                    >
                      Description Room Type
                    </label>
                    <textarea
                      rows="3"
                      type="text"
                      name="description"
                      id="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                      placeholder="Masukkan description room type"
                    />
                  </div>
                  <div>
                    <label
                      for="photo"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                    >
                      Photo Room Type
                    </label>
                    <input
                      type="file"
                      name="photo"
                      id="photo"
                      placeholder="Pilih photo user"
                      onChange={this.handleFile}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-800 block w-full px-2 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                      required={this.state.action === "update" ? false : true}
                    />
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
