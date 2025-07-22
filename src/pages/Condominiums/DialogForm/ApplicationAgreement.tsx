import { Button } from "../../../components/ui/button";
import { useRef, useState } from "react";
import { Checkbox } from "../../../components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

interface ApplicationAgreementProps {
  onSubmitSuccess: (values: z.infer<typeof applicationAgreementSchema>) => void;
  onClose: () => void;
  onDelete?: () => void;
  initialValues?: z.infer<typeof applicationAgreementSchema>;
  isEditing?: boolean;
}

// Application Agreement schema
const applicationAgreementSchema = z.object({
  agreementFile: z.string().min(1, "Agreement file is required"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});

export const ApplicationAgreement = ({
  onSubmitSuccess,
  initialValues,
  isEditing = false,
}: ApplicationAgreementProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState(initialValues?.agreementFile || "");

  const form = useForm<z.infer<typeof applicationAgreementSchema>>({
    resolver: zodResolver(applicationAgreementSchema),
    defaultValues: initialValues || {
      agreementFile: "",
      acceptTerms: false,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      form.setValue("agreementFile", file.name);
    }
  };

  function onSubmit(values: z.infer<typeof applicationAgreementSchema>) {
    onSubmitSuccess(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {/* Upload agreement */}
          <FormField
            control={form.control}
            name="agreementFile"
            render={() => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  Upload agreement
                </FormLabel>
                <FormControl>
                  <>
                    <input
                      type="file"
                      accept="application/pdf"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button
                      className="w-full h-[32px] text-gray-600"
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                    >
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.5 14L3.73384 14.6626C4.644 17.2413 5.09907 18.5307 6.13742 19.2654C7.17576 20 8.54309 20 11.2777 20H13.7222C16.4569 20 17.8242 20 18.8625 19.2654C19.9009 18.5307 20.356 17.2413 21.2661 14.6626L21.5 14"
                          stroke="#272B35"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12.5 4V14M12.5 4C11.7997 4 10.4915 5.9943 10 6.5M12.5 4C13.2002 4 14.5084 5.9943 15 6.5"
                          stroke="#272B35"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      (PDF only)
                      {fileName && (
                        <p className="ml-1 text-sm text-gray-600 truncate">
                          {fileName}
                        </p>
                      )}
                    </Button>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 my-5">
              <FormControl>
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-[#393f4e]">
                Accept immigrant & international student application
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-3">
          <Button type="submit" variant="add" className="px-6">
            {isEditing ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
