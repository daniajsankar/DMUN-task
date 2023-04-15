import React, { useEffect } from "react";
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";

import en from "react-phone-number-input/locale/en.json";
import tr from "react-phone-number-input/locale/tr.json";
import ru from "react-phone-number-input/locale/ru.json";
import de from "react-phone-number-input/locale/de.json";
import fr from "react-phone-number-input/locale/fr.json";
import ar from "./ar.json";

function removeByIndex(str, index) {
  return str.slice(0, index) + str.slice(index + 1);
}

const MobileInput = ({
  value,
  setMobileError,
  inputRef,
  setValue,
  loading,
  mobileError,
  placeholder,
  required,
  setValidity,
  autoFocus,
  onFocus,
  onBlur,
}) => {
  const lang = localStorage.getItem("lang");
  let parsedPhoneNumber;
  useEffect(() => {
    if (value) {
      parsedPhoneNumber = parsePhoneNumber(value);
      if (parsedPhoneNumber)
        if (parsedPhoneNumber.nationalNumber.startsWith("0"))
          setValue(
            removeByIndex(
              value,
              parsedPhoneNumber.countryCallingCode.length + 1
            )
          );
    }
  }, [value]);

  useEffect(() => {
    if (inputRef)
      inputRef.current = document.getElementsByClassName("PhoneInputInput")[0];
  }, []);

  useEffect(() => {
    setMobileError(false);
    if (setValidity && value)
      if (!isPossiblePhoneNumber(value) || !isValidPhoneNumber(value)) {
        setValidity(false);
      } else setValidity(true);
  }, [value]);

  return (
    <PhoneInput
      international
      labels={
        lang === "tr"
          ? tr
          : lang === "ar" || lang === "ku"
            ? ar
            : lang === "ru"
              ? ru
              : lang === "de"
                ? de
                : lang === "fr"
                  ? fr
                  : en
      }
      defaultCountry={"AE"}
      value={value}
      placeholder={placeholder}
      onChange={setValue}
      required={required}
      autoFocus={autoFocus}
      disabled={loading}
      className={`${mobileError ? "mobileError" : ""}`}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default MobileInput;
