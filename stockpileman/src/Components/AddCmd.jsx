import Button from 'react-bootstrap/Button';
import { supabase } from '../client';

/**
 * Adding the entry to the database.
 * @param {object} id The inserting data.
 * @param {string} table The name of table.
 */
async function AddEntry(data, table) {
  await supabase
    .from(table)
    .insert(data);
}

function AddCmd(props) {
  /**
   * The name of the table.
   * @type {string}
   */
  const table = props.table;
  /**
   * The data to be inserted.
   * @type {object}
   */
  const data = props.data;

  return (
    <>
      <Button
        variant="success"
        onClick={() => AddEntry(data, table)}
      >
        登録
      </Button>
    </>
  );
}

export default AddCmd;