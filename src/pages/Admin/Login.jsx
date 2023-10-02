import React from "react";
import axios from "axios";
import hotel from "../../assets/hotel.jpg"

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {
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

  handleLogin = (e) => {
    e.preventDefault()
    let data = {
      email: this.state.email_user,
      password: this.state.password_user
    }
    let url = "http://localhost:8080/user/login"
    axios.post(url, data)
      .then(response => {
        this.setState({ logged: response.data.data.logged })
        if (response.status === 200) {
          let id = response.data.data.id_user
          let token = response.data.data.token
          let role = response.data.data.role
          let email = response.data.data.email
          let user_name = response.data.data.user_name
          let photo = response.data.data.photo
          localStorage.setItem("id", id)
          localStorage.setItem("token", token)
          localStorage.setItem("role", role)
          localStorage.setItem("email", email)
          localStorage.setItem("username", user_name)
          localStorage.setItem("photo", photo)
          alert("Success Login")
          window.location.href = "/dashboard"
        } else {
          alert(response.data.message)
          this.setState({ message: response.data.message })

        }
      })
      .catch(error => {
        console.log("error", error.response.status)
        if (error.response.status === 500 || error.response.status === 404) {
          window.alert("Failed to login dashboard");
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
            <form onSubmit={(e) => this.handleLogin(e)}>
              <h2 className='text-4xl font-bold text-center mb-8'>Wikusama Hotel</h2>
              <div>
                <input className='border p-2 my-4 w-full' type="email" name="email_user" placeholder='Email' value={this.state.email_user} onChange={this.handleChange} required />
                <input className='border p-2 w-full' type="password" name="password_user" value={this.state.password_user} onChange={this.handleChange} placeholder='Password' required />
              </div>
              <button type="submit" className='w-full py-2 my-4 bg-sky-600 hover:bg-sky-500 text-white font-bold'>Sign In</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}