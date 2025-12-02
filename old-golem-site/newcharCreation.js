 
function hide (hideTarget){
  //console.log("hide: " + hideTarget);
  $("#" + hideTarget).addClass('hidden');
  $("#hide" + hideTarget).addClass('hidden');
  $("#show" + hideTarget).removeClass('hidden');
}

function show (showTarget){
  //console.log("Show: " + showTarget);
  $("#" + showTarget).removeClass('hidden');
  $("#hide" + showTarget).removeClass('hidden');
  $("#show" + showTarget).addClass('hidden');
}

function showDesc (showTarget){
  //console.log("showTarget: " + showTarget);
  document.getElementById(showTarget).style.display = "block";
}

function hideDesc (hideTarget){
  //console.log("hideTarget: " + hideTarget);
  document.getElementById(hideTarget).style.display = "none";
}


function saveCharacter (){
  var characterToSave = {
    charName : $("#charName").val()
    , charLvl : $("#charLvl").val()
    , childhood : $("#childhood").val()
    , training : $("#training").val()
    , roleSelector : $("#roleSelector").val()
    , height : $("#charHeight").val()
    , build : $("#charBuild").val()
    , skin : $("#charSkin").val()
    , hair : $("#charHair").val() 
    , eyes : $("#charEyes").val()
    , charDesc : $("#charDescription").val()
    , fatigueThreshold : $("#fatigueThreshold").val()
    , fatigueCurrent  : $("#fatigueCurrent").val()
    , mana : $("#manaValue").val()
    , armor: $("#armorValue").val()
    , bodyPriority : $("#bodyPriority").val()
    , mightValue : $("#mightValue").val()
    , agilityValue : $("#agilityValue").val()
    , brawnValue : $("#brawnValue").val()
    , bodyRemaining : $("#physicalAttributePoints").val()
    , mindPriority : $("#mindPriority").val()
    , willValue : $("#willValue").val()
    , witValue : $("#witValue").val()
    , resolveValue : $("#resolveValue").val()
    , mindRemaining : $("#mentalAttributePoints").val()
    , spiritPriority : $("#spiritPriority").val()
    , vigorValue : $("#vigorValue").val()
    , empathyValue : $("#empathyValue").val()
    , faithValue : $("#faithValue").val()
    , spiritRemaining : $("#spiritAttributePoints").val()
    , skills : {}
    , strikeSkillRank : $("#strikeSkillRank").val()
    , blastSkillRank : $("#blastSkillRank").val()
    , scoldSkillRank : $("#scoldSkillRank").val()
    , strikeProfSelect1 : $("#strikeProfSelect1").val()
    , strikeProfSelect2 : $("#strikeProfSelect2").val()
    , strikeProfSelect3 : $("#strikeProfSelect3").val()
    , strikeProfSelect4 : $("#strikeProfSelect4").val()
    , strikeProfSelect5 : $("#strikeProfSelect5").val()
    , blastProfSelect1 : $("#blastProfSelect1").val()
    , blastProfSelect2 : $("#blastProfSelect2").val()
    , blastProfSelect3 : $("#blastProfSelect3").val()
    , blastProfSelect4 : $("#blastProfSelect4").val()
    , blastProfSelect5 : $("#blastProfSelect5").val()
    , scoldProfSelect1 : $("#scoldProfSelect1").val()
    , scoldProfSelect2 : $("#scoldProfSelect2").val()
    , scoldProfSelect3 : $("#scoldProfSelect3").val()
    , scoldProfSelect4 : $("#scoldProfSelect4").val()
    , scoldProfSelect5 : $("#scoldProfSelect5").val()
    , weaponAmount : $("#weaponAmount").val()
    , ritualAmount: $("#ritualAmount").val()
    , armorAmount : $("#armorAmount").val()
    , weapon1Name : $("#weapon1Name").val()
    , weapon1Type : $("#weapon1Type").val()
    , weapon1Size : $("#weapon1Size").val()
    , weapon1Damage : $("#weapon1Damage").val()
    , weapon2Name : $("#weapon2Name").val()
    , weapon2Type : $("#weapon2Type").val()
    , weapon2Size : $("#weapon2Size").val()
    , weapon2Damage : $("#weapon2Damage").val()
    , weapon3Name : $("#weapon3Name").val()
    , weapon3Type : $("#weapon3Type").val()
    , weapon3Size : $("#weapon3Size").val()
    , weapon3Damage : $("#weapon3Damage").val()
    , ritual1Select : $("#ritual1Select").val()
    , ritual2Select : $("#ritual2Select").val()
    , ritual3Select : $("#ritual3Select").val()
    , ritual4Select : $("#ritual4Select").val()
    , ritual5Select : $("#ritual5Select").val()
    , armor1Name : $("#armor1Name").val()
    , armor1Type : $("#armor1Type").val()
    , armor1Bonus : $("#armor1Bonus").val()
    , armor1Notes : $("#armor1Notes").val()
    , armor1Penalty : $("#armor1Penalty").val()
    , armor2Name : $("#armor2Name").val()
    , armor2Type : $("#armor2Type").val()
    , armor2Bonus : $("#armor2Bonus").val()
    , armor2Notes : $("#armor2Notes").val()
    , armor2Penalty : $("#armor2Penalty").val()
    , armor3Name : $("#armor3Name").val()
    , armor3Type : $("#armor3Type").val()
    , armor3Bonus : $("#armor3Bonus").val()
    , armor3Notes : $("#armor3Notes").val()
    , armor3Penalty : $("#armor3Penalty").val()
    , talentAmount : $("#talentAmount").val()
    , talent1 : $("#talent1").val()
    , talent2 : $("#talent2").val()
    , talent3 : $("#talent3").val()
    , nonAtkManAmount : $("#nonAtkManAmount").val()
    , nonAtkMan1 : $("#nonAtkMan1").val()
    , nonAtkMan2 : $("#nonAtkMan2").val()
    , nonAtkMan3 : $("#nonAtkMan3").val()
    , nonAtkMan4 : $("#nonAtkMan4").val()
    , atkManAmount : $("#atkManAmount").val()
    , atkMan1 : $("#atkMan1").val()
    , atkMan2 : $("#atkMan2").val()
    , atkMan3 : $("#atkMan3").val()
    , atkMan4 : $("#atkMan4").val()
    , charHeight: $("#charHeight").val()
    , charBuild: $("#charBuild").val()
    , charSkin: $("#charSkin").val()
    , charHair: $("#charHair").val()
    , charEyes: $("#charEyes").val()
    , charDesc: $("#charDescription").val()
    , birthPlace : $("#birthPlace").val()
    , childhoodStory : $("#childhoodStory").val()
    , trainingStory : $("#trainingStory").val()
    , journalStory : $("#journalStory").val()
    , charPurpose : $("#charPurpose").val()
    , gearItem1 : $("#gearItem1").val()
    , gearItem2 : $("#gearItem2").val()
    , gearItem3 : $("#gearItem3").val()
    , gearItem4 : $("#gearItem4").val()
    , gearItem5 : $("#gearItem5").val()
    , gearItem6 : $("#gearItem6").val()
    , gearItem7 : $("#gearItem7").val()
    , gearItem8 : $("#gearItem8").val()
    , gearAtm1 : $("#gearAtm1").val()
    , gearAtm2 : $("#gearAtm2").val()
    , gearAtm3 : $("#gearAtm3").val()
    , gearAtm4 : $("#gearAtm4").val()
    , gearAtm5 : $("#gearAtm5").val()
    , gearAtm6 : $("#gearAtm6").val()
    , gearAtm7 : $("#gearAtm7").val()
    , gearAtm8 : $("#gearAtm8").val()
    , gearLoad1 : $("#gearLoad1").val()
    , gearLoad2 : $("#gearLoad2").val()
    , gearLoad3 : $("#gearLoad3").val()
    , gearLoad4 : $("#gearLoad4").val()
    , gearLoad5 : $("#gearLoad5").val()
    , gearLoad6 : $("#gearLoad6").val()
    , gearLoad7 : $("#gearLoad7").val()
    , gearLoad8 : $("#gearLoad8").val()
    , solar : $("#praeSolar").val()
    , lunar : $("#praeLunar").val()
    , night : $("#praeNight").val()
    , tok : $("#praeTok").val()
    , pcNotes1 : $("#notes1").val()
    , pcNotes2 : $("#notes2").val()
    , pcNotes3 : $("#notes3").val()
  };

  $(".nonAttackSkills").each(function(index, skill) {
      var skillName = $(skill).prop("id");
      characterToSave.skills[skillName] = $(skill).val();
    });

    $.post("characterAPI2.php?saveCharacter&charID=" + $("#charID").val(), { character : characterToSave }, function(result) {
      //console.log(result);
      if(result.success){
        $('#charID').val(result.charID);
        window.alert("Save Successful");
        window.location = "?id=" + result.charID;
      }
      else {
        window.alert("Save Failed");
      }
    }, "json");
};

function attPriority (attribute, event) {
  if (attribute == 'body') {
    var val = $("#bodyPriority").val();
    if ($("#mindPriority").val()== val) {
	  $("#mindPriority").val("0");
    }
    if ($("#spiritPriority").val()== val) {
	  $("#spiritPriority").val("0");
    }
  }  else if (attribute == 'mind') {
    var val = $("#mindPriority").val();
    if ($("#bodyPriority").val()== val) {
	  $("#bodyPriority").val("0");
    }
    if ($("#spiritPriority").val()== val) {
	  $("#spiritPriority").val("0");
    }
  }  else if (attribute == 'spirit') {
    var val = $("#spiritPriority").val();
    if ($("#bodyPriority").val()== val) {
	  $("#bodyPriority").val("0");
    }
    if ($("#mindPriority").val()== val) {
	  $("#mindPriority").val("0");
    }
  }
  setAttPoints(event);
}

// sets values for BMS, their sub-attributes and sub-stats
function setAttPoints (e) {
  var level = parseInt($("#charLvl").val());
  var might = parseInt($("#mightValue").val());
  var agility = parseInt($("#agilityValue").val());
  var brawn = parseInt($("#brawnValue").val());
  var will = parseInt($("#willValue").val());
  var wit = parseInt($("#witValue").val());
  var resolve = parseInt($("#resolveValue").val());
  var vigor = parseInt($("#vigorValue").val());
  var empathy = parseInt($("#empathyValue").val());
  var faith = parseInt($("#faithValue").val());
  var body = 0;
  var mind = 0;
  var spirit = 0;

  //console.log("level value: " + level);


  // Sets body Value and Physical Attribute Points based on Priority.
  var bodyPriority = $("#bodyPriority").val()
  if (bodyPriority == "") {
    var bodyPoints = "";
  } else  if (bodyPriority == "1") {
    var bodyPoints = Math.floor ( 3 + (level + 1)/3);
    bodyPoints = bodyPoints - might - agility - brawn;
    body = 2;
    if (level >= 2) {body = 3;}
    if (level >= 8) {body = 4;}
  } else if (bodyPriority == "2") {
    var bodyPoints = Math.floor ( 2 + level / 3);
    bodyPoints = bodyPoints - might - agility - brawn;
    body = 2;
    if (level >= 6) {body = 3;}
  } else if (bodyPriority == "3") {
    var bodyPoints = Math.floor ( 1 + (level-1) / 3);
    bodyPoints = bodyPoints - might - agility - brawn;
    body = 1;
    if (level >= 4) {body = 2;}
    if (level >= 10) {body = 3;}
  } else if (bodyPriority == "0") { 
    body = 0;
    bodyPoints = "UA";
  }

  // Sets mind Value and Mental Attribute Points based on Priority.
  var mindPriority = $("#mindPriority").val()
  if (mindPriority == "") {
    var mindPoints = "";
  } else  if (mindPriority == "1") {
    var mindPoints = Math.floor ( 3 + (level + 1)/3);
    mindPoints = mindPoints - will - wit - resolve;
    mind = 2;
    if (level >= 2) {mind = 3;}
    if (level >= 8) {mind = 4;}
  } else if (mindPriority == "2") {
  	 var mindPoints = Math.floor ( 2 + level / 3);
  	 mindPoints = mindPoints - will - wit - resolve;
	 mind = 2;
	 if (level >= 6) {mind = 3;}
  } else if (mindPriority == "3") {
    var mindPoints = Math.floor ( 1 + (level-1) / 3);
    mindPoints = mindPoints - will - wit - resolve;
    mind = 1;
    if (level >= 4) {mind = 2;}
    if (level >= 10) {mind = 3;}
  } else if (mindPriority == "0") { 
  	mind = 0;
  	mindPoints = "UA";
  }

  // Sets spirit Value and social Attribute Points based on Priority.
  var spiritPriority = $("#spiritPriority").val()
  if (spiritPriority == "") {
    var spiritPoints = "";
  } else  if (spiritPriority == "1") {
  	 var spiritPoints = Math.floor ( 3 + (level + 1)/3);
  	 spiritPoints = spiritPoints - vigor - empathy - faith;
  	 spirit = 2;
  	 if (level >= 2) {spirit = 3;}
  	 if (level >= 8) {spirit = 4;}
  } else if (spiritPriority == "2") {
  	 var spiritPoints = Math.floor ( 2 + level / 3);
  	 spiritPoints = spiritPoints - vigor - empathy - faith;
  	 spirit = 2;
  	 if (level >= 6) {spirit = 3;}
  } else if (spiritPriority == "3") {
  	  var spiritPoints = Math.floor ( 1 + (level-1) / 3);
  	  spiritPoints = spiritPoints - vigor - empathy - faith;
  	  spirit = 1;
  	  if (level >= 4) {spirit = 2;}
  	  if (level >= 10) {spirit = 3;}
  } else if (spiritPriority == "0") { 
  	  spirit = 0;
  	  spiritPoints = "UA";
  }

  //Sets everything that is solely dependent on BMS
  $("#bodyValue").html(body);
  $("#physicalAttributePoints").html(bodyPoints);
  $("#strikeSkillDamage").html("W+" + body);
  $("#strikeSkillMod").html(body);
  $("#mindValue").html(mind);
  $("#mentalAttributePoints").html(mindPoints);
  $("#blastSkillMod").html(mind);
  $("#spiritValue").html(spirit);
  $("#spiritAttributePoints").html(spiritPoints);
  $("#scoldSkillMod").html(spirit);

  toughHP = 0;
  if ($("#nonAtkMan1").val() == 5 || $("#nonAtkMan2").val() == 5 || $("#nonAtkMan3").val() == 5){
    toughHP = parseInt($("#enduranceSkillRank").val());
    //console.log('though check yes endurance ' + toughHP);
  }
  else {
    toughHP = 0;
    //console.log('though check ' + toughHP);
  }

  var guard = Math.max(body,mind,spirit) + 7;
  var armor = 0;
  var run = 6 + 2*(parseInt($("#athleticsSkillRank").val()) + parseInt($("#athleticsSkillMod").html()));
  var sprint = 9 + (parseInt($("#athleticsSkillRank").val()) + parseInt($("#athleticsSkillMod").html()))*3;
  var dead = -10 - toughHP + (level -1) * -2;
  var desperate = 10 + toughHP + (level-1) * 2;
  var marred = 10 + toughHP + desperate + (level -1) * 2;
  var hp = 10 + toughHP + marred + (level -1) * 2;
  var initiative = agility + wit + empathy;
  var conversion = Math.floor((might + will + vigor)/3) + 3;
  var initialMomentum = Math.floor((agility + wit + empathy)/3) + 3;
  var fatigueThreshold = Math.floor((brawn + resolve + faith)/3) + 3;
  var sum = body + mind + spirit;
  var talent1 = $("#talent1").val();

  if ($("#armor1Type").val() == 1 || $("#armor2Type").val() == 1 || $("#armor3Type").val() == 1){
    armor = armor + 1;
    sprint = sprint - 1;
  }

  if ($("#armor1Type").val() == 2 || $("#armor2Type").val() == 2 || $("#armor3Type").val() == 2){
    armor = armor + 2;
    run = run - 1; 
    sprint = sprint - 2;
    //console.log(run + '' + sprint);
  }

  if ($("#armor1Type").val() == 4 || $("#armor2Type").val() == 4 || $("#armor3Type").val() == 4){
    guard = guard + 1;
  }

  
  $("#runValue").html(run);
  $("#sprintValue").html(sprint);
  $("#armorValue").html(armor);
  $("#guardValue").html(guard);
  $("#initValue").html(initiative);
  $("#maxHpValue").html(hp);		
  $("#marredValue").html(marred);
  $("#desperateValue").html(desperate);
  $("#deadValue").html(dead);
  $("#fatigueCurrent").html(fatigueCurrent);
  $("#fatigueThreshold").html(fatigueThreshold);
  $("#conversionValue").html(conversion);
  $("#initiativeValue").html(initiative);
  $("#initialMomentumValue").html(initialMomentum);
  $("#mightValue").attr({"max" : body});
  $("#agilityValue").attr({"max" : body});
  $("#brawnValue").attr({"max" : body});
  $("#willValue").attr({"max" : mind});
  $("#witValue").attr({"max" : mind});
  $("#resolveValue").attr({"max" : mind});
  $("#vigorValue").attr({"max" : spirit});
  $("#empathyValue").attr({"max" : spirit});
  $("#faithValue").attr({"max" : spirit});
}

// Sets mod and passive values for skills when related attribute or skill rank is changed 
function setSkillValues(e, attribute){
  var targetedId = $(e.target).prop('id');

  if (attribute.constructor == Array ) {
    var numSkills = attribute.length;
    var attributeValue = parseInt($("#" + targetedId).val());

    for (var i = 0; i < numSkills; i++) {
      var skillValue = parseInt($("#" + attribute[i] + "SkillRank").val());
      var passiveValue = attributeValue + skillValue + 2;
      //console.log(attribute + ": " + passiveValue);
      $("#" + attribute[i] + "SkillMod").html(attributeValue);
      $("#" + attribute[i] + "SkillPassive").html(passiveValue);
    }

  } else {
    var newVal = $("#" + targetedId).val();
    var skillBaseName = targetedId.replace('Rank','');
    var attributeValue = parseInt($("#" + attribute + "Value").val());

    $("#" + skillBaseName + "Passive").html(attributeValue + 2 + parseInt(newVal));
  }
  //populateAllTalentMenus();
  populateAllNonAtkManMenus();
  populateAllAtkManMenus();
  //populateAllExploitMenus();
  populateAllRitualMenus();
}



//Pulls proficinecy and specialization options from database
function proficiencyListManagement(attackType) {
  var profSelectors = $(".profSelector");
  var selectedProfs = [];

  $(profSelectors).each(function(idx, value){
    //Don't include empty selectors
    if($(value).val() != "0"){
      selectedProfs.push($(value).val());
    }
  });
  //console.log(selectedProfs);
  var jsonSelectedProfs = JSON.stringify(selectedProfs);
  $.post("characterAPI2.php?proficiencyList", { proficiencies : jsonSelectedProfs, attackType : attackType}, function(result) {
    $(".profSelector").each(function(idx, selector){
      if($(selector).prop("id").indexOf(attackType) != -1){
        var selected = $(selector).val();
        $(selector).empty(); 
        $(selector).append("<option value=0></option>");
        $(result.proficiencyList).each(function(idx2, proficiency){
          $(selector).append("<option value=" + proficiency.profID + ">" + proficiency.name + "</option>");
        });		
        $(selector).val(selected);
      }
    })
  }, 'json');
}

function populateRoleInfo (e){
    var roleSelected = $(e.target).val();
    //console.log("populateRoleInfo roleSelected: " + roleSelected);
    //modifiedSkill = modifiedSkill.replace('SkillRank', '');
    var roleAbilities = [];
    roleAbilities.push(roleSelected);
    var jsonAbilities = JSON.stringify(roleAbilities);
    //console.log("populateRoleInfo roleAbilities: " + roleAbilities);
    //console.log("populateRoleInfo jsonAbilities: " + jsonAbilities);
    if (roleSelected == ""){
      $("#rTalentName").empty();
      $("#rTalentDesc").empty();
      $("#rManName").empty();
      $("#rManCost").empty();
      $("#rManAction").empty();
      $("#rManEffect").empty();
      $("#rManEffect2").empty();

    }else{
      $.post("characterAPI2.php?roleInfo", { roleSelectedName : roleSelected }, function(result) {
        $("#rTalentName").html(result.rTalentName);
        $("#rTalentDesc").html(result.rTalentDesc);
        $("#rManName").html(result.rManName);
        $("#rManCost").html(result.rManCost);
        $("#rManAction").html(result.rManAction);
        $("#rManEffect").html(result.rManEffect);
        $("#rManEffect2").html(result.rManEffect2);
      }, 'json');
    }
  }


function populateExploitMenu(menuID) {
  var skills = [];
  var existingExploitID = $("#" + menuID).val();
  //console.log("Exploit Menu Id: " + menuID);

  //Removes the currently selected option fro the list to prevent the redundancy
  $("#" + menuID + " option").each(function(idx, option){
    if ($(option).val() == existingExploitID) {
      $(option).prop("id", "deleteMe");
    }
    else {
      $(option).remove();
    }
  });

  //Adds all exploits with a basic rank or higher to the list
  $.each($('.nonAttackSkills'), function(idx, skill) {
    if ($(skill).val() >= 2) {
      var skillName = $(skill).prop('id').replace('SkillRank','');
      skills.push(skillName);
      //console.log("skill name exploit population: " + skillName);
    }
  });

  //If list of exploits is greater than 0, populates the list. 
  if (skills.length > 0) {
    $("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
    var jsonSkills = JSON.stringify(skills);
    var existingExploitFound = false;
    $.post("characterAPI2.php?exploitList", { skills: jsonSkills }, function(result) {
      $.each(result.exploitList, function(idx, exploit) {

        //Check selected option to be the same option as before as old one is getting deleted to prevent redundancy 
        if (existingExploitID == exploit.exploitID){
          $("#" + menuID).append("<option value='" + exploit.exploitID + "' selected >" + exploit.name + "</option>");
          populateExploitInfo(menuID);

          existingExploitFound = true;
          //console.log("populateExploitMenu: existing exploit equaled exploitID");
        } else {
          $("#" + menuID).append("<option value='" + exploit.exploitID + "'>" + exploit.name + "</option>");
          //console.log("populateExploitMenu: existing exploit did not equal exploitID");
        }
      });
    }, 'json');
    
    if (existingExploitFound == false) {
      //$("#" + menuID + "Keywords").empty();
      $("#" + menuID + "Description").empty();
    }
    $("#deleteMe").remove();
   }
   else {
     $("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
     //$("#" + menuID + "Keywords").empty();
     $("#" + menuID + "Description").empty();
  }
}

function populateExploitInfo(menuID) {
  //console.log("populateExploitInfo MenuID: " + menuID);

  var exploitID = $("#" + menuID).val();
  var exploitName = $("#" + menuID + " option:selected").text();
  //console.log("populateExploitInfo exploitName & ID: " + exploitName + ", " + exploitID);

  if (exploitName != "") {
    $.post("characterAPI2.php?exploitInfo", { exploitInfoName : exploitName }, function(exploit) {
      //$("#" + menuID + "Keywords").text(exploit.keyword);
      $("#" + menuID + "Description").html(description);
      //console.log(menuID + ": " + description);
    }, 'json');
  }
  else {
    $("#" + menuID + "Description").empty();
  }
}

function populateWeaponExploitInfo(menuID) {
  //console.log("populateWeaponExploitInfo MenuID: " + menuID);

  var weaponExploitID = $("#" + menuID + "Type").val();
  var weaponExploitName = $("#" + menuID + "Type option:selected").text();
  //console.log("populateExploitInfo exploitName & ID: " + weaponExploitName + ", " + weaponExploitID);

  if (weaponExploitName != "") {
    $.post("characterAPI2.php?weaponExploitInfo", { weaponExploitInfoName : weaponExploitName }, function(weaponExploit) {
      description = weaponExploit.weaponExploitDescription;
      name = weaponExploit.weaponExploitName;
      combine = name.concat(": " + description);
      //$("#" + menuID + "Keywords").text(exploit.keyword);
      $("#" + menuID + "ExploitName").html(name);
      $("#" + menuID + "ExploitDescription").html(description);
      //console.log(menuID + ": " + description);
    }, 'json');
  }
  else {
    $("#" + menuID + "ExploitDescription").empty();
  }
}


function populateNonAtkManMenu(menuID) {
  var skills = [];
  var existingNonAtkManID = $("#" + menuID).val();
  //console.log("populateNonAtkManMenu existingNonAtkManID: " + existingNonAtkManID);
  $("#" + menuID + " option").each(function(idx, option){
    if ($(option).val() == existingNonAtkManID) {
      $(option).prop("id", "deleteMe");
    }
    else {
      $(option).remove();
    }
  });

  $.each($('.nonAttackSkills'), function(idx, skill) {
    if ($(skill).val() >= 2) {
      var skillName = $(skill).prop('id').replace('SkillRank','');
      skills.push(skillName);
    }
  });

  if (skills.length > 0) {
    $("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
    var jsonSkills = JSON.stringify(skills);
    var existingNonAtkManFound = false;
    $.post("characterAPI2.php?nonAtkManList", { skills: jsonSkills }, function(result) {
      $.each(result.nonAtkManList, function(idx, nonAtkMan) {
        if (existingNonAtkManID == nonAtkMan.nonAtkManID){
          $("#" + menuID).append("<option value='" + nonAtkMan.nonAtkManID + "' selected >" + nonAtkMan.name + "</option>");
          populateNonAtkManInfo(menuID);
          existingNonAtkManFound = true;
          //console.log("populateNonAtkManMenu: existing nonAtkMan equaled nonAtkManID");
        } else {
          $("#" + menuID).append("<option value='" + nonAtkMan.nonAtkManID + "'>" + nonAtkMan.name + "</option>");
          //console.log("populateNonAtkManMenu: existing nonAtkMan did not equal nonAtkManID");
        }
      });
    }, 'json');
    if (existingNonAtkManFound == false) {
      $("#" + menuID + "Cost").empty();
      $("#" + menuID + "Passive").empty();
      $("#" + menuID + "Trigger").empty();
      $("#" + menuID + "Effect").empty();
    }
    $("#deleteMe").remove();
  } else {
    $("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
    $("#" + menuID + "Cost").empty();
    $("#" + menuID + "Passive").empty();
    $("#" + menuID + "Trigger").empty();
    $("#" + menuID + "Effect").empty();
  }
}


function populateNonAtkManInfo(menuID) {
  console.log("populateNonAtkManInfo MenuID: " + menuID);
  if (menuID == "all") {
    $.each($(".nonAtkManSelector"), function(idx, nonAtkManInfoSelector) {
      //add the process of changing nonAtkMan info and detokenize
    });
  } else {
    var nonAtkManID = $("#" + menuID).val();
    var nonAtkManName = $("#" + menuID + " option:selected").text();
    console.log("populateNonAtkManInfo nonAtkManName & ID: " + nonAtkManName + ", " + nonAtkManID);
    if (nonAtkManID != "None") {
      $.post("characterAPI2.php?nonAtkManInfo", { nonAtkManInfoName : nonAtkManName }, function(nonAtkMan) {
        passive = nonAtkMan.passive
        cost = nonAtkMan.cost;
        trigger = nonAtkMan.trigger;
        description = nonAtkMan.effect;
        $("#" + menuID + "Passive").html(passive);
        $("#" + menuID + "Cost").html(cost);
        $("#" + menuID + "Trigger").html(trigger);
        $("#" + menuID + "Effect").html(description);
        //add area for applying classes second table which has nonAtkMan info
      }, 'json');
    }
    else {
      $("#" + menuID + "Cost").empty();
      $("#" + menuID + "Passive").empty();
      $("#" + menuID + "Trigger").empty();
      $("#" + menuID + "Effect").empty();
    }
  }
}


function populateAtkManMenu(menuID) {
  var skills = [];
  var existingAtkManID = $("#" + menuID).val();
  //console.log("populateAtkManMenu existingAtkManID: " + existingAtkManID);
  $("#" + menuID + " option").each(function(idx, option){
    if ($(option).val() == existingAtkManID) {
      $(option).prop("id", "deleteMe");
    }
    else {
      $(option).remove();
    }
  });

  $.each($('.nonAttackSkills'), function(idx, skill) {
    if ($(skill).val() >= 2) {
      var skillName = $(skill).prop('id').replace('SkillRank','');
      skills.push(skillName);
    }
  });

  if (skills.length > 0) {
    $("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
    var jsonSkills = JSON.stringify(skills);
    var existingAtkManFound = false;
    $.post("characterAPI2.php?atkManList", { skills: jsonSkills }, function(result) {
      $.each(result.atkManList, function(idx, atkMan) {

        if (existingAtkManID == atkMan.atkManID){
          $("#" + menuID).append("<option value='" + atkMan.atkManID + "' selected >" + atkMan.name + "</option>");
          populateAtkManInfo(menuID);

          existingAtkManFound = true;
          //console.log("populateAtkManMenu: existing atkMan equaled atkManID");
        } else {
          $("#" + menuID).append("<option value='" + atkMan.atkManID + "'>" + atkMan.name + "</option>");
          //console.log("populateAtkManMenu: existing atkMan did not equal atkManID");
        }
      });
    }, 'json');
    if (existingAtkManFound == false) {
      $("#" + menuID + "Cost").empty();
      $("#" + menuID + "EffectSm").empty();
      $("#" + menuID + "EffectBg").empty();
      $("#" + menuID + "EffectMana").empty();
    }
    $("#deleteMe").remove();
  }
  else {
    $("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
    $("#" + menuID + "Cost").empty();
    $("#" + menuID + "EffectSm").empty();
    $("#" + menuID + "EffectBg").empty();
    $("#" + menuID + "EffectMana").empty();
  }
}


function populateAtkManInfo(menuID) {
  //console.log("populateAtkManInfo MenuID: " + menuID);
	var atkManID = $("#" + menuID).val();
  var atkManName = $("#" + menuID + " option:selected").text();
  //console.log("populateAtkManInfo atkManName & ID: " + atkManName + ", " + atkManID);
  if (atkManID != "None") {
	  $.post("characterAPI2.php?atkManInfo", { atkManInfoName : atkManName }, function(atkMan) {
	    cost = atkMan.cost;
	    descriptionSm = atkMan.effectSm;
	    descriptionBg = atkMan.effectBg;
	    descriptionMana = atkMan.effectMana;
	    $("#" + menuID + "Cost").html(cost);
	    $("#" + menuID + "EffectSm").html(descriptionSm);
	    $("#" + menuID + "EffectBg").html(descriptionBg);
	    $("#" + menuID + "EffectMana").html(descriptionMana);
	    //add area for applying classes second table which has atkMan info
      if (atkManID > 6 && atkManID < 13) {
        populateSpellInfo(menuID, descriptionMana);
      }
    },
    'json');
  }
  else {
    $("#" + menuID + "Cost").empty();
    $("#" + menuID + "EffectSm").empty();
    $("#" + menuID + "EffectBg").empty();
    $("#" + menuID + "EffectMana").empty();
  }
}

function populateSpellInfo (menuID, ritualNameFull) {
  var spellID = $('#' + menuID).val();
  var ritualName = ritualNameFull.slice(14);
  console.log("RitualName: " + ritualName);


  $.post("characterAPI2.php?ritualInfo", { ritualInfoName : ritualName }, function(ritual) {
    descriptionMana = ritual.castTime;
    console.log("cast time: " + descriptionMana);
    $("#" + menuID + "SpellName").html(descriptionMana);
    //add area for applying classes second table which has atkMan info
    },
    'json');
}


function populateRitualInfo(menuID) {
  //console.log("populateRitualInfo MenuID: " + menuID);

  var ritualID = $("#" + menuID).val();
  var ritualName = $("#" + menuID + " option:selected").text();
  //console.log("populateRitualInfo ritualName & ID: " + ritualName + ", " + ritualID);

  if (ritualName != "") {
    $.post("characterAPI2.php?ritualInfo", { ritualInfoName : ritualName }, function(ritual) {

      //console.log(ShortCost);

      /*
      var ShortCost = ritual.cost.replace('Cost:', '');
      var ShortCost = ShortCost.replace('Mana', '');
      var ShortCastTime = ritual.castTime.replace("Cast time:", "");
      var ShortCastTime = ShortCastTime.replace(" hours", "h");
      var ShortCastTime = ShortCastTime.replace(" hour", "h");
      var ShortCastTime = ShortCastTime.replace(" minutes", "m");
      var ShortDuration = ritual.duration.replace("Duration:", "");
      var ShortDuration = ShortDuration.replace(" minutes", "m");
      var ShortDuration = ShortDuration.replace(" hours", "h");
      var ShortDuration = ShortDuration.replace(" hour", "h");
      //description = deTokenize(ritual.description);
      */
      var ShortCost = ritual.cost;
      var ShortCastTime = ritual.castTime;
      var ShortDuration = ritual.duration;

      //$("#" + menuID + "Keywords").text(exploit.keyword);
      $("#" + menuID + "ShortCost").html(ShortCost);
      $("#" + menuID + "ShortCastTime").html(ShortCastTime);
      $("#" + menuID + "ShortDuration").html(ShortDuration);
      $("#" + menuID + "ShortDesc").html(ritual.shortDesc);
      $("#" + menuID + "Name").html(ritual.name);
      $("#" + menuID + "Keywords").html(ritual.keyword);
      $("#" + menuID + "Cost").html(ritual.cost);
      $("#" + menuID + "CastTime").html(ritual.castTime);
      $("#" + menuID + "Duration").html(ritual.duration);
      $("#" + menuID + "Effect").html(ritual.effect);
      $("#" + menuID + "Enhancements").html(ritual.enhancements);
      $("#" + menuID + "Augments").html(ritual.augments);
      $("#" + menuID + "Resist").html(ritual.resist);
      $("#" + menuID + "Notes").html(ritual.gameNotes);
      //console.log(menuID + ": " + ritual.cost);
    }, 'json');
  }
  else {

    $("#" + menuID + "ShortCost").empty();
    $("#" + menuID + "ShortCastTime").empty();
    $("#" + menuID + "ShortDuration").empty();
    $("#" + menuID + "Name").empty();
    $("#" + menuID + "Keywords").empty();
    $("#" + menuID + "Cost").empty();
    $("#" + menuID + "CastTime").empty();
    $("#" + menuID + "Duration").empty();
    $("#" + menuID + "Effect").empty();
    $("#" + menuID + "Enhancements").empty();
    $("#" + menuID + "Augments").empty();
    $("#" + menuID + "Resist").empty();
    $("#" + menuID + "Notes").empty();
    $("#" + menuID + "Description").empty();
  }
}


function populateRitualMenu(menuID) {
  var skills = [];
  var existingRitualID = $("#" + menuID).val();
  //console.log("Ritual Menu Id: " + menuID);

  //Removes the currently selected option from the list to prevent the redundancy
  $("#" + menuID + " option").each(function(idx, option){
    if ($(option).val() == existingRitualID) {
      $(option).prop("id", "deleteMe");
    }
    else {
      $(option).remove();
    }
  });

  //Adds all rituals with a basic rank or higher to the list
  $.each($('.mentalSkills'), function(idx, skill) {
    if ($(skill).val() >= 2) {
      var skillName = $(skill).prop('id').replace('SkillRank','');
      //console.log("skillName: " + skillName);
      skills.push(skillName);
    }
  });

  //If list of exploits is greater than 0, populates the list. 
  if (skills.length > 0) {

    $("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
    var jsonSkills = JSON.stringify(skills);
    var existingRitualFound = false;
    $.post("characterAPI2.php?ritualList", { skills: jsonSkills }, function(result) {
      $.each(result.ritualList, function(idx, ritual) {
        //Check selected option to be the same option as before as old one is getting deleted to prevent redundancy 
        if (existingRitualID == ritual.ritualID){
          $("#" + menuID).append("<option value='" + ritual.ritualID + "' selected >" + ritual.name + "</option>");
          populateRitualInfo(menuID);

          existingRitualFound = true;
          //console.log("populateExploitMenu: existing exploit equaled exploitID");
        } else {
          $("#" + menuID).append("<option value='" + ritual.ritualID + "'>" + ritual.name + "</option>");
          //console.log("populateExploitMenu: existing exploit did not equal exploitID");
        }
      });
    }, 'json');
    
    if (existingRitualFound == false) {
      //$("#" + menuID + "Keywords").empty();
      $("#" + menuID + "Description").empty();
    }
    $("#deleteMe").remove();
   }
   else {
     $("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
     //$("#" + menuID + "Keywords").empty();
     $("#" + menuID + "Description").empty();
  }
}

//shows weapon listings based on amount of weapons selected
function weaponAmount (event){
  $("#weapon1").hide();
  $("#weapon2").hide();
  $("#weapon3").hide();
  $("#weapon4").hide();



  for (amount = parseInt($("#weaponAmount").val()); amount >= -1; amount--){
    $("#weapon" + amount).show();
  }
}

function ritualAmount (event) {
  $("#ritual1").hide();
  $("#ritual2").hide();
  $("#ritual3").hide();
  $("#ritual4").hide();
  for (amount = parseInt($("#ritualAmount").val()); amount >= -1; amount--){
    $("#ritual" + amount).show();
  }
}

// shows armor listings based on amount of armors selected
function armorAmount (event){
  $("#armor0").hide();
  $("#armor1").hide();
  $("#armor2").hide();
  $("#armor3").hide();
  $("#armor4").hide();

  for (amount = parseInt($("#armorAmount").val()); amount >= -1; amount--){
    $("#armor" + amount).show();
  }
}

function selectArmor (armorNum){
  //console.log("Me Hit?");
  //console.log($("#armor" + armorNum + "type").val());
  if ($("#armor" + armorNum + "Type").val() == "0"){
    $("#armor" + armorNum + "Bonus").html("");
    $("#armor" + armorNum + "Penalty").html("");
  }
  if ($("#armor" + armorNum + "Type").val() == "1"){
    $("#armor" + armorNum + "Bonus").html("1 Armor");
    $("#armor" + armorNum + "Penalty").html("<abbr class='lightPen'>LA Penalty</abbr>");
    $("#armor" + armorNum + "Load").html("1");
  }
  if ($("#armor" + armorNum + "Type").val() == "2"){
    $("#armor" + armorNum + "Bonus").html("2 Armor");
    $("#armor" + armorNum + "Penalty").html("<abbr class='medPen'>HA Penalty</abbr>");
    $("#armor" + armorNum + "Load").html("2");
  }
  if ($("#armor" + armorNum + "Type").val() == "3"){
    $("#armor" + armorNum + "Bonus").html("3 Armor");
    $("#armor" + armorNum + "Penalty").html("<abbr class='heavyPen'>HA Penalty</abbr>");
    $("#armor" + armorNum + "Load").html("2");
  }
  if ($("#armor" + armorNum + "Type").val() == "4"){
    $("#armor" + armorNum + "Bonus").html("1 Guard");
    $("#armor" + armorNum + "Penalty").html("<abbr class='shieldPen'>Shield Penalty</abbr>");
    $("#armor" + armorNum + "Load").html("1");
  }

  setAttPoints();
}

/*
function talentAmount (event){
  $("#talentTable2").hide();	
  $("#talentTable3").hide();

  for (amount = parseInt($("#talentAmount").val()); amount >= -1; amount--){
    $("#talentTable" + amount).show();
  }
}
*/

function nonAtkManAmount (event){
  $("#nonAtkManTable2").hide();	
  $("#nonAtkManTable3").hide();

  for (amount = parseInt($("#nonAtkManAmount").val()); amount >= -1; amount--){
    $("#nonAtkManTable" + amount).show();
  }
}

function atkManAmount (event){
  $("#atkManTable2").hide();	
  $("#atkManTable3").hide();
  $("#atkManTable4").hide();

  for (amount = parseInt($("#atkManAmount").val()); amount >= -1; amount--){
    $("#atkManTable" + amount).show();
  }
}

function proficiencyAmount (e) {
  var modifiedAtkSkill = $(e.target).prop('id');
  var modifiedAtkVal = $("#" + modifiedAtkSkill).val() -1;
  var atkSkillName = modifiedAtkSkill.replace('SkillRank','');
  //console.log("proficiencyValues, modifiedAtkVal: " + modifiedAtkVal);
  //console.log("proficiencyValues, atkSkillName: " + atkSkillName);
  //console.log("proficiencyValues, modifiedAtkSkill: " + modifiedAtkSkill);
  
  $("#" + atkSkillName + "ProfSelector1").hide();
  $("#" + atkSkillName + "ProfSelector2").hide();
  $("#" + atkSkillName + "ProfSelector3").hide();
  $("#" + atkSkillName + "ProfSelector4").hide();
  $("#" + atkSkillName + "ProfSelector5").hide();
  
  for (amount = parseInt($("#" + modifiedAtkSkill).val()); amount >= -1; amount--){
    $("#" + atkSkillName + "ProfSelector" + amount).show();
    //console.log("#" + atkSkillName + "ProfSelector" + amount);
  }
  $("#" + atkSkillName + "ProficiencyAmount").html(parseInt(modifiedAtkVal));
    proficiencyListManagement(atkSkillName);
}




// Finds all elements with the related class then pass them to populateTalentMenu to populate each of them. 
function populateAllNonAtkManMenus(){
  $.each($('.nonAtkManSelector'), function(idx, nonAtkManMenu){
    var menuID = $(nonAtkManMenu).prop("id");
  populateNonAtkManMenu(menuID);
  });
}
function populateAllAtkManMenus(){
  $.each($('.atkManSelector'), function(idx, atkManMenu){
  var menuID = $(atkManMenu).prop("id");
  populateAtkManMenu(menuID);
  });
}

function populateAllExploitMenus(){
	$.each($('.exploitSelector'), function(idx, exploitMenu){
	  var menuID = $(exploitMenu).prop("id");
	  populateExploitMenu(menuID);
	});
}

function populateAllRitualMenus(){
  $.each($('.ritualSelector'), function(idx, ritualMenu) {
    var menuID = $(ritualMenu).prop("id");
    populateRitualMenu(menuID);
  });
}

/*
function populateAllTalentMenus(){
  $.each($('.talentSelector'), function(idx, talentMenu){
    var menuID = $(talentMenu).prop("id");
    populateTalentMenu(menuID);
  });
}
*/

function deTokenize(description) {
  if (description.indexOf("|") == -1 && description.indexOf("[") == -1) {
    console.log("exiting detokenize due to lack of indecies")
    return description;
  }

  var startPipeSearch = 0;
  do {
    var firstPipe = description.indexOf("|", startPipeSearch);
    var nextPipe = description.indexOf("|", firstPipe + 1);
    var neededValueFrom = description.substring(firstPipe + 1, nextPipe);
    var value = $("#" + neededValueFrom).val();

    description = description.replace("|" + neededValueFrom + "|", value);
    startPipeSearch = nextPipe + 1;
    firstPipe = description.indexOf("|", startPipeSearch);
  } while (firstPipe != -1);

  if (description.indexOf("[") != -1) {
    startBracketSearch = 0;
    do {
      var firstBracket = description.indexOf("[", startBracketSearch);
      var nextBracket = description.indexOf("]", firstBracket + 1);
      var mathString = description.substring(firstBracket + 1, nextBracket);

      mathResult = Math.floor( eval(mathString) );
      description = description.replace("[" + mathString + "]", mathResult);
      startBracketSearch = nextBracket + 1;
      firstBracket = description.indexOf("[", startBracketSearch);
    } while (firstBracket != -1);
  }
  console.log("deTokenize returning: " + description);
  return description;
}


function skillPoints (e){
  var level = parseInt($("#charLvl").val());
  var skillPoints = 29;
  var maxSkillRank = "3: Trained"

  $('.nonAttackSkills').each(function(){
    skillPoints -= parseInt(this.value);
  });

  skillPoints += level;
  if (level >= 4) {
    skillPoints ++;
    maxSkillRank = "4: Adept";
  }
  if (level >= 7) {
    skillPoints++;
    maxSkillRank = "5: Expert";
  }
  if (level >= 10) {
    skillPoints++;
    maxSkillRank = "6: Master";
  }

  skillPoints -= parseInt($("#strikeSkillRank").val());
  skillPoints -= parseInt($("#blastSkillRank").val());
  skillPoints -= parseInt($("#scoldSkillRank").val());

  $("#skillPoints").text(skillPoints);
  $("#maxSkillRank").text(maxSkillRank);
  //console.log("skillPoints: " + skillPoints);
}

function setAbilityAmount (e) {
  var level = parseInt($("#charLvl").val());
  var atkManAmount = $("#atkManAmount").val();
  var nonAtkManAmount = $("#nonAtkManAmount").val();
  // var talentAmount = $("#talentAmount").val();
  // var ritualAmount = $("#ritualAmount").val();
  var totalAbilities = 4;

  for (x=1; x <= level; x++){
  //console.log("x =: " + (x % 3));
    if( (x+1) % 2 == 0) {
      //console.log("no ability");
    } else {
      //console.log("another ability");
      totalAbilities = totalAbilities + 1;
      //console.log("totalAbilities: " + totalAbilities);
    }
  };
  $("#abilityNumber").html(totalAbilities);
  var remainingAbilities = totalAbilities - atkManAmount - nonAtkManAmount - 2;
  $("#remainingAbilities").html(remainingAbilities);
  //console.log("remainingAbilities value: " + remainingAbilities);

}

/*
function populateRitualMenu(menuID) {
  var skills = [];
  var existingRitualID = $("#" + menuID).val();
  //console.log("Ritual Menu Id: " + menuID);

  //Removes the currently selected option from the list to prevent the redundancy
  $("#" + menuID + " option").each(function(idx, option){
    if ($(option).val() == existingRitualID) {
      $(option).prop("id", "deleteMe");
    }
    else {
      $(option).remove();
    }
  });

  //Adds all rituals with a basic rank or higher to the list
  $.each($('.mentalSkills'), function(idx, skill) {
    if ($(skill).val() >= 2) {
      var skillName = $(skill).prop('id').replace('SkillRank','');
      //console.log("skillName: " + skillName);
      skills.push(skillName);
    }
  });

  //If list of exploits is greater than 0, populates the list. 
  if (skills.length > 0) {

    $("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
    var jsonSkills = JSON.stringify(skills);
    var existingRitualFound = false;
    $.post("characterAPI2.php?ritualList", { skills: jsonSkills }, function(result) {
      $.each(result.ritualList, function(idx, ritual) {
        //Check selected option to be the same option as before as old one is getting deleted to prevent redundancy 
        if (existingRitualID == ritual.ritualID){
          $("#" + menuID).append("<option value='" + ritual.ritualID + "' selected >" + ritual.name + "</option>");
          populateRitualInfo(menuID);

          existingRitualFound = true;
          //console.log("populateExploitMenu: existing exploit equaled exploitID");
        } else {
          $("#" + menuID).append("<option value='" + ritual.ritualID + "'>" + ritual.name + "</option>");
          //console.log("populateExploitMenu: existing exploit did not equal exploitID");
        }
      });
    }, 'json');
    
    if (existingRitualFound == false) {
      //$("#" + menuID + "Keywords").empty();
      $("#" + menuID + "Description").empty();
    }
    $("#deleteMe").remove();
   }
   else {
     $("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
     //$("#" + menuID + "Keywords").empty();
     $("#" + menuID + "Description").empty();
  }
}
*/

/*
function populateTalentMenu(menuID) {
  var skills = [];
  var existingTalentID = $("#" + menuID).val();
    //console.log("populateTalentMenu existingTalentID: " + existingTalentID);
    //console.log("menuID: " + menuID);
   
  $("#" + menuID + " option").each(function(idx, option){
    if ($(option).val() == existingTalentID) {
      $(option).prop("id", "deleteMe");
    }
    else {
      $(option).remove();
    }
  });

  $.each($('.nonAttackSkills'), function(idx, skill) {
    if ($(skill).val() >= 2) {
      var skillName = $(skill).prop('id').replace('SkillRank','');
      //console.log(skillName + " is added")
      skills.push(skillName);
    }
  });

  if (skills.length > 0) {
    $("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
    var jsonSkills = JSON.stringify(skills);
    var existingTalentFound = false;
    $.post("characterAPI2.php?talentsList", { skills: jsonSkills }, function(result) {
      $.each(result.talentList, function(idx, talent) {
        if (existingTalentID == talent.talentID){
          $("#" + menuID).append("<option value='" + talent.talentID + "' selected >" + talent.name + "</option>");
        populateTalentInfo(menuID);
        existingTalentFound = true;
        //console.log("populateTalentMenu: existing talent equaled talentID");
        } else {
        $("#" + menuID).append("<option value='" + talent.talentID + "'>" + talent.name + "</option>");
        //console.log("populateTalentMenu: existing talent did not equal talentID");
        }
      });
    }, 'json');
    if (existingTalentFound == false) {
      $("#" + menuID + "Description").empty();
    }
    $("#deleteMe").remove();
  }
  else {
    $("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
    $("#" + menuID + "Description").empty();
  }
}


function populateTalentInfo(menuID) {
  //console.log("populateTalentInfo MenuID: " + menuID);
  if (menuID == "all") {
    $.each($(".talentSelector"), function(idx, talentInfoSelector) {
    //add the process of changing talent info and detokenize
    });
  } else {
      var talentID = $("#" + menuID).val();
      var talentName = $("#" + menuID + " option:selected").text();
      //console.log("populateTalentInfo talentName & ID: " + talentName + ", " + talentID);
      if (talentID != "None") {
        $.post("characterAPI2.php?talentInfo", { talentInfoName : talentName }, function(talent) {
          description = deTokenize(talent.description);
          $("#" + menuID + "Description").html(description);
          //add area for applying classes second table which has talent info
        }, 'json');
    }
    else {
      $("#" + menuID + "Description").empty();
    }
  }
  setAttPoints();
}
*/