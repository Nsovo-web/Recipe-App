const searchBtn = document.getElementById('search-btn');
const mealResults = document.getElementById('meal');
const mealInstructions = document.getElementById('meal-info');
const recipeCloseBtn = document.getElementById('btn-close-recipe');
const mealInfoContent = document.getElementById('meal-info-content');




//Event Listeners

searchBtn.addEventListener('click',()=>{

    let searchInput = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
          .then(response=>response.json())
          .then(data=>{
              let mealItems = "";
              //Default Meal Items 

              //Check for input value
            if(data.meals == null || searchInput==""){
                mealResults.innerHTML="No Meals Found";
            }else{
                data.meals.forEach(meal =>{
               mealItems +=`
               <div class="meal-item" id="${meal.idMeal}">
               <div class="meal-img">
                 <img src="${meal.strMealThumb}"  class="text-center">
               </div>
               <div class="meal-name">
                   <h3>${meal.strMeal}</h3>
                   <a  class="recipe-btn" id="recipe-btn">Get Recipe</a>
               </div>
             </div>
               `;
                });
                
                mealResults.innerHTML=mealItems;
                
              // console.log(data.meals);
               
              showRecipe();
              
            }

          })

          

})


 function showRecipe(){
                     //When The Recipe Button Is Clicked
let recipeBtns = document.querySelectorAll('.recipe-btn');
//let mealInfo ="";
for(let i=0; i<recipeBtns.length; i++){
   recipeBtns[i].addEventListener("click",()=>{
       const mealId = recipeBtns[i].parentNode.parentNode.id;
  
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
   .then(resp=>resp.json())
   .then(data=>{
       //console.log(data);
     
       let count = 0;
       
      let meal = data.meals[0];
      let strIngridient ;
      let strIngridients ="";
       while( true){
        count++;
         strIngridients +=meal[`strIngredient${count}`];
         strIngridients+= " -- ";
         if (meal[`strIngredient${count}`] == "") 
         {
            break;    
         }
         
      }
    // console.log(data.meals[0]);
    const  mealInfo =`
     <h2 class="recipe-title">${data.meals[0].strMeal}</h2>
     <div class="recipe-category">${data.meals[0].strCategory}</div>
     <div class="recipe-instructions">
         <h2 >Ingredients:</h2>
         <p>${strIngridients}</p>
         <h4 id="ingredients"></h4>
         <h2>Instructions:</h2>
         <p>
          ${data.meals[0].strInstructions}
         </p>
         
  
         <div class="instruction-image">
           <img src="${data.meals[0].strMealThumb}" alt="">
         </div>
         <div class="instructions-link">
           <a href="${data.meals[0].strYoutube}" class="btn-watch-video">Watch Video</a>
         </div>
     </div>
       `;
       
      
       mealInfoContent.innerHTML=mealInfo;
   })
  
   
   
   mealInstructions.classList.add('show-meal-info');
  
      // console.log('You clicked recipe button')
   });//end of recipeBtn event Listener
}
 }


//Close The Meal-info 
recipeCloseBtn.addEventListener('click',()=>{
    mealInstructions.classList.remove('show-meal-info');
   })

