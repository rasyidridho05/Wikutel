import React from "react";
import axios from "axios";
import hotel from "../../assets/hotel-login.jpeg";
import { NavLink } from "react-router-dom";

export default class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      nik: "",
      customer_name: "",
      address: "",
      email_user: "",
      password_user: "",
      isModalOpen: false,
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRegister = (e) => {
    e.preventDefault()
    let data = {
      nik: this.state.nik,
      customer_name: this.state.customer_name,
      address: this.state.address,
      email: this.state.email_user,
      password: this.state.password_user
    }
    let url = "http://localhost:8080/customer/register"
    axios.post(url, data)
      .then(res => {
        window.alert("Success to Register")
        window.location = "/login"
      })
      .catch(error => {
        if (error.response.status === 500) {
        window.alert("Failed to Register, Please Check Again!")
      }
    })
  }

  render() {
    return (
      <div className='w-full h-screen flex'>
        <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]'>
          <div className='w-full h-[550px] hidden md:block'>
            <img className='w-full h-full' src={hotel} alt="/" />
          </div>
          <div className='p-4 flex flex-col justify-around'>
            <form onSubmit={(e) => this.handleRegister(e)}>
              <h2 className='text-4xl font-bold text-center mb-8 text-sky-800'>Wikusama Hotel</h2>
              <div>
                <input className='border p-2 my-4 w-full' type="number" name="nik" placeholder='Please Input your NIK' value={this.state.nik} onChange={this.handleChange} required />
                <input className='border p-2 w-full' type="text" name="customer_name" placeholder='Please Input your Name' value={this.state.customer_name} onChange={this.handleChange} required />
                <input className='border p-2 my-4 w-full' type="text" name="address" placeholder='Please Input your Address' value={this.state.address} onChange={this.handleChange} required />
                <input className='border p-2 w-full' type="email" name="email_user" placeholder='Email' value={this.state.email_user} onChange={this.handleChange} required />
                <input className='border p-2 my-4 w-full' type="password" name="password_user" value={this.state.password_user} onChange={this.handleChange} placeholder='Password' required />
              </div>
              <button type="submit" className='w-full py-2 my-4 bg-sky-600 hover:bg-sky-500 text-white font-bold'>Create an Account</button>
            </form>
            <h6 className='text-center'>Already have an account? <NavLink to="/login" className="text-sky-800 underline">Login</NavLink></h6>
          </div>
        </div>
      </div>
    )
  }
}