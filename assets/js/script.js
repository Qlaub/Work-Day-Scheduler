const textareaEls = $('textarea');
const containerEl = $('.container');
const saveBtnEls = $('.saveBtn');

//display current date in header
const currentDay = moment().local().format('dddd, MMMM Do');
$('#currentDay').text(currentDay);

let hourData = [
  {
    time: '9AM',
    text: ''
  },
  {
    time: '10AM',
    text: ''
  },
  {
    time: '11AM',
    text: ''
  },
  {
    time: '12PM',
    text: ''
  },
  {
    time: '1PM',
    text: ''
  },
  {
    time: '2PM',
    text: ''
  },
  {
    time: '3PM',
    text: ''
  },
  {
    time: '4PM',
    text: ''
  },
  {
    time: '5PM',
    text: ''
  }
];

const updateHourColors = function() {
  //get current local hour
  const currentHour = moment().local().format('k');
  
  //our work day starts at 9am
  let workDayHour = 9;
  for (let i=0; i < textareaEls.length; i++) {
    //updates hours past to class .past
    if (currentHour > workDayHour) {
      textareaEls[i].className = 'past';
    } 
    //updates future hours to class .future
    else if (currentHour < workDayHour) {
      textareaEls[i].className = 'future';
    } 
    //updates current hour to class .present
    else {
      textareaEls[i].className = 'present';
    }
    workDayHour++;
  }
  return console.log("Hour colors updated");
}

const updateHourData = function(event) {
  //guard clause to save only if button element or span within button was clicked on
  if (!$(event.target).hasClass('save')) return;

  //get parent element
  const parentEl = $(event.target).closest('.row');
  //get hour associated with text to save
  const hour = parentEl.children()[0].textContent;
  //get text within textarea
  const userText = parentEl.children()[1].value;
  //update correct hour within hourData array
  for (let index in hourData) {
    if (hourData[index].time === hour) {
      hourData[index].text = userText;
    }
  }
  saveData();
}

const saveData = function() {
  localStorage.setItem('data', JSON.stringify(hourData))
  console.log("Data saved")
}

const loadData = function() {
  const storedData = JSON.parse(localStorage.getItem('data'))
  //if no data exists, don't try to load
  if (!storedData) {return console.log("No data found");}

  //update hourData object
  hourData = storedData
  for (let index in hourData) {
    //parent container of element to be updated
    let timeblockEl = containerEl.children()[index]
    //element to be updated
    let textareaEl = $(timeblockEl).find('textarea');
    //text to update element
    let text = hourData[index].text;
    //update element
    $(textareaEl).val(text);
  }

  return console.log("Data loaded");
}

updateHourColors();
loadData();

//update hour colors every minute
setInterval(updateHourColors, (1000*60));

containerEl.on('click', saveBtnEls, updateHourData);
