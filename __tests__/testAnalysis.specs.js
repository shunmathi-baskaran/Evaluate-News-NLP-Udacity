import { textAnalysis,getAPIKey, textAnalysisCall } from '../src/client/js/textAnalysis.js'
//const fetch = require('node-fetch');

let credentials={
    key:process.env.MEANINGCLOUD_API_KEY,
    lang:'en',
    baseURL:'https://api.meaningcloud.com/sentiment-2.1'
};
let params=`key=${credentials.key}&of=JSON&lang=${credentials.lang}&txt='I love FootBall'`;



//test case for getAPIKey()
textAnalysis.getAPIKey=jest.fn();
textAnalysis.getAPIKey.mockReturnValue(credentials);

test('the credentials is correct',async () => {
    const data=await textAnalysis.getAPIKey();
    expect(data).toStrictEqual(credentials);
});


//test case for the post api call to meaningcloud api
textAnalysis.textAnalysis=jest.fn();
textAnalysis.textAnalysis.mockReturnValue("SUBJECTIVE");

test('call to the api',async () => {
    const data=await textAnalysis.textAnalysis(credentials.baseURL,params);
    expect(data).toBe('SUBJECTIVE');
});

