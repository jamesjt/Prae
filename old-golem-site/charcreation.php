
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
  <title>Prae Character Sheet</title>
  <script src="https://code.jquery.com/jquery-1.11.3.js"></script>
  <script src="js/newcharCreation.js"></script>
  <script src="js/jquery.sticky-kit.js"></script>
  <script src="js/jquery-ui.min.js"></script>
  
  <script type="text/javascript">

  function titleChange(event){
    document.title = $('#charName').val() + "";
  }
  function hide (hideTarget){
    console.log(hideTarget);
    $("#" + hideTarget).addClass('hidden');
    $("#hide" + hideTarget).addClass('hidden');
    $("#show" + hideTarget).removeClass('hidden');
  }

  function show (hideTarget){
    $("#" + hideTarget).removeClass('hidden');
    $("#hide" + hideTarget).removeClass('hidden');
    $("#show" + hideTarget).addClass('hidden');
  }
 
 $( function() {
    $( ".draggable" ).draggable();
  } );
  </script> 

  <link rel="stylesheet" type="text/css" href="stylesheets/normailze.css">
  <link rel="stylesheet" type="text/css" href="stylesheets/d10general.css">
  <link rel="stylesheet" type="text/css" href="stylesheets/newCClayout.css">

</head>

<body>

  <section class="section" id="TraeaSection">
    <input type="hidden" id="charID" value="0" />
      <header class="hideWrapper sectionHeader">

        <button id="showTraea" class="hidden showButton" onclick="show('Traea');">Traea</button>
        <button id="hideTraea" class="hide" onclick="hide('Traea');">[&#8213;]</button>
      </header>

      <article id="Traea" class="sectionBody">

        <div id="charInfo">
            Name <input id="charName" class="charText" type="text" onchange="titleChange();">
            Level <input id="charLvl" class="charText" type="number" min="1" max="11" step="1" value="1" onkeyup="skillPoints(event); setAbilityAmount(event); setAttPoints(event);" onmouseup="skillPoints(event); setAbilityAmount(event); setAttPoints(event);">
            Childhood <input id="childhood" class="charText" type="text">
            Training <input id="training" class="charText" type="text">
            Way 
            <select id="roleSelector" onchange="populateRoleInfo(event);">
              <option value=""></option>
              <option value="Battlerager" class="bodyColor">Battlerager</option>
              <option value="Berserker" class="bodyColor">Berserker</option>
              <option value="Blade Dancer" class="bodyColor">Blade Dancer</option>
              <option value="Bravo" class="bodyColor">Bravo</option>
              <option value="Iaidoka" class="bodyColor">Iaidoka</option>
              <option value="Sentinel" class="bodyColor">Sentinel</option>
              <option value="Shadow Strider" class="bodyColor">Shadow Strider</option>
              <option value="Unfettered" class="bodyColor">Unfettered</option>
              <option value="Bladeweaver" class="mindColor">Blade Weaver</option>
              <option value="Bulwark" class="mindColor">Bulwark</option>
              <option value="Channeler" class="mindColor">Channeler</option>
              <option value="Firefly" class="mindColor">Firefly</option>
              <option value="Mage Cadre" class="mindColor">Mage Cadre</option>
              <option value="Sculptor" class="mindColor">Sculptor</option>      
              <option value="Stormcaller" class="mindColor">Stormcaller</option>
              <option value="Breaker" class="spiritColor">Breaker</option>
              <option value="Overseer" class="spiritColor">Overseer</option>
              <option value="Warden" class="spiritColor">Warden</option>
            </select>
            <img id="showCheckList" class="charInfoHover" onclick="showDesc('checkList');" src="imgs/check.png">
            <div id="checkList" class="charDetails draggable abilityFieldset">
              <div class="abilityLegend gLegend">Character Creation Checkist</div>
              <div id="hideCheckList" class="closeRitual" onclick="hideDesc('checkList');">X</div>
              <div class="checkSection abilityField gField">
                <div class="flex">
                 Remaining Skills <div id="skillPoints">12</div> 
                 Max Skill Rank  <div id="maxSkillRank" >3:Trained</div>
                </div>
                <div class="flex" style="margin-top:3px">
                    Total Abilities  <div id="abilityNumber" >4</div>
                    Remaining Abilities  <div id="remainingAbilities" >0</div>
                </div>
              </div>
              <div id="childhoodCheck" class="checkSection abilityField gField">
                Childhood skills:<br/>
                <div class="indent">
                  - 1 Physical to Basic<br/>
                  - 1 Mental to Basic<br/>
                  - 1 Social to Basic<br/>
                  - 1 of your choice to Basic
                </div>
              </div>
              <div id="trainingCheck" class="checkSection abilityField gField">
                Training skills:<br/>
                <div class="indent">
                  - 1 of your choice to Basic<br/>
                  - 1 of a different category than above to Basic<br/>
                  - 1 of your choice to Basic<br/>
                  - 3 Basic to Trained
                </div>
              </div>
              <div id="wayCheck" class="checkSection abilityField gField">
                Select a Way.<br/>
                <div class="indent">
                - Attack Skill(s) to Trained<br/>
                - 1 Talent
                </div>
              </div>
              <div id="abilityCheck" class="checkSection abilityField gField">
                Choose your starting abilities<br/>
                <div class="indent">
                  - 1 Talent<br/>
                  - 2 Tricks
                </div>
              </div>
              <div id="proficiencyCheck" class="checkSection abilityField gField">
                Attacks of basic and above have proficiencies to select<br/>
                <div class="indent">
                  - Strike proficiencies in fighting styles<br/>
                  - Blast proficiencies give access to elements<br/>
                  - Invoke proficiencies give specializations in emotions
                </div>
              </div>
              <div id="attributeCheck" class="checkSection abilityField gField">
                Assign Attributes
                <div class="indent">
                  - Select Primary Attribute. Assign it a value of 2. <br/>
                  - Select Secondary Attribute. Assign it a value of 2. <br/>
                  - Select Tertiary Attribute. Assing it a value of 1.<br/>
                  - Distribute attribute points into sub-attributes (Primary: 3, Secondary: 2, Tertiary 1)
                </div>
              </div>
              <div id="gearCheck" class="checkSection abilityField gField">
                Purchase Gear: 90 + 6d10g as starting money.<br/>
                - You get your coin pouch for free.<br/>
                - Purchase any equipment you want to carry that is not on the adventuring gear list (kits, weapons, armor, clothes)<br/>
                - Any remaining slots are flexible.
              </div>
            </div>
            <button id="charSave" onclick="saveCharacter();">Save</button>                    
        </div>

        <div class="secondaryAttributesWrapper">
            <div class="flex">
                <div class="attributeEntry" id="HP">
                    <span id="maxHpValue">30</span> <span id="marredValue">20</span> <span id="desperateValue">10</span> <span id="deadValue">-10</span>
                </div>
                <div id="fatigue" class="attributeEntry">
                    <div class="fatigueValue flex">
                        <input id="fatigueCurrent" value="0" type="text" class="attributeValue"> 
                        <div class="attributeValue">/</div>
                        <div id="fatigueThreshold" class="attributeValue">3</div>
                    </div>
                </div>  
                <!--
                <div id="recovery" class="attributeEntry">
                  <div type="text" id="recoveryValue" class="attributeValue">1</div>       
                </div>
                -->
                <div id="guard" class="attributeEntry">
                    <div id="guardValue" class="attributeValue">7</div>
                </div>
                <div id="armor" class="attributeEntry">
                    <div type="text" id="armorValue" class="attributeValue"> 0 </div>
                </div>  
                <div id="initiative" class="attributeEntry">
                    <div id="initiativeValue" class="attributeValue">0</div>
                </div>
                <div id="initialMomentum" class="attributeEntry">
                    <div id="initialMomentumValue" class="attributeValue">3</div>
                </div>
                <div id="conversion" class="attributeEntry">
                    <div id="conversionValue" class="attributeValue">3</div> 
                </div> 
                <div id="mana" class="attributeEntry">
                    <div type="text" id="manaValue" class="attributeValue">  3</div>
                </div>                
                 <div id="pace" class="attributeEntry">
                    <div id="paceValue" class="attributeValue">6</div>
                </div>
                <div id="run" class="attributeEntry">
                    <div id="runValue" class="attributeValue">8</div>
                </div>
                <div id="sprint" class="attributeEntry">
                    <div id="sprintValue" class="attributeValue">12</div>
                </div> 
                         
            </div>

          <div class="flex">
            <div id="maxHPDesc" class="attributeDesc">
                Max HP
            </div>
            <div id="marredDesc" class="attributeDesc">
                Marred
            </div>
            <div id="desperateDesc" class="attributeDesc">
                Desperate
            </div>
            <div id="deadDesc" class="attributeDesc">
                Dead
            </div>
            <div id="fatigueDesc" class="attributeDesc">
                Fatigue
                <div class="flex exhaustion">
                  <input type="checkbox" class="exhaustionBox"/>
                  <input type="checkbox" class="exhaustionBox"/>
                  <input type="checkbox" class="exhaustionBox"/>
                </div>
            </div>
            <!--
            <div id="recoveryDesc" class="attributeDesc">
               Recovery
            </div>
            -->
            <div id="guardDesc" class="attributeDesc">
                Guard
            </div>
            <div id="armorDesc" class="attributeDesc">
              Armor
            </div>
            <div id="initiativeDesc" class="attributeDesc">
                Initiative
            </div>
            <div id="initialMomentumDesc" class="attributeDesc">
                Initial<br/>
                Momentum
            </div>
            <div id="conversionDesc" class="attributeDesc">
                Conversion
            </div>
            <div id="manaDesc" class="attributeDesc">
                Mana
            </div>
                      
            <div id="paceDesc" class="attributeDesc">
              Pace
            </div>
            <div id="runDesc" class="attributeDesc">
              Run
            </div>
            <div id="sprintDesc" class="attributeDesc">
              Sprint
            </div>
            
          </div>

        </div> <!-- End Secondary Attributes Wrapper -->

        <div class="flex">
        <div class="column1">
            <div id="skillHeader" class="skillListing">
              <div class="skillName">
                Name
              </div>
              <div class="skillRank" style="text-align:center;">
                Rank
              </div>
              <div id="skillMod" class="skillMod" style="text-align:center;">
                Mod
              </div>
              <div id="skillPassive" class="skillPassive" style="text-align:center;">
                Passive
              </div>
            </div>

          <!-- Physical Stats Wrapper -->
          <div id="physicalStatsWrapper" class="statsWrapper"> 

            <!-- Physical Attributes -->
            <div class="attributeWrapper physicalAtt">
              <span style="font-size: 10px;">Priority</span>
              <select id="bodyPriority" class="attributeSelect" onchange="attPriority('body', event);">
  					    <option value="0"></option>
  					    <option value="1">1st</option>
  			  		  <option value="2">2nd</option>
  			  		  <option value="3">3rd</option>
  		        </select>
              <div class="attribute bodyColor">
                Body
                <div id="bodyValue" class="filledField" style="width:30px;">
                  0
                </div>
              </div>
              <span style="font-size: 10px;">Attribute Points</span>
              <div id="physicalAttributePoints" class="attributePoints">UA</div>
            </div>

            <!-- Physical Sub-Attributes -->
            <div class="subAttributeWrapper">
              <div class="subAttribute mightSkill">
                Might
                <input class="inputField"  id="mightValue" type="number" min="0" max="0" step="1" value="0" onkeyup="setSkillValues(event, ['athletics', 'force']); setAttPoints(event);" onmouseup="setSkillValues(event, ['athletics', 'force']); setAttPoints(event);" onchange="setSkillValues(event, ['athletics', 'force']); setAttPoints(event);" />
              </div>
              <div class="subAttribute subMiddle agilitySkill">
                Agility
                <input class="inputField"  id="agilityValue" type="number" min="0" max="0" step="1" value="0" onkeyup="setSkillValues(event, ['acrobatics', 'sneak']); setAttPoints(event);" onmouseup="setSkillValues(event, ['acrobatics', 'sneak']); setAttPoints(event);" onchange="setSkillValues(event, ['acrobatics', 'sneak']); setAttPoints(event);"/>
              </div>
              <div class="subAttribute brawnSkill">
                Brawn
                <input class="inputField"  id="brawnValue" type="number" min="0" max="0" step="1" value="0" onkeyup="setSkillValues(event, ['endurance', 'poise']); setAttPoints(event);" onmouseup="setSkillValues(event, ['endurance', 'poise']); setAttPoints(event);" onchange="setSkillValues(event, ['endurance', 'poise']); setAttPoints(event);"/>
              </div>
            </div>
            
            <!-- Physical Skills -->
            <div class="skillWrapper">

            <!-- Athletics -->
              <div class="skillListing mightSkill">
                <div class="skillName">
                  Athletics
                </div>
                <div class="skillRank">
                  <select id="athleticsSkillRank" onchange="setSkillValues(event, 'might'); skillPoints(event);" class="nonAttackSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="athleticsSkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="athleticsSkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>

            <!-- Force -->
              <div class="skillListing mightSkill">
                <div class="skillName">
                  Force
                </div>
                <div class="skillRank">
                  <select id="forceSkillRank" onchange="setSkillValues(event, 'might'); skillPoints(event);" class="nonAttackSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="forceSkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="forceSkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>

            <!-- Acrobatics -->
              <div class="skillListing agilitySkill skillListingMidTop">
                <div class="skillName">
                  Acrobatics
                </div>
                <div class="skillRank">
                  <select id="acrobaticsSkillRank" onchange="setSkillValues(event, 'agility'); skillPoints(event);" class="nonAttackSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="acrobaticsSkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="acrobaticsSkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>

            <!-- Sneak -->
              <div class="skillListing agilitySkill skillListingMidBot">
                <div class="skillName">
                  Sneak
                </div>
                <div class="skillRank">
                  <select id="sneakSkillRank" onchange="setSkillValues(event, 'agility'); skillPoints(event);" class="nonAttackSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="sneakSkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="sneakSkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>

            <!-- Endurance -->
              <div class="skillListing brawnSkill">
                <div class="skillName">
                  Endurance
                </div>
                <div class="skillRank">
                  <select id="enduranceSkillRank" onchange="setSkillValues(event, 'brawn'); skillPoints(event);" class="nonAttackSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="enduranceSkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="enduranceSkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>

            <!-- Poise -->
              <div class="skillListing brawnSkill">
                <div class="skillName">
                  Poise
                </div>
                <div class="skillRank">
                  <select id="poiseSkillRank" onchange="setSkillValues(event, 'brawn'); skillPoints(event);" class="nonAttackSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="poiseSkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="poiseSkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>

            </div> <!-- End Physical Skills Wrapper-->
          </div> <!-- End Physical Stats Wrapper -->

          <!-- Mental Stats Wrapper -->
          <div id="mentalStatsWrapper" class="statsWrapper"> 

            <!-- Mental Attributes -->
            <div class="attributeWrapper mentalAtt">
              <span style="font-size: 10px;">Priority</span>
              <select id="mindPriority" class="attributeSelect" onchange="attPriority('mind', event);">
                <option value="0"></option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
              </select>
              <div class="attribute mindColor">
                Mind
                <div id="mindValue" class="filledField" style="width:30px;">
                  0
                </div>
              </div>
              <span style="font-size: 10px;">Attribute Points</span>
              <div id="mentalAttributePoints" class="attributePoints">UA</div>
            </div>

            <!-- Mental Sub-Attributes -->
            <div class="subAttributeWrapper">
              <div class="subAttribute willSkill">
                Will
                <input class="inputField"  id="willValue" type="number" min="0" max="4" step="1" value="0" onkeyup="setSkillValues(event, ['lore', 'survival']); setAttPoints(event);" onmouseup="setSkillValues(event, ['lore', 'survival']); setAttPoints(event);"
                onchange="setSkillValues(event, ['lore', 'survival']); setAttPoints(event);"/>
              </div>
              <div class="subAttribute subMiddle witSkill">
                Wit
                <input class="inputField"  id="witValue" type="number" min="0" max="4" step="1" value="0" onkeyup="setSkillValues(event, ['deception', 'insight']); setAttPoints(event);" onmouseup="setSkillValues(event, ['deception', 'insight']); setAttPoints(event);" onchange="setSkillValues(event, ['deception', 'insight']); setAttPoints(event);"/>
              </div>
              <div class="subAttribute resolveSkill">
                Resolve
                <input class="inputField"  id="resolveValue" type="number" min="0" max="4" step="1" value="0" onkeyup="setSkillValues(event, ['athletics', 'force']); setAttPoints(event);" onmouseup="setSkillValues(event, ['awareness', 'tinkering']); setAttPoints(event);" onchange="setSkillValues(event, ['awareness', 'tinkering']); setAttPoints(event);"/>
              </div>
            </div>
            
            <!-- Mental Skills -->
            <div class="skillWrapper">

            <!-- lore -->
              <div class="skillListing willSkill">
                <div class="skillName">
                  Lore
                </div>
                <div class="skillRank">
                  <select id="loreSkillRank" onchange="setSkillValues(event, 'will'); skillPoints(event);" class="nonAttackSkills mentalSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="loreSkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="loreSkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>

            <!-- Survival -->
              <div class="skillListing willSkill">
                <div class="skillName">
                  Survival
                </div>
                <div class="skillRank">
                  <select id="survivalSkillRank" onchange="setSkillValues(event, 'will'); skillPoints(event);" class="nonAttackSkills mentalSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="survivalSkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="survivalSkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>

            <!-- Deception -->
              <div class="skillListing witSkill skillListingMidTop">
                <div class="skillName">
                  Deception
                </div>
                <div class="skillRank">
                  <select id="deceptionSkillRank" onchange="setSkillValues(event, 'wit'); skillPoints(event);" class="nonAttackSkills mentalSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="deceptionSkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="deceptionSkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>

            <!-- Insight -->
              <div class="skillListing witSkill skillListingMidBot">
                <div class="skillName">
                  Insight
                </div>
                <div class="skillRank">
                  <select id="insightSkillRank" onchange="setSkillValues(event, 'wit'); skillPoints(event);" class="nonAttackSkills mentalSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="insightSkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="insightSkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>

            <!-- Awareness -->
              <div class="skillListing resolveSkill">
                <div class="skillName">
                  Awareness
                </div>
                <div class="skillRank">
                  <select id="awarenessSkillRank" onchange="setSkillValues(event, 'resolve'); skillPoints(event);" class="nonAttackSkills mentalSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="awarenessSkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="awarenessSkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>

            <!-- Tinkering -->
              <div class="skillListing resolveSkill">
                <div class="skillName">
                  Tinkering
                </div>
                <div class="skillRank">
                  <select id="tinkeringSkillRank" onchange="setSkillValues(event, 'resolve'); skillPoints(event);" class="nonAttackSkills mentalSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="tinkeringSkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="tinkeringSkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>
              
            </div> <!-- End Mental Skills Wrapper-->
          </div> <!-- End Mental Stats Wrapper -->

          <!-- Social Stats Wrapper -->
          <div id="socialStatsWrapper" class="statsWrapper"> 

            <!-- Social Attributes -->
            <div class="attributeWrapper socialAtt">
              <span style="font-size: 10px;">Priority</span>
              <select id="spiritPriority" class="attributeSelect" onchange="attPriority('spirit', event);">
                <option value="0"></option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
              </select>
              <div class="attribute spiritColor">
                Spirit
                <div id="spiritValue" class="filledField" style="width:30px;">
                  0
                </div>
              </div>
              <span style="font-size: 10px;">Attribute Points</span>
              <div id="spiritAttributePoints" class="attributePoints">UA</div>
            </div>

            <!-- Social Sub-Attributes -->
            <div class="subAttributeWrapper">
              <div class="subAttribute vigorSkill">
                Vigor
                <input class="inputField"  id="vigorValue" type="number" min="0" max="4" step="1" value="0" onkeyup="setSkillValues(event, ['rouse', 'compel']); setAttPoints(event);" onmouseup="setSkillValues(event, ['rouse', 'compel']); setAttPoints(event);" onchange="setSkillValues(event, ['rouse', 'compel']); setAttPoints(event);"/>
              </div>
              <div class="subAttribute subMiddle empathySkill">
                Empathy
                <input class="inputField"  id="empathyValue" type="number" min="0" max="4" step="1" value="0" onkeyup="setSkillValues(event, ['charm', 'handling']); setAttPoints(event);" onmouseup="setSkillValues(event, ['charm', 'handling']); setAttPoints(event);" onchange="setSkillValues(event, ['charm', 'handling']); setAttPoints(event);"/>
              </div>
              <div class="subAttribute faithSkill">
                Faith
                <input class="inputField"  id="faithValue" type="number" min="0" max="4" step="1" value="0" onkeyup="setSkillValues(event, ['diplomacy', 'leadership']); setAttPoints(event);" onmouseup="setSkillValues(event, ['diplomacy', 'leadership']); setAttPoints(event);" onchange="setSkillValues(event, ['diplomacy', 'leadership']); setAttPoints(event);"/>
              </div>
            </div>
            
            <!-- Social Skills -->
            <div class="skillWrapper">

            <!-- Compel -->
              <div class="skillListing vigorSkill">
                <div class="skillName">
                  Compel
                </div>
                <div class="skillRank">
                  <select id="compelSkillRank" onchange="setSkillValues(event, 'vigor'); skillPoints(event);" class="nonAttackSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="compelSkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="compelSkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>

            <!-- Rouse -->
              <div class="skillListing vigorSkill">
                <div class="skillName">
                  Rouse
                </div>
                <div class="skillRank">
                  <select id="rouseSkillRank" onchange="setSkillValues(event, 'vigor'); skillPoints(event);" class="nonAttackSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="rouseSkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="rouseSkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>

            <!-- Charm -->
              <div class="skillListing empathySkill skillListingMidTop">
                <div class="skillName">
                  Charm
                </div>
                <div class="skillRank">
                  <select id="charmSkillRank" onchange="setSkillValues(event, 'empathy'); skillPoints(event);" class="nonAttackSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="charmSkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="charmSkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>

            <!-- Handling -->
              <div class="skillListing empathySkill skillListingMidBot">
                <div class="skillName">
                  Handling
                </div>
                <div class="skillRank">
                  <select id="handlingSkillRank" onchange="setSkillValues(event, 'empathy' ); skillPoints(event);" class="nonAttackSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="handlingSkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="handlingSkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>

            <!-- Diplomacy -->
              <div class="skillListing faithSkill">
                <div class="skillName">
                  Diplomacy
                </div>
                <div class="skillRank">
                  <select id="diplomacySkillRank" onchange="setSkillValues(event, 'faith'); skillPoints(event);" class="nonAttackSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="diplomacySkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="diplomacySkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>

            <!-- Leadership -->
              <div class="skillListing faithSkill">
                <div class="skillName">
                  Leadership
                </div>
                <div class="skillRank">
                  <select id="leadershipSkillRank" onchange="setSkillValues(event, 'faith'); skillPoints(event);" class="nonAttackSkills">
                    <option value="1">1: Unskilled</option>
                    <option value="2">2: Basic</option>
                    <option value="3">3: Trained</option>
                    <option value="4">4: Adept</option>
                    <option value="5">5: Expert</option>
                    <option value="6">6: Master</option>
                  </select>
                </div>
                <div id="leadershipSkillMod" class="skillMod filledField">
                  0
                </div>
                <div id="leadershipSkillPassive" class="skillPassive filledField">
                  3
                </div>
              </div>
              
            </div> <!-- End Mental Skills Wrapper-->
          </div> <!-- End Mental Stats Wrapper -->
        </div> <!-- End Column 1 -->

        <div class="column2">
          
          <div id="attackSkillHeader" class="skillListing">
            <div class="attackSkillName">
              Name
            </div>
            <div class="skillRank" style="text-align:center;">
              Rank
            </div>
            <div id="skillMod" class="skillMod">
              Mod
            </div>
            <div id="skillPassive" class="skillPassive" style="text-align:center;">
              Dmg
            </div>
          </div>

          <div id="strikeWrapper" class="skillListing bodyColor">
            <div class="attackSkillName">
              Strike
            </div>
            <div class="skillRank">
              <select id="strikeSkillRank" onchange="proficiencyAmount(event); skillPoints(event);" class="attackSkills">
                <option value="0">1: Unskilled</option>
                <option value="1">2: Basic</option>
                <option value="2">3: Trained</option>
                <option value="3">4: Adept</option>
                <option value="4">5: Expert</option>
                <option value="5">6: Master</option>
              </select>
            </div>
            <div id="strikeSkillMod" class="skillMod filledField">
              0
            </div>
            <div id="strikeSkillDamage" class="skillPassive filledField">
              0
            </div>
          </div>

        <div id="strikeProfContainer">
            <div class="exploitContainer">
              <!-- <div id="strikeProfSelector1" hidden class="strikeProfSelector" onchange="populateExploitInfo('strikeProfSelector1');"> -->
              <div id="strikeProfSelector1" hidden class="strikeProfSelector">
                <select id="strikeProfSelect1" class="exploitSelector">
                  <option value="None"></option>
                  <option value="Assassin">Assassin: +2/1 CR from Hidden</option>
                  <option value="Dancer">Dancer: +1 CR if Slid</option>
                  <option value="Mover">Mover: +2 CR with melee if moved 3+</option>
                  <option value="Shacker">Shaker: +1 CR if target is Breached</option>
                  <option value="Smasher">Smasher: +1 CR if target not Protected</option>
                  <option value="Stead">Steady: +1 CR if no movement</option>
                  <option value="Vanguard">Vanguard: +1 CR more enemies than allies</option>
                </select>
                <div id="strikeProfSelector1Description" class="exploitDesc"></div>
              </div>
            </div>
            
            <div class="exploitContainer">
              <div id="strikeProfSelector2" hidden class="strikeProfSelector">
                <select id="strikeProfSelect2" class="exploitSelector">
                  <option value="None"></option>
                  <option value="Assassin">Assassin: +2/1 CR from Hidden</option>
                  <option value="Dancer">Dancer: +1 CR if Slid</option>
                  <option value="Mover">Mover: +2 CR with melee if moved 3+</option>
                  <option value="Shacker">Shaker: +1 CR if target is Breached</option>
                  <option value="Smasher">Smasher: +1 CR if target not Protected</option>
                  <option value="Stead">Steady: +1 CR if no movement</option>
                  <option value="Vanguard">Vanguard: +1 CR more enemies than allies</option>

                </select>
                <div id="strikeProfSelector2Description" class="exploitDesc"></div>
              </div>
            </div>

            <div class="exploitContainer">
              <div id="strikeProfSelector3" hidden class="strikeProfSelector">
                <select id="strikeProfSelect3" class="exploitSelector">
                  <option value="None"></option>
                  <option value="Assassin">Assassin: +2/1 CR from Hidden</option>
                  <option value="Dancer">Dancer: +1 CR if Slid</option>
                  <option value="Mover">Mover: +2 CR with melee if moved 3+</option>
                  <option value="Shacker">Shaker: +1 CR if target is Breached</option>
                  <option value="Smasher">Smasher: +1 CR if target not Protected</option>
                  <option value="Stead">Steady: +1 CR if no movement</option>
                  <option value="Vanguard">Vanguard: +1 CR more enemies than allies</option>
                </select>
                <div id="strikeProfSelector3Description" class="exploitDesc"></div>
              </div>
            </div>
            <div class="exploitContainer">
              <div id="strikeProfSelector4" hidden class="strikeProfSelector">
                <select id="strikeProfSelect4" class="exploitSelector">
                  <option value="None"></option>
                  <option value="Assassin">Assassin: +2/1 CR from Hidden</option>
                  <option value="Dancer">Dancer: +1 CR if Slid</option>
                  <option value="Mover">Mover: +2 CR with melee if moved 3+</option>
                  <option value="Shacker">Shaker: +1 CR if target is Breached</option>
                  <option value="Smasher">Smasher: +1 CR if target not Protected</option>
                  <option value="Stead">Steady: +1 CR if no movement</option>
                  <option value="Vanguard">Vanguard: +1 CR more enemies than allies</option>

                </select>
                <div id="strikeProfSelector4Description" class="exploitDesc"></div>
              </div>
            </div>
            <div class="exploitContainer">
              <div id="strikeProfSelector5" hidden class="strikeProfSelector">
                <select id="strikeProfSelect5" class="exploitSelector">
                  <option value="None"></option>
                  <option value="Assassin">Assassin: +2/1 CR from Hidden</option>
                  <option value="Dancer">Dancer: +1 CR if Slid</option>
                  <option value="Mover">Mover: +2 CR with melee if moved 3+</option>
                  <option value="Shacker">Shaker: +1 CR if target is Breached</option>
                  <option value="Smasher">Smasher: +1 CR if target not Protected</option>
                  <option value="Stead">Steady: +1 CR if no movement</option>
                  <option value="Vanguard">Vanguard: +1 CR more enemies than allies</option>
                </select>
                <div id="strikeProfSelector5Description" class="exploitDesc"></div>
              </div>
            </div>

          </div> <!-- End strikeProfContainer -->


          <div id="blastWrapper" class="skillListing mindColor">
            <div class="attackSkillName">
              Blast
            </div>
            <div class="skillRank">
              <select id="blastSkillRank" onchange="proficiencyAmount(event); skillPoints(event);" class="attackSkills">
                <option value="0">0: Unskilled</option>
                <option value="1">2: Basic</option>
                <option value="2">3: Trained</option>
                <option value="3">4: Adept</option>
                <option value="4">5: Expert</option>
                <option value="5">6: Master</option>
              </select>
            </div>
            <div id="blastSkillMod" class="skillMod filledField">
              0
            </div>
            <div id="blastSkillDamage" class="skillPassive filledField">
              1
            </div>
          </div>

          <div id="blastProfContainer">
            <div id="blastProfSelector1" hidden class="blastProfSelector">
              <select id="blastProfSelect1" class="profSelector" onchange="proficiencyListManagement('blast');">
                <option value="0"></option>
              </select>
            </div>
            <div id="blastProfSelector2" hidden class="blastProfSelector">
              <select id="blastProfSelect2" class="profSelector" onchange="proficiencyListManagement('blast');">
                <option value="0"></option>
              </select>
            </div>
            <div id="blastProfSelector3" hidden class="blastProfSelector">
              <select id="blastProfSelect3" class="profSelector" onchange="proficiencyListManagement('blast');">
                <option value="0"></option>
              </select>
            </div>
            <div id="blastProfSelector4" hidden class="blastProfSelector">
              <select id="blastProfSelect4" class="profSelector" onchange="proficiencyListManagement('blast');">
                <option value="0"></option>
              </select>
            </div>
            <div id="blastProfSelector5" hidden class="blastProfSelector">
              <select id="blastProfSelect5" class="profSelector" onchange="proficiencyListManagement('blast');">
                <option value="0"></option>
              </select>
            </div>      
          </div> <!-- End blastWrapper -->

          <div id="invokeWrapper" class="skillListing spiritColor">
            <div class="attackSkillName">
              Invoke
            </div>
            <div class="skillRank">
              <select id="invokeSkillRank" onchange="proficiencyAmount(event); skillPoints(event);" class="attackSkills">
                <option value="0">0: Unskilled</option>
                <option value="1">2: Basic</option>
                <option value="2">3: Trained</option>
                <option value="3">4: Adept</option>
                <option value="4">5: Expert</option>
                <option value="5">6: Master</option>
              </select>
            </div>
            <div id="invokeSkillMod" class="skillMod filledField">
              0
            </div>
            <div id="invokeSkillDamage" class="skillPassive filledField">
              3
            </div>
          </div>

          <div id="invokeProfContainer" class="invokeProfContainer">
            <div class="exploitContainer">
              <!-- <div id="scoldProfSelector1" hidden class="scoldProfSelector" onchange="populateExploitInfo('scoldProfSelector1');"> -->
              <div id="invokeProfSelector1" hidden class="invokeProfSelector">
                <select id="invokeProfSelect1" class="exploitSelector">
                  <option value="None"></option>
                  <option value="Ire">Ire: Dice that miss enemies deal 1 damage</option>
                  <option value="Tranquility">Tranquility: Dice that miss allies heal 1</option>
                  <option value="Fear">Fear: Each hit enemy gains Short Impaired</option>
                  <option value="Valor">Valor: Each hit ally gains Short Boosted</option>
                  <option value="Despair">Despair: +1/2 to hit Marred/Desperate enemies</option>
                  <option value="Hope">Hope: +1/2 to hit Marred/Desperate allies</option>
                </select>
                <div id="invokeProfSelector1Description" class="exploitDesc"></div>
              </div>
            </div>
            
            <div class="exploitContainer">
              <div id="invokeProfSelector2" hidden class="invokeProfSelector">
                <select id="invokeProfSelect2" class="exploitSelector">
                  <option value="None"></option>
                  <option value="Ire">Ire: Dice that miss enemies deal 1 damage</option>
                  <option value="Tranquility">Tranquility: Dice that miss allies heal 1</option>
                  <option value="Fear">Fear: Each hit enemy gains Short Impaired</option>
                  <option value="Valor">Valor: Each hit ally gains Short Boosted</option>
                  <option value="Despair">Despair: +1/2 to hit Marred/Desperate enemies</option>
                  <option value="Hope">Hope: +1/2 to hit Marred/Desperate allies</option>
                </select>
                <div id="invokeProfSelector2Description" class="exploitDesc"></div>
              </div>
            </div>

            <div class="exploitContainer">
              <div id="invokeProfSelector3" hidden class="invokeProfSelector">
                <select id="invokeProfSelect3" class="exploitSelector">
                  <option value="None"></option>
                  <option value="Ire">Ire: Dice that miss enemies deal 1 damage</option>
                  <option value="Tranquility">Tranquility: Dice that miss allies heal 1</option>
                  <option value="Fear">Fear: Each hit enemy gains Short Impaired</option>
                  <option value="Valor">Valor: Each hit ally gains Short Boosted</option>
                  <option value="Despair">Despair: +1/2 to hit Marred/Desperate enemies</option>
                  <option value="Hope">Hope: +1/2 to hit Marred/Desperate allies</option>
                </select>
                <div id="invokeProfSelector3Description" class="exploitDesc"></div>
              </div>
            </div>
            <div class="exploitContainer">
              <div id="invokeProfSelector4" hidden class="invokeProfSelector">
                <select id="invokeProfSelect4" class="exploitSelector">
                  <option value="None"></option>
                  <option value="Ire">Ire: Dice that miss enemies deal 1 damage</option>
                  <option value="Tranquility">Tranquility: Dice that miss allies heal 1</option>
                  <option value="Fear">Fear: Each hit enemy gains Short Impaired</option>
                  <option value="Valor">Valor: Each hit ally gains Short Boosted</option>
                  <option value="Despair">Despair: +1/2 to hit Marred/Desperate enemies</option>
                  <option value="Hope">Hope: +1/2 to hit Marred/Desperate allies</option>
                </select>
                <div id="invokeProfSelector4Description" class="exploitDesc"></div>
              </div>
            </div>
            <div class="exploitContainer">
              <div id="invokeProfSelector5" hidden class="invokeProfSelector">
                <select id="invokeProfSelect5" class="exploitSelector">
                  <option value="None"></option>
                  <option value="Ire">Ire: Dice that miss enemies deal 1 damage</option>
                  <option value="Tranquility">Tranquility: Dice that miss allies heal 1</option>
                  <option value="Fear">Fear: Each hit enemy gains Short Impaired</option>
                  <option value="Valor">Valor: Each hit ally gains Short Boosted</option>
                  <option value="Despair">Despair: +1/2 to hit Marred/Desperate enemies</option>
                  <option value="Hope">Hope: +1/2 to hit Marred/Desperate allies</option>
                </select>
                <div id="invokeProfSelector5Description" class="exploitDesc"></div>
              </div>
            </div>

          

          </div> <!-- End invokeWrapper -->
        </div><!-- End Column 2 -->

        <div class="column3">
          <div id="gearList" class="abilityFieldset gearFieldset">
            <div class="flex">
              <div class="abilityLegend centerText gLegend">Gear</div>
              <div class="abilityLegend centerText gLegend">Character</div>
              <div class="abilityLegend centerText gLegend">Notes</div>
            </div>
            <div class="flexSpace centerText itemInfo blackField">
              <div class='abilityField'> Weapons
                <select id="weaponAmount" class="itemAmount" onchange="weaponAmount(event);">
                  <option value="0">0</option>
                  <option value="1" selected="selected">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div class='abilityField'>Armor 
                <select id="armorAmount" class="itemAmount" onchange="armorAmount(event);">
                  <option value="0">0</option>
                  <option value="1" selected="selected">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div class='abilityField'>Total Load 1/9
              </div>
            </div> <!-- end Gear Info -->
            <div id="weapon1" class="itemSelector abilityField gField flexSpace">
              <!-- <input id="weapon1Name" class="praeFullWeaponName" type="text" value="name" placeholder="name"/> -->
              <select id="weapon1Type" class="itemSelector itemTypeSelector" onchange="populateWeaponExploitInfo('weapon1');">
                <option value="">Weapon</option>
                <option value="Axe">Axe</option>
                <option value="Bolas">Bolas</option>
                <option value="Bow">Bow</option>
                <option value="Club">Club</option>
                <option value="Dagger">Dagger</option>
                <option value="Hammer">Hammer</option>
                <option value="Shield">Shield</option>
                <option value="Sling">Sling</option>
                <option value="Spear">Spear</option>
                <option value="Sword">Sword</option>
              </select>
            
              <!-- <input id="weapon1Damage" class="weaponDamage praeFullWeaponDamage" type="text" value="Dmg"> -->
              <div class="praeFullWeaponCriticalEffect flex">
                <div id="weapon1ExploitName" class="weaponCS">Critical Effect</div> 
                <div id="weapon1ExploitDescription" class="weaponExploitDescription"></div>
              </div>
              <select id="weapon1Size" class="weaponSize itemSelector itemLoadSelector">
                <option value="">Load</option>
                <option value="2">Sm:3</option>
                <option value="3">Md:4</option>
                <option value="4">Lg:5</option>
              </select>
            </div> 
            <!-- End Weapon 1 -->
                
            <div id="weapon2" class="itemSelector flexSpace abilityField gField" style="display:none;">
              <!-- <input id="weapon2Name" class="praeFullWeaponName" type="text" value="name" placeholder="name"/> -->
              <select id="weapon2Type" class="itemTypeSelector itemSelector" onchange="populateWeaponExploitInfo('weapon2');">
                <option value="">Weapon</option>
                <option value="Axe">Axe</option>
                <option value="Bolas">Bolas</option>
                <option value="Bow">Bow</option>
                <option value="Club">Club</option>
                <option value="Dagger">Dagger</option>
                <option value="Hammer">Hammer</option>
                <option value="Shield">Shield</option>
                <option value="Sling">Sling</option>
                <option value="Spear">Spear</option>
                <option value="Sword">Sword</option>
              </select>
              <!-- <input id="weapon2Damage" class="weaponDamage praeFullWeaponDamage" type="text" value="Dmg"> -->
              <div class="praeFullWeaponCriticalEffect flex">
                <div id="weapon2ExploitName" class="weaponCS">Critical Effect</div>
                <div id="weapon2ExploitDescription" class="weaponExploitDescription"></div>
              </div>
              <select id="weapon2Size" class="itemLoadSelector itemSelector">
                <option value="">Load</option>
                <option value="2">Sm:3</option>
                <option value="3">Md:4</option>
                <option value="4">Lg:5</option>
              </select>
            </div> 
            <!-- End Weapon 2 --> 

            <div id="weapon3" class="itemSelector flexSpace abilityField gField" style="display:none;">
              <!-- <input id="weapon3Name" class="praeFullWeaponName" type="text" value="name" placeholder="name"/> -->
              <select id="weapon3Type" class="itemTypeSelector itemSelector" onchange="populateWeaponExploitInfo('weapon3');">
                <option value="">Weapon</option>
                <option value="Axe">Axe</option>
                <option value="Bolas">Bolas</option>
                <option value="Bow">Bow</option>
                <option value="Club">Club</option>
                <option value="Dagger">Dagger</option>
                <option value="Hammer">Hammer</option>
                <option value="Shield">Shield</option>
                <option value="Sling">Sling</option>
                <option value="Spear">Spear</option>
                <option value="Sword">Sword</option>
              </select>
              <!-- <input id="weapon3Damage" class="weaponDamage praeFullWeaponDamage" type="text" value="Dmg"> -->
              <div class="praeFullWeaponCriticalEffect flex">
                <div id="weapon3ExploitName" class="weaponCS">Critical Effect</div>
                <div id="weapon3ExploitDescription" class="weaponExploitDescription"></div>
              </div>
              <select id="weapon3Size" class="itemLoadSelector itemSelector">
                <option value="">Load</option>
                <option value="2">Sm:3</option>
                <option value="3">Md:4</option>
                <option value="4">Lg:5</option>
              </select>
            </div> 
            <!-- End Weapon 3 -->

            <div id="armor1" class="flexSpace abilityField gField">
              <select id="armor1Type" class="itemSelector itemTypeSelector" onchange="selectArmor(1);">
                <option value="0">Armor</option>
                <option value="1">Light</option>
                <option value="2">Heavy</option>
                <option value="4">Shield</option>
              </select>
              <div id="armor1Bonus" class=''>Bonus</div>
              <div id="armor1Penalty"  class=''>Penalty</div>
              <div id="armor1Load" class="armorLoad">Load</div>
            </div> 
            <!-- End Armor 1 -->

            <div id="armor2" class="flexSpace abilityField gField" style="display:none;">
              <select id="armor2Type" class="itemSelector itemTypeSelector" onchange="selectArmor(2);">
                <option value="0">Armor</option>
                <option value="1">Light</option>
                <option value="2">Heavy</option>
                <option value="4">Shield</option>
              </select>
              <div id="armor2Bonus" class=''>Bonus</div>
              <div id="armor2Penalty"  class=''>Penalty</div>
              <div id="armor2Load" class="armorLoad">Load</div>
            </div> 
            <!-- End Armor 1 -->

            <div id="armor3" class="flexSpace abilityField gField" style="display:none;">
              <select id="armor3Type" class="itemSelector itemTypeSelector" onchange="selectArmor(3);">
                <option value="0">Armor</option>
                <option value="1">Light</option>
                <option value="2">Heavy</option>
                <option value="4">Shield</option>
              </select>
              <div id="armor3Bonus" class=''>Bonus</div>
              <div id="armor3Penalty"  class=''>Penalty</div>
              <div id="armor3Load" class="armorLoad">Load</div>
            </div> 
            <!-- End Armor 1 -->
            <div id="gear1" class='abilityField gField'>
              <input id="gearAmt1" class='praeFullGearAmt' placeholder="Amt"/>
              <input id="gearItem1" class='praeFullGearItem' placeholder="Item"/>
              <input id="gearLoad1" class='praeFullGearLoad' placeholder="Load"/>
            </div>
            <div id="gear2" class='abilityField gField'>
              <input id="gearAmt2" class='praeFullGearAmt' placeholder="Amt"/>
              <input id="gearItem2" class='praeFullGearItem' placeholder="Item"/>
              <input id="gearLoad2" class='praeFullGearLoad' placeholder="Load"/>
            </div>
            <div id="gear3" class='abilityField gField'>
              <input id="gearAmt3" class='praeFullGearAmt' placeholder="Amt"/>
              <input id="gearItem3" class='praeFullGearItem' placeholder="Item"/>
              <input id="gearLoad3" class='praeFullGearLoad' placeholder="Load"/>
            </div>
            <div id="gear4" class='abilityField gField'>
              <input id="gearAmt4" class='praeFullGearAmt' placeholder="Amt"/>
              <input id="gearItem4" class='praeFullGearItem' placeholder="Item"/>
              <input id="gearLoad4" class='praeFullGearLoad' placeholder="Load"/>
            </div>
            <div id="gear5" class='abilityField gField'>
              <input id="gearAmt5" class='praeFullGearAmt' placeholder="Amt"/>
              <input id="gearItem5" class='praeFullGearItem' placeholder="Item"/>
              <input id="gearLoad5" class='praeFullGearLoad' placeholder="Load"/>
            </div>
            <div id="gear6" class='abilityField gField'>
              <input id="gearAmt6" class='praeFullGearAmt' placeholder="Amt"/>
              <input id="gearItem6" class='praeFullGearItem' placeholder="Item"/>
              <input id="gearLoad6" class='praeFullGearLoad' placeholder="Load"/>
            </div>
            <div id="gear7" class='abilityField gField'>
              <input id="gearAmt7" class='praeFullGearAmt' placeholder="Amt"/>
              <input id="gearItem7" class='praeFullGearItem' placeholder="Item"/>
              <input id="gearLoad7" class='praeFullGearLoad' placeholder="Load"/>
            </div>
            <div id="gear8" class='abilityField gField'>
              <input id="gearAmt8" class='praeFullGearAmt' placeholder="Amt"/>
              <input id="gearItem8" class='praeFullGearItem' placeholder="Item"/>
              <input id="gearLoad8" class='praeFullGearLoad' placeholder="Load"/>
            </div>
              <div class="praeCoins flex">
                Coins
                <div><input id="praeSolar" type="text" class="praeMoney"/>s</div>
                <div><input id="praeLunar" type="text" class="praeMoney"/>l</div>
                <div><input id="praeNight" type="text" class="praeMoney"/>g</div>
                <div><input id="praeTok" type="text" class="praeMoney"/>t</div>
              </div>
            </div> 
          </div>
          <!-- End Gear List-->
        </div> <!-- End Column 3 -->
        </div> <!-- End Row Wrapper -->
    </div>
</div>
        <div class="abilityWrapper">

        <!--
          <div class="talentWrapper">
            <div id="talentHeader">
              Talent
              <select id="talentAmount" onchange="talentAmount(event); setAbilityAmount(event);">
                <option value="1">2</option>
                <option value="2">3</option>
                <option value="3">4</option>
              </select>
            </div>
            <fieldset id="wayTalent" class="abilityFieldset talentFieldset charSheetAbility">
              <legend id="rTalentName" class="abilityLegend talentLegend">Choose a Way</legend>
              <div id="rTalentDesc" class="abilityFieldOdd"></div>
            </fieldset>
            <fieldset id="talentTable1" class="abilityFieldset talentFieldset charSheetAbility">
              <legend class="talent1 abilityFieldSet">
                <select id="talent1" onchange="populateTalentInfo('talent1')" class="talentSelector abilityLegend talentLegend">
                  <option value="0"></option>
                </select>
              </legend>
              <div id="talent1Description" class="abilityFieldOdd"></div>
            </fieldset>
            <fieldset id="talentTable2" class="abilityFieldset talentFieldset charSheetAbility" hidden>
              <legend class="talent2 abilityFieldSet">
                <select id="talent2" onchange="populateTalentInfo('talent2')" class="talentSelector abilityLegend talentLegend">
                  <option value="0"></option>
                </select>
              </legend>
              <div id="talent2Description" class="abilityFieldOdd"></div>
            </fieldset>
            <fieldset id="talentTable3" class="abilityFieldset talentFieldset charSheetAbility" hidden>
              <legend class="talent3 abilityFieldSet">
                <select id="talent3" onchange="populateTalentInfo('talent3')" class="talentSelector abilityLegend talentLegend">
                  <option value="0"></option>
                </select>
              </legend>
              <div id="talent3Description" class="abilityFieldOdd"></div>
            </fieldset>
          </div> <-- End Talent Wrapper ->
        -->
          <div class="nonAtkManWrapper">
            <div id="nonAtkManHeader">
              Talents
              <select id="nonAtkManAmount" onchange="nonAtkManAmount(event); setAbilityAmount(event);">
                <option value="1">2</option>
                <option value="2">3</option>
                <option value="3">4</option>
              </select>
            </div>
            <div class="wayManeuver abilityFieldset namFieldset charSheetAbility">
              <div id="rManName" class="nonAtkMan abilityLegend namLegend">Choose a Way</div>
              <div id="rTalentDesc" class="namField abilityField"></div>
              <div id="rManCost" class="namField abilityField"></div>
              <div id="rManEffect" class="namField abilityField"></div>
            </div>
            <div id="nonAtkManTable1" class="abilityFieldset namFieldset charSheetAbility">
              <div class="nonAtkMan">
                <select id="nonAtkMan1" onchange="populateNonAtkManInfo('nonAtkMan1'); setAttPoints(event);" class="nonAtkManSelector abilityLegend namLegend">
                  <option value="0"></option>
                </select>
              </div>
              <div id="nonAtkMan1Passive" class="namField abilityField"></div>
              <div id="nonAtkMan1Cost" class="namField abilityField"></div>
              <div id="nonAtkMan1Effect" class="namField abilityField"></div>
            </div>
            <div id="nonAtkManTable2" class="abilityFieldset namFieldset charSheetAbility" hidden>
              <div class="nonAtkMan">
                <select id="nonAtkMan2" onchange="populateNonAtkManInfo('nonAtkMan2'); setAttPoints(event);" class="nonAtkManSelector abilityLegend namLegend">
                  <option value="0"></option>
                </select>
              </div>
              <div id="nonAtkMan2Passive" class="namField abilityField"></div>
              <div id="nonAtkMan2Cost" class="abilityField namField"></div>
              <div id="nonAtkMan2Effect" class="namField abilityField abilityFieldLast"></div>
            </div>
            <div id="nonAtkManTable3" class="abilityFieldset namFieldset charSheetAbility" hidden>
              <div class="nonAtkMan">
                <select id="nonAtkMan3" onchange="populateNonAtkManInfo('nonAtkMan3'); setAttPoints(event);" class="nonAtkManSelector abilityLegend namLegend">
                  <option value="0"></option>
                </select>
              </div>
              <div id="nonAtkMan3Passive" class="namField abilityField"></div>
              <div id="nonAtkMan3Cost" class="namField abilityField"></div>
              <div id="nonAtkMan3Effect" class="namField abilityField abilityFieldLast"></div>
            </div>
          </div>
          <div id="atkManWrapper">
            <div id="atkManHeader">
              Tricks
              <select id="atkManAmount" onchange="atkManAmount(event); setAbilityAmount(event);">
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div id="atkManTable1" class="abilityFieldset charSheetAbility">
              <div class="atkMan1 atkMan">
                <select id="atkMan1" onchange="populateAtkManInfo('atkMan1')" class="atkManSelector abilityLegend amLegend">
                  <option value="0"></option>
                </select>
              </div>
              <div id="atkMan1Cost" class="amField abilityField"></div>
              <div id="atkMan1EffectSm" class="amField abilityField"></div>
              <div id="atkMan1EffectBg" class="amField abilityField"></div>
              <div id="atkMan1EffectMana" class="amField abilityField abilityFieldLast"></div>           
            </div>
            <div id="atkManTable2" class="abilityFieldset amFieldset charSheetAbility">
              <div class="atkMan2 atkMan">
                <select id="atkMan2" onchange="populateAtkManInfo('atkMan2')" class="atkManSelector abilityLegend amLegend">
                  <option value="0"></option>
                </select>
              </div>
              <div id="atkMan2Cost" class="amField abilityField"></div>
              <div id="atkMan2EffectSm" class="amField abilityField"></div>
              <div id="atkMan2EffectBg" class="amField abilityField"></div>
              <div id="atkMan2EffectMana" class="amField abilityField abilityFieldLast"></div>
            </div>
            <div id="atkManTable3" class="abilityFieldset charSheetAbility" hidden>
              <div class="atkMan3 atkMan">
                <select id="atkMan3" onchange="populateAtkManInfo('atkMan3')" class="atkManSelector abilityLegend amLegend">
                  <option value="0"></option>
                </select>
              </div>
              <div id="atkMan3Cost" class="amField abilityField"></div>
              <div id="atkMan3EffectSm" class="amField abilityField"></div>
              <div id="atkMan3EffectBg" class="amField abilityField"></div>
              <div id="atkMan3EffectMana" class="amField abilityField abilityFieldLast"></div>
            </div>
            <div id="atkManTable4" class="abilityFieldset charSheetAbility" hidden>
              <div class="atkMan4 atkMan">
                <select id="atkMan4" onchange="populateAtkManInfo('atkMan4')" class="atkManSelector abilityLegend amLegend">
                  <option value="0"></option>
                </select>
              </div>
              <div id="atkMan4Cost" class="amField abilityField"></div>
              <div id="atkMan4EffectSm" class="amField abilityField"></div>
              <div id="atkMan4EffectBg" class="amField abilityField"></div>
              <div id="atkMan4EffectMana" class="amField abilityField abilityFieldLast"></div>
            </div>    
        </div>

          <!-- Rituals -->

          <div id='' class="ritualWrapper">
            <div id="atkManHeader">
              Spells
              <select id="ritualAmount" onchange="ritualAmount(event); setAbilityAmount(event);">
                <option value="0" selected="selected">2</option>
                <option value="1">3</option>
                <option value="2">4</option>
                <option value="3">5</option>
                <option value="4">6</option>
              </select>     
            </div>

            <!--
            <div class="abilityLegend ritualLegend">Rituals
                
            </div>
            
            <div class='praeFullRitualHeader mindColor'>
              <div class='praeFullRitualHeaderName'>Name</div>
              <div class='praeFullRitualHeaderCost'>Cost</div>
              <div class='praeFullRitualHeaderCastTime'>Cast Time</div>
              <div class='praeFullRitualHeaderDuration'>Duration</div>
            </div>
            -->
            <div class='ritualEntry abilityFieldset charSheetAbility'>
              <div class='praeFullRitualName ritualLegend abilityLegend'>Pray
                 <img id="showritualPrayDetails" class="showRitualDetails" onclick="showDesc('ritualPrayDetails');" src="imgs/details2.png">
                <div id="ritualPrayDetails" class="draggable ritualDetails abilityFieldset">
                  <div id="hideritualPrayDetails" class="closeRitual" onclick="hideDesc('ritualPrayDetails');">X</div>
                  <div class="abilityLegend ritualLegend" id="ritualPraySelectName">Pray</div>
                  <div id="ritualPraySelectKeywords" class="abilityField ritualField abilityKeywords"> <b>Ligation</b></div>
                  <div id="ritualPraySelectCost" class="abilityField ritualField"><b>Cost:</b> 1 Mana</div>
                  <div id="ritualPraySelectCastTime" class="abilityField ritualField"><b>Cast Time:</b> 6 Seconds per participant</div>
                  <div id="ritualPraySelectDuration" class="abilityField ritualField"><b>Duration:</b> Instant</div>
                  <div id="ritualPraySelectEffect" class="abilityField ritualField"><b>Effect:</b> The caster can transfer mana freely between one willing participant and themselves. </div>
                  <div id="ritualPraySelectEnhancements" class="abilityField ritualField"><b>Enhancements</b><ul><li>Reach (6 second cast time): Increase number of participants you can transfer between by 1</li></ul></div>
                </div>
              </div>
              <div class='praeFullRitualCost abilityField ritualField' ><b>Cost:</b> 1 Mana</div>
              <div class='praeFullRitualCastTime abilityField ritualField'><b>Cast Time:</b> 6 seconds per participant</div>
              <div class='praeFullRitualDuration abilityField ritualField'><b>Duration:</b> Instant</div>
              <div class='praeFullRitualDuration abilityField ritualField'><b>Effect:</b>  The caster can transfer mana freely between one willing participants, objects that can hold mana, and themselves.
              </div>
            </div>
            <div class='ritualEntry abilityFieldset charSheetAbility'>
              <div class='praeFullRitualName ritualLegend abilityLegend'>Harmony
                 <img id="showritualHarmonyDetails" class="showRitualDetails" onclick="showDesc('ritualHarmonyDetails');" src="imgs/details2.png">

                <div id="ritualHarmonyDetails" class="draggable ritualDetails abilityFieldset">
                  <div id="hideritualHarmonyDetails" class="closeRitual" onclick="hideDesc('ritualHarmonyDetails');">X</div>
                  <div class="abilityLegend ritualLegend" id="ritualPraySelectName">Harmony</div>
                  <div id="ritualPraySelectKeywords" class="abilityField ritualField abilityKeywords"><b>Bonding</b></div>
                  <div id="ritualPraySelectCost" class="abilityField ritualField"><b>Cost:</b> 1 Mana</div>
                  <div id="ritualPraySelectCastTime" class="abilityField ritualField"><b>Cast Time:</b> 1 minute .</div>
                  <div id="ritualPraySelectDuration" class="abilityField ritualField"><b>Duration:</b> 1 hour</div>
                  <div id="ritualPraySelectEffect" class="abilityField ritualField"><b>Effect:</b> The caster and the participants are in Harmony for a skill roll. This roll can be either a group action (climbing over a wall, sneaking past a guard) or a individuals action that other people can assist with (charming a drunk guard into giving up a password to enter a palace).

                    <br/><span class="indent40"> </span>

                    When taking a group action all ritual participants roll and share the highest result. Any impairment a character has is shared with everyone else (if the group is trying to sneak and one character has heavy armor all characters are impaired twice for this roll). 

                    <br/><span class="indent40"> </span>

                    When making an individual roll each participant that can assist rolls their skill as well. The instigator of the roll can use the result of any roll. </div>
                  <div id="ritualPraySelectEnhancements" class="abilityField ritualField">
                    <b>Enhancements</b>
                    <ul><li>
                      Extend (1 Mana, 10 minute cast time): The result can be used a second time within the duration. Increase duration by 2 hours.
                    </li><li> 
                      Encompass (3 minute cast time): Can include an additional participant above your normal maximum. 
                    </li></ul>
                  </div>
                </div>
              </div>
              <div class='praeFullRitualCost abilityField ritualField' ><b>Cost:</b> 1 Mana</div>
              <div class='praeFullRitualCastTime abilityField ritualField'><b>Cast Time:</b> 6 seconds per participant</div>
              <div class='praeFullRitualDuration abilityField ritualField'><b>Duration:</b> 1 hour</div>
              <div class='praeFullRitualDuration abilityField ritualField'><b>Effect:</b> The caster and the participants are in Harmony for a skill roll.
              </div>
            </div>

            <!-- Ritual 1 -->
            <div id="ritual1" class="ritualEntry abilityFieldset charSheetAbility" style="display:none; position:relative">
              <select id="ritual1Select" class="ritualSelector abilityLegend ritualLegend praeFullRitualName" onchange="populateRitualInfo('ritual1Select');">
                <option value="0"></option>
              </select>
              <div id="ritual1SelectShortCost" class="abilityField ritualField"></div>
              <div id="ritual1SelectShortCastTime" class="praeFullRitualCastTime abilityField  ritualField"></div>
              <div id="ritual1SelectShortDuration" class="praeFullRitualDuration abilityField  ritualField"></div>
              <div id="ritual1SelectShortDesc" class="praeFullRitualDuration abilityField  ritualField"></div>
              <img id="showritual1Details" class="showRitualDetails" onclick="showDesc('ritual1Details');" src="imgs/details2.png">
              <div id="ritual1Details" class="draggable ritualDetails abilityFieldset">
                <div id="hideritual1Details" class="closeRitual" onclick="hideDesc('ritual1Details');">X</div>
                <div class="abilityLegend abilityLegend ritualLegend" id="ritual1SelectName">
                    
                </div>
                <div class="ritualBody">
                  <div id="ritual1SelectKeywords" class="abilityField ritualField abilityKeywords"></div>
                  <div id="ritual1SelectCost" class="abilityField ritualField"></div>
                  <div id="ritual1SelectCastTime" class="abilityField ritualField"></div>
                  <div id="ritual1SelectDuration" class="abilityField ritualField"></div>
                  <div id="ritual1SelectEffect" class="abilityField ritualField"></div>
                  <div id="ritual1SelectEnhancements" class="abilityField ritualField"></div>
                  <div id="ritual1SelectAugments" class="abilityField ritualField"></div>
                  <div id="ritual1SelectResist" class="abilityField ritualField"></div>
                  <div id="ritual1SelectNotes" class="ritualNotes abilityField ritualField"></div>
                </div>
              </div>
            </div>  
            <!-- End ritual 1 -->  

            <!-- Ritual 2 -->
            <div id="ritual2" class="ritualEntry abilityFieldset charSheetAbility" style="display:none; position:relative">
              <select id="ritual2Select" class="ritualSelector abilityLegend ritualLegend praeFullRitualName" onchange="populateRitualInfo('ritual2Select');">
                <option value="0"></option>
              </select>
              <div id="ritual2SelectShortCost" class="abilityField ritualField"></div>
              <div id="ritual2SelectShortCastTime" class="praeFullRitualCastTime abilityField  ritualField"></div>
              <div id="ritual2SelectShortDuration" class="praeFullRitualDuration abilityField  ritualField"></div>
              <div id="ritual2SelectShortDesc" class="praeFullRitualDuration abilityField  ritualField"></div>
              <img id="showritual2Details" class="showRitualDetails" onclick="showDesc('ritual2Details');" src="imgs/details2.png">
              <div id="ritual2Details" class="draggable ritualDetails abilityFieldset">
                <div id="hideritual2Details" class="closeRitual" onclick="hideDesc('ritual2Details');">X</div>
                <div class="abilityLegend abilityLegend ritualLegend" id="ritual2SelectName">
                    
                </div>
                <div class="ritualBody">
                  <div id="ritual2SelectKeywords" class="abilityField ritualField abilityKeywords"></div>
                  <div id="ritual2SelectCost" class="abilityField ritualField"></div>
                  <div id="ritual2SelectCastTime" class="abilityField ritualField"></div>
                  <div id="ritual2SelectDuration" class="abilityField ritualField"></div>
                  <div id="ritual2SelectEffect" class="abilityField ritualField"></div>
                  <div id="ritual2SelectEnhancements" class="abilityField ritualField"></div>
                  <div id="ritual2SelectAugments" class="abilityField ritualField"></div>
                  <div id="ritual2SelectResist" class="abilityField ritualField"></div>
                  <div id="ritual2SelectNotes" class="ritualNotes abilityField ritualField"></div>
                </div>
              </div>
            </div>  
            <!-- End ritual 2 -->  

            <!-- Ritual 2 -->
            <div id="ritual2" class="ritualEntry abilityFieldset charSheetAbility" style="display:none; position:relative">
              <select id="ritual2Select" class="ritualSelector abilityLegend ritualLegend praeFullRitualName" onchange="populateRitualInfo('ritual2Select');">
                <option value="0"></option>
              </select>
              <div id="ritual2SelectShortCost" class="abilityField ritualField"></div>
              <div id="ritual2SelectShortCastTime" class="praeFullRitualCastTime abilityField  ritualField"></div>
              <div id="ritual2SelectShortDuration" class="praeFullRitualDuration abilityField  ritualField"></div>
              <div id="ritual2SelectShortDesc" class="praeFullRitualDuration abilityField  ritualField"></div>
              <img id="showritual2Details" class="showRitualDetails" onclick="showDesc('ritual2Details');" src="imgs/details2.png">
              <div id="ritual2Details" class="draggable ritualDetails abilityFieldset">
                <div id="hideritual2Details" class="closeRitual" onclick="hideDesc('ritual2Details');">X</div>
                <div class="abilityLegend abilityLegend ritualLegend" id="ritual2SelectName">
                    
                </div>
                <div class="ritualBody">
                  <div id="ritual2SelectKeywords" class="abilityField ritualField abilityKeywords"></div>
                  <div id="ritual2SelectCost" class="abilityField ritualField"></div>
                  <div id="ritual2SelectCastTime" class="abilityField ritualField"></div>
                  <div id="ritual2SelectDuration" class="abilityField ritualField"></div>
                  <div id="ritual2SelectEffect" class="abilityField ritualField"></div>
                  <div id="ritual2SelectEnhancements" class="abilityField ritualField"></div>
                  <div id="ritual2SelectAugments" class="abilityField ritualField"></div>
                  <div id="ritual2SelectResist" class="abilityField ritualField"></div>
                  <div id="ritual2SelectNotes" class="ritualNotes abilityField ritualField"></div>
                </div>
              </div>
            </div>  
            <!-- End ritual 2 -->  

            <!-- Ritual 3 -->
            <div id="ritual3" class="ritualEntry abilityFieldset charSheetAbility" style="display:none; position:relative">
              <select id="ritual3Select" class="ritualSelector abilityLegend ritualLegend praeFullRitualName" onchange="populateRitualInfo('ritual3Select');">
                <option value="0"></option>
              </select>
              <div id="ritual3SelectShortCost" class="abilityField ritualField"></div>
              <div id="ritual3SelectShortCastTime" class="praeFullRitualCastTime abilityField  ritualField"></div>
              <div id="ritual3SelectShortDuration" class="praeFullRitualDuration abilityField  ritualField"></div>
              <div id="ritual3SelectShortDesc" class="praeFullRitualDuration abilityField  ritualField"></div>
              <img id="showritual3Details" class="showRitualDetails" onclick="showDesc('ritual3Details');" src="imgs/details2.png">
              <div id="ritual3Details" class="draggable ritualDetails abilityFieldset">
                <div id="hideritual3Details" class="closeRitual" onclick="hideDesc('ritual3Details');">X</div>
                <div class="abilityLegend abilityLegend ritualLegend" id="ritual3SelectName">
                    
                </div>
                <div class="ritualBody">
                  <div id="ritual3SelectKeywords" class="abilityField ritualField abilityKeywords"></div>
                  <div id="ritual3SelectCost" class="abilityField ritualField"></div>
                  <div id="ritual3SelectCastTime" class="abilityField ritualField"></div>
                  <div id="ritual3SelectDuration" class="abilityField ritualField"></div>
                  <div id="ritual3SelectEffect" class="abilityField ritualField"></div>
                  <div id="ritual3SelectEnhancements" class="abilityField ritualField"></div>
                  <div id="ritual3SelectAugments" class="abilityField ritualField"></div>
                  <div id="ritual3SelectResist" class="abilityField ritualField"></div>
                  <div id="ritual3SelectNotes" class="ritualNotes abilityField ritualField"></div>
                </div>
              </div>
            </div>  
            <!-- End ritual 3 -->  

            <!-- Ritual 2 -->
            <div id="ritual4" class="ritualEntry abilityFieldset charSheetAbility" style="display:none; position:relative">
              <select id="ritual4Select" class="ritualSelector abilityLegend ritualLegend praeFullRitualName" onchange="populateRitualInfo('ritual4Select');">
                <option value="0"></option>
              </select>
              <div id="ritual4SelectShortCost" class="abilityField ritualField"></div>
              <div id="ritual4SelectShortCastTime" class="praeFullRitualCastTime abilityField  ritualField"></div>
              <div id="ritual4SelectShortDuration" class="praeFullRitualDuration abilityField  ritualField"></div>
              <div id="ritual4SelectShortDesc" class="praeFullRitualDuration abilityField  ritualField"></div>
              <img id="showritual4Details" class="showRitualDetails" onclick="showDesc('ritual4Details');" src="imgs/details2.png">
              <div id="ritual4Details" class="draggable ritualDetails abilityFieldset">
                <div id="hideritual4Details" class="closeRitual" onclick="hideDesc('ritual4Details');">X</div>
                <div class="abilityLegend abilityLegend ritualLegend" id="ritual4SelectName">
                    
                </div>
                <div class="ritualBody">
                  <div id="ritual4SelectKeywords" class="abilityField ritualField abilityKeywords"></div>
                  <div id="ritual4SelectCost" class="abilityField ritualField"></div>
                  <div id="ritual4SelectCastTime" class="abilityField ritualField"></div>
                  <div id="ritual4SelectDuration" class="abilityField ritualField"></div>
                  <div id="ritual4SelectEffect" class="abilityField ritualField"></div>
                  <div id="ritual4SelectEnhancements" class="abilityField ritualField"></div>
                  <div id="ritual4SelectAugments" class="abilityField ritualField"></div>
                  <div id="ritual4SelectResist" class="abilityField ritualField"></div>
                  <div id="ritual4SelectNotes" class="ritualNotes abilityField ritualField"></div>
                </div>
              </div>
            </div>  
            <!-- End ritual 2 -->  

          </div> <!-- End ritual List -->
      </div> <!-- End abilityWrapper -->
      </article>

      <footer class="sectionFooter">
        <div class="footerText"></div>
      </footer>
    </section>

    
   </body>
 </html> 
