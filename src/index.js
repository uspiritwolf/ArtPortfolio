import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import App from './App'

import { state } from './State'
import { useSnapshot } from 'valtio'

function Overlay() {
  const snap = useSnapshot(state)
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <a href="https://www.artstation.com/riiakarpenkoo" style={{ position: 'absolute', bottom: 65, left: 90, fontSize: '17px' }}>
        Art: riiakarpenkoo
      </a>
      <a href="https://github.com/uspiritwolf" style={{ position: 'absolute', bottom: 35, left: 90, fontSize: '17px' }}>
        Dev: Oleksii Chernykh
      </a>
      <div className="shadowText" style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '17px' }}>05/27/2023</div>
      { snap.currentPage > 0 && 
      <button className="buttonnext" style={{ position: 'absolute', bottom: '50%', left: 120, pointerEvents:'auto'}} onClick={() => state.currentPage -= 1 }>
        PREV
      </button> }
      { snap.currentPage < (snap.pages.length - 1) && <button className="buttonnext" style={{ position: 'absolute', bottom: '50%', right: 120, pointerEvents:'auto'}} onClick={() => state.currentPage += 1 } >
        NEXT
      </button> }
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Overlay />
  </React.StrictMode>
);
