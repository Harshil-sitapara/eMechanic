import axios from "axios";
import authHeader from "../member/auth_header";

const AUTH_URL = "http://localhost:8010/admin/auth/";

class AuthService {
  // Login method
  async login(email, password) {
    console.log("email,password :>> ", email, password);
    try {
      const response = await axios.post(AUTH_URL + "login", {
        email,
        password,
      });
      if (response.data.token) {
        if (response.data.role === "ADMIN") {
          console.log(response.data.name);
          localStorage.setItem("admin", JSON.stringify(response.data));
        } else {
          console.log(response.data.name);
          localStorage.setItem("mechanic", JSON.stringify(response.data));
        }
      }
      console.log(response.data.role);
      return response.data;
    } catch (err) {
      console.log("Login Error" + err);
    }
  }
  // Register mechanic
  registerMechanic(name, email, password, mobile) {
    return axios
      .post(
        AUTH_URL + "register",
        { name, email, password, mobile },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        return res.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Logout methods
  logout() {
    localStorage.removeItem("admin");
    console.log("Inside Logout Method");
  }

  logoutMechanic() {
    localStorage.removeItem("mechanic");
    console.log("Inside Logout Method");
  }
  // Register
  register(name, email, password) {
    return axios.post(AUTH_URL + "register", {
      name,
      email,
      password,
    });
  }
  // Get current mechanic
  getCurrentMechanic() {
    return JSON.parse(localStorage.getItem("mechanic"));
  }
  // Get admin
  getAdmin() {
    return JSON.parse(localStorage.getItem("admin"));
  }
}

export default new AuthService();
