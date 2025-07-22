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

interface LeasingInfoProps {
  onSubmitSuccess: (values: z.infer<typeof leasingInfoSchema>) => void;
  onClose: () => void;
  initialValues?: z.infer<typeof leasingInfoSchema>;
}

// Leasing Info schema
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
  const form = useForm<z.infer<typeof leasingInfoSchema>>({
    resolver: zodResolver(leasingInfoSchema),
    defaultValues: initialValues || {
      managerName: "",
      phoneCode: "+880",
      phoneNumber: "",
      contactEmail: "",
      sameAsProperty: false,
    },
  });

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
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  Leasing manager Phone number*
                </FormLabel>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-full bg-white h-8">
                  <FormField
                    control={form.control}
                    name="phoneCode"
                    render={({ field }) => (
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="flex items-center justify-between px-2 w-[90px] h-full text-sm bg-white border-none rounded-none focus:ring-0 focus:outline-none focus-visible:ring-0">
                            <SelectValue placeholder="Code" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+880">
                              <div className="flex items-center gap-2">
                                <Flag
                                  code="BD"
                                  style={{ width: 24, height: 16 }}
                                />
                              </div>
                            </SelectItem>
                            <SelectItem value="+970">
                              <div className="flex items-center gap-2">
                                <Flag
                                  code="PS"
                                  style={{ width: 24, height: 16 }}
                                />
                              </div>
                            </SelectItem>
                            <SelectItem value="+98">
                              <div className="flex items-center gap-2">
                                <Flag
                                  code="IR"
                                  style={{ width: 24, height: 16 }}
                                />
                              </div>
                            </SelectItem>
                            <SelectItem value="+964">
                              <div className="flex items-center gap-2">
                                <Flag
                                  code="IQ"
                                  style={{ width: 24, height: 16 }}
                                />
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />

                  {/* Divider */}
                  <div className="h-8 w-px bg-gray-300" />

                  {/* Phone Number Input */}
                  <FormControl>
                    <input
                      type="tel"
                      placeholder={form.watch("phoneCode")}
                      className="flex-1 px-3 text-sm h-full bg-white focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                </div>
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
