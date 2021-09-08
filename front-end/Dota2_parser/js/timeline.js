function makeTimeine(){
    var sql = `select distinct dateadd(second,0,DATE_TRUNC('MINUTE', E:Time::TIME)) as TIME
                ,HOUR(TIME) AS HR
                ,MINUTE(TIME) AS MN
                ,SECOND(TIME) AS SS
                ,(HR*60*60) + (MN*60) + SS AS TOTAL_SEC
                from dota.public.game
                order by time asc`;
    
    SQL(sql, 'timeline-minutes'); 
}

var starttime;
function handleMinutes(res){
    $('#game-timeline').html (' ');
    $('#min-stats').html (' ');

    var diff = (3*60)+42
    var gt = '';
    var gTime = '0';
    for(i=0; i< res.length; i++){
        if(res[i].HR =='0'){
            gTime = new Date((res[i].TOTAL_SEC - starttime) * 1000).toISOString().substr(14, 5)
        }else{
            gTime = new Date((res[i].TOTAL_SEC - starttime) * 1000).toISOString().substr(11, 8)
        }

        gt += `<td id='timeline-${res[i].TOTAL_SEC}' onclick='getAllTickData(${res[i].TOTAL_SEC});highlight(this)' class='br' style='padding-left:35px;padding-right:35px'><span style='font-size:11px;font-weight:900;' class='centerText'>Min: </span><br>${((res[i].HR*60) + res[i].MN)-18}</td>`;
        
    }

    $('#game-timeline').html (gt);
    
    timelineStats()
}

function highlight(me){
    $('[id^=timeline-]').css('background-color','black')
    $(me).css('background-color','#125272')
}

function highlightSec(me){
    $('.mySeconds').css('background-color','black')
    $(me).css('background-color','#125272')
}

function getAllTickData(t){
    $('#time').val(t);
    setTime(t);
    getperSecondData(t);
    console.log(t);
}



function handleTimelineStats(data){
    $('#min-stats').html (' ');
    var t = '';

    for(i=0; i< data.length; i++){
        var color = 'white';
        if(parseInt(data[i].GOLD_RAD) > parseInt(data[i].GOLD_DIRE)){
            color = "#99b898";
        }else{
            color = '#e84a5f'
        }

        var str = `<td id='timeline-aux-stats-${data[i].TOTAL_SEC}'><span style='font-size:12px; color:${color};'>
                        ${(data[i].GOLD_RAD||'0').toLocaleString('en',{maximumFractionDigits: 0})} &#128081; ${(data[i].GOLD_DIRE||'0').toLocaleString('en',{maximumFractionDigits: 0})}<br>
                        ${(data[i].XP_RAD||'0').toLocaleString('en',{maximumFractionDigits: 0})} <span style='font-size:20px;color:white;'>&#9876;</span> ${(data[i].XP_DIRE||'0').toLocaleString('en',{maximumFractionDigits: 0})}<br>
                    </span>
                    <span>${(data[i].KILLS_RAD||'')} &#128128; ${(data[i].KILLS_DIRE||'')}</span><br>
                    <span>${(data[i].BUILDINGS_RAD||'')} &#128726; ${(data[i].BUILDINGS_DIRE||'')}</span>
                    
                  </td>`;
        $('#min-stats').append(str)
        //drawTimelineSpark([data[i].GOLD_RAD, data[i].GOLD_DIRE], `t-line-spark-${data[i].TOTAL_SEC}`)
    }
    
}//end handle timeline


function handleTimelineSecStats(data){

    $('#game-sec-stats').html (' ');
    $('#game-seconds').html (' ');

    for(i=0; i< data.length; i++){
        var str = `<td>`;
        if(data[i].KILLS_RAD || data[i].KILLS_DIRE){
            str += `<span style='font-size:12px'>
                ${data[i].KILLS_RAD||''} <span style='font-size:15px'>&#128128;</span> ${data[i].KILLS_DIRE||''}
            </span><br>`;
        }

        if(data[i].BUILDINGS_RAD || data[i].BUILDINGS_DIRE){
            str += `<span style='font-size:12px'>
                        ${data[i].BUILDINGS_RAD||''} <span style='font-size:15px'>&#128726;</span> ${data[i].BUILDINGS_DIRE||''}
                    </span>`
        };
        str += `</td>`;
        $('#game-sec-stats').append(str);    
        
        $('#game-seconds').append(`<td class='br mySeconds' data-toggle='modal'  onclick='getThisSecond(`+data[i].TOTAL_SEC+`);highlightSec(this); setVideoSecond(`+(data[i].SS)+`);' style='padding-left:15px; padding-right:15px'>`+(data[i].SS+18)+`</td>`);


    }

}//end handle timeline sec

function handleXPGoldAdv(data){
    var output = {time:[], gold:[], xp:[]}
    for(i=0; i< data.length ; i++){
        var t = new Date((data[i].TOTAL_SEC - starttime) * 1000).toISOString().substr(11, 8);
        output.time.push(t)
        output.gold.push(data[i].GOLD_ADV);
        output.xp.push(data[i].XP_ADV);
    }

    drawGoldXP('gold-XP-Chart-compare', output.time, output.gold, output.xp);
    
}


function getThisSecond(second){
    var time = new Date(second * 1000).toISOString().substr(11, 8);
    var sql = ` select distinct E
                from GAME
                where E:Time::TIME between ('${time}'::Time) and dateadd(second,1,('${time}'::Time))
                order by E:Time::TIME asc;`;
                
    SQL(sql, 'all-reports'); 
}

function getSecondsByInput(){
    var time1 = $('#time-sec-start').val();
    var time2 = $('#time-sec-end').val( );

    var add = ["DOTA_COMBATLOG_DEATH", 'DOTA_COMBATLOG_TEAM_BUILDING_KILL'];
    if($('#cb-damage').is(":checked")){
        add.push("DOTA_COMBATLOG_DAMAGE");
    }
    if($('#cb-ability').is(":checked")){
        add.push("DOTA_COMBATLOG_ABILITY");
    }
    if($('#cb-mods').is(":checked")){
        add.push("DOTA_COMBATLOG_MODIFIER_ADD");
        add.push("DOTA_COMBATLOG_MODIFIER_REMOVE");
    }
    if($('#cb-items').is(":checked")){
        add.push("DOTA_COMBATLOG_ITEM");
    }
    if($('#cb-gold').is(":checked")){
        add.push("DOTA_COMBATLOG_GOLD");
    }

    var search = add.map(function(val){
        return "'" + val + "'";
    }).join(",");

    var sql = ` select distinct E
                from GAME
                where E:Time::TIME between ('${time1}'::Time) and ('${time2}'::Time)
                and E:Type in (${search})
                order by E:Time::TIME asc, E:Type asc;`;
                
    SQL(sql, 'all-reports'); 
}





function handleTimedSecondEvent(data){
    $('#second-game-events').html(' ');
    
    $('#time-sec-start').val(data[0].E.Time)
    $('#time-sec-end').val(data[data.length-1].E.Time)


    for(i=0; i < data.length; i++){
        var event = JSON.parse(JSON.stringify(data[i].E));
        
        if(event.Type == "DOTA_COMBATLOG_DAMAGE" && $('#cb-damage').is(":checked")){
            $('#second-game-events').append(damage(event));
        }

        if(event.Type == "DOTA_COMBATLOG_ABILITY" && $('#cb-ability').is(":checked")){
            $('#second-game-events').append(ability(event));
        }

        if(event.Type == "DOTA_COMBATLOG_PLAYERSTATS"){
            //$('#second-game-events').append(playerStats(event));
        }

        if(event.Type == "DOTA_COMBATLOG_MODIFIER_ADD" && $('#cb-mods').is(":checked")){
            $('#second-game-events').append(modAdd(event));
        }

        if(event.Type == "DOTA_COMBATLOG_MODIFIER_REMOVE" && $('#cb-mods').is(":checked")){
            $('#second-game-events').append(modRemove(event));
        }

        if(event.Type == "DOTA_COMBATLOG_DEATH"){
            $('#second-game-events').append(death(event));
        }

        if(event.Type == "DOTA_COMBATLOG_ITEM" && $('#cb-items').is(":checked")){
            $('#second-game-events').append(item(event));
        }

        if(event.Type == "DOTA_COMBATLOG_GOLD" && $('#cb-gold').is(":checked")){
            $('#second-game-events').append(gold(event));
        }
        if(event.Type == "DOTA_COMBATLOG_TEAM_BUILDING_KILL"){
            $('#second-game-events').append(buildingKill(event));

        }
        


        /**
         * 
            DOTA_COMBATLOG_GAME_STATE
            DOTA_COMBATLOG_GOLD
            --DOTA_COMBATLOG_MODIFIER_ADD
            DOTA_COMBATLOG_PURCHASE
            --DOTA_COMBATLOG_ITEM
            --DOTA_COMBATLOG_MODIFIER_REMOVE
            --DOTA_COMBATLOG_ABILITY
            -- DOTA_COMBATLOG_PLAYERSTATS
            DOTA_COMBATLOG_DAMAGE
            DOTA_COMBATLOG_HEAL
            --DOTA_COMBATLOG_DEATH
            DOTA_COMBATLOG_FIRST_BLOOD
            DOTA_COMBATLOG_XP
            DOTA_COMBATLOG_MODIFIER_STACK_EVENT
            DOTA_COMBATLOG_ABILITY_TRIGGER
            DOTA_COMBATLOG_MULTIKILL
            DOTA_COMBATLOG_TEAM_BUILDING_KILL
            DOTA_COMBATLOG_BUYBACK
            DOTA_COMBATLOG_CRITICAL_DAMAGE
            DOTA_COMBATLOG_KILLSTREAK
         * 
         * 
         * 
         */


    }//end data


    
}//end handle timed second event


function drawTimelineSpark(data, chart){
    var g = data;
    var color = '#FFF';

    $("#"+chart).sparkline(g, {type: "bar", height:'25px', width:'30px', barWidth: 10, barSpacing: 0,});


}