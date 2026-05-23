import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import OpCmd from "./OpCmd";
import ItemDetail from "./ItemDetail.jsx";
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
  } = useForm({
    async defaultValues() {
      const {
        data: [entry],
        error,
      } = await supabase
        .from('Items')
        .select()
        .eq('Id', itid);
      if (!entry) {
        console.error(error);
        return;
      }
      else {
        return {
          Category: entry.CategoryId.toString(),
          Name: entry.Name,
          DateBought: new Date(entry.BoughtAt).toISOString().replace(/T.*$/i, ''),
          Life: new Date(entry.ExpireDate).toISOString().replace(/T.*$/i, ''),
          Notes: entry.Notes,
        };
      }
    },
  });

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
      />
      <OpCmd
        identity={id}
        table="Items"
      />
    </Form>
  );
}

export default ItemEdit;