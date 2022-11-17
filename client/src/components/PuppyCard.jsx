import React from "react";

export default function PuppyCard({ puppy }) {
  return (
    <div>
      <h3>{puppy.name}</h3>
      <h4>{puppy.email}</h4>
      <h4>isCute: {puppy.isCute}</h4>
      <h4>Age: {puppy.age}</h4>
    </div>
  );
}
