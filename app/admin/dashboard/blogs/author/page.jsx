"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { submitForm } from "../actions/form";

// Zod schema for validation
const schema = z.object({
  name: z.string().nonempty({ message: "Name is mandatory" }),
  image: z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), { message: "Please upload a valid image" })
});

function RHForm() {
  // initialize the useForm hook with the Zod resolver and default values
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", image: null },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const hiddenFileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  // function to handle file input changes
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
        setValue("image", file); // manually set the image in the form state
      };

      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const removeImage = () => {
    setPreview(null);
    hiddenFileInputRef.current.value = "";
    setValue("image", null);
  };

  const triggerFileInput = () => hiddenFileInputRef.current?.click();

  const onSubmitForm = async (data) => {
    // call the server action
    // await submitForm(data);

    console.log("Form Data:", data);
    console.log("Uploaded Image:", data.image);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="field-wrap">
        <label htmlFor="name">Name </label>
        <Input {...register("name")} type="text" />
        <p className="error">{errors.name && errors.name.message}</p>
      </div>

      <div className="upload">
        {!preview && (
          <button type="button" onClick={triggerFileInput}>
            Upload Image
          </button>
        )}

        {preview && (
          <div className="preview">
            <Image
              src={preview}
              className="img"
              alt="profilePicture"
              height={50}
              width={50}
            />

            <div className="buttons">
              <button type="button" onClick={triggerFileInput}>
                Change Image
              </button>

              <button type="button" onClick={removeImage}>
                Remove Image
              </button>
            </div>
          </div>
        )}
        <input
          {...register("image")}
          ref={hiddenFileInputRef}
          hidden
          type="file"
          onChange={handleFileChange}
        />
        <p className="error">{errors.image && errors.image.message}</p>
      </div>

      <Button className="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading" : "Submit"}
      </Button>
    </form>
  );
}

export default RHForm;