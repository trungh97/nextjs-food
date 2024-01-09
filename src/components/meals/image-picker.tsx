"use client";

import { ChangeEvent, ChangeEventHandler, useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function ImagePicker({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [pickedImage, setPickedImage] = useState<string | ArrayBuffer | null>();

  function handlePickClick() {
    imageInputRef.current?.click();
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet!</p>}
          {pickedImage && (
            <Image
              src={pickedImage as string | StaticImport}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
        <input
          ref={imageInputRef}
          className={classes.input}
          type="file"
          name={name}
          id="image"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          required
        />
        <button
          onClick={handlePickClick}
          className={classes.button}
          type="button"
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
