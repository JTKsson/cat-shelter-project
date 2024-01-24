"use client"

import React, { ChangeEvent, useState } from 'react';
import { addCat } from '@/api-routes/cats';
import { uploadImage } from '@/utils/uploadImage';
import { useRouter } from 'next/navigation';



const AddCat = () => {
const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    year: '',
    desc: '',
    image: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    if (name === 'image') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];
  
      if (file) {
        setFormData((prevData) => ({ ...prevData, [name]: file }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      if (formData.image) {
        const { publicUrl, error } = await uploadImage(formData.image);
  
        if (error) {
          console.error('Error uploading image:', error);
          return;
        }
  
        setFormData((prevData) => ({ ...prevData, image: publicUrl }));
      }
  
      const response = await addCat(formData);
  
      if (!response) {
        console.error('Unexpected response from addCat:', response);
        return;
      }
  
      if (response.error) {
        console.error('Error adding cat:', response.error);
      } else if (response.status === 201) {
        console.log('Cat added successfully!');
        setFormData({
          name: '',
          year: '',
          desc: '',
          image: null
        });

        router.refresh()
      } else {
        console.error('Unexpected response structure from addCat:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    console.log({formData})
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Year:
        <input type="text" name="year" value={formData.year} onChange={handleChange} />
      </label>
      <br />
      <label>
        Description:
        <textarea name="desc" value={formData.desc} onChange={handleChange} />
      </label>
      <br />
      <label>
        Image:
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Add Cat</button>
    </form>
  );
};

export default AddCat;
