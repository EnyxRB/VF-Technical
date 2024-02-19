import { UseFormRegisterReturn } from "react-hook-form";

function Input({
  label,
  type = "text",
  props,
}: {
  label: string;
  type?: string;
  props: UseFormRegisterReturn;
}) {
  return (
    <div className="inline-block">
      <div>{label}</div>
      <input
        className="w-full border border-black px-1 py-1.5"
        type={type}
        {...props}
      />
    </div>
  );
}

export default Input;
