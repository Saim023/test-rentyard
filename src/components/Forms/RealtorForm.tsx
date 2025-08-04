import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { type RealtorFormData, realtorSchema, type FormProps } from "./Schema";

export const RealtorForm = ({ onValidityChange }: FormProps) => {
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useForm<RealtorFormData>({
    resolver: zodResolver(realtorSchema),
    mode: "onChange",
    defaultValues: {
      licenseNumber: "",
      additionalDocs: undefined,
      agreementWithLandlord: undefined,
    },
  });

  const additionalDocsRef = useRef<HTMLInputElement>(null);
  const agreementRef = useRef<HTMLInputElement>(null);

  const additionalDocs = watch("additionalDocs");
  const agreementWithLandlord = watch("agreementWithLandlord");

  const handleFileChange = async (
    field: "additionalDocs" | "agreementWithLandlord",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(field, file, { shouldValidate: true });
      await trigger(field);
    } else {
      setValue(field, undefined, { shouldValidate: true });
    }
  };

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  return (
    <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* License Number Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          License number*
        </label>
        <Input
          placeholder="Enter license number"
          {...register("licenseNumber")}
          className={errors.licenseNumber ? "border-red-500" : ""}
          disabled={isSubmitting}
        />
        {errors.licenseNumber && (
          <p className="mt-1 text-sm text-red-600">
            {errors.licenseNumber.message}
          </p>
        )}
      </div>

      {/* Additional Documents Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Additional documents (optional)
        </label>
        <input
          type="file"
          accept=".pdf,application/pdf"
          ref={additionalDocsRef}
          onChange={(e) => handleFileChange("additionalDocs", e)}
          className="hidden"
          disabled={isSubmitting}
        />
        <Button
          variant="outline"
          type="button"
          onClick={() => additionalDocsRef.current?.click()}
          className="w-full flex items-center gap-2"
          disabled={isSubmitting}
        >
          <FileUploadIcon />
          <span>Upload PDF</span>
          {additionalDocs && (
            <span className="ml-auto truncate max-w-[120px]">
              {additionalDocs.name}
            </span>
          )}
        </Button>
      </div>

      {/* Agreement with Landlord Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Agreement with landlord*
        </label>
        <input
          type="file"
          accept=".pdf,application/pdf"
          ref={agreementRef}
          onChange={(e) => handleFileChange("agreementWithLandlord", e)}
          className="hidden"
          disabled={isSubmitting}
        />
        <Button
          variant="outline"
          type="button"
          onClick={() => agreementRef.current?.click()}
          className={`w-full flex items-center gap-2 ${
            errors.agreementWithLandlord ? "border-red-500" : ""
          }`}
          disabled={isSubmitting}
        >
          <FileUploadIcon />
          <span>Upload PDF</span>
          {agreementWithLandlord && (
            <span className="ml-auto truncate max-w-[120px]">
              {agreementWithLandlord.name}
            </span>
          )}
        </Button>
        {errors.agreementWithLandlord && (
          <p className="mt-1 text-sm text-red-600">
            {errors.agreementWithLandlord.message}
          </p>
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
