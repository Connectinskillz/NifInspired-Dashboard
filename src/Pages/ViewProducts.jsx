import React, { useState, useEffect } from "react";
import Product from "../Components/Product";
import { SpinnerCircular } from "spinners-react";
import {
  fetchAllProducts,
  fetchCategories,
  fetchCategoryProducts,
} from "../Services/request";

const ViewProducts = () => {
  const [selected, setSelected] = useState([]);
  const [view, setView] = useState("");
  const [categories, setCategories] = useState("");
  const [products, setProducts] = useState([]);
  const [cLoading, setCLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    setCLoading(true);
    let categories = await fetchCategories();
    console.log(categories);
    if (categories) {
      setView(categories[0].name);
      setCategories(categories);
      setCLoading(false);
      getProducts(categories[0].name);
    }
  };

  const getProducts = async (view) => {
    setLoading(true);
    let data = await fetchCategoryProducts(view);
    if (data) {
      setProducts(data);
      console.log(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (view) {
      getProducts(view);
    }
  }, [view]);

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div className="w-full pl-[20px] flexss">
        <div
          className="cflexss mr-[340px]"
          style={{ width: "calc(100% - 340px)" }}
        >
          <div className="w-full flexbm pb-[35px] border-b-[2px]">
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
              />
            )}
          </div>
        </div>

        <div className="fixed top-0 right-0 w-[340px] pt-[80px] font-bold text-[30px] border-l-[2px] cflexss px-[25px] h-[100vh] gap-[25px]">
          <p>Selected ({selected.length}) </p>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default ViewProducts;
