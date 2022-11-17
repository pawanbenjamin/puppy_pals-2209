import { useEffect } from "react";
import usePuppies from "../hooks/usePuppies";
import PuppyCard from "./PuppyCard";

export default function Puppies() {
  const { puppies, fetchPuppies } = usePuppies();

  useEffect(() => {
    fetchPuppies();
  }, []);

  return (
    <div>
      {puppies.map((puppy) => {
        console.log(puppy);
        return <PuppyCard puppy={puppy} />;
      })}
    </div>
  );
}
