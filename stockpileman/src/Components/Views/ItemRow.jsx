import { Link } from "react-router-dom";

function ItemRow(props) {
  const dId = props.dataId;
  const name = props.name;
  const category = props.category;
  const notes = props.notes;

  return (
    <tr>
      <td>{dId}</td>
      <td>{category}</td>
      <td>{name}</td>
      <td>{notes}</td>
      <td>
        <Link to={`/Edit/${dId}`}>編集</Link>
      </td>
    </tr>
  );
}

export default ItemRow;