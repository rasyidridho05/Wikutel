import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faHotel } from "@fortawesome/free-solid-svg-icons";

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      role: "",
      token: "",
      isLogin: false,
    };

    this.state.role = localStorage.getItem("role");
    this.state.token = localStorage.getItem("token");
  }

  logout = () => {
    if (window.confirm("Are u sure to logout?")) {
      localStorage.clear();
      this.setState({
        isLogin: false,
      });
    }
  };

  componentDidMount() {
    if (this.state.token) {
      this.setState({
        isLogin: true,
      });
    }
  }

  render() {
    return (
      <div>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 fixed w-full z-50 top-0">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div class="inline-flex">
              <div class="inline-flex flex-row items-center">
                <FontAwesomeIcon
                  icon={faHotel}
                  color="#0c4a6e"
                  style={{ marginRight: "12px", fontSize: "20px" }}
                />
                <span class="leading-10 text-sky-700 text-xl font-bold uppercase">
                  Wikusama
                </span>
              </div>
            </div>
            <div class="flex items-center lg:order-2">
              {this.state.isLogin ? (
                <>
                  <button
                    onClick={() => this.logout()}
                    className="no-underline text-gray-800 px-3 py-2 hover:text-blue-800 rounded-md text-2xl font-medium"
                    aria-current="page"
                  >
                    <FontAwesomeIcon icon={faSignOut} />
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="hover:text-sky-800 bg-sky-500 transition transform duration-300 hover:bg-white hover:border-sky-500 hover:border text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  focus:outline-none border-sky-300"
                  >
                    Log in
                  </NavLink>
                </>
              )}
            </div>
            <div
              class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-0 lg:mt-0">
                {this.state.isLogin ? (
                  <>
                    <li>
                      <NavLink
                        to="/home"
                        className="lg:text-sky-800 hover:bg-sky-500 transition transform duration-300 hover:lg:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md py-2.5 px-5 mr-2 focus:outline-none"
                        aria-current="page"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/room-type-customer"
                        className="lg:text-sky-800 hover:bg-sky-500 transition transform duration-300 hover:lg:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md py-2.5 px-5 mr-2 focus:outline-none"
                      >
                        Room Type
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/booking"
                        className="lg:text-sky-800 hover:bg-sky-500 transition transform duration-300 hover:lg:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md py-2.5 px-5 mr-2 focus:outline-none"
                      >
                        My Booking
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to="/home"
                        className="lg:text-sky-800 hover:bg-sky-500 transition transform duration-300 hover:lg:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md py-2.5 px-5 mr-2 focus:outline-none"
                        aria-current="page"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/room-type-customer"
                        className="lg:text-sky-800 hover:bg-sky-500 transition transform duration-300 hover:lg:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md py-2.5 px-5 mr-2 focus:outline-none"
                      >
                        Room Type
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
