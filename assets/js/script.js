const textareaEls = $('textarea');

//display current date in header
const currentDay = moment().local().format('dddd, MMMM Do')
$('#currentDay').text(currentDay)



const updateHours = function() {
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

updateHours();

//update hour colors every minute
setInterval(updateHours, (1000*60));