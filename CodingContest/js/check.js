let now = 1628606100
console.log(now);
//Function to add 0
function adding(time){
    time = String(time)
    if(time.length===1)
    time = '0'+time
    return time
}
function timeLengthConverter(seconds){
    let day,hr,min,sec
    min =Math.floor(seconds/60)
    sec = seconds%60
    
    hr = Math.floor(min/60)
    min= min%60

    day= Math.floor(hr/24)
    hr = hr%12
    if(day!=0){
        
    }
    let ans = ""
    if(day!=0){
        ans+=`${adding(day)}d `
    }
   
    ans +=`${adding(hr)}:${adding(min)}`
    return ans
}

//UNIX Time-stamp format to ddmmyy
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();

    min=String(min)
    sec =String(sec)
    hour= String(hour)



    hour = adding(hour)

    min=adding(min)
    
    sec= adding(sec)

    var time = `${date}/${month}/${year} ${hour}:${min}`;
    return time;
}
// console.log(timeConverter(now));

console.log(new Date(Date.now() + 5*3600*1000+30*60*1000).toISOString().slice(0, 19).replace('T', ' '));
console.log(new Date(Date.UTC(2021,6,10)).toISOString());


<!DOCTYPE html>
<html>
<body>

<p>Please input a number between 5 and 10:</p>

<input id="demo" type="text">
<button type="button" onclick="myFunction()">Test Input</button>
<p id="p01"></p>

<script>
function myFunction() {
  const message = document.getElementById("p01");
  message.innerHTML = "";
  let x = document.getElementById("demo").value;
  try {
    if(x == "") throw "empty";
    if(isNaN(x)) throw "not a number";
    x = Number(x);
    if(x < 5) throw "too low";
    if(x > 10) throw "too high";
  }
  catch(err) {
    message.innerHTML = "Input is " + err;
  }
}
</script>

</body>
</html>