import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "../../../components/ui/textarea";
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
const aboutFormSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(1000, {
      message: "Description must not exceed 1000 characters.",
    }),
});

interface AboutProps {
  onSubmitSuccess: (values: z.infer<typeof aboutFormSchema>) => void;
  onClose: () => void;
  initialValues?: z.infer<typeof aboutFormSchema>;
}

export const About = ({ onSubmitSuccess, initialValues }: AboutProps) => {
  const form = useForm<z.infer<typeof aboutFormSchema>>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues: initialValues || {
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof aboutFormSchema>) {
    onSubmitSuccess(values);
    if (!initialValues) {
      form.reset();
    }
  }

  const isEditing = !!initialValues;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-5">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2">Property Description*</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here"
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-3 py-3 border-t border-t-gray-300">
          <Button type="submit" variant="add">
            {isEditing ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
