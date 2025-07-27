import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";

export const key = "comment";

export const useComment = () => {
  const client = useQueryClient();
     const data  = useQuery({
        queryKey: ["blog"],
        queryFn: () => api.get("/blog").then((res) => res.data)
    });
     const DelMutation = useMutation({
        mutationFn: (id) => api.delete(`/blog/${id}`),
        onSuccess: () => client.invalidateQueries({ queryKey: ["blog"] })
    })
  const getComments = () =>
    useQuery({ queryKey: ["blog"], queryFn: () => api.get("/blog") });

  const CreateMutation = useMutation({
        mutationFn: (newUser) => api.post("/blog", newUser),
        onSuccess: () => client.invalidateQueries({ queryKey: ["blog"] })
    })

  return { getComments, CreateMutation,data,DelMutation };
};
