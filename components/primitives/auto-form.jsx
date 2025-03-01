"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputPrimites } from "./input-primites";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";


export function BasicForm({ formSchema, onSubmit }) {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      terms: false, // Initially unchecked
    },
  });

  // const { watch } = form;

  console.log(formSchema.shape, 'shape');

  // State for file preview
  const [logoImg, setLogoImg] = useState(null);
  const fileInputRef = useRef(null); // useRef to manage file input

  // File change handler for the profile picture
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLogoImg(URL.createObjectURL(file)); // Preview the selected image
    form.setValue("image", file); // Set file in React Hook Form

  };

  // Remove the image preview
  const removeImage = () => {
    setLogoImg(null); // Clear the preview state
    form.setValue("image", null); // Remove the image from form state
  };

  // const termsValue = watch('terms');


  const schemaShape = formSchema._def.schema?.shape || formSchema.shape;

  return (
    <Form {...form} className=''>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 m-3  bg-white overflow-auto">
        {formSchema &&
          Object.keys(schemaShape).map((fieldKey, idx) => {
            const fieldConfig = schemaShape[fieldKey]._def.description;
            console.log(fieldConfig?.type, "fieldtype");
            console.log(fieldConfig?.options ? fieldConfig?.options || [] : 'no-option', "fieldoption");
            console.log(fieldKey,"fieldKey")
            return (
              <InputPrimites
                key={idx}
                form={form}
                name={fieldKey}
                label={fieldConfig?.label}
                placeholder={fieldConfig?.placeholder}
                type={fieldConfig?.type}
                isFile={fieldConfig?.type === "file"}
                isCheckbox={fieldConfig?.type === "checkbox"}
                isTextarea={fieldConfig?.type === "textarea"}
                options={fieldConfig?.type === "select" ? fieldConfig?.options || [] : undefined}
                logoImg={fieldConfig?.type === "file" ? logoImg : null}
                radioOptions={fieldConfig?.type === "radio" ? fieldConfig?.options || [] : undefined}
                setLogoImg={setLogoImg}
                onChange={handleFileChange}
                removeImage={removeImage}
                
              />
            );
          })}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}