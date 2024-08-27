import { useState, useEffect } from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';
import Loading from './Loading';
import Error from './Error';

const CommentArea = (props) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        let response = await fetch(
          `https://striveschool-api.herokuapp.com/api/comments/${props.asin}`, 
          {
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGVjMGYyNjBjYzAwMTVjYzBkY2UiLCJpYXQiOjE3MjE5Nzg1NjAsImV4cCI6MTcyMzE4ODE2MH0.lPO9bA4QC0YkEcPGbR3IJp3ErnZLJzJ4AHh4CmL1PqE",
            },
          }
        );

        if (response.ok) {
          let data = await response.json();
          setComments(data);
          setIsLoading(false);
        } else {
          setIsError(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    if (props.asin) {
      fetchComments();
    }
  }, [props.asin]); // Aggiungi props.asin come dipendenza

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      {!isLoading && !isError && (
        <>
          <AddComment asin={props.asin} />
          <CommentList commentsToShow={comments} />
        </>
      )}
    </div>
  );
}

export default CommentArea;
