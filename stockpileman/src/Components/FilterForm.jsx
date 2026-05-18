import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { supabase } from '../client';

function FilterForm() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [category, setCategory] = useState(searchParam.get('category'));
  const [phrase, setPhrase] = useState(searchParam.get('q'));
  const [categories, setCategories] = useState([]);
  const [duration1, setDuration1] = useState(searchParam.get('d1'));
  const [duration2, setDuration2] = useState(searchParam.get('d2'));

  useEffect(
    () => {
      const getCategories = async () => {
        const { data, error } = await supabase
          .from('Categories')
          .select();

        if (!data) {
          console.error(error);
        } else {
          setCategories(data.map(value => value.Name));
        }
      };
      getCategories();
    }
  )

  /**
   * @param {FormData} formData The form data submitted.
   */
  const submitData = formData => {
    setSearchParam({
      category: formData.get('category'),
      q: formData.get('q'),
      d1: formData.get('d1'),
      d2: formData.get('d2'),
    });
  };

  return (
    <>
      <Form action={submitData}>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>名称</Form.Label>
          <Form.Select name="category" value={category} onChange={event => setCategory(event.target.value)}>
            {categories.map(value => (
              <option value={value}>{value}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="q">
          <Form.Label>商品名</Form.Label>
          <Form.Control name="q" value={phrase} onChange={event => setPhrase(event.target.value)} />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="d1">
            <Form.Label>期間（開始日・賞味期限）</Form.Label>
            <Form.Control value={duration1} onChange={event => setDuration1(event.target.value)} type="date" />
          </Form.Group>
          <Form.Group as={Col} controlId="d2">
            <Form.Label>期間（終了日・賞味期限）</Form.Label>
            <Form.Control type="date" value={duration2} onChange={event => setDuration2(event.target.value)} />
          </Form.Group>
        </Row>
        <Button type="submit" variant="primary">検索</Button>
      </Form>
    </>
  );
}

export default FilterForm;