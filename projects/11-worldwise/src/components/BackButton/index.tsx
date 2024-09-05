import Button from "@components/Button";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button type="button" variant="back" onClick={() => navigate(-1)}>
      &larr; Back
    </Button>
  );
}

export default BackButton;
