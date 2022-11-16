import { useState } from "react";
import usePuppies from "../hooks/usePuppies";

export default function CreatePupForm() {
  const { createPuppy } = usePuppies();
  const [name, setName] = useState("");
  const [age, setAge] = useState(undefined);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPuppy({ name, age, email });
    setName("");
    setAge(undefined);
    setEmail("");
  };

  return (
    <div>
      <h4>Create Puppy Form:</h4>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="age"
          type="text"
          value={age}
          onChange={(e) => setAge(+e.target.value)}
        />
        <input
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
