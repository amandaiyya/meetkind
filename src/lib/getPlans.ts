import { auth } from "@/app/api/auth/[...nextauth]/options-lite";
import ApiError from "./apiError";
import dbConnect from "./dbConnect";
import Plan from "@/models/Plans.model";

export async function getPlans(page: number) {
  const session = await auth();

  if (!session?.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const userId = session.user._id;

  const limit = 2;

  const skip = (page - 1) * limit;

  await dbConnect();

  const plans = await Plan.find({
    userId
  })
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit)
  .lean();

  return {
    plans: plans?.map((p: any) => ({
        _id: p._id?.toString(),
        userId: p.userId?.toString(),
        category: p.category,
        participants: p.participantsLocations?.length,
        venues: p.venues?.length,
        createdAt: String(p.createdAt)
    })) || [],
    hasMore: plans.length === limit,
  }
}