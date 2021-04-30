const ShowSaladItems = ({ salad }) => {
  const listItems = salad.map((item, index) =>
       <li key={index}>{item}</li>
   );

  return (
    <ul className="saladItems">
      {listItems}
    </ul>
  );
};
export default ShowSaladItems;
