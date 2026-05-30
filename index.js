// Serach button working
const searchbutton = document.getElementById("Searchbutton")

// let input  = document.getElementById("username").value  // Wrong because if the page load the input box is empty.

let name 
searchbutton.addEventListener("click",() =>{
    const input  = document.getElementById("username")
    name = input.value
    console.log(name)
    userdata(name)

})

//  Search Button link to enter key
const input1 = document.getElementById("username")

input1.addEventListener("keypress", (event) => {
    if(event.key === 'Enter'){
        console.log(input1.value)
        userdata(input1.value)  
    }
})


// Fetch data from Github Api .

async function userdata(n) {
    try{
        const response  = await fetch('https://api.github.com/users/'+ n)

         if(!response.ok){ 
            throw new Error("User not found ")
         }
            let data = await response.json()
            console.log(data)
            Image(data)  // function calling image 
    }
    catch(e){
        console.log("error message " )
    }
}

