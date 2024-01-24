//@ts-nocheck
"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { updateCat } from "@/api-routes/cats";
import { uploadImage } from "@/utils/uploadImage";
import { Cats } from "@/types/types";

const UpdateCat = ({ id, name, year, desc }: Cats) => {

  const [formData, setFormData] = useState({
    name: name,
    year: year,
    desc: desc,
    image: null,
    id: id,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "image") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];

      if (file) {
        //@ts-ignore
        setFormData((prevData) => ({ ...prevData, [name]: file }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (formData.image) {
        const { publicUrl, error } = await uploadImage(formData.image);

        if (error) {
          console.error("Error uploading image:", error);
          return;
        }
        //@ts-ignore
        setFormData((prevData) => ({ ...prevData, image: publicUrl }));
      }

      const response = await updateCat(formData);

      if (!response) {
        console.error("Unexpected response from updateCat:", response);
        return;
      }

      if (response.error) {
        console.error("Error updating cat:", response.error);
      } else if (response.status === 204) {
        console.log("Cat updated successfully!");
      } else {
        console.error("Unexpected response structure from updateCat:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="flex flex-col p-4 text-left text-black" onSubmit={handleSubmit}>
      <label>
        Name: <br/>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Born: <br/>
        <input
          type="text"
          name="year"
          value={formData.year}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:<br/>
        <textarea name="desc" value={formData.desc} onChange={handleChange} />
      </label>
      <br />
      <label>
        Image:<br/>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
      </label>
      <br />
      <button className="bg-blue-800 rounded-xl px-3 py-2 w-fit self-center mt-4" type="submit">Update Cat</button>
    </form>
  );
};

export default UpdateCat;
