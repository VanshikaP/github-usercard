/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/VanshikaP')
.then(response => {
  console.log(response.data);
  })
  .catch(error => {
    console.log('Got error ', error);
  })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const friendsArray = [
  'VanshikaP', 
  'ajkizer', 
  'danielkyman', 
  'stgary',
  'AhmedBarre10',
  'Callmich',
  'idongessien'
];
console.log('friends: ', friendsArray);
friendsArray.forEach(githubHandle =>{
  axios.get('https://api.github.com/users/' + githubHandle)
  .then(response => {
    document.querySelector('.cards').append(createCard(response.data));
  })
.catch(error => {
  console.log('Fetch operation failed, ', error);
})
});

let followersArray = [];
axios.get('https://api.github.com/users/VanshikaP/followers')
.then(response => {
  response.data.forEach(r => {
    followersArray.push(r.login);
  })
}).catch(error => {
  console.log('Failed to fetch followers ' , error);
})
console.log('Followers: ', followersArray);

followersArray.forEach(githubHandle =>{
  axios.get('https://api.github.com/users/' + githubHandle)
  .then(response => {
    console.log(response.data);
    document.querySelector('.cards').append(createCard(response.data));
  })
.catch(error => {
  console.log('Fetch operation failed, ', error);
})
});



/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function createCard(person){
  const card = document.createElement('div');
  const img = document.createElement('img');
  const info = document.createElement('div');
  const name = document.createElement('h3');
  const userName = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const address = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  card.classList.add('card');
  info.classList.add('card-info');
  name.classList.add('name');
  userName.classList.add('username');

  card.append(img, info);
  info.append(name, userName, location, profile, followers, following, bio);
  profile.append(address);

  img.src = person.avatar_url;
  name.textContent = person.name;
  userName.textContent = person.login;
  location.textContent = 'Location: ' + person.location;
  profile.textContent = 'Profile: ';
  address.href = person.html_url;
  address.textContent = person.html_url;
  followers.textContent = 'Followers: ' + person.followers;
  following.textContent = 'Following: ' + person.following;
  bio.textContent = 'Bio: ' + person.bio;

  return card;
}
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
