import React, { useRef, useState, useEffect } from "react";
import { Check } from "heroicons-react";
import Congratulate from "../Components/Congratulate";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
const AddProduct = () => {
  const top = useRef(null);
  const [submited, setSubmited] = useState(false);
  const [changing, setChanging] = useState(false);
  const [valid, setValid] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    quantity: "",
    category: "",
    usage: "",
    contents: "",
    allergenes: "",
    functions: "",
  });
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setProductDetails({ ...productDetails, [name]: value });
    setChanging(!changing);
  };
  useEffect(() => {
    if (
      productDetails.name &&
      productDetails.price &&
      productDetails.description &&
      productDetails.image &&
      productDetails.quantity &&
      productDetails.category &&
      productDetails.usage &&
      productDetails.contents &&
      productDetails.allergenes &&
      productDetails.functions
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [changing]);

  useEffect(() => {
    scrollToRef(top);
  }, []);
  return (
    <>
      <div
        className="relative w-full cflexss gap-[52px] h-full overflow-y-auto"
        ref={top}
      >
        {submited && <Congratulate setSubmited={setSubmited} type="product" />}
        <p className="text-[24px] capitalize">Let’s get Creating Alora</p>
        <form className="flexbs gap-[70px] h-full">
          <div className="cflexss gap-[37px] text-[18px]">
            <div>
              <p className="text-[24px] font-bold">Add New Product </p>
              <p className="font-normal text-[16px]">
                create a new product available on sale{" "}
              </p>
            </div>
            <div className="w-[511px]">
              <p>Product name</p>
              <input
                className="w-full px-[20px] py-[10px] text-[14px] rounded-[9px] border-[2px] outline-none"
                placeholder="Product Name"
                type="text"
                name="name"
                value={productDetails.name}
                onChange={handleChange}
              />
            </div>
            <div className="w-[511px]">
              <p>Product description</p>
              <textarea
                className="w-full px-[20px] h-[112px] resize-none py-[10px] text-[14px] rounded-[9px] border-[2px] outline-none"
                placeholder="Tell us something about your product"
                type="text"
                name="description"
                value={productDetails.description}
                onChange={handleChange}
              />
            </div>
            <div className="w-[511px]">
              <p>Choose a category</p>
              <select
                className="w-full px-[10px] resize-none py-[10px] rounded-[9px] text-[14px] border-[2px] outline-none cursor-pointer"
                name="category"
                value={productDetails.category}
                onChange={handleChange}
              >
                <option value="1">select a category</option>
              </select>
            </div>
            <div className="w-[511px]">
              <p>Usage</p>
              <input
                className="w-full px-[20px] py-[10px] rounded-[9px] text-[14px] border-[2px] outline-none"
                placeholder="Describe the usage of the product"
                type="text"
                name="usage"
                value={productDetails.usage}
                onChange={handleChange}
              />
            </div>
            <div className="w-[511px]">
              <p>Ingredients</p>
              <input
                className="w-full px-[20px] py-[10px] rounded-[9px] text-[14px] border-[2px] outline-none"
                placeholder="Add Ingredients"
                type="text"
                name="contents"
                value={productDetails.contents}
                onChange={handleChange}
              />
            </div>
            <div className="w-[511px]">
              <p>Allergines</p>
              <input
                className="w-full px-[20px] py-[10px] rounded-[9px] text-[14px] border-[2px] outline-none"
                placeholder="Add Allergines"
                type="text"
                name="allergenes"
                value={productDetails.allergenes}
                onChange={handleChange}
              />
            </div>
            <div className="w-[511px]">
              <p>Function</p>
              <input
                className="w-full px-[20px] py-[10px] rounded-[9px] text-[14px] border-[2px] outline-none"
                placeholder="Add function"
                type="text"
                name="functions"
                value={productDetails.functions}
                onChange={handleChange}
              />
            </div>
            <div className="w-[511px]">
              <p>Quantity</p>
              <input
                type="number"
                className="w-full px-[20px] py-[10px] rounded-[9px] text-[14px] border-[2px] outline-none"
                placeholder="Add Quantity"
                name="quantity"
                value={productDetails.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="w-[511px]">
              <p>Price</p>
              <input
                className="w-full px-[20px] py-[10px] rounded-[9px] text-[14px] border-[2px] outline-none"
                placeholder="Add Price"
                type="number"
                name="price"
                value={productDetails.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="cflexms mt-[120px] h-full gap-[174px]">
            <div className="w-[456px]">
              <div className="w-full h-[320px] text-[16px] cflexmm border-dashed border-[2px] rounded-[10px] border-black/70 gap-[12px]">
                <img
                  src="/img.svg"
                  alt="image-placeholder"
                  className="w-[78px] h-[78px] cursor-pointer"
                />
                <p>Add product image </p>
              </div>
              <div className="w-full flexbm p-[6px]">
                <p>Image name</p>
                <Check size="24px" />
              </div>
            </div>
            <div className="w-full cflexmm gap-[10px]">
              <button
                className={`w-full rounded-full text-[24px] font-bold text-white  py-[22px] ${
                  valid ? "bg-accent cursor-pointer" : "bg-accent/40 cursor-not-allowed"
                } flexmm`}
              >
                <p>Add Product</p>
              </button>
              {!valid && (
                <p className="text-[14px] text-red-700">
                  *All fields are required!
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
