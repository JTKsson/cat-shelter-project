"use client"

import { createUser } from "@/api-routes/users";
import { ChangeEvent, FormEvent, useState } from "react";

const CreateUser = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isSignInSuccessful, setIsSignInSuccessful] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({formData})

    try {
      await createUser(formData);
      setIsSignInSuccessful(true);
      setTimeout(() => {
        setIsSignInSuccessful(false);
      }, 5000); // Hide the message after 5 seconds
      setFormData({ email: '', password: '' });
      console.log("Sign in successful");
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg md:w-1/3 h-50">
      <h3>Create a new user:</h3>
    <form className="flex flex-col" onSubmit={handleSubmit}>
    <label htmlFor="email">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
    />

    <label htmlFor="password">Password:</label>
    <input
      type="password"
      id="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
    />

    <button type="submit">Create</button>
  </form>
  {isSignInSuccessful && (
        <p className="text-green-500 mt-2">
          An email has been sent for verification.
        </p>
      )}
  </div>
  )
}

export default CreateUser