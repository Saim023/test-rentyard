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

// Pet Fees schema
const petFeesFormSchema = z.object({
  petType: z.string().min(1, "Pet type is required"),
  maxWeight: z.string().min(1, "Max weight is required"),
  oneTimeFee: z.string().min(1, "One time fee is required"),
  securityDeposit: z.string().min(1, "Security deposit is required"),
  monthlyRent: z.string().min(1, "Monthly rent is required"),
});

interface PetFeesProps {
  onSubmitSuccess: (values: z.infer<typeof petFeesFormSchema>) => void;
  onClose: () => void;
  onDelete?: () => void;
  initialValues?: z.infer<typeof petFeesFormSchema>;
  isEditing?: boolean;
}

export const PetFees = ({
  onSubmitSuccess,
  initialValues,
  isEditing = false,
}: PetFeesProps) => {
  const form = useForm<z.infer<typeof petFeesFormSchema>>({
    resolver: zodResolver(petFeesFormSchema),
    defaultValues: initialValues || {
      petType: "",
      maxWeight: "",
      oneTimeFee: "",
      securityDeposit: "",
      monthlyRent: "",
    },
  });

  function onSubmit(values: z.infer<typeof petFeesFormSchema>) {
    onSubmitSuccess(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-5">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pet type */}
            <FormField
              control={form.control}
              name="petType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                    Pet type*
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dog">Dog</SelectItem>
                        <SelectItem value="Cat">Cat</SelectItem>
                        <SelectItem value="Rabbit">Rabbit</SelectItem>
                        <SelectItem value="Bird">Bird</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Max weight(LB) */}
            <FormField
              control={form.control}
              name="maxWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                    Max weight(LB)*
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {/* One time pet fee */}
            <FormField
              control={form.control}
              name="oneTimeFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                    One time pet fee*
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="$100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pet Security Deposit */}
            <FormField
              control={form.control}
              name="securityDeposit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                    Pet Security Deposit*
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="$100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Monthly pet rent */}
            <FormField
              control={form.control}
              name="monthlyRent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly pet rent*
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="$100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button type="submit" variant="add" className="px-6">
              {isEditing ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
