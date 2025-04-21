import Container from "@/components/global/container";
import SectionBadge from "@/components/ui/section-badge";
import { Bolt } from "lucide-react";
import { toast, Toaster } from "sonner";

const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    description:
      "Ideal for individuals getting started with budgeting and tracking.",
    features: [
      "Track income & expenses",
      "Manual data entry",
      "Monthly summary report",
    ],
    buttonText: "Get Started",
    buttonStyle: "bg-white text-black hover:bg-gray-200",
  },
  {
    name: "Pro",
    price: "$12/mo",
    description:
      "Best for professionals who want automation and smart insights.",
    features: [
      "All Basic features",
      "Recurring transactions",
      "Advanced analytics",
      "Bank integration",
    ],
    buttonText: "Upgrade to Pro",
    buttonStyle: "bg-blue-600 text-white hover:bg-blue-700",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$29/mo",
    description: "Perfect for small teams managing shared financial goals.",
    features: [
      "All Pro features",
      "Multi-user collaboration",
      "Role-based access",
      "Priority email support",
    ],
    buttonText: "Start Team Plan",
    buttonStyle: "bg-white text-black hover:bg-gray-200",
  },
];

const PricingSection = () => {
  return (
    <section className="w-full md:py-16 relative text-white">
      <Container>
        <div className="max-w-5xl mx-auto text-start md:text-center">
          <span className=" text-gray-300 px-3 py-1 rounded-md text-sm uppercase">
            <SectionBadge title="Pricing" />
          </span>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mt-6">
            Choose the Right Plan for Your Finances
          </h2>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Whether you're budgeting solo or managing team finances, find a plan
            that fits your needs and grows with you.
          </p>
          <Toaster />
        </div>
      </Container>

      {/* Pricing Cards */}
      <Container>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto px-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`border rounded-lg flex flex-col h-full justify-between transition-all ${
                plan.highlighted ? "border-blue-500" : "border-gray-700"
              }`}
            >
              <div className="p-6 flex-1">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-2xl font-bold mt-1">{plan.price}</p>
                <p className="text-gray-400 text-sm">{plan.description}</p>
                <div className="border-b my-4"></div>

                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-gray-300"
                    >
                      <Bolt className="w-5 h-5 text-blue-500" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-6 pb-6 mt-1">
                <button
                  onClick={() =>
                    toast("🚧 Developer at Work || Still tweaking this awesome plan — hang tight!", {
                     
                    })
                    
                  }
                  className={`px-4 py-2 w-full rounded-md font-medium transition ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PricingSection;
