import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import TableForm from './components/pages/TableForm/TableForm';
import PageNotFound from './components/pages/PageNotFound';
import { Container } from 'react-bootstrap';
import Header from './components/views/Header.js';
import Footer from './components/views/Footer';
import { useDispatch } from 'react-redux';
import { fetchTables } from './Redux/tablesRedux';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);
  return (
    <Container>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/table/:id' element={<TableForm />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
