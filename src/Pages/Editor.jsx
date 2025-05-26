import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ blogDetails, setBlogDetails }) => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const handleChange = (value) => {
    // console.log("checking", value);
    if (!blogDetails.blog) {
      setTimeout(() => {
        setBlogDetails({ ...blogDetails, blog: value });
        // console.log("blogDetails", blogDetails);
      }, 3000);
    } else {
      setBlogDetails({ ...blogDetails, blog: value });
      // console.log("blogDetails", blogDetails);
    }
  };

  return (
    <div>
      <ReactQuill
        value={blogDetails?.blog}
        className="h-[200px] rounded-md shadow-sm"
        onChange={handleChange}
        theme="snow"
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
