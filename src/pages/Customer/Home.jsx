import React from "react";
import Navbar from "../../components/Navbar";
import images from "../../assets/hotel-cust.jpeg";
import axios from "axios";
import LinesEllipsis from "react-lines-ellipsis";
import $ from "jquery";
import moment from "moment";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      rooms: [],
      room_type: [],
      booking: [],
      resepsionis: [],
      id_user: "",
      id_customer: "",
      id_room: "",
      total_room: "",
      id_room_type: "",
      name_room_type: "",
      price: "",
      description: "",
      photo: "",
      id_booking: "",
      booking_number: "",
      booking_date: "",
      guest_name: "",
      check_in_date: "",
      check_out_date: "",
      in: "",
      out: "",
      token: "",
      role: "",
      action: "",
      isLogin: false,
    };

    this.state.id_customer = localStorage.getItem("id_customer");
    this.state.token = localStorage.getItem("token");
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

  handleClose = () => {
    $("#modal_detail").hide();
    $("#modal_booking").hide();
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

  showModal = () => {
    $("#modal_booking").show();
    this.setState({
      id_user: "",
      id_customer: this.state.id_customer,
      id_room_type: "",
      booking_number: Math.floor(Math.random() * 90000) + 10000,
      booking_date: moment().format("DD/MM/YYYY"),
      check_in_date: "",
      check_out_date: "",
      guest_name: "",
      total_room: "",
      action: "insert",
    });
    console.log(this.state.booking_date);
  };

  handleAddBooking = () => {
    let form = {
      id_user: this.state.id_user,
      id_customer: this.state.id_customer,
      id_room_type: this.state.id_room_type,
      booking_number: this.state.booking_number,
      booking_date: this.state.booking_date,
      check_in_date: this.state.check_in_date,
      check_out_date: this.state.check_out_date,
      guest_name: this.state.guest_name,
      total_room: this.state.total_room,
    };
    let url = "http://localhost:8080/booking/add";
    axios
      .post(url, form, this.headerConfig())
      .then((response) => {
        this.getBooking();
        this.handleClose();
        window.location = "/booking";
      })
      .catch((error) => {
        console.log("error add data", error);
      });
  };

  handleFilter = () => {
    let data = {
      check_in_date: this.state.in,
      check_out_date: this.state.out,
    };
    let url = "http://localhost:8080/room/find/available";
    axios
      .post(url, data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            rooms: response.data.room,
          });
          console.log("rooms", response.data.room);
        } else {
          alert(response.data.message);
          this.setState({ message: response.data.message });
        }
      })
      .catch((error) => {
        console.log("error", error.response.status);
      });
  };

  getBooking = () => {
    let url = "http://localhost:8080/booking";
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({
          room: response.data.data,
        });
        console.log(response.data.data);
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
          room_type: response.data.data,
        });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUser = () => {
    let url = "http://localhost:8080/user/";
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({
          user: response.data.data,
        });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getResepsionis = () => {
    let url = "http://localhost:8080/user/role/resepsionis";
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({
          resepsionis: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getBooking();
    this.getTypeRoom();
    this.getUser();
    if (this.state.token) {
      this.setState({
        isLogin: true,
      });
    }
    this.getResepsionis();
  }

  render() {
    return (
      <div>
        <Navbar />
        <section class="bg-sky-800 py-24 mt-6">
          <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div class="mr-auto place-self-center lg:col-span-7">
              <h1 class="max-w-2xl mb-8 text-4xl font-extrabold leading-none md:text-4xl xl:text-5xl text-white">
                Discover The Best Hotels & Resorts to Stay
              </h1>
              <p class="max-w-2xl mb-6 font-light lg:mb-14 md:text-lg lg:text-xl text-white">
                We provide a variety of the best lodging accomodations for those
                of you who need it. Don't worry about the quality of the
                service.
              </p>
              <div class="flex flex-row mb-8">
                <div className=" bg-white border-2 border-grey rounded-lg shadow h-auto">
                  <div class="flex flex-row">
                    <div className="px-4 pt-5 pb-6">
                      <div class="flex items-center">
                        <div>
                          <h3 className="mb-1 font-bold">Check-In Date</h3>
                          <input
                            type="date"
                            name="in"
                            id="in"
                            className="border-2 border-blue-400 rounded-md p-1"
                            value={this.state.in}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="pt-5 pb-6">
                      <div class="flex items-center">
                        <div>
                          <h3 className="mb-1 font-bold">Check-Out Date</h3>
                          <input
                            type="date"
                            name="out"
                            id="out"
                            className="border-2 border-blue-400 rounded-md p-1"
                            value={this.state.out}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pt-9 pb-6">
                      <button
                        className="border border-sky-500 hover:bg-sky-600 text-sky-600 hover:text-white font-semibold p-2 pr-3 pl-3 w-full rounded focus:outline-none focus:shadow-outline"
                        onClick={this.handleFilter}
                      >
                        Check Rooms
                      </button>
                    </div>
                  </div>
                </div>
                {this.state.isLogin ? (
                  <div className="px-6 pt-9 pb-6">
                    <button
                      className=" bg-sky-500 hover:bg-sky-600 hover:text-white text-white font-semibold inline-flex items-center justify-center p-2 px-3 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => this.showModal()}
                    >
                      Booking now
                      <svg
                        class="w-5 h-5 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="px-6 pt-9 pb-6">
                    <button
                      className=" bg-gray-400 hover:bg-gray-600 hover:text-white text-white font-semibold inline-flex items-center justify-center p-2 px-3 rounded focus:outline-none focus:shadow-outline"
                      disabled
                    >
                      Booking Now
                      <svg
                        class="w-5 h-5 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img className="rounded-3xl" src={images} alt="mockup" />
            </div>
          </div>
        </section>

        {this.state.rooms.length > 0 && (
          <section class="bg-gray-100">
            <div class="py-4 lg:py-10 mx-auto max-w-screen-xl px-4">
              <h2 class="lg:mb-8 mt-6 text-3xl font-extrabold tracking-tight leading-tight text-center text-sky-900  md:text-4xl">
                Available Room
              </h2>
            </div>
            <div class="grid grid-cols-4 gap-4">
              {this.state.rooms.map((item, index) => (
                <div class="col-span-1">
                  <div class="CardEvent mx-10">
                    <div class="max-w-sm rounded overflow-hidden shadow-lg ">
                      <div className="container">
                        <img
                          class="w-full h-48"
                          alt="images not found"
                          src={
                            "http://localhost:8080/uploads/image/" + item.photo
                          }
                        />
                      </div>
                      <div class="px-6 py-4">
                        <div class="font-bold text-2xl mb-2">
                          {item.name_room_type}
                        </div>
                        <div class="font-bold text-xl mb-2 text-blue-600">
                          Rp {item.price}/night
                        </div>
                        <p class="text-gray-700 text-base">
                          <LinesEllipsis
                            text={item.description}
                            maxLine="3"
                            ellipsis="..."
                          />
                        </p>
                      </div>
                      <div class="px-6 pt-4 pb-2">
                        <button
                          class="mb-2 ml-40 bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 w-1/3 rounded focus:outline-none focus:shadow-outline"
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
          </section>
        )}

        <div
          id="modal_detail"
          tabindex="-1"
          class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full pt-10 pb-10 pl-96 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
        >
          <div class="relative w-full h-full max-w-lg md:h-auto border-2 border-gray-500 rounded-lg shadow-2xl items-center">
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
                    class="rounded-md w-200 h-100"
                    alt="images not found"
                    src={
                      "http://localhost:8080/uploads/image/" + this.state.photo
                    }
                  />
                </div>
                <div class="px-2 py-4">
                  <div class="font-bold text-2xl mb-2">
                    {this.state.name_room_type}
                  </div>
                  <div class="font-bold text-xl mb-2 text-blue-600">
                    {this.state.price}/night
                  </div>
                  <p class="text-black-700 text-base">
                    {this.state.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="modal_booking"
          tabindex="-1"
          class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full pt-10 pb-10 pl-96 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
        >
          <div class="relative w-full h-full max-w-lg md:h-auto border-2 border-gray-500 rounded-lg shadow-2xl items-center">
            {/* <!-- Modal content --> */}
            <div class="relative bg-white rounded-lg">
              {/* <!-- Modal header --> */}
              <div class="flex items-center justify-between p-5 border-b rounded-t border-gray-500">
                <h3 class="p-2 text-xl font-medium text-gray-900 ">
                  Add Booking Room
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-red-500  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:text-white"
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
              {/* <!-- Modal body --> */}
              <div class="p-2">
                <div class="px-6 py-6 lg:px-8">
                  <form
                    class="space-y-6"
                    onSubmit={(event) => this.handleAddBooking(event)}
                  >
                    <div>
                      <label
                        for="guest_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Guest Name
                      </label>
                      <input
                        type="text"
                        name="guest_name"
                        id="guest_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                        placeholder="Name for guest"
                        value={this.state.guest_name}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="total_room"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Total Room{" "}
                      </label>
                      <input
                        type="number"
                        name="total_room"
                        id="total_room"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                        placeholder="Total room your booked"
                        value={this.state.total_room}
                        onChange={this.handleChange}
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
                        placeholder="Jenis Room Type"
                        name="id_room_type"
                        value={this.state.id_room_type}
                        onChange={this.handleChange}
                        required
                      >
                        <option value="">Choose Room Type</option>
                        {this.state.room_type.map((item, index) => (
                          <option value={item.id_room_type}>
                            {item.name_room_type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        for="booking_date"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Booking Date
                      </label>
                      <input
                        type="text"
                        name="booking_date"
                        id="booking_date"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                        placeholder="Booking Date"
                        value={this.state.booking_date}
                        onChange={this.handleChange}
                        required
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        for="check_in_date"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Check-In Date
                      </label>
                      <input
                        type="date"
                        name="check_in_date"
                        id="check_in_date"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                        placeholder="Choose check in date"
                        value={this.state.check_in_date}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="check_out_date"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Check-Out Date
                      </label>
                      <input
                        type="date"
                        name="check_out_date"
                        id="check_out_date"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                        placeholder="Choose check out date"
                        value={this.state.check_out_date}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="id_user"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Resepsionis
                      </label>
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                        placeholder="Jenis Room Type"
                        name="id_user"
                        value={this.state.id_user}
                        onChange={this.handleChange}
                        required
                      >
                        <option value="">Choose Resepsionis </option>
                        {this.state.resepsionis.map((item, index) => (
                          <option value={item.id_user}>{item.user_name}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      class="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Simpan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
