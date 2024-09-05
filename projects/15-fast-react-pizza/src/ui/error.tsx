import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from 'react-router-dom';
import Button from './button';

function Error() {
  const navigate = useNavigate();
  const error = useRouteError() as Error;

  return (
    <div className="p-4">
      <h1>Something went wrong 😢</h1>
      <p className="py-4 text-xl">
        {isRouteErrorResponse(error) ? error.data : error.message}
      </p>
      <Button variant="link" onClick={() => navigate(-1)}>
        &larr; Go back
      </Button>
    </div>
  );
}

export default Error;
