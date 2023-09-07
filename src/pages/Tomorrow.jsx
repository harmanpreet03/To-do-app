import { useLoaderData } from "react-router-dom";
import DoList from "../components/DoList";

export async function loader() {
  const API = `http://localhost:8085/today`;
  try {
    const response = await fetch(API);
    if (!response.ok) throw new Error();

    const data = await response.json();
    return data;
  } catch {
    throw new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

export default function Tomorrow() {
  const data = useLoaderData();
  return <DoList todoList={data} />;
}
