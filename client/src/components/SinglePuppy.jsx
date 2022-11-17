import React, { useEffect } from "react";
import usePuppies from "../hooks/usePuppies";
import { useParams } from "react-router-dom";
import PuppyCard from "./PuppyCard";

export default function SinglePuppy() {
  const { id } = useParams();
  const { fetchPuppy, selectedPuppy } = usePuppies();

  useEffect(() => {
    fetchPuppy(id);
  }, []);

  console.log(selectedPuppy);

  return <PuppyCard puppy={selectedPuppy} />;
}
