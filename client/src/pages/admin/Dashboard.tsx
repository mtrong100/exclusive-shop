import TitleSection from "@/components/TitleSection";
import PriceDistributionChart from "@/components/charts/PriceDistributionChart";
import ProductCategoryPieChart from "@/components/charts/ProductCategoryPieChart";
import ProductCategorySimpleAreaChart from "@/components/charts/ProductCategorySimpleAreaChart";
import { queryParams } from "@/constanst";
import { getAllProductsApi } from "@/services/productService";
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
