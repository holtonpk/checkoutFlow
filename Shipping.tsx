import React, { useState } from "react";
import Link from "next/link";
import OrderSummary, { OrderSummaryMobile } from "./OrderSummary";
import { SiFedex, SiUsps, SiUps } from "react-icons/si";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { CheckoutFooter } from "./CheckoutHeader";
import CheckoutStatus from "./CheckoutStatus";
import { useRouter } from "next/router";

const Shipping = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between w-screen min-h-screen mt-1 ">
      <ShippingInput />
      <div className="hidden md:block w-[50%] ">
        <OrderSummary page="2" />
      </div>
    </div>
  );
};

export default Shipping;

const ShippingInput = () => {
  const router = useRouter();
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
  const handleSubmit = () => {
    router.push("/checkout/payment");
  };

  const customerInfo = {
    contact: "holtonpk@gmail.com",
    shipTo: "9368 prairie view dr, highlands ranch CO 80126, United States",
  };

  return (
    <div className="flex flex-col w-full h-screen md:w-[60%]">
      <CheckoutStatus page={2} />
      <OrderSummaryMobile page="2" />
      <div className="w-[90%] mt-8 h-screen mx-auto border-c3 flex gap-6 flex-col items-center ">
        <CheckoutDetails customerInfo={customerInfo} page={2} />
        <div className="flex flex-col items-center w-full">
          <h1 className="w-full items-start text-lg mb-4">Shipping method </h1>
          <div className="border-[1px] border-black/30   flex flex-col  items-center w-full rounded-lg">
            {shippingOptions.map((option, index) => (
              <button
                onClick={() => setSelectedShipping(option)}
                key={index}
                className={`${
                  index < shippingOptions.length - 1 && "border-b-2"
                } w-full flex items-center justify-between  p-4`}
              >
                <div className="flex gap-6 items-center">
                  <span
                    className={`${
                      selectedShipping.title == option.title
                        ? "bg-blue-500"
                        : "bg-transparent"
                    } h-4 w-4 border-2  rounded-full`}
                  />
                  <h1 className="text-sm text-black/80 gap-1 flex ">
                    {option.title}
                  </h1>
                </div>
                <h1 className="text-sm text-black">{option.price}</h1>
              </button>
            ))}
          </div>
        </div>

        <div className="flex  justify-between w-full mt-3">
          <Link
            href="/checkout/information"
            className="flex flex-row items-center p-3 rounded-lg w-fit "
          >
            <MdOutlineArrowBackIos className="w-4 h-4  fill-black" />
            <h2 className="text-sm text-black font-f2">
              Return to information
            </h2>
          </Link>
          <button
            onClick={handleSubmit}
            className="flex flex-row items-center p-3 rounded-lg w-fit bg-black"
          >
            <h2 className="text-lg text-white font-f2">Continue To Payment</h2>
            <MdOutlineArrowBackIos className="w-4 h-4 rotate-180 fill-white" />
          </button>
        </div>
        <CheckoutFooter />
      </div>
    </div>
  );
};

export const CheckoutDetails = ({ customerInfo, page }: any) => {
  console.log(customerInfo);
  return (
    <div className="border-[1px] border-black/30 p-3 flex flex-col gap-2 items-center w-full rounded-lg">
      <div className="flex items-center w-full">
        <div className="flex md:flex-row flex-col w-full">
          <h1 className="text-sm w-[10%] text-black/70 min-w-fit pr-4 ">
            Contact
          </h1>
          <h1 className="text-sm w-[80%] pr-4">{customerInfo.contact}</h1>
        </div>
        <Link
          href="/checkout/information"
          className="w-fit text-sm text-black hover:text-black/70"
        >
          Change
        </Link>
      </div>
      <span className="w-full h-[1px] bg-black/30" />
      <div className="flex items-center w-full justify-between ">
        <div className="flex md:flex-row flex-col w-full  ">
          <h1 className="text-sm w-[10%] text-black/70  min-w-fit pr-4 ">
            Ship to
          </h1>
          <h1 className="text-sm w-full   ">{customerInfo.shipTo}</h1>
        </div>

        <Link
          href="/checkout/information"
          className="w-fit text-sm text-black hover:text-black/70 "
        >
          Change
        </Link>
      </div>
      {page == 3 && (
        <>
          <span className="w-full h-[1px] bg-black/30" />

          <div className="flex items-center w-full justify-between ">
            <div className="flex md:flex-row flex-col w-full  ">
              <h1 className="text-sm w-[10%] text-black/70  min-w-fit pr-4 ">
                Method
              </h1>
              <h1 className="text-sm w-full   ">{customerInfo.method}</h1>
            </div>

            <Link
              href="/checkout/shipping"
              className="w-fit text-sm text-black hover:text-black/70 "
            >
              Change
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

const shippingOptions = [
  { title: "Standard Delivery (4-7 working days)", price: "Free" },
  { title: "Express Delivery (2-4 working days)", price: "$15.00" },
  { title: "Super Express Delivery (1-3 Minutes)", price: "$150.00" },
];
