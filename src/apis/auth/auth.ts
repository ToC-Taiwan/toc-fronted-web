import client from "../client";

export const Login = async (
  username: string,
  password: string
): Promise<string> => {
  const res = await client.post("/tmt/v1/login", {
    username: username,
    password: password
  });
  client.defaults.headers.common["Authorization"] = res.data.token;
  return res.data.token;
};

export const Refresh = async (): Promise<boolean> => {
  const res = await client.get("/tmt/v1/refresh");
  client.defaults.headers.common["Authorization"] = res.data.token;
  if (res.status === 200) {
    return true;
  }
  return false;
};
