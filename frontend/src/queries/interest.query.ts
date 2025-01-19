import { getInterests, postInterests } from "@/repositories/interestRepository";
import { useMutation, useQuery } from "@tanstack/react-query";

const QUERY_ALL_INTERESTS_KEY = 'allINTERESTS';
export const useGetInterestsQuery = () => {
  return useQuery({
    queryKey: [QUERY_ALL_INTERESTS_KEY],
    queryFn: getInterests,
    // TODO: staleTime should be changed to Infinity, because:
    //  1. we should invalidate query when update user, or sign out
    //  2. we should let client check if session is still valid
    staleTime: 20000,
    gcTime: 0,
  });
};

export const usePostInterestsMutation = () => {
  return useMutation({
    mutationFn: postInterests,
  });
}