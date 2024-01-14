import { browseCategory } from "@/constanst";
import TitleSection from "./TitleSection";

const BrowseByCategory = () => {
  return (
    <div>
      <TitleSection>Browse By Category</TitleSection>

      {/* CATEGORY-LIST */}
      <ul className="grid grid-cols-6 gap-5 mt-[60px]">
        {browseCategory.map((item) => {
          return (
            <div
              key={item.title}
              className="aspect-square transition-all border hover:bg-primary rounded-md hover:text-white flex items-center justify-center flex-col gap-5"
            >
              {item.icon}
              <p className="font-normal">{item.title}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default BrowseByCategory;
