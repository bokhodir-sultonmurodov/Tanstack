import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";

export const key = "comment";

export const useComment = () => {
  const client = useQueryClient();

  const getComments = () =>
    useQuery({ queryKey: ["blog"], queryFn: () => api.get("/blog") });
  
   const DelMutation = useMutation({
        mutationFn: (id) => api.delete(`/blog/${id}`),
        onSuccess: () => client.invalidateQueries({ queryKey: ["blog"] })
    })
  const CreateMutation = useMutation({
        mutationFn: (newUser) => api.post("/blog", newUser),
        onSuccess: () => client.invalidateQueries({ queryKey: ["blog"] })
    })
     const EditMutation = useMutation({
        mutationFn:(updatedUser)=>api.put(`/users/${updatedUser.id}`,updatedUser),
        onSuccess: () => client.invalidateQueries({ queryKey: ["users"] })
    })

  return { getComments, CreateMutation,DelMutation,EditMutation };
};
