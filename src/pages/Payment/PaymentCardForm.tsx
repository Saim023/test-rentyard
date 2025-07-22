import { Input } from "../../components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

interface PaymentCardProps {
  onSubmitSuccess: (values: z.infer<typeof paymentCardSchema>) => void;
  onClose: () => void;
  initialValues?: z.infer<typeof paymentCardSchema>;
}

const paymentCardSchema = z.object({
  cardHolder: z.string().min(1, "Card holder name is required"),
  cardNumber: z.string().min(1, "Card number is required"),
  expireDate: z.string().min(1, "Expire date is required"),
  cvc: z.string().min(1, "CVC is required"),
});

export const PaymentCardForm = ({
  onSubmitSuccess,
  onClose,
  initialValues,
}: PaymentCardProps) => {
  const form = useForm<z.infer<typeof paymentCardSchema>>({
    resolver: zodResolver(paymentCardSchema),
    defaultValues: initialValues || {
      cardHolder: "",
      cardNumber: "",
      expireDate: "",
      cvc: "",
    },
  });

  function onSubmit(values: z.infer<typeof paymentCardSchema>) {
    onSubmitSuccess(values);
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name on card */}
          <FormField
            control={form.control}
            name="cardHolder"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  Name on card
                </FormLabel>
                <FormControl>
                  <Input placeholder="Alex jones" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Card number */}
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  Card number
                </FormLabel>
                <FormControl>
                  <Input placeholder="0000  0000  0000  0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Expire date */}
          <FormField
            control={form.control}
            name="expireDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  Expire date
                </FormLabel>
                <FormControl>
                  <Input placeholder="MM/YY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CVC*/}
          <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  CVC
                </FormLabel>
                <FormControl>
                  <Input placeholder="123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <Button type="submit" variant="add" className="px-6">
            {initialValues ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
