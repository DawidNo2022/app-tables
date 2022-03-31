import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllTables } from '../../Redux/tablesRedux';
import MySpinner from './MySpinner';
import { dataIsLoading } from '../../Redux/tablesRedux';

const Home = () => {
  const tables = useSelector((state) => getAllTables(state));

  const TablesIsLoading = useSelector(dataIsLoading);
  return (
    <>
      <div className='d-flex justify-content-between'>
        <h1>All tables</h1>
      </div>
      {TablesIsLoading && <MySpinner />}
      {!TablesIsLoading && (
        <>
          {tables.map((table) => (
            <div
              key={table.id}
              className='d-flex border-bottom align-items-center'
            >
              <h3 className='m-0'>Table {table.id}</h3>
              <p className='ps-4 m-0'>
                <span className='fw-bold'>Status: </span>
                {table.status}
              </p>
              <Link className='ms-auto p-2' to={`/table/${table.id}`}>
                <Button>Show more</Button>
              </Link>
            </div>
          ))}
        </>
      )}
    </>
  );
};
export default Home;
