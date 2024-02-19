import { useState, useEffect } from "react";

function Toggle({
  toggles,
  value,
  callback,
}: {
  toggles: string[];
  value: string;
  callback: Function;
}) {
  const [val, setVal] = useState(value);

  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <div className="flex">
      {toggles.map((toggle, index) => (
        <div
          key={"toggle-" + toggle}
          className={
            "my-auto cursor-pointer px-2 py-1" +
            (toggle === val
              ? " bg-vf-primary/15 text-vf-primary rounded-md"
              : "")
          }
          onClick={() => callback(toggle)}
        >
          {toggle}
        </div>
      ))}
      {/* <div
        className={
          "my-auto cursor-pointer px-2 py-1" +
          (value ? " bg-vf-primary/15 text-vf-primary rounded-md" : "")
        }
        onClick={() => callback(true)}
      >
        {toggleA}
      </div>
      <div
        className={
          "my-auto cursor-pointer px-2 py-1" +
          (!value ? " bg-vf-primary/15 text-vf-primary rounded-md" : "")
        }
        onClick={() => callback(false)}
      >
        {toggleB}
      </div> */}
    </div>
  );
}

export default Toggle;
