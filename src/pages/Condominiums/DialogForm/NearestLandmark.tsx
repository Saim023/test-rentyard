import { Select } from "@radix-ui/react-select";
import {
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

// Define the schema for validation
const landmarkFormSchema = z.object({
  landmarkType: z.string().min(1, "Landmark type is required"),
  distance: z.string().min(1, "Distance is required"),
  landmarkName: z.string().min(1, "Landmark name is required"),
});

interface NearestLandmarkProps {
  onSubmitSuccess: (values: z.infer<typeof landmarkFormSchema>) => void;
  onClose: () => void;
  onDelete?: () => void;
  initialValues?: z.infer<typeof landmarkFormSchema>;
  isEditing?: boolean;
}

export const NearestLandmark = ({
  onSubmitSuccess,
  initialValues,
  isEditing = false,
}: NearestLandmarkProps) => {
  const form = useForm<z.infer<typeof landmarkFormSchema>>({
    resolver: zodResolver(landmarkFormSchema),
    defaultValues: initialValues || {
      landmarkType: "",
      distance: "",
      landmarkName: "",
    },
  });

  function onSubmit(values: z.infer<typeof landmarkFormSchema>) {
    onSubmitSuccess(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Landmark type */}
            <FormField
              control={form.control}
              name="landmarkType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                    Landmark type*
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Museum" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Distance from property */}
            <FormField
              control={form.control}
              name="distance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm text-gray-700 mb-2">
                    Distance from property*
                  </FormLabel>
                  <FormControl>
                    <div className="w-full border border-gray-300 rounded-md text-sm">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="relative flex justify-between items-center px-3 w-full h-10 text-sm border-none bg-white shadow-sm rounded-md appearance-none">
                          <SelectValue placeholder="Select distance" />
                          <span className="absolute right-3 text-gray-500 text-sm ml-2 flex items-center gap-1 pointer-events-none">
                            Mile
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </span>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1.3">1.3</SelectItem>
                          <SelectItem value="1.5">1.5</SelectItem>
                          <SelectItem value="1.6">1.6</SelectItem>
                          <SelectItem value="1.7">1.7</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="landmarkName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  Landmark name*
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
