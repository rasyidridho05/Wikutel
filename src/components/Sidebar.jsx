import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBed,
  faUsers,
  faUser,
  faHistory,
  faList,
  faHotel,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export default class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      role: "",
    };
    this.state.role = localStorage.getItem("role");
  }

  logOut = () => {
    if (window.confirm("Are you sure to logout")) {
      localStorage.clear();
      window.location = "/";
    }
  };

  render() {
    return (
      <aside class="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-white shadow ">
        <div class="sidebar-header flex items-center justify-center py-4">
          <div class="inline-flex">
            <div class="inline-flex flex-row items-center">
              <FontAwesomeIcon
                icon={faHotel}
                color="#0c4a6e"
                style={{ marginRight: "12px", fontSize: "20px" }}
              />
              <span class="leading-10 text-sky-700 text-xl font-bold uppercase">
                Wikutel
              </span>
            </div>
          </div>
        </div>
        <div class="sidebar-content px-4 pay-6">
          {this.state.role === "admin" && (
            <ul class="flex flex-col w-full">
              <li class="my-px">
                <a
                  href="/dashboard"
                  class="flex flex-row items-center h-14 px-3 rounded-lg text-sky-800 hover:bg-sky-100 hover:text-gray-700 transition transform duration-300"
                >
                  <span class="mr-2 flex items-center justify-center text-lg text-gray-400">
                    <FontAwesomeIcon icon={faHome} color="#0c4a6e" />
                  </span>
                  <span class="ml-3">Dashboard</span>
                </a>
              </li>
              <li class="my-px">
                <a
                  href="/room-type"
                  class="flex flex-row items-center h-14 px-3 rounded-lg text-sky-800 hover:bg-sky-100 hover:text-gray-700 transition transform duration-300"
                >
                  <span class="mr-2 flex items-center justify-center text-lg text-gray-400">
                    <FontAwesomeIcon icon={faBed} color="#0c4a6e" />
                  </span>
                  <span class="ml-3">Room Type</span>
                </a>
              </li>
              <li class="my-px">
                <a
                  href="/room"
                  class="flex flex-row items-center h-14 px-3 rounded-lg text-sky-800 hover:bg-sky-100 hover:text-gray-700 transition transform duration-300"
                >
                  <span class="mr-3 flex items-center justify-center text-lg text-gray-400">
                    <FontAwesomeIcon icon={faList} color="#0c4a6e" />
                  </span>
                  <span class="ml-3">Room</span>
                </a>
              </li>
              <li class="my-px">
                <a
                  href="/user"
                  class="flex flex-row items-center h-14 px-3 rounded-lg text-sky-800 hover:bg-sky-100 hover:text-gray-700 transition transform duration-300"
                >
                  <span class="mr-3 flex items-center justify-center text-lg text-gray-400">
                    <FontAwesomeIcon icon={faUser} color="#0c4a6e" />
                  </span>
                  <span class="ml-4">User</span>
                </a>
              </li>
              <li class="my-px">
                <a
                  href="/customer"
                  class="flex flex-row items-center h-14 px-3 rounded-lg text-sky-800 hover:bg-sky-100 hover:text-gray-700 transition transform duration-300"
                >
                  <span class="mr-3 flex items-center justify-center text-lg text-gray-400">
                    <FontAwesomeIcon icon={faUsers} color="#0c4a6e" />
                  </span>
                  <span class="ml-2">Customer</span>
                </a>
              </li>
              <li class="my-px">
                <a
                  href="/history-transaksi"
                  class="flex flex-row items-center h-14 px-3 rounded-lg text-sky-800 hover:bg-sky-100 hover:text-gray-700 transition transform duration-300"
                >
                  <span class="mr-3 flex items-center justify-center text-lg text-gray-400">
                    <FontAwesomeIcon icon={faHistory} color="#0c4a6e" />
                  </span>
                  <span class="ml-3">Transaction</span>
                </a>
              </li>
              <li class="my-px">
                <a
                  href="/"
                  class="flex flex-row items-center h-14 px-3 rounded-lg text-red-500 hover:bg-red-100 transition transform duration-300 mt-60"
                >
                  <span class="mr-3 flex items-center justify-center text-lg text-red-500">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </span>
                  <span class="ml-2" onClick={() => this.logOut()}>
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          )}

          {this.state.role === "resepsionis" && (
            <ul class="flex flex-col w-full">
              <li class="my-px">
                <a
                  href="/dashboard"
                  class="flex flex-row items-center h-14 px-3 rounded-lg text-sky-800 hover:bg-sky-100 hover:text-gray-700"
                >
                  <span class="mr-2 flex items-center justify-center text-lg text-gray-400">
                    <FontAwesomeIcon icon={faHome} color="#0c4a6e" />
                  </span>
                  <span class="ml-3">Dashboard</span>
                </a>
              </li>
              <li class="my-px">
                <a
                  href="/history-transaksi"
                  class="flex flex-row items-center h-14 px-3 rounded-lg text-sky-800 hover:bg-sky-100 hover:text-gray-700"
                >
                  <span class="mr-3 flex items-center justify-center text-lg text-gray-400">
                    <FontAwesomeIcon icon={faHistory} color="#0c4a6e" />
                  </span>
                  <span class="ml-3">Transaksi</span>
                </a>
              </li>
              <li class="mt-40 mb-0 px-3">
                <a
                  href="/"
                  class="flex flex-row items-center h-14 px-3 rounded-lg text-sky-800 hover:bg-sky-200 hover:text-gray-700 mt-60"
                >
                  <span class="mr-3 flex items-center justify-center text-lg text-red-400">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </span>
                  <span class="ml-2" onClick={() => this.logOut()}>
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          )}
        </div>
      </aside>
    );
  }
}
