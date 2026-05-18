import { Link } from "react-router-dom";

function ItemRow(props) {
  const dId = props.dataId;
  const name = props.name;
  const category = props.category;
  const expireDate = new Date(props.expireDate).toISOString().replace(/T.*$/, '');

  return (
    <tr>
      <td>{dId}</td>
      <td>{category}</td>
      <td>{name}</td>
      <td>{expireDate}</td>
      <td>
        <Link to={`/Edit/${dId}`}>編集</Link>
      </td>
    </tr>
  );
}

export default ItemRow;