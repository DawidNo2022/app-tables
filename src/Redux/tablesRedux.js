import { API_URL } from '../config';
//selectors
export const getAllTables = ({ tables }) => tables.data;
export const getIdTable = ({ tables }, tableId) =>
  tables.data.find((table) => table.id === tableId);
export const dataIsLoading = (state) => state.tables.dataIsLoading;
export const error = (state) => state.tables.error;
// actions
const createActionName = (actionName) => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const FETCH_START = createActionName('FETCH_START');
const FETCH_ERROR = createActionName('FETCH_ERROR');

// action creators
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const editTable = (payload) => ({ type: EDIT_TABLE, payload });
export const fetchStart = (payload) => ({ type: FETCH_START, payload });
export const fetchError = (payload) => ({ type: FETCH_ERROR, payload });

export const fetchTables = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    fetch(`${API_URL}/tables`).then((res) =>
      res
        .json()
        .then((tables) => dispatch(updateTables(tables)))
        .catch((error) =>
          dispatch(fetchError(error.message || 'Data not loaded'))
        )
    );
  };
};

export const updateTableRequest = (tableInfo) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        status: tableInfo.status,
        peopleAmount: tableInfo.peopleAmount,
        maxPeopleAmount: tableInfo.maxPeopleAmount,
        bill: tableInfo.bill,
        id: tableInfo.id,
      }),
    };
    dispatch(fetchStart());
    fetch(`${API_URL}/tables/${tableInfo.id}`, options)
      .then(() => dispatch(editTable(tableInfo)))
      .catch((error) =>
        dispatch(fetchError(error.message || 'Data wrong loaded'))
      );
  };
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return { data: action.payload, DataIsLoading: false, error: false };
    case EDIT_TABLE:
      return {
        data: statePart.data.map((table) =>
          table.id === action.payload.id ? action.payload : table
        ),
        DataIsLoading: false,
        error: false,
      };
    case FETCH_START:
      return { ...statePart, DataIsLoading: true, error: false };
    case FETCH_ERROR:
      return { ...statePart, DataIsLoading: false, error: action.payload };

    default:
      return statePart;
  }
};
export default tablesReducer;
