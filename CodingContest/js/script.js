// ------------HTML-------------
const contents = document.getElementById('Contests')



//Table Creation
function tableHead(){
    let th = `<table class="contests_subPart">
                <tr class="contest_table_head">
                    <th>Name of the contest</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Time Before Start</th>
                </tr>`

    return th
}

function tableData(contestLink,id,name,startTime,duration,beforeStart){

    startTime = timeConverter(startTime)
    duration = timeLengthConverter(duration)
    beforeStart= remainingTime(-beforeStart)

    let td = `<tr class="contest">
                <td class="contest_name"><a href=${contestLink}+${id} target="_blank">${name}</a></td>
                <td class="contest_start">${startTime}</td>
                <td class="contest_length">${duration}</td>
                <td class="contest_before_Start" id="before_start">${beforeStart}</td>
            </tr>`
    return td
}


//Fetching Data


const cf_url = "https://kontests.net/api/v1/codeforces",
cf_webLink = "https://codeforces.com/"


async function getData(url,name,websiteLink){
    let finalHTML = `<a class="contest_website_name" href=${websiteLink} >${name}</a>`;
    finalHTML +=tableHead();

    // console.log(finalHTML)

    var response= await fetch(url)
    var data=await response.json()
    let i=0;
    let contestArray = []

    while(data[i].phase ==="BEFORE" ){
        // let id = data[i].id
        let name = data[i].name,
        startTime= data[i].startTimeSeconds,
        duration = data[i].durationSeconds,
        beforeStart = data[i].relativeTimeSeconds
        
        let narray = [id,name,startTime,duration,beforeStart]
        contestArray.push(narray)
        i++;
    }
    contestArray.sort((a,b)=>{
        if(a[2]>b[2]) return 1
        if(a[2]<b[2]) return -1
        return 0
    })


    for(let i in contestArray){
        finalHTML +=tableData(contestLink,contestArray[i][0],contestArray[i][1], contestArray[i][2],contestArray[i][3],contestArray[i][4])
    }
    finalHTML+=`</table>`
    if(contestArray.length>0){
    contents.innerHTML+=finalHTML
    }
    console.log(data);
    
}

getData(cf_url,'CodeForces',cf_webLink);


//Function to add 0
function adding(time){
    time = String(time)
    if(time.length===1)
    time = '0'+time
    return time
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

//Sec To DD HH MM SS
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

//Remaining time
function remainingTime(sec){
    let hr,min,day
    min=Math.floor(sec/60)
    sec = sec%60
    hr = Math.floor(min/60)
    min= min%60
    day = Math.floor(hr/24)
    hr = hr%24
    let ans = ""
    if(day>0){
        ans = `${day} day(s) remain`
        return ans
    }
    ans=`${adding(hr)}:${adding(min)}:${adding(sec)}`
    return ans
    
}



//Calling for different contests



// getData(cf_url,'CodeForces',cf_webLink);