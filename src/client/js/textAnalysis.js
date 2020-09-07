import 'regenerator-runtime/runtime'
//const fetch = require('node-fetch');

/* Function called on submit event */
function textAnalysisCall(){
    event.preventDefault();
    let text=document.getElementById('txt').value;
    getAPIKey().then(function(keyDetails){
        let data=`key=${keyDetails.key}&of=JSON&lang=${keyDetails.lang}&txt=${text}`;
        textAnalysis(keyDetails.baseURL,data).then(function(data){
            updateUI(data);
        });
});
}


/* Function to GET API Credentials*/
const getAPIKey= async ()=>{
    const response=await fetch('http://localhost:3000/key');
    try{
        const keyDetails=await response.json();
        return keyDetails;
    }catch(error){
        console.log('error',error);
    }
}


/*POST function to return the API Response */
const textAnalysis=async (url='',data='')=>{
    const response= await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body:data
    });
    try{
        const newData= await response.json();
        return newData;
    }catch(error){
        console.log('error',error);
    }
}


const updateUI=async(data={})=>{
    try{
    document.getElementById('results').innerHTML=`Your given statement is: ${data.subjectivity} and it belongs to model: ${data.model}`;
    }catch(error){
        console.log('error',error);
    }
}

export{ textAnalysis ,textAnalysisCall ,updateUI,getAPIKey}