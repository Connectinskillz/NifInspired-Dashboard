import React from "react";
const Product = ({ categoryTitle, item }) => {
  const prodData = item || [];

  return (
    <div className="flex flex-col mobile:flex-wrap">
      <div className="flex items-center justify-between mb-6">
        <p className="font-bold text-[24px] capitalize">{categoryTitle} </p>
      </div>

      <div className="flexsm gap-[25px] flex-wrap">
        {prodData.map((dataItems) => (
          <div
            key={dataItems?.uuid}
            className="shadow-sm hover:shadow-xl p-3 w-boxed relative rounded-xl h-high mobile:h-mhigh m-1 mobile:p-2 smtab:w-mwide smtab:px-1 cursor-pointer mobile:w-full"
          >
            <div className="rounded-xl h-boxed overflow-hidden mobile:h-mboxed">
              <img
                className="w-[100%] h-[100%] object-cover"
                src={dataItems?.image}
                alt="product"
              />
            </div>
            {/**the product content */}
            <div className="flex flex-col ">
              <div className="flex items-center justify-between my-3 font-medium text-[12px ]">
                <p>{dataItems?.category}</p>
                <p>${dataItems?.price}</p>
              </div>

              <div className="cflexss w-full">
                <p className="text-[18px] font-semibold text-wrap mobile:text-[14px] line-clamp-1">
                  {dataItems?.name}
                </p>
                <p className="text-[14px] font-medium text-wrap mobile:text-[14px] line-clamp-1">
                  {dataItems?.description}
                </p>
              </div>

              <div className="absolute bottom-5 mt-[100px] flex items-center left-0 right-0 justify-between px-3 mobile:flex-wrap">
                <div className="underline text-[12px]">Learn more</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;