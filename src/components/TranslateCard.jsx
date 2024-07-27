import extendDownIcon from "../assets/images/Expand_down.svg";
import soundIcon from "../assets/images/sound_max_fill.svg";
import copyIcon from "../assets/images/Copy.svg";
import translateIcon from "../assets/images/Sort_alfa.svg";
import switchIcon from "../assets/images/Horizontal_top_left_main.svg";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { TranslateContext } from "../App";
import { translateAPIs } from "../service/translate";

const TranslateCard = ({ isResult = false }) => {
  const activeClassSelected = 'bg-color_3 rounded-2xl text-color_5 px-4 py-2 text-center';
  const [load,setLoad] = useState(false);
  const {transle, setTranslate} = useContext(TranslateContext);
  // const [text, setText] = useState('Hello, how are you?');
  const maxLength = 500;
   // Handle change in textarea input
   const handleChange = (event) => {
    const newText = event.target.value;
    // Update the text state only if it doesn't exceed the max length
    if (newText.length <= maxLength) {
      // setText(newText);
      setTranslate(prevState=>({...prevState, currentInputValue: newText}));
    }
  };
  const fetchTranslate = async()=>{
    setLoad(true);
     let data =  await translateAPIs(transle.currentInputValue,transle.currentInputTranslte+'|'+transle.currentTrageToTransalte);
     let transleResult = data.responseData.translatedText;
     setTranslate(prevState=>({...prevState, currentResulteValue: transleResult}));
     setLoad(false);
  }
    const setCurrentSelectdLang = (lang)=>{
      if(isResult){
        setTranslate(prevState=>({...prevState, currentTrageToTransalte: lang}));
      }else{
        setTranslate(prevState=>({...prevState, currentInputTranslte: lang}));
      }
    }
    const replaceTranslateLang = ()=>{
      setTranslate(prevState=>({
        ...prevState,
        currentInputTranslte: prevState.currentTrageToTransalte,
        currentTrageToTransalte:prevState.currentInputTranslte,
        currentInputValue: prevState.currentResulteValue,
        currentResulteValue: prevState.currentInputValue,
      }));
    }
    const copyTextToClipboard = ()=> {
      let copyText = '';
      if(!isResult){
        copyText = transle.currentInputValue
      }else{
        copyText = transle.currentResulteValue
      }
      navigator.clipboard.writeText(copyText??'')
        .then(() => {
          console.log('Text copied to clipboard');
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    }
    const speackText = ()=>{
      let selectedText = '';
      if(!isResult){
        selectedText = transle.currentInputValue
      }else{
        selectedText = transle.currentResulteValue
      }
      const utterance = new SpeechSynthesisUtterance(selectedText);
      utterance.lang = 'en-US'; // Language (e.g., 'en-US' for American English)
      utterance.pitch = 1; // Pitch (0 to 2, where 1 is default)
      utterance.rate = 1; // Rate (0.1 to 10, where 1 is default)

      window.speechSynthesis.speak(utterance);
    }
  return (
    <>
      <div className={`grid  grid-flow-row gap-1 border-2 rounded-3xl p-6 border-color_3 ${isResult?'bg-color_9':'bg-color_8'} w-[550px] aspect-video`}>
        <div className="flex text-color_3   font-semibold font-sans text-sm border-b-2 border-color_3 pb-4 ">
          <div className="flex gap-6 items-center flex-1">
            {!isResult && <p>Detect Language</p>}
            <p 
            onClick={()=>setCurrentSelectdLang('en')}
            className={(!isResult && transle.currentInputTranslte ==='en' )|| (isResult && transle.currentTrageToTransalte ==='en' )? activeClassSelected:''}>
              English
            </p>
            <p  
            onClick={()=>setCurrentSelectdLang('fr')}
            className={`${(isResult && transle.currentTrageToTransalte ==='fr')||(!isResult && transle.currentInputTranslte ==='fr') ? activeClassSelected:''}' cursor-pointer hover:bg-color_3 hover:rounded-2xl hover:text-color_5 hover:px-4 hover:py-2 hover:text-center`}>
              French 
            </p>
            <div className="flex gap-1">
              <p 
              onClick={()=>setCurrentSelectdLang('es')}
              className={`${(isResult && transle.currentTrageToTransalte ==='es')||(!isResult && transle.currentInputTranslte ==='es') ? activeClassSelected:''}' cursor-pointer hover:bg-color_3 hover:rounded-2xl hover:text-color_5 hover:px-4 hover:py-2 hover:text-center`}>
                Spanish
              </p>
              <img

                src={extendDownIcon}
                alt="choose anthor lang"
                className="w-5"
              />
            </div>
          </div>
          {isResult && (
            <img
              onClick={replaceTranslateLang}
              src={switchIcon}
              alt="switch-icon"
              className=" border-color_3 rounded-xl p-2 border-2 cursor-pointer"
            />
          )}
        </div>

        {isResult ? (
          <div className="bg-transparent w-[95%] h-[250px] justify-self-start text-color_5 border-none focus:outline-none px-4 py-2 font-sans">
            {transle.currentResulteValue}
          </div>
        ) : (
        <>
          <textarea
          maxLength={500}
          value={transle.currentInputValue}
                 // Set the value of the textarea
          onChange={handleChange} // Update state on change
          className="resize-none bg-transparent w-[95%] h-[200px] justify-self-start text-color_5 border-none focus:outline-none px-4 py-2 font-sans">

            
          </textarea>
         <p className="text-color_4 text-sm text-right py-2"> {transle.currentInputValue.length}/{maxLength}</p>
          </>
        )}

        <div className="flex gap-2">
          <div className="flex-1 flex gap-3">
            <img
            onClick={speackText}
              src={soundIcon}
              alt="sound-icon"
              className=" self-center   border-color_3 rounded-xl p-2 border-2 cursor-pointer"
            />
            <img
               onClick={copyTextToClipboard}
              src={copyIcon}
              alt="sound-icon"
              className="self-center  border-color_3 rounded-xl p-2 border-2 cursor-pointer"
            />
          </div>
          {!isResult && (
            <button
            onClick={fetchTranslate}
              type="button"
              disabled={load}
              className="ml-auto cursor-pointer disabled:bg-color_7 disabled:cursor-progress flex gap-2 text-color_5 bg-color_6 py-3 px-4 rounded-lg border-color_7  border-2"
            >
             { !load && <><img src={translateIcon} alt="translate-icone" /> Translate</>}
             { load && <>loading...</>}

            </button>
          )}
        </div>
      </div>
    </>
  );
};

TranslateCard.propTypes = {
  isResult: PropTypes.bool,
};

export default TranslateCard;
