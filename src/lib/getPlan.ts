import { auth } from "@/app/api/auth/[...nextauth]/options-lite";
import ApiError from "./apiError";
import dbConnect from "./dbConnect";
import Plan from "@/models/Plans.model";
import "@/types/plan";

export async function getPlan(id: string){
    if(!id){
        throw new ApiError(400, "Plan id is required");
    }

    const session = await auth();

    if (!session?.user) {
        throw new ApiError(401, "Unauthorized");
    }

    await dbConnect();

    const plan = await Plan.findById(id).lean();

    if (!plan) {
        throw new ApiError(404, "Plan not found");
    }

    return {
        plan: {
            _id: plan._id?.toString(),
            userId: plan.userId?.toString(),
            venues: plan.venues?.map((v) => ({
                ...v,
                _id: v._id?.toString(),
                routes: v.routes?.map((r) => ({
                    userIndex: r.userIndex,
                    travelDistance: r.travelDistance,
                    travelTime: r.travelTime,
                })) || []
            })) || [],
            category: plan.category
        }
    };
}