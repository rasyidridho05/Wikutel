import React from "react";
import axios from "axios";
import moment from "moment";
import Navbar from "../../components/Navbar";
import $ from "jquery";
import { faHotel, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@progress/kendo-theme-material/dist/all.css";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import "./invoice.styles.css";

const PrintElement = (props) => {
  const { item } = props;
  return (
    <div className="mt-4">
      <div className="invoice-container">
        <div className="invoice-header">
          <h1 className="font-bold"><FontAwesomeIcon icon={faHotel}/> Wikutel Invoice</h1>
        </div>
        <div className="invoice-details">
          <div>
            <p>
              <span className="font-semibold mt-2">Address:</span> 
              Jl. Danau Ranau, Sawojajar, Malang 65139
            </p>
            <p>
              <span className="font-semibold mt-2">Phone:</span> 031-217111
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Date: </span>{" "}
              {moment(Date.now()).format("DD-MM-YYYY")}
            </p>
            <p>
              <span className="font-semibold">Booking Number:</span>{" "}
            </p>
            <span className="invoice-number">
              BOOK - {item.booking_number}
            </span>
          </div>
        </div>

        <table className="invoice-items">
          <thead>
            <tr>
              <th className="p-4 text-left">Type Room</th>
              <th className="p-4 text-center">Total Room</th>
              <th className="p-4 text-center">Check In</th>
              <th className="p-4 text-center">Check Out</th>
              <th className="p-4 text-center">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 text-left">{item.room_type.name_room_type}</td>
              <td className="p-4 text-center">{item.total_room}</td>
              <td className="p-4 text-left">
                {moment(item.check_in_date).format("DD-MM-YYYY")}
              </td>
              <td className="p-4 text-left">
                {moment(item.check_out_date).format("DD-MM-YYYY")}
              </td>
              <td className="p-4 text-left">{item.room_type.price}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default class Booking extends React.Component {
  constructor() {
    super();
    this.state = {
      booking: [],
      user: [],
      customer: [],
      detail_booking: [],
      id_booking: "",
      id_user: "",
      id_customer: "",
      id_room_type: "",
      booking_number: "",
      name_customer: "",
      room_type: "",
      email: "",
      booking_date: "",
      check_in_date: "",
      check_out_date: "",
      guest_name: "",
      total_room: "",
      booking_status: "",
      role: "",
      token: "",
      action: "",
      keyword: "",
      dataPrint: {},
      container: React.createRef(null),
      pdfExportComponent: React.createRef(null),
      isPrint: false,
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

  handleSearch = () => {
    let data = {
      keyword: this.state.keyword,
    };
    let url = "http://localhost:8080/booking/find/filter";
    axios
      .post(url, data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            booking: response.data.data,
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

  handlePrint = (item) => {
    let element = this.state.container.current;

    this.setState({
      dataPrint: item,
      isPrint: true,
    });

    setTimeout(() => {
      savePDF(element, {
        fileName: `invoice-${item.booking_number}`,
      });
      this.setState({
        isPrint: false,
      });
    }, 500);
  };

  handleClose = () => {
    $("#modal_invoice").hide();
  };

  getBooking = () => {
    let url =
      "http://localhost:8080/booking/customer/" + this.state.id_customer;
    axios
      .get(url)
      .then((response) => {
        const sortedBooking = response.data.data.sort((a, b) =>
        moment(b.booking_date).diff(a.booking_date)
      );
        this.setState({
          booking: sortedBooking,
        });
        console.log("booking", response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getBooking();
  }

  render() {
    return (
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 mt-20">
        <Navbar />
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <div className="main-content flex flex-col flex-grow p-4">
            <div className="mb-4">
              <div className="justify-items-center w-1/2">
                <div className="rounded m-5">
                  <label
                    for="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
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
                      className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-sky-500 focus:border-sky-500"
                      placeholder="Search your transaction"
                      name="keyword"
                      onChange={this.handleChange}
                    />
                    <button
                      type="submit"
                      className="text-white absolute right-2.5 bottom-2.5 bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-4 py-2"
                      onClick={this.handleSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md mx-5">
              <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Guest
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Room Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Room Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Booking Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      CheckIn Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      CheckOut Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Invoice
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {this.state.booking.map((item, index) => {
                    return (
                      <tr className="hover:bg-gray-50" key={index}>
                        <td className="px-7 py-4">{item.id_booking}</td>
                        <td className="px-7 py-4">{item.name_customer}</td>
                        <td className="px-7 py-4">{item.guest_name}</td>
                        <td className="px-7 py-4">
                          {item.room_type.name_room_type}
                        </td>
                        <td className="px-7 py-4">{item.total_room}</td>
                        <td className="px-7 py-4">
                          {moment(item.booking_date).format("DD MMM YYYY")}
                        </td>
                        <td className="px-7 py-4">
                          {moment(item.check_in_date).format("DD MMM YYYY")}
                        </td>
                        <td className="px-7 py-4">
                          {moment(item.check_out_date).format("DD MMM YYYY")}
                        </td>
                        <td className="px-7 py-4">
                        {item.booking_status === "baru" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {item.booking_status}
                            </span>
                          )}
                          {item.booking_status === "check_in" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                              {item.booking_status}
                            </span>
                          )}
                          {item.booking_status === "check_out" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-800">
                              {item.booking_status}
                            </span>
                          )}
                        </td>
                        <td className="px-7 py-4">
                          <button
                            onClick={() => this.handlePrint(item)}
                            className="flex text-center px-2 py-1 text-2xl"
                          >
                            <FontAwesomeIcon icon={faPrint} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <footer className="footer px-4 py-2">
            <div className="footer-content">
              <p className="text-sm text-gray-600 text-center">
                © ukk hotel wikusama
              </p>
            </div>
          </footer>
        </main>
        <div className="hidden-on-narrow">
          <PDFExport ref={this.state.pdfExportComponent}>
            <div ref={this.state.container}>
              {this.state.isPrint ? (
                <PrintElement item={this.state.dataPrint} />
              ) : null}
            </div>
          </PDFExport>
        </div>
      </div>
    );
  }
}
