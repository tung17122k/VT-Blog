import React from "react";
import { Fragment } from "react";
const ImageUpload = (props) => {
  const {
    name,
    className = "",
    progress = 0,
    image = "",
    handleDeleteImage = () => {},
    ...rest
  } = props;
  return (
    <label
      className={`cursor-pointer flex items-center justify-center border border-dashed w-full min-h-[150px] rounded-lg ${className} relative overflow-hidden group`}
    >
      {!image && (
        <>
          <input
            type="file"
            name={name}
            className="hidden-input"
            onChange={() => {}}
            {...rest}
          />
          <div className="flex flex-col items-center text-center pointer-events-none">
            <img
              src="/img-upload.png"
              alt="upload-img"
              className="max-w-[80px] mb-5"
            />
            <p className="font-semibold">Choose photo</p>
          </div>
        </>
      )}
      {image && (
        <Fragment>
          <img src={image} className="object-cover w-full h-full" alt="" />
          <button
            type="button"
            className="absolute z-10 flex items-center justify-center invisible w-16 h-16 text-red-500 transition-all bg-white rounded-full opacity-0 cursor-pointer group-hover:opacity-100 group-hover:visible"
            onClick={handleDeleteImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </Fragment>
      )}
      {!image && (
        <div
          className="absolute bottom-0 left-0 w-0 h-1 transition-all bg-green-400 image-upload-progress"
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      )}
    </label>
  );
};

export default ImageUpload;
