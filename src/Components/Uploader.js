import React from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

const Uploader = (type, name, id, accept, onChange, hidden) => {
  // const { getRootProps, getInputProps } = useDropzone({
  //   multiple: false,
  //   maxSize: 100000,
  //   onDrop: (acceptedFiles) => {
  //     alert(acceptedFiles[0].name);
  //   },
  // });
  return (
    <div className="w-full text-center ">
      <div className="px-6 pt-5 pb-6 border-2 border-border border-dashed bg-main rounded-md cursor-pointer">
        <input
          type={type}
          name={name}
          id={id}
          accept={accept}
          onChange={onChange}
          placeholder="Upload Image"
          // hidden
        />
        <span className="mx-auto flex-cols text-subMain text-3xl">
          <FiUploadCloud />
        </span>
        <p className="text-sm mt-2">Drag your image here</p>
        <em className="text-xs text-border">
          (only .jpg and .png files are accepted)
        </em>
      </div>
    </div>
  );
};

export default Uploader;
