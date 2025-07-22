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

interface ChargesProps {
  onSubmitSuccess: (values: z.infer<typeof chargesSchema>) => void;
  onClose: () => void;
  initialValues?: z.infer<typeof chargesSchema>;
}

// Charges schema
const chargesSchema = z.object({
  applicationFee: z.string().min(1, "Application fee is required"),
  adminFee: z.string().min(1, "Admin fee is required"),
});

export const Charges = ({
  onSubmitSuccess,
  onClose,
  initialValues,
}: ChargesProps) => {
  const form = useForm<z.infer<typeof chargesSchema>>({
    resolver: zodResolver(chargesSchema),
    defaultValues: initialValues || {
      applicationFee: "",
      adminFee: "",
    },
  });

  function onSubmit(values: z.infer<typeof chargesSchema>) {
    onSubmitSuccess(values);
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Application fee(one-time) */}
          <FormField
            control={form.control}
            name="applicationFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  Application fee(one-time)*
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select fee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">$100</SelectItem>
                      <SelectItem value="150">$150</SelectItem>
                      <SelectItem value="200">$200</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Admin fee(one-time) */}
          <FormField
            control={form.control}
            name="adminFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  Admin fee(one-time)*
                </FormLabel>
                <FormControl>
                  <Input placeholder="15" {...field} />
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
