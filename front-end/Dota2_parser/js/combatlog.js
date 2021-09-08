function getTeam(evt){
    if(players.indexOf(evt)<5){
        return '#315e26';
    }else if (players.indexOf(evt)>=5){
        return '#e73c37'
    }else{
        return '#000'
    }
}

function damage(event){
    var pill = `<span style='margin-bottom:8px; background-color:#c06c84' class="badge badge-dark">
                            <span class="badge" style='background-color:${getTeam(event.Attacker)}'>
                                <img src="img/${event.Attacker.replace('npc_dota_hero_','').toLowerCase()}_icon.png" width="30px">
                                ${event.Attacker.replace('npc_dota_hero_','').replace('npc_dota_creep_','')}
                            </span> > hits >

                            <span class="badge" style='background-color:${getTeam(event.Target)}'>
                                <img src="img/${event.Target.replace('npc_dota_hero_','').toLowerCase()}_icon.png" width="30px">
                                ${event.Target.replace('npc_dota_hero_','').replace('npc_dota_creep_','')} 
                            </span>
                            for ${ event.Value } damage. With
                            
                            ${event.Inflictor.replace('dota_unknown', '-') } - HP
                            ${event.HP }-->${event.NHP } 
                            <br><span style='font-size:9px'>Damage (${event.Time})</span>
                        </span><br>`;        
    return pill;
}

function ability(event){
    var pill = `<span style='margin-bottom:8px; background-color:#6c5b7b' class="badge badge-danger">
                        <span class="badge" style='background-color:${getTeam(event.Attacker)}'>
                            <img src="img/${event.Attacker.replace('npc_dota_hero_','').toLowerCase()}_icon.png" width="30px">
                            ${event.Attacker.replace('npc_dota_hero_','') }               
                        </span>    
                            ${event.Action } ${event.Inflictor.replace('dota_unknown', 'unk') } on 
                            
                        <span class="badge" style='background-color:${getTeam(event.Target)}'>
                            <img src="img/${event.Target.replace('npc_dota_hero_','').toLowerCase()}_icon.png" width="30px">
                            ${event.Target.replace('npc_dota_hero_','') } 
                        </span>

                        <br><span style='font-size:9px'>Hero Ability (${event.Time})</span>
                        </span><br>`;   
    return pill;
}

function playerStats(event){
    return (JSON.stringify(event));
}

function modAdd(event){
//{"Attacker":"modifier_invoker_quas_instance","ModType":"buff/debuff","Target":"npc_dota_hero_invoker","Time":"00:23:49.433","Type":"DOTA_COMBATLOG_MODIFIER_ADD"}
    var pill = `<span style='margin-bottom:8px; background-color:#e84a5f' class="badge badge-danger">
                            ${event.Attacker.replace('modifier_','') }               
                                > Modifier >
                        
                        <span class="badge" style='background-color:${getTeam(event.Target)}'>
                                <img src="img/${event.Target.replace('npc_dota_hero_','').toLowerCase()}_icon.png" width="30px">
                            ${event.Target.replace('npc_dota_hero_','') }
                        </span>
                    <br><span style='font-size:9px'>Mod-Add (${event.Time})</span>
                    </span><br>`;
        return pill;
}

function modRemove(event){
//{"Attacker":"modifier_item_ring_of_basilius_effect","ModType":"buff/debuff","Target":"npc_dota_hero_dark_willow","Time":"00:36:16.400","Type":"DOTA_COMBATLOG_MODIFIER_REMOVE"}
var pill = `<span style='margin-bottom:8px; background-color:#ff847c' class="badge badge-danger">
                            ${event.Attacker.replace('modifier_','') }               
                                > Modifier >
                        <img src="img/${event.Target.replace('npc_dota_hero_','').toLowerCase()}_icon.png" width="30px">
                            ${event.Target.replace('npc_dota_hero_','') }
                    <br><span style='font-size:9px'>Mod-Remove (${event.Time})</span>
                    </span><br>`;
        return pill;

}

function death(event){
    if(event.Target.includes('npc_dota_hero')){
        var pill = `<span style='margin-bottom:8px; background-color:black; border:1px white solid' class="badge badge-danger">
                        <span class="badge" style='background-color:${getTeam(event.Attacker)}'>
                            <img src="img/${event.Attacker.replace('npc_dota_hero_','').toLowerCase()}_icon.png" width="30px">
                                ${event.Attacker.replace('npc_dota_hero_','') }
                        </span>> Kills >

                        &#128128;<span class="badge" style='background-color:${getTeam(event.Target)}'>
                            <img src="img/${event.Target.replace('npc_dota_hero_','').toLowerCase()}_icon.png" width="30px">
                                ${event.Target.replace('npc_dota_hero_','') }
                        </span>&#128128; 
                        
                    <br><span style='font-size:9px'>Death (${event.Time})</span>
                    </span><br>`;
        return pill;
    }

}

function item(event){
    var pill = `<span style='margin-bottom:8px; background-color:#2a363b' class="badge badge-danger">
                <img src="img/${event.Attacker.replace('npc_dota_hero_','').toLowerCase()}_icon.png" width="30px">
                    ${event.Attacker.replace('npc_dota_hero_','') }               
                        > uses item >
                ${event.Inflictor.replace('item_','') }                      
            <br><span style='font-size:9px'>Item (${event.Time})</span>
            </span><br>`;
    return pill;

}

function buildingKill(event){
    var pill = `<span style='margin-bottom:8px; background-color:#98777b' class="badge badge-danger">
                <img src="img/building.png" height="30px">
                    ${event.Name.replace('npc_dota_','').replace('goodguys','radiant').replace('badguys','dire') }               
                    > is Taken by Opposing team
            <br><span style='font-size:9px'>Building (${event.Time})</span>
            </span><br>`;
    return pill;

}

function gold(event){
//{"Direction":"+","Gold":"20","Reason":"14","Target":"npc_dota_hero_axe","Time":"00:22:17.933","Type":"DOTA_COMBATLOG_GOLD","X":"3453.8718","Y":"-4566.5435"}
    var g = event.Gold;
    var t = "earned";
    
    if (event.Direction == '-'){
        g = g * -1;
        t = 'loses';
    }
    var pill = `<span style='margin-bottom:8px; background-color:#f96209' class="badge badge-danger">
                    <span class="badge" style='background-color:${getTeam(event.Target)}'>
                        <img src="img/${event.Target.replace('npc_dota_hero_','').toLowerCase()}_icon.png" width="30px">
                        ${event.Target.replace('npc_dota_hero_','') }
                    </span> > ${t} >
                <b>${g} </b> Gold                     
            <br><span style='font-size:9px'>Gold (${event.Time})</span>
            </span><br>`;
    return pill;

}