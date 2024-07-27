import { createContext, useState } from 'react';
import './App.css'
import logo from './assets/images/logo.svg'
import TranslateCard from './components/TranslateCard';
export const TranslateContext = createContext(null);
function App() {
  const [transle, setTranslate] = useState({
    currentInputTranslte:'en',
    currentTrageToTransalte:'fr',
    currentInputValue:'Hello, how are you?',
    currentResulteValue:'Bonjour, comment allez-vous ?'
  });
  return (
    <TranslateContext.Provider value={{ transle, setTranslate }}>
      <div className='grid justify-center pt-28 gap-10 font-sans '>
        <img src={logo} alt='logo' className='justify-self-center' />
        <div className='grid  gap-5 grid-flow-row xl:grid-flow-col'>
        <TranslateCard/>
        <TranslateCard isResult={true}/>
        </div>
      </div>
    </TranslateContext.Provider>
  
    
  )
}

export default App
