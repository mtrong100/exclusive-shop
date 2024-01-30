import { ChangeEvent, useState } from "react";

export default function useOnchange() {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return { value, handleChange, setValue };
}
