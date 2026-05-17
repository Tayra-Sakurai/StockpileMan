import { Button } from "react-bootstrap";
import supabase from '../client';

/**
 * Deletes the data.
 * @param {number} id The identifier of the element.
 * @param {string} table The name of the table.
 */
async function DeleteData(id, table) {
  await supabase
    .from(table)
    .delete()
    .eq('Id', id);
}

/**
 * Updates the data.
 * @param {string} table The name of the table.
 * @param {object} data The data to be updated.
 */
async function UpdateData(table, data) {
  await supabase
    .from(table)
    .upsert(data);
}

function OpCmd(props) {
  /**
   * @type {object}
   */
  const data = props.data;
  /**
   * The identifier.
   * @type {number}
   */
  const id = props.id;
  /**
   * The table's name.
   * @type {string}
   */
  const table = props.table;

  return (
    <>
      <Button
        variant="danger"
        onClick={async () => await DeleteData(id, table)}
      >
        使用
      </Button>
      <Button
        variant="primary"
        onClick={async () => await UpdateData(table, data)}
      >
        更新
      </Button>
    </>
  );
}

export default OpCmd;