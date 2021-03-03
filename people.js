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
    if(stateAbbrv == undefined) throw 'State must be provided';
    if(typeof stateAbbrv != 'string') throw 'Input must be a string';
    if(stateAbbrv.length != 2) throw 'Abbreviation must be in the form of a state name';
    
    
    const {data}  = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    let stateCount = 0;
    for (const element of data){
        if(element.address.state == stateAbbrv){
            stateCount++;
        }
    }

    if (stateCount < 1) throw 'No valid residents of given state';
    return stateCount;
}

function calculateAge(date){
    const dateList = date.split('/');
    let dateX = new Date()
    let age = dateX.getFullYear() - dateList[2];
    if(dateX.getMonth()+1 < dateList[0] || (dateX.getMonth()+1 == dateList[0] && dateX.getDate() < dateList[1])){
        age = age -1;
    }
    return age;
}




async function personByAge(index){
    if(index == undefined) throw 'Index must be provided';
    if(isNaN(index)) throw 'Index must be a number';
    if(index < 0) throw 'Index must be a positive number'
    
    const {data}  = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    if (index > Object.keys(data).length) throw 'Id out of bounds';
    let sorted = data.sort(function(a,b){
        let aList = a.date_of_birth.split('/');
        let bList = b.date_of_birth.split('/');
        if(aList[2] == bList[2]){
            if(aList[0] == bList[0]) return parseInt(aList[1], 10) - parseInt(bList[1], 10);
            return parseInt(aList[0], 10) - parseInt(bList[0], 10);
        }
        return parseInt(aList[2], 10) - parseInt(bList[2], 10);

    });
    let retObj = {};
    retObj.first_name = sorted[index].first_name;
    retObj.last_name = sorted[index].last_name;
    retObj.date_of_birth = sorted[index].date_of_birth;
    retObj.age = calculateAge(sorted[index].date_of_birth);
    return retObj;
}




module.exports = {
    getPeople,
    getPersonById,
    howManyPerState,
    personByAge
};
