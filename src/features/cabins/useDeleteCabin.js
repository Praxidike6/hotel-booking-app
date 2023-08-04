import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  // mutation used to delete cabins from the table
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    // invalidateQueries forces the cabins to be reloaded/rerendered.
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin has been successfully deleted.");
    },
    onError: (err) => {
      toast.error(err.message());
    },
  });
  return {isDeleting, deleteCabin};
}
