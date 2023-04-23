import React from "react";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
const CheckoutStatus = ({ page }: any) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between w-[95%] mx-auto p-6 h-fit relative">
        <span className="w-[80%] z-[-10] top-[2.75rem] left-1/2 -translate-x-1/2 h-1 bg-black/20 absolute" />
        <StatusLabel
          step={{ title: "Information", step: 1, href: "checkout/information" }}
          page={page}
        />
        <StatusLabel
          step={{ title: "Shipping", step: 2, href: "checkout/shipping" }}
          page={page}
        />

        <StatusLabel
          step={{ title: "Payment", step: 3, href: "checkout/payment" }}
          page={page}
        />

        <StatusLabel
          step={{ title: "Complete", step: 4, href: "/#" }}
          page={page}
        />
      </div>
    </>
  );
};

export default CheckoutStatus;

const StatusLabel = ({ step, page }: any) => {
  return (
    <Link href={step.href} className="flex flex-col gap-1 items-center px-3">
      <div
        className={`border-4 rounded-full bg-white  h-10 w-10 flex items-center justify-center  ${
          page == step.step
            ? " border-black text-black"
            : " border-black/20 text-black/20"
        }`}
      >
        {page > step.step ? <FaCheck className="h-4 w-4 " /> : step.step}
      </div>
      <h2
        className={`${
          page == step.step ? " text-black" : "  text-black/20"
        } text-[12px] uppercase `}
      >
        {step.title}
      </h2>
    </Link>
  );
};
