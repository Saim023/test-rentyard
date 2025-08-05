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
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

// Form schema
const utilityFormSchema = z.object({
  utilityType: z.string().min(1, "Utility type is required"),
  providerCompany: z.string().min(1, "Provider company name is required"),
});

interface UtilityProps {
  onSubmitSuccess: (values: z.infer<typeof utilityFormSchema>) => void;
  onClose: () => void;
  initialValues?: z.infer<typeof utilityFormSchema>;
}

export function Utility({ onSubmitSuccess, initialValues }: UtilityProps) {
  const form = useForm<z.infer<typeof utilityFormSchema>>({
    resolver: zodResolver(utilityFormSchema),
    defaultValues: initialValues || {
      utilityType: "",
      providerCompany: "",
    },
  });

  function onSubmit(values: z.infer<typeof utilityFormSchema>) {
    onSubmitSuccess(values);
    if (!initialValues) {
      form.reset();
    }
  }

  const isEditing = !!initialValues;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 px-5 h-[400px] md:h-[auto] overflow-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="utilityType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">Utility type*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Internet-Utilities company">
                      Internet-Utilities company
                    </SelectItem>
                    <SelectItem value="Cable-Utilities company">
                      Cable-Utilities company
                    </SelectItem>
                    <SelectItem value="Electricity-Utilities company">
                      Electricity-Utilities company
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="providerCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">Provider company name*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end gap-3 py-3 border-t border-t-gray-300">
          <Button type="submit" variant="add">
            {isEditing ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
