"use client";

import { getCats } from "@/api-routes/cats";
import { useEffect, useState } from "react";
import UpdateCat from "../UpdateCat";
import DeleteCat from "../DeleteCat";
import { Cats } from "@/types/types";
import { getUser } from "@/api-routes/users";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const CatsList = () => {
  const [cats, setCats] = useState([]);
  const [isUser, setIsUser] = useState(null);
  const [expandedDescId, setExpandedDescId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error, status } = await getCats();

        if (error) {
          console.error("Error fetching cats:", error);
        } else {
          setCats(data || []);
        }
      } catch (error) {
        console.error("Error fetching cats:", error);
      }
    };

    fetchData();

    const supabase = createClientComponentClient();

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsUser(user);
    };

    getUser();
  }, []);

  const toggleDescription = (catId) => {
    setExpandedDescId((prevId) => (prevId === catId ? null : catId));
  };

  return (
    <div className="flex flex-col w-11/12 justify-center">
      <p>Kattlista</p>
      <div className="flex flex-col w-full">
        {cats &&
          cats.map((cat: Cats) => (
           <div className="flex flex-col p-4 mt-4 bg-gray-900 w-full"> 
            <div
              className=" flex flex-row justify-evenly"
              key={cat.id}
            >
              <div className="w-3/5">
                {cat.image_url && (
                  <img src={cat.image_url} alt={`Image of ${cat.name}`} />
                )}
              </div>

              <div className="flex flex-col w-2/5 justify-center text-center">
                <h2 className="text-2xl p-2">Name: {cat.name}</h2>
                <p className="text-lg">Born: {cat.year}</p>
              </div>
           
              {isUser && (
                <div>
                  <UpdateCat
                    id={cat.id}
                    name={cat.name}
                    year={cat.year}
                    desc={cat.desc}
                  />
                  <DeleteCat id={cat.id} />
                </div>
              )}
            </div>
            <div className="m-4">
            {expandedDescId === cat.id && (
                <p>
                  Description: <br />
                  {cat.desc}
                </p>)}
                <button
                onClick={() => toggleDescription(cat.id)}
                className="text-blue-500 underline cursor-pointer"
              >
                {expandedDescId === cat.id ? "Show less" : "Show more"}
              </button></div>
                </div>
          ))}
          
      </div>
    </div>
  );
};

export default CatsList;
