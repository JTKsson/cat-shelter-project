"use client"

import { getCats } from "@/api-routes/cats";
import { useEffect, useState } from "react";
import UpdateCat from "../UpdateCat";
import DeleteCat from "../DeleteCat";

const CatsList = () => {
  const [cats, setCats] = useState([]);

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
  });

  return (
    <div>
      <p>Kattlista</p>
      {cats.map((cat) => (
        <div className="mt-4 bg-green-600" key={cat.id}>
          <h2>{cat.name}</h2>
          <p>{cat.year}</p>
          <p>{cat.desc}</p>
          {cat.image_url && <img src={cat.image_url} alt={`Image of ${cat.name}`} width="200px" height="200px"/>}
          <UpdateCat id={cat.id} />
          <DeleteCat id={cat.id} />
          <p>{cat.id}</p>
        </div>
      ))}
    </div>
  );
};

export default CatsList;