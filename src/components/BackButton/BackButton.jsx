import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate()
    const handleClick = () => navigate(-1)
  return (
      <>
       <button className="btn btn-outline-secondary" onClick={handleClick}><i className="bi bi-caret-left-fill"></i></button>
      </>

  );
};

export default BackButton;
