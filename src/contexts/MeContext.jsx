import React from 'react';

const MeContext = React.createContext();

export const MeProvider = ({ children }) => {
  const [me, setMe] = React.useState(null);

  function fetchMe(user) {
    setMe(user)
  }
  return (
    <MeContext.Provider
      value={{
        me,
        fetchMe
      }}
    >
      {children}
    </MeContext.Provider>
  )
}

export const useMeContext = () => React.useContext(MeContext);