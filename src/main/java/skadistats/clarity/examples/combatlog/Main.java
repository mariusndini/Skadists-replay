package skadistats.clarity.examples.combatlog;
import org.joda.time.Duration;
import org.joda.time.format.PeriodFormatter;
import org.joda.time.format.PeriodFormatterBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import skadistats.clarity.model.CombatLogEntry;
import skadistats.clarity.processor.gameevents.OnCombatLogEntry;
import skadistats.clarity.processor.runner.SimpleRunner;
import skadistats.clarity.source.MappedFileSource;
import skadistats.clarity.wire.common.proto.DotaUserMessages;

public class Main {

    private final Logger log = LoggerFactory.getLogger(Main.class.getPackage().getClass());

    private final PeriodFormatter GAMETIME_FORMATTER = new PeriodFormatterBuilder()
        .minimumPrintedDigits(2)
        .printZeroAlways()
        .appendHours()
        .appendLiteral(":")
        .appendMinutes()
        .appendLiteral(":")
        .appendSeconds()
        .appendLiteral(".")
        .appendMillis3Digit()
        .toFormatter();

    private String compileName(String attackerName, boolean isIllusion) {
        return attackerName != null ? attackerName + (isIllusion ? " (illusion)" : "") : "UNKNOWN";
    }

    private String getAttackerNameCompiled(CombatLogEntry cle) {
        return compileName(cle.getAttackerName(), cle.isAttackerIllusion());
    }

    private String getTargetNameCompiled(CombatLogEntry cle) {
        return compileName(cle.getTargetName(), cle.isTargetIllusion());
    }

    @OnCombatLogEntry
    public void onCombatLogEntry(CombatLogEntry cle) {
        String time = GAMETIME_FORMATTER.print(Duration.millis((int) (1000.0f * cle.getTimestamp())).toPeriod());
        //DotaUserMessages.DOTA_COMBATLOG_TYPES type = cle.getType();
        //log.info("\n{} ({}): {}", type.name(), type.ordinal(), cle);

        switch (cle.getType()) {

            case DOTA_COMBATLOG_DAMAGE:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"Attacker\":\"{}\",\"Target\":\"{}\",\"Inflictor\":\"{}\",\"Value\":\"{}\",\"HP\":\"{}\",\"NHP\":\"{}\",\"LH\":\"{}\",\"DmgType\":\"{}\",\"DamageCategory\":\"{}\",\"NetWorth\":\"{}\"}",
                    time, cle.getType(),
                    getAttackerNameCompiled(cle),
                    getTargetNameCompiled(cle),
                    cle.getInflictorName() != null ? cle.getInflictorName() : "",
                    cle.getValue(),
                    cle.getHealth() != 0 ? cle.getHealth() + cle.getValue():"",
                    cle.getHealth() != 0 ? cle.getHealth() : "",
                    cle.getLastHits(),
                    cle.getDamageType(),
                    cle.getDamageCategory(),
                    cle.getNetworth()
                );
                break;
                
            case DOTA_COMBATLOG_HEAL:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"Attacker\":\"{}\",\"Inflictor\":\"{}\",\"Target\":\"{}\",\"Value\":\"{}\",\"HP\":\"{}\",\"NHP\":\"{}\"}",
                    time, cle.getType(),
                    getAttackerNameCompiled(cle),
                    cle.getInflictorName(),
                    getTargetNameCompiled(cle),
                    cle.getValue(),
                    cle.getHealth() - cle.getValue(),
                    cle.getHealth()
                );
                break;
            
            case DOTA_COMBATLOG_MODIFIER_ADD:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"Target\":\"{}\",\"ModType\":\"buff/debuff\",\"Attacker\":\"{}\"}",
                    time, cle.getType(),
                    getTargetNameCompiled(cle),
                    cle.getInflictorName(),
                    getAttackerNameCompiled(cle)
                );
                break;
            
            case DOTA_COMBATLOG_MODIFIER_REMOVE:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"Target\":\"{}\",\"ModType\":\"buff/debuff\",\"Attacker\":\"{}\"}",
                    time, cle.getType(),
                    getTargetNameCompiled(cle),
                    cle.getInflictorName(),
                    getAttackerNameCompiled(cle)
                );
                break;
            
            case DOTA_COMBATLOG_DEATH:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"Target\":\"{}\",\"Attacker\":\"{}\"}",
                    time,cle.getType(),
                    getTargetNameCompiled(cle),
                    getAttackerNameCompiled(cle)
                );
                break;
            
            case DOTA_COMBATLOG_ABILITY:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"Attacker\":\"{}\",\"Action\":\"{}\",\"Inflictor\":\"{}\",\"Level\":\"{}\",\"Toggle\":\"{}\",\"Target\":\"{}\"}",
                    time,cle.getType(),
                    getAttackerNameCompiled(cle),
                    cle.isAbilityToggleOn() || cle.isAbilityToggleOff() ? "toggles" : "casts",
                    cle.getInflictorName(),
                    cle.getAbilityLevel(),
                    cle.isAbilityToggleOn() ? "" : cle.isAbilityToggleOff() ? " off" : "",
                    cle.getTargetName() != null ? getTargetNameCompiled(cle) : ""
                );
                break;
            
            case DOTA_COMBATLOG_ITEM:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"Attacker\":\"{}\",\"Inflictor\":\"{}\"}",
                    time,cle.getType(),
                    getAttackerNameCompiled(cle),
                    cle.getInflictorName()
                );
                break;
            
            case DOTA_COMBATLOG_GOLD:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"Target\":\"{}\",\"Direction\":\"{}\",\"Gold\":\"{}\",\"Reason\":\"{}\",\"X\":\"{}\",\"Y\":\"{}\"}",
                    time,cle.getType(),
                    getTargetNameCompiled(cle),
                    cle.getValue() < 0 ? "-" : "+",
                    Math.abs(cle.getValue()),
                    cle.getGoldReason(),
                    cle.getLocationX(),
                    cle.getLocationY()
                );
                break;
            
            case DOTA_COMBATLOG_GAME_STATE:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"State\":\"{}\"}",
                    time,cle.getType(),
                    cle.getValue()
                );
                break;

            case DOTA_COMBATLOG_FIRST_BLOOD:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"AttackerTeam\":\"{}\"}",
                    time,cle.getType(),
                    cle.getAttackerTeam()
                );
                break;

            case DOTA_COMBATLOG_TEAM_BUILDING_KILL:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"AttackerTeam\":\"{}\",\"TargetTeam\":\"{}\",\"Value\":\"{}\",\"Units\":\"{}\",\"Name\":\"{}\"}",
                    time,cle.getType(),
                    cle.getAttackerTeam(),
                    cle.getTargetTeam(),
                    cle.getValue(),
                    cle.getTotalUnitDeathCount(),
                    getTargetNameCompiled(cle)

                );
                break;

            case DOTA_COMBATLOG_MULTIKILL:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"Attacker\":\"{}\",\"Target\":\"{}\",\"Value\":\"{}\",\"Source\":\"{}\"}",
                    time,cle.getType(),
                    getAttackerNameCompiled(cle),
                    getTargetNameCompiled(cle),
                    cle.getValue(),
                    cle.getTargetSourceName()
                );
                break;
            
            case DOTA_COMBATLOG_CRITICAL_DAMAGE:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"Attacker\":\"{}\",\"Target\":\"{}\",\"Value\":\"{}\",\"HP\":\"{}\",\"TargetSource\":\"{}\",\"DamageSource\":\"{}\",\"Inflictor\":\"{}\"}",
                    time,cle.getType(),
                    getAttackerNameCompiled(cle),
                    getTargetNameCompiled(cle),
                    cle.getValue(),
                    cle.getHealth() != 0 ? cle.getHealth() : "",
                    cle.getTargetSourceName(),
                    cle.getDamageSourceName(),
                    cle.getInflictorName()
                );
                break;
            
            case DOTA_COMBATLOG_XP:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"Target\":\"{}\",\"XP\":\"{}\",\"Reason\":\"{}\",\"X\":\"{}\",\"Y\":\"{}\"}",
                    time,cle.getType(),
                    getTargetNameCompiled(cle),
                    cle.getValue(),
                    cle.getXpReason(),
                    cle.getLocationX(),
                    cle.getLocationY()
                );
                break;
            
            case DOTA_COMBATLOG_PURCHASE:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"Target\":\"{}\",\"Value\":\"{}\",\"NetWorth\":\"{}\"}",
                    time,cle.getType(),
                    getTargetNameCompiled(cle),
                    cle.getValueName(),
                    cle.getNetworth()
                );
                break;
            
            case DOTA_COMBATLOG_BUYBACK:
                log.info("{\"Time\":{}\",\"Type\":\"{}\",\"Value\":\"{}\"}",
                    time,cle.getType(),
                    cle.getValue()
                );
                break;
            
            case DOTA_COMBATLOG_ABILITY_TRIGGER:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"Value\":\"{}\"}",
                    time,cle.getType(),
                    cle.getValue()
                );
                break;

            case DOTA_COMBATLOG_MODIFIER_STACK_EVENT:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"Target\":\"{}\",\"Attacker\":\"{}\",\"Value\":\"{}\",\"StunDuration\":\"{}\",\"SlowDuration\":\"{}\",\"LH\":\"{}\",\"NW\":\"{}\",\"ObsPlaced\":\"{}\",\"DamageSource\":\"{}\"}",
                    time,cle.getType(),
                    getTargetNameCompiled(cle),
                    getAttackerNameCompiled(cle),
                    cle.getValue(),
                    cle.getStunDuration(),
                    cle.getSlowDuration(),
                    cle.getLastHits(),
                    cle.getNetworth(),
                    cle.getObsWardsPlaced(),
                    cle.getDamageSourceName()
                );
                break;
            
            case DOTA_COMBATLOG_PLAYERSTATS:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"Target\":\"{}\",\"Attacker\":\"{}\",\"Value\":\"{}\",\"StunDuration\":\"{}\",\"SlowDuration\":\"{}\",\"LH\":\"{}\",\"NW\":\"{}\",\"ObsPlaced\":\"{}\",\"DamageSource\":\"{}\"}",
                    time,cle.getType(),
                    getTargetNameCompiled(cle),
                    getAttackerNameCompiled(cle),
                    cle.getValue(),
                    cle.getStunDuration(),
                    cle.getSlowDuration(),
                    cle.getLastHits(),
                    cle.getNetworth(),
                    cle.getObsWardsPlaced(),
                    cle.getDamageSourceName()
                );
                break;
            
            case DOTA_COMBATLOG_KILLSTREAK:
                log.info("{\"Time\":\"{}\",\"Type\":\"{}\",\"Value\":\"{}\",\"Target\":\"{}\",\"Attacker\":\"{}\",\"TargetSource\":\"{}\"}",
                    time,cle.getType(),
                    cle.getValue(),
                    cle.getTargetName(),
                    cle.getAttackerName(),
                    cle.getTargetSourceName()
                );
                break;


            default:
                DotaUserMessages.DOTA_COMBATLOG_TYPES type = cle.getType();
                log.info("\n{} \"({})\": {}\n", type.name(), type.ordinal(), cle);
                break;

        }
    }

    public void run(String[] args) throws Exception {
        long tStart = System.currentTimeMillis();
        new SimpleRunner(new MappedFileSource(args[0])).runWith(this);
        long tMatch = System.currentTimeMillis() - tStart;
        //log.info("total time taken: {}s", (tMatch) / 1000.0);
    }
    
    //input stream
    public static void main(String[] args) throws Exception {
        new Main().run(args);
    }


}
