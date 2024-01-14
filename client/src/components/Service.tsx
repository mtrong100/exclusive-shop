import { Headphones, ShieldCheck, Truck } from "lucide-react";
import React from "react";

type TServiceContent = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const serviceContent: TServiceContent[] = [
  {
    icon: <Truck size={30} />,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140",
  },
  {
    icon: <Headphones size={30} />,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
  },
  {
    icon: <ShieldCheck size={30} />,
    title: "MONEY BACK GUARANTEE",
    description: "We reurn money within 30 days",
  },
];

const Service = () => {
  return (
    <div className="flex items-center justify-around">
      {serviceContent.map((item: TServiceContent) => (
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="w-[70px] h-[70px] flex items-center justify-center text-white rounded-full bg-primary text-wrap">
            {item.icon}
          </div>

          <div className="text-center">
            <h1 className="font-bold">{item.title}</h1>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Service;
