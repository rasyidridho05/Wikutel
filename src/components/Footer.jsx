import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";

export default class Footer extends Component {
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

  componentDidMount() {
    if (this.state.token) {
      this.setState({
        isLogin: true,
      });
    }
  }
  render() {
    return (
      <>
        <footer className=" border-t-2 border-sky-800 w-full ">
          <div className="container p-6 mx-auto">
            <div className="lg:flex">
              <div className="mt-6 lg:mt-0 lg:flex-1">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <div class="inline-flex flex-row ">
                    <span class="leading-10 text-sky-700 text-xl font-bold uppercase">
                      <FontAwesomeIcon
                        icon={faHotel}
                        color="#0c4a6e"
                        style={{ marginRight: "12px" }}
                      />{" "}
                      Wikusama
                    </span>
                  </div>
                  <div>
                    <NavLink
                      href="/home"
                      className="block mt-2 text-sm text-sky-700 font-medium hover:underline hover:font-semibold hover:text-sky-800 transition transform duration-500"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      href="/about"
                      className="block mt-2 text-sm text-sky-700 font-medium hover:underline hover:font-semibold hover:text-sky-800 transition transform duration-500"
                    >
                      About
                    </NavLink>
                    <NavLink
                      href="/room-type-customer"
                      className="block mt-2 text-sm text-sky-700 font-medium hover:underline hover:font-semibold hover:text-sky-800 transition transform duration-500"
                    >
                      Room Type
                    </NavLink>
                    <NavLink
                      href="/booking"
                      className="block mt-2 text-sm text-sky-700 font-medium hover:underline hover:font-semibold hover:text-sky-800 transition transform duration-500"
                    >
                      My Booking
                    </NavLink>
                  </div>

                  <div>
                    <NavLink
                      href="#"
                      className="block mt-2 text-sm text-sky-700 font-medium hover:underline hover:font-semibold hover:text-sky-800 transition transform duration-500"
                    >
                      Privacy Policy
                    </NavLink>
                    <NavLink
                      href="#"
                      className="block mt-2 text-sm text-sky-700 font-medium hover:underline hover:font-semibold hover:text-sky-800 transition transform duration-500"
                    >
                      Terms & Condition
                    </NavLink>
                  </div>

                  <div>
                    <span className="block mt-2 text-sm text-sky-700 font-medium hover:underline hover:font-semibold hover:text-sky-800 transition transform duration-500">
                    031-217111
                    </span>
                    <span className="block mt-2 text-sm text-sky-700 font-medium hover:underline hover:font-semibold hover:text-sky-800 transition transform duration-500">
                      Wikutel@live.in
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <hr className="h-px my-6 border-none bg-sky-800" />
            <div>
              <p className="text-center text-sky-800 font-semibold">
                © Wikusama Hotel 2023
              </p>
            </div>
          </div>
        </footer>
      </>
    );
  }
}
