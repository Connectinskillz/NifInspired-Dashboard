import React, { useState, useEffect } from "react";
import Product from "../Components/Product";
import { useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import {
  fetchAllProducts,
  fetchCategories,
  fetchCategoryProducts,
  deleteProducts,
} from "../Services/request";

const ViewProducts = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [view, setView] = useState("all");
  const [categories, setCategories] = useState("");
  const [products, setProducts] = useState([]);
  const [cLoading, setCLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const getCategories = async () => {
    setCLoading(true);
    let categories = await fetchCategories();
    console.log(categories);
    if (categories) {
      setCategories(categories);
      setCLoading(false);
    }
  };

  const getAllProducts = async () => {
    setLoading(true);
    let all = await fetchAllProducts();
    if (all) {
      setProducts(all);
      setLoading(false);
    }
  };

  const getProducts = async () => {
    setLoading(true);
    let data = await fetchCategoryProducts(view);
    if (data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const getProductIds = () => {
    let ids = selected.map((item) => item.id);
    return ids;
  };

  const handleDeleteProducts = async () => {
    setDeleting(true);
    let token = localStorage.getItem("nifInspiredToken");
    let data = await deleteProducts(token, { ids: getProductIds() });
    if (data) {
      console.log(data);
      setSelected([]);
      setDeleting(false);
      if (view == "all") {
        getAllProducts();
      } else {
        getProducts(view);
      }
    }
  };
  useEffect(() => {
    if (view === "all") {
      getAllProducts();
    } else if (view !== "all") {
      getProducts();
    }
  }, [view]);

  useEffect(() => {
    let token = localStorage.getItem("nifInspiredToken");
    if (token) {
      getCategories();
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="w-full pl-[20px] flexss">
        <div
          className="cflexss mr-[340px]"
          style={{ width: "calc(100% - 340px)" }}
        >
          <div className="w-full flexbm pb-[35px] border-b-[2px] flex-wrap gap-[20px]">
            {cLoading ? (
              <div className="flexmm w-full">
                <SpinnerCircular
                  color="#066B63"
                  className="mr-4"
                  secondaryColor={"#eeeeee"}
                  size={50}
                  thickness={150}
                />
              </div>
            ) : (
              <>
                <div
                  className={`px-[40px] py-[15px] font-bold text-[18px] hover:text-white hover:bg-accent ${
                    view === "all"
                      ? "bg-accent text-white"
                      : "bg-white text-accent"
                  } cursor-pointer rounded-full border-accent border-[2px] capitalize`}
                  onClick={() => setView("all")}
                >
                  All
                </div>
                {categories &&
                  categories?.map((item, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className={`px-[40px] py-[15px] font-bold text-[18px] hover:text-white hover:bg-accent ${
                            view === item.name
                              ? "bg-accent text-white"
                              : "bg-white text-accent"
                          } cursor-pointer rounded-full border-accent border-[2px] capitalize`}
                          onClick={() => setView(item.name)}
                        >
                          {item.name.toLowerCase()}
                        </div>
                      </>
                    );
                  })}
              </>
            )}
          </div>
          <div className="w-full cflexss pt-[45px] overflow-y-auto">
            {loading ? (
              <div className="flexmm w-full">
                <SpinnerCircular
                  color="#066B63"
                  className="mr-4"
                  secondaryColor={"#eeeeee"}
                  size={50}
                  thickness={150}
                />
              </div>
            ) : (
              <Product
                categoryTitle={`${view.toLowerCase()} Products`}
                item={products.length > 0 ? products : ""}
                selected={selected}
                setSelected={setSelected}
              />
            )}
          </div>
        </div>

        <div className="fixed top-0 right-0 w-[340px] pt-[80px] pb-[100px] font-bold text-[30px] border-l-[2px] cflexss px-[25px] h-[100vh] gap-[25px] overflow-y-auto">
          <p>Selected ({selected.length}) </p>
          <Product
            item={selected.length > 0 ? selected : ""}
            selected={selected}
            setSelected={setSelected}
          />
          <div
            className={`fixed bottom-[10px] right-[10px] z-50 w-[320px] text-white rounded-full text-[24px] font-bold p-[15px] flexmm ${
              selected.length > 0
                ? "cursor-pointer bg-[#BB0000]"
                : "cursor-not-allowed bg-[#BB0000]/40"
            } hover:bg-[#BB0000]/90`}
            onClick={handleDeleteProducts}
          >
            {deleting ? (
              <SpinnerCircular
                color="#000000"
                className="mr-4"
                secondaryColor={"#ffffff"}
                size={50}
                thickness={150}
              />
            ) : (
              <p>Delete</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProducts;
