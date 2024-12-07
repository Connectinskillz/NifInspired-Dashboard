import React, { useEffect } from "react";

const Congratulate = ({ setSubmited, type, user }) => {
  useEffect(() => {
    setTimeout(() => {
      setSubmited(false);
    }, 3000);
  }, []);
  return (
    <>
      <div
        className="fixed top-0 right-0 z-50 h-[100vh] text-[24px] cflexmm gap-[37px] bg-white"
        style={{ width: "calc(100% - 216px)" }}
        onClick={() => {
          setSubmited(false);
        }}
      >
        <img
          src="/congrats.svg"
          alt="congratulate"
          className="w-[128px] h-[128px]"
        />
        <p className="text-center capitalize">
          Great job {user}{" "}
          <span className="block">
            {type === "product" && <p>Product has successfully been created</p>}
            {type === "edit-product" && (
              <p>Product has successfully been edited</p>
            )}
            {type === "blog" && <p>Blog has successfully been created</p>}
            {type === "edit-blog" && <p>Blog has successfully been edited</p>}
          </span>
        </p>
      </div>
    </>
  );
};

export default Congratulate;
