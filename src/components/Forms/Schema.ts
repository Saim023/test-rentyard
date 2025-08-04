import { z } from "zod";

// Landlord Schema
export const landlordSchema = z.object({
  ownershipDoc: z
    .instanceof(File, { message: "Ownership document is required" })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    }),
});

export type LandlordFormData = z.infer<typeof landlordSchema>;

// Realtor Schema
export const realtorSchema = z.object({
  licenseNumber: z.string().min(1, "License number is required"),
  additionalDocs: z.instanceof(File).optional(),
  agreementWithLandlord: z
    .instanceof(File, {
      message: "Agreement with landlord is required",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    }),
});

export type RealtorFormData = z.infer<typeof realtorSchema>;

// Management Schema
export const managementSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyIdentifier: z.string().min(1, "Company identifier is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  agreement: z
    .instanceof(File, {
      message: "Agreement is required",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    }),
  country: z.string().min(1, "Country is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  aptSuite: z.string().optional(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
});

export type ManagementFormData = z.infer<typeof managementSchema>;

export interface FormProps {
  onValidityChange: (isValid: boolean) => void;
}
