import { Widget, FileUpload } from "@uploadcare/react-widget";
import { useState } from "react";
import classNames from "@/lib/classnames";
import {
  HiOutlinePhotograph,
  HiCheck,
  HiOutlineCheck,
  HiOutlineExclamation,
} from "react-icons/hi";

const MIN_DPI = 300;

const hasMinDPI = (physicalWidth, physicalHight, uom = "inch") => {
  return function (fileInfo) {
    // Intermedia validations lack this info - until upload is complete
    const originalImageInfo = fileInfo.originalImageInfo || {};
    const minHeight = physicalHight * MIN_DPI;
    const minWidth = physicalWidth * MIN_DPI;
    const imgHeight = originalImageInfo.height;
    const imgWidth = originalImageInfo.width;

    return imgHeight >= minHeight && imgWidth >= minWidth;
  };
};

export default function ChooseArtwork({ minWidth, minHeight, onChange }) {
  const [imageValidation, setImageValidation] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (fileInfo) => {
    onChange?.({
      name: fileInfo.name,
      url: fileInfo.cdnUrl,
    });
    setFile(fileInfo);
  };
  const handleFileProgress = (fileInfo) => {};
  const handleUploadFinish = (fileInfo) => {
    hasMinDPI(minWidth, minHeight)(fileInfo)
      ? setImageValidation({
          type: "success",
          text: "Image size looks good.",
        })
      : setImageValidation({
          type: "warning",
          text: "Image might be too small.",
        });
  };
  return (
    <div>
      <label htmlFor="file">Your file:</label>{" "}
      <div>
        <Widget
          tabs="file url gdrive dropbox onedrive box"
          effects={["crop", "rotate", "invert"]}
          publicKey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}
          id="file"
          previewStep="true"
          imagesOnly={true}
          onFileSelect={(file) => {
            if (file) {
              file.progress(handleFileProgress);
              file.done(handleUploadFinish);
            }
          }}
          onChange={handleChange}
        />
      </div>
      <div
        className={classNames(
          imageValidation.type === "success"
            ? "text-green-500"
            : "text-amber-500",
          "text-sm flex items-center",
        )}
      >
        {imageValidation.type === "success" && (
          <HiOutlineCheck className="w-5 h-5" />
        )}
        {imageValidation.type === "warning" && (
          <HiOutlineExclamation className="w-5 h-5" />
        )}
        <span className="ml-2">{imageValidation.text}</span>
      </div>
    </div>
  );
}
