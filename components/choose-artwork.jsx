import { Widget, FileUpload } from "@uploadcare/react-widget";
import { useEffect, useState } from "react";
import classNames from "@/lib/classnames";
import {
  HiOutlinePhotograph,
  HiCheck,
  HiOutlineCheck,
  HiOutlineExclamation,
} from "react-icons/hi";
import { InputText } from "./input";

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
  const [selectedHeight, setSelectedHeight] = useState(minHeight);
  const [selectedWidth, setSelectedWidth] = useState(minWidth);

  useEffect(() => {
    if (file) {
      hasMinDPI(selectedWidth, selectedHeight)(file)
        ? setImageValidation({
            type: "success",
            text: "Image size looks good.",
          })
        : setImageValidation({
            type: "warning",
            text: "Image might be too small.",
          });
    }
  }, [file, minHeight, minWidth, selectedHeight, selectedWidth]);

  const handleChange = (fileInfo) => {
    onChange?.({
      name: fileInfo.name,
      url: fileInfo.cdnUrl,
    });
    setFile(fileInfo);
  };

  const handleFileProgress = (fileInfo) => {};
  const handleUploadFinish = (fileInfo) => {};
  return (
    <div>
      <div className="font-medium text-gray-700 text-base">Artwork</div>
      <div className="mt-4 w-full">
        <div className="max-w-sm space-y-3">
          <p className="text-gray-500">
            Enter your artwork dimentions (Max: {minWidth} x {minHeight} inch):
          </p>
          <InputText
            placeholder="Width"
            type="number"
            step="0.01"
            defaultValue={minWidth}
            max={minWidth}
            endIcon={<span className="text-xs text-gray-500">Inch</span>}
            startIcon={<span className="text-xs text-gray-500">W</span>}
            onChange={(e) => {
              setSelectedWidth(e.target.value);
            }}
          />
          <InputText
            placeholder="Height"
            type="number"
            step="0.01"
            defaultValue={minHeight}
            max={minHeight}
            endIcon={<span className="text-xs text-gray-500">Inch</span>}
            startIcon={<span className="text-xs text-gray-500">H</span>}
            onChange={(e) => {
              setSelectedHeight(e.target.value);
            }}
          />
        </div>

        <div className="mt-3">
          <label className="sr-only" htmlFor="file">
            Your file:
          </label>
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
      </div>
      <div
        className={classNames(
          imageValidation.type === "success"
            ? "text-green-500"
            : "text-amber-500",
          "text-sm flex items-center"
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
