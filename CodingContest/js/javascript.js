// ------------HTML-------------
const contents = document.getElementById('Contests')
const contentsCont = document.getElementById('contests_container')



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

function tableData(contestLink,name,startTime,duration,beforeStart){

    // startTime = timeConverter(startTime)
    duration = timeLengthConverter(duration)
    beforeStart= remainingTime(beforeStart)
    // console.log(beforeStart);
    let td = `<tr class="contest">
                <td class="contest_name"><a href=${contestLink} target="_blank">${name}</a></td>
                <td class="contest_start">${startTime}</td>
                <td class="contest_length">${duration}</td>
                <td class="contest_before_Start" id="before_start">${beforeStart}</td>
            </tr>`
    return td
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
    if(day>1){
        ans = `${day} day(s) remain`
        return ans
    }
    ans=`${adding(day*24+hr)}:${adding(min)}:${adding(sec)}`
    return ans
    
}

//Function to add 0
function adding(time){
    time = String(time)
    if(time.length===1)
    time = '0'+time
    return time
}


//Fetching Data
let current_time =Date.now()
const ad_hr=5, ad_min= 30





async function getData(url,name,websiteLink){
    let finalHTML = `<a class="contest_website_name" href=${websiteLink} >${name}</a>`;
    finalHTML +=tableHead();

    // console.log(finalHTML)

    var response= await fetch(url)
    var data=await response.json()

    var time_array = []

    for(let i=0;i<data.length;i++){
        let cont_name = data[i].name,
        cont_duration = data[i].duration,
        cont_status = data[i].status,
        cont_start_time = data[i].start_time,
        cont_end_time = data[i].end_time
        cont_link = data[i].url
        
        
        cont_start_time = new Date(cont_start_time);
        cont_end_time= new Date(cont_end_time)
        
        time_array.push(cont_start_time);
        // console.log(new Date(cont_start_time).toISOString());

         let cont_before_start = Math.floor(Math.max(0,(cont_start_time-current_time))/1000)


        // console.log(new Date(cont_before_start).toISOString());

        a = new Date(cont_start_time).toTimeString()
        b = new Date(cont_start_time).toDateString()

        let cont_st_dt = `${b.substr(0,3)}, ${b.substr(4,3)} ${b.substr(8,2)}, ${b.substr(11,4)} ${a.substr(0,8)} (${a.substr(9,6)}:${a.substr(15,2)})`
        // console.log(cont_st_dt);
        // console.log(a);
        

        finalHTML+=tableData(cont_link,cont_name,cont_st_dt,cont_duration,cont_before_start);
        // contestLink,name,startTime,duration,beforeStart
    }
    finalHTML+=`</table>
    `
    var timeComponent = document.getElementsByClassName("contest_before_Start")
    console.log(timeComponent);


    if(data.length>0){
    contents.innerHTML+=finalHTML
    }

    {let  loopFunction = setInterval(() => {
        try{
            current_time =Date.now()
            for(let idx= 0;idx<time_array.length;idx++){
                let cont_before_start = Math.floor(Math.max(0,(time_array[idx]-current_time))/1000)
                cont_before_start= remainingTime(cont_before_start)
                timeComponent[idx].innerHTML = cont_before_start
            }
            
        }
        catch(err){
            clearInterval(loopFunction)
        }
    }, 1000);}
    // console.log(data);
    
}


//Calling for different contests

//Codeforces
const cf_url = "https://kontests.net/api/v1/codeforces",
cf_webLink = "https://codeforces.com/"



//TopCoder
const tc_url = "https://kontests.net/api/v1/top_coder",
tc_webLink = "https://www.topcoder.com/"



//AtCoder
const ac_url = "https://kontests.net/api/v1/at_coder",
ac_webLink = "https://atcoder.jp/"





//CodeChef
const cc_url = "https://kontests.net/api/v1/code_chef",
cc_webLink = "https://www.codechef.com/"




//HackerRank
const hr_url = "https://kontests.net/api/v1/hacker_rank",
hr_webLink = "https://www.hackerrank.com/"



//HackerEarth

const he_url = "https://kontests.net/api/v1/hacker_earth",
he_webLink = "https://www.hackerearth.com/"




//LeetCode

const lc_url = "https://kontests.net/api/v1/leet_code",
lc_webLink = "https://leetcode.com/"



//Google Kick Start

const gks_url = "https://kontests.net/api/v1/kick_start",
gks_webLink = "https://codingcompetitions.withgoogle.com/kickstart"

// getData(gks_url,'KickStart',gks_webLink)












//---------------------------------------First Page Decoration-------------------------------------
 let HomeContainer = document.getElementById('container'),
    WebsiteContainer = document.getElementById('websitesContainer')
    Contests = document.getElementById('contests_container')
 
 
document.getElementById('go_cp').addEventListener('click',()=>{
     HomeContainer.classList.add('hide')
     Contests.classList.add('hide')
     WebsiteContainer.classList.remove('hide')
})

document.getElementById('cross').addEventListener('click',()=>{
    HomeContainer.classList.remove('hide')
     Contests.classList.add('hide')
     WebsiteContainer.classList.add('hide')
})

//List Calling
document.getElementById('kickstart').addEventListener('click',()=>{
    Contests.classList.remove('hide')
    WebsiteContainer.classList.add('hide')
    // contents.innerHTML = ``
    getData(gks_url,'KickStart',gks_webLink)


})
document.getElementById('codeforces').addEventListener('click',()=>{
    Contests.classList.remove('hide')
    WebsiteContainer.classList.add('hide')
    contents.innerHTML = ``
    getData(cf_url,'CodeForces',cf_webLink);
})

document.getElementById('atcoder').addEventListener('click',()=>{
    Contests.classList.remove('hide')
    WebsiteContainer.classList.add('hide')
    contents.innerHTML = ``
    getData(ac_url,'AtCoder',ac_webLink)
})

document.getElementById('codechef').addEventListener('click',()=>{
    Contests.classList.remove('hide')
    WebsiteContainer.classList.add('hide')
    contents.innerHTML = ``
    getData(cc_url,'CodeChef',cc_webLink)
})

document.getElementById('hackerearth').addEventListener('click',()=>{
    Contests.classList.remove('hide')
    WebsiteContainer.classList.add('hide')
    contents.innerHTML = ``
    getData(he_url,'HackerEarth',he_webLink)
    
})

document.getElementById('hackerrank').addEventListener('click',()=>{
    Contests.classList.remove('hide')
    WebsiteContainer.classList.add('hide')
    contents.innerHTML = ``
    getData(hr_url,'HackerRank',hr_webLink)
})

document.getElementById('leetcode').addEventListener('click',()=>{
    Contests.classList.remove('hide')
    WebsiteContainer.classList.add('hide')
    contents.innerHTML = ``
    getData(lc_url,'LeetCode',lc_webLink)
})

document.getElementById('topcoder').addEventListener('click',()=>{
    Contests.classList.remove('hide')
    WebsiteContainer.classList.add('hide')
    contents.innerHTML = ``
    getData(tc_url,'TopCoder',tc_webLink)
    // backPage()
})

//--------------Back To Front Page-----------------------
// function backPage(){
    document.getElementById('back').addEventListener('click',()=>{
            contents.innerHTML = ``
            HomeContainer.classList.remove('hide')
            Contests.classList.add('hide')
            WebsiteContainer.classList.add('hide')
            console.log('press');

    })
// }