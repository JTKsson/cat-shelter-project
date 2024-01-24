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
        //@ts-ignore
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
          //@ts-ignore
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
    <div className="flex flex-col bg-slate-600 p-4 rounded-xl">
    <p className=' text-lg'>Add cat to the list: </p>
    <form onSubmit={handleSubmit}>
      <label>
        Name: <br/>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Year: <br/>
        <input type="text" name="year" value={formData.year} onChange={handleChange} />
      </label>
      <br />
      <label>
        Description: <br/>
        <textarea name="desc" value={formData.desc} onChange={handleChange} />
      </label>
      <br />
      <label>
        Image:  <br/>
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
      </label>
      <br />
      <button className="bg-blue-800  rounded-xl px-3 py-2 w-fit self-center mt-4" type="submit">Add Cat</button>
    </form>
    </div>
  );
};

export default AddCat;
