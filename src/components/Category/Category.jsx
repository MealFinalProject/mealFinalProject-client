import "./Category.css";

const Category = (props) => {
  const { text, img } = props;

  const style = {
    backgroundImage: `url(${img})`, //We use the last image as props for inline styling
    backgroundSize: "cover",
  };

  return (
    <div className="Category d-flex align-items-end" style={style}>
      <p className=" m-2 text-left text-white font-weight-bold">{text}</p>
    </div>
  );
};

export default Category;
