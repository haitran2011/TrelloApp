import React from 'react'
import { useMeContext } from '../../contexts/MeContext'

function MainLayout({ children }) {
  const { me } = useMeContext();
  
  return (
    <>
      <header>
        <div className="header__container">
          <div className="header__logo" />
          <div className="header__right">
            <div>{me?.email}</div>
            <div className="header__avatar">
              <img src="/assets/images/avatar.png" alt="Avatar" />
            </div>
          </div>
        </div>
      </header>

      <main>
        {children}
      </main>
    </>
  )
}

export default MainLayout