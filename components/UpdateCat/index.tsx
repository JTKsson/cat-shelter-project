"use client"

import React, { useState } from 'react';
import { updateCat } from '@/api-routes/cats';
import { uploadImage } from '@/utils/uploadImage';

const UpdateCat = ({id}) => {
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    desc: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'image') {
      const file = e.target.files?.[0];
  
      if (file) {
        setFormData((prevData) => ({ ...prevData, [name]: file }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  };
  
  const handleSubmit = async (e) => {
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
  
      setFormData((prevData) => ({
        ...prevData,
        id: id,
      }));
  
      const response = await updateCat(formData);
  
      if (!response) {
        console.error('Unexpected response from updateCat:', response);
        return;
      }
  
      if (response.error) {
        console.error('Error updating cat:', response.error);
      } else if (response.status === 200) {
        console.log('Cat updated successfully!');
      } else {
        console.error('Unexpected response structure from updateCat:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
      <button type="submit">Update Cat</button>
    </form>
  );
};

export default UpdateCat;
