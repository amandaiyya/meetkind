import Plan from "@/components/Plan";
import { getPlan } from "@/lib/getPlan";

export default async function page(
    {params}: {params: Promise<{id: string}>}
) {
    const { id } = await params;
  
    try {
        const data = await getPlan(id).catch((err) => {
          console.error(err);
          return {
            plan: null
          }
        });
  
        return (
          <Plan data={data.plan}/>
        )
    } catch (error) {
        console.error("Server Error: ", error);
        return (
          <Plan 
            data={null}
          />
        )
    }
};