import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Check } from "heroicons-react";
import { useNavigate } from "react-router-dom";
import Congratulate from "../Components/Congratulate";
import Loader from "../Components/Loader/Loader";
import FileBase64 from "react-file-base64";
import { X, ChevronLeftOutline } from "heroicons-react";
import {
  fetchSingleProduct,
  fetchCategories,
  editProduct,
} from "../Services/request";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const top = useRef(null);
  const [file, setFile] = useState("");
  const [categories, setCategories] = useState([]);
  const [submited, setSubmited] = useState(false);
  const [changing, setChanging] = useState(false);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [selection, setSelection] = useState([]);
  const [product, setProduct] = useState({});
  const [productDetails, setProductDetails] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    image: "",
    quantity: "",
    category: [],
    usage: "",
    contents: "",
    allergenes: "",
    functions: "",
  });
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (value !== "select a category") {
      setProductDetails({ ...productDetails, [name]: value });
      setChanging(!changing);
    }
  };
  //category section
  const handleSelection = (e) => {
    let value = e.target.value;
    const duplicate = selection.includes(value);
    if (!duplicate) {
      setSelection((prev) => [...prev, value]);
    }
  };

  useEffect(() => {
    setProductDetails({ ...productDetails, category: selection });
  }, [selection]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("nifInspiredToken");
    if (valid) {
      setLoading(true);
      let data = await editProduct(token, productDetails, setSubmited);
      setLoading(false);
    }
  };

  const OnChangeUploadFile = async (base64) => {
    if (
      base64.type === "image/png" ||
      base64.type === "image/jpg" ||
      base64.type === "image/jpeg" ||
      base64.type === "image/jfif"
    ) {
      setProductDetails({ ...productDetails, image: base64.file });
      setFile(base64.base64);
      setChanging(!changing);
    }
    console.log(base64);
  };

  const getCategories = async () => {
    let categories = await fetchCategories();
    // console.log(categories);
    if (categories) {
      setCategories(categories);
    }
  };

  const getProductDetails = async () => {
    console.log(productId);
    getCategories();
    let data = await fetchSingleProduct(productId);
    console.log(data.category);
    if (data) {
      setProduct(data);
      setProductDetails({
        id: data?.id,
        name: data?.name,
        price: data?.price,
        description: data?.description,
        image: data?.image,
        quantity: data?.quantity,
        category: data?.category,
        usage: data?.usage,
        contents: data?.contents,
        allergenes: data?.allergenes,
        functions: data?.functions,
      });
      setFile(data?.image);
      setSelection(data?.category);
      setValid(true);
    }
  };

  useEffect(() => {
    if (
      productDetails.name &&
      productDetails.price &&
      productDetails.description &&
      productDetails.image &&
      productDetails.quantity &&
      productDetails.category.length > 0 &&
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
    let token = localStorage.getItem("nifInspiredToken");
    if (token) {
      let user = localStorage.getItem("nifInspiredUser");
      user = JSON.parse(user);
      setUser(user);
      scrollToRef(top);
      getProductDetails();
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div
        className="relative w-full mt-[-50px] px-[20px] cflexss gap-[52px] h-full overflow-y-auto"
        ref={top}
      >
        {submited && (
          <Congratulate
            setSubmited={setSubmited}
            type="edit-product"
            user={user?.name}
          />
        )}
        <div
          className="rounded-full w-[30px] h-[30px] bg-white shadow-md flexmm cursor-pointer"
          onClick={() => {
            window.history.back();
          }}
        >
          <ChevronLeftOutline />
        </div>
        <form className="flexbs gap-[70px] h-full" onSubmit={handleSubmit}>
          <div className="cflexss gap-[37px] text-[18px]">
            <div>
              <p className="text-[24px] font-bold">Edit Product </p>
              <p className="font-normal text-[16px]">
                Edit your product to your taste
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
                className="w-full px-[10px] resize-none py-[10px] rounded-[9px] text-[14px] border-[2px] outline-none cursor-pointer capitalize"
                name="category"
                onChange={handleSelection}
              >
                <option value="default">select a category</option>
                {categories?.map((category) => {
                  return (
                    <>
                      {category !== productDetails.category && (
                        <option value={category.name}>
                          {category.name.toLowerCase()}
                        </option>
                      )}
                    </>
                  );
                })}
              </select>
              <div className="flex items-center gap-2 w-full  my-1 rounded-lg p-1 text-[12px]">
                {selection.map((item, index) => (
                  <p
                    key={index}
                    className=" border px-3 py-1 rounded-lg cursor-pointer"
                    onClick={() => {
                      setSelection(selection.filter((i) => i !== item));
                    }}
                  >
                    {item}
                  </p>
                ))}
              </div>
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
          <div className="cflexms mt-[120px] w-[456px] h-full gap-[174px] flex-shrink">
            <div className="w-full">
              <div className="relative placeholder:w-full h-[320px] text-[16px] cflexmm border-dashed border-[2px] rounded-[10px] border-black/70 gap-[12px]">
                {file ? (
                  <>
                    <img
                      src={file}
                      alt="product"
                      className="w-full h-full rounded-[10px] object-cover"
                    />
                    <div className="flexmm absolute top-[10px] right-[10px] z-10 cursor-pointer w-[40px] h-[40px] rounded-full bg-white">
                      <X size="30px" color="black" onClick={() => {}} />
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src="/img.svg"
                      alt="image-placeholder"
                      className="w-[78px] h-[78px] cursor-pointer"
                    />
                    <p>Click to Add product image or Drag and Drop </p>
                    <div className="absolute top-[10px] cflexmm gap-[3px] left-[10%] opacity-0 cursor-pointer">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                        return (
                          <>
                            <FileBase64
                              name="image"
                              defaultValue=""
                              multiple={false}
                              onDone={(base64) => {
                                OnChangeUploadFile(base64);
                              }}
                            />
                          </>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
              {productDetails.image && (
                <>
                  <div className="w-full flexbm p-[6px]">
                    <p>{productDetails.image.name}</p>
                    <Check size="24px" />
                  </div>
                </>
              )}
            </div>
            <div className="w-full cflexmm gap-[10px]">
              <button
                className={`w-full rounded-full text-[24px] font-bold text-white  py-[22px] ${
                  valid
                    ? "bg-accent cursor-pointer"
                    : "bg-accent/40 cursor-not-allowed"
                } flexmm`}
                type="submit"
              >
                {loading ? (
                  <div className="flexmm gap-[10px] w-full">
                    <Loader />
                    <p>Save</p>
                  </div>
                ) : (
                  <p>Save</p>
                )}
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

export default EditProduct;
