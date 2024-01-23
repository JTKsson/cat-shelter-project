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
    
    getUser()
  }, []);

  return (
    <div>
      <p>Kattlista</p>
      {cats &&
        cats.map((cat: Cats) => (
          <div className="mt-4 bg-green-600" key={cat.id}>
            <h2>{cat.name}</h2>
            <p>{cat.year}</p>
            <p>{cat.desc}</p>
            {cat.image_url && (
              <img
                src={cat.image_url}
                alt={`Image of ${cat.name}`}
                width="200px"
                height="200px"
              />
            )}

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
        ))}
    </div>
  );
};

export default CatsList;
