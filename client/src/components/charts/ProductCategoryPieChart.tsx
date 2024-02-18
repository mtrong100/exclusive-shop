import { TProduct } from "@/types/main-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ProductCategoryBarChart = ({ data = [] }: { data: TProduct[] }) => {
  // Calculate count of products for each rating
  const ratingCounts: any = {};
  data.forEach((product) => {
    const rating = product.rating.toString(); // Convert rating to string for consistency
    if (ratingCounts[rating]) {
      ratingCounts[rating]++;
    } else {
      ratingCounts[rating] = 1;
    }
  });

  // Convert rating counts to an array of objects
  const ratingData = Object.keys(ratingCounts).map((rating) => ({
    rating: parseFloat(rating), // Convert rating back to number
    count: ratingCounts[rating],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={ratingData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="rating" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="rating" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProductCategoryBarChart;
