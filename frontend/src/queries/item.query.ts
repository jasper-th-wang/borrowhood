import {createItem, getItems} from "@/repositories/itemRepository";
import {useMutation, useQuery} from "@tanstack/react-query";
import {QUERY_ALL_ITEMS_KEY} from "@/constants/query.constant";

export const useGetItemsQuery = () => {
  return useQuery({
    queryKey: [QUERY_ALL_ITEMS_KEY],
    queryFn: getItems,
    // TODO: staleTime should be changed to Infinity, because:
    //  1. we should invalidate query when update user, or sign out
    //  2. we should let client check if session is still valid
    staleTime: 0,
    gcTime: 0,
  });
};

export const useCreateItemMutation = () => useMutation({ mutationFn: createItem });