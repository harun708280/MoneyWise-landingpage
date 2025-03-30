import Container from "@/components/global/container";
import SectionBadge from "@/components/ui/section-badge";
import { Bolt } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for trying out WorkWave",
    features: ["Limited projects", "1 Team member", "Basic features"],
    buttonText: "Start for free",
    buttonStyle: "bg-white text-black hover:bg-gray-200",
  },
  {
    name: "Unlimited SaaS",
    price: "$199",
    description: "The ultimate agency kit",
    features: [
      "Unlimited projects",
      "5 Team members",
      "Advanced design tools",
      "Customizable domain",
    ],
    buttonText: "Upgrade to Pro",
    buttonStyle: "bg-blue-600 text-white hover:bg-blue-700",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$399",
    description: "For serious agency owners",
    features: [
      "Unlimited projects",
      "Unlimited Team members",
      "Custom branding",
      "Priority support (24/7)",
    ],
    buttonText: "Upgrade to Enterprise",
    buttonStyle: "bg-white text-black hover:bg-gray-200",
  },
];

const PricingSection = () => {
  return (
    <section className="w-full py-16 relative text-white">
       
      
      <Container>
        <div className="max-w-5xl mx-auto text-center">
          <span className=" text-gray-300 px-3 py-1 rounded-md text-sm uppercase">
            <SectionBadge title="Pricing" />
          </span>
          <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
            Choose the Best Plan for Your Team
          </h2>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Pick a plan that fits your needs and collaborate effortlessly with
            your team.
          </p>
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
