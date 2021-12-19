const Card2 = (props) => {
  const { text, img } = props;

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

export default Card2;
