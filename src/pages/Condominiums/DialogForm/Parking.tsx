import { Select } from "@radix-ui/react-select";
import { Textarea } from "../../../components/ui/textarea";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../../components/ui/form";

// Define the schema for validation
const parkingFormSchema = z.object({
  guestParkingTime: z.string().min(1, "Parking time is required"),
  parkingOverview: z.string().min(1, "Parking overview is required"),
});

interface ParkingProps {
  onSubmitSuccess: (values: z.infer<typeof parkingFormSchema>) => void;
  onClose: () => void;
  onDelete?: () => void;
  initialValues?: z.infer<typeof parkingFormSchema>;
  isEditing?: boolean;
}

export const Parking = ({
  onSubmitSuccess,
  initialValues,
  isEditing = false,
}: ParkingProps) => {
  const form = useForm<z.infer<typeof parkingFormSchema>>({
    resolver: zodResolver(parkingFormSchema),
    defaultValues: initialValues || {
      guestParkingTime: "2H", // Default to 2H to match original
      parkingOverview: "",
    },
  });

  function onSubmit(values: z.infer<typeof parkingFormSchema>) {
    onSubmitSuccess(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Guest vehicle parking time - maintaining original styling */}
            <FormField
              control={form.control}
              name="guestParkingTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm">
                      <div className="flex items-center justify-between">
                        <h1>Guest vehicle parking time</h1>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <span className="">
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="flex items-center justify-between px-2 w-[80px] h-full text-sm bg-white border-2 rounded focus:ring-0 focus:outline-none focus-visible:ring-0">
                                <SelectValue placeholder="2H" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1H">1H</SelectItem>
                                <SelectItem value="2H">2H</SelectItem>
                                <SelectItem value="3H">3H</SelectItem>
                                <SelectItem value="4H">4H</SelectItem>
                              </SelectContent>
                            </Select>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Parking overview - maintaining original styling */}
          <FormField
            control={form.control}
            name="parkingOverview"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="h-[138px]"
                    placeholder="Write parking overview"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Buttons at the bottom */}
          <div className="flex justify-end gap-3 pt-3">
            <Button type="submit" variant="add" className="px-6">
              {isEditing ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
