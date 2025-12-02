function attPriority(attribute, event) {
	if (attribute == 'primary') {
		var val = $("#primaryAtt").val();
		if ($("#secondaryAtt").val() == val) {
			$("#secondaryAtt").val("");
		}
		if ($("#tertiaryAtt").val() == val) {
			$("#tertiaryAtt").val("");
		}
	} else if (attribute == 'secondary') {
		var val = $("#secondaryAtt").val();
		if ($("#primaryAtt").val() == val) {
			$("#primaryAtt").val("");
		}
		if ($("#tertiaryAtt").val() == val) {
			$("#tertiaryAtt").val("");
		}
	} else if (attribute == 'tertiary') {
		var val = $("#tertiaryAtt").val();
		if ($("#primaryAtt").val() == val) {
			$("#primaryAtt").val("");
		}
		if ($("#secondaryAtt").val() == val) {
			$("#secondaryAtt").val("");
		}
	}
	setAttPoints(event);
}

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

	console.log("level value: " + level);

	$("#bodyValue").html(body);
	$("#strikeDamage").html("W+" + body);
	$("#strikeBonus").html(body);
	
	$("#mindValue").html(mind);
	$("#blastDamage").html(mind);
	$("#blastBonus").html(mind);

	$("#spiritValue").html(spirit);
	$("#scoldDamage").html(spirit);
	$("#scoldBonus").html(spirit);

	var primary = $("#primaryAtt").val();
	if (primary == "") {
		var priPoints = "0";
	} else {
		var priPoints = Math.floor(5 + (level + 1) / 3);
		if (primary == "body") {
			priPoints = priPoints - might - agility - brawn;
			body = 3;

			if(level >= 2){
				body = 4;
			}
			if(level >= 8){
				body = 5;
			}

		$("#bodyValue").html(body);
		$("#strikeDamage").html("W+" + body);
		$("#strikeBonus").html(body);
		}

		if (primary == "mind") {
			priPoints = priPoints - will - wit - resolve;
			mind = 3;

			if(level >= 2){
				mind = 4;
			}
			if(level >= 8){
				mind = 5;
			}

		$("#mindValue").html(mind);
		$("#blastDamage").html(mind);
		$("#blastBonus").html(mind);
		}

		if (primary == "spirit") {
			priPoints = priPoints - vigor - empathy - faith;
			spirit = 3;

			if(level >= 2){
				spirit = 4;
			}
			if(level >= 8){
				spirit = 5;
			}
		$("#spiritValue").html(spirit);
		$("#scoldDamage").html(spirit);
		$("#scoldBonus").html(spirit);
		}
	}
	$("#" + primary + "Remaining").html(priPoints);

	var secondary = $("#secondaryAtt").val();
	if (secondary == "") {
		var secPoints = "0";
	} else {
		var secPoints = Math.floor(4 + level / 3);
		if (secondary == "body") {
			secPoints = secPoints - might - agility - brawn;
			body = 3;

			if(level >= 6 ){
				body = 4;
			}

		$("#bodyValue").html(body);
		$("#strikeDamage").html("W+" + body);
		$("#strikeBonus").html(body);
		}
		if (secondary == "mind") {
			secPoints = secPoints - will - wit - resolve; 
			mind = 3; 

			if(level >= 6 ){
				mind = 4;
			}
		$("#mindValue").html(mind);
		$("#blastDamage").html(mind);
		$("#blastBonus").html(mind);
		}
		if (secondary == "spirit") {
			secPoints = secPoints - vigor - empathy - faith;
			spirit = 3;

			if(level >= 6 ){
				spirit = 4;
			}
		}
		$("#spiritValue").html(spirit);
		$("#scoldDamage").html(spirit);
		$("#scoldBonus").html(spirit);
	}
	$("#" + secondary + "Remaining").html(secPoints);

	var tertiary = $("#tertiaryAtt").val();
	if (tertiary == "") {
		var terPoints = "0";
	} else {
		var terPoints = Math.floor(3 + (level - 1) / 3);
		if (tertiary == "body") {
			terPoints = terPoints - might - agility - brawn;
			body = 2;

			if(level >= 4){
				body = 3;
			}
			if(level >= 10){
				body = 4;
			}
		$("#bodyValue").html(body);
		$("#strikeDamage").html("W+" + body);
		$("#strikeBonus").html(body);
		}
		if (tertiary == "mind") {
			terPoints = terPoints - will - wit - resolve;
			mind = 2;

			if(level >= 4){
				mind = 3;
			}
			if(level >= 10){
				mind = 4;
			}
		$("#mindValue").html(mind);
		$("#blastDamage").html(mind);
		$("#blastBonus").html(mind);
		}
		if (tertiary == "spirit") {
			terPoints = terPoints - vigor - empathy - faith;
			spirit = 2;
			if(level >= 4){
				spirit = 3;
			}
			if(level >= 10){
				spirit = 4;
			}
		}
		$("#spiritValue").html(spirit);
		$("#scoldDamage").html(spirit);
		$("#scoldBonus").html(spirit);
	}
	$("#" + tertiary + "Remaining").html(terPoints);

	if (primary != "body" && secondary != "body" && tertiary != "body") {
		$("#bodyRemaining").html("UA");
	}
	if (primary != "mind" && secondary != "mind" && tertiary != "mind") {
		$("#mindRemaining").html("UA");
	}
	if (primary != "spirit" && secondary != "spirit" && tertiary != "spirit") {
		$("#spiritRemaining").html("UA");
	}

	var guard = Math.max(body,mind,spirit) + 7
	var dead = -10 + (level -1) * -2;
	var desperate = 10 + (level-1) * 2;
	var marred = 10 + desperate + (level -1) * 2;
	var hp = 10 + marred + (level -1) * 2;
	var initiative = agility + wit + empathy;
	var converstion = Math.floor((might + will + vigor)/3) + 3;
	var initialMomentum = Math.floor((agility + wit + empathy)/3) + 3;
	var recovery = Math.floor((brawn + resolve + faith)/3);
	var sum = body + mind + spirit;

	$("#guardValue").html(guard);
	$("#initValue").html(initiative);
	$("#hpValue").html(hp);		
	$("#marredValue").html(marred);
	$("#desperateValue").html(desperate);
	$("#deadValue").html(dead);
	$("#recoveryValue").html(recovery);
	$("#converstionValue").html(converstion);
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

	var modifiedAtt = $(e.target).prop('id');
	var modifiedVal = $("#" + modifiedAtt).val();
	var attBaseName = modifiedAtt.replace('Value','');

	if ($(eval("skillTree." + attBaseName)).length == 0){

	} else {
		$.each(eval("skillTree." + attBaseName), function(idx, skill) {
			$("#" + skill + "SkillBonus").html(modifiedVal);
			$("#" + skill + "SkillPassive").html(parseInt(modifiedVal) + 2 + parseInt($("#" + skill + "SkillRank").val()));
		});	
	}
}



		function skillValues (e) {
			var modifiedSkill = $(e.target).prop('id');
			var modifiedVal = $("#" + modifiedSkill).val();
			var skillBaseName = modifiedSkill.replace('SkillRank','');
			$.each(skillTree, function(attidx, attribute) {
				$.each(attribute, function(skillidx, skill) {
					if (skill == skillBaseName) {
						var attVal = $("#" + attidx + "Value").val();
						$("#" + skill + "SkillPassive").html(parseInt(attVal) + 2 + parseInt(modifiedVal));
					}
				});
			});
			populateTalentDesc(modifiedSkill);
			populateAllTalentMenus();
			populateNonAtkManDesc(modifiedSkill);
			populateAllNonAtkManMenus();
			populateAtkManDesc(modifiedSkill);
			populateAllAtkManMenus();
			populateExploitDesc(modifiedSkill);
			populateAllExploitMenus();

		}

		function populateTalentMenu(menuID) {
			var skills = [];
			var existingTalentID = $("#" + menuID).val();
			//console.log("populateTalentMenu existingTalentID: " + existingTalentID);
			$("#" + menuID + " option").each(function(idx, option){
				if ($(option).val() == existingTalentID) {
					$(option).prop("id", "deleteMe");
				}

				else {
					$(option).remove();
				}
			});

			$.each($('.validSkills'), function(idx, skill) {
				if ($(skill).val() >= 2) {
					var skillName = $(skill).prop('id').replace('SkillRank','');
					skills.push(skillName);
				}
			});

			if (skills.length > 0) {
				$("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
				var jsonSkills = JSON.stringify(skills);
				var existingTalentFound = false;
				$.post("characterAPI2.php?talentsList", { skills: jsonSkills }, function(result) {
					$.each(result.talentList, function(idx, talent) {
						if (talent.keyword.indexOf("Physical") != -1) {
							var className = "physicalTalent";
						}
						else if (talent.keyword.indexOf("Mental") != -1) {
							var className = "mentalTalent";
						}
						else if (talent.keyword.indexOf("Social") != -1) {
							var className = "socialTalent";
						}
						if (existingTalentID == talent.talentID){
							$("#" + menuID).append("<option value='" + talent.talentID + "' selected class='" + className + "'>" + talent.name + "</option>");
							populateTalentInfo(menuID);

							existingTalentFound = true;
							//console.log("populateTalentMenu: existing talent equaled talentID");
						} else {
							$("#" + menuID).append("<option value='" + talent.talentID + "' class='" + className + "'>" + talent.name + "</option>");
							//console.log("populateTalentMenu: existing talent did not equal talentID");
						}
					});
				}, 'json');
				if (existingTalentFound == false) {
					$("#" + menuID + "Keywords").empty();
					$("#" + menuID + "Description").empty();
					$("#" + menuID).removeClass("physicalTalent mentalTalent socialTalent");
				}
				$("#deleteMe").remove();
			}
			else {
				$("#" + menuID).empty().removeClass("physicalTalent mentalTalent socialTalent");
				$("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
				$("#" + menuID + "Keywords").empty();
				$("#" + menuID + "Description").empty();
			}


		}

		function populateAllTalentMenus(){
			$.each($('.talentSelector'), function(idx, talentMenu){
				var menuID = $(talentMenu).prop("id");
				populateTalentMenu(menuID);
			});
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
				$("#" + menuID).removeClass("physicalTalent mentalTalent socialTalent");
				$("." + menuID).removeClass("physicalTalent mentalTalent socialTalent");
				if (talentID != "None") {
					$.post("characterAPI2.php?talentInfo", { talentInfoName : talentName }, function(talent) {
						description = deTokenize(talent.description);
						$("#" + menuID + "Keywords").text(talent.keyword);
						$("#" + menuID + "Description").html(description);
						if (talent.keyword.indexOf("Physical") != -1) {
							$("#" + menuID).addClass("physicalTalent");
							$("." + menuID).addClass("physicalTalent");
						}
						else if (talent.keyword.indexOf("Mental") != -1) {
							$("#" + menuID).addClass("mentalTalent");
							$("." + menuID).addClass("mentalTalent");
						}
						else if (talent.keyword.indexOf("Social") != -1) {
							$("#" + menuID).addClass("socialTalent");
							$("." + menuID).addClass("socialTalent");
						}
						//add area for applying classes second table which has talent info
					}, 'json');
				}
				else {
					$("#" + menuID + "Keywords").empty();
					$("#" + menuID + "Description").empty();
				}
			}
		}

		function populateTalentDesc (modifiedSkill){
			//console.log("populateTalentDesc modifiedSkill: " + modifiedSkill);
			modifiedSkill = modifiedSkill.replace('SkillRank', '');
			var skills = [];
			skills.push(modifiedSkill);
			var jsonSkills = JSON.stringify(skills);
			$.post("characterAPI2.php?talentsList", { skills: jsonSkills }, function(result) {
				//console.log(result);
				$.each(result.talentList, function(idx, talent) {
					//console.log("populateTalentDesc skillName: " + talent.skillName);
					if (modifiedSkill == talent.skillName) {
						$(".talentSelector").each(function(i, selector){
							var thisID = $(selector).prop("id");
							var thisVal = $("#" + thisID + " option:selected").val();
							if (thisVal == talent.talentID){
								description = deTokenize(talent.description);
								$("#" + thisID + "Description").text(description);
							}
						});

					}
				});
			}, 'json');

		}

		function deTokenize(description) {
			if (description.indexOf("|") == -1 && description.indexOf("[") == -1) {
				//console.log("exiting detokenize due to lack of indecies")
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
			//console.log("deTokenize returning: " + description);
			return description;
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

			$.each($('.validSkills'), function(idx, skill) {
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
						if (nonAtkMan.keyword.indexOf("Physical") != -1) {
							var className = "physicalNonAtkMan";
						}
						else if (nonAtkMan.keyword.indexOf("Mental") != -1) {
							var className = "mentalNonAtkMan";
						}
						else if (nonAtkMan.keyword.indexOf("Social") != -1) {
							var className = "socialNonAtkMan";
						}
						if (existingNonAtkManID == nonAtkMan.nonAtkManID){
							$("#" + menuID).append("<option value='" + nonAtkMan.nonAtkManID + "' selected class='" + className + "'>" + nonAtkMan.name + "</option>");
							populateNonAtkManInfo(menuID);

							existingNonAtkManFound = true;
							//console.log("populateNonAtkManMenu: existing nonAtkMan equaled nonAtkManID");
						} else {
							$("#" + menuID).append("<option value='" + nonAtkMan.nonAtkManID + "' class='" + className + "'>" + nonAtkMan.name + "</option>");
							//console.log("populateNonAtkManMenu: existing nonAtkMan did not equal nonAtkManID");
						}
					});
				}, 'json');
				if (existingNonAtkManFound == false) {
					$("#" + menuID + "Keywords").empty();
					$("#" + menuID + "Cost").empty();
					$("#" + menuID + "Action").empty();
					$("#" + menuID + "Trigger").empty();
					$("#" + menuID + "Effect").empty();
					$("#" + menuID).removeClass("physicalNonAtkMan mentalNonAtkMan socialNonAtkMan");
				}
				$("#deleteMe").remove();
			}
			else {
				$("#" + menuID).empty().removeClass("physicalNonAtkMan mentalNonAtkMan socialNonAtkMan");
				$("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
				$("#" + menuID + "Keywords").empty();
				$("#" + menuID + "Cost").empty();
				$("#" + menuID + "Action").empty();
				$("#" + menuID + "Trigger").empty();
				$("#" + menuID + "Effect").empty();
			}


		}

		function populateAllNonAtkManMenus(){
			$.each($('.nonAtkManSelector'), function(idx, nonAtkManMenu){
				var menuID = $(nonAtkManMenu).prop("id");
				populateNonAtkManMenu(menuID);
			});
		}

		function populateNonAtkManInfo(menuID) {
			//console.log("populateNonAtkManInfo MenuID: " + menuID);
			if (menuID == "all") {
				$.each($(".nonAtkManSelector"), function(idx, nonAtkManInfoSelector) {
					//add the process of changing nonAtkMan info and detokenize
				});
			} else {
				var nonAtkManID = $("#" + menuID).val();
				var nonAtkManName = $("#" + menuID + " option:selected").text();
				//console.log("populateNonAtkManInfo nonAtkManName & ID: " + nonAtkManName + ", " + nonAtkManID);
				$("#" + menuID).removeClass("physicalNonAtkMan mentalNonAtkMan socialNonAtkMan");
				$("." + menuID).removeClass("physicalNonAtkMan mentalNonAtkMan socialNonAtkMan");
				if (nonAtkManID != "None") {
					$.post("characterAPI2.php?nonAtkManInfo", { nonAtkManInfoName : nonAtkManName }, function(nonAtkMan) {
						cost = deTokenize(nonAtkMan.cost);
						description = deTokenize(nonAtkMan.effect);
						$("#" + menuID + "Keywords").text(nonAtkMan.keyword);
						$("#" + menuID + "Cost").text(cost);
						$("#" + menuID + "Action").text(nonAtkMan.action);
						$("#" + menuID + "Trigger").html(nonAtkMan.trigger);
						$("#" + menuID + "Effect").html(description);
						if (nonAtkMan.keyword.indexOf("Physical") != -1) {
							$("#" + menuID).addClass("physicalNonAtkMan");
							$("." + menuID).addClass("physicalNonAtkMan");
						}
						else if (nonAtkMan.keyword.indexOf("Mental") != -1) {
							$("#" + menuID).addClass("mentalNonAtkMan");
							$("." + menuID).addClass("mentalNonAtkMan");
						}
						else if (nonAtkMan.keyword.indexOf("Social") != -1) {
							$("#" + menuID).addClass("socialNonAtkMan");
							$("." + menuID).addClass("socialNonAtkMan");
						}
						//add area for applying classes second table which has nonAtkMan info
					}, 'json');
				}
				else {
					$("#" + menuID + "Keywords").empty();
					$("#" + menuID + "Cost").empty();
					$("#" + menuID + "Action").empty();
					$("#" + menuID + "Trigger").empty();
					$("#" + menuID + "Effect").empty();
				}
			}
		}

		function populateNonAtkManDesc (modifiedSkill){
			//console.log("populateNonAtkManDesc modifiedSkill: " + modifiedSkill);
			modifiedSkill = modifiedSkill.replace('SkillRank', '');
			var skills = [];
			skills.push(modifiedSkill);
			var jsonSkills = JSON.stringify(skills);
			$.post("characterAPI2.php?nonAtkManList", { skills: jsonSkills }, function(result) {
				//console.log(result);
				$.each(result.nonAtkManList, function(idx, nonAtkMan) {
					//console.log("populateNonAtkManDesc skillName: " + nonAtkMan.skillName);
					if (modifiedSkill == nonAtkMan.skillName) {
						$(".nonAtkManSelector").each(function(i, selector){
							var thisID = $(selector).prop("id");
							var thisVal = $("#" + thisID + " option:selected").val();
							if (thisVal == nonAtkMan.nonAtkManID){
								cost = deTokenize(nonAtkMan.cost);
								$("#" + thisID + "Cost").text(cost);
							}
						});

					}
				});
			}, 'json');

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

			$.each($('.validSkills'), function(idx, skill) {
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
						if (atkMan.keyword.indexOf("Physical") != -1) {
							var className = "physicalAtkMan";
						}
						else if (atkMan.keyword.indexOf("Mental") != -1) {
							var className = "mentalAtkMan";
						}
						else if (atkMan.keyword.indexOf("Social") != -1) {
							var className = "socialAtkMan";
						}
						if (existingAtkManID == atkMan.atkManID){
							$("#" + menuID).append("<option value='" + atkMan.atkManID + "' selected class='" + className + "'>" + atkMan.name + "</option>");
							populateAtkManInfo(menuID);

							existingAtkManFound = true;
							//console.log("populateAtkManMenu: existing atkMan equaled atkManID");
						} else {
							$("#" + menuID).append("<option value='" + atkMan.atkManID + "' class='" + className + "'>" + atkMan.name + "</option>");
							//console.log("populateAtkManMenu: existing atkMan did not equal atkManID");
						}
					});
				}, 'json');
				if (existingAtkManFound == false) {
					$("#" + menuID + "Keywords").empty();
					$("#" + menuID + "Cost").empty();
					$("#" + menuID + "Action").empty();
					$("#" + menuID + "EffectSm").empty();
					$("#" + menuID + "EffectBg").empty();
					$("#" + menuID).removeClass("physicalAtkMan mentalAtkMan socialAtkMan");
				}
				$("#deleteMe").remove();
			}
			else {
				$("#" + menuID).empty().removeClass("physicalAtkMan mentalAtkMan socialAtkMan");
				$("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
				$("#" + menuID + "Keywords").empty();
				$("#" + menuID + "Cost").empty();
				$("#" + menuID + "Action").empty();
				$("#" + menuID + "EffectSm").empty();
				$("#" + menuID + "EffectBg").empty();
			}


		}

		function populateAllAtkManMenus(){
			$.each($('.atkManSelector'), function(idx, atkManMenu){
				var menuID = $(atkManMenu).prop("id");
				populateAtkManMenu(menuID);
			});
		}

		function populateAtkManInfo(menuID) {
			//console.log("populateAtkManInfo MenuID: " + menuID);
			if (menuID == "all") {
				$.each($(".atkManSelector"), function(idx, atkManInfoSelector) {
					//add the process of changing atkMan info and detokenize
				});
			} else {
				var atkManID = $("#" + menuID).val();
				var atkManName = $("#" + menuID + " option:selected").text();
				//console.log("populateAtkManInfo atkManName & ID: " + atkManName + ", " + atkManID);
				$("#" + menuID).removeClass("physicalAtkMan mentalAtkMan socialAtkMan");
				$("." + menuID).removeClass("physicalAtkMan mentalAtkMan socialAtkMan");
				if (atkManID != "None") {
					$.post("characterAPI2.php?atkManInfo", { atkManInfoName : atkManName }, function(atkMan) {
						cost = deTokenize(atkMan.cost);
						descriptionSm = deTokenize(atkMan.effectSm);
						descriptionBg = deTokenize(atkMan.effectBg);
						descriptionConditional = deTokenize(atkMan.conditional);
						$("#" + menuID + "Keywords").text(atkMan.keyword);
						$("#" + menuID + "Cost").text(cost);
						$("#" + menuID + "Action").text(atkMan.action);
						$("#" + menuID + "EffectSm").html(descriptionSm);
						$("#" + menuID + "EffectBg").html(descriptionBg);
						$("#" + menuID + "Conditional").html(descriptionConditional);
						if (atkMan.keyword.indexOf("Physical") != -1) {
							$("#" + menuID).addClass("physicalAtkMan");
							$("." + menuID).addClass("physicalAtkMan");
						}
						else if (atkMan.keyword.indexOf("Mental") != -1) {
							$("#" + menuID).addClass("mentalAtkMan");
							$("." + menuID).addClass("mentalAtkMan");
						}
						else if (atkMan.keyword.indexOf("Social") != -1) {
							$("#" + menuID).addClass("socialAtkMan");
							$("." + menuID).addClass("socialAtkMan");
						}
						//add area for applying classes second table which has atkMan info
					}, 'json');
				}
				else {
					$("#" + menuID + "Keywords").empty();
					$("#" + menuID + "Cost").empty();
					$("#" + menuID + "Action").empty();
					$("#" + menuID + "EffectSm").empty();
					$("#" + menuID + "EffectBg").empty();
					$("#" + menuID + "Conditional").empty();
				}
			}
		}

		function populateAtkManDesc (modifiedSkill){
			//console.log("populateAtkManDesc modifiedSkill: " + modifiedSkill);
			modifiedSkill = modifiedSkill.replace('SkillRank', '');
			var skills = [];
			skills.push(modifiedSkill);
			var jsonSkills = JSON.stringify(skills);
			$.post("characterAPI2.php?atkManList", { skills: jsonSkills }, function(result) {
				//console.log(result);
				$.each(result.atkManList, function(idx, atkMan) {
					//console.log("populateAtkManDesc skillName: " + atkMan.skillName);
					if (modifiedSkill == atkMan.skillName) {
						$(".atkManSelector").each(function(i, selector){
							var thisID = $(selector).prop("id");
							var thisVal = $("#" + thisID + " option:selected").val();
							if (thisVal == atkMan.atkManID){
								cost = deTokenize(atkMan.cost);
								$("#" + thisID + "Cost").text(cost);
							}
						});

					}
				});
			}, 'json');

		}

		function populateExploitMenu(menuID) {
			var skills = [];
			var existingExploitID = $("#" + menuID).val();
			//console.log("populateExploitMenu existingExploitID: " + existingExploitID);
			$("#" + menuID + " option").each(function(idx, option){
				if ($(option).val() == existingExploitID) {
					$(option).prop("id", "deleteMe");
				}

				else {
					$(option).remove();
				}
			});

			$.each($('.validSkills'), function(idx, skill) {
				if ($(skill).val() >= 2) {
					var skillName = $(skill).prop('id').replace('SkillRank','');
					skills.push(skillName);
				}
			});

			if (skills.length > 0) {
				$("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
				var jsonSkills = JSON.stringify(skills);
				var existingExploitFound = false;
				$.post("characterAPI2.php?exploitList", { skills: jsonSkills }, function(result) {
					$.each(result.exploitList, function(idx, exploit) {
						if (exploit.keyword.indexOf("Physical") != -1) {
							var className = "physicalExploit";
						}
						else if (exploit.keyword.indexOf("Mental") != -1) {
							var className = "mentalExploit";
						}
						else if (exploit.keyword.indexOf("Social") != -1) {
							var className = "socialExploit";
						}
						if (existingExploitID == exploit.exploitID){
							$("#" + menuID).append("<option value='" + exploit.exploitID + "' selected class='" + className + "'>" + exploit.name + "</option>");
							populateExploitInfo(menuID);

							existingExploitFound = true;
							//console.log("populateExploitMenu: existing exploit equaled exploitID");
						} else {
							$("#" + menuID).append("<option value='" + exploit.exploitID + "' class='" + className + "'>" + exploit.name + "</option>");
							//console.log("populateExploitMenu: existing exploit did not equal exploitID");
						}
					});
				}, 'json');
				if (existingExploitFound == false) {
					$("#" + menuID + "Keywords").empty();
					$("#" + menuID + "Descreption").empty();
					$("#" + menuID).removeClass("physicalExploit mentalExploit socialExploit");
				}
				$("#deleteMe").remove();
			}
			else {
				$("#" + menuID).empty().removeClass("physicalExploit mentalExploit socialExploit");
				$("#" + menuID).append("<option value='None' style='background-color: white;'></option>");
				$("#" + menuID + "Keywords").empty();
				$("#" + menuID + "Description").empty();
			}
		}

		function populateAllExploitMenus(){
			$.each($('.exploitSelector'), function(idx, exploitMenu){
				var menuID = $(exploitMenu).prop("id");
				populateExploitMenu(menuID);
			});
		}

		function populateExploitInfo(menuID) {
			//console.log("populateExploitInfo MenuID: " + menuID);
			if (menuID == "all") {
				$.each($(".exploitSelector"), function(idx, exploitInfoSelector) {
					//add the process of changing exploit info and detokenize
				});
			} else {
				var exploitID = $("#" + menuID).val();
				var exploitName = $("#" + menuID + " option:selected").text();
				//console.log("populateExploitInfo exploitName & ID: " + exploitName + ", " + exploitID);
				$("#" + menuID).removeClass("physicalExploit mentalExploit socialExploit");
				$("." + menuID).removeClass("physicalExploit mentalExploit socialExploit");
				if (exploitID != "None") {
					$.post("characterAPI2.php?exploitInfo", { exploitInfoName : exploitName }, function(exploit) {
						description = deTokenize(exploit.description);
						$("#" + menuID + "Keywords").text(exploit.keyword);
						$("#" + menuID + "Description").html(description);
						if (exploit.keyword.indexOf("Physical") != -1) {
							$("#" + menuID).addClass("physicalExploit");
							$("." + menuID).addClass("physicalExploit");
						}
						else if (exploit.keyword.indexOf("Mental") != -1) {
							$("#" + menuID).addClass("mentalExploit");
							$("." + menuID).addClass("mentalExploit");
						}
						else if (exploit.keyword.indexOf("Social") != -1) {
							$("#" + menuID).addClass("socialExploit");
							$("." + menuID).addClass("socialExploit");
						}
					}, 'json');
				}
				else {
					$("#" + menuID + "Keywords").empty();
					$("#" + menuID + "Description").empty();
				}
			}
		}

		function populateExploitDesc (modifiedSkill){
			console.log("populateExploitDesc modifiedSkill: " + modifiedSkill);
			modifiedSkill = modifiedSkill.replace('SkillRank', '');
			var skills = [];
			skills.push(modifiedSkill);
			var jsonSkills = JSON.stringify(skills);
			console.log("populateExploitDesc skills: " + skills);
			console.log("populateExploitDesc jsonSkills: " + jsonSkills);
			$.post("characterAPI2.php?exploitList", { skills: jsonSkills }, function(result) {
				$.each(result.exploitList, function(idx, exploit) {
					console.log("populateExploitDesc skillName: " + exploit.skillName);
					if (modifiedSkill == exploit.skillName) {
						$(".exploitSelector").each(function(i, selector){
							var thisID = $(selector).prop("id");
							var thisVal = $("#" + thisID + " option:selected").val();
							if (thisVal == exploit.exploitID){
								console.log("populateExploitDesc: " + exploit.description);
								description = deTokenize(exploit.description);
								$("#" + thisID + "Description").html(description);
							}
						});

					}
				});
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
				$("#rTalentName").removeClass("physicalTalent mentalTalent socialTalent");
				$("#rManName").removeClass("physicalNonAtkMan mentalNonAtkMan socialNonAtkMan");
				$(".charinfo").removeClass("bodyColor mindColor spiritColor");
				$("#rTalentName").empty();
				$("#rTalentKeywords").empty();
				$("#rTalentDesc").empty();
				$("#rManName").empty();
				$("#rManKeywords").empty();
				$("#rManCost").empty();
				$("#rManAction").empty();
				$("#rManEffect").empty();
				$("#rManEffect2").empty();

			}else{
				$.post("characterAPI2.php?roleInfo", { roleSelectedName : roleSelected }, function(result) {
					$("#rTalentName").html(result.rTalentName);
					$("#rTalentKeywords").html(result.rTalentKeywords);
					$("#rTalentDesc").html(result.rTalentDesc);
					console.log(result.rTalentKeywords);
					$("#rManName").html(result.rManName);
					$("#rManKeywords").html(result.rManKeywords);
					$("#rManCost").html(result.rManCost);
					$("#rManAction").html(result.rManAction);
					$("#rManEffect").html(result.rManEffect);
					$("#rManEffect2").html(result.rManEffect2);
					console.log(result.rManKeywords);
					if (result.rTalentKeywords.indexOf("Physical") != -1) {
						$("#rTalentName").removeClass("physicalTalent mentalTalent socialTalent");
						$("#rTalentName").addClass("physicalTalent");
						$(".charInfo").removeClass("bodyColor mindColor spiritColor");
						$(".charInfo").addClass("bodyColor");
					}
					else if (result.rTalentKeywords.indexOf("Mental") != -1) {
						$("#rTalentName").removeClass("physicalTalent mentalTalent socialTalent");			
						$("#rTalentName").addClass("mentalTalent");
						$(".charInfo").removeClass("bodyColor mindColor spiritColor");
						$(".charInfo").addClass("mindColor");
					}
					else if (result.rTalentKeywords.indexOf("Social") != -1) {
						$("#rTalentName").removeClass("physicalTalent mentalTalent socialTalent");	
						$("#rTalentName").addClass("socialTalent");
						$(".charInfo").removeClass("bodyColor mindColor spiritColor");
						$(".charInfo").addClass("spiritColor");
					}
					if (result.rManKeywords.indexOf("Physical") != -1) {
						$("#rManName").removeClass("physicalNonAtkMan mentalNonAtkMan socialNonAtkMan");
						$("#rManName").addClass("physicalNonAtkMan");
					}
					else if (result.rManKeywords.indexOf("Mental") != -1) {
						$("#rManName").removeClass("physicalNonAtkMan mentalNonAtkMan socialNonAtkMan");
						$("#rManName").addClass("mentalNonAtkMan");
					}
					else if (result.rManKeywords.indexOf("Social") != -1) {
						$("#rManName").removeClass("physicalNonAtkMan mentalNonAtkMan socialNonAtkMan");
						$("#rManName").addClass("socialNonAtkMan");
					}
				}, 'json');
			}
		}

function proficiencyValues (e) {
  var modifiedAtkSkill = $(e.target).prop('id');
  var modifiedAtkVal = $("#" + modifiedAtkSkill).val();
  var atkSkillName = modifiedAtkSkill.replace('SkillRank','');
  console.log("proficiencyValues, modifiedAtkVal: " + modifiedAtkVal);
  console.log("proficiencyValues, atkSkillName: " + atkSkillName);
  console.log("proficiencyValues, modifiedAtkSkill: " + modifiedAtkSkill);

$("." + atkSkillName + "ProfSelector").hide();

if (modifiedAtkSkill == "scoldSkillRank") {
modifiedAtkVal -= 2;
}

if (modifiedAtkSkill == "blastSkillRank") {
modifiedAtkVal -= 1;
}

for(var x = 1 ; x <= modifiedAtkVal ; x++){
//console.log("proficiencyValues: #" + atkSkillName + "ProfSelector" + x);
$("#" + atkSkillName + "ProfSelector" + x).show();
}
$("#" + atkSkillName + "ProficiencyAmount").html(parseInt(modifiedAtkVal));
proficiencyListManagement(atkSkillName);
}

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

		function talentAmount(e){
			var talentAmount = $(e.target).val();

			var tables = [];
			for (x = talentAmount; x > 0; x--){
				//console.log($("#talentTable" + x).length);
				//console.log($("#talentTable" + x));
				if($("#talentTable" + x).length == 0){
					//console.log("am I being hit: " + x);
					tables[x] = $("<table id='talentTable" + x + "' class='abilityTable'><tr><td class='talent" + x + "'><select id='talent" + x + "' onchange='populateTalentInfo(\"talent" + x + "\")' class='talentSelector'><option value='None'></option></select></td></tr><tr><td id='talent" + x + "Keywords'></td></tr><tr><td id='talent" + x + "Description'></td></tr></table>");
				}
				else{
					tables[x] = $("#talentTable" + x);	
					//console.log("hit me?: " + x);
				}
			}
			$("#talentWrapper").empty();
			for (x = talentAmount; x > 0; x--){
				//console.log(x);
				$("#talentWrapper").prepend(tables[x]);
			}
			$("#talentWrapper").prepend("<div class='divHeader'>Talents <select id='talentAmount' onchange='talentAmount(event); skillValues(event); setAbilityAmount(event);'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select></div>");
			$("#talentAmount").val(talentAmount);
		}

		function nonAtkManAmount(e){
			var nonAtkManAmount = $(e.target).val();

			var tables = [];
			for (x = nonAtkManAmount; x > 0; x--){
				if($("#nonAtkManTable" + x).length == 0){
				//console.log("am I being hit: " + x);	
					tables[x] = $("<table id='nonAtkManTable" + x + "' class='abilityTable'><tr><td class='nonAtkMan" + x + "'><select id='nonAtkMan" + x + "' onchange='populateNonAtkManInfo(\"nonAtkMan" + x + "\")' class='nonAtkManSelector'><option value='None'></option></select></td></tr><tr><td id='nonAtkMan" + x + "Keywords'></td></tr><tr><td id='nonAtkMan" + x + "Cost'></td></tr><tr><td id='nonAtkMan" + x + "Action'></td></tr><tr><td id='nonAtkMan" + x + "Trigger'></td></tr><tr><td id='nonAtkMan" + x + "Effect'></td></tr></table>");
				}
				else{
					tables[x] = $("#nonAtkManTable" + x);	
					//console.log("hit me?: " + x);
				}
			}
			$("#nonAtkManWrapper").empty();
			for (x = nonAtkManAmount; x > 0; x--){
				$("#nonAtkManWrapper").prepend(tables[x]);
			}
			$("#nonAtkManWrapper").prepend("<div class='divHeader'>Non-Attack Maneuvers <select id='nonAtkManAmount' onchange='nonAtkManAmount(event); skillValues(event); setAbilityAmount(event);'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select></div>");
			$("#nonAtkManAmount").val(nonAtkManAmount);
		}

		function atkManAmount(e){
			var atkManAmount = $(e.target).val();

			var tables = [];
			for (x = atkManAmount; x > 0; x--){
				if($("#atkManTable" + x).length == 0){
				//console.log("am I being hit: " + x);	
					tables[x] = $("<table id='atkManTable" + x + "' class='abilityTable'><tr><td class='atkMan" + x + "'><select id='atkMan" + x + "' onchange='populateAtkManInfo(\"atkMan" + x + "\")' class='atkManSelector'><option value='None'></option></select></td></tr><tr><td id='atkMan" + x + "Keywords'></td></tr><tr><td id='atkMan" + x + "Cost'></td></tr><tr><td id='atkMan" + x + "Action'></td></tr><tr><td id='atkMan" + x + "EffectSm'></td></tr><tr><td id='atkMan" + x + "EffectBg'></td></tr><td id='atkMan" + x + "Conditional'></td></tr></table>");
				}
				else{
					tables[x] = $("#atkManTable" + x);	
					//console.log("hit me?: " + x);
				}
			}
			$("#atkManWrapper").empty();
			for (x = atkManAmount; x > 0; x--){
				$("#atkManWrapper").prepend(tables[x]);
			}
			$("#atkManWrapper").prepend("<div class='divHeader'>Attack Maneuvers <select id='atkManAmount' onchange='atkManAmount(event); skillValues(event); setAbilityAmount(event);'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select></div>");
			$("#atkManAmount").val(atkManAmount);
		}

		function exploitAmount (event){
			$("#exploitTable2").hide();
			$("#exploitTable3").hide();
			$("#exploitTable4").hide();


			for (amount = parseInt($("#exploitAmount").val()); amount > 1; amount--){
				$("#exploitTable" + amount).show();
			}
		}


		function SPexploits (event) {
			$("#strikeSPexploitTable").hide();
			$("#scoldSPexploitTable").hide();
			$("#scoldSPannoyer").hide();
			$("#scoldSPbefuddler").hide();
			$("#scoldSPfrightening").hide();
			$("#scoldSPinfractor").hide();
			$("#scoldSPpoker").hide();
			$("#scoldSPwobbler").hide();
			var strikeSPexploit = $("#strikeProficiencies option:selected").text();
			var scoldSPexploit = $("#scoldProficiencies option:selected").text();
			console.log(strikeSPexploit);
			console.log(scoldSPexploit);

			if (strikeSPexploit.indexOf('Physical') != -1 ){
					$("#strikeSPexploitTable").show();
			}
			if (scoldSPexploit.indexOf('Social') != -1 ){
					$("#scoldSPexploitTable").show();
			}
			
			if (scoldSPexploit.indexOf('Annoy') != -1 ){
					$("#scoldSPannoyer").show();
			}
			if (scoldSPexploit.indexOf('Befuddle') != -1 ){
					$("#scoldSPbefuddler").show();
			}
			if (scoldSPexploit.indexOf('Frighten') != -1 ){
					$("#scoldSPfrightening").show();
			}
			if (scoldSPexploit.indexOf('Infract') != -1 ){
					$("#scoldSPinfractor").show();
			}
			if (scoldSPexploit.indexOf('Poke') != -1 ){
					$("#scoldSPpoker").show();
			}
			if (scoldSPexploit.indexOf('Wobble') != -1 ){
					$("#scoldSPwobbler").show();
			}
		}

		function weaponExploits (event){
			$("#clubExploitTable").hide();
			$("#flailExploitTable").hide();
			$("#hammerExploitTable").hide();
			$("#thrustingSwordExploitTable").hide();
			$("#straightSwordExploitTable").hide();
			$("#spearExploitTable").hide();
			$("#daggerExploitTable").hide();
			$("#straightSwordExploitTable").hide();
			$("#axeExploitTable").hide();
			$("#backswordExploitTable").hide();
			$("#clubExploitTable").hide();
			$("#bowExploitTable").hide();
			$("#slingExploitTable").hide();
			$("#bolasExploitTable").hide();

			var weapon1Type = $("#weapon1Type").text();

			if (weapon1Type.indexOf('Club') != -1 ){
					$("#clubExploitTable").show();
			}
			if (weapon1Type.indexOf('Flail') != -1 ){
					$("#flailExploitTable").show();
			}
			if (weapon1Type.indexOf('Hammer') != -1 ){
					$("#hammerExploitTable").show();
			}
			if (weapon1Type.indexOf('Straight') != -1 ){
					$("#straightSwordExploitTable").show();
			}
			if (weapon1Type.indexOf('Thrusting') != -1 ){
					$("#thrustingExploitTable").show();
			}
			if (weapon1Type.indexOf('Spear') != -1 ){
					$("#spearExploitTable").show();
			}
			if (weapon1Type.indexOf('Dagger') != -1 ){
					$("#daggerExploitTable").show();
			}
			if (weapon1Type.indexOf('Axe') != -1 ){
					$("#axeExploitTable").show();
			}
			if (weapon1Type.indexOf('Backsword') != -1 ){
					$("#backswordExploitTable").show();
			}
			if (weapon1Type.indexOf('Bow') != -1 ){
					$("#bowExploitTable").show();
			}
			if (weapon1Type.indexOf('Sling') != -1 ){
					$("#slingExploitTable").show();
			}
			if (weapon1Type.indexOf('Bolas') != -1 ){
					$("#bolasExploitTable").show();
			}
		}	

		function setAbilityAmount (e) {
			var level = parseInt($("#charLvl").val());
			var exploitAmount = $("#exploitAmount").val();
			var atkManAmount = $("#atkManAmount").val();
			var nonAtkManAmount = $("#nonAtkManAmount").val();
			var talentAmount = $("#talentAmount").val();
			var totalAbilities = 5;

			for (x=1; x <= level; x++){
				//console.log("x =: " + (x % 3));
    			if( x % 3 == 0) {
    				//console.log("no ability");
    			} else {
    				//console.log("another ability");
        			totalAbilities = totalAbilities + 1;
        			//console.log("totalAbilities: " + totalAbilities);
        		}
    		};
    		$("#abilityNumber").html(totalAbilities);
			var remainingAbilities = totalAbilities - exploitAmount - atkManAmount - nonAtkManAmount - talentAmount;
			$("#remainingAbilities").html(remainingAbilities);
			//console.log("remainingAbilities value: " + remainingAbilities);
	
		}

		function skillPoints (e){
			var level = parseInt($("#charLvl").val());
			var skillPoints = 40;
			var maxSkillRank = "3: Trained"
			
			$('.validSkills').each(function(){
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

		function weaponAmount (event){
			$("#weapon2").hide();
			$("#weapon3").hide();
			$("#weapon4").hide();


			for (amount = parseInt($("#weaponAmount").val()); amount > 1; amount--){
				$("#weapon" + amount).show();
			}
		}

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

		function selectWeapon (weaponNum){
	        //console.log(weaponNum);
	        $("#weapon" + weaponNum + "SizeSm").show();
	        $("#weapon" + weaponNum + "SizeMed").show();
			$("#weapon" + weaponNum + "SizeLg").show();
			$(".weaponExploit").hide();

			var selected1TypeWeapon = $("#weapon1type option:selected").text();
			var selected2TypeWeapon = $("#weapon2type option:selected").text();
			var selected3TypeWeapon = $("#weapon3type option:selected").text();
			var selected4TypeWeapon = $("#weapon4type option:selected").text();

			var selected1Weapon = selected1TypeWeapon.substring(selected1TypeWeapon.indexOf(":") + 2);
			var selected2Weapon = selected2TypeWeapon.substring(selected2TypeWeapon.indexOf(":") + 2);
			var selected3Weapon = selected3TypeWeapon.substring(selected3TypeWeapon.indexOf(":") + 2);
			var selected4Weapon = selected4TypeWeapon.substring(selected4TypeWeapon.indexOf(":") + 2);

			//console.log(selected1Weapon + "Exploit");
			$("#" + selected1Weapon + "Exploit").show();
			$("#" + selected2Weapon + "Exploit").show();
			$("#" + selected3Weapon + "Exploit").show();
			$("#" + selected4Weapon + "Exploit").show();
	        
			$("#weapon" + weaponNum + "Size").val("3");
			if($("#weapon" + weaponNum + "type option:selected").text() == "R: Bow"){
				$("#weapon" + weaponNum + "SizeSm").hide();
				$("#weapon" + weaponNum + "SizeLg").hide();
				$("#weapon" + weaponNum + "Size").val("3");
			}
			if($("#weapon" + weaponNum + "type option:selected").text() == "P: Spear"){
				$("#weapon" + weaponNum + "SizeSm").hide();
				$("#weapon" + weaponNum + "Size").val("3");
			}
			if($("#weapon" + weaponNum + "type option:selected").text() == "R: Bolas"){
				$("#weapon" + weaponNum + "SizeSm").hide();
				$("#weapon" + weaponNum + "SizeLg").hide();
				$("#weapon" + weaponNum + "Size").val("3");
			}
			if($("#weapon" + weaponNum + "type option:selected").text() == "P: Dagger"){
				$("#weapon" + weaponNum + "SizeMed").hide();
				$("#weapon" + weaponNum + "SizeLg").hide();
				$("#weapon" + weaponNum + "Size").val("2");
			}
			weaponDamage(weaponNum);
		}


		function weaponDamage (weaponNum){
			var weaponDamage = parseInt($("#weapon" + weaponNum + "Size").val());
			var weapon = $("#weapon1type option:selected").text();

			$("#weapon" + weaponNum + "Damage").text(weaponDamage);

			if($("#weapon" + weaponNum +"type option:selected").text() == "R: Bolas"){
				$("#weapon" + weaponNum + "Damage").text("1");
			}
		}

		function selectArmor (armorNum){
			//console.log("Me Hit?");
			//console.log($("#armor" + armorNum + "type").val());
	        
			if($("#armor" + armorNum + "type").val() == "1"){
				$("#armor" + armorNum + "Bonus").html("1 Armor");
				$("#armor" + armorNum + "Penalty").html("<abbr class='lightPen'>LA Penalty</abbr>");
			}
			if($("#armor" + armorNum + "type").val() == "2"){
				$("#armor" + armorNum + "Bonus").html("2 Armor");
				$("#armor" + armorNum + "Penalty").html("<abbr class='medPen'>MA Penalty</abbr>");
			}
			if($("#armor" + armorNum + "type").val() == "3"){
				$("#armor" + armorNum + "Bonus").html("3 Armor");
				$("#armor" + armorNum + "Penalty").html("<abbr class='heavyPen'>HA Penalty</abbr>");
			}
			if($("#armor" + armorNum + "type").val() == "4"){
				$("#armor" + armorNum + "Bonus").html("1 Guard");
				$("#armor" + armorNum + "Penalty").html("<abbr class='shieldPen'>Shield Penalty</abbr>");
			}
		}
