import TitleSection from "@/components/TitleSection";
import { cardSum } from "@/constanst";
import { TBrowseCategory } from "@/types/general-types";

const Dashboard = () => {
  return (
    <section>
      <TitleSection>Dashboard</TitleSection>
      <div className="mt-8">
        <div className="grid grid-cols-4 gap-[30px]">
          {cardSum.map((item: TBrowseCategory) => (
            <div
              key={item.title}
              className="shadow-md flex items-center justify-center rounded-md p-4 h-[140px] border"
            >
              <div className="flex items-start gap-5">
                <span className="flex items-center justify-center w-[55px] h-[55px] rounded-full bg-primary/10 text-primary">
                  {item.icon}
                </span>
                <div>
                  <p className="font-medium text-lg">59</p>
                  <h1 className="font-medium opacity-80">{item.title}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
