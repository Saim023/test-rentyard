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
import { Input } from "../../../components/ui/input";
import Flag from "react-world-flags";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Button } from "../../../components/ui/button";

const propertyAddressSchema = z.object({
  propertyName: z.string().min(1, "Property name is required"),
  totalUnits: z.string().min(1, "Total units is required"),
  website: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  unitNumber: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
});

interface PropertyAddressProps {
  onSubmitSuccess: (values: z.infer<typeof propertyAddressSchema>) => void;
  onClose: () => void;
  initialValues?: z.infer<typeof propertyAddressSchema>;
}

export const PropertyAddress = ({
  onSubmitSuccess,
  onClose,
  initialValues,
}: PropertyAddressProps) => {
  const form = useForm<z.infer<typeof propertyAddressSchema>>({
    resolver: zodResolver(propertyAddressSchema),
    defaultValues: initialValues || {
      propertyName: "",
      totalUnits: "",
      website: "",
      country: "",
      streetAddress: "",
      unitNumber: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  function onSubmit(values: z.infer<typeof propertyAddressSchema>) {
    onSubmitSuccess(values);
    onClose();
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Property name as identifier */}
          <FormField
            control={form.control}
            name="propertyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">
                  Property name as identifier*
                </FormLabel>
                <FormControl>
                  <Input placeholder="Dallas apartments complex" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Total apartment unit */}
          <FormField
            control={form.control}
            name="totalUnits"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">Total apartment unit*</FormLabel>
                <FormControl>
                  <Input placeholder="50" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Property website (optional) */}
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">
                  Property website (optional)
                </FormLabel>
                <FormControl>
                  <Input placeholder="https//:" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country/Region */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">Country/Region*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Bangladesh">
                      <Flag code="BD" style={{ width: 24, height: 16 }} />
                      Bangladesh
                    </SelectItem>
                    <SelectItem value="Palestine">
                      <Flag code="PS" style={{ width: 24, height: 16 }} />
                      Palestine
                    </SelectItem>
                    <SelectItem value="Iran">
                      <Flag code="IR" style={{ width: 24, height: 16 }} />
                      Iran
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Street address */}
          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">Street address*</FormLabel>
                <FormControl>
                  <Input placeholder="111 Austin Ave" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Apt, suite, unit (if applicable) */}
          <FormField
            control={form.control}
            name="unitNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">
                  Apt, suite, unit (if applicable)
                </FormLabel>
                <FormControl>
                  <Input placeholder="123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City/Town */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">City/Town*</FormLabel>
                <FormControl>
                  <Input placeholder="Dallas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State/Territory */}
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">State/Territory*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Dhaka">Dhaka</SelectItem>
                    <SelectItem value="Gaza">Gaza</SelectItem>
                    <SelectItem value="Tehran">Tehran</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Zip code */}
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">Zip code*</FormLabel>
                <FormControl>
                  <Input placeholder="75061" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end py-3 border-t border-t-gray-300">
          <Button type="submit" variant="add">
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
};
