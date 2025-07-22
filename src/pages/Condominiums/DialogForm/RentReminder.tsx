import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

interface RentReminderProps {
  onSubmitSuccess: (values: z.infer<typeof rentReminderSchema>) => void;
  onClose: () => void;
  initialValues?: z.infer<typeof rentReminderSchema>;
}

// Rent Reminder schema
const rentReminderSchema = z.object({
  paymentFrequency: z.string().min(1, "Payment frequency is required"),
  reminderDate: z.string().min(1, "Reminder date is required"),
  dueDate: z.string().min(1, "Due date is required"),
});

export const RentReminder = ({
  onSubmitSuccess,
  onClose,
  initialValues,
}: RentReminderProps) => {
  const form = useForm<z.infer<typeof rentReminderSchema>>({
    resolver: zodResolver(rentReminderSchema),
    defaultValues: initialValues || {
      paymentFrequency: "",
      reminderDate: "",
      dueDate: "",
    },
  });

  function onSubmit(values: z.infer<typeof rentReminderSchema>) {
    onSubmitSuccess(values);
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Rent payment frequency */}
          <FormField
            control={form.control}
            name="paymentFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  Rent payment frequency*
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Rent Reminder/Statement date */}
          <FormField
            control={form.control}
            name="reminderDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  Rent Reminder/Statement date*
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder="25th Every month"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Rent due date */}
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  Rent due date*
                </FormLabel>
                <FormControl>
                  <Input type="date" placeholder="5th Every month" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <Button type="submit" variant="add" className="px-6">
            {initialValues ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
