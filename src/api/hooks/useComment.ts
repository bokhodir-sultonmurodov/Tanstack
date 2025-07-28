import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";

type BlogUser = {
  id?: number;
  fname: string;
  lname: string;
  birthdate: string;
  phone_number: string;
};

export const key = "comment";

export const useComment = () => {
  const client = useQueryClient();

  const getComments = () =>
    useQuery({ queryKey: ["blog"], queryFn: () => api.get("/blog") });

  const DelMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/blog/${id}`),
    onSuccess: () => client.invalidateQueries({ queryKey: ["blog"] }),
  });

  const CreateMutation = useMutation({
    mutationFn: (newUser: BlogUser) => api.post("/blog", newUser),
    onSuccess: () => client.invalidateQueries({ queryKey: ["blog"] }),
  });

  const EditMutation = useMutation({
    mutationFn: ({ updatedUser,id }: { updatedUser: BlogUser,id:string }) =>
      api.put(`/blog/${id}`, updatedUser),
    onSuccess: () => client.invalidateQueries({ queryKey: ["blog"] }),
  });

  return { getComments, CreateMutation, DelMutation, EditMutation };
};
