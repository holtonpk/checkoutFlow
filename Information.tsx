import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FaCcPaypal, FaCcApplePay, FaGooglePay } from "react-icons/fa";
import { MdOutlineArrowDropDown, MdOutlineArrowBackIos } from "react-icons/md";
import CheckoutHeader, { CheckoutFooter } from "./CheckoutHeader";
import CheckoutStatus from "./CheckoutStatus";
import OrderSummary, { OrderSummaryMobile } from "./OrderSummary";
import { IoEllipseSharp } from "react-icons/io5";
import { useRouter } from "next/router";
const Information = () => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/checkout/shipping");
  };
  const emailRef = useRef<HTMLInputElement>();
  const [emailError, setEmailError] = useState(false);
  return (
    <div className="flex flex-col md:flex-row justify-between w-screen min-h-screen mt-1 ">
      <div className="flex flex-col w-full h-screen md:w-[60%]">
        <CheckoutStatus page={1} />
        <OrderSummaryMobile page={1} />
        <div className="pt-6 w-[90%] h-screen mx-auto border-c3 flex flex-col items-center gap-3">
          <h1 className="text-lg  w-full items-start">Contact Information</h1>
          <CustomInput
            placeholder="Email*"
            inputRef={emailRef}
            error={emailError}
            type="email"
            color="black"
          />
          <h1 className="text-lg w-full items-start">Shipping address</h1>

          <InformationInput />
          <div className="flex  justify-end w-full mt-3">
            <button
              onClick={handleSubmit}
              className="flex flex-row items-center p-3 rounded-lg w-fit bg-black"
            >
              <h2 className="text-lg text-white font-f2">
                Continue To Shipping
              </h2>
              <MdOutlineArrowBackIos className="w-6 h-6 rotate-180 fill-white" />
            </button>
          </div>
          <CheckoutFooter />
        </div>
      </div>
      <div className="hidden md:block w-[40%]">
        <OrderSummary page="1" />
      </div>
    </div>
  );
};

export default Information;

export const InformationInput = () => {
  const firstNameRef = useRef<HTMLInputElement>();
  const [firstNameError, setFirstNameError] = useState(false);
  const lastNameRef = useRef<HTMLInputElement>();
  const [lastNameError, setLastNameError] = useState(false);
  const addressLine1Ref = useRef<HTMLInputElement>();
  const [addressLine1Error, setAddressLine1Error] = useState(false);
  const addressLine2Ref = useRef<HTMLInputElement>();
  const [addressLine2Error, setAddressLine2Error] = useState(false);
  const cityRef = useRef<HTMLInputElement>();
  const [cityError, setCityError] = useState(false);
  const stateRef = useRef<HTMLSelectElement>();
  const [stateError, setStateError] = useState(false);
  const zipCodeRef = useRef<HTMLInputElement>();
  const [zipCodeError, setZipCodeError] = useState(false);
  const phoneNumberRef = useRef<HTMLInputElement>();
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const handleSubmit = () => {
    const refErrorMapping = [
      { ref: firstNameRef, setError: setFirstNameError },
      { ref: lastNameRef, setError: setLastNameError },
      { ref: addressLine1Ref, setError: setAddressLine1Error },
      { ref: addressLine2Ref, setError: setAddressLine2Error },
      { ref: cityRef, setError: setCityError },
      { ref: stateRef, setError: setStateError },
      { ref: zipCodeRef, setError: setZipCodeError },
      { ref: phoneNumberRef, setError: setPhoneNumberError },
    ];

    let error = false;

    refErrorMapping.forEach(({ ref, setError }) => {
      if (ref.current && ref.current.value === "") {
        setError(true);
        error = true;
      } else {
        setError(false);
      }
    });

    if (!error) {
      console.log("success");
    } else {
      console.log("error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-full gap-3  ">
      <div className="flex w-full gap-4 ">
        <CustomInput
          placeholder="First Name*"
          inputRef={firstNameRef}
          error={firstNameError}
          type="text"
          color="black"
        />
        <CustomInput
          placeholder="Last Name*"
          inputRef={lastNameRef}
          error={lastNameError}
          type="text"
          color="black"
        />
      </div>

      <CustomInput
        placeholder="Address Line 1*"
        inputRef={addressLine1Ref}
        error={addressLine1Error}
        type="text"
        color="black"
      />
      <CustomInput
        placeholder="Address Line 2"
        inputRef={addressLine2Ref}
        error={addressLine2Error}
        type="text"
        color="black"
      />
      <CustomInput
        placeholder="City*"
        inputRef={cityRef}
        error={cityError}
        type="text"
        color="black"
      />

      <div className="flex w-full gap-3">
        <StateSelect inputRef={stateRef} error={stateError} color="black" />
        <CustomInput
          placeholder="Zip Code*"
          inputRef={zipCodeRef}
          error={zipCodeError}
          type="number"
          color="black"
        />
      </div>
      <CustomInput
        placeholder="Phone Number*"
        inputRef={phoneNumberRef}
        error={phoneNumberError}
        type="tel"
        color="black"
      />
    </div>
  );
};

export const CustomInput = ({
  placeholder,
  inputRef,
  type,
  error,
  color,
}: any) => {
  const [focus, setFocus] = useState(false);
  const [empty, setEmpty] = useState(true);
  const onFocus = () => {
    setFocus(true);
  };
  const offFocus = () => {
    if (inputRef.current.value === "") {
      setFocus(false);
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  };

  return (
    <div
      className={`${
        error
          ? "border-red-500"
          : focus && empty
          ? `border-${color}`
          : `border-${color} border-opacity-60 hover:border-${color} hover:border-opacity-75`
      } border-2  relative w-full rounded-full py-2 px-4  bg-white`}
    >
      <div
        className={`${
          error
            ? "text-red-500"
            : focus && empty
            ? `text-${color}`
            : `text-${color} text-opacity-60`
        } ${
          focus ? "top-0 text-sm" : "top-1/2 text-lg"
        }  left-4 h-1 flex items-center  justify-center pointer-events-none  -translate-y-1/2  absolute bg-white w-fit px-3 transition-all duration-200`}
      >
        {placeholder}
      </div>
      <input
        type={type}
        ref={inputRef}
        onFocus={onFocus}
        onBlur={offFocus}
        className={` ${
          error ? "text-red-500" : `text-${color}`
        } text-lg border-transparent  w-full`}
      />
    </div>
  );
};

const StateSelect = ({ inputRef, error, color }: any) => {
  const [focus, setFocus] = useState(false);
  const onFocus = () => {
    setFocus(true);
  };
  const offFocus = () => {
    setFocus(false);
  };

  return (
    <div
      className={`${
        error
          ? "border-red-500"
          : focus
          ? `border-${color}`
          : `border-${color} border-opacity-60 hover:border-${color} hover:border-opacity-75`
      } border-2  relative w-full rounded-full py-2  px-4 cursor-pointer bg-white`}
    >
      <select
        ref={inputRef}
        onFocus={onFocus}
        onBlur={offFocus}
        id="state"
        name="state"
        className={`w-full text-lg cursor-pointer ${
          error
            ? "text-red-500"
            : focus
            ? `text-${color}`
            : `text-${color} text-opacity-60`
        } `}
      >
        <option value="" disabled selected>
          State*
        </option>
        <option value="Alabama">Alabama</option>
        <option value="Alaska">Alaska</option>
        <option value="Arizona">Arizona</option>
        <option value="Arkansas">Arkansas</option>
        <option value="California">California</option>
        <option value="Colorado">Colorado</option>
        <option value="Connecticut">Connecticut</option>
        <option value="Delaware">Delaware</option>
        <option value="District of Columbia">District of Columbia</option>
        <option value="Florida">Florida</option>
        <option value="Georgia">Georgia</option>
        <option value="Hawaii">Hawaii</option>
        <option value="Idaho">Idaho</option>
        <option value="Illinois">Illinois</option>
        <option value="Indiana">Indiana</option>
        <option value="Iowa">Iowa</option>
        <option value="Kansas">Kansas</option>
        <option value="Kentucky">Kentucky</option>
        <option value="Louisiana">Louisiana</option>
        <option value="Maine">Maine</option>
        <option value="Maryland">Maryland</option>
        <option value="Massachusetts">Massachusetts</option>
        <option value="Michigan">Michigan</option>
        <option value="Minnesota">Minnesota</option>
        <option value="Mississippi">Mississippi</option>
        <option value="Missouri">Missouri</option>
        <option value="Montana">Montana</option>
        <option value="Nebraska">Nebraska</option>
        <option value="Nevada">Nevada</option>
        <option value="New Hampshire">New Hampshire</option>
        <option value="New Jersey">New Jersey</option>
        <option value="New Mexico">New Mexico</option>
        <option value="New York">New York</option>
        <option value="North Carolina">North Carolina</option>
        <option value="North Dakota">North Dakota</option>
        <option value="Northern Marianas Islands">
          Northern Marianas Islands
        </option>
        <option value="Ohio">Ohio</option>
        <option value="Oklahoma">Oklahoma</option>
        <option value="Oregon">Oregon</option>
        <option value="Pennsylvania">Pennsylvania</option>
        <option value="Rhode Island">Rhode Island</option>
        <option value="South Carolina">South Carolina</option>
        <option value="South Dakota">South Dakota</option>
        <option value="Tennessee">Tennessee</option>
        <option value="Texas">Texas</option>
        <option value="Utah">Utah</option>
        <option value="Vermont">Vermont</option>
        <option value="Virginia">Virginia</option>
        <option value="Washington">Washington</option>
        <option value="West Virginia">West Virginia</option>
        <option value="Wisconsin">Wisconsin</option>
        <option value="Wyoming">Wyoming</option>
      </select>
    </div>
  );
};
