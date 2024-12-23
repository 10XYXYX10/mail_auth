import UpdateName from "@/components/user/UpdateName";
import { notFound } from "next/navigation";
const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

const UserPage = async (
  props:{
    params: Promise<{userId:string}>
  }
) => {
  const params = await props.params;
  const userId = Number(params.userId);
  if(!userId)notFound();

  return (
    <div className="p-5">
      <UpdateName apiUrl={apiUrl}/>
    </div>
  )
}
export default UserPage;