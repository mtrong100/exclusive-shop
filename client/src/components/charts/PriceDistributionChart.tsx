import { TProduct } from "@/types/main-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PriceDistributionChart = ({ data }: { data: TProduct[] }) => {
  // Sort product data by price
  const sortedData = data.slice().sort((a, b) => a.price - b.price);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={sortedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceDistributionChart;
