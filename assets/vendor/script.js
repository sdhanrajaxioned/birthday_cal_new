document.addEventListener('DOMContentLoaded', () => {
  let jsonInput,
    yearInput,
    birthDayList = [],
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
  const textArea = document.getElementById('birth-dates-textarea'),
    yearField = document.getElementById('year-field'),
    updateBtn = document.getElementById('update-btn'),
    errorJson = document.getElementById('error-json'),
    errorYear = document.getElementById('error-year'),
    birthDayDiv = document.querySelectorAll('.birthDays'),
    listItems = document.querySelectorAll('.day');
  
  const clearDivs = () => birthDayDiv.forEach((div) => div.innerHTML = '')
  clearDivs();

  const validateForm = (jsonInput) => {
    console.log(jsonInput)
    validateJsonInput(jsonInput);
    validateYear();
  }
  
  // function to validate JSON string
  function isJsonString(str) {
    try { JSON.parse(str); } 
    catch (e) { return false; }
    return true;
  }
  
  const validateJsonInput = (jsonInput) => {
    if(jsonInput == ''){
      errorJson.innerText ="This field is required!"
    }
    else if(!isJsonString(jsonInput)) {
      errorJson.innerText=`Please enter valid json data form. eg [{"name":"Dhanraj Shetty", "birthday": "03/05/197"}]`;
    }else {
      errorJson.innerText="";
      birthDayList=JSON.parse(jsonInput);
    }
  }
  
  const validateYear = () => {
    if(yearInput == '') {
      errorYear.innerText = "This Field is Required!";
    }
    else if(yearInput.length != 4){
      errorYear.innerText = "Please enter valid Year! eg: 2014";
    }
    else {
      errorYear.innerText = '';
    }
  }
  
  // function to create person obj with name and birthday
  function createPersonObj() {
    let personObj = [];
    birthDayList.forEach((person) => {
      let name = person.name,
        matches = name.match(/\b(\w)/g),
        initials = matches.join(''),
        date = person.birthday,
        dayMonth = date.slice(0,6) + yearInput,
        newDate = new Date(dayMonth),
        dayName = days[newDate.getDay()].substring(0,3),
        obj = {
        name: initials,
        birthDay: dayName
      };
      personObj.push(obj);
    })
    displayBirthdays(personObj);
  }
  
  //function to display data on DOM
  const displayBirthdays = (personObj) => {
    clearDivs();
    personObj.forEach((person) => {
      let randomColor = Math.floor(Math.random()*16777215).toString(16);
      let birthDay = person.birthDay.toLowerCase();
      listItems.forEach(function(li) {
        let listItemsId = li.id.toLocaleLowerCase();
        if(listItemsId === birthDay){
          let span = document.createElement('span'),
          birthdayDiv = li.querySelector('.birthDays');
          span.setAttribute('class', 'initials')
          span.style.backgroundColor = `#${randomColor}`;
          span.innerHTML = person.name;
          birthdayDiv.appendChild(span);
        } 

      })
      setTimeout(checkEmptyDiv, 50);
      function checkEmptyDiv() {
        birthDayDiv.forEach((div) => {
          if(div.innerHTML === '') {
            div.innerHTML = `<i class="fa-solid fa-face-frown fa-4x"></i>`;
          } 
          if(div.childNodes.length == 2) {
            let spanArr = Array.from(div.children);
            spanArr.forEach((span) => span.classList.add('active'));
          }
        })
      }
    })
  }
  
  updateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    jsonInput = textArea.value;
    yearInput = yearField.value;
    validateForm(jsonInput);
    createPersonObj();

  });
});

