"use client"

import { getCats } from "@/api-routes/cats";
import { useEffect, useState } from "react";

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
  }, []);

  return (
    <div>
      <p>Kattlista</p>
      {cats.map((cat) => (
        <div key={cat.id}>
        <h2>{cat.name}</h2>
        <p>{cat.year}</p>
        <p>{cat.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default CatsList;
