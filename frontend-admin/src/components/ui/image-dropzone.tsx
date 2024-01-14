import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "./input";
import { Button } from "./button";
import { Trash } from "lucide-react";

interface ImageDropzoneProps {
  files: any;
  setFiles: (value: any) => void;
  onChange: (value: any) => void;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({files, setFiles, onChange}) => {

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles: any) => {
      setFiles((prevState: any) => [
        ...prevState.concat(
          acceptedFiles.map((file: any) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ),
        ),
      ]);
      console.log(files);
    },
    noClick: true,
    noKeyboard: true,
  });

  const removeFile = (file: any) => {
    console.log(files);
    const newFiles: any = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const thumbs = files.map((file: any) => (
    <div key={file.name}>
      <div className="relative space-y-1">
        <div>{file.name}</div>
        <img
          className="inline-block w-full h-auto"
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
        <Button
          variant="destructive"
          size="sm"
          className="absolute bottom-2 right-2"
          onClick={() => removeFile(file)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ));

  return (
    <div className="border p-4">
      <div {...getRootProps({ className: "dropzone space-y-2 w-full h-full" })}>
        <Input {...getInputProps()} onChange={onChange} />
        <div className="grid grid-cols-4 gap-4 ">{thumbs}</div>
        <p>Drag and drop images here</p>
        <Button type="button" onClick={open}>
          Upload images
        </Button>
      </div>
    </div>
  );
};

export default ImageDropzone;
