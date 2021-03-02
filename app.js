const people = require("./people");

async function main(){
    try{
        //const peopledata = await people.getPeople();
        //console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    try{
        //const peopledata = await people.getPersonById(4);
        //console.log(peopledata);
    }catch(e){
        console.log(e);
    }

    try{
        const peopledata = await people.howManyPerState('WY');
        console.log(peopledata);
    }catch(e){
        console.log(e);
    }
}

//call main
main();