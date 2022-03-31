import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  getIdTable,
  updateTableRequest,
  dataIsLoading,
} from '../../../Redux/tablesRedux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shortid from 'shortid';
import MySpinner from '../MySpinner';
import PageNotFound from '../PageNotFound.js';

const TableForm = () => {
  const { id } = useParams();

  const table = useSelector((state) => getIdTable(state, parseInt(id)));

  console.log(table);

  const [status, setStatus] = useState(table.status);

  const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount);

  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount);

  const [bill, setBill] = useState(table.bill);

  const statusTables = ['Busy', 'Cleaning', 'Free', 'Reserved'];

  const possibleStatus = statusTables.filter(
    (statusTable) => statusTable !== status
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    //e.preventDefault();
    dispatch(
      updateTableRequest({ status, peopleAmount, maxPeopleAmount, bill, id })
    );
    navigate('/');
  };

  const updateStatusHandler = (e) => {
    if (e.target.value === 'Busy') {
      setBill('0');
    } else if (e.target.value === 'Free' || e.target.value === 'Cleaning') {
      setPeopleAmount('0');
    }
    setStatus(e.target.value);
  };

  const handlerPeopleAmount = (e) => {
    if (e.target.value > maxPeopleAmount) {
      alert('You must change max people amount in the table too');
    } else {
      setPeopleAmount(e.target.value);
    }
  };

  const handlerMaxPeopleAmount = (e) => {
    if (e.target.value < peopleAmount) {
      setPeopleAmount(e.target.value);
    }
    setMaxPeopleAmount(e.target.value);
  };
  const TablesIsLoading = useSelector(dataIsLoading);
  return (
    <>
      {TablesIsLoading && <MySpinner />}
      {!TablesIsLoading && !table && <PageNotFound />}
      {!TablesIsLoading && table && (
        <>
          <h1>Table {table.id}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <div className='d-flex justify-content-start align-items-center mt-3'>
                <Form.Label className='fw-bold  '>Status:</Form.Label>
                <div style={{ width: 160, marginLeft: 50 }}>
                  <Form.Select onChange={updateStatusHandler}>
                    <option value={status}>{status}</option>
                    {possibleStatus.map((statusTable) => (
                      <option key={shortid()} value={statusTable}>
                        {statusTable}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
            </Form.Group>
            <Form.Group>
              <div className='d-flex justify-content-start align-items-center mt-3'>
                <div>
                  <Form.Label className='fw-bold '>People :</Form.Label>
                </div>
                <div style={{ width: 110, marginLeft: 45 }}>
                  <Form.Control
                    type='number'
                    min='0'
                    max='10'
                    value={peopleAmount}
                    onChange={handlerPeopleAmount}
                  />
                </div>
                <p className='mx-2 mt-3'>/</p>
                <div>
                  <Form.Control
                    type='number'
                    value={maxPeopleAmount}
                    min='0'
                    max='10'
                    onChange={handlerMaxPeopleAmount}
                  />
                </div>
              </div>
            </Form.Group>
            {status === 'Busy' && (
              <Form.Group>
                <div className='d-flex justify-content-start align-items-center mt-3'>
                  <div>
                    <Form.Label className='fw-bold '>Bill:</Form.Label>
                  </div>
                  <p className='mx-2 mt-3'>$</p>
                  <div style={{ width: 110, marginLeft: 50 }}>
                    <Form.Control
                      type='text'
                      value={bill}
                      onChange={(e) => setBill(e.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>
            )}
            <Button type='submit'>Update</Button>
          </Form>
        </>
      )}
    </>
  );
};
export default TableForm;
