import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  type LandlordFormData,
  landlordSchema,
  type FormProps,
} from "./Schema";

export const LandlordForm = ({ onValidityChange }: FormProps) => {
  const {
    // register,
    // handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<LandlordFormData>({
    resolver: zodResolver(landlordSchema),
    mode: "onChange",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const ownershipDoc = watch("ownershipDoc");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("ownershipDoc", file, { shouldValidate: true });
    }
  };

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  return (
    <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-[16px] font-semibold text-[#272B35] mb-2.5">
          Ownership doc*
        </label>
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <Button
          className="w-full h-[32px] text-gray-600"
          type="button"
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
        >
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 14L3.73384 14.6626C4.644 17.2413 5.09907 18.5307 6.13742 19.2654C7.17576 20 8.54309 20 11.2777 20H13.7222C16.4569 20 17.8242 20 18.8625 19.2654C19.9009 18.5307 20.356 17.2413 21.2661 14.6626L21.5 14"
              stroke="#272B35"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M12.5 4V14M12.5 4C11.7997 4 10.4915 5.9943 10 6.5M12.5 4C13.2002 4 14.5084 5.9943 15 6.5"
              stroke="#272B35"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          (PDF only)
          {ownershipDoc && (
            <p className="ml-1 text-sm text-gray-600 truncate">
              {ownershipDoc.name}
            </p>
          )}
        </Button>
        {errors.ownershipDoc && (
          <p className="mt-1 text-sm text-red-500">
            {errors.ownershipDoc.message}
          </p>
        )}
      </div>
    </form>
  );
};
