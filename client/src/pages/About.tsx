import {
  CircleDollarSign,
  CreditCard,
  Mail,
  Phone,
  ShoppingBag,
  Store,
} from "lucide-react";
import twoGirls from "../assets/images/two-girls.png";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import TitleSection from "@/components/TitleSection";

type TStastisticCard = {
  icon: React.ReactNode;
  amount: string;
  caption: string;
};

const stastisticCard: TStastisticCard[] = [
  {
    icon: <Store size={30} />,
    amount: "10.5k",
    caption: "Sallers active our site",
  },
  {
    icon: <CircleDollarSign size={30} />,
    amount: "33k",
    caption: "Mopnthly Produduct Sale",
  },
  {
    icon: <ShoppingBag size={30} />,
    amount: "45.5k",
    caption: "Customer active in our site",
  },
  {
    icon: <CreditCard size={30} />,
    amount: "25k",
    caption: "Anual gross sale in our site",
  },
];

const About = () => {
  return (
    <section className="mt-[80px] mb-[140px]">
      {/* BANNER */}
      <div className="grid grid-cols-2 gap-[75px] items-center">
        <div>
          <h1 className="text-4xl font-semibold tracking-wider">Our Story</h1>
          <p className="mt-[40px]">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p className="mt-[24px]">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>

        <div>
          <img src={twoGirls} alt="twoGirls" className="img-cover rounded-md" />
        </div>
      </div>

      {/* STASTISTIC */}
      <div className="mt-[140px] grid grid-cols-4 gap-[30px]">
        {stastisticCard.map((item: TStastisticCard) => (
          <div
            key={item.amount}
            className="border rounded-md flex items-center hover:bg-primary hover:text-white transition-all justify-center flex-col aspect-square"
          >
            <div className="flex items-center justify-center rounded-full bg-black text-white w-[55px] h-[55px]">
              {item.icon}
            </div>
            <h1 className="mt-[24px] text-4xl font-semibold">{item.amount}</h1>
            <p className="mt-[12px]">{item.caption}</p>
          </div>
        ))}
      </div>

      {/* CONTACT */}
      <div className="mt-[140px]">
        <TitleSection>Contact us</TitleSection>
        <div className="mt-[50px] grid grid-cols-[270px_minmax(0,_1fr)] gap-[60px]">
          <section>
            <div>
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center rounded-full w-[40px] h-[40px]  bg-primary text-white">
                  <Phone size={20} />
                </span>
                <p className="font-medium">Call To Us</p>
              </div>
              <p className="mt-[32px]">We are available 24/7, 7 days a week.</p>
              <p className="mt-[16px]">Phone: +8801611112222</p>
            </div>
            <Separator className="my-4" />
            <div>
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center rounded-full w-[40px] h-[40px]  bg-primary text-white">
                  <Mail size={20} />
                </span>
                <p className="font-medium">Write To US</p>
              </div>
              <p className="mt-[32px]">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="mt-[16px]">Emails: customer@exclusive.com</p>
            </div>
          </section>

          <section>
            <div className="grid grid-cols-3 gap-5">
              <Input type="email" placeholder="Email" className="h-[50px]" />
              <Input type="text" placeholder="Name" className="h-[50px]" />
              <Input type="text" placeholder="Phone" className="h-[50px]" />
            </div>
            <div className="mt-[32px]">
              <Textarea
                placeholder="Type your message here."
                className="min-h-[207px]"
              />
            </div>
            <Button className="h-[50px] px-10 mt-7 ml-auto flex">
              Send Massage
            </Button>
          </section>
        </div>
      </div>
    </section>
  );
};

export default About;
