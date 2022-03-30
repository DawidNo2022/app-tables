import { Spinner } from 'react-bootstrap';
const MySpinner = () => {
  return (
    <Spinner animation='border' role='status'>
      <span>Loading...</span>
    </Spinner>
  );
};
export default MySpinner;
