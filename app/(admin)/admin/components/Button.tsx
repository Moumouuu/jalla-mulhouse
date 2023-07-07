"use client";
interface ButtonProps {
  text: string;
  onClick: any;
}

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 m-3 bg-blue-900/30 hover:bg-blue-600/50"
      type="submit"
    >
      {text}
    </button>
  );
}
