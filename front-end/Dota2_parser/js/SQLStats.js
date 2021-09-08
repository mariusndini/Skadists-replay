
var players = 
['npc_dota_hero_luna',
'npc_dota_hero_void_spirit',
'npc_dota_hero_brewmaster',
'npc_dota_hero_mirana',
'npc_dota_hero_nyx_assassin',

'npc_dota_hero_templar_assassin',
'npc_dota_hero_invoker',
'npc_dota_hero_axe',
'npc_dota_hero_dark_willow',
'npc_dota_hero_shadow_demon']

var rank = []

function getGold(){
    SQLGold('npc_dota_hero_luna', 'good1');
    SQLGold('npc_dota_hero_void_spirit', 'good2');
    SQLGold('npc_dota_hero_brewmaster', 'good3');
    SQLGold('npc_dota_hero_mirana', 'good4');
    SQLGold('npc_dota_hero_nyx_assassin', 'good5');

    SQLGold('npc_dota_hero_templar_assassin', 'bad1');
    SQLGold('npc_dota_hero_invoker', 'bad2');
    SQLGold('npc_dota_hero_axe', 'bad3');
    SQLGold('npc_dota_hero_dark_willow', 'bad4');
    SQLGold('npc_dota_hero_shadow_demon', 'bad5');

    SQLXP('npc_dota_hero_luna', 'good1');
    SQLXP('npc_dota_hero_void_spirit', 'good2');
    SQLXP('npc_dota_hero_brewmaster', 'good3');
    SQLXP('npc_dota_hero_mirana', 'good4');
    SQLXP('npc_dota_hero_nyx_assassin', 'good5');

    SQLXP('npc_dota_hero_templar_assassin', 'bad1');
    SQLXP('npc_dota_hero_invoker', 'bad2');
    SQLXP('npc_dota_hero_axe', 'bad3');
    SQLXP('npc_dota_hero_dark_willow', 'bad4');
    SQLXP('npc_dota_hero_shadow_demon', 'bad5');

    SQLGOLDPIVOT();
    getXPGoldAdv();
}

function getTimedReports(time){
    SQLGOLDPIVOT(time);
    SQLCSPIVOT(time);
    SQLXPPIVOT(time);
    SQLKILLSPIVOT(time);

}

function SQLGOLDPIVOT(time){
    var s = `select sum("'${players[0]}'") as P1 ,sum("'${players[1]}'") as P2 ,sum("'${players[2]}'") as P3 ,sum("'${players[3]}'") as P4 ,sum("'${players[4]}'") as P5
            ,sum("'${players[5]}'")as P6 ,sum("'${players[6]}'")as P7 ,sum("'${players[7]}'")as P8 ,sum("'${players[8]}'")as P9 ,sum("'${players[9]}'")as P10
            
            from DOTA.PUBLIC.GOLD pivot(sum(GOLD) for TARGET in 
            ('${players[0]}' ,'${players[1]}' ,'${players[2]}' ,'${players[3]}' ,'${players[4]}'
            ,'${players[5]}' ,'${players[6]}' ,'${players[7]}' ,'${players[8]}' ,'${players[9]}'))

            where time::TIME <= '${time}'::TIME
            order by time asc`
    SQL(s, `gold-pivot`);
}

function SQLCSPIVOT(time){
    var s = `select sum("'${players[0]}'") as P1 ,sum("'${players[1]}'") as P2 ,sum("'${players[2]}'") as P3 ,sum("'${players[3]}'") as P4 ,sum("'${players[4]}'") as P5
                    ,sum("'${players[5]}'")as P6 ,sum("'${players[6]}'")as P7 ,sum("'${players[7]}'")as P8 ,sum("'${players[8]}'")as P9 ,sum("'${players[9]}'")as P10
            
            from DOTA.PUBLIC.CREEP_KILLS
                pivot(sum(UNIT) for ATTACKER in 
                ('${players[0]}' ,'${players[1]}' ,'${players[2]}' ,'${players[3]}' ,'${players[4]}'
                ,'${players[5]}' ,'${players[6]}' ,'${players[7]}' ,'${players[8]}' ,'${players[9]}'))
            
            where T::TIME <= '${time}'::TIME
            order by T asc;`;
    
    SQL(s, `cs-pivot`);
}

function SQLXPPIVOT(time){
    var s = `select sum("'${players[0]}'") as P1 ,sum("'${players[1]}'") as P2 ,sum("'${players[2]}'") as P3 ,sum("'${players[3]}'") as P4 ,sum("'${players[4]}'") as P5
                    ,sum("'${players[5]}'")as P6 ,sum("'${players[6]}'")as P7 ,sum("'${players[7]}'")as P8 ,sum("'${players[8]}'")as P9 ,sum("'${players[9]}'")as P10
            
                from DOTA.PUBLIC.XP pivot(sum(XP) for TARGET in 
                ('${players[0]}' ,'${players[1]}' ,'${players[2]}' ,'${players[3]}' ,'${players[4]}'
                ,'${players[5]}' ,'${players[6]}' ,'${players[7]}' ,'${players[8]}' ,'${players[9]}'))
            
            where T::TIME <= '${time}'::TIME
            order by T asc;`;
    
    SQL(s, `xp-pivot`);
}

function SQLKILLSPIVOT(time){
    var s = `select * from(
                select sum("'${players[0]}'") as P1 ,sum("'${players[1]}'") as P2 ,sum("'${players[2]}'") as P3 ,sum("'${players[3]}'") as P4 ,sum("'${players[4]}'") as P5
                    ,sum("'${players[5]}'")as P6 ,sum("'${players[6]}'")as P7 ,sum("'${players[7]}'")as P8 ,sum("'${players[8]}'")as P9 ,sum("'${players[9]}'")as P10
            
                from DOTA.PUBLIC.HERO_KILLS
                    pivot(sum(KILL) for ATTACKER in 
                ('${players[0]}' ,'${players[1]}' ,'${players[2]}' ,'${players[3]}' ,'${players[4]}'
                ,'${players[5]}' ,'${players[6]}' ,'${players[7]}' ,'${players[8]}' ,'${players[9]}'))
            
            where TIME::TIME <= dateadd('minute',1,'${time}'::TIME)
            order by Time asc
        )union
        select * from(    
            select sum("'${players[0]}'") as P1 ,sum("'${players[1]}'") as P2 ,sum("'${players[2]}'") as P3 ,sum("'${players[3]}'") as P4 ,sum("'${players[4]}'") as P5
                    ,sum("'${players[5]}'")as P6 ,sum("'${players[6]}'")as P7 ,sum("'${players[7]}'")as P8 ,sum("'${players[8]}'")as P9 ,sum("'${players[9]}'")as P10
            
                from DOTA.PUBLIC.HERO_DEATHS
                    pivot(sum(death) for HERO in 
                ('${players[0]}' ,'${players[1]}' ,'${players[2]}' ,'${players[3]}' ,'${players[4]}'
                ,'${players[5]}' ,'${players[6]}' ,'${players[7]}' ,'${players[8]}' ,'${players[9]}'))
            
            where TIME::TIME <= dateadd('minute',1,'${time}'::TIME)
            order by Time asc)`;

    SQL(s, `kills-pivot`);
}

function SQLGold(hero, pos){
    var s = ` select T, TARGET
            ,SUM( IFF(E:Direction::STRING = '-', 0, (E:Gold::INT))) as GLD
            ,sum(GLD) over (order by T asc) as RUN_TOTAL
            ,max(select sum(GOLD) from DOTA.PUBLIC.GOLD group by target order by 1 desc limit 1) AS MAX

            from DOTA.PUBLIC.GOLD
            where target = '${hero}'
            group by 1, 2
            order by t asc`;

    SQL(s, `gold-${pos}`);
}

function SQLXP(hero, pos){
    var s = `select T, TARGET
            ,SUM(XP) as EXP
            ,sum(EXP) over (order by T asc) as RUN_TOTAL
            ,max(select sum(XP) from DOTA.PUBLIC.XP group by target order by 1 desc limit 1) AS MAX
            
            from DOTA.PUBLIC.XP
            where target = '${hero}'
            group by 1, 2
            order by t asc;`;

    SQL(s, `xp-${pos}`);
}

function SQLCS(hero, pos, time){
    var s = `select T
            ,sum(unit) as tot_unit
            ,sum(tot_unit) over (order by T asc) as CS_RUN
            ,max(select sum(unit) from DOTA.PUBLIC.CREEP_KILLS where ATTACKER = '${hero}') AS MAX
            
            from DOTA.PUBLIC.CREEP_KILLS
            where ATTACKER = '${hero}' and T < '${time}'
            group by  1
            order by t desc
            limit 1;`;

    SQL(s, `cs-${pos}`);
}

function timelineStats(){
    var s = ` -- TIMELINE-STATS
            select distinct DATE_TRUNC('MINUTE', GM.E:Time::TIME) as TIME
            ,HOUR(TIME) AS HR
            ,MINUTE(TIME) AS MN
            ,SECOND(TIME) AS SS
            ,(HR*60*60) + (MN*60) + SS AS TOTAL_SEC
            ,GOLD.G_RAD AS GOLD_RAD
            ,GOLD.G_DIRE AS GOLD_DIRE
            ,XP_RAD
            ,XP_DIRE
            ,KILLS_RAD
            ,KILLS_DIRE
            ,BUILDINGS_RAD
            ,BUILDINGS_DIRE
            
            from dota.public.game GM
            left outer join (
                select DATE_TRUNC('MINUTE', T::TIME) as TIME
                ,sum(iff(TARGET IN ('${players[0]}','${players[1]}','${players[2]}','${players[3]}','${players[4]}'),gold, 0 )) as G_RAD
                ,sum(iff(TARGET IN ('${players[5]}','${players[6]}','${players[7]}','${players[8]}','${players[9]}'),gold, 0 )) AS G_DIRE
                
                from DOTA.PUBLIC.GOLD
                group by 1
            )GOLD on DATE_TRUNC('MINUTE', GM.E:Time::TIME) = GOLD.TIME
            
            left outer join (
                select DATE_TRUNC('MINUTE', T::TIME) as TIME2
                ,sum(iff(TARGET IN ('${players[0]}','${players[1]}','${players[2]}','${players[3]}','${players[4]}'),XP, 0 )) as XP_RAD
                ,sum(iff(TARGET IN ('${players[5]}','${players[6]}','${players[7]}','${players[8]}','${players[9]}'),XP, 0 )) AS XP_DIRE
                
                from DOTA.PUBLIC.XP
                group by 1
            )XP on DATE_TRUNC('MINUTE', GM.E:Time::TIME) = XP.TIME2

            left outer join(

                select DATE_TRUNC('MINUTE', TIME) as TIME3
                ,sum(iff(ATTACKER IN ('${players[0]}','${players[1]}','${players[2]}','${players[3]}','${players[4]}'),KILL, 0 )) as KILLS_RAD
                ,sum(iff(ATTACKER IN ('${players[5]}','${players[6]}','${players[7]}','${players[8]}','${players[9]}'),KILL, 0 )) AS KILLS_DIRE
                
                from DOTA.PUBLIC.HERO_KILLS
                group by 1) 
                KILLS on DATE_TRUNC('MINUTE', GM.E:Time::TIME) = KILLS.TIME3

            left outer join(

                select DATE_TRUNC('minute', TIME) as TIME4
                ,sum(iff(BUILDING like '%badguys%',1, 0 )) as BUILDINGS_RAD
                ,sum(iff(BUILDING like '%goodguys%',1, 0 )) AS BUILDINGS_DIRE
                
                from DOTA.PUBLIC.BUILDINGS
                group by 1) BUILDINGS on DATE_TRUNC('MINUTE', GM.E:Time::TIME) = BUILDINGS.TIME4

                
            order by 1 asc`;

    SQL(s, `timeline-stats`);
            
}//end function


function getperSecondData(t){
    var t = new Date(t*1000).toISOString().substr(11, 8)
    
    var s = `select distinct DATE_TRUNC('second', GM.E:Time::TIME) as TIME
            ,HOUR(TIME) AS HR
            ,MINUTE(TIME) AS MN
            ,SECOND(TIME) AS SS
            ,(HR*60*60) + (MN*60) + SS AS TOTAL_SEC
            ,CS.CS_RAD AS CS_RAD
            ,CS.CS_DIRE AS CS_DIRE
            ,XP_RAD
            ,XP_DIRE
            ,KILLS_RAD
            ,KILLS_DIRE
            ,BUILDINGS_RAD
            ,BUILDINGS_DIRE
            
            from dota.public.game GM
            left outer join (
                select DATE_TRUNC('second', T::TIME) as TIME2
                ,sum(iff(ATTACKER IN ('${players[0]}','${players[1]}','${players[2]}','${players[3]}','${players[4]}'),UNIT, 0 )) as CS_RAD
                ,sum(iff(ATTACKER IN ('${players[5]}','${players[6]}','${players[7]}','${players[8]}','${players[9]}'),UNIT, 0 )) AS CS_DIRE
                
                from DOTA.PUBLIC.CREEP_KILLS
                group by 1
            )CS on DATE_TRUNC('second', GM.E:Time::TIME) = CS.TIME2
            
            left outer join (
                select DATE_TRUNC('second', T::TIME) as TIME2
                ,sum(iff(TARGET IN ('${players[0]}','${players[1]}','${players[2]}','${players[3]}','${players[4]}'),XP, 0 )) as XP_RAD
                ,sum(iff(TARGET IN ('${players[5]}','${players[6]}','${players[7]}','${players[8]}','${players[9]}'),XP, 0 )) AS XP_DIRE
                
                from DOTA.PUBLIC.XP
                group by 1
            )XP on DATE_TRUNC('second', GM.E:Time::TIME) = XP.TIME2

            left outer join(

                select DATE_TRUNC('second', TIME) as TIME3
                ,sum(iff(ATTACKER IN ('${players[0]}','${players[1]}','${players[2]}','${players[3]}','${players[4]}'),KILL, 0 )) as KILLS_RAD
                ,sum(iff(ATTACKER IN ('${players[5]}','${players[6]}','${players[7]}','${players[8]}','${players[9]}'),KILL, 0 )) AS KILLS_DIRE
                
                from DOTA.PUBLIC.HERO_KILLS
                group by 1) KILLS on DATE_TRUNC('second', GM.E:Time::TIME) = KILLS.TIME3

            left outer join(

                    select DATE_TRUNC('SECOND', TIME) as TIME4
                    ,sum(iff(BUILDING like '%badguys%',1, 0 )) as BUILDINGS_RAD
                    ,sum(iff(BUILDING like '%goodguys%',1, 0 )) AS BUILDINGS_DIRE
                    
                    from DOTA.PUBLIC.BUILDINGS
                    group by 1) BUILDINGS on DATE_TRUNC('SECOND', GM.E:Time::TIME) = BUILDINGS.TIME4
    
            WHERE GM.E:Time::TIME >= '${t}'::TIME and GM.E:Time::TIME < dateadd(minute,1,'${t}'::time)
            order by 1 asc`;

    SQL(s, `timeline-sec-stats`);


}

function getXPGoldAdv(){
    var s = `  select DATE_TRUNC('MINUTE', GL.T::TIME) as TIME
                ,HOUR(TIME) AS HR
                ,MINUTE(TIME) AS MN
                ,(HR*60*60) + (MN*60) AS TOTAL_SEC 
                ,zeroifnull(XP_ADV) AS XP_ADV
                ,sum(iff(TARGET IN ('${players[0]}','${players[1]}','${players[2]}','${players[3]}','${players[4]}'),gold, 0 ))
                - sum(iff(TARGET IN ('${players[5]}','${players[6]}','${players[7]}','${players[8]}','${players[9]}'),gold, 0 )) AS GOLD_ADV

            from DOTA.PUBLIC.GOLD GL
            left outer join (
                select DATE_TRUNC('MINUTE', T::TIME) as TIME2,
                        sum(iff(TARGET IN ('${players[0]}','${players[1]}','${players[2]}','${players[3]}','${players[4]}'),XP, 0 ))
                        - sum(iff(TARGET IN ('${players[5]}','${players[6]}','${players[7]}','${players[8]}','${players[9]}'),XP, 0 )) AS XP_ADV

                from DOTA.PUBLIC.XP
                group by 1
            ) XP ON DATE_TRUNC('MINUTE', GL.T::TIME) = XP.TIME2
            group by 1,2,3,4,5
            order by 1 asc`;

    SQL(s, `xp-gold-adv`);

}




function handleGoldPivot(data){
    rank = [];
    for(i=1; i <=10; i++){
        rank.push({ player:i, gold: (data[0]['P'+i] ||0) })
        $('#tgold-' + i).html('<b>&#128081;G</b>'+ (data[0]['P'+i] ||0).toLocaleString('en',{maximumFractionDigits: 0}) )
    }

    rank.sort((a, b)=>(a.gold > b.gold)? -1 : 1);
    for(i=0; i <=9; i++){
        $('#rank-' + i).html(' ');

        $('#rank-' + i).html('<img src="' + $('#icon-' + (rank[i].player)).attr('src') + '" width="27px"><span style="color:white;">&#128081;' + (rank[i].gold).toLocaleString('en',{maximumFractionDigits: 0}) +'</span>')
        $('#rank-' + i).removeClass();
        $('#rank-' + i).addClass("bt");
        $('#rank-' + i).addClass("bb")
        if(rank[i].player <= 5){
            $('#rank-' + i).addClass("rad")
        }else{
            $('#rank-' + i).addClass("dire")
        }

    }//end for
}

function handleCSPivot(data){
    for(i=1; i <=10; i++){
        $('#cs-plyr' + i).html('&#128121;'+ (data[0]['P'+i] ||0).toLocaleString('en',{maximumFractionDigits: 0}))
    }
}

function handleXPPivot(data){
    for(i=1; i <=10; i++){
        $('#xp-' + i).html('<b>&#9876;P</b>'+ (data[0]['P'+i] ||0).toLocaleString('en',{maximumFractionDigits: 0}) )
    }
}

function handleKillsPivot(data){
    var kda = {g:0, b:0}
    $('#all-kda').html('0-0')
    for(i=1; i <=10; i++){
        $('#kda-' + i).html('<span style="font-size:20px">&#128481;</span>'+(data[0]['P'+i] ||0) + '<br><span style="font-size:20px">&#128128;</span>' + (data[1]['P'+i]||0))
        if(i <= 5){
            kda.g = kda.g + (data[0]['P'+i] || 0);
        }else{
            kda.b = kda.b + (data[0]['P'+i] || 0);
        }
    }

    var k = `${kda.g}-${kda.b}`
    $('#all-kda').html(k)
    
}







function drawSpark(data, chart, pos){
    var g = [];

    for(i=0; i < data.length; i++){
        g.push(data[i].RUN_TOTAL)
    }

    var color = '#FFF';
    if (chart == 'gold'){
        color = '#FFD700'
    }else if (chart =='xp'){
        color = '#62bd69'
    }

    $("#spark-"+chart+"-"+pos).sparkline(g, {type: "line", lineWidth: 3, chartRangeMin: 0, chartRangeMax: data[0].MAX, height:'35px', width:'100px',lineColor: color, fillColor: null, spotColor: null, minSpotColor: null, maxSpotColor: null, highlightSpotColor: null, highlightLineColor: null});
    $("#spark-"+chart+"-"+pos).bind('sparklineRegionChange', function(ev) {
        console.log(ev);
        var sparkline = ev.sparklines[0],
            region = sparkline.getCurrentRegionFields(),
            value = region.y;
        //console.log("x="+region.x+" y="+region.y);
    
    })//end spark

}
