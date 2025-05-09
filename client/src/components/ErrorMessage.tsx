import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <div className=" text-center bg-red-400 font-bold text-white p-3 uppercase">
      {children}
    </div>
  );
}
