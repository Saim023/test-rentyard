/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from "react";
import { Plus, Upload } from "lucide-react";
import { FaRegTrashCan } from "react-icons/fa6";
import { TbEdit, TbXboxXFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { PropertyAddress } from "./DialogForm/PropertyAddress";
import { LeasingInfo } from "./DialogForm/LeasingInfo";
import { Charges } from "./DialogForm/Charges";
import { RentReminder } from "./DialogForm/RentReminder";
import { ApplicationAgreement } from "./DialogForm/ApplicationAgreement";
import { Amenity } from "./DialogForm/Amenity";
import { PetFees } from "./DialogForm/PetFees";
import { Parking } from "./DialogForm/Parking";
import { NearestEducation } from "./DialogForm/NearestEducation";
import { NearestStation } from "./DialogForm/NearestStation";
import { NearestLandmark } from "./DialogForm/NearestLandmark";
import { Utility } from "./DialogForm/Utility";
import { z } from "zod";
import { About } from "./DialogForm/About";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

interface PropertyField {
  label: string;
  required: boolean;
}

const propertyFields: PropertyField[] = [
  { label: "Property address", required: true },
  { label: "Pet fees (Optional, add fees if you allow pet)", required: false },
  { label: "Leasing info", required: true },
  { label: "Parking (optional)", required: false },
  { label: "Charges", required: true },
  {
    label: "Nearest educational institution (Optional but recommended)",
    required: false,
  },
  { label: "Rent frequency & payment reminder", required: true },
  { label: "Nearest stations (Optional but recommended)", required: false },
  { label: "Application agreement (Optional)", required: false },
  { label: "Nearest landmark (Optional but recommended)", required: false },
  { label: "About the property (Optional)", required: false },
  { label: "Utilities provider (Optional but recommended)", required: false },
  {
    label: "Community's amenity/features (Optional but recommended)",
    required: false,
  },
];

// Utility schema
const utilityFormSchema = z.object({
  utilityType: z.string().min(1, "Utility type is required"),
  providerCompany: z.string().min(1, "Provider company name is required"),
});

// Amenity schema
const amenityFormSchema = z.object({
  amenities: z.array(z.string()).min(1, "At least one amenity is required"),
  search: z.string().optional(),
});

// Property schema
const propertyAddressSchema = z.object({
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
const landmarkFormSchema = z.object({
  landmarkType: z.string().min(1, "Landmark type is required"),
  distance: z.string().min(1, "Distance is required"),
  landmarkName: z.string().min(1, "Landmark name is required"),
});

// Station schema
const stationFormSchema = z.object({
  stationType: z.string().min(1, "Station type is required"),
  distance: z.string().min(1, "Distance is required"),
  stationName: z.string().min(1, "Station name is required"),
});

// Education schema
const educationFormSchema = z.object({
  institutionType: z.string().min(1, "Institution type is required"),
  distance: z.string().min(1, "Distance is required"),
  institutionName: z.string().min(1, "Institution name is required"),
});

// Parking schema
const parkingFormSchema = z.object({
  guestParkingTime: z.string().min(1, "Parking time is required"),
  parkingOverview: z.string().min(1, "Parking overview is required"),
});

// Pet Fees schema
const petFeesFormSchema = z.object({
  petType: z.string().min(1, "Pet type is required"),
  maxWeight: z.string().min(1, "Max weight is required"),
  oneTimeFee: z.string().min(1, "One time fee is required"),
  securityDeposit: z.string().min(1, "Security deposit is required"),
  monthlyRent: z.string().min(1, "Monthly rent is required"),
});

// Application Agreement schema
const applicationAgreementSchema = z.object({
  agreementFile: z.string().min(1, "Agreement file is required"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});

// Leasing Info schema
const leasingInfoSchema = z.object({
  managerName: z.string().min(1, "Manager name is required"),
  phoneCode: z.string().min(1, "Phone code is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  contactEmail: z.string().email("Invalid email").min(1, "Email is required"),
  sameAsProperty: z.boolean(),
});

// Charges schema
const chargesSchema = z.object({
  applicationFee: z.string().min(1, "Application fee is required"),
  adminFee: z.string().min(1, "Admin fee is required"),
});

// Rent Reminder schema
const rentReminderSchema = z.object({
  paymentFrequency: z.string().min(1, "Payment frequency is required"),
  reminderDate: z.string().min(1, "Reminder date is required"),
  dueDate: z.string().min(1, "Due date is required"),
});

export default function PropertyForm() {
  const [leasingInfo, setLeasingInfo] = useState<z.infer<
    typeof leasingInfoSchema
  > | null>(null);
  const [charges, setCharges] = useState<z.infer<typeof chargesSchema> | null>(
    null
  );
  const [rentReminder, setRentReminder] = useState<z.infer<
    typeof rentReminderSchema
  > | null>(null);
  const [activeFieldIndex, setActiveFieldIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [utilities, setUtilities] = useState<
    z.infer<typeof utilityFormSchema>[]
  >([]);
  const [amenitiesList, setAmenitiesList] = useState<string[]>([]);
  const [landmarks, setLandmarks] = useState<
    z.infer<typeof landmarkFormSchema>[]
  >([]);
  const [editingLandmarkIndex, setEditingLandmarkIndex] = useState<
    number | null
  >(null);
  const [stations, setStations] = useState<z.infer<typeof stationFormSchema>[]>(
    []
  );
  const [editingStationIndex, setEditingStationIndex] = useState<number | null>(
    null
  );
  const [educationalInstitutions, setEducationalInstitutions] = useState<
    z.infer<typeof educationFormSchema>[]
  >([]);
  const [editingEducationIndex, setEditingEducationIndex] = useState<
    number | null
  >(null);
  const [parkingInfo, setParkingInfo] = useState<z.infer<
    typeof parkingFormSchema
  > | null>(null);

  const handleRemoveAmenity = (indexToRemove: number) => {
    setAmenitiesList((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const [propertyAddress, setPropertyAddress] = useState<z.infer<
    typeof propertyAddressSchema
  > | null>(null);

  const [editingUtilityIndex, setEditingUtilityIndex] = useState<number | null>(
    null
  );

  const [aboutDescription, setAboutDescription] = useState<{
    description: string;
  } | null>(null);

  const [petFees, setPetFees] = useState<z.infer<typeof petFeesFormSchema>[]>(
    []
  );
  const [editingPetFeeIndex, setEditingPetFeeIndex] = useState<number | null>(
    null
  );

  const [applicationAgreements, setApplicationAgreements] = useState<
    z.infer<typeof applicationAgreementSchema>[]
  >([]);
  const [editingAgreementIndex, setEditingAgreementIndex] = useState<
    number | null
  >(null);

  // Video upload ref
  const propertyVideoRef = useRef<HTMLInputElement>(null);
  const virtualTourRef = useRef<HTMLInputElement>(null);
  const arialVideoRef = useRef<HTMLInputElement>(null);

  const [propertyVideo, setPropertyVideo] = useState<File | null>(null);
  const [virtualTour, setVirtualTour] = useState<File | null>(null);
  const [arialVideo, setArialVideo] = useState<File | null>(null);

  const handlePropertyVideoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setPropertyVideo(file);
    }
  };

  const handleVirtualTourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVirtualTour(file);
    }
  };

  const handleArialVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArialVideo(file);
    }
  };

  // Handlers
  const handleAmenitiesSubmit = (values: z.infer<typeof amenityFormSchema>) => {
    setAmenitiesList(values.amenities);
    setIsDialogOpen(false);
  };

  const handlePropertyAddressSubmit = (
    values: z.infer<typeof propertyAddressSchema>
  ) => {
    setPropertyAddress(values);
    setIsDialogOpen(false);
  };

  const coverPhotoRef = useRef<HTMLInputElement>(null);
  const featuredPhotoRefs = useRef<(HTMLInputElement | null)[]>([]);
  const morePhotoRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleRemoveUtility = (index: number) => {
    setUtilities(utilities.filter((_, i) => i !== index));
  };

  const handleSingleUploadClick = () => {
    coverPhotoRef.current?.click();
  };

  const handleMultiUploadClick = (
    index: number,
    refs: React.MutableRefObject<(HTMLInputElement | null)[]>
  ) => {
    refs.current[index]?.click();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
    index?: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(
        `Uploaded [${type}] ${
          index !== undefined ? `(Slot ${index + 1})` : ""
        }:`,
        file
      );
    }
  };

  // Split propertyFields into two arrays
  const firstColumnFields = propertyFields.slice(
    0,
    Math.ceil(propertyFields.length / 2)
  );
  const secondColumnFields = propertyFields.slice(
    Math.ceil(propertyFields.length / 2)
  );

  return (
    <div className="pb-20">
      <div className="max-w-screen-xl mx-auto pb-5">
        <h1 className="my-3 font-semibold">Condominiums information</h1>
        <div className="flex gap-4 py-2">
          {/* First column */}
          <div className="w-1/2 flex flex-col gap-4">
            {firstColumnFields.map((field, index) => (
              <div key={index}>
                <div className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm">
                  <div className="flex items-center justify-between">
                    <h1 className="py-1.5">
                      {field.label}
                      {field.required && (
                        <span className="text-red-500">(Required)</span>
                      )}
                    </h1>
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => {
                        setActiveFieldIndex(index);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4 text-blue-700" />
                      <span className="text-blue-700 border-b-[1px] border-[#9db4e9]">
                        Add
                      </span>
                    </div>
                  </div>

                  {/* Property Address data (index 0) */}
                  {index === 0 && (
                    <div>
                      {propertyAddress && (
                        <div className="pt-3 pb-1 border-t border-t-gray-300 rounded">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-500 pr-1">
                                {propertyAddress.propertyName},{" "}
                                {propertyAddress.totalUnits},{" "}
                                {propertyAddress.website},{" "}
                                {propertyAddress.country},{" "}
                                {propertyAddress.streetAddress},{" "}
                                {propertyAddress.unitNumber},{" "}
                                {propertyAddress.city}, {propertyAddress.state},{" "}
                                {propertyAddress.zipCode}
                              </p>
                            </div>
                            <div className="group">
                              <button
                                onClick={() => {
                                  setActiveFieldIndex(index);
                                  setIsDialogOpen(true);
                                }}
                                className="cursor-pointer flex items-center gap-1"
                              >
                                <TbEdit className="text-xl text-blue-600 group-hover:text-blue-500" />
                                <span className=" text-blue-600 group-hover:text-blue-500 border-b font-semibold border-b-blue-700 hover:border-b-blue-500">
                                  Edit
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Pet Fees data (index 1) */}
                  {index === 1 && petFees.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {petFees.map((fee, feeIndex) => (
                        <div
                          key={feeIndex}
                          className="pt-3 pb-1 border-t border-t-gray-300 rounded"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm">
                                {fee.petType} (Max {fee.maxWeight} lbs) - One
                                Time: ${fee.oneTimeFee}, Deposit: $
                                {fee.securityDeposit}, Monthly: $
                                {fee.monthlyRent}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setActiveFieldIndex(1);
                                  setEditingPetFeeIndex(feeIndex);
                                  setIsDialogOpen(true);
                                }}
                                className="cursor-pointer"
                              >
                                <TbEdit className="text-xl text-gray-800 hover:text-gray-600" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPetFees(
                                    petFees.filter((_, i) => i !== feeIndex)
                                  );
                                }}
                                className="cursor-pointer"
                              >
                                <FaRegTrashCan className="text-lg text-red-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Leasing Info data (index 2) */}
                  {index === 2 && leasingInfo && (
                    <div className="mt-2 space-y-2">
                      <div className="pt-3 pb-1 border-t border-t-gray-300 rounded">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">
                              Leasing Manager: {leasingInfo.managerName} <br />
                              Phone: {leasingInfo.phoneCode}
                              {leasingInfo.phoneNumber}
                            </p>
                            <p className="text-sm">
                              Email: {leasingInfo.contactEmail}
                            </p>
                            {leasingInfo.sameAsProperty && (
                              <p className="text-sm text-gray-500">
                                Address same as property
                              </p>
                            )}
                          </div>
                          <div className="group">
                            <button
                              onClick={() => {
                                setActiveFieldIndex(index);
                                setIsDialogOpen(true);
                              }}
                              className="cursor-pointer flex items-center gap-1"
                            >
                              <TbEdit className="text-xl text-blue-600 group-hover:text-blue-500" />
                              <span className=" text-blue-600 group-hover:text-blue-500 border-b font-semibold border-b-blue-700 hover:border-b-blue-500">
                                Edit
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Parking data (index 3) */}
                  {index === 3 && parkingInfo && (
                    <div className="mt-2 space-y-2">
                      <div className="pt-3 pb-1 border-t border-t-gray-300 rounded">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">
                              Guest parking: {parkingInfo.guestParkingTime}
                            </p>
                            <p className="text-sm mt-1 line-clamp-2">
                              {parkingInfo.parkingOverview}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setActiveFieldIndex(3);
                                setIsDialogOpen(true);
                              }}
                              className="cursor-pointer"
                            >
                              <TbEdit className="text-xl text-gray-800 hover:text-gray-600" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setParkingInfo(null);
                              }}
                              className="cursor-pointer"
                            >
                              <FaRegTrashCan className="text-lg text-red-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Charges data (index 4) */}
                  {index === 4 && charges && (
                    <div className="mt-2 space-y-2">
                      <div className="pt-3 pb-1 border-t border-t-gray-300 rounded">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">
                              Application Fee: ${charges.applicationFee}, Admin
                              Fee: ${charges.adminFee}
                            </p>
                          </div>
                          <div className="group">
                            <button
                              onClick={() => {
                                setActiveFieldIndex(index);
                                setIsDialogOpen(true);
                              }}
                              className="cursor-pointer flex items-center gap-1"
                            >
                              <TbEdit className="text-xl text-blue-600 group-hover:text-blue-500" />
                              <span className=" text-blue-600 group-hover:text-blue-500 border-b font-semibold border-b-blue-700 hover:border-b-blue-500">
                                Edit
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Nearest Education data (originalIndex 5) */}
                  {index === 5 && educationalInstitutions.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {educationalInstitutions.map(
                        (institution, institutionIndex) => (
                          <div
                            key={institutionIndex}
                            className="pt-3 pb-1 border-t border-t-gray-300 rounded"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm">
                                  {institution.institutionName} (
                                  {institution.institutionType}) -{" "}
                                  {institution.distance} mile
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setActiveFieldIndex(5);
                                    setEditingEducationIndex(institutionIndex);
                                    setIsDialogOpen(true);
                                  }}
                                  className="cursor-pointer"
                                >
                                  <TbEdit className="text-xl text-gray-800 hover:text-gray-600" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEducationalInstitutions(
                                      educationalInstitutions.filter(
                                        (_, i) => i !== institutionIndex
                                      )
                                    );
                                  }}
                                  className="cursor-pointer"
                                >
                                  <FaRegTrashCan className="text-lg text-red-400" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Rent Reminder data (index 6) */}
                  {index === 6 && rentReminder && (
                    <div className="mt-2 space-y-2">
                      <div className="pt-3 pb-1 border-t border-t-gray-300 rounded">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">
                              Rent payment frequency:{" "}
                              {rentReminder.paymentFrequency}, {""}
                              Rent frequency reminder:{" "}
                              {rentReminder.reminderDate}, <br /> Due:{" "}
                              {rentReminder.dueDate}
                            </p>
                          </div>
                          <div className="group">
                            <button
                              onClick={() => {
                                setActiveFieldIndex(index);
                                setIsDialogOpen(true);
                              }}
                              className="cursor-pointer flex items-center gap-1"
                            >
                              <TbEdit className="text-xl text-blue-600 group-hover:text-blue-500" />
                              <span className=" text-blue-600 group-hover:text-blue-500 border-b font-semibold border-b-blue-700 hover:border-b-blue-500">
                                Edit
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Second column */}
          <div className="w-1/2 flex flex-col gap-4">
            {secondColumnFields.map((field, index) => {
              const originalIndex = index + firstColumnFields.length;
              return (
                <div key={originalIndex}>
                  <div className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm">
                    <div className="flex items-center justify-between">
                      <h1 className="py-1.5">
                        {field.label}
                        {field.required && (
                          <span className="text-red-500">(Required)</span>
                        )}
                      </h1>
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => {
                          setActiveFieldIndex(originalIndex);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Plus className="h-4 w-4 text-blue-700" />
                        <span className="text-blue-700 border-b-[1px] border-[#9db4e9]">
                          Add
                        </span>
                      </div>
                    </div>

                    {/* Utility data (originalIndex 11) */}
                    {originalIndex === 11 && utilities.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {utilities.map((utility, utilityIndex) => (
                          <div
                            key={utilityIndex}
                            className="pt-3 pb-1 border-t border-t-gray-300 rounded"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm">{utility.utilityType}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setActiveFieldIndex(11);
                                    setEditingUtilityIndex(utilityIndex);
                                    setIsDialogOpen(true);
                                  }}
                                  className="cursor-pointer"
                                >
                                  <TbEdit className="text-xl text-gray-800 hover:text-gray-600" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveUtility(utilityIndex);
                                  }}
                                  className="cursor-pointer"
                                >
                                  <FaRegTrashCan className="text-lg text-red-400" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Amenities data (originalIndex 12) */}
                    {originalIndex === 12 && amenitiesList.length > 0 && (
                      <div className="mt-2 space-y-2">
                        <div className="pt-3 pb-1 border-t border-t-gray-300 rounded">
                          <div className="flex justify-between items-center">
                            <div className="flex flex-wrap items-center gap-3">
                              {amenitiesList?.map((list, index) => (
                                <div
                                  key={index}
                                  className="relative flex items-center gap-1 border border-gray-300 px-2.5 py-2 rounded-lg whitespace-nowrap"
                                >
                                  <button
                                    onClick={() => handleRemoveAmenity(index)}
                                    className="absolute -top-1 -right-1 text-red-500 text-sm hover:text-red-700 cursor-pointer"
                                  >
                                    <TbXboxXFilled />
                                  </button>

                                  <span className="flex items-center gap-1">
                                    <span>{list}</span>
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* About section */}
                    {originalIndex === 10 && aboutDescription && (
                      <div className="mt-2 space-y-2">
                        <div className="pt-3 pb-1 border-t border-t-gray-300 rounded">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm pr-1">
                                {aboutDescription.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setActiveFieldIndex(originalIndex);
                                  setIsDialogOpen(true);
                                }}
                                className="cursor-pointer"
                              >
                                <TbEdit className="text-xl text-gray-800 hover:text-gray-600" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setAboutDescription(null);
                                }}
                                className="cursor-pointer"
                              >
                                <FaRegTrashCan className="text-lg text-red-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Nearest Landmark data (originalIndex 9) */}
                    {originalIndex === 9 && landmarks.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {landmarks.map((landmark, landmarkIndex) => (
                          <div
                            key={landmarkIndex}
                            className="pt-3 pb-1 border-t border-t-gray-300 rounded"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm">
                                  {landmark.landmarkName} (
                                  {landmark.landmarkType}) - {landmark.distance}{" "}
                                  mile
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setActiveFieldIndex(9);
                                    setEditingLandmarkIndex(landmarkIndex);
                                    setIsDialogOpen(true);
                                  }}
                                  className="cursor-pointer"
                                >
                                  <TbEdit className="text-xl text-gray-800 hover:text-gray-600" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setLandmarks(
                                      landmarks.filter(
                                        (_, i) => i !== landmarkIndex
                                      )
                                    );
                                  }}
                                  className="cursor-pointer"
                                >
                                  <FaRegTrashCan className="text-lg text-red-400" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Nearest Station data (originalIndex 7) */}
                    {originalIndex === 7 && stations.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {stations.map((station, stationIndex) => (
                          <div
                            key={stationIndex}
                            className="pt-3 pb-1 border-t border-t-gray-300 rounded"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm">
                                  {station.stationName} ({station.stationType})
                                  - {station.distance} mile
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setActiveFieldIndex(7);
                                    setEditingStationIndex(stationIndex);
                                    setIsDialogOpen(true);
                                  }}
                                  className="cursor-pointer"
                                >
                                  <TbEdit className="text-xl text-gray-800 hover:text-gray-600" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setStations(
                                      stations.filter(
                                        (_, i) => i !== stationIndex
                                      )
                                    );
                                  }}
                                  className="cursor-pointer"
                                >
                                  <FaRegTrashCan className="text-lg text-red-400" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Application Agreement data (originalIndex 8) */}
                    {originalIndex === 8 &&
                      applicationAgreements.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {applicationAgreements.map(
                            (agreement, agreementIndex) => (
                              <div
                                key={agreementIndex}
                                className="pt-3 pb-1 border-t border-t-gray-300 rounded"
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="text-sm">
                                      {agreement.agreementFile} -
                                      {agreement.acceptTerms
                                        ? " Terms Accepted"
                                        : " Terms Not Accepted"}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => {
                                        setActiveFieldIndex(8);
                                        setEditingAgreementIndex(
                                          agreementIndex
                                        );
                                        setIsDialogOpen(true);
                                      }}
                                      className="cursor-pointer"
                                    >
                                      <TbEdit className="text-xl text-gray-800 hover:text-gray-600" />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setApplicationAgreements(
                                          applicationAgreements.filter(
                                            (_, i) => i !== agreementIndex
                                          )
                                        );
                                      }}
                                      className="cursor-pointer"
                                    >
                                      <FaRegTrashCan className="text-lg text-red-400" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dialog */}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[650px] w-full p-0 overflow-hidden">
          <DialogHeader className="bg-[#F4F4F4] py-4 px-5">
            <DialogTitle>
              {activeFieldIndex !== null &&
                propertyFields[activeFieldIndex].label}
            </DialogTitle>
          </DialogHeader>
          {activeFieldIndex !== null && (
            <div className="grid gap-4">
              {activeFieldIndex === 0 && (
                <PropertyAddress
                  onSubmitSuccess={handlePropertyAddressSubmit}
                  onClose={() => setIsDialogOpen(false)}
                  initialValues={propertyAddress || undefined}
                />
              )}
              {activeFieldIndex === 1 && (
                <PetFees
                  onSubmitSuccess={(values) => {
                    if (editingPetFeeIndex !== null) {
                      const updatedFees = [...petFees];
                      updatedFees[editingPetFeeIndex] = values;
                      setPetFees(updatedFees);
                    } else {
                      setPetFees([...petFees, values]);
                    }
                    setIsDialogOpen(false);
                    setEditingPetFeeIndex(null);
                  }}
                  onClose={() => {
                    setIsDialogOpen(false);
                    setEditingPetFeeIndex(null);
                  }}
                  onDelete={() => {
                    if (editingPetFeeIndex !== null) {
                      setPetFees(
                        petFees.filter((_, i) => i !== editingPetFeeIndex)
                      );
                      setIsDialogOpen(false);
                      setEditingPetFeeIndex(null);
                    }
                  }}
                  initialValues={
                    editingPetFeeIndex !== null
                      ? petFees[editingPetFeeIndex]
                      : undefined
                  }
                  isEditing={editingPetFeeIndex !== null}
                />
              )}
              {activeFieldIndex === 2 && (
                <LeasingInfo
                  onSubmitSuccess={(values) => {
                    setLeasingInfo(values);
                    setIsDialogOpen(false);
                  }}
                  onClose={() => setIsDialogOpen(false)}
                  initialValues={leasingInfo || undefined}
                />
              )}
              {activeFieldIndex === 3 && (
                <Parking
                  onSubmitSuccess={(values) => {
                    setParkingInfo(values);
                    setIsDialogOpen(false);
                  }}
                  onClose={() => setIsDialogOpen(false)}
                  onDelete={() => {
                    setParkingInfo(null);
                    setIsDialogOpen(false);
                  }}
                  initialValues={parkingInfo || undefined}
                  isEditing={parkingInfo !== null}
                />
              )}
              {activeFieldIndex === 4 && (
                <Charges
                  onSubmitSuccess={(values) => {
                    setCharges(values);
                    setIsDialogOpen(false);
                  }}
                  onClose={() => setIsDialogOpen(false)}
                  initialValues={charges || undefined}
                />
              )}
              {activeFieldIndex === 5 && (
                <NearestEducation
                  onSubmitSuccess={(values) => {
                    if (editingEducationIndex !== null) {
                      const updatedInstitutions = [...educationalInstitutions];
                      updatedInstitutions[editingEducationIndex] = values;
                      setEducationalInstitutions(updatedInstitutions);
                    } else {
                      setEducationalInstitutions([
                        ...educationalInstitutions,
                        values,
                      ]);
                    }
                    setIsDialogOpen(false);
                    setEditingEducationIndex(null);
                  }}
                  onClose={() => {
                    setIsDialogOpen(false);
                    setEditingEducationIndex(null);
                  }}
                  onDelete={() => {
                    if (editingEducationIndex !== null) {
                      setEducationalInstitutions(
                        educationalInstitutions.filter(
                          (_, i) => i !== editingEducationIndex
                        )
                      );
                      setIsDialogOpen(false);
                      setEditingEducationIndex(null);
                    }
                  }}
                  initialValues={
                    editingEducationIndex !== null
                      ? educationalInstitutions[editingEducationIndex]
                      : undefined
                  }
                  isEditing={editingEducationIndex !== null}
                />
              )}
              {activeFieldIndex === 6 && (
                <RentReminder
                  onSubmitSuccess={(values) => {
                    setRentReminder(values);
                    setIsDialogOpen(false);
                  }}
                  onClose={() => setIsDialogOpen(false)}
                  initialValues={rentReminder || undefined}
                />
              )}
              {activeFieldIndex === 7 && (
                <NearestStation
                  onSubmitSuccess={(values) => {
                    if (editingStationIndex !== null) {
                      const updatedStations = [...stations];
                      updatedStations[editingStationIndex] = values;
                      setStations(updatedStations);
                    } else {
                      setStations([...stations, values]);
                    }
                    setIsDialogOpen(false);
                    setEditingStationIndex(null);
                  }}
                  onClose={() => {
                    setIsDialogOpen(false);
                    setEditingStationIndex(null);
                  }}
                  onDelete={() => {
                    if (editingStationIndex !== null) {
                      setStations(
                        stations.filter((_, i) => i !== editingStationIndex)
                      );
                      setIsDialogOpen(false);
                      setEditingStationIndex(null);
                    }
                  }}
                  initialValues={
                    editingStationIndex !== null
                      ? stations[editingStationIndex]
                      : undefined
                  }
                  isEditing={editingStationIndex !== null}
                />
              )}
              {activeFieldIndex === 8 && (
                <ApplicationAgreement
                  onSubmitSuccess={(values) => {
                    if (editingAgreementIndex !== null) {
                      // Update existing agreement
                      const updatedAgreements = [...applicationAgreements];
                      updatedAgreements[editingAgreementIndex] = values;
                      setApplicationAgreements(updatedAgreements);
                    } else {
                      // Add new agreement
                      setApplicationAgreements([
                        ...applicationAgreements,
                        values,
                      ]);
                    }
                    setIsDialogOpen(false);
                    setEditingAgreementIndex(null);
                  }}
                  onClose={() => {
                    setIsDialogOpen(false);
                    setEditingAgreementIndex(null);
                  }}
                  onDelete={() => {
                    if (editingAgreementIndex !== null) {
                      setApplicationAgreements(
                        applicationAgreements.filter(
                          (_, i) => i !== editingAgreementIndex
                        )
                      );
                      setIsDialogOpen(false);
                      setEditingAgreementIndex(null);
                    }
                  }}
                  initialValues={
                    editingAgreementIndex !== null
                      ? applicationAgreements[editingAgreementIndex]
                      : undefined
                  }
                  isEditing={editingAgreementIndex !== null}
                />
              )}
              {activeFieldIndex === 9 && (
                <NearestLandmark
                  onSubmitSuccess={(values) => {
                    if (editingLandmarkIndex !== null) {
                      // Update existing landmark
                      const updatedLandmarks = [...landmarks];
                      updatedLandmarks[editingLandmarkIndex] = values;
                      setLandmarks(updatedLandmarks);
                    } else {
                      // Add new landmark
                      setLandmarks([...landmarks, values]);
                    }
                    setIsDialogOpen(false);
                    setEditingLandmarkIndex(null);
                  }}
                  onClose={() => {
                    setIsDialogOpen(false);
                    setEditingLandmarkIndex(null);
                  }}
                  onDelete={() => {
                    if (editingLandmarkIndex !== null) {
                      setLandmarks(
                        landmarks.filter((_, i) => i !== editingLandmarkIndex)
                      );
                      setIsDialogOpen(false);
                      setEditingLandmarkIndex(null);
                    }
                  }}
                  initialValues={
                    editingLandmarkIndex !== null
                      ? landmarks[editingLandmarkIndex]
                      : undefined
                  }
                  isEditing={editingLandmarkIndex !== null}
                />
              )}
              {activeFieldIndex === 10 && (
                <About
                  onSubmitSuccess={(values) => {
                    setAboutDescription(values);
                    setIsDialogOpen(false);
                  }}
                  onClose={() => setIsDialogOpen(false)}
                  initialValues={aboutDescription || undefined}
                />
              )}
              {activeFieldIndex === 11 && (
                <Utility
                  onSubmitSuccess={(values) => {
                    if (editingUtilityIndex !== null) {
                      const updatedUtilities = [...utilities];
                      updatedUtilities[editingUtilityIndex] = values;
                      setUtilities(updatedUtilities);
                    } else {
                      setUtilities([...utilities, values]);
                    }
                    setIsDialogOpen(false);
                    setEditingUtilityIndex(null);
                  }}
                  onClose={() => {
                    setIsDialogOpen(false);
                    setEditingUtilityIndex(null);
                  }}
                  initialValues={
                    editingUtilityIndex !== null
                      ? utilities[editingUtilityIndex]
                      : undefined
                  }
                />
              )}
              {activeFieldIndex === 12 && (
                <Amenity
                  onSubmitSuccess={handleAmenitiesSubmit}
                  onClose={() => setIsDialogOpen(false)}
                  initialValues={{ amenities: amenitiesList, search: "" }}
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Property gallery */}
      <div className="max-w-screen-xl mx-auto mt-4 border border-gray-300 rounded-lg">
        <div className="py-4 px-3 border-b border-b-gray-300">
          <h1>Property gallery(Its not unit photo)*</h1>
        </div>
        <div>
          <div className="flex items-center content-center p-3 gap-8">
            <div>
              <h1>Featured photos*</h1>
              <div className="grid grid-cols-2 my-4 gap-4">
                <div className="flex justify-center items-center bg-[#F6F9FF]">
                  <div
                    className="w-full h-full flex flex-col items-center justify-center border border-dashed border-blue-500 p-5 rounded-lg cursor-pointer"
                    onClick={handleSingleUploadClick}
                  >
                    <div className="w-11 h-11 border border-dashed border-blue-500 p-2 rounded-lg flex justify-center items-center">
                      <Upload className="h-5 w-5" />
                    </div>
                    <h1 className="mt-0.5">Upload cover photo</h1>
                    <p className="text-xs">(Jpg, png only)</p>
                    <input
                      ref={coverPhotoRef}
                      type="file"
                      accept="image/jpeg, image/png"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "Cover Photo")}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="border border-dashed border-blue-500 px-8 py-4 rounded-lg flex justify-center items-center bg-[#F6F9FF] cursor-pointer"
                      onClick={() =>
                        handleMultiUploadClick(index, featuredPhotoRefs)
                      }
                    >
                      <div className="w-11 h-11 border border-dashed border-blue-500 p-2 rounded-lg flex justify-center items-center">
                        <Upload className="h-5 w-5" />
                      </div>
                      <input
                        type="file"
                        accept="image/jpeg, image/png"
                        className="hidden"
                        ref={(el) => {
                          if (el) {
                            featuredPhotoRefs.current[index] = el;
                          }
                        }}
                        onChange={(e) =>
                          handleFileChange(e, "Featured Photo", index)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h1>More photos(optional)</h1>
              <div className="grid grid-cols-4 gap-3 my-4">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="border border-dashed border-blue-500 px-8 py-4 rounded-lg flex justify-center items-center bg-[#F6F9FF] cursor-pointer"
                    onClick={() => handleMultiUploadClick(index, morePhotoRefs)}
                  >
                    <div className="w-11 h-11 border border-dashed border-blue-500 p-2 rounded-lg flex justify-center items-center">
                      <Upload className="h-5 w-5" />
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg, image/png"
                      className="hidden"
                      ref={(el) => {
                        if (el) {
                          morePhotoRefs.current[index] = el;
                        }
                      }}
                      onChange={(e) => handleFileChange(e, "More Photo", index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion */}
      <div className="max-w-screen-xl mx-auto my-8 border border-gray-300 rounded-lg">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="cursor-pointer bg-[#F6F9FF] px-3">
              <span className="font-medium">Videos(optional)</span>
            </AccordionTrigger>
            <AccordionContent className="border-t border-t-gray-300 px-3 pt-3">
              <div>
                <div className="flex flex-start gap-12 my-4">
                  <div>
                    <div className="flex flex-start gap-12">
                      {/* Property Video Upload */}
                      <div>
                        <h1 className="pb-2">Property Video (optional)</h1>
                        <div
                          className="border border-dashed border-blue-500 px-6 py-6 rounded-lg flex justify-center items-center bg-[#F6F9FF] cursor-pointer"
                          onClick={() => propertyVideoRef.current?.click()}
                        >
                          <div className="flex flex-col items-center">
                            <div className="w-11 h-11 border border-dashed border-blue-500 p-2 rounded-lg flex justify-center items-center">
                              <Upload className="h-5 w-5" />
                            </div>
                            <h1 className="mt-1">Upload video</h1>
                            <p className="text-xs text-gray-600">
                              (MP4, MOV only)
                            </p>
                            {propertyVideo && (
                              <p className="text-xs text-gray-600 mt-1 truncate max-w-[120px]">
                                {propertyVideo.name}
                              </p>
                            )}
                            <input
                              type="file"
                              ref={propertyVideoRef}
                              accept="video/mp4,video/quicktime"
                              onChange={handlePropertyVideoChange}
                              className="hidden"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Virtual Tour Upload */}
                      <div>
                        <h1 className="pb-2">
                          Property virtual tour(optional)
                        </h1>
                        <div
                          className="border border-dashed border-blue-500 px-6 py-6 rounded-lg flex justify-center items-center bg-[#F6F9FF] cursor-pointer"
                          onClick={() => virtualTourRef.current?.click()}
                        >
                          <div className="flex flex-col items-center">
                            <div className="w-11 h-11 border border-dashed border-blue-500 p-2 rounded-lg flex justify-center items-center">
                              <Upload className="h-5 w-5" />
                            </div>
                            <h1 className="mt-1">Upload video</h1>
                            <p className="text-xs text-gray-600">
                              (MP4, MOV only)
                            </p>
                            {virtualTour && (
                              <p className="text-xs text-gray-600 mt-1 truncate max-w-[120px]">
                                {virtualTour.name}
                              </p>
                            )}
                            <input
                              type="file"
                              ref={virtualTourRef}
                              accept="video/mp4,video/quicktime"
                              onChange={handleVirtualTourChange}
                              className="hidden"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Arial Video Upload */}
                      <div>
                        <h1 className="pb-2">
                          Property arial video (optional)
                        </h1>
                        <div
                          className="border border-dashed border-blue-500 px-6 py-6 rounded-lg flex justify-center items-center bg-[#F6F9FF] cursor-pointer"
                          onClick={() => arialVideoRef.current?.click()}
                        >
                          <div className="flex flex-col items-center">
                            <div className="w-11 h-11 border border-dashed border-blue-500 p-2 rounded-lg flex justify-center items-center">
                              <Upload className="h-5 w-5" />
                            </div>
                            <h1 className="mt-1">Upload video</h1>
                            <p className="text-xs text-gray-600">
                              (MP4, MOV only)
                            </p>
                            {arialVideo && (
                              <p className="text-xs text-gray-600 mt-1 truncate max-w-[120px]">
                                {arialVideo.name}
                              </p>
                            )}
                            <input
                              type="file"
                              ref={arialVideoRef}
                              accept="video/mp4,video/quicktime"
                              onChange={handleArialVideoChange}
                              className="hidden"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white top-shadow overflow-y-auto">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between py-2">
          <NavLink to="/" className="border-b-2 border-[#e0e0e0]">
            Back
          </NavLink>
          <NavLink to="/payment">
            <Button className="py-2" variant="getStarted">
              Next
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
