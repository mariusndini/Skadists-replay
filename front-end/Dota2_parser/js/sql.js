var isConnected = false;
var con = {
    account: '',
    username: '',
    role: '',
    password: '',
    warehouse: '',
    database: ''
}

function setTime(){
    var vid = document.getElementById("dota2GameVid");
    var inputTime = document.getElementById("time").value;
    vid.currentTime = inputTime - (starttime) + 1;
    
    if(isConnected){
        var time = new Date(inputTime * 1000).toISOString().substr(11, 8);
        getTimedReports(time)

    }//end if is connected
}

function setVideoSecond(seconds){
    var vid = document.getElementById("dota2GameVid");
    var mins = (document.getElementById("time").value - starttime + 1)
    vid.currentTime = mins + seconds;
    
    
}


setup().then(()=>{
    isConnected = true;
    getGold();
    makeTimeine();
    
});

async function setup(){
    var wsUri = "wss://0h1n2pma8f.execute-api.us-west-2.amazonaws.com/dev";
    websocket = new WebSocket(wsUri);

    websocket.onclose = onclose;
    function onclose(){
        websocket = new WebSocket(wsUri);
        websocket.onopen = ()=>{console.warn('WS OPEN')};
        websocket.onclose = onclose;
        websocket.onmessage = onmessage;
    };
    websocket.onmessage = onmessage;

    function onmessage(m){
        if (!m.data.includes(`"message": "Internal server error"`)) {
            var data = JSON.parse(m.data).result;
            var report = JSON.parse(m.data).report;
            handleResponse(report, data)
            
        }
    };
    let promise = new Promise((res, rej) => {
        websocket.onopen = function(){
            console.warn('WS OPEN');
            res()
        };
    });
    let result = await promise; 

}// END SETUP


function SQL(q, tags){
    //console.warn('QUERY SENT: ' + tags);
    var message = {"action" : "snflk", "query" : q, con: con, report: tags}
    websocket.send(JSON.stringify(message));
}

function handleResponse(report, data){
    if(report == 'gold-pivot'){
        handleGoldPivot(data)
    }

    if(report == 'cs-pivot'){
        handleCSPivot(data)
    }else if(report.includes('gold') || report.includes('xp') ){
        var chart = report.split('-');
        drawSpark(data, chart[0], chart[1])
    }

    if(report == 'xp-pivot'){
        handleXPPivot(data)
    }

    if(report == 'kills-pivot'){
        handleKillsPivot(data)
    }

    if(report == 'timeline-minutes'){
        handleMinutes(data);
    }

    if(report == 'timeline-stats'){
        handleTimelineStats(data);
    }

    if(report == 'timeline-sec-stats'){
        handleTimelineSecStats(data);
    }

    if(report == 'xp-gold-adv'){
        handleXPGoldAdv(data);
    }

    if(report == 'all-reports'){
        handleTimedSecondEvent(data);
    }




}//end handle response
