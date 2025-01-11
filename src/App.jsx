import anecdotesService from "./services/anecdotes";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  // Retrieve anecdotes from server using React Query (tanstack)
  const anecdotesQuery = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdotesService.getAll,
  });

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

  console.log(anecdotes);

  const handleVote = (anecdote) => {
    console.log("vote");
  };

  // const anecdotes = [
  //   {
  //     content: "If it hurts, do it more often",
  //     id: "47145",
  //     votes: 0,
  //   },
  // ];

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
