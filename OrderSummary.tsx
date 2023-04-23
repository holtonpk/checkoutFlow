import React, { useState, useEffect } from "react";
import { useCart } from "@/Contexts/CartContext";
import { RiCouponLine, RiShoppingCartLine } from "react-icons/ri";
import { MdOutlineArrowBackIos, MdOutlineArrowDropDown } from "react-icons/md";
import { BsTrash3 } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";
import Link from "next/link";
import { formatPrice } from "../productPage/productPanel";
import Image from "next/image";

const OrderSummary = ({ page, dynamicShipping }: any) => {
  const { cartTotalPrice, cart, removeItem, updateQuantity } = useCart();

  console.log("items", cart);

  return (
    <div className="relative bg-black/5 h-fit md:h-full md:min-h-screen md:pt-16 items-center flex flex-col justify-start w-full  px-8 py-6  border-l-1 border-c3">
      <div className="flex  flex-col justify-between w-full overflow-y-scroll border-b-1 border-c3 h-fit">
        {cart.map((product: any, i: number) => (
          <div key={i} className="relative shadow-lg ">
            <div className="h-28 relative flex w-full items-center gap-4">
              <div className="relative h-fit w-fit">
                <label className="flex absolute items-center justify-center h-6 w-6 rounded-full bg-black/90 -top-2 -right-2  text-white z-20  pointer-events-none ">
                  {product.quantity}
                </label>
                <div className="relative h-20 w-20 overflow-hidden aspect-square border-[1px] border-black/60  rounded-md">
                  <Image
                    src={product.images[0].node.src}
                    alt={product.images[0].node.altText}
                    layout="fill"
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="flex flex-col items-start h-fit w-2/3">
                <Link
                  href={
                    "/Product/" +
                    product.title.slice(0, 25).replaceAll(" ", "_")
                  }
                >
                  <h2 className="text-lg text-c1 font-f1">{product.title}</h2>
                  <h2 className="text-lg text-black font-bold">
                    {formatPrice(product.price.amount * product.quantity) +
                      " USD"}
                  </h2>
                </Link>
                <div className="flex justify-between items-center w-full mt-3">
                  <div className="flex ">
                    <div className="font-bold hover:opacity-50 cursor-pointer  relative"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="py-6 border-y-[1px] border-black/20 flex flex-row gap-4 items-center justify-between w-full b-3 border-b-1 border-c3">
        <input
          type="text"
          placeholder="Gift card or discount code"
          className="text-black w-full text-md bg-white p-2 border-[1px] placeholder:text-black/70"
        />

        <button className="h-full p-2 text-sm rounded-full font-bold bg-black/20 font-0bold px-6 uppercase text-black/60">
          Apply
        </button>
      </div>

      <div className="flex flex-col w-full gap-2 ">
        <div className="flex flex-row items-center justify-between w-full pt-3">
          <h2 className="text-lg text-black/60">Subtotal</h2>
          <h2 className="text-base">{"$" + cartTotalPrice}</h2>
        </div>
        <div className="flex flex-row items-center justify-between w-full pt-3">
          <h2 className="text-lg text-black/60">Shipping</h2>
          <h2 className="text-base ">{10}</h2>
        </div>
        <div className="flex flex-row items-center justify-between w-full pt-3">
          <h2 className="text-lg text-black/60">Estimated taxes</h2>
          <h2 className="text-base">{"$" + cartTotalPrice}</h2>
        </div>

        <span className="h-[1px] w-full bg-black/20 my-3" />

        <div className="flex flex-row items-center justify-between w-full  ">
          <h2 className="text-xl text-c1 font-f2">Total</h2>
          <h2 className="text-3xl font-bold ">{"$" + cartTotalPrice}</h2>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

export const OrderSummaryMobile = ({ page }: any) => {
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const { cartTotalPrice, cart, removeItem, updateQuantity } = useCart();

  return (
    <div className="w-full">
      <button
        onClick={() => setShowOrderSummary(!showOrderSummary)}
        className="w-full h-fit p-4 bg-black/5 items-center flex justify-center md:hidden border-[1px] border-black/10"
      >
        <div className="flex w-[90%] justify-between">
          <div className="flex gap-2 items-center">
            <RiShoppingCartLine className="h-6 w-6 fill-black" />
            {showOrderSummary ? "Hide" : "Show"} Order Summary
            <MdOutlineArrowBackIos
              className={`h-3 w-3 fill-black  ${
                showOrderSummary ? "rotate-90" : "-rotate-90"
              }`}
            />
          </div>
          <h1 className="text-xl">{"$" + cartTotalPrice}</h1>
        </div>
      </button>

      <div
        className={`duration-200  w-full overflow-hidden relative ${
          showOrderSummary ? "openOrderSummary" : "closeOrderSummary"
        } `}
      >
        <OrderSummary page={page} />
      </div>
    </div>
  );
};
