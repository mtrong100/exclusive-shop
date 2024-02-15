import { TProduct } from "@/types/main-types";
import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ResponsiveContainer,
} from "recharts";

const ProductCategorySimpleAreaChart = ({ data }: { data: TProduct[] }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="price"
          stackId="1"
          fill="#8884d8"
          name="Price"
        />
        <Area
          type="monotone"
          dataKey="stock"
          stackId="1"
          fill="#82ca9d"
          name="Stock"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ProductCategorySimpleAreaChart;
