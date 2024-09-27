import React, {type FC, type ReactElement, useState} from "react";
import cx from "classnames";

interface SearchbarButtonProps {
  label: string;
  icon: ReactElement;
}

export const SearchbarButton: FC<SearchbarButtonProps> = ({ label, icon }) => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <div
      className={cx(
        "flex cursor-pointer flex-row items-center gap-2 rounded-full border-2 border-black p-4 shadow-fromton-hover transition-all duration-200 ease-in-out",
        { "bg-cheese !shadow-none translate-x-[6px] translate-y-[6px]": selected },
      )}
      onClick={() => setSelected(!selected)}
    >
      {React.cloneElement(icon, { className: "text-black h-6 w-6" })}
      <span>{label}</span>
    </div>
  );
};
