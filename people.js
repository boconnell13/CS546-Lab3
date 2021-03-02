const axios = require("axios");

async function getPeople(){
    const  {data}  = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    const parsedData = data[1];  // parse the data from JSON into a normal JS Object
    return  parsedData ; // this will be the array of people objects
  }

async function getPersonById(id){
    if(id == undefined) throw 'Id must be given';
    if (isNaN(id)) throw 'Id must be a number';
    if(id < 0) throw 'Id must be a positive number';
    
    
    const {data}  = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    if (id > Object.keys(data).length) throw 'Id out of bounds';
    for(const element of data){
        if(element.id == id ){
            return element;
        }
    }
}

async function howManyPerState(stateAbbrv){
    const {data}  = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    let stateCount = 0;
    for (const element of data){
        if(element.address.state == stateAbbrv){
            stateCount++;
        }
    }

    return stateCount;
}




module.exports = {
    getPeople,
    getPersonById,
    howManyPerState
};
