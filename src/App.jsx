import anecdotesService from "./services/anecdotes";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const App = () => {
  /* REACT QUERY */
  const queryClient = useQueryClient();

  // Retrieve anecdotes from server using React Query (tanstack)
  const anecdotesQuery = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdotesService.getAll,
  });

  // Create mutation for updating anecdotes
  const updateAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  /* GUARD STATEMENTS */

  // When loading
  if (anecdotesQuery.isPending) {
    return <div>Loading data from server...</div>;
  }

  // When error
  if (anecdotesQuery.isError) {
    return <div>There was an error fetching anecdotes from the server</div>;
  }

  // When success
  const anecdotes = anecdotesQuery.data;

  const handleVote = (anecdote) => {
    // Perform the vote
    const anecdoteVoted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    // Use a mutation tu update the voted anecdote
    updateAnecdoteMutation.mutate(anecdoteVoted);
    // --> the mutation should sync the server with the state of the front end, triggering a rerender
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
