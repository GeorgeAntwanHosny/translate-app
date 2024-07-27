export const translateAPIs = async (query ='Hello, how are you?',lang = 'en|fr')=>{
   let responseData =  await fetch(`https://api.mymemory.translated.net/get?q=${query}&langpair=${lang}`);
   let data = responseData.json();
   return data;
}