import axios from "axios";
import { notify, notifyError } from "./toastify";
// import { access } from "fs";
// import { error } from "console";

const api = "https://nifinspired.connectinskillz.com/api";
// const api = "https://virtserver.swaggerhub.com/THECARETECH/nifinspired/1.0.0";

// export function getCookie(cookieName: string) {
//   const name = cookieName + "=";
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const cookieArray = decodedCookie.split(";");

//   for (let i = 0; i < cookieArray.length; i++) {
//     let cookie = cookieArray[i];
//     while (cookie.charAt(0) === " ") {
//       cookie = cookie.substring(1);
//     }
//     if (cookie.indexOf(name) === 0) {
//       return cookie.substring(name.length, cookie.length);
//     }
//   }
//   return null; // Return null if the cookie is not found
// }

export const setConfig = (accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    withCredentials: false,
  };

  return config;
};

export const setImageConfig = (accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };

  return config;
};

let count = 0;

export const userLogin = async (data) => {
  await axios
    .post(`${api}/auth/login`, data, {
      withCredentials: false,
    })
    .then((response) => {
      console.log(response);
      if (response.data.status === true) {
        localStorage.setItem(
          "nifInspiredUser",
          JSON.stringify(response.data.user)
        );
        localStorage.setItem("nifInspiredToken", response.data.token);
        let accessed = localStorage.getItem("accessedProduct");
        if (accessed) {
          window.location.pathname = "/cart";
        }else{
          window.location.pathname = "/";
        }
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
      console.log(err);
    });
};

export const userRegistration = async (data) => {
  await axios
    .post(`${api}/auth/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    })
    .then((response) => {
      console.log(response);
      if (response.data.status === true) {
        localStorage.setItem(
          "nifInspiredUser",
          JSON.stringify(response.data.user)
        );
        localStorage.setItem("nifInspiredToken", response.data.token);
        window.location.pathname = "/";
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        // notifyError(err.response.data.message);
        if (err.response.data.errors.email) {
          notifyError(err.response.data.errors.email[0]);
        }
        if (err.response.data.errors.password) {
          notifyError(err.response.data.errors.password[0]);
        }
      } else {
        notifyError("Network Error");
      }
      console.log(err);
    });
};

export const forgotPassword = async (data) => {
  await axios
    .post(`${api}/forgot-password`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    })
    .then((response) => {
      console.log(response);
      notify("Password reset link sent to your email");
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
      console.log(err);
    });
};

export const resetPassword = async (data) => {
  await axios
    .post(`${api}/password/reset-password`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    })
    .then((response) => {
      console.log("Password reset done!");
      console.log(response);
      window.location.pathname = "/login";
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
      console.log(err);
    });
};

export const addContactUs = async (body) => {
  await axios
    .post(`${api}/add-contactus`, body, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    })
    .then((response) => {
      console.log(response);
      if (response.data.status === true) {
        notify(response.data.message);
        console.log("Contact sent!");
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
};

export const fetchAllProducts = async () => {
  let result = [];
  await axios
    .get(`${api}/fetch-products`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    })
    .then((response) => {
      if (response.data.status === true) {
        result = response.data.product;
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
  return result;
};

export const fetchCategories = async () => {
  let result = [];
  await axios
    .get(`${api}/fetch-categories`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    })
    .then((response) => {
      if (response.data.status === true) {
        result = response.data.categories;
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
  return result;
};

export const fetchCategoryProducts = async (category) => {
  let result = [];
  await axios
    .get(`${api}/fetch-product/${category}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    })
    .then((response) => {
      console.log(response);
      if (response.data.status === true) {
        result = response.data.product;
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
  return result;
};

export const fetchSingleProduct = async (productId) => {
  let result = [];
  await axios
    .get(`${api}/fetch-single-product/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    })
    .then((response) => {
      if (response.data.status === true) {
        result = response.data.product;
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
  return result;
};

export const getUserData = async (alpsToken) => {
  let result = [];
  await axios
    .get(`${api}/user/data`, setConfig(alpsToken))
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        result = response.data.data.data;
        console.log(result);
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
  return result;
};

export const editUserProfile = async (token, body) => {
  let result = [];
  await axios
    .patch(`${api}/user/profile`, body, setConfig(token))
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        result = response.data.data.data;
        console.log("Patch User Profile Success!");
        window.location.pathname = "/collections";
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
  return result;
};

export const sendAccountVerification = async (token, body) => {
  await axios
    .post(`${api}/user/send-verification-email`, body, setConfig(token))
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        console.log("Verification email sent!");
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
};
