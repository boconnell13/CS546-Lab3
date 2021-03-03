const people = require("./people");

async function main(){
    try{
        //const peopledata = await people.getPeople();
        //console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    try{
        //const peopledata = await people.getPersonById(43);
        //console.log(peopledata);
    }catch(e){
        console.log(e);
    }

    try{
        //const peopledata = await people.howManyPerState('WY');
       // console.log(peopledata);
    }catch(e){
        console.log(e);
    }

    try{
        const data = await people.personByAge(999);
        console.log(data);
    }catch(e){
        console.log(e)
    }
}

//call main
main();