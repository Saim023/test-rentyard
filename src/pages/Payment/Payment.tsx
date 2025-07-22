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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { PaymentCardForm } from "./PaymentCardForm";

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
    // Handle the new card data here
    console.log("New card added:", values);
    setIsDialogOpen(false);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 mb-20 py-5">
      <div>
        <h1 className="mb-8 text-2xl text-gray-900">
          Choose a plan for after 30-days free trial
        </h1>

        <div className="mb-5 flex items-center gap-4">
          <Button
            variant={selectedPlan === "monthly" ? "add" : "outline"}
            onClick={() => setSelectedPlan("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant={selectedPlan === "annually" ? "add" : "outline"}
            onClick={() => setSelectedPlan("annually")}
          >
            Annually (save 57%)
          </Button>
        </div>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
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
              <CardTitle className="text-lg">{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="mb-2 text-2xl font-bold text-primary">
                {selectedPlan === "monthly"
                  ? plan.monthlyPrice
                  : plan.annualPrice}
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                {plan.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTier && (
        <div className="max-w-screen-xl mx-auto rounded-lg border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="mb-6 text-xl font-semibold">Payment option</h2>
            <button
              className="border-b border-blue-600 text-blue-600 cursor-pointer"
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CiCreditCard2 className="text-xl" />
                    <h1>
                      {card.name}
                      <span>({card.cardName})</span>{" "}
                      <span className="text-gray-800">
                        ....{card.lastDigits}
                      </span>
                    </h1>
                  </div>
                  <div>
                    <Button
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
        <DialogContent className="sm:max-w-[650px] w-full p-0 overflow-hidden">
          <DialogHeader className="bg-[#F4F4F4] py-4 px-5">
            <DialogTitle>Add new card</DialogTitle>
          </DialogHeader>
          <PaymentCardForm
            onSubmitSuccess={handleAddNewCard}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-0 left-0 right-0 bg-white top-shadow overflow-y-auto">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between py-3">
          <NavLink to="/condominiums" className="border-b-2 border-[#e0e0e0]">
            Back
          </NavLink>
          <NavLink to="#">
            <Button className="py-2" variant="getStarted">
              Pay & add property
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
