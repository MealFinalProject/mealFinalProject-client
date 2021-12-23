import "./Card1.css";

const Card1 = (props) => {
  const { text, img } = props;

  const style = {
    backgroundImage: `url(${img})`, //We use the last image as props for inline styling
    backgroundSize: "cover",
  };

  return (
    <div className="d-flex justify-content-center">
       <div className="d-flex justify-content-center">
        <div className="Card1 d-flex align-items-end m-0 " style={style}>
          <p className=" m-2 text-left text-white font-weight-bold">{text}</p>
        </div>
      </div>
    </div>
   
   
  );
};

export default Card1;
