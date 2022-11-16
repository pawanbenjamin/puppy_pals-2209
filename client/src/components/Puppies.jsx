import { useEffect } from "react";
import usePuppies from "../hooks/usePuppies";

export default function Puppies() {
  const { puppies, fetchPuppies } = usePuppies();

  useEffect(() => {
    fetchPuppies();
  }, []);

  return (
    <div>
      {puppies.map((puppy) => {
        return (
          <div>
            <h3>{puppy.name}</h3>
          </div>
        );
      })}
    </div>
  );
}
