let theInput = document.querySelector(" .todo-container .add-task input") ;
let theAddButton  = document.querySelector(".add-task .plus") ;
let tasksContainer = document.querySelector(".tasks-content") ;
let tasksCount = document.querySelector(".tasks-count span ") ;
let tasksCompleted = document.querySelector(".tasks-completed span ") ;
let Calender = document.querySelector(`.Calener_Container .calender`) ;
// localStorage.clear();



CalenderX () ;
setInterval(CalenderX , 1000) ;

let id   = 0 ;
let data   = [];

let btn_Delete_Tasks = document.querySelector(".task-stats .Delete_All  ") ;
let btn_Clear_Chickeds = document.querySelector(".task-stats .Clear_Chicked  ") ;


if (localStorage.getItem("datax") ) {

    let noTasksMsg = document.querySelector(".no-tasks-message") ; // عندما يتم اضافة اول مهمة قم بازالة رسالة لا يوجد مهام 
    if(document.body.contains(noTasksMsg))  { noTasksMsg.remove() ;  }

    data  =  JSON.parse( localStorage.getItem('datax'))  ;
     if (data.length > 0)
    {id = data[data.length - 1].id  + 1;}

    data.forEach(function(el , i ) {   
    let mainSpan = document.createElement('span') ;  // creaet main span 
    let deleteElement = document.createElement('span'); // create  Delete Button
    let text = document.createElement('span') ;  // create   span text  
    text.innerHTML  = el.value1 ;
    let chick_span = document.createElement("span") ; 
    chick_span.classList.add("Check") ;

     let DeleteText = document.createTextNode("Delete") ;  // create  Delete Button text 
     mainSpan.appendChild(chick_span) ;
       mainSpan.appendChild(text);   //add text to  Main span  
       mainSpan.className = 'task-box' ;
       deleteElement.appendChild(DeleteText) ;
       deleteElement.className  = 'delete' ;
       mainSpan.appendChild(deleteElement) ;
       mainSpan.setAttribute("id",data[i].id) ;
     if  ( data[i].finish === 0 )
     {
        tasksContainer.appendChild(mainSpan) ; 
     }
     else if ( data[i].finish === 1 )
      {
        chick_span.classList.add("Checked") ;
        // mainSpan.classList.add("finished") ;
        tasksContainer.appendChild(mainSpan) ; 
      }
     
    });
     calculateTasks() ;    // calculate Tasks
     createNoTasks() ;  // if there is no task show meesage  no task
    }
    else {
        window.localStorage.setItem('datax','[]') ; 
       
        console.log(1) ;
         calculateTasks() ; // calculate Tasks
         createNoTasks() ;  // if there is no task show meesage  no task
    }
// Delete All Tasks 
btn_Delete_Tasks.addEventListener('click' , function() {  
   if (confirm("Are You Sure You Want To Delete Al Tasks ?"))
     {
     Array.from(document.querySelector('.tasks-content').children).forEach(function(el,index){
        el.remove() ; 
        data = [] ; 
        window.localStorage.setItem('datax' , data) ;
     }) ;  }  

         // calculate Tasks
         calculateTasks() ;
         createNoTasks() ;  // if there is no task show meesage  no task
    }  
     
     ) ;

// Clear All Chickes 
btn_Clear_Chickeds.addEventListener('click' , function(e){
    Array.from(document.querySelectorAll('.task-box  .Checked')).forEach(function(el,index){
    el.classList.remove('Checked') ;
    data.forEach(function(el,i){
            el.finish = 0 ;
    });
    window.localStorage.setItem('datax' , JSON.stringify(data)) ;
    }) ;  
    // calculate Tasks
    calculateTasks() ;
}     ) ;


// focus tx_box on load
window.onload = function (){
    theInput.focus();
} ;


// ____________________________________________________________Start  Adding Task 

    function Adding_Task () {
    if (theInput.value ===  ''){
        console.log("no Value ") ;
    }
    else  {
       if (check_itiration_tasks() == 1 )
       {
        console.log('This task already Exist ') ;
       }
    else { 
        let noTasksMsg = document.querySelector(".no-tasks-message") ; // عندما يتم اضافة اول مهمة قم بازالة رسالة لا يوجد مهام 
        if(document.body.contains(noTasksMsg)) {
         noTasksMsg.remove() ;
         }

      let mainSpan = document.createElement('span') ;  // creaet main span 
      let deleteElement = document.createElement('span'); // create  Delete Button
      let text = document.createElement("span") ;  // create   span text  
      let chick_span = document.createElement("span") ; 
      chick_span.classList.add("Check") ;
       let DeleteText = document.createTextNode("Delete") ;  // create  Delete Button text 
            text.className = "txt" ;
            text.innerHTML = theInput.value ;
            mainSpan.appendChild(chick_span) ;  //add check span  to  Main span 
          mainSpan.appendChild(text);   //add text to  Main span  
         mainSpan.className = 'task-box' ;
         mainSpan.setAttribute("id", id) ;
         //add text to delete Button 
         deleteElement.appendChild(DeleteText) ;
         deleteElement.className  = 'delete' ;
        
         // add delete Button to Main span 
         mainSpan.appendChild(deleteElement) ;

         //add task to the container 
         tasksContainer.appendChild(mainSpan) ;
         data.push({
             value1 : theInput.value  ,    id : id , finish : 0 ,
         }) ;
         id++ ;
         window.localStorage.setItem('datax',JSON.stringify(data)) ;
        //  console.log(  JSON.parse(window.localStorage.getItem('datax')));
         theInput.value = '' ;
         theInput.focus() ;
         
         // calculate Tasks
         calculateTasks() ;

    }
}
} 
theAddButton.onclick =  function () {
    Adding_Task ()  ;
}

// add with Enter key 
document.addEventListener('keyup',function(e){
    if (e.keyCode === 13) {
        Adding_Task ()  ;
    }
});
//___________________________________________End  Adding_Task 



//  __________________________________________________ Start Delete And Finished Tasks

 document.addEventListener('click' , function(e){
        if (e.target.className == 'delete') {
    
                data = data.filter(function(el){
                    console.log("Target Id is " + e.target.parentNode.getAttribute("id") ) ;
                    console.log("el Id is " + el.id  ) ;
                    return e.target.parentNode.getAttribute("id") != el.id ;
                }) ;
                console.log(data) ;

                window.localStorage.setItem('datax',JSON.stringify(data)) ;

                e.target.parentNode.remove() ;  // remove current task     // parent  node  = the text of father element
           
                
                createNoTasks() ;  // if there is no task show meesage  no task
                 calculateTasks() ;
        }
        
        if (e.target.classList.contains(`Check`) )
        {
            e.target.classList.toggle('Checked');
            // let F = data.filter(function(el , i){ 
            //     return e.target.getAttribute("id") == el.id ;
            // } ) ;
            // F[0].finish  =  1 ;
            // let x ;
            data.forEach(function(el,i){
                if (e.target.parentNode.getAttribute("id") == el.id)
                {
                    if ( data[i].finish == 0  )
                   { data[i].finish  = 1 ;}
                   else 
                   { data[i].finish  = 0 ;}
                    window.localStorage.setItem('datax' , JSON.stringify(data)) ;
                }
            })
            
            // calculate Tasks
              calculateTasks() ;
        }

 });

//  _________________________________________ End  Delete And Finished Tasks


  // __________________________________________Start  Functions  
 function createNoTasks() {
    if (tasksContainer.childElementCount == 0)  // check the tasks  Number  inside the container
    {
         // create Msg Span Element 
    let msgSpan = document.createElement("span") ;
    // create the text message 
    let msgText = document.createTextNode("No Tasks To Show ") ;

    // add Text TO the message span element 
    msgSpan.appendChild(msgText) ;
    //add Class To Message Span 
    msgSpan.className = 'no-tasks-message' ;

    // append the message span element to the task container 
    tasksContainer.appendChild(msgSpan) ;
    }


 }

 function calculateTasks () {
     //calculate All Tasks 
     tasksCount.innerHTML = document.querySelectorAll(`.tasks-content .task-box `).length ;
          //calculate Cmpleted Tasks 
          tasksCompleted.innerHTML = document.querySelectorAll(`.tasks-content .task-box .Checked`).length ;
 }

 
 function  check_itiration_tasks() {
     let c = 0 ;
    let array = Array.from(document.querySelectorAll(`.tasks-content .task-box`)) ; 
    array.forEach(function(el , index ) {
            console.log(index) ;
            console.log(array[index].childNodes[1].textContent) ;
            console.log("#".repeat(12)) ;
        if (array[index].childNodes[1].textContent ===  theInput.value ) {
            c ++ ;
          }
    }) ;
    return c  ;
 }

 function CalenderX () {             // Calender Function 
    Calender.innerHTML  = 
    new Date().toLocaleString('en',{weekday:"long"}) +
     " / " + new Date().toLocaleString('en',{month:"short"}) +
     " / " + new Date().getDate()  + "<br/>" + 
     new Date().getHours() + " : " +  new Date().getMinutes() + " : " + new Date().getSeconds() ;
}
  //--------------------------------------------------   Ends Functions   


 // استعمل سويت الليرت لو كان الانبوت فاضي 
 // تحقق اذا التاسك الي اضفته موجود مسبق 
 // يقم بعمل زر يمسح كل شيء  
 // قم بعمل زر يشطب كل شي 
