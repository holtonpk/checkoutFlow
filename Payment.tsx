import React, { useState } from "react";
import Link from "next/link";
import OrderSummary, { OrderSummaryMobile } from "./OrderSummary";
import { SiFedex, SiUsps, SiUps } from "react-icons/si";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { CheckoutFooter } from "./CheckoutHeader";
import CheckoutStatus from "./CheckoutStatus";
import { useRouter } from "next/router";
import { CheckoutDetails } from "./Shipping";
import { InformationInput } from "./Information";
const Payment = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between w-screen min-h-screen mt-1 ">
      <PaymentInput />
      <div className="hidden md:block w-[50%] ">
        <OrderSummary page="3" />
      </div>
    </div>
  );
};

export default Payment;

const PaymentInput = () => {
  const router = useRouter();
  const handleSubmit = () => {
    router.push("/checkout/payment");
  };
  const [sameBillingAddress, setSameBillingAddress] = useState(true);

  return (
    <div className="flex flex-col items-center w-full h-screen md:w-[60%]">
      <CheckoutStatus page={3} />
      <OrderSummaryMobile page="3" />
      <div className="w-[90%] mt-8 h-screen  flex gap-6 flex-col items-center ">
        <CheckoutDetails customerInfo={customerInfo} page={3} />
        <div className="w-full flex-col flex mb-4">
          <h1 className="w-full items-start text-lg ">Payment</h1>
          <h1 className="w-full items-start text-sm text-black/70 ">
            All transactions are secure and encrypted.
          </h1>
        </div>

        <div className="w-full flex-col flex mb-4">
          <h1 className="w-full items-start text-lg ">Billing address </h1>
          <h1 className="w-full items-start text-sm mb-2 text-black/70 ">
            Select the address that matches your card or payment method.
          </h1>

          <div className="border-[1px] border-black/30   flex flex-col  items-center w-full rounded-lg">
            <button
              onClick={() => setSameBillingAddress(true)}
              className=" w-full flex items-center justify-between  p-4"
            >
              <div className="flex gap-6 items-center">
                <span
                  className={`${
                    sameBillingAddress ? "bg-blue-500" : "bg-transparent"
                  } h-4 w-4 border-2  rounded-full`}
                />
                <h1 className="text-sm text-black/80 gap-1 flex ">
                  Same as shipping address
                </h1>
              </div>
            </button>
            <span className="w-full h-[1px] bg-black/30" />
            <button
              onClick={() => setSameBillingAddress(false)}
              className=" w-full flex items-center justify-between  p-4"
            >
              <div className="flex gap-6 items-center">
                <span
                  className={`${
                    !sameBillingAddress ? "bg-blue-500" : "bg-transparent"
                  } h-4 w-4 border-2  rounded-full`}
                />
                <h1 className="text-sm text-black/80 gap-1 flex ">
                  Use a different billing address
                </h1>
              </div>
            </button>
            {!sameBillingAddress && (
              <div className=" bg-black/5 w-full openOrderSummary p-4">
                <InformationInput />
              </div>
            )}
          </div>
        </div>
        <div className="flex  justify-between w-full mt-3">
          <Link
            href="/checkout/shipping"
            className="flex flex-row items-center p-3 rounded-lg w-fit "
          >
            <MdOutlineArrowBackIos className="w-4 h-4  fill-black" />
            <h2 className="text-sm text-black font-f2">Return to shipping</h2>
          </Link>
          <button
            onClick={handleSubmit}
            className="flex flex-row items-center p-3 rounded-lg w-fit bg-black"
          >
            <h2 className="text-lg text-white font-f2 uppercase">Pay Now</h2>
            <MdOutlineArrowBackIos className="w-4 h-4 rotate-180 fill-white" />
          </button>
        </div>
        <CheckoutFooter />
      </div>
    </div>
  );
};

const customerInfo = {
  contact: "holtonpk@gmail.com",
  shipTo: "9368 prairie view dr, highlands ranch CO 80126, United States",
  method: "Standard Delivery (4 - 7 Working Days) · Free",
};
