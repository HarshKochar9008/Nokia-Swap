import { useState } from 'react'
import { useAccount } from 'wagmi'
import phone from './assets/phone.png'
import './App.css'
import SnakeGame from './SnakeGame.jsx'
import Menu from './components/Menu.jsx'
import DialerDisplay from './components/Dialer/Display.jsx'
import DialerActions from './components/Dialer/Actions.jsx'
import DialerKeypad from './components/Dialer/Keypad.jsx'
import Clock from './components/Clock.jsx'
import Settings from './components/Settings.jsx'

function App() {
  const [digits, setDigits] = useState("")
  const [mode, setMode] = useState('menu') // 'menu' | 'dialer' | 'snake' | 'clock' | 'settings'
  const { isConnected } = useAccount()

  const press = (value) => {
    setDigits((prev) => (prev + value).slice(-20))
  }

  const clearAll = () => {
    setDigits("")
  }

  const makeCall = () => {
    if (digits) {
      alert(`Calling ${digits}...`)
    } else {
      alert("Please enter a number first")
    }
  }

  const goHome = () => {
    setMode('menu')
  }

  const deleteLast = () => {
    setDigits((prev) => prev.slice(0, -1))
  }

  return (
    <>
        <div className="phone">
          <img src={phone} alt="phone" />
          <div className="overlay">
            <div className="screen">
              {mode === 'dialer' && (
                <DialerDisplay digits={digits} />
              )}
              {mode === 'menu' && (
                <Menu
                  onOpenSnake={() => setMode(isConnected ? 'snake' : 'menu')}
                  onOpenDialer={() => setMode('dialer')}
                  onOpenClock={() => setMode('clock')}
                  onOpenSettings={() => setMode('settings')}
                  onConnected={() => setMode('snake')}
                />
              )}
              {mode === 'snake' && (
                <div className="snake-wrapper">
                  {isConnected ? (
                    <SnakeGame onExit={() => setMode('menu')} />
                  ) : (
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',color:'#fff'}}>Connect a wallet to play.</div>
                  )}
                </div>
              )}
              {mode === 'clock' && (
                <Clock />
              )}
              {mode === 'settings' && (
                <Settings />
              )}
            </div>
            {mode === 'dialer' ? (
              <DialerActions
                onCall={makeCall}
                onClearAll={clearAll}
                onDelete={deleteLast}
                onHome={goHome}
              />
            ) : (
              <div className="action-buttons">
                <button className="action-btn home-btn" onClick={goHome} title="Home"></button>
              </div>
            )}
            {mode === 'dialer' && (
              <DialerKeypad onPress={press} />
            )}
          </div>
        </div>
    </>
  )
}

export default App
