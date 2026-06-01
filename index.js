// Serach button working
const searchbutton = document.getElementById("Searchbutton")

// let input  = document.getElementById("username").value  // Wrong because if the page load the input box is empty.

let name 
searchbutton.addEventListener("click",() =>{
    const input  = document.getElementById("username")
    name = input.value
    console.log(name)
    loading()
    userdata(name)    

})

//  Search Button link to enter key
const input1 = document.getElementById("username")

input1.addEventListener("keypress", (event) => {
    if(event.key === 'Enter'){
        console.log(input1.value)
        loading()
        userdata(input1.value)  
    }
})


// Fetch data from Github Api .

async function userdata(n) {
    if(n === ""){
        const name = document.getElementById("username")
        name.value = "Enter username !"
    }
    else{
        try{
        const response  = await fetch('https://api.github.com/users/'+ n)
        

         if(!response.ok){ 
            clearProfile()
            Notfound()
            Noloading()
            return ;
            // clearProfile()
         }
            let data = await response.json()
            console.log(data)
            Image(data)  // function calling image 
            console.log("image")
            // username(n)
            username(data)
            console.log("username")
            repo_follower_following(data)
            console.log("repo_follower_following")
            BioData(data)
            console.log("Biodata")
            url(data)
            console.log("Git Hub Url")
            Noloading()
            console.log("Noloading")
            DisplayRepo(data)
    }
    catch(e){
        console.log("error message  "+ e )
    }
    finally{
   Noloading()
    }
    }
    
}


// Change the image profile

function Image(data){

    const image1  = document.getElementById("image")
     
    image1.src = data.avatar_url

    console.log(image1)
}

// changing the user name

// function username(name){
    // console.log("hi1")

//     const username1 = document.getElementById("username-display")
//     // const username1 = document.querySelector("h2")

//     username1.innerText = name
// }

// OR

function username(data){

    const username1 = document.getElementById("username-display")
    
    username1.innerHTML = data.login
}

// Changeing the repo followers following

function repo_follower_following(data){
    const repo = document.getElementById("repo-display")

    const follow = document.getElementById("follower-display")

    const following = document.getElementById("following-display")

    repo.innerHTML = data.public_repos

    follow.innerHTML = data.followers

    following.innerHTML = data.following

}

function BioData(data){
    
    const bio1 = document.getElementById("bio")
    console.log("hi111")

    if(data.bio ){
        bio1.innerHTML = data.bio 
    }
    else{
        bio1.innerHTML = "Person not serious"
    }
}

// Addig the github url

function url(data){
    const githubUrl  = document.getElementById("github-link") 
    console.log(githubUrl)
    githubUrl.href= data.html_url
    console.log(githubUrl)
}

// Not Found github Account

function Notfound(){
// confirm("User Not Found")
 const input  = document.getElementById("username")
 input.value = ""  ;
 input.placeholder = "No user ";
}

//  clearing the screen while the user not found 

function clearProfile(){

     const image1  = document.getElementById("image")

    const username1 = document.getElementById("username-display")

    const repo = document.getElementById("repo-display")

    const follow = document.getElementById("follower-display")

    const following = document.getElementById("following-display")

    const bio1 = document.getElementById("bio")

    const githubUrl  = document.getElementById("github-link") 

    image1.src = "https://via.placeholder.com/150"

    username1.innerText = "No username"

    repo.innerHTML = "0"

    following.innerHTML = "0"

    follow.innerHTML = 0

    bio1.innerText = "NO Bio"

    githubUrl.href = null

}

// loading.. in serch button 
function loading(){
    // searchbutton.disabled = true
    searchbutton.innerHTML = "Searching..."
}

// Remove loading...
function Noloading(){
    // searchbutton.disabled = false
    searchbutton.innerHTML = "Search"

}

// Displaying Repo

async function DisplayRepo(data){
    const RepoDisplay = data.repos_url
    const repository = await fetch(RepoDisplay)
    console.log(repository)
    let repoArray = await repository.json()
    console.log("Number of Repo "+ repoArray.length)

    const parentcontainer = document.getElementById("repo-list")

    parentcontainer.innerHTML = ""
    
    if(repoArray.length === 0){
        const newchild = document.createElement("div")

        newchild.innerHTML =`<strong>No Repository </strong>`
        newchild.classList.add("repo-item")

        parentcontainer.appendChild(newchild)
    }
    else{
        for(let i = 0;i<Math.min(5, repoArray.length);i++){
        const newDiv = document.createElement("div")

        newDiv.innerHTML = `<strong>${repoArray[i].name}</strong>
                            <p>${repoArray[i].description || "No description available"}<p>
                            <a href="${repoArray[i].html_url}" target="_blank" >View Repo</a>`  

        newDiv.classList.add("repo-item")

        parentcontainer.appendChild(newDiv)

        console.log(repoArray[i].name)
    }
        
    }

}