import TitleSection from "@/components/TitleSection";
import PriceDistributionChart from "@/components/charts/PriceDistributionChart";
import ProductCategoryPieChart from "@/components/charts/ProductCategoryPieChart";
import ProductCategorySimpleAreaChart from "@/components/charts/ProductCategorySimpleAreaChart";
import { cardSum, queryParams } from "@/constanst";
import { getAllProductsApi } from "@/services/productService";
import { TBrowseCategory } from "@/types/general-types";
import { TProduct } from "@/types/main-types";
import { useEffect, useState } from "react";

const LIMIT = 99999;

const Dashboard = () => {
  const [data, setData] = useState<TProduct[]>([]);

  // FETCH DATA
  useEffect(() => {
    async function getProducts() {
      const data = await getAllProductsApi(queryParams.PAGE, LIMIT);
      setData(data?.docs);
    }
    getProducts();
  }, []);

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

      {/* CHART */}
      <section className="mt-10 flex flex-col gap-10">
        <PriceDistributionChart data={data} />
        <ProductCategoryPieChart data={data} />
        <ProductCategorySimpleAreaChart data={data} />
      </section>
    </section>
  );
};

export default Dashboard;
