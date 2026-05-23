import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import OpCmd from "./OpCmd";
import ItemDetail from "./ItemDetail";
import { useForm } from "react-hook-form";

function ItemEdit() {
  const { id } = useParams();
  let itid = parseInt(id);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm();

  /**
   * @param {import("react-hook-form").FieldValues} data The data.
   */
  const updateCallback = async data => {
    await supabase
      .from('Items')
      .update({
        Name: data.Name,
        CategoryId: parseInt(data.Category),
        Notes: data.Notes,
        BoughtAt: new Date(data.DateBought).toISOString(),
        ExpireDate: new Date(data.Life).toISOString(),
      })
      .eq('Id', itid);
    navigate('/View');
  };

  return (
    <Form onSubmit={handleSubmit(updateCallback)}>
      <ItemDetail
        categoryId="Category"
        nameId="Name"
        dateBId="DateBought"
        dateEId="Life"
        notesId="Notes"
        register={register}
        errors={errors}
        id={itid}
      />
      <OpCmd
        identity={id}
        table="Items"
      />
    </Form>
  );
}

export default ItemEdit;