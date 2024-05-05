import client from "../client";

export interface FutureData {
  code: string;
  symbol: string;
  name: string;
  category: string;
  delivery_month: string;
  delivery_date: string;
  underlying_kind: string;
  unit: number;
  limit_up: number;
  limit_down: number;
  reference: number;
  update_date: string;
}

export const GetNearestMXF = async (): Promise<FutureData> => {
  const res = await client.get("/tmt/v1/basic/search/future/mxf");
  return res.data;
};
