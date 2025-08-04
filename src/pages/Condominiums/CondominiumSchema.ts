import z from "zod";

export interface PropertyField {
  label: string;
  optional: string;
  required: boolean;
}

// Property
export const propertyFields: PropertyField[] = [
  {
    label: "Property address",
    required: true,
    optional: "",
  },
  {
    label: "Pet fees",
    optional: "(Optional, add fees if you allow pet)",
    required: false,
  },
  {
    label: "Leasing info",
    required: true,
    optional: "",
  },
  {
    label: "Parking",
    required: false,
    optional: "(optional)",
  },
  {
    label: "Charges",
    required: true,
    optional: "",
  },
  {
    label: "Nearest educational institution",
    required: false,
    optional: "(Optional but recommended)",
  },
  {
    label: "Rent frequency & payment reminder",
    required: true,
    optional: "",
  },
  {
    label: "Nearest stations",
    required: false,
    optional: "(Optional but recommended)",
  },
  {
    label: "Application agreement",
    required: false,
    optional: "(Optional)",
  },
  {
    label: "Nearest landmark",
    required: false,
    optional: "(Optional but recommended)",
  },
  {
    label: "About the property",
    required: false,
    optional: "(Optional)",
  },
  {
    label: "Utilities provider",
    required: false,
    optional: "(Optional but recommended)",
  },
  {
    label: "Community's amenity/features",
    required: false,
    optional: "(Optional but recommended)",
  },
];

// Required fields

// Utility schema
export const utilityFormSchema = z.object({
  utilityType: z.string().min(1, "Utility type is required"),
  providerCompany: z.string().min(1, "Provider company name is required"),
});

// Amenity schema
export const amenityFormSchema = z.object({
  amenities: z.array(z.string()).min(1, "At least one amenity is required"),
  search: z.string().optional(),
});

// Property schema
export const propertyAddressSchema = z.object({
  propertyName: z.string().min(1, "Property name is required"),
  totalUnits: z.string().min(1, "Total units is required"),
  website: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  unitNumber: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
});

// Landmark schema
export const landmarkFormSchema = z.object({
  landmarkType: z.string().min(1, "Landmark type is required"),
  distance: z.string().min(1, "Distance is required"),
  landmarkName: z.string().min(1, "Landmark name is required"),
});

// Station schema
export const stationFormSchema = z.object({
  stationType: z.string().min(1, "Station type is required"),
  distance: z.string().min(1, "Distance is required"),
  stationName: z.string().min(1, "Station name is required"),
});

// Education schema
export const educationFormSchema = z.object({
  institutionType: z.string().min(1, "Institution type is required"),
  distance: z.string().min(1, "Distance is required"),
  institutionName: z.string().min(1, "Institution name is required"),
});

// Parking schema
export const parkingFormSchema = z.object({
  guestParkingTime: z.string().min(1, "Parking time is required"),
  parkingOverview: z.string().min(1, "Parking overview is required"),
});

// Pet Fees schema
export const petFeesFormSchema = z.object({
  petType: z.string().min(1, "Pet type is required"),
  maxWeight: z.string().min(1, "Max weight is required"),
  oneTimeFee: z.string().min(1, "One time fee is required"),
  securityDeposit: z.string().min(1, "Security deposit is required"),
  monthlyRent: z.string().min(1, "Monthly rent is required"),
});

// Application Agreement schema
export const applicationAgreementSchema = z.object({
  agreementFile: z.string().min(1, "Agreement file is required"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});

// Leasing Info schema
export const leasingInfoSchema = z.object({
  managerName: z.string().min(1, "Manager name is required"),
  phoneCode: z.string().min(1, "Phone code is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  contactEmail: z.string().email("Invalid email").min(1, "Email is required"),
  sameAsProperty: z.boolean(),
});

// Charges schema
export const chargesSchema = z.object({
  applicationFee: z.string().min(1, "Application fee is required"),
  adminFee: z.string().min(1, "Admin fee is required"),
});

// Rent Reminder schema
export const rentReminderSchema = z.object({
  paymentFrequency: z.string().min(1, "Payment frequency is required"),
  reminderDate: z.string().min(1, "Reminder date is required"),
  dueDate: z.string().min(1, "Due date is required"),
});
