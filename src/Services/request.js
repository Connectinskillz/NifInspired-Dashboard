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
    withCredentials: false,
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
        window.location.pathname = "/overview";
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

export const createProduct = async (token, body, setSubmited) => {
  let result = "";
  await axios
    .post(`${api}/create-product`, body, setImageConfig(token))
    .then((response) => {
      console.log(response);
      if (response.data.status === true) {
        result = response.data.product;
        setSubmited(true);
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
  return result;
};

export const editProduct = async (token, body, setSubmited) => {
  let result = "";
  await axios
    .post(`${api}/edit-product`, body, setImageConfig(token))
    .then((response) => {
      if (response.data.status === true) {
        result = response.data.product;
        setSubmited(true);
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
  return result;
};

export const createBlog = async (token, body, setSubmited) => {
  let result = "";
  await axios
    .post(`${api}/create-blog`, body, setImageConfig(token))
    .then((response) => {
      console.log(response);
      if (response.data.status === true) {
        result = response.data;
        setSubmited(true);
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
  return result;
};

export const editBlog = async (token, body, setSubmited) => {
  let result = "";
  await axios
    .post(`${api}/edit-blog`, body, setImageConfig(token))
    .then((response) => {
      console.log(response);
      if (response.data.status === true) {
        result = response.data;
        setSubmited(true);
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
  return result;
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

export const deleteProducts = async (token, body) => {
  let result = [];
  await axios
    .post(`${api}/delete-products`, body, setConfig(token))
    .then((response) => {
      console.log(response);
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

export const fetchAllOrders = async () => {
  let result = [];
  await axios
    .get(`${api}/fetch-all-orders`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    })
    .then((response) => {
      if (response.data.status === true) {
        result = response.data.data;
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

export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${api}/fetch-blogs`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    });

    const result = response.data.blogs;
    // This will log after the promise resolves
    return result;
  } catch (err) {
    if (err.response?.data?.message) {
      notifyError(err.response.data.message);
    } else {
      notifyError("Network Error");
    }
    return []; // Return an empty array in case of an error
  }
};
export const fetchSingleBlog = async (id) => {
  try {
    const response = await axios.get(`${api}/fetch-single-blog/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    });

    const result = response.data.blog;
    return result;
  } catch (err) {
    if (err.response?.data?.message) {
      notifyError(err.response.data.message);
    } else {
      notifyError("Network Error");
    }
    return []; // Return an empty array in case of an error
  }
};

export const deleteBlog = async (token, id) => {
  let result = [];
  await axios
    .delete(`${api}/delete-blog/${id}`, setConfig(token))
    .then((response) => {
      console.log(response);
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
