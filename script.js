const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwardDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numberCheck=document.querySelector("#numbers");
const symbolCheck=document.querySelector("#symbols");
const indicators=document.querySelector('.indicator');
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbol='~`!@#$%^&*()_-+={[}]|\:;"<,>.?/';
let passward="";
let passwardLength=10;
let checkCount=0;
handleSlider();
setIndicator("#ccc");

//set passward length

function handleSlider(){
   inputSlider.value=passwardLength;
   lengthDisplay.innerText=passwardLength;  
   const min=inputSlider.min;
   const max=inputSlider.max;
   inputSlider.style.backgroundSize=((passwardLength-min)*100)/(max-min)+"% 100%";
}
///error is here
function setIndicator(color){
    indicators.style.backgroundColor=color;
    indicators.style.boxShadow=`0 0 12px 1px ${color}`;
}
function getRndInteger(min,max){
     return Math.floor(Math.random()*(max-min))+min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateRandomLowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateRandomUppercase(){
    return String.fromCharCode(getRndInteger(65,90));
}
function generateRandomSymbol(){
    const ranNum=getRndInteger(0,symbol.length);
    return symbol[ranNum];
}


function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNumber=false;
    let hasSymbol=false;
    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNumber = true;
    if (symbol.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwardLength >= 8) {
        setIndicator('#0f0');
    } 
    else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwardLength >= 6
    ) {
        setIndicator('#ff0');
    } 
    else {
        setIndicator('#f00');
    }
}
async function copycontent(){
    try{
       await navigator.clipboard.writeText(passwordDisplay.value);
       copyMsg.innerText="copied";
    }
    catch(e){
       copyMsg.innerText="failed";
    }
    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },3000);
}
function shufflePassward(array){
    //Fisher Yetes Method
    for(let i=array.length-1;i>=0;i--){
        const j=Math.floor(Math.random()*(1+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
}
function handleCheckboxChange(){
    checkCount=0;
    allCheckBox.forEach((checkBox)=>{
        if(checkBox.checked)
           checkCount++;
    });

    //special condition
    if(passwardLength<checkCount){
        passwardLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkBox)=>{
    checkBox.addEventListener('change',handleCheckboxChange);
})
inputSlider.addEventListener('click',(e)=>{
     passwardLength=e.target.value;
     handleSlider();
});
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
       copycontent();
});
generateBtn.addEventListener('click',()=>{
     //none of the checkbox are selected
     if(checkCount<=0)  return;
     if(passwardLength<checkCount){
        passwardLength=checkCount;
        handleSlider();
    }
    //lets start the main part of the code

    //remove old passward
    passward="";


    //let's put the staff mentioned by checkbox
    // if(uppercaseCheck.checked){
    //     passward+=generateRandomUppercase()
    // }
    // if(lowercaseCheck.checked){
    //     passward+=generateRandomLowercase()
    // }
    // if(numberCheck.checked){
    //     passward+=generateRandomNumber()
    // }
    // if(symbolCheck.checked){
    //     passward+=generateRandomSymbol()
    // }

    // the above case is not effective

    let funArr=[];
    if(uppercaseCheck.checked)
        funArr.push(generateRandomUppercase);
    if(lowercaseCheck.checked)
        funArr.push(generateRandomLowercase);
    if(numberCheck.checked)
        funArr.push(generateRandomNumber);
    if(symbolCheck.checked)
        funArr.push(generateRandomSymbol);
    console.log('checking is done');

        //for compalsary addition
        for(let i=0;i<funArr.length;i++){
            passward+=funArr[i]();
        }
        console.log('compalsary is done');
        //remaining element
        for(let i=0;i<passwardLength-funArr.length;i++){
            let randIndex=getRndInteger(0,funArr.length);
            passward+=funArr[randIndex]();
        }    
        console.log('remaining is done');
        //shuffle the passward
        passward=shufflePassward(Array.from(passward));
        console.log('shuffling is done');
        //show in ui
        console.log('ui showing is done');
        passwordDisplay.value=passward;
        console.log('Display is Done.')
        /// show the staraingth
        calcStrength();
});

