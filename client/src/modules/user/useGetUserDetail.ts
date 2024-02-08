import { getUserDetailApi } from "@/services/userService";
import { TUser } from "@/types/main-types";
import { useEffect, useState } from "react";

export default function useGetUserDetail(id: string, token: string) {
  const [data, setData] = useState<TUser | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getUserDetailApi(id, token);
      if (res) setData(res);
    }
    fetchData();
  }, [id, token]);

  return { data };
}
