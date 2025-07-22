import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  AirVent,
  AlarmCheck,
  Axis3D,
  Expand,
  Fan,
  FireExtinguisher,
  Flame,
  MoveUpRight,
  PanelsTopLeft,
  ParkingCircle,
  Refrigerator,
  Trees,
  Tv,
  WashingMachine,
  Wind,
  Search,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";

// Form schema
const amenityFormSchema = z.object({
  amenities: z.array(z.string()).min(1, "At least one amenity is required"),
  search: z.string().optional(),
});

interface AmenityProps {
  onSubmitSuccess: (values: z.infer<typeof amenityFormSchema>) => void;
  onClose?: () => void;
  initialValues?: z.infer<typeof amenityFormSchema>;
}

const amenities = [
  { label: "Air Conditioning", icon: <AirVent size={16} /> },
  { label: "Cable Ready", icon: <Tv size={16} /> },
  { label: "Ceiling Fan", icon: <Fan size={16} /> },
  { label: "High Ceilings", icon: <MoveUpRight size={16} /> },
  { label: "Private Balcony", icon: <Wind size={16} /> },
  { label: "Refrigerator", icon: <Refrigerator size={16} /> },
  { label: "Wooded Views", icon: <Trees size={16} /> },
  { label: "Washer/Dryer Hookup", icon: <WashingMachine size={16} /> },
  { label: "Hardwood Floor (Home)", icon: <PanelsTopLeft size={16} /> },
  { label: "Fireplace (Home)", icon: <Flame size={16} /> },
  { label: "First Aid Kit", icon: <Axis3D size={16} /> },
  { label: "Carbon Monoxide Alarm", icon: <AlarmCheck size={16} /> },
  { label: "Expanded Patios (Home)", icon: <Expand size={16} /> },
  { label: "Free Parking on Premises", icon: <ParkingCircle size={16} /> },
  { label: "Fire Extinguisher", icon: <FireExtinguisher size={16} /> },
];

export const Amenity = ({
  onSubmitSuccess,
  onClose,
  initialValues,
}: AmenityProps) => {
  const form = useForm<z.infer<typeof amenityFormSchema>>({
    resolver: zodResolver(amenityFormSchema),
    defaultValues: initialValues || {
      amenities: [],
      search: "",
    },
  });

  const searchTerm = form.watch("search") || "";
  const selectedAmenities = form.watch("amenities") || [];

  const filteredAmenities = amenities.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (label: string) => {
    const currentAmenities = form.getValues("amenities") || [];
    const newAmenities = currentAmenities.includes(label)
      ? currentAmenities.filter((item) => item !== label)
      : [...currentAmenities, label];
    form.setValue("amenities", newAmenities);
  };

  function onSubmit(values: z.infer<typeof amenityFormSchema>) {
    onSubmitSuccess(values);
    if (!initialValues) {
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-5">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <div className="relative my-3">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Search size={16} />
                </span>
                <FormControl>
                  <Input
                    type="search"
                    placeholder="Search amenities"
                    className="pl-9"
                    {...field}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amenities"
          render={() => (
            <FormItem>
              <div className="flex flex-wrap gap-2">
                {filteredAmenities.map((item) => {
                  const isSelected = selectedAmenities.includes(item.label);
                  return (
                    <Button
                      type="button"
                      variant="outline"
                      key={item.label}
                      onClick={() => handleToggle(item.label)}
                      className={`flex items-center font-light gap-2 cursor-pointer ${
                        isSelected ? "border-blue-500" : ""
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Button>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {onClose && (
          <div className="flex items-center justify-end gap-3 py-3 border-t border-t-gray-300">
            <Button type="submit" variant="add">
              Add
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
