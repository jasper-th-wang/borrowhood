import {getCommunities} from "@/repositories/communityRepository";
import {useQuery} from "@tanstack/react-query";
import {QUERY_ALL_COMMUNITIES_KEY} from "@/constants/query.constant";

export const useGetCommunitiesQuery = () => {
  return useQuery({
    queryKey: [QUERY_ALL_COMMUNITIES_KEY],
    queryFn: getCommunities,
    // TODO: staleTime should be changed to Infinity, because:
    //  1. we should invalidate query when update user, or sign out
    //  2. we should let client check if session is still valid
    staleTime: 20000,
    gcTime: 0,
  });
};