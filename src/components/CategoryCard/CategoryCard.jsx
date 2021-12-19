// import "./Category.css";

const CategoryCard = (props) => {
  const { text, img } = props;

//   const style = {
//     backgroundImage: `url(${img})`, //We use the last image as props for inline styling
//     backgroundSize: "cover",
//   };

  return (
      <>
        <div className="card h-100">
            <img src={img} className="card-img-top" alt={text} />
            <div className="text-center mt-1">
                <p className="card-title text-body fw-bold">{text}</p>
            </div>
        </div>
      </>

  );
};

export default CategoryCard;
