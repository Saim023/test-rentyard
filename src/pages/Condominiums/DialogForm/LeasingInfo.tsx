/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import Flag from "react-world-flags";
import { Input } from "../../../components/ui/input";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Button } from "../../../components/ui/button";
import { countryDialCodes } from "../../../components/Forms/countryDialCodes";
import { useState, useEffect } from "react";

interface LeasingInfoProps {
  onSubmitSuccess: (values: z.infer<typeof leasingInfoSchema>) => void;
  onClose: () => void;
  initialValues?: z.infer<typeof leasingInfoSchema>;
}

const leasingInfoSchema = z.object({
  managerName: z.string().min(1, "Manager name is required"),
  phoneCode: z.string().min(1, "Phone code is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  contactEmail: z.string().email("Invalid email").min(1, "Email is required"),
  sameAsProperty: z.boolean(),
});

export const LeasingInfo = ({
  onSubmitSuccess,
  onClose,
  initialValues,
}: LeasingInfoProps) => {
  const defaultCountry = countryDialCodes.find((c) => c.code === "BD");
  const defaultPhoneCode = defaultCountry?.dialCode || "+880";

  const form = useForm<z.infer<typeof leasingInfoSchema>>({
    resolver: zodResolver(leasingInfoSchema),
    defaultValues: initialValues || {
      managerName: "",
      phoneCode: defaultPhoneCode,
      phoneNumber: defaultPhoneCode,
      contactEmail: "",
      sameAsProperty: false,
    },
  });

  const [countryCode, setCountryCode] = useState(defaultPhoneCode);
  const [phoneInputValue, setPhoneInputValue] = useState(defaultPhoneCode);

  useEffect(() => {
    if (initialValues?.phoneNumber) {
      // Extract country code from initial phone number if exists
      const foundCountry = countryDialCodes.find((c) =>
        initialValues.phoneNumber.startsWith(c.dialCode)
      );
      if (foundCountry) {
        setCountryCode(foundCountry.dialCode);
        setPhoneInputValue(initialValues.phoneNumber);
      }
    }
  }, [initialValues]);

  const handleCountryChange = (value: string) => {
    setCountryCode(value);
    form.setValue("phoneCode", value);
    // Update the input field with the new country code
    const phoneNumberWithoutCode = phoneInputValue.replace(/^\+\d+/, "");
    const newPhoneValue = value + phoneNumberWithoutCode;
    setPhoneInputValue(newPhoneValue);
    form.setValue("phoneNumber", newPhoneValue, { shouldValidate: true });
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // If user tries to delete the country code, prevent it
    if (inputValue.length < countryCode.length) {
      return;
    }

    // If user starts typing without country code, add it
    let newValue = inputValue;
    if (!inputValue.startsWith(countryCode)) {
      newValue = countryCode + inputValue.replace(/^\+\d+/, "");
    }

    setPhoneInputValue(newValue);
    form.setValue("phoneNumber", newValue, { shouldValidate: true });
  };

  function onSubmit(values: z.infer<typeof leasingInfoSchema>) {
    onSubmitSuccess(values);
    onClose();
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Leasing manager name */}
          <FormField
            control={form.control}
            name="managerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-a700 mb-2">
                  Leasing manager name*
                </FormLabel>
                <FormControl>
                  <Input placeholder="Alex Johan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Leasing manager Phone number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={() => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  Leasing manager Phone number*
                </FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md overflow-hidden w-full bg-white h-12">
                    <Select
                      value={countryCode}
                      onValueChange={handleCountryChange}
                    >
                      <SelectTrigger className="flex items-center justify-between px-3 w-[80px] h-full text-sm bg-white border-none rounded-none focus:ring-0 focus:outline-none focus-visible:ring-0 cursor-pointer">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="w-[310px] z-50 max-h-[190px] overflow-auto">
                        {countryDialCodes.map((country) => (
                          <SelectItem
                            key={country.dialCode}
                            value={country.dialCode}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center justify-between gap-2 w-full cursor-pointer">
                              <div className="flex items-center gap-2">
                                <Flag
                                  code={country.code}
                                  style={{ width: 24, height: 16 }}
                                />
                                <span>{country.name}</span>
                              </div>
                              <span className="text-gray-500">
                                {country.dialCode}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="h-full w-px bg-gray-200" />
                    <Input
                      type="tel"
                      className="flex-1 border-0 focus-visible:ring-0 px-3 text-sm"
                      value={phoneInputValue}
                      onChange={handlePhoneNumberChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Leasing manager email */}
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  Contact email*
                </FormLabel>
                <FormControl>
                  <Input placeholder="majarul2025@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address same as property */}
          <FormField
            control={form.control}
            name="sameAsProperty"
            render={({ field }) => (
              <FormItem className="mt-8">
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-[#393f4e]" htmlFor="terms">
                    Address(same as property)
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end py-3 border-t border-t-gray-300 mt-4">
          <Button type="submit" variant="add">
            {initialValues ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
