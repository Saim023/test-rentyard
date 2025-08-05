/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { NavLink } from "react-router-dom";
import { CiCreditCard2 } from "react-icons/ci";
import { TiTick } from "react-icons/ti";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { PaymentCardForm } from "./PaymentCardForm";
import { toast } from "sonner";
import { IoWarningOutline } from "react-icons/io5";

export function Payment() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annually">(
    "monthly"
  );
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const plans = [
    {
      name: "Regular",
      monthlyPrice: "$99.99/mo",
      annualPrice: "$79.99/mo",
      description: "Price for 1-50 units",
    },
    {
      name: "Platinum",
      monthlyPrice: "$129.99/mo",
      annualPrice: "$99.99/mo",
      description: "Price for 1-50 units",
      features: ["Nearby & Essentials", "Comfort & Rules", "Property Gallery"],
    },
    {
      name: "Enterprise",
      monthlyPrice: "$199.99/mo",
      annualPrice: "$149.99/mo",
      description: "Price for 1-50 units",
      features: ["All features", "Priority support", "API access"],
    },
  ];

  const paymentCards = [
    {
      id: "amex-0001",
      name: "Alex Jones",
      cardName: "(Amex card)",
      lastDigits: "8565",
    },
    {
      id: "amex-0002",
      name: "Henry Cavil",
      cardName: "Visa card",
      lastDigits: "8565",
    },
    {
      id: "amex-0003",
      name: "Mark Specter",
      cardName: "Master card",
      lastDigits: "8565",
    },
  ];

  const handleAddNewCard = (values: any) => {
    console.log("New card added:", values);
    setIsDialogOpen(false);
  };

  const handlePayAndAddProperty = () => {
    if (!selectedTier) {
      toast.warning("Please select a plan before proceeding", {
        style: {
          color: "#000",
        },
        icon: <IoWarningOutline className="text-xl text-yellow-400" />,
      });
      return;
    }

    if (!selectedCard) {
      toast.warning("Please select a payment card before proceeding", {
        style: {
          color: "#000",
        },
        icon: <IoWarningOutline className="text-xl text-yellow-400" />,
      });
      return;
    }
    toast.success("Payment processed successfully!", {
      style: {
        color: "#000",
      },
      icon: <TiTick className="text-xl text-green-700" />,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow mx-4 md:mx-20">
        <div>
          <h1 className="mt-8 md:mt-14 mb-6 md:mb-8 text-lg md:text-xl font-bold text-[#272B35]">
            Choose a plan for after 30-days free trial
          </h1>

          <div className="mb-6 flex flex-wrap items-center gap-2 md:gap-4">
            <Button
              className="w-full md:w-auto"
              variant={selectedPlan === "monthly" ? "add" : "outline"}
              onClick={() => setSelectedPlan("monthly")}
            >
              Monthly
            </Button>
            <Button
              className="w-full md:w-auto"
              variant={selectedPlan === "annually" ? "add" : "outline"}
              onClick={() => setSelectedPlan("annually")}
            >
              Annually (save 57%)
            </Button>
          </div>
        </div>

        <div className="mb-8 md:mb-12 grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`cursor-pointer transition duration-200 hover:border-blue-600 ${
                selectedTier === plan.name
                  ? "border-1 border-blue-600 bg-blue-50"
                  : ""
              }`}
              onClick={() => setSelectedTier(plan.name)}
            >
              <CardHeader>
                <CardTitle className="text-md md:text-lg">
                  {plan.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h2 className="mb-2 text-xl md:text-2xl font-bold text-primary">
                  {selectedPlan === "monthly"
                    ? plan.monthlyPrice
                    : plan.annualPrice}
                </h2>
                <p className="mb-4 text-xs md:text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTier && (
          <div className="rounded-lg border bg-card p-4 md:p-5 shadow-sm mb-8 md:mb-[102px]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="mb-4 md:mb-6 text-lg md:text-xl font-semibold">
                Payment option
              </h2>
              <button
                className="border-b border-blue-600 text-blue-600 cursor-pointer text-sm md:text-base pb-3 md:pb-0"
                onClick={() => setIsDialogOpen(true)}
              >
                Add new card
              </button>
            </div>

            <div className="">
              {paymentCards?.map((card) => (
                <div
                  key={card.id}
                  className="py-2 hover:bg-gray-50 border-b border-b-gray-100"
                >
                  <div className="grid grid-cols-2 gap-2 md:flex md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2 col-span-1 md:mb-0">
                      <CiCreditCard2 className="text-xl" />
                      <h1 className="text-sm md:text-base truncate">
                        {" "}
                        {card.name}
                        <span>({card.cardName})</span>{" "}
                        <span className="text-gray-800">
                          ....{card.lastDigits}
                        </span>
                      </h1>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      {" "}
                      <Button
                        className={`w-[88px] h-[40px] rounded-[12px] px-2 md:px-5 py-2.5 text-[14px] md:text-[16px] font-semibold ${
                          selectedCard === card.id
                            ? "text-white"
                            : "text-blue-500"
                        } border border-blue-500`}
                        variant={selectedCard === card.id ? "add" : "outline"}
                        onClick={() => setSelectedCard(card.id)}
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="w-[95%] sm:max-w-[650px] p-0 overflow-hidden">
            <DialogHeader className="bg-[#F4F4F4] py-4 px-5">
              <DialogTitle>Add new card</DialogTitle>
            </DialogHeader>
            <PaymentCardForm
              onSubmitSuccess={handleAddNewCard}
              onClose={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Navigation */}
      <div className="h-20 md:h-24 border-t-[1px] border-t-[#E0E0E0] bg-white top-shadow">
        <div className="mx-4 md:mx-20 h-full">
          <div className="flex items-center justify-between h-full">
            <NavLink
              to="/condominiums"
              className="font-semibold border-b-2 border-[#E0E0E0] text-sm md:text-base"
            >
              Back
            </NavLink>
            <Button
              className="w-[150px] md:w-[188px] h-[40px] md:h-[47px] rounded-[12px] text-[14px] md:text-[16px] font-semibold px-4 md:px-6 py-2 md:py-3"
              variant="next"
              onClick={handlePayAndAddProperty}
            >
              Pay & add property
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
