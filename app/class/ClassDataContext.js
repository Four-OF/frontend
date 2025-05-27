import { createContext } from 'react';

const ClassDataContext = createContext({
  userId: null,
  userName: null,
  userEmail: null,
  refreshData: () => {},
});

export default ClassDataContext;
