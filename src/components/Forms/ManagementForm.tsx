import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Flag from "react-world-flags";
import {
  type ManagementFormData,
  managementSchema,
  type FormProps,
} from "./Schema";
import { countryDialCodes, statesByCountry } from "./countryDialCodes";

export const ManagementForm = ({ onValidityChange }: FormProps) => {
  const {
    register,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger,
  } = useForm<ManagementFormData>({
    resolver: zodResolver(managementSchema),
    mode: "onChange",
    defaultValues: {
      companyName: "",
      companyIdentifier: "",
      jobTitle: "",
      country: "",
      streetAddress: "",
      aptSuite: "",
      phoneNumber: "+880",
      email: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [countryCode, setCountryCode] = useState("+880");
  const agreement = watch("agreement");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleCountryChange = (value: string) => {
    const country = countryDialCodes.find((c) => c.dialCode === value);
    if (country) {
      setSelectedCountry(country.code);
      setValue("country", country.name, { shouldValidate: true });
    }
    setValue("state", "", { shouldValidate: true });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("agreement", file);
      await trigger("agreement");
    } else {
      setValue("agreement", undefined as unknown as File);
      await trigger("agreement");
    }
  };

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  return (
    <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Company name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Company name*
        </label>
        <Input
          placeholder="Runyan trade center"
          {...register("companyName")}
          className={errors.companyName ? "border-red-500" : ""}
        />
        {errors.companyName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.companyName.message}
          </p>
        )}
      </div>

      {/* Company Identifier */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Company Identifier (EIN/TIN)*
        </label>
        <Input
          placeholder="Company ID"
          {...register("companyIdentifier")}
          className={errors.companyIdentifier ? "border-red-500" : ""}
        />
        {errors.companyIdentifier && (
          <p className="mt-1 text-sm text-red-600">
            {errors.companyIdentifier.message}
          </p>
        )}
      </div>

      {/* Job title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Your job title*
        </label>
        <Input
          placeholder="Manager"
          {...register("jobTitle")}
          className={errors.jobTitle ? "border-red-500" : ""}
        />
        {errors.jobTitle && (
          <p className="mt-1 text-sm text-red-600">{errors.jobTitle.message}</p>
        )}
      </div>

      {/* Agreement */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Agreement with landlord/owner*
        </label>
        <input
          type="file"
          accept=".pdf,application/pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          variant="outline"
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`w-full flex items-center gap-2 ${
            errors.agreement ? "border-red-500" : ""
          }`}
        >
          <FileUploadIcon />
          <span>Upload PDF</span>
          {agreement && (
            <span className="ml-auto truncate max-w-[120px]">
              {agreement.name}
            </span>
          )}
        </Button>
        {errors.agreement && (
          <p className="mt-1 text-sm text-red-600">
            {errors.agreement.message}
          </p>
        )}
      </div>

      {/* Country */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Country/Region*
        </label>
        <Select
          onValueChange={handleCountryChange}
          value={
            countryDialCodes.find((c) => c.code === selectedCountry)
              ?.dialCode || ""
          }
        >
          <SelectTrigger
            className={
              errors.country ? "border-red-500" : "w-full cursor-pointer"
            }
          >
            <SelectValue placeholder="Choose country" />
          </SelectTrigger>
          <SelectContent className="w-[310px] z-50 max-h-[190px] overflow-auto">
            {countryDialCodes.map((country) => (
              <SelectItem
                key={country.dialCode}
                value={country.dialCode}
                className=" cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2 w-full cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Flag
                      code={country.code}
                      style={{ width: 24, height: 16 }}
                    />
                    <span>{country.name}</span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.country && (
          <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
        )}
      </div>

      {/* Street address */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Street address*
        </label>
        <Input
          placeholder="111 Austin Ave"
          {...register("streetAddress")}
          className={errors.streetAddress ? "border-red-500" : ""}
        />
        {errors.streetAddress && (
          <p className="mt-1 text-sm text-red-600">
            {errors.streetAddress.message}
          </p>
        )}
      </div>

      {/* Apt, suit, unit */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Apt, suit, unit (if applicable)
        </label>
        <Input placeholder="3050" {...register("aptSuite")} />
      </div>

      {/* Phone number */}
      <div className="space-y-2 relative">
        <label className="block text-sm font-medium text-gray-700">
          Leasing manager Phone number*
        </label>

        <div
          className={`flex items-center border rounded-md overflow-hidden w-full bg-white h-12 ${
            errors.phoneNumber ? "border-red-500" : "border-gray-300"
          }`}
        >
          <Select
            value={countryCode}
            onValueChange={(value) => {
              setCountryCode(value);
              setValue("phoneNumber", value, { shouldValidate: true });
            }}
          >
            <SelectTrigger className="flex items-center justify-between px-3 w-[80px] h-full text-sm bg-white border-none rounded-none focus:ring-0 focus:outline-none focus-visible:ring-0 cursor-pointer">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="w-[310px] z-50 max-h-[190px] overflow-auto">
              {countryDialCodes.map((country) => (
                <SelectItem
                  key={country.dialCode}
                  value={country.dialCode}
                  className=" cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 w-full cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Flag
                        code={country.code}
                        style={{ width: 24, height: 16 }}
                      />
                      <span>{country.name}</span>
                    </div>
                    <span className="text-gray-500">{country.dialCode}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="h-full w-px bg-gray-200" />

          <Input
            type="tel"
            className="flex-1 border-0 focus-visible:ring-0 px-3 text-sm"
            {...register("phoneNumber")}
          />
        </div>

        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      {/* Contact email */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Contact email*
        </label>
        <Input
          placeholder="example@email.com"
          {...register("email")}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* City/Town */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          City/Town*
        </label>
        <Input
          placeholder="Dallas"
          {...register("city")}
          className={errors.city ? "border-red-500" : ""}
        />
        {errors.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
        )}
      </div>

      {/* State/Territory */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          State/Territory*
        </label>
        <Select
          value={watch("state")}
          onValueChange={(value) =>
            setValue("state", value, { shouldValidate: true })
          }
          disabled={!selectedCountry}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                selectedCountry
                  ? "Choose state/province"
                  : "Select country first"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {selectedCountry ? (
              statesByCountry[selectedCountry]?.length > 0 ? (
                <>
                  {statesByCountry[selectedCountry].map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </>
              ) : (
                <SelectItem value="no-division" disabled>
                  {selectedCountry === "SG"
                    ? "City-state (no divisions)"
                    : selectedCountry === "MC"
                    ? "No regional divisions"
                    : "No states/provinces defined"}
                </SelectItem>
              )
            ) : (
              <SelectItem value="select-country-first" disabled>
                Please select a country first
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        {errors.state && (
          <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
        )}
      </div>

      {/* Zip code */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Zip code*
        </label>
        <Input
          placeholder="75061"
          {...register("zipCode")}
          className={errors.zipCode ? "border-red-500" : ""}
        />
        {errors.zipCode && (
          <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
        )}
      </div>
    </form>
  );
};

const FileUploadIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-400"
  >
    <path
      d="M21 15V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V15M17 9L12 3M12 3L7 9M12 3V15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
