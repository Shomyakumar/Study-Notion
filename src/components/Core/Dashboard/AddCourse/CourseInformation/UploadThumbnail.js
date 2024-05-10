import { useState,useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";

export default function UploadThumbnail({
  name,
  label,
  register,
  setValue,
  errors,
  editData,
}) {
  const [file, setFile] = useState(editData);

  function handleChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      setValue(name, selectedFile);
    }
  }

  function handleUploadClick() {
    // Programmatically trigger the file input click
    document.getElementById(name).click();
  }

  function handleCancelClick() {
    setFile(null);
    setValue(name, null);
  }

  useEffect(()=> {
    register(name, {
        required:true,
        
    })
    },[])
  




  return (
    <div className="flex flex-col gap-y-2">
      <label className="text-richblack-5">
        {label}
        <sup className="text-pink-200">*</sup>
      </label>
      <div className="py-6 flex flex-col items-center justify-center rounded-md border-dashed border-2 border-richblack-400 bg-richblack-600 relative">
        <input
          type="file"
          id={name}
          name={name}
          onChange={handleChange}
          className="hidden"
          accept="image/*"
          
        />
        {file && (
          <img
            src={file}
            alt="selectedImage"
            className="max-h-[250px] block"
          />
        )}
        {!file && (
          <div className="rounded-full aspect-square bg-yellow-800 p-2 border border-yellow-50 cursor-pointer">
            <FiUploadCloud
              className="text-2xl text-yellow-50"
              onClick={handleUploadClick}
            />
          </div>
        )}
        {!file && (
          <p className="text-white">
            Click to{" "}
            <span
              className="font-semibold text-yellow-50 cursor-pointer"
              onClick={handleUploadClick}
            >
              Browse
            </span>{" "}
            and upload an image
          </p>
        )}
        {!file && (
          <ul className="flex gap-6 my-4 list-disc text-richblack-200 text-sm font-bold">
            <li>Aspect ratio 16:9</li>
            <li>Recommended size 1024*576</li>
          </ul>
        )}
        {file && (
          <button onClick={handleCancelClick} className=" py-2  text-yellow-100">Cancel</button>
        )}
      </div>
      {errors[name] && <p className="text-pink-200 text-xs">{label} is required.</p>}
    </div>
  );
}
