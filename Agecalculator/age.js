// Fix 1: Separate constants for form and result
const form = document.querySelector("form");
const result = document.querySelector(".result"); 

form.addEventListener("submit", handleSubmit);


function handleSubmit(e){

    e.preventDefault();
    // console.log(e); // Keeping this commented out for cleaner execution

    const data = new FormData(e.target);
    const birthDateStr = data.get("birthday");
    const birthDate = new Date(birthDateStr);
    const today = new Date();

    if(birthDate > today){
        alert("Birth Date can't be in the future!");
        return;
    }
    
    // Initial age calculation
    let age = today.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has passed this year
    const isMonthAhead = today.getMonth() > birthDate.getMonth();
    const isCurrentMonth = today.getMonth() == birthDate.getMonth();
    
    // Fix 2: Compare today's day with the birth day
    const isDayAheadOrEqual = today.getDate() >= birthDate.getDate();

    // The birthday has occurred if:
    // 1. The current month is ahead of the birth month, OR
    // 2. It is the current month AND the current day is on or after the birth day
    const hasBirthdayOccurred = isMonthAhead || (isCurrentMonth && isDayAheadOrEqual);
    
    // If the birthday hasn't happened yet this year, subtract 1 from the age
    if(!hasBirthdayOccurred){
        age--;
    }

    // Fix 3: Use backticks (`) for the template literal
    result.textContent =  `You are ${age} year(s) old!`; 

}