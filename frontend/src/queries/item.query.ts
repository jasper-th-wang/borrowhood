import { getItems } from "@/repositories/itemRepository";
import { useQuery } from "@tanstack/react-query";

const QUERY_ALL_ITEMS_KEY = 'allItems';
export const useGetItemsQuery = () => {
  return useQuery({
    queryKey: [QUERY_ALL_ITEMS_KEY],
    queryFn: getItems,
    // TODO: staleTime should be changed to Infinity, because:
    //  1. we should invalidate query when update user, or sign out
    //  2. we should let client check if session is still valid
    staleTime: 20000,
    gcTime: 0,
  });
};