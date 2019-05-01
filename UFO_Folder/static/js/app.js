// from data.js
var tableData = data;

const btnSubmit = d3.select("#filter-btn")

//event Listener for submit button
btnSubmit.on("click",handleClick)

function handleClick(){

//prevent the default action of browser i,e to refresh
    d3.event.preventDefault()
    
    
// assigning  the user input values to variables
    const inptValDate = d3.select("#datetime").property('value')
    const inptValCity = d3.select("#city").property('value').toLowerCase()
    const inptValState = d3.select("#state").property('value').toLowerCase()
    const inptValCountry = d3.select("#country").property('value').toLowerCase()
    //const inptValShape = d3.select("#shape").property('value')
    
    const tbody = d3.select("tbody")//selecting the table body for appending the row
    tbody.html("") // initializing the table body
   
// initializing & creating an object with all the  input values for comparison in the filter
    const inptFilter={}
     if (inptValDate !== ""){
        inptFilter["datetime"]=inptValDate
    }
    if (inptValCity !== ""){
        inptFilter["city"]=inptValCity
    }
    if (inptValState !== ""){
        inptFilter["state"]=inptValState
    }
    if (inptValCountry !== ""){
        inptFilter["country"]=inptValCountry
    }
    console.log(inptFilter)

   
//filtering the Data based on the fields in the input value object created above(inptFilter) after checking if no query values have been entered
    const  ufoData = tableData.filter(val =>{
        for ( let key in inptFilter) {
            if (val[key] === undefined ||  val[key] != inptFilter[key])
                return false
            }
            return true
        })
    
        console.log(ufoData)

//appending rows to the table with the filtered data
        ufoData.forEach(val =>{
            const row = tbody.append('tr')
            for (key in val){
                row.append('td').text(val[key])
            }
        })

//message display in case no data found
        if (ufoData.length < 1){
            let head= d3.select("#no-rec").text("......Aliens were taking a Break, No record found!!")
        }
        
//initalizing the nodes for next search
        d3.select("#datetime").node().value=""
        d3.select("#city").node().value=""
        d3.select("#state").node().value=""
        d3.select("#country").node().value=""

    
} // closing brace for the handle Click
