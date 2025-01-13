import { useMutation, useQueryClient } from "@tanstack/react-query";
import anecdotesService from "../services/anecdotes";
import NotificationContext from "./NotificationContext";
import { useContext } from "react";

const AnecdoteForm = () => {
  /* HOOKS */
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();

  // Define mutation for creation
  const newAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.create,
    onSuccess: (newAnecdote) => {
      // Invalidate the anecdotes query --> will keep sync between server and frontend
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });

      // Show notification for 5 seconds
      const notification = `You created '${newAnecdote.content}'`;
      const notificationAction = { type: "SET", payload: notification };

      notificationDispatch(notificationAction);

      setTimeout(() => {
        notificationDispatch({ type: "UNSET" });
      }, 5000);
    },
    onError: (error) => {
      const notificationAction = {
        type: "SET",
        payload: error.response.data.error,
      };
      notificationDispatch(notificationAction);

      setTimeout(() => {
        notificationDispatch({ type: "UNSET" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    const newAnecdote = {
      content,
      votes: 0,
    };

    newAnecdoteMutation.mutate(newAnecdote);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
