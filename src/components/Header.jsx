import React from "react";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      email: "",
      photo: "",
    };

    this.state.role = localStorage.getItem("role");
    this.state.email = localStorage.getItem("email");
    this.state.photo = localStorage.getItem("photo");
  }

  render() {
    const { title } = this.props;
    return (
      <header class="header bg-white shadow py-4 px-4">
        <div class="header-content flex items-center flex-row">
          <div class="hidden md:flex relative">
            <h1 class="font-bold text-2xl text-gray-700">{title}</h1>
          </div>
          <div class="flex ml-auto mr-6">
            <a href class="flex flex-row items-center">
              <span class="flex flex-col ml-2">
                <span class="truncate w-30 h-5 font-semibold tracking-wide leading-none">
                  {this.state.email}
                </span>
                <span class="truncate w-40 text-gray-500 text-xs leading-none mt-1">
                  {this.state.role}
                </span>
              </span>
            </a>
          </div>
        </div>
      </header>
    );
  }
}
