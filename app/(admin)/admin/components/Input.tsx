"use client";

interface InputProps {
  placeholder: string;
  type: string;
}
export default function Input({ placeholder, type }: InputProps) {
  return (
    <input
      className="p-2 m-2 outline-none border-2 border-blue-700 rounded-lg bg-transparent"
      type={type}
      required
      placeholder={placeholder}
    />
  );
}
