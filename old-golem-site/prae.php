
<!DOCTYPE html>
<html>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<head>
  <title>Prae PHB</title>
	<script src="https://code.jquery.com/jquery-1.11.3.js"></script>

  <script src="js/charcreation.js"></script>
  <script src="js/jquery.sticky-kit.js"></script>
  
  <script type="text/javascript">

  $(window).load(function(){
      $(".d10menu").stick_in_parent();
  });




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

  </script> 
 <link rel="stylesheet" type="text/css" href="stylesheets/d10handbook.css">
 <link rel="stylesheet" type="text/css" href="stylesheets/d10general.css">

</head>
  
<body>
	<header class='topBar'>
    <div class='homeButton'></div>
    <!-- <div id='nav'>
      <ul>
        <li><a href='#'>Games</a>
          <ul>
            <li><a href='http://www.golem-studios.com/irradiant.html'>Irradiant</a></li>
            <li><a href='http://golem-studios.com/d10handbook.php'>Prae RPG System</a></li>
            <li><a href='http://www.golem-studios.com/p/table-campaign-setting.html'>Traea Campaign Setting</a></li>
          </ul>
        </li>
        <li><a href='#'>Dev Blog</a></li>
        <li><a href='#'>About Us</a>
            <ul>
              <li><a href='#'>Our Mission</a></li>
              <li><a href='#'>Our Team</a></li>
              <li><a href='#'>Contact Us</a></li>
            </ul>
        </li>
        <li><a href='#'>Community</a></li>
      -->
      </ul>
    </div>
	</header>

<div class='wideWrapper'>


  <nav class="d10menu">
    <ul>
      <li><a href="#top">Top</a></li>

      <hr color="#43BFC7" size="1" />

      <li><a href="#introSection">Prae</a>
        <ul>
          <li><a href="#coreMechanicsSection">Core Mechanics</a></li>
          <li><a href="#gameFlowSection">Game Flow</a></li>
          <li><a href="#livingWorldsSection">Living Worlds</a></li>
        </ul>
      </li>

      <hr color="#43BFC7" size="1" />

      <li><a href="#characterOverviewSection">Character Overview</a>
        <ul>
          <li><a href="#skillsOverviewSection">Skills Overview</a></li>
          <li><a href="#attributeOverviewSection">Attributes Overview</a></li>
          <li><a href="#abilityOverviewSection">Abilities Overiew</a></li>
        </ul>
      </li>

      <hr color="#43BFC7" size="1" />

      <li><a href="#exploringWorldsSection">Exploring Worlds</a>
        <ul>
          <li><a href="#TravelSection">Travel</a></li>
          <li><a href="#skillUseSection">Using Skills</a></li>
          <li><a href="#HealthSection">Health</a></li>
          <li><a href="#RecoverySection">Rest and Recovery</a></li>
          <li><a href="#gearSection">Gear Overview</a></li>
          <li><a href="#magicEnvironmentSection">Using magic in the World</a></li>

        </ul>
      </li>

      <hr color="#43BFC7" size="1" />

      <li><a href="#socialWorldsSection">Social Worlds</a>
        <ul>
          <li><a href="#socialWorldsSection">Social System</a></li>
          <li><a href="#moodSection">Mood</a></li>
          <li><a href="#attitudeSection">Attitude</a></li>
          <li><a href="#trustSection">Trust</a></li>
          <li><a href="#behaviorSection">Behavior</a></li>
          <li><a href="#reputationSection">Reputation</a></li>
        </ul>
      </li>   

      <hr color="#43BFC7" size="1" />

      <li><a href="#magicalWorldsSection">Magical Worlds</a>
        <ul>
          <li><a href="#magicOverviewSection">Magic Overview </a></li>
          <li><a href="#ritualsOverviewSection">Rituals Overview</a></li>
          <li><a href="#tearsOverviewSection">Tears Overview</a></li>
          <li><a href="#conjugationSection">Conjugation</a></li>
          <li><a href="#conjurationSection">Conjuration</a></li>
          <li><a href="#divinationSection">Divination</a></li>
          <li><a href="#evocationSection">Evocation</a></li>
          <li><a href="#potenceSection">Potence</a></li>
        </ul>
      </li>

      <hr color="#43BFC7" size="1" />

      <li><a href="#monstrousWorldsSection">Monstrous Worlds</a>
        <ul>
          <li><a href="#combatOverviewSection">Combat Structure</a></li>
          <li><a href="#attackingSection">Attacking</a></li>
          <li><a href="#movementSection">Moving</a></li>
          <li><a href="#obstaclesSection">Obstacles</a></li>
          <li><a href="#PositionsSection">Positions</a></li>
          <li><a href="#ConditionsSection">Conditions</a></li>
          <li><a href="#AttitudeCombatSection">Monster Behavior</a></li>
        </ul>
      </li>

      <hr color="#43BFC7" size="1" />

      <li><a href="#characterCreationSection">Character Creation</a>
        <ul>
          <li><div><a href="#skillUseSection">Skills & Abilities</a></div>
            <button id="showskillListNav" class="hidden hide" style="padding:0;" onclick="show('skillListNav');">[ + ]</button>
            <button id="hideskillListNav" class="hide" style="padding:0;" onclick="hide('skillListNav');">[&#8213;]</button>
            <ul id="skillListNav">
              <li><a href="#strikeSection">Strike</a></li>
              <li><a href="#blastSection">Blast</a></li>
              <li><a href="#invokeSection">Invoke</a></li>
              <li><a href="#AthleticsSection">Athletics</a></li>
              <li><a href="#ForceSection">Force</a></li>
              <li><a href="#AcrobaticsSection">Acrobatics</a></li>
              <li><a href="#SneakSection">Sneak</a></li>
              <li><a href="#EnduranceSection">Endurance</a></li>
              <li><a href="#PoiseSection">Poise</a></li>
              <li><a href="#LoreSection">Lore</a></li>
              <li><a href="#SurvivalSection">Survival</a></li>
              <li><a href="#DeceptionSection">Deception</a></li>
              <li><a href="#InsightSection">Insight</a></li>
              <li><a href="#TinkeringSection">Tinkering</a></li>
              <li><a href="#AwarenessSection">Awareness</a></li>
              <li><a href="#CompelSection">Compel</a></li>
              <li><a href="#RouseSection">Rouse</a></li>
              <li><a href="#CharmSection">Charm</a></li>
              <li><a href="#HandlingSection">Handling</a></li>
              <li><a href="#DiplomacySection">Diplomacy</a></li>
              <li><a href="#LeadershipSection">Leadership</a></li>
          
              <hr color="#43BFC7" size="1" />

              <li><a href="#ritualsOverviewSection">Rituals</a>
                <ul>
                  <li><a href="#conjureElementSection">Conjure Element</a></li>
                  <li><a href="#retrospectSection">Retrospect</a></li>
                  <li><a href="#locateSection">Locate</a></li>
                  <li><a href="#restorationSection">Restoration</a></li>
                  <li><a href="#illusionSection">Phantasm</a></li>
                  <li><a href="#portentSection">Portent</a></li>
                  <li><a href="#sigilSection">Sigil</a></li>
                  <li><a href="#wardSection">Ward</a></li>
                  <li><a href="#conjureSensesSection">Conjure Senses</a></li>
                </ul>
              </li>
            </ul>
          </li> <!-- End Skills & Abilities -->
          
          <hr color="#43BFC7" size="1" />

          <li><a href="#attributeDetails">Attributes</a></li>

          <hr color="#43BFC7" size="1" />

          <li><div><a href="#waysSection">Ways</a></div>
            <button id="showwaysNav" class="hidden hide" style="padding:0;" onclick="show('waysNav');">[ + ]</button>
            <button id="hidewaysNav" class="hide" style="padding:0;" onclick="hide('waysNav');">[&#8213;]</button>
            
            <ul id="waysNav">
                              <li><a href="#AdjunctSection">Adjunct</a></li>
                              <li><a href="#BerserkSection">Berserk</a></li>
                              <li><a href="#BladeDancerSection">Blade Dancer</a></li>
                              <li><a href="#SentinelSection">Sentinel</a></li>
                              <li><a href="#ShadowDancerSection">Shadow Strider</a></li>
                              <li><a href="#BulwarkSection">Bulwark</a></li>
                              <li><a href="#ChannelerSection">Channeler</a></li>
                              <li><a href="#StormcallerSection">Stormcaller</a></li>
                              <li><a href="#BreakerSection">Breaker</a></li>
                              <li><a href="#OverseerSection">Overseer</a></li>
                              <li><a href="#WardenSection">Herald</a></li>
                              <li><a href="#BladeweaverSection">Bladeweaver</a></li>
                              <li><a href="#BattleragerSection">Battlerager</a></li>
                              <li><a href="#RebukerSection">Bravo</a></li>
                              <li><a href="#IaidokaSection">Iaidoka</a></li>
                              <li><a href="#UnfetteredSection">Unfettered</a></li>
                              <li><a href="#FireflySection">Firefly</a></li>
                              <li><a href="#SculptorSection">Sculptor</a></li>
                              <li><a href="#magecadreSection">Cadre</a></li>
                          </ul>
          </li>

          <hr color="#43BFC7" size="1" />

          <li><a href="#gearSection">Gear</a>
            <ul>
              <li><a href="#weaponsSection">Weapons</a></li>
              <li><a href="#armorSection">Armor</a></li>
              <li><a href="#weaponsSection">Adventuring Gear</a></li>
            </ul>
          </li>

          <li><a href="#personalitySection">Personality</a>
            <ul>
              <li><a href="#cultureSection">Cultural Influence</a></li>
              <li><a href="#valuesSection">Values</a></li>
              <li><a href="#temperamentSection">Temperament?</a></li>
            </ul>
          </li>
        </ul>
      </li>

      <hr color="#43BFC7" size="1" />   

      <li><a href="#top">Back to Top</a></li>
    </ul>
  </nav>

  <!--Start d10 Handbook -->

  <div class="d10">
  <br/>
  <br/>


    <!-- Warning -->
    <section class="section" id="warnSection">
      <header class="hideWrapper sectionHeader">
        <button id="showwarn" class="hidden showButton" onclick="show('warn');">Show Warning: In Progress</button>
        <button id="hidewarn" class="hide" onclick="hide('warn');">[&#8213;]</button>
      </header>

      <article id="warn" class="sectionBody">
        <h1> Warning: In Progress </h1>
        <hr style="color:black; text-align:center;" size="3px;">
        To those who stumble across this, you have found an in progress Table Top RPG system. 
        It is currently being beta tested and the various documents that exist are being edited and merged on to this site, maybe even as you read this.
        Please be aware that nothing here is in final form, from rules to structure, grammar, or styling. Have a look and if you are so inclined you can email us with feed back here:
        <p style="text-align:center;"><a href="mailto:contact@golem-studios.com" style="text-align:center;">Contact Us</a></p>
        <br/>
        For those who came here on purpose here is a link to the character creator. You can save into our database retrieve it via url (make sure to write down your character's your key)  or print it (and it should fit on a page). Hover or click the checkmark <img id="showCheckList" class="charInfoHover" src="imgs/check.png" style="height:10px; border-radius:3px; background-color:white;"> to see the character creation check list. Enjoy! 
        <p style="text-align:center;"><a href="http://golem-studios.com/charcreation.php" style="text-align:center;">Character Creator</a></p>


      </article>

      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Warning -->

    <!-- Intro -->
    <section class="section" id="introSection">
      <header class="hideWrapper sectionHeader">
        <button id="showintro" class="hidden showButton" onclick="show('intro');">Show RPG Introduction</button>
        <button id="hideintro" class="hide" onclick="hide('intro');">[&#8213;]</button>
      </header>

      <article id="intro" class="sectionBody">
        <h1>Introduction</h1>
        <div class="divider"></div>
        <h2>What is a roleplaying game?</h2>
        <span class="indent40"> </span>

        Games ask their players to utilize skills to overcome challenges. Tabletop Role-playing games generally ask players to survive while gaining power and shaping worlds through puzzles, politics, environments, and combat. This can test a large a variety of skills in gameplay but most importantly, and largely unique to these types of games, imagination and creativity.
        
        <br/><span class="indent40"> </span>

        The role-playing aspect asks players to immerse themselves into fantastic worlds and act out a character they create. Acting out and/or describing the beliefs, characteristics, and behaviors of an imaginary character.

        <h2>What style of roleplaying game is Prae?</h2>

        <p class="wordNote"><i>Players are artists who create their own reality within the game.</i> <br/> - Shigeru Miyamoto <br/><br/>

          <b>Prae, adverb: before or in front</b></p><br/>
        <span class="indent40"> </span>

        Designed for a more gritty realistic medieval magical fantasy world, player characters (PCs) in this game are expected to be characters put on the forefront of solving problems. 
        
        <br/><span class="indent40"> </span> 

        In Prae you take on the role of those who go before. Explorers, scouts, investigators, diplomats, revolutionaries, etc.</span>
        
        <br/><span class="indent40"> </span> 

        The rules of Prae act as boundaries and tools to guide the creativity in players, and to enable a world that is consistent. Like most TTRPGs Prae uses dice to guide the the play, however it is designed to give a significant amount of control and responsibility to the player. Player agency is an important part of Prae's design player's are responsbile for knowing the rules and using them well. The risks and impact of using skills are largely transparent to create consistency and agency. 

        <br/><span class="indent40"> </span> 

        Prae's dice and skill system is part of this consistency. Characters with a high skill rank are not just more likely to score well they are incredibly likely to consistently perform well on their skills.
         
        <br/><span class="indent40"> </span>

        The combat system is highly tactical and requires a miniatures, a map, and preferably a hex based one. Players are expected to engage in the game as much as the story and their character. 

        <h2>Responsibilities of GM and players</h2>
        
        <h3>Players</h3>
        
        <span class="indent40"> </span> 

        Your job as a player is to create a character (Player Character or PC) that can assist in overcoming the obstacles that inevitably arise between you and your goals. These will be generally be fighting monsters, influencing npcs, gaining information to solve puzzles or generally engaging with and overcoming aspects of the environment and story. Learn the rules of the game so you are aware of how to take actions and their associated risk.
        
        <h3>GM</h3>

        <span class="indent40"> </span> 

        Your job is hard, but hopefully the rules provided here and in the GM guide make your task a lot less daunting. You have to invent worlds and everything in them. Monsters, people, loot, obactles, and sometimes you will be and feel like the villian. Prae tries to provide a variety of tools to assist you in this task but you are free to modify and expand on them as you see fit. However, one goal of Prae that you should always keep in mind is consistentcy. The rules in this book and all others associated with Prae provide a context, a langauge for the players to make their choices and survive the dangers you put before them. While you often will you make changes to the expectation set forth by the content in these books do your best to communicate that you have done so. If you change the stats of a Howler go out of your way to describe how what they are encountering defies their previous encounters with them or the stories they've heard. 
      
      </article>

      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Intro -->


    <!-- Core Mechanics -->
    <section class="section" id="coreMechanicsSection">
      <header class="hideWrapper sectionHeader">
        <button id="showcoreMechanics" class="hidden showButton" onclick="show('coreMechanics');">Show Core Mechanics</button>
        <button id="hidecoreMechanics" class="hide" onclick="hide('coreMechanics');">[&#8213;]</button>
      </header>

      <article id="coreMechanics" class="sectionBody">
        <h1 id="mechanics">Core Mechanics and Rules</h1>
        <div class="divider"></div>
        
        <h2>Rolling Dice</h2>
        <span class="indent40"> </span>Taking action in the world will often require the use of your character's skills.
        To actively use a skill roll a number of 10-sided dice (d10) equal the rank of the skill. 
        <br/>
        <span class="indent40"> </span>Take the value of any die rolled (normally the highest) and add all modifiers to get the result. 
        The result succeeds if the result meets or exceeds the Target Number (TN) of the skill check.
        
        <p class="note">10 dice is the maximum you can roll when using any skill or attack.</p>
        <p class="note">1 die is the minimum you can roll when using any skill or attack.</p>
        <h2>Critical Marks</h2>
        <span class="indent40"> </span>

        Some rolls also look for Critcal Marks. You get one Critical Mark per duplicate rolled and for each die that shows a number within your Critical Range. 

        <br/><span class="indent40"> </span>
        The default Critical Range (CR) is 10. 
        Various effects can increase or decrease a Critical Range. If that range is decreased to above a 10 the roll can only get Critical Marks for duplicates. Critical Marks are tie breakers for contested skill checks and each type of attack has an bonus for each Mark.

        <div id="" class="abilityFieldset">
          <div class="abilityLegend gLegend">Critical Mark Bonuses</div>
          <div class="flex abilityField tableHeader">
            <div class="tableCellLeft bold">Attack</div>
            <div class="bold">Bonus per Mark</div>
          </div>
          <div class="flex abilityField gField">
            <div class="tableCellLeft">Strike</div>
            <div class="">+1 Damage</div>
          </div>
          <div class="flex abilityField gField">
            <div class="tableCellLeft">Blast</div>
            <div class="">+1 Power</div>
          </div>
          <div class="flex abilityField abilityFieldLast gField">
            <div class="tableCellLeft">Invoke</div>
            <div class="">+1 Momentum</div>
          </div>
        </div>
        <!--
        <ul id="criticalMarkList">
          <li>Skills: +1 modifier to the result per Mark</li>
          <li>Strike: +1 damage per Mark</li>
          <li>Blast: +1 Stored Power per Mark</li>
          <li>Invoke: +1 Momentum to an ally per Mark</li>
          <li>Contested checks: Tie breaker</li>
        </ul>
      -->
        <h3>Critical Effects</h3>
        Some attacks can trigger Critical Effects (CE) by rolling meeting or exceeding a number of Marks rolled. Each weapon has a potential critical effect when Striking with it. 
        <!-- <p class="note">Some GMs may choose to have an additional narrative and/or mechanical benefit for rolling critical marks on skill checks. Circumstances around skill checks vary greatly so not all rolls are likely to have an additional effect and it is often inappropriate for there to be one.</p>
        -->

        <p class="note">The sum of Critical Marks on a roll is referred to as Critical Score (CS)</p>
        Need to insert examples as this is confusing to various people.
        <h2>Mana</h2>
        <span class="indent40"> </span>Mana is the primary resource for characters and it relates to all the other resources in the game. Characters regain their mana once per day, during a long rest. In Traea mana is restored once per day if a character is sleeping between 3 and 4 am. 

        <h2>Round Down</h2>
        <span class="indent40"> </span>Whenever dividing a number and the result is not a whole number, round down, even if the fraction is one half or greater.
        <h2>Duplicate Effects</h2>
        <span class="indent40"> </span>Effects from abilities with the same name do not stack
        <h2>Specific Beats General</h2>
        <span class="indent40"> </span>If a specific rule contradicts a general rule, use the specific rule. 
      </article>

      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End coreMechanics -->

    <!-- Game Flow -->
    <section class="section" id="gameFlowSection">
      <header class='hideWrapper sectionHeader'>
        <button id="showgameFlow" class="hidden showButton" onclick="show('gameFlow');">Game Flow</button>
        <button id="hidegameFlow" class="hide" onclick="hide('gameFlow');">[&#8213;]</button>
      </header>
      <article id="gameFlow" class="sectionBody">
        <h1>Game Flow</h1>
        <div class="divider"></div>

        <span class="indent40"> </span> Gameplay is an important part of Prae, and will dictate a lot of your time at the table. The decisions the players make and how well they play the game will not only determine their own survival but how they shape the world around them. Roleplaying is an important part of Prae but the game is largely designed to move between overcoming obstacles, gathering information, planning, and executing those plans. Over the course of play you're naturally flow between various types of play, one way to imagine this is Color, Content, and Conflict. 

        <br/><span class="indent40"> </span> 

        <b>Conflict</b> is where action is, blood start to rise, adrenaline gets pumping, danger fills the air, and hopefully the momentum of your words or movements carry the day against monsters, people, or even courtly intrique. Conflict focuses tightly on player decisions and generally there are challenges for players to overcome and meaningful failure. Something is a stake in a conflict, often lives. 

        <br/><span class="indent40"> </span> 

        <b>Color</b> is when focused on providing description, engaging roleplay, and character building. Risks are non-existent and the worst consequence of an action is delving into content. The GM will often tell you the actions of your characters and the world around you. Color helps you better understand the characters you're playing and immerse yourself in the world. Travel time will often lead the game flow into color. 

        <br/><span class="indent40"> </span> 

        <b>Content</b> is just about everything else. When information is gathered, decisions are made, questions are asked, plans are made, and story is progressed. Content lives between conflict and color and will often set the stage for how conflict is engaged. Skill checks are generally controlled or common if used at all. 

        <h2>Goals</h2>
        <span class="indent40"> </span>The game consists if a series of goals that the players are trying to complete. As a newer player these goals will almost always be given by the GM or by proxy from an NPC. However, as you grow more comfortable in the game its likely that the players will be deciding more and more of their own goals and the GM will primarily be building out the circumstances and obstacles to achieving them. 
        <!-- 
        <span class="indent40"> </span>Adventuring (a combination of exploration, combat, and negotiation) is a common general goal found in many games. The players are tasked with making the world safer by dealing with threats that pose a serious threat to society (often viscious monsters, called Faen), or exploring old ruins in search for lost treasure. Obstacles here often relate to monsters, traps, puzzles, or characters controlled by the GM. 

        <br/><br/>
        <span class="indent40"> </span>Building. Organizing and allocating resources to build a stronghold to stand against various threats. 

        <br/><br/>
        <span class="indent40"> </span>Rogues. Doing what you need to do to survive, or become rich. Laws, authority, the belongings or even lives of others are all meant to be broken or taken in your pursuits. Obstacles here often relate to finding ways to avoid the consequences of your actions, stealth, subterfuge, finding scape goats, or even making so much chaos the authorities can't make sense of it. 

        <br/><br/>
        <span class="indent40"> </span>Amassing power. Politics, manipulating people to change the balance of power. Gaining favors, leveraging knowledge, taking on the right debts to build power toward what you party values. Obstacles relate to the costs of your goals, and the actions of those that don't share them. 

        <h2>Scenes to GM</h2>
        Scenes will generally tip off your players that something important is going on, that something is at stake. You should embrace that. When in a scene make sure something important is going on, which generally means there is an opportunity for players to fail or make a significant decision relating to the plot. If there is not an opportunity for an important decision or the players to fail in any significant way you shouldn't be in scene. 
      -->


      </article>

      <footer class="sectionFooter">
      </footer>
    </section> 
    <!-- End Game Flow -->


    <!-- Living Worlds -->
    <section class="section" id="livingWorldsSection">
      <header class='hideWrapper sectionHeader'>
        <button id="showlivingWorlds" class="hidden showButton" onclick="show('livingWorlds');">Living Worlds</button>
        <button id="hidelivingWorlds" class="hide" onclick="hide('livingWorlds');">[&#8213;]</button>
      </header>
      <article id="livingWorlds" class="sectionBody">
        <h1>Living Worlds</h1>
        <div class="divider"></div>
        <span class="indent40"> </span> Prae is designed to help fantasy worlds feel real. Fantasy is filled with exploration, varieties of people, magic, and monsters. A realistic incorporation of these things will significantly shape worlds. Prae leans toward enabling settings that in a lower fantasy setting with grittiness and some realism rather than heoric or epic ones. Great things can and should be accomplished and individuals can find significant power but the passage of time is greatly influenced by society and culture rather than individuals. Yet difficult to manage resources and deadly monsters make for a world of grey rather than stark black and white.
        
        <br/><span class="indent40"> </span>

        Internal consitency both narratively and with the forces of existence help a world feel living. Consistency allows players to not only understand the impact their actions will have but also anticpate problems and recognize when something is out of the normal. 

        <h2>Characters</h2>
        <span class="indent40"> </span> No world feels alive without characters. 
        As a PC your job is to bring a character to life one that is up to the challenges of a world wrought with great forces. 
        <br/><br/>
        <i>To GM - Traea</i>
       <button id="hidelivingWorldsTraea" class="hide hidden" onclick="hide('livingWorldsTraea');">[&#8213;]</button>
        <button id="showlivingWorldsTraea" class="hide" onclick="show('livingWorldsTraea');">[ + ]</button></p>
        <div id="livingWorldsTraea" class='hidden'>
          <h2>To GM - Traea</h2>

          <span class="indent40"> </span> Traea is my world setting for Prae but feel free to create your own. Here are some core aspects I've built into the world to to make it internally and logically consistent. 
          
          <h3>The gods are mostly inactive</h3> 
          <span class="indent40"> </span>
          Old stories tell of the An'Taah, the Children of the Sky Above and how they shaped the world. These beings of great power are said to have taken a more active role in the age(s) before the age of man. Most of the world still believes they are out there listening to prayers and pleas. Many still worship them, they seek guidance and follow the paths that were  laid down a thousand years ago. The An'Taah now take on less of a hands on role than they did in the stories, if they are still there, if they were ever there. Conjuration is a powerful magic, maybe there were never other beings just ourselves from ages past better at manipulating the Fae. 

          <h3>Evolution is real - genes and memes</h3> 
          <span class="indent40"> </span>

          While all evidence suggests the An'Taah shaped the land, oceans, mountains, rivers, and brought life into the world. The forces of progress are still there, natural selection plays a important role in the progress of people and creatures. There is a truth out there and the more of it cultures can grasp and utilize the greater the obstalces they can overcome.

          <h3>Magic is real and abundant, but limited and well defined</h3>

          <span class="indent40"> </span>

          Magic is innate to all of humanity. All people have the potential to shape it into power if they choose to. Yet manifesting Fae draws the attention of monsters called Faen. The existence of magic affects all aspects of life, economics, politics, morality, and justice. How societies walk the balance of using this great power and paying its costs can vary greatly. 


          <h3>The world is harsh</h3>
          <span class="indent40"> </span>

          The struggle to survive is ongoing, Faen are an ever present threat to humanity, and as humanity ventures out from the places of safety it has carved they constantly find themselves running in the ruins of those who didn't make it and Faen they unleashed.

          <h3>Common source for humanity</h3>

          <span class="indent40"> </span>

          The age of man began about 1,000 years ago, humantiy seems to have spread out from a single location and some cultural aspects of all humans still go back to that time. The value in exploration and title of Prae is one of them. Exploration is dangerous but also vital for building bridges between communites, unlocking the secrets of the past, or unlocking sleeping or hidden power. 

          <h3>Techonology and Timelines</h3>
          <span class="indent40"> </span>

          What is known of the past suggests a much greater understanding of the forces that exist in the world. Humanity strives to learn some of those secrets but much is still left unknown. Many cultures have inefficiencies and made poor choices in the past that might look evil to a player, but most of the time there are just meant to represent the ignorance of the culture and its people. How far along you wish to play in the timeline of a world is up to you, but main timeline of Traea is designed to be roughly equivalent from the classical period to late antiquity depending on the region in the world, but with its own character due to magic and monsters that exist. Much of the world is finding some semblance of stability have enough resources to consider other groups of humans to be at least as large a threat as the Faen. 

          <h2>To GM - Your world of Prae</h2>
          
          <h3>Active Gods?</h3>
          <span class="indent40"> </span> If your gods are active what are they doing? Why haven't the uplifted life on your world, solved scarcity, or otherwise greatly enhanced techonological progress? 


          <h3>Who has access to magic?</h3>
          <span class="indent40"> </span> Most fantasy worlds greatly restrict access to magic. Traea is quite different in that regard. If you want a world with restricted magic, why is magic restricted? If through bloodlines why didn't the magical bloodline beat out the non-magical one long ago? If through a great knowledge barrier what is stopping people from devoting a lot of time to teach everyone harness such a powerful resource, or are you just in a world not technology advanced enough for that to happen yet?

          <h3>Source of humanity?</h3>
          <span class="indent40"> </span> Where did humanity come from and what dark secrets lie in half forgotten past?

          <h3>Techonogy and Timlines</h3>
          <span class="indent40"> </span> In most fantasy worlds the challenges have to be great to stop the rapid progress. Characters are generally written and played with the knowledge of today but with a power we can only dream of. Where are you in your worlds timeline, and what gets in the way of techonological progress?

       


          <h2>To GM - Explaing the dice in living worlds</h2>
          <span class="indent40"> </span> In some RPGs players will often run across stories about characters that are very invested in a skill but yet frequently someone else in the party out performs them. When dice have a dice system has a high variance in results and many characters are rolling luck generally feels more important than how you built your character. A fighter rolls poorly on a test of strength, but the wizard rolled high and manages to lift the portcullis. The scholar rolls poorly trying to recall knowledge while the illiterate barbarian just happens to know the secret needed to open the door ancient tomb three continents away from his home. These events can break be silly and fun but they can also be immersion breaking and threaten the integrity of a living world. 

          <br/><span class="indent40"> </span>Prae's skill system gives more reliability to skill use than some, characters who invest being good at a skill should consistently perform not only well but reliably as well or better than their lucky party members. However, there are still times where results are hard to explain. Sometimes they can be explained actually through luck, we even have a phrase in our non-fanastic world for it, beginner's luck. This can explain performing well on accident in various games like darts. Sometimes happenstancce just leads some NPC to really prefer the company of the gruff abrasive character instead of the sly witty one and now you might have more information into the values or general attitude of that NPC. 

          <br/><span class="indent40"> </span> Othertimes luck or happenstance do not sufficiently explain the dice. Someone with no skill in Force or and 0 might lifting a portcullis while the might master of Force failed to do so. In such cases, which are hopefully rare, consider explanations of a magical world. As we have stories of mothers lifting cars to save the children, so to would magical worlds have stories of weird happenings with people accidentially and unreliably touching power within them they didn't know they had. 

          <br/><span class="indent40"> </span> Other otions: Fate. Hidden helper. NPC error (if it doesn't take to much credit away from the player rolling), "the npc in charge of the portcullis made an err and was helping the scrawny wizard lift it up instead of try to hold it down". 
        </div>
      </article>

      <footer class="sectionFooter">
      </footer>
    </section> 
    <!-- End Living Worlds -->


    <!-- Character Overview -->
    <section class="section" id="characterOverviewSection">
      <header class='hideWrapper sectionHeader'>
        <button id="showcharacterOverview" class="hidden showButton" onclick="show('characterOverview');">Show Character Overview</button>
        <button id="hidecharacterOverview" class="hide" onclick="hide('characterOverview');">[&#8213;]</button>
      </header>

      <article id="characterOverview" class="sectionBody">
        <h1>Character Overview</h1>
        <div class="divider"></div>

        <span class="indent40"> </span>Table top role playing games ask their players to solve problems and engage in the world with creativity and imagination. 
        For players this starts with creating their character.

        <br/><br/>
        There are many ways to start imagining your character.
        <ul>
          <li>Archetypes: Wizard, fighter, cleric, etc.</li>
          <li>Personality: extroverted charming drunkard, quiet and confident clergy, fun seeking explorer, lone wolf animal lover, etc</li>
          <li>Character goals: Become the most reknown monster hunter in the world, learn the secrets of the gods, attain immorality, etc.</li>
        </ul>
        <span class="indent40"> </span> All of those are well and good, however, Prae also asks you to give special attention where your character came from and the skills they would of needed to cultivate to get where they are.
 
        <p class="note">Before you get to far along make sure to speak with your GM to make sure your character concept works within the broad scope of the game and setting.</p>

        <h2> Character Components</h2>

        <h3>Skills</h3>
        <span class="indent40"> </span>A character's experience starts long before the game does. The skills your character has learned relate to who they are, where they came from, and how they have overcome the obstacles of life. 
        <br/>
        <span class="indent40"> </span>When selecting skills consider the life your character that led them to beginning of the game. 
        
        <p class="note">See the <a href="#skillsOverviewSection" class="internalLink">Skills Overview</a> and <a href="#skillUseSection" class="internalLink">Using Skills</a> sections for more detail. </p>

        <h3>Abilities</h3>
        <span class="indent40"> </span>Abilities are accessed through learning the Basic Rank of their related skill. All skills have a atleast one Talent and Trick. All Talents give Reactions or Focus and if mental they also learn as spell otherwise they get a passive effect. All Tricks give actions that utilize momentum in combat or a new way to spend mana. 

        <p class="note">Additional info about abilities can be found in the <a href="#abilityOverviewSection" class="internalLink">Ability Overview</a> and each skill's section.</p>
        <h3>Attributes</h3>
        <span class="indent40"> </span>Characters have three primary attributes: Body, Mind, and Spirit. Each primary attribute has three secondary attributes. 
        <br/><br/>

         <div id="" class="abilityFieldset">
          <div class="abilityLegend gLegend">Attributes</div>
          <div class="flex abilityField gField">
            <div class="tableCellLeft bold">Body</div>
            <div class="">Might, Agility, and Brawn</div>
          </div>
          <div class="flex abilityField gField">
            <div class="tableCellLeft bold">Mind</div>
            <div class="">Will, Wit, and Resolve</div>
          </div>
          <div class="flex abilityField abilityFieldLast gField">
            <div class="tableCellLeft bold">Spirit</div>
            <div class="">Vigor, Empathy, and Faith</div>
          </div>
        </div>

        <!--
        <blockquote>
          <b>Body:</b> Might, Agility, and Brawn
          <br/>
          <b>Mind:</b> Will, Wit, and Resolve
          <br/>
          <b>Spirit:</b> Vigor, Empathy, and Faith
        </blockquote>    
        -->

        <p class="note">See the <a href="#attributeOverviewSection" class="internalLink">Attribute Overview</a> and <a href="#attributeDetails" class="internalLink">Determine Attributes</a> sections for more details.</p>

        <h3>Way</h3>
        <span class="indent40"> </span>Each character's life has led them to a Way. Often, but not always, some sort of formal combat training. Through this training the character learns an Attack and a Talent.

        <p class="note">See the <a href="#waysOverviewSection" class="internalLink">Ways Overview</a> and <a href="#waysSection" class="internalLink">Ways</a> sections for more details.</p>

        <h3>Gear</h3>
        <span class="indent40"> </span> Tools and weapons your characters have access to helping them survive and accomplish their goals. How much any campaign or GM chooses to focus on management of gear can vary greatly, see the gear section and work with your GM to pick (or make) the rules appropriate for your group. 
  
        <p class="note">See the <a href="#gearSection" class="internalLink">Gear</a>.</p> 

        <h3>Personality</h3>
        <span class="indent40"> </span>Many things influence who person will become: biology, culture, community, family and experiences are some of them. In this are we will explore how much your character was influenced by those things, their innate temperament and how all of that relates to their values, common moods, what they consider to be immoral or tabbo and what they do to find joy and relax. 

        <p class="note">See the <a href="#personalityApproachesSection" class="internalLink">Personality Approaches</a>.</p>

               
      </article>

      <footer class="sectionFooter">
      </footer>
    </section> 
    <!-- End Character Overview -->


    <!-- Skills Overview -->
    <section class="section" id="skillsOverviewSection">
      <header class="hideWrapper sectionHeader">
        <button id="showskillOverview" class="hidden showButton" onclick="show('skillOverview');">Show Skills Overview</button>
        <button id="hideskillOverview" class="hide" onclick="hide('skillOverview');">[&#8213;]</button>
      </header>

      <article id="skillOverview" class="sectionBody">
        <h1>Skills Overview</h1>
        <div class="divider"></div>
        <span class="indent40"> </span>A character's history and capabilities relate closely to their skills. 
        Starting skills relate to the experience of the character prior to the start of the game. 
        Where they grew up, where and how they were raised, and what training they have undergone. 
        <br/>
        <span class="indent40"> </span>All skills have a Rank, a Modifier and a Passive value. 

        <h2>Skill Rank</h2>
        <span class="indent40"> </span>Skill Rank represents a characters experience in using the skill.
        Skill Ranks have a value and a name. The value is the number of dice rolled when using that skill. 
        The name is used to reference the value as well as to provide a narrative understanding of the characters capability. If a character has at least a Basic Rank in a skill can choose to learn the abilities associated with it. 

        <br/><br/>
        <div id="" class="abilityFieldset">
          <div class="abilityLegend gLegend">Frequency of Skill Ranks</div>
          <div class="flex abilityField gField">
            <div class="cell90 bold">1: Untrained</div>
            <div class="">roughly everyone has this level of skill</div>
          </div>
          <div class="flex abilityField gField">
            <div class="cell90 bold">2: Basic</div>
            <div class="">~1 in 4 people have this level of skill</div>
          </div>
          <div class="flex abilityField abilityFieldLast gField">
            <div class="cell90 bold">3: Trained</div>
            <div class="">~1 in 10 people have this level of skill</div>
          </div>
          <div class="flex abilityField abilityFieldLast gField">
            <div class="cell90 bold">4: Adept</div>
            <div class="">~1 in 1,000 people have this level of skill</div>
          </div>
          <div class="flex abilityField abilityFieldLast gField">
            <div class="cell90 bold">5: Expert</div>
            <div class="">~1 in 100,000 people have this level of skill</div>
          </div>
          <div class="flex abilityField abilityFieldLast gField">
            <div class="cell90 bold">6: Master</div>
            <div class="">~1 in 10 million people have this level of skill</div>
          </div>
        </div>

        <!--
        <table class="skillRankInfo listTable">
          <tr>
            <td>• 1: Untrained</td>
            <td>(roughly everyone has this level of skill)</td>
          </tr>
          <tr>
            <td>• 2: Basic</td> 
            <td>(~1 in 4 people have this level of skill)</td>
          </tr>
          <tr>
            <td>• 3: Trained</td>
            <td>(~1 in 10 people have this level of skill)</td>
          </tr>
          <tr>
            <td>• 4: Adept</td>
            <td>(~1 in 1,000 people have this level of skill)</td>
          </tr>
          <tr>
            <td>• 5: Expert</td>
            <td>(~1 in 100,000 people have this level of skill)</td>
          </tr>
          <tr>
           <td>• 6: Master</td>
           <td>(~1 in 10 million people have this level of skill)</td>
          </tr>
        </table>
        --> 
        <p class="note">The frequency of a skill ranks for specific skills can change greatly based on culture, technological level of the world or a vartiey of other variables</p>
        
        <h2>Modifier</h2>
        <span class="indent40"> </span>Modifiers are added to the value of the die to determine the result of the roll. A skill's modifier represents the innate apptitude the character has in performing the skill, rather than their experience in using it. A mighty character gains a bonus to athletics, a witty one at deception, one that can project confidence at leadership, etc. 
        <br/>
        <span class="indent40"> </span>
        <h3 id="skilllist">Skills and Attack List by type and attribute modifier</h3>

        <button id="hideskillsList" class="hide" onclick="hide('skillsList');">[&#8213;]</button>
        <button id="showskillsList" class="hide hidden" onclick="show('skillsList');">[ + ]</button>
        <div id="skillsList">

          <h4>Physical</h4>
          <ul>
            <li>Body - Strike (attack)</li>
            <li>Might - Athletics and Force</li>
            <li>Agility - Acrobatics and Sneaking </li>
            <li>Brawn - Endurance and Poise</li>
          </ul>
          <h4>Mental</h4>
          <ul>
            <li>Mind - Blast (attack)</li>
            <li>Will - Lore and Survival</li>
            <li>Wit - Deception and Insight</li>
            <li>Resolve - Awareness and Tinkering</li>
          </ul>
          <h4>Social</h4>
          <ul>
            <li>Spirit - Invoke (attack)</li>
            <li>Vigor - Compel and Rouse</li>
            <li>Empathy - Charm and Handling</li>
            <li>Faith - Diplomacy and Leadership</li>
          </ul>
        </div>
      <p class="note">See the <a href="#skillUseSection" class="internalLink">Using Skills</a> sections for more detail. </p>
      </article> 
      <footer class="sectionFooter">
      </footer> 
    </section>
    <!-- End Skill Overview -->

    <!-- Attribute Overview -->
    <section class="section" id="attributeOverviewSection">
      <header class="hideWrapper sectionHeader">
        <button id="showattributeOverview" class="hidden showButton" onclick="show('attributeOverview');">Show Attribute Overview</button>
        <button id="hideattributeOverview" class="hide" onclick="hide('attributeOverview');">[&#8213;]</button>
      </header>

      <article id="attributeOverview" class="sectionBody">
        <h1>Attribute Overview</h1>
        <div class="divider"></div>
        <span class="indent40"> </span>The primary attributes: <b>Body</b>, <b>Mind</b>, and <b>Spirit</b> relate to the respective physical, mental and social prowess of the character.
        <br/>
        <span class="indent40"> </span>Players choose the priority of these attributes, this priority determines their starting value, how many points can be used on secondary attributes, and affects how they increase as the character gains levels. 
        The value of Body, Mind, and Spirit is the maximum value of each of the secondary attributes.
        <br/>
        <span class="indent40"> </span>Each of the secondary attributes has some optional narrative components related to aspects of a character.

        <h2>Body</h2>
        <span class="indent40"> </span>Body's secondary attributes are Might, Agility, and Brawn each of which have some a relation to a characters physique.

        <blockquote>
          <h3>Might</h3> 
          <span class="indent40"> </span>Relates to muscle tone of an individual.
          A character with a high Might and high Agility is likely to look like a martial artist or gymnast in terms of build.
          A character with a high Might and high Brawn have builds varying from sumo wrestlers, WWE wrestlers, or line-men on a football team.

          <h3>Agility</h3>
          <span class="indent40"> </span> Represents grace, speed, and precision of movement.
          A character with a high agility always seems to float when they walk, very fluid in their pace and movement.
          Characters with a high agility are likely to have little body fat.

          <h3>Brawn</h3>
          <span class="indent40"> </span>Embodies a characters muscle mass, height, weight, sturdiness, and stoutness.
          Characters with a high brawn are also less likely to feel and react to pain.
        </blockquote>

        <h2>Mind</h2>
        <span class="indent40"> </span>Mind's secondary attributes are Will, Wit, and Resolve each of which relate to aspects of personality and intelligence. 
        
        <blockquote>
          <h3>Will</h3>
          <span class="indent40"> </span> Represents a character’s ability to exert their desires on their own behavior.
          High will allows a character to easily maintain focus and force themselves through doing difficult, boring, or tedious tasks. 
          Characters with high Will tend to be disciplined and ordered, but can often struggle to adapt the their environment prefering it to change to suit their desires.

          <h3>Wit</h3>
          <span class="indent40"> </span>Relates to speed of mind. Snappy comebacks, quips, and sarcasm are some behaviors common in those with a high Wit.
          Changing tactics on the fly, comfort in adapting to an environment, quickly taking in lots of information to more accurately make informed decisions in snap situations, language games, rapid math problems, befuddling people in conversation are all common characteristics of someone with a high Wit. 
          They generally thrive in and enjoy chaotic environments.

          <h3>Resolve</h3>
          <span class="indent40"> </span>Embodies the resilience of Mind.
          In many ways the other side of Will, while those strong in Will have great control over themselves, those strong in Resolve are rarely influenced by anything outside of themselves. 
          High resolve often allows one to withstand mind-altering effects like alcohol, drugs, or social influence.
          The often express emotion with less intensity, even if they feel it just as strongly. 
          They are inherently skeptical of forming new beliefs and do so only when confident with the evidence and logic of them.
          Without strong of confidence they avoid making definitive statements. 

        </blockquote>
        
        <h2>Spirit</h2>
        <span class="indent40"> </span>Spirit's secondary attributes Vigor, Empathy, and Faith each of which relate expression, utilization, and understanding of emotion.
   
        <blockquote>
          <h3>Vigor</h3>
          <span class="indent40"> </span>Relates to emotional intensity, sometimes to the point of losing control of themselves to that emotion. 
          Individuals with high Vigor are often gregarious and can have great influence on the emotional state on those around them. 
          When someone with a high Vigor is having a good time most of the people around them are as well. 
          When they are down or annoyed they can bring with them an cloud over the area around them and many will seek to avoid them. 

          <h3>Empathy</h3> 
          <span class="indent40"> </span>Represents ability to understand the emotional state of others, and how experiences affect others emotionally. 
          This often results in a character with a high Empathy feeling the emotions of those around them. 
          Although with the right knowledge this can lend to easily manipulating the attitude and mood of others.


          <h3>Faith</h3>
          <span class="indent40"> </span>Faith relates to confidence in owns self or beliefs.
          This confidence is often bound to have a significant impression on how others perceive them. 
          However, it can often be misplaced and individuals with a high Faith are very resistant changing their minds. 

        </blockquote>    

        See the <a href="#attributeDetailsSection" class="internalLink">Attribute Details</a> section for more details. 
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!--End Attribute Overview -->

    <!-- Abilities Overview -->
    <section class="section" id="abilityOverviewSection">
      <header class="hideWrapper sectionHeader">
        <button id="showabilityOverview" class="hidden showButton" onclick="show('abilityOverview');">Show Ability Overview</button>
        <button id="hideabilityOverview" class="hide" onclick="hide('abilityOverview');">[&#8213;]</button>
      </header>

      <article id="abilityOverview" class="sectionBody">
        <h1>Ability Overview</h1>
        <div class="divider"></div>
        <span class="indent40"> </span> Abilities give your character additional capabilites. All abilities are associated with skills or Ways. Once a character has Basic rank in a skill they can learn its Talents and Tricks.

        <br/><span class="indent40"> </span><b>Talents</b> give a passive effect combat, and an additional way to use mana. 
        <br/><span class="indent40"> </span><b>Tricks</b> are in small magical effects that give additional options in combat.

        <p class="note">
          See the <a href="http://golem-studios.com/d10handbook.php#ritualsOverviewSection" class="internalLink">Rituals Section</a> for details
        </p>

        Need to rework this section after changes.
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!--End Abilitiy Overview -->



     <!-- Exploring Worlds -->
    <section class="section" id="exploringWorldsSection">
      <header class='hideWrapper sectionHeader'>
        <button id="showexploringWorlds" class="hidden showButton" onclick="show('exploringWorlds');">Exploring Worlds</button>
        <button id="hideexploringWorlds" class="hide" onclick="hide('exploringWorlds');">[&#8213;]</button>
      </header>
      <article id="exploringWorlds" class="sectionBody">
        <h1>Exploring Worlds</h1>
        <div class="divider"></div>
        <i><p class="wordNote">Not all who wander are lost</i> <br/>- JRR Tolkien </p>
        <i><p class="wordNote">Only those who risk going too far can possibly find out how far one can go. </i> <br/>- T.S. Eliot </p>
        <i><p class="wordNote">We shall not cease from exploration, and the end of all our exploring will be to arrive where we started and know the place for the first time. </i> <br/>- T.S. Eliot </p>
        <p class="wordNote"><b>Prae: before or in front</b></p>
        <br/>

        <span class="indent40"> </span> Exploration has always been a key component of RPGs and can take on many forms - adventuring, scouting, infiltration, homesteading, diplomacy, investigating, and much more. Some games can spend their entire campaign explore a single city, while others might venture into wildlands, focus on a variety of cultures or conflicts. Skills and abilities are the primary tools players have to explore, and a characters health, mana, money, and relationships are the resources at their fingertips. 
      </article>


      <footer class="sectionFooter">
      </footer>
    </section> 
    <!-- End Exploring Worlds -->



    <!-- Travel  -->   
    <section class="section" id="TravelSection">
        <header class='sectionHeader hideWrapper'>
          <button id="showTravel" class="hidden showButton" onclick="show('Travel');">Show Travel</button>
          <button id="hideTravel" class="hide" onclick="hide('Travel');">[&#8213;]</button>  
        </header>

      <article id="Travel" class='sectionBody'>
        <h1>Travel</h1>
        <div class="divider"> </div>

        <span class="indent40"> </span>
        Characters travel, sometimes for an hour across a large city othertimes for days or weeks. Travel is tiring both physically and mentally. Physically generally due to aspects of the environment, long hours in route, and wanting to get to where you're going as fast as possible due to the boredom of the road and the very real threats that exist in the wilds. Mentally in part due to the boredom, the discomfort, and needing to constantly be alert enough to notice threats. 

        <br/><span class="indent40"> </span>
        At the end of your travel day you gain a number of fatigue (<abbr class="day">day</abbr> <abbr class="impaired">impaired</abbr>) per hour you traveled - your passive endurance+poise. Most of the time you'll get can get a good nights sleep and your dreams will wash your fatigue away. Others you will need to carefuly budget your travel time based on additional fatigue you accrued during the day and the likelihood if getting a full nights sleep. 


        <br/><span class="indent40"> </span>
        You live in a magical world, anyone with a conjure element ritual can spend a couple mana to create a sufficient amount of food and water for a small party each day. Magic affords various other luxuries on the trail as well. But remember your world is monstrous as well. Use of magic attracts the attention of Faen. How safe you travels are is largely in your hands, preparation to minimize reliance on interactions with Fae make for much safer journey. 


        <h2>Time</h2>
        <span class="indent40"> </span>

        Tracking time is important to make world feel alive, no less so when traveling. Find a system that works for your group that helps deal with the paperwork of doing so. A calendar is very useful to track days, and it allows you be aware of upcoming events in the world while also helping the group imagine what is going on in the world around them on any given day. 

        <br/> <span class="indent40"> </span>

        During some days hours become important. When you want to track the routine of what characters in the world are doing throughout the day, meeting characters at certain times, certain events might happen through out the day, or when traveling between cities or around a large one the passage of time can and should dictate player choices, having a strip on the calendar that can track them helps track what different characters are doing with their time during the day. 
        
        <br/> <span class="indent40"> </span>
        
        To make the world really come alive the GM may want the world to remain in motion around the players. They may have a laid out plan of events that happen on certain days at certain times and you may not be able to interact with all of the events. You can track hours with a strip around the calendar divided into 24 blocks. You can even place character tokens there to represent where they are in their day as other players are acting in the world. Each player can also use dice to track how far along they are in the day.  

        <br/><span class="indent40"> </span> 
        Dice are also important for tracking time as the action ramps up. You can use dice to keep track of minutes and rounds when the scene calls for those resolutions of time. A Round of combat is 6 seconds, 10 rounds to a minute. Tracking the round number you are in can also be a nice to keep track of the momentum of the combat. 

        <p class="note"><a href="https://docs.google.com/spreadsheets/d/1zc67aJYBKkxARSc7mMF8R5XOaJq0uYkb1q1KTFzOmZA/edit?usp=sharing">Traea Calendar</a>
        

        <h2>Travel and Pace</h2>
        <span class="indent40"> </span> 

        Characters travel speed is dependent on their pace, or the pace of what they are riding on. Pace represents a speed that is not leisurely but is also slow enough to be maintained for hours. A pace is 1 foot per second. With the base pace of 6 a character travels 6 feet per second or 4 miles per hour (6.5kpm). 

        <h3>Running</h3>
        <span class="indent40"> </span> 
        Characters can choose to run, how fast they can passively run depends on their athletics, and for every 10 minutes of running they must pass the related an endurance check or gain fatigue.

        <br/><br/>

        An expert in athletics and trained in endurance with a might of 2 can run a two hour marathon but gains two levels of fatigue. 

        <h3>Traveling in difficult terrain</h3>
        <span class="indent40"> </span> 

        Various aspects of terrain can make travel diffcult, swamps, dense forest, changing elevation, crowded streets, etc. Terrain is given a rating relative to how diffcult it is to travel through, an area with Difficult Terrain 2 requires two extra seconds to cover a 1 of distance. A character moving at a Pace of 6 effectively has a Pace of 2 while traveling in an area that is Difficult Terrain 2, reducing their speed of travel to a little less than 1.5mph (2.2kpm).  

        <br/><br/>
        <i>Travel Speed Table</i>

        <button id="hidetravelSpeedTable" class="hide hidden" onclick="hide('travelSpeedTable');">[&#8213;]</button>
        <button id="showtravelSpeedTable" class="hide" onclick="show('travelSpeedTable');">[ + ]</button></p>
        <div id="travelSpeedTable" class="abilityFieldset hidden">
          <div class="abilityLegend ">Travel Speed Table</div>
          <div class="tableRow">
            <div class="tableHeaderLeft">Pace</div>
            <div class="tableHeader">MPH</div>
            <div class="tableHeader">KPM</div>
            <div class="tableHeader">Example</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">6</div>
            <div class="tableCell">4</div>
            <div class="tableCell">6.5</div>
            <div class="tableCell">Base Pace</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">20</div>
            <div class="tableCell">13.6</div>
            <div class="tableCell">22</div>
            <div class="tableCell">World Record Marathon/Horse at a canter</div>
          </div>
        </div>

      <h3>Stealth</h3>
      <h3>Scouting and noticing threats</h3>

      <i>Travel notes to GM, will go in gm guide eventually</i>
        <button id="hidetravelGM" class="hide hidden" onclick="hide('travelGM');">[&#8213;]</button>
        <button id="showtravelGM" class="hide" onclick="show('travelGM');">[ + ]</button></p>
      <div id="travelGM" class='hidden'>
        <h2>How to handle travel</h2>
        <span class="indent40"> </span> 

        Most of the time no meaningful conflict with pop up for the party during travel. How to handle travel is something that has plagued ttrpgs for a long time, travel is boring, but its supposed to be dangerous and a such there should be some weight to it. However, random encounters eat your time at the table and rarely offer anything meaningful to the seesion.
        <br/><br/>

        <span class="indent40"> </span>Either give a few brief sentences of their journey or use travel to add color and content to your world. Give brief description of what the party sees on the road as they travel. You can describe the terrain, make note of the weather, mention how busy the roads are, maybe they pass someone of importance on their way, or share a campfire and make a new friend and hear a rumor. If they have a strong reputation and are recognizable someone might pay them tribute or spit in their face.  


        <h2>Travel and time</h2>
        <span class="indent40"> </span>

        Time should give some important weight to travel even if you want to skip over describing and interacting with it. Living worlds move around the players even if they stand still. If the characters are traveling for months seasons pass changing what the town is doing when they return. People die in accidents, Faen raids, or fighting each other. Surprises happen, their favorite barmaid might get knocked up, or some rich old knight decides to retire in the small town. The passage of time and the color if your world changing can be enough to add sufficient weight to travel. 

        <h2>Navigation and Color</h2>
        <span class="indent40"> </span> 

        Getting lost is boring, and mechanically uninteresting, plus these characters are Prae. Unless navigation is a specific interest of your group and it can lead to meaningful gameplay or plot avoid letting players get lost. Instead navigation is an opportunity to add more color to your world. Most wilderness navigation over long distances is done by landmarks. Directions they get from NPCs are likely to look like a sequence of things they will see on their journey. 
        <br/><br/>
        <span class="indent40"> </span> 

        "Travel west until your out of the forest, travel along the forest until you get to the river. Up the river a ways you'll find a tree bigger than all the ones around it. Climb the tree and you should be able to see a arch made of rock about half a day away. From ther you'll have no trouble finding the ruins."
        
        <br/><br/>
        <span class="indent40"> </span> 

        Use descriptions such as this to give color to the travel, while also allowing the player to repeat it back to npcs for directions or remember it so they can get back to where they were in the future. 


        <h2>Travel and Content</h2>

        You can also dip into content, maybe they pass a merchant with a broken wagon that begs them to stop and help giving them a choice. If they do you might reward them with a bonus in attitude for them and possibly a bump in reputation as the traveling mechant shares their story of your kindness between the towns he visits. 

        <br/><span class="indent40"> </span> 
        
        Maybe some highwaymen try to jump them on the road, the underestimate the PCs so you do not need to engage in conflict to deal with the situation, you can just keep the game in cotent mode and let the players decide how they want to handle the situation.

        <h2>Confict and Travel</h2>

        Like everything else we to give the right amount of agency to the players. They are in a world where using mana attracts the attention of monsters, use that. The Wilds are filled monsters. Using mana while in the wilds is going to attract attention from those monsters. Parties that don't want to attract attention probably shouldn't be spending mana. Parties that are forced to spend mana probably want to high tail it away from that location, and triple check that they aren't being followed by a scouting Faen. 

        <br/><span class="indent40"> </span> 

        Unless something has the Faen particularly aggressive or the party use mana they are extremely unlikely to attract monsters. he characters grew up in this world, and they took a fairly dangerous profession. They  hear stories, myths, rumors or even have direct experience with the best ways of how to avoid the attention of Faen. Let the characters be good at avoiding them.

        <br/><span class="indent40"> </span> 

        They might evidence of Faen such as tracks, corpses, a path into the woods that radiates Fae, but assume the characters are capable of avoiding their direct attention. However, if they do use mana communicate that the stakes start to rise. You might want to stay in color at first, describe them noticing some biggish bad and effectively hiding until it wanders off. 

        <br/><span class='indent40'> </span>
        Give them obstacles, even omes they can easily overcome with gear. Using gear commits them to something it turns a flexible slot (see <a href="#gearSection" class="internalLink">gear</a> section) into a a specific item. This is a small cost in resources but it could be a meaningful one. The goal is not just to tax the players flexible slots but allow for some creative problem solving so they are not taxed, give some context to the world and its obstacles, and to set a landmark for the obstacles they that can recognize and you or they can reuse in the future. 


        <h2>Content before Conflict while traveling</h2>


        During travel it is important that you do not jump from color right into conflict. You want to be giving your player's agency, so enter into content. Instead of showing up right at the caves mouth, the all important clearing, tell them they feel they are getting close to the end of their journey and let them make decisions on how to proceed. Give them the opportunity to ask you questions, make some decisions, and choose how they want to approach or potentially avoid a coming conflict. They might want to scout the area to see if they find a different way into the ruins, set up camp and drop off some gear so they can pick stuff up in the dungeon, get a lay of the land so they know a bit more about what they are walking into etc.  


        <h2>Discoveries</h2>
        <span class="indent40"> </span> 

        Various things along the road might peak the party's interest enough to investigate. They might come across a recent fight with bloody boot prints leading off the trail. A paniced woman might run into them asking for help. While tromping through the woods they come across a ruined tower. Discoveries can offer color and content to the world. 

        <br/><span class="indent40"> </span> 
        It is important that discoveries are rarely bad, and for most of them you will want to remain in content as these are an aside from your main plot point anyway, even if they might lead into a main one in the future. The party is Prae, they are trained in combat, and unless that combat is a meaningful threat you don't need to play it out in a conflict. 

        <br/><span class="indent40"> </span> 
        
        They need to be rarely bad because you don't want your world to feel like touching it is the wrong choice for your players, they should want to and you should encourage them in interacting and learning about the world. If every ruined tower in the woods leads to a mimic why would anyone ever go near ruined towers.

      </div>
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Travel -->

    <!-- Environment  -->   
    <section class="section" id="EnvironmentSection">
        <header class='sectionHeader hideWrapper'>
          <button id="showEnvironment" class="hidden showButton" onclick="show('Travel');">Show Environment</button>
          <button id="hideEnvironment" class="hide" onclick="hide('Travel');">[&#8213;]</button>  
        </header>

      <article id="Environment" class='sectionBody'>
        <h1>Environment</h1>
        <div class="divider"> </div>
        <span class="indent40"> </span> 

        Understanding the environment is often important to understanding the choices and impact of actions the players take in the world. Weather, time of year, time of day, speed of a river, height of a hill or wall, or visibility through the trees are just some importnat aspects of the environment for making decisions. 
        <h2>Temperature</h2>
        Cold, hot, extra fatigue, ice, hot objects or gorund

        <h2>Hazards</h2>
        Fire: heat, smoke, spreading
        Quicksand: 
        Tar pit/mud pit/swamp: 
        Thin ice:
        Avalanche:
        Mud slide:
        Cave-ins:
        Pointy Plants:
        Bugs?
        <h2>Vision and Light</h2>
        Fog, Dim light, darkness, brightlight, obscured areas

        <h2>Rain and wind</h2>
        Visibility, from the rain or from sand and dirt being thrown around by the wind. 

        <h2>Height/Elevantion</h2>
        <h2>Underwater</h2>
        Movement, suffocating, visibility, 

        <h2>Food and Water</h2>
        Difficulty in finding it

        <h2>Poison and disease</h2>


      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Travel -->
      


    <!-- Using Skills -->
    <section class="section" id="skillUseSection">
      <header class="sectionHeader hideWrapper">
        <button id="showskillUse" class="hidden showButton" onclick="show('skillUse');">Using Skills</button>
        <button id="hideskillUse" class="hide" onclick="hide('skillUse');">[&#8213;]</button>  
      </header>

      <article id="skillUse" class="sectionBody">
        <h1>Using Skills</h1>
        <div class="divider"></div>
        <span class="indent40"> </span> 

        As engage with the world you will often need to use their skills to gain information about, interact with, or overcome obstacles in the game world.

        <br/><span class="indent40"> </span>

        After announcing your intent to use a skill the GM give will give you the context of the check and then you'll want to determine the difficulty of its use. Until you roll you can change your mind about taking the action. 
        
        <h2>Context of checks</h2>
        <span class="indent40"> </span>
        <b>Context</b> determines the risk associated with skill use. Prior to a player making a skill roll the GM makes a judgement on the context. Context is influenced by what is at stake, narrative tension, and cost of failure given the context of the trask. There are three options the GM will pick between to decide context: <b>Controlled</b>, <b>Common</b>, or <b>Dangerous</b>.
        
        <br/>

        <span class="indent40"> </span>

        <b>Controlled</b> checks help inform the narrative, act as a tool to inspire creativity, and are used when there are varying levels of potential success but no meaningful failure. The result will always determine how much success there is, there is no cost to failure when making a controlled check. The minimum you can on a Controlled roll is your passive value. 

        <p class="wordNote"><i>Examples</i> 

        <button id="hideControlledExamples" class="hide hidden" onclick="hide('ControlledExamples');">[&#8213;]</button>
        <button id="showControlledExamples" class="hide" onclick="show('ControlledExamples');">[ + ]</button></p>

        <blockquote id="ControlledExamples" class="hidden">
          <u>Sneak used to determine the guard pattern of a noble's house</u><br/>
          • Controlled if you safely observe the guards as they patrol<br/>
          - Result determines how large of a hole you find in their watch<br/>
          <br/>
          <u>Lore used to recall what you've heard about the town of Nightstone</u><br/>
          • Controlled if you've access to a scholar or book on the subject<br/>
          - Result determines how much you about Nightstone.
          <ul>
            <li>5: Jim the Giant has been the guardian Faen for the village of Nightstone town for 30 years. </li>
            <li>7: Jim is said to live 20 miles to the north of town</li>
            <li>9: Roger is the townsman that created the pact with the Faen and his descendants today are still the representiatives in the town that maintain the peace</li>
            <li>11: you happen to have the exact location of Jim's cave on your map. </li>
            <li>13: you also happen to have the exact location of Al house in town on your map and his descendant in charge of the pact is named Felia.  </li>
          </ul>  
          <u>Tinkering used to disable a trap</u><br/>
          • Controlled when you don't have any immediate time pressure<br/>
          - Result determines the time to disable and if you can recover the trap.
          <ul>
            <li>TN 4: 1 hour</li>
            <li>TN 5: 50 minutes</li>
            <li>TN 9: 10 minutes</li>
            <li>TN 10: 5 minutes or 30 minutes and can recover the trap</li>
            <li>TN 13: 1 mintue or 10 minutes and can recover the trap</li>
          </ul>
          <u>Charm used to get the local barkeep to like you</u><br/>
          • Controlled when time isn't a factor to your attempt.<br/>
          - Resullt: How much of a change in attitude you can create. 
          <ul>
            <li>TN 5: Increases attitude by 1</li>
            <li>TN 8: Increases attitude by 2</li>
            <li>TN 11: Increases attitude by 3</li>
            <li>TN 14: Increases attitude by 4</li>
          </ul>


        <h3>GM notes</h3>

        Controlled checks are a great way to help you shape narrative on the fly. If the a player is trying to study the guard patterns of a noble house a controlled sneak check can tell you how effective their defenses are relative to sneaking by them. If the player rolls well maybe the player made some great observations, or maybe something is causing their defenses to be particularily weak at this time, if so what could that be?
        
        <br/><br/>
        
        Information checks: The more obscure the information that harder the TN, asking about the mayor of a town that almost no one goes to is likely to be a very high TN. Knowing the leader of a prominent nation much lower. 
        
        </blockquote>
        </p>

        <span class="indent40"> </span> 

        <b>Common</b> checks are unsupsrisingly the most frequent context. Most of the time when you are trying to act on the world you'll do so in the common context. Common checks have meaningful but not disastrous or lethal failure. Success means you peform the action you are taking. If you fail the GM will make various judgement calls based on the skill used, circumstances surrounding the roll, and how much the roll failed by to determine the impact of the failure. 
        
        <br/>
        <i><p class="wordNote">Examples of fail types</i>
          <button id="hideCommonJumpExamples" class="hide hidden" onclick="hide('CommonJumpExamples');">[&#8213;]</button>
          <button id="showCommonJumpExamples" class="hide" onclick="show('CommonJumpExamples');">[ + ]</button>

          <ul id="CommonJumpExamples" class="hidden">
            <u>Jumping from rooftop to rooftop:</u><br/>
            • Minor failure: You grab the edge of the opposing rooftop, but lose time having to pull yourself up and get back on your feet.<br/>
            • Moderate failure: You make the jump but injure your ankle reducing your pace by 1 and impairing all physical rolls.<br/>
            • Major failure: You are overcome by a sudden fear that you can't make the jump, stopping short. You gain a spiritual injury, until you overcome it you are too fearful to attempt jump rolls of that TN or greater.<br/>
        </ul>
        </p>

        <p class="wordNote"> <i>Examples similar to Controlled checks</i>
        <button id="hideCommonExamples" class="hide hidden" onclick="hide('CommonExamples');">[&#8213;]</button>
        <button id="showCommonExamples" class="hide" onclick="show('CommonExamples');">[ + ]</button>
         <blockquote id="CommonExamples" class="hidden">
          <u>Sneak used to reach a specific spot with guards on active duty</u><br/>
          • Minor Failure: A guard noticed something and they are now all on alert, the Context is now Dangerous<br/>
          • Moderate Failure: You reach your destination then draw attention, guards are now moving toward your location<br/>
          • Major Failure: You are seen by the guards as you approach<br/><br/>

          <u>Lore to recall knowledge to maintain a disguise.</u><br/>
          • Minor Failure: Someone notices deception and subtly lets you know they expect a favor to not out you.<br/>
          • Moderate Failure: Suspicision increases the Context is now Dangerous<br/>
          • Major Failure: They see your deception<br/><br/>

          <u>Tinkering, disable a trap quietly to not alert monsters in the next room </u><br/>
          • Minor Failure: You can choose to disable the trap but not quietly unless you take an injury<br/>
          • Moderate Failure: You fail to disable it quietly, and if you retry you'll alert the monsters <br/>
          • Major Failure: You jammed the device the only way to disable it now is to set it off<br/><br/>

          <u>Charm a local tavern girl before her father returns from the kitchen </u><br/>
          • Minor Failure: You can choose to increase their attitude but it cost an extra you 10g in drinks and tips<br/>
          • Moderate Failure: You fail to increase their attitude and still spend the time and resources of your attempt<br/>
          • Major Failure: You fail to increase their attitude and friend of her father notices your attempt<br/><br/>
         </blockquote>
        </p>

     
        <span class="indent40"> </span><b>

        Dangerous </b> checks occur when the narrative tension is high or the circumstances or action is dangerous.
        Success is identical to Common checks. 
        Failure is a Blunder.
        When you Blunder the result will be the opposite of what you were trying to do, create a significant problem, or both. 

        <p class="wordNote"> <i> Examples similar to the checks above</i>
        <button id="hideDangerousExamples" class="hide hidden" onclick="hide('DangerousExamples');">[&#8213;]</button>
        <button id="showDangerousExamples" class="hide" onclick="show('DangerousExamples');">[ + ]</button>
         <blockquote id="DangerousExamples" class="hidden">
          <u>Sneak when the guards are already alerted</u><br/>
          • Blunder: You give away your exact location and they know where you were trying to go<br/>
          • Blunder: You give away your exact location and you tipped off where others might be<br/>
          • Blunder: You give away your exact location by tripping and injuring yourself<br/><br/>

          
          <u>Lore to recall a towns laws</u>
          • Blunder: You recall that bowing is the formal body-language for a greeting that shows respect. When it actually shows disrespect as displaying body-language that makes you vulnerable to attack implies they are too weak to be a threat. <br/>
          • Blunder: You recall that you should eat quietly. When slurping your meal is a sign of respect to the chef<br/>
          • Blunder: You recall that it is customary to bring gifts. When it actually implies your host is poor.<br/><br/>

          <u>Tinkering to quietly disable a trap as to not alert monsters in the next room</u><br/>
          • Blunder: you set off the trap, which alerts the monsters in the next room<br/><br/>

          <u> Charm a local tavern girl before her father returns from the kitchen</u><br/>
          • Blunder: She's dislikes you instead of liking you more<br/>
          • Blunder: You get nowhere and a couple locals step up to defend her from you, depending on how you handle that situation you could reduce reputation in the entire town<br/>
          • Blunder: She doesn't like you more and you talk her into liking one of your enemies<br/>

         </blockquote>
        </p>
        <p class="wordNote"> <i>Basic examples of Blunders per skill</i>
        <button id="hideDangerousExamples2" class="hide hidden" onclick="hide('DangerousExamples2');">[&#8213;]</button>
        <button id="showDangerousExamples2" class="hide" onclick="show('DangerousExamples2');">[ + ]</button>
        <ul id="DangerousExamples2" class="hidden">
          <li>Athletics to climb a cliff - You fall injuring or damaging yourself</li>
          <li>Force a gate open - you injure yourself you are impaired with physical skill checks until a long rest</li>
          <li>Acrobatics to reduce falling damage - try to roll but instead fall on your arm, increased damage</li>
          <li>Sneak - You think your sneaking, or at the worst time you trip and draw attention to yourself</li>
          <li>Endurance to sustain swimming - You are to exhausted to move any further and start to drown</li>
          <li>Poise to resist being knocked down - you not only fall but grab on to something near you as you doing bringing it down with you</li>
          <li>Lore - You get local customs backward or think there is magic in an area where there is none</li>
          <li>Survival in gathering food - you don't get food and scare away game for a number of days</li>
          <li>Deception to make a diguise - You fail to make the disguise and ruin all materials you have to make further ones</li>
          <li>Insight to see if someone is lying - You think everything they say is a lie/everything they say is tru</li>
          <li>Tinkering - You break the device you are trying to manipulate</li>
          <li>Awareness to looking for sneaking enemies - You're so confident nothing is there they can easily sneak by you</li>
          <li>Compel - They don't do want you want and their attitude toward you decreases</li>
          <li>Rouse - You dampen the mood instead of elevate it</li>
          <li>Charming to increase attitude - They like you less instead of more</li>
          <li>Handling - you elevate the mood instead of dampeninng it</li>
          <li>Diplomacy - Instead of fixing the breach in social contract you make it worse</li>
          <li>Leadership - They don't do what you want and their trust in you decreases</li>
        </ul>
        </p>

        <h2>Using skills passively</h2>
        <span class="indent40"> </span>When making a Common check a player can always choose to use their passive value instead of rolling.
        <p class="wordNote"> The <b>passive value</b> of a skill is: 2 + dice to be rolled + Mod</p><br/>
        <span class="indent40"> </span> Passive value represents how the character can consistently perform without taking any risk or pushing themselves.
        In combat characters can use their skills with their passive value without needing to use their Focus.

        <p class="wordNote"><i>Example</i>
        <button id="hidepassiveExample" class="hide hidden" onclick="hide('passiveExample');">[&#8213;]</button>
        <button id="showpassiveExample" class="hide" onclick="show('passiveExample');">[ + ]</button>
        <blockquote id="passiveExample" class="hidden">
        A character wants to jump over a 6 foot fence a TN 8 common check (see <a href="#athleticsSection" class="internalLink ">Athletics</a>). They have an passive athletics of 7 which isn't sufficient to succeed so the character would need to roll and in combat that roll would require a Focus action to attempt.</blockquote>
        </p>
        <h2>Determining Difficulty</h2>
        <span class="indent40"> </span> In each skill's section there is a guideline for <b>Determining Difficulty</b>, this is to give you significant control over the risks you choose to take as a player. Prior to rolling check with the GM for any environmental or circumstantial modifiers to the diffculty your character would be aware of. Additionally there are times when information is hidden to you as a player that can affect difficulty, this may often be the case with social skills, don't over reach when you aren't entirely sure of the circumstances. 

        <br/><br/>
        Here is a general list of what TN represents, in addition to TN a check might require a minimum level of skill rank to attempt. 
        <!-- 
        <br/> <span class="indent40"> </span>
        When performing an action in the world, unless there are conditions that change the difficutly, you can refer to this guide before you roll for your TN. However, in many cases some of the difficulty will be hidden from you before the roll because of variables your character is unaware and you won't know your TN before you roll. In such cases you can ask your GM how hard your character thinks it might be, sometimes your character won't know and other times they might have a good guess at general difficulty. Some actions simply can't be performed no matter how well you roll, which can often by the case in social actions. 

        <br/><br/>
        I.e. You can't just Compel anyone to kill themselves and hope to roll well enough that they will. 
        -->
        
        <ul>
          <li>5: Moderately easy, anyone Trained can passively succeed </li>
          <li>9: Moderately difficult, until a character is Adept with the skill or has Attributes that lend themselves to success they will fail most of the time. Only those with very skilled and/or naturally inclined through attributes.</li>
          <li>12: Very Difficult, only the top of the top can consistently perform at this level, about equivalent with the world record performers in our world. Passive success requires maximum Skill Rank and natural inclination. </li>
          <li>14: Nearly impossible, most people would view it as ridiculously foolish to even attempt</li>
          <li>15+: Success at this level is generally explained through magic. It can't be achieved without Critical Marks or some effect that gives a bonus modifier.</li>
          <!--  Examples: Athletics/Acrobatics to climb across a ceiling, Diplomacy to convince a enemy in the middle of combat to stay give discussion a second chance, Deception to convince someone for a short time of a lie that is obviously untrue. -->
        </ul>

        <div id="" class="abilityFieldset">
          <div class="abilityLegend gLegend tableLegend centerText">Highest Value</div>
          <div class="gLegend yLegend yDiceLegend">Dice</div>
          <div class="flex abilityField gField">
            <div class="bold diceCell"></div>
            <div class="bold diceCell">10</div>
            <div class="bold diceCell">9</div>
            <div class="bold diceCell">8</div>
            <div class="bold diceCell">7</div>
            <div class="bold diceCell">6</div>
            <div class="bold diceCell">5</div>
            <div class="bold diceCell">4</div>
            <div class="bold diceCell">3</div>
            <div class="bold diceCell">2</div>
          </div>
          <div class="flex abilityField gField">
            <div class="diceCell bold">1</div>
            <div class="diceCell">10%</div>
            <div class="diceCell">20%</div>
            <div class="diceCell">30%</div>
            <div class="diceCell">40%</div>
            <div class="diceCell">50%</div>
            <div class="diceCell">60%</div>
            <div class="diceCell">70%</div>
            <div class="diceCell">80%</div>
            <div class="diceCell">90%</div>
          </div>
          <div class="flex abilityField gField">
            <div class="diceCell bold">2</div>
            <div class="diceCell">19%</div>
            <div class="diceCell">36%</div>
            <div class="diceCell">51%</div>
            <div class="diceCell">64%</div>
            <div class="diceCell">75%</div>
            <div class="diceCell">85%</div>
            <div class="diceCell">91%</div>
            <div class="diceCell">96%</div>
            <div class="diceCell">99%</div>
          </div>
          <div class="flex abilityField gField">
            <div class="diceCell bold">3</div>
            <div class="diceCell">27%</div>
            <div class="diceCell">49%</div>
            <div class="diceCell">66%</div>
            <div class="diceCell">78%</div>
            <div class="diceCell">88%</div>
            <div class="diceCell">94%</div>
            <div class="diceCell">97%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
          </div>
          <div class="flex abilityField gField">
            <div class="diceCell bold">4</div>
            <div class="diceCell">34%</div>
            <div class="diceCell">59%</div>
            <div class="diceCell">76%</div>
            <div class="diceCell">87%</div>
            <div class="diceCell">94%</div>
            <div class="diceCell">97%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
          </div>
          <div class="flex abilityField gField">
            <div class="diceCell bold">5</div>
            <div class="diceCell">41%</div>
            <div class="diceCell">67%</div>
            <div class="diceCell">83%</div>
            <div class="diceCell">92%</div>
            <div class="diceCell">97%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
          </div>
          <div class="flex abilityField gField">
            <div class="diceCell bold">6</div>
            <div class="diceCell">47%</div>
            <div class="diceCell">74%</div>
            <div class="diceCell">88%</div>
            <div class="diceCell">95%</div>
            <div class="diceCell">98%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
          </div>
          <div class="flex abilityField gField">
            <div class="diceCell bold">7</div>
            <div class="diceCell">52%</div>
            <div class="diceCell">79%</div>
            <div class="diceCell">92%</div>
            <div class="diceCell">95%</div>
            <div class="diceCell">98%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
          </div>
          <div class="flex abilityField gField">
            <div class="diceCell bold">8</div>
            <div class="diceCell">57%</div>
            <div class="diceCell">83%</div>
            <div class="diceCell">94%</div>
            <div class="diceCell">98%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
          </div>
          <div class="flex abilityField gField">
            <div class="diceCell bold">9</div>
            <div class="diceCell">61%</div>
            <div class="diceCell">87%</div>
            <div class="diceCell">88%</div>
            <div class="diceCell">96%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
          </div>
          <div class="flex abilityField gField">
            <div class="diceCell bold">10</div>
            <div class="diceCell">65%</div>
            <div class="diceCell">89%</div>
            <div class="diceCell">97%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
            <div class="diceCell">99%</div>
          </div>
        </div>
  
      <h3>Expected Marks</h3>
         <div id="" class="abilityFieldset">
          <div class="abilityLegend gLegend tableLegend centerText">Critical Range</div>
          <div class="gLegend yLegend yDiceLegend">Dice</div>
          <div class="flex gField abilityField">
            <div class="diceCell bold"></div>
            <div class="diceCell bold">10</div>
            <div class="diceCell bold">9</div>
            <div class="diceCell bold">8</div>
            <div class="diceCell bold">7</div>
            <div class="diceCell bold">6</div>
            <div class="diceCell bold">5</div>
            <div class="diceCell bold">4</div>
            <div class="diceCell bold">3</div>
            <div class="diceCell bold">2</div>
          </div>
          <div class="flex gField abilityField">
            <div class="diceCell bold">1</div>
            <div class="diceCell">0.1</div>
            <div class="diceCell">0.2</div>
            <div class="diceCell">0.3</div>
            <div class="diceCell">0.4</div>
            <div class="diceCell">0.5</div>
            <div class="diceCell">0.6</div>
            <div class="diceCell">0.7</div>
            <div class="diceCell">0.8</div>
            <div class="diceCell">0.9</div>
          </div>
          <div class="flex gField abilityField">
            <div class="diceCell bold">2</div>
            <div class="diceCell">0.4</div>
            <div class="diceCell">0.6</div>
            <div class="diceCell">0.8</div>
            <div class="diceCell">1</div>
            <div class="diceCell">1.2</div>
            <div class="diceCell">1.4</div>
            <div class="diceCell">1.6</div>
            <div class="diceCell">1.8</div>
            <div class="diceCell">2</div>
          </div>
          <div class="flex gField abilityField">
            <div class="diceCell bold">3</div>
            <div class="diceCell">0.9</div>
            <div class="diceCell">1.2</div>
            <div class="diceCell">1.5</div>
            <div class="diceCell">1.8</div>
            <div class="diceCell">2.1</div>
            <div class="diceCell">2.4</div>
            <div class="diceCell">2.7</div>
            <div class="diceCell">3.0</div>
            <div class="diceCell">3.3</div>
          </div>
          <div class="flex gField abilityField">
            <div class="diceCell bold">4</div>
            <div class="diceCell">1.5</div>
            <div class="diceCell">1.9</div>
            <div class="diceCell">2.3</div>
            <div class="diceCell">2.7</div>
            <div class="diceCell">3.1</div>
            <div class="diceCell">3.5</div>
            <div class="diceCell">3.9</div>
            <div class="diceCell">4.3</div>
            <div class="diceCell">4.7</div>
          </div>
          <div class="flex gField abilityField">
            <div class="diceCell bold">5</div>
            <div class="diceCell">2.2</div>
            <div class="diceCell">2.7</div>
            <div class="diceCell">3.2</div>
            <div class="diceCell">3.7</div>
            <div class="diceCell">4.2</div>
            <div class="diceCell">4.7</div>
            <div class="diceCell">5.2</div>
            <div class="diceCell">5.7</div>
            <div class="diceCell">6.2</div>
          </div>
          <div class="flex gField abilityField">
            <div class="diceCell bold">6</div>
            <div class="diceCell">3.1</div>
            <div class="diceCell">3.7</div>
            <div class="diceCell">4.3</div>
            <div class="diceCell">4.9</div>
            <div class="diceCell">5.5</div>
            <div class="diceCell">6.1</div>
            <div class="diceCell">6.7</div>
            <div class="diceCell">7.3</div>
            <div class="diceCell">7.9</div>
          </div>
          <div class="flex gField abilityField">
            <div class="diceCell bold">7</div>
            <div class="diceCell">4</div>
            <div class="diceCell">4.7</div>
            <div class="diceCell">5.4</div>
            <div class="diceCell">6.1</div>
            <div class="diceCell">6.8</div>
            <div class="diceCell">7.5</div>
            <div class="diceCell">8.2</div>
            <div class="diceCell">8.9</div>
            <div class="diceCell">9.6</div>
          </div>
          <div class="flex gField abilityField">
            <div class="diceCell bold">8</div>
            <div class="diceCell">5</div>
            <div class="diceCell">5.8</div>
            <div class="diceCell">6.6</div>
            <div class="diceCell">7.4</div>
            <div class="diceCell">8.2</div>
            <div class="diceCell">9</div>
            <div class="diceCell">9.8</div>
            <div class="diceCell">10.6</div>
            <div class="diceCell">11.4</div>
          </div>
          <div class="flex gField abilityField">
            <div class="diceCell bold">9</div>
            <div class="diceCell">6</div>
            <div class="diceCell">6.9</div>
            <div class="diceCell">7.8</div>
            <div class="diceCell">8.7</div>
            <div class="diceCell">9.6</div>
            <div class="diceCell">10.5</div>
            <div class="diceCell">11.4</div>
            <div class="diceCell">12.3</div>
            <div class="diceCell">13.2</div>
          </div>
          <div class="flex gField abilityField">
            <div class="diceCell bold">10</div>
            <div class="diceCell">7.1</div>
            <div class="diceCell">8.1</div>
            <div class="diceCell">9.1</div>
            <div class="diceCell">10.1</div>
            <div class="diceCell">11.1</div>
            <div class="diceCell">12.1</div>
            <div class="diceCell">13.1</div>
            <div class="diceCell">14.1</div>
            <div class="diceCell">15.1</div>
          </div>
        </div>
        <!--
        <h2>Expected Marks</h2>
        <div class="chanceTable">
          <div class="chanceTableHeaderX">Critical Range</div>
          <div class="chanceTableHeaderY">DICE</div>
          <div class="chanceRow">
            <div class="changeTableHeader chanceEntry"></div>
            <div class="changeTableHeader chanceEntry">10</div>
            <div class="changeTableHeader chanceEntry">9</div>
            <div class="changeTableHeader chanceEntry">8</div>
            <div class="changeTableHeader chanceEntry">7</div>
            <div class="changeTableHeader chanceEntry">6</div>
            <div class="changeTableHeader chanceEntry">5</div>
            <div class="changeTableHeader chanceEntry">4</div>
            <div class="changeTableHeader chanceEntry">3</div>
            <div class="changeTableHeader chanceEntry">2</div>
          </div>
          <div class="chanceRow">
            <div class="changeTableHeader chanceEntry">2</div>
            <div class="chanceEntry">0.4</div>
            <div class="chanceEntry">0.6</div>
            <div class="chanceEntry">0.8</div>
            <div class="chanceEntry">1</div>
            <div class="chanceEntry">1.2</div>
            <div class="chanceEntry">1.4</div>
            <div class="chanceEntry">1.6</div>
            <div class="chanceEntry">1.8</div>
            <div class="chanceEntry">2.0</div>
          </div>
          <div class="chanceRow">
            <div class="changeTableHeader chanceEntry">3</div>
            <div class="chanceEntry">0.9</div>
            <div class="chanceEntry">1.2</div>
            <div class="chanceEntry">1.5</div>
            <div class="chanceEntry">1.8</div>
            <div class="chanceEntry">2.1</div>
            <div class="chanceEntry">2.4</div>
            <div class="chanceEntry">2.7</div>
            <div class="chanceEntry">3.0</div>
            <div class="chanceEntry">3.3</div>
          </div>
          <div class="chanceRow">
            <div class="changeTableHeader chanceEntry">4</div>
            <div class="chanceEntry">1.5</div>
            <div class="chanceEntry">1.9</div>
            <div class="chanceEntry">2.3</div>
            <div class="chanceEntry">2.7</div>
            <div class="chanceEntry">3.1</div>
            <div class="chanceEntry">3.5</div>
            <div class="chanceEntry">3.9</div>
            <div class="chanceEntry">4.3</div>
            <div class="chanceEntry">4.7</div>
          </div>
          <div class="chanceRow">
            <div class="changeTableHeader chanceEntry">5</div>
            <div class="chanceEntry">2.2</div>
            <div class="chanceEntry">2.7</div>
            <div class="chanceEntry">3.2</div>
            <div class="chanceEntry">3.7</div>
            <div class="chanceEntry">4.2</div>
            <div class="chanceEntry">4.7</div>
            <div class="chanceEntry">5.2</div>
            <div class="chanceEntry">5.7</div>
            <div class="chanceEntry">6.2</div>
          </div>
          <div class="chanceRow">
            <div class="changeTableHeader chanceEntry">6</div>
            <div class="chanceEntry">3.1</div>
            <div class="chanceEntry">3.7</div>
            <div class="chanceEntry">4.3</div>
            <div class="chanceEntry">4.9</div>
            <div class="chanceEntry">5.5</div>
            <div class="chanceEntry">6.1</div>
            <div class="chanceEntry">6.7</div>
            <div class="chanceEntry">7.3</div>
            <div class="chanceEntry">7.9</div>
          </div>
          <div class="chanceRow">
            <div class="changeTableHeader chanceEntry">7</div>
            <div class="chanceEntry">4.0</div>
            <div class="chanceEntry">4.7</div>
            <div class="chanceEntry">5.4</div>
            <div class="chanceEntry">6.1</div>
            <div class="chanceEntry">6.8</div>
            <div class="chanceEntry">7.5</div>
            <div class="chanceEntry">7.2</div>
            <div class="chanceEntry">7.7</div>
            <div class="chanceEntry">8.4</div>
          </div>
          <div class="chanceRow">
            <div class="changeTableHeader chanceEntry">8</div>
            <div class="chanceEntry">5.0</div>
            <div class="chanceEntry">5.8</div>
            <div class="chanceEntry">6.6</div>
            <div class="chanceEntry">7.4</div>
            <div class="chanceEntry">8.2</div>
            <div class="chanceEntry">9.0</div>
            <div class="chanceEntry">9.8</div>
            <div class="chanceEntry">10.6</div>
            <div class="chanceEntry">11.4</div>
          </div>
          <div class="chanceRow">
            <div class="changeTableHeader chanceEntry">9</div>
            <div class="chanceEntry">6.0</div>
            <div class="chanceEntry">6.9</div>
            <div class="chanceEntry">7.8</div>
            <div class="chanceEntry">8.7</div>
            <div class="chanceEntry">9.6</div>
            <div class="chanceEntry">10.5</div>
            <div class="chanceEntry">11.4</div>
            <div class="chanceEntry">12.3</div>
            <div class="chanceEntry">13.2</div>
          </div>
          
          <div class="chanceRow">
            <div class="changeTableHeader chanceEntry">10</div>
            <div class="chanceEntry">7.1</div>
            <div class="chanceEntry">8.1</div>
            <div class="chanceEntry">9.1</div>
            <div class="chanceEntry">10.1</div>
            <div class="chanceEntry">11.1</div>
            <div class="chanceEntry">12.1</div>
            <div class="chanceEntry">13.1</div>
            <div class="chanceEntry">14.1</div>
            <div class="chanceEntry">15.1</div>
          </div>
        </div>
        <br/>
      -->

        <h2>Contested checks</h2> 
        <span class="indent40"> </span> Sometimes two or more characters directly oppose one another. They may be achieve the same thing or directly acting on the other. In these situations both characters make their checks and compare results to determine the outcome. The results of a tie depend on the nature of the contest. 
        <br/><span class="indent40"> </span> 
        In contests where participants are both trying to acheive the same thing, like a foot race, use skill ranks as tie breaker and if they still tie, they tie the contest. 
        <br/><span class="indent40"> </span> 
        In contests where one participant is acting on another a tie results in the situation being unchanged, generally this means the tie goes to the 'defender'. 

        <h2>Assisting in checks</h2>
        <span class="indent40"> </span> When a character is making a check one other character can assist them if they have at least a Basic Rank in the skill and they can reasonably describe a way they can help. Assistance grants <abbr class="boosted">Boosted</abbr> for the roll. 

        <h2>Ambuiguity/Versatility in checks</h2>
        <span class="indent40"> </span> Sometimes it can be unclear which skill to use for the action a character is taking. In these situations talking about the specific outcome you are trying to achieve can add some clarity. If there is still ambiguity it is up to you as a player to decide which skill you are trying to use, but understand that the context or difficulty might change based on which skill you are using to address a situation. 

        <br/><br/>
        I.e. Either Athletics or Acrobatics can be used for Jumping or Climbing checks.

       

        <p class="note">
        The skills listed in this book do not represent everything that characters in the world can do. Rather the list of skills is meant to encompass common skills for those that go before. Crafting skills are one example of a type of skill that has omitted as adventuring life does not lends itself toward them, but many NPCs would have various training in skills not listed here. </p>
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Skill List -->

    <!-- Health -->   
    <section class="section" id="HealthSection">
        <header class='sectionHeader hideWrapper'>
          <button id="showHealth" class="hidden showButton" onclick="show('Health');">Show Health</button>
          <button id="hideHealth" class="hide" onclick="hide('Health');">[&#8213;]</button>  
        </header>

      <article id="Health" class='sectionBody'>
        <h1>Health</h1>
        <div class="divider"> </div>
        <span class="indent40"> </span> Life of those who Prae is dangerous and those who choose it frequently experience physical, mental and emotional stress, damage, or trauma.

        <h2>HP and Damage</h2>
        <span class="indent40"> </span> 
        Hit points (HP) represent this combination of a characters physical durability, mental fortitude, and will to live. 
        Whenever something takes damage subtract that damage from their HP.
        <br/><span class="indent40"> </span> 
        Narratively it is common to represent damage to PCs above 0 health with shallow bruises and cuts, fear or doubt, or physical and mental exhaustion. Once a character reachs 0 HP they've taken sufficient damage to get take a serious injury.


        <h2>Health Categories and Healing</h2>
        <span class="indent40"> </span>Hit Points above 0 are divided into 3 categories: <b>Unscathed</b>, <b>Marred</b>, and <b>Desperate</b>. Each one representing a third of a characters health and starts with 10 HP. As a character increases in level each category increases by 2, for a total increase of 6 Maximium Hit Points per level. 
        <br/><span class="indent40"> </span> Narratively health categories are an abstract representation of how well a thing is holding up but they also have a mechanical effect. 
        
        <br/><span class="indent40"> </span> 
        Some effects will restore hit points, healing the harm the character has received. 
        Imagine healing as gaining renewed confidence, mentally shrugging off emotional impairments, a quick bandage, or even magically closing a wound, depending on the source of the healing.  
        A character can not be healed above the maximum of their current health category. 
         

        <h3>Reinforcement</h3>
        <span class="indent40"> </span> Reinforcing is similar to healing but has some notable differences. 
        Instead of restoring hit points it acts a new health category called Reinforce that has its HP value and duration determined by the effect. 
        This category can not be healed and healing goes to the players current health category. 
        Any damage is taken from this category before a character's current one.

        <h2>Wounds, Death, and Dying</h2>
        <span class="indent40"> </span> Upon reaching 0 HP a character enters the <b>Dying</b> health category and gains an injury. While in this category they are <abbr class="impaired">Impaired</abbr>, <abbr class="bleeding">Bleeding</abbr>, and can't be healed. 
        While in combat, at the end of each of their turns, a dying character takes 1 <abbr class="pure">Pure</abbr> damage, this damage can be prevented by stabilizing the character with a Dangerous Survival Check with a TN 5 + amount negative/3. Blunder causes 1 damage.

        <br/><span class="indent40"> </span>
        A character is dead if reduced below the range of this Health category. The range ends at -10, decreasing by 2 for each character level above 1.

        <h3>Types of Injuries</h3>
        <span class="indent40"> </span> Injuries persist after a battle, and have lasting effect on the character.
        They do not have to be physical, they can be mental or emotional.  
        Injuries can have stat based implications or be limited to the narrative. 
        GMs are free to use either or both depending on the style of game they are running or the nature and circumstances of the wound. 

        <h4>Narrative Injuries</h4>
        <span class="indent40"> </span> Injuries should be significant and lasting, especially if they are mostly narrative in nature. 
        A missing hand, eye, ear, massive facial scar or a variety of other things can have great impact on the story 
        and character while having conceivably little impact on game mechanics. 
        The character player or GM can come up with ways the character could overcome or minimize their handicap. 
        
        <br/><span class="indent40"> </span>The character could develop a hatred or fear of the type of creature that wounded them, 
        or creatures associated with them (has a reaction to people of the same ethnicity for example). 
        It could tie into the environment in which the injury happened (Ex. they become cautious or fearful of icy terrain). 
        Nightmares, insomnia, a thirst for vengeance, overly cautious, overly aggressive or a variety of other personality quirks could manifest from the Wound. 
        The Player and GM should work together to find one appropriate for the situation of the Wound and the reaction of the character.   
        <br/><br/>
        GM NOTE, for DMG: It is fine to give a injury in the middle of combat that is later changed, you could have a monster rip an ear off a character, 
        but have a character stitch it back together after the combat and the lasting wound be something more emotional. 
        <h4>Injuries with Mechanical Impact</h4>
        <span class="indent40"> </span> If using this type of injury you will generally want to keep the severity a little limited. 
        Broken bones and other temporary injuries are likely to serve the player and the story better than permanent impairments like removing body parts. 
        To recover from an injury a player must spend a number of Recovery equal to the amount negative their HP was during a long rest. These don't all have to be during the same long rest. 
        <br/><br/>
        I.e. If the player got to -7 HP the injury would take 7 Recovery to be overcome. These injuries can be physical, psychosomatic, or emotional in nature. 

        <h6>Examples of Wounds</h6>
        <ul>
        <li>Broken hand (-1 skill rank on all Physical skills)</li>
        <li>Concussion (-1 skill rank on all Mental skills)</li>
        <li>Bruised trachea (-1 skill rank on Social skills)</li>
        <li>Broken Foot or sprained ankle (-Pace)</li>
        <li>Vocal cord hemorrhage (Gagged)</li>
        <li>Hyphema or a black Eye (Blinded)</li> 
        <li>Cervicogenic dizziness (Dizzy)</li> 
        <li>Various injuries (Impeded, Dull, Distracted, etc.)</li> 
        </ul>  

      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Health -->


    <!-- Recovery -->   
    <section class="section" id="RecoverySection">
        <header class='sectionHeader hideWrapper'>
          <button id="showRecovery" class="hidden showButton" onclick="show('Recovery');">Rest and Recovery</button>
          <button id="hideRecovery" class="hide" onclick="hide('Recovery');">[&#8213;]</button>  
        </header>

      <article id="Recovery" class='sectionBody'>
        <h1>Rest and Recovery</h1>
        <div class="divider"></div>
        <span class="indent40"> </span> 

        Resting is the primary means in which characters recover from damage and fatigue. Healing is limited to the max of a character's current health category, resting is how characters regain health categories.
        To rest a character can not be in combat, any other situation of immediate threat or one that requires vigilance.
        
        <h2>Types of rest</h2>
        <span class="indent40"> </span> 

        There are three types of rest, the distinction is mostly related to the amount of time they take and how relaxed they are during the rest type.
        
        <br/><br/><span class="indent40"> </span> 
        
        A <b>breather</b> is a very brief rest, generally 1 minute but sometimes less, allowing characters to catch their breath and clear their head.
        During a breather characters heal to the top of their current health category and all <abbr class="combat">Combat</abbr> duration effects end.

        <br/><br/> <span class="indent40"> </span> 

        A <b>short rest</b> takes at least 30 minutes and often accompanied with a meal. Ends all <abbr class="rest">Rest</abbr> duration effects. 
        During a short rest a player recover a Health Category by gaining 2 fatigue. A short rest that includes a Hearty Meal removes 1 fatigue. 

        <br/><br/><span class="indent40"> </span> 

        A <b>long rest</b> can be taken up to twice per day and requires that the character sleep for that duration. The first must be at least 6 hours and the second at least 9. Each long rest removes all fatigue and recovers a Health Category. If a character is asleep between the hours of 3am and 4am they also regain Mana up to their capacity.

        <p class="note">* If a long rest is interrupted it is up to GM discretion to determine how much recovery took place and if it counts as one of the characters long rests for the day</p>

        <h2>Fatigue</h2>
        <span class="indent40"> </span>
        Characters get fatigue through various things during the course of play. Once a character has 3+(Brawn+Resolve+Faith)/3 Fatigue they gain 1 Exhaustion. Each Exhaustion <abbr class="impairs">Impairs</abbr> 
        <ul>
          <li>1 Fatigue to use Cleanse as a Focus</li>
          <li>2 Fatigue during a short or long rest to restore a Health Category</li>
          <li>While injured Fatigue is gained after a long rest and the severity of the injury is reduced.</li>
        </ul>
        
        <h2>Exhaustion</h2>
        <span class="indent40"> </span>

        For each fatigue a character has beyond their limit they instead become exhausted. If a character gets 3 levels of exhaustion they die. One instance of exhaustion can be removed by taking two long rests during a day, a total of 17 hours of rest.

        <h2>Relaxing - optional rule</h2>
        <span class="indent40"> </span> This is mostly to add depth to character personaity. Players will need to pick 3 things that their character finds relaxing. Bath, fine dining, conversation, drinking, reading, a specific hobby (sewing, training, crafting), a specific type of entertainment (sport, theater, music). If a character spends 2 hours during a day doing one of these activities they gain 1 Recovery. 



      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Recovery -->

    <!-- Out of Combat Maneuvers -->
    <section class="section" id="OOCManeuversSection">
      <header style="text-align:center;">
        <button id="showOOCManeuvers" class="hidden showButton" onclick="show('OOCManeuvers');">Out of Combat Maneuvers</button>
        <button id="hideOOCManeuvers" class="hide" onclick="hide('OOCManeuvers');">[&#8213;]</button>  
      </header>

      <article id="OOCManeuvers">
        <div class="divider"></div>
        Todo: Stuff I need to say about Maneuvers, talk about attack and non-attack maneuvers. Talk about using a maneuver in non-combat situations. Talk about the versatility of maneuvers, if I still expect them to be versatile. 

      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Out of Combat Maneuvers -->

Reputation can be a resource as well as an obstacle. 

        <br/><span class="indent40"> </span> 
        Increasing the trust and attitude will allow gain you favors while losing it will cause characters to go out of their way to harm you.
        <br/><span class="indent40"> </span> 
        Eventually your character or the group of PCs may even develop a reputation for themselves. Reputation will shape the initial attitude and trust of NPCs that have heard of you.

    <!-- Social System Overview-->   
     <section class="section" id="socialSystemSection">
      <header class='hideWrapper sectionHeader'>
        <button id="showsocialSystem" class="hidden showButton" onclick="show('socialSystem');">Social System</button>
        <button id="hidesocialSystem" class="hide" onclick="hide('socialSystem');">[&#8213;]</button>
      </header>
      <article id="socialSystem" class="sectionBody">
        <h1>Social System</h1>
        <div class="divider"></div>

        <p class="wordNote">
          <i>Words can be mightier than the sword<br/></i> - said by many people, in lots of different ways<br/><br/>
          <b>Pray: to make a request in a humble manner</b></p>
        
        <br/><span class="indent40"> </span> 

        In our world society is complex and systems that make the interacting with people feel real also requires some complexity. 



        Clout and prominence and are social aspects that allow you to influence other people. With sufficient clout people listen to you, act on what you say, and care about your well-being. There are a variety of factors that relate to building, maintaining, and leveraging clout. In Prae clout is distilled into attitude, trust, and reputation.  Prominence relates to status in society, individuals are expected to treat those of higher and lower prominence differently than those equal to their own.

        <br/><span class="indent40"> </span>

        Many campaigns - exploring the wilds, seeking out Faen or ruins - will utilize only a small part of the social system. While others - city based, heroic quests - will rely heavily on building relationships and reputation.


        Either way characters are often meeting new people and solving or causing problems for those people. Those interactions and actions will shape the social world. 


      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Social System Overview -->

     <!-- Social System System-->   
     <section class="section" id="socialSystemSection">
      <header class='hideWrapper sectionHeader'>
        <button id="showsocialSystem" class="hidden showButton" onclick="show('socialSystem');">Social System</button>
        <button id="hidesocialSystem" class="hide" onclick="hide('socialSystem');">[&#8213;]</button>
      </header>
      <article id="socialSystem" class="sectionBody">
        <h1>Social System</h1>
        <div class="divider"></div>
        The social world is complex and made up of many factors. Influence is the heart of social power. Influence natrually comes from people caring about you and trusting you, and it spreads through reputation. In addition to natural factors people over time have divided themselves into social classes. Political power is a tricky thing and once groups of people become sufficiently big people start to specialize in various needs the society has. The people filling those positions quickly become abstracted to titles and roles, and those that step into them might not be as adept at those that earned their position there. Nevertheless society ends up stratifying into classes with fairly hard lines on expectation and treatement between, even if their is variance on how and where societies make those divisions. 

        <h2>Influence</h2>
        <span class="indent40"> </span> 

        Influence amounts to the control that you have over the behavior of others. Influence is dependent on a variety of things. How much the target of your influence likes and trusts you, how their values align with the behavior you are trying to create, their mood, their debt to you, and your status relative to theirs. 
        
        <br/><span class="indent40"> </span> 
        These qualities are often, initially at least, obfuscated to the players. Although the qualities of NPCs can be learned through play. 
        While mood can often be easily discerned, learning what a character cares about, who they like, or what they value can sometimes be quite an investment in time. Through circumstances, investigation, or observation these qualities can often be learned making it easier to influence specific characters or groups in the world. 


        <h2>Influence</h2>
        Each of the social skills, and some others, relate to influencing characters.
        <ul>
          <li>Rouse stirs emotions moving mood away from calm</li>
          <li>Handling quiets emotions moving their mood toward calm</li>
          <li>Charm manipulates attitude, often used when asking for favors that have a cost</li>
          <li>Diplomacy manipulates trust, often used when asking for others to take on risk</li>
          <li>Compel leverages attitude to create behavior</li>
          <li>Leadership leverages trust to create behavior</li>
        </ul>

        <span class="indent40"> </span>  The easy of influencing is related to how much you know about a person, and how much time you spend with them. Time, however, is a luxury that isn't often available. As such they often need to Press the situation to meet their needs, something that can be quite dangerous. 
        <br/><span class="indent40"> </span> 
        When using a social skill a character can choose to Press or Invest (sometimes the context forces one or the other). 
        <br/><br/><span class="indent40"> </span> 

        <h2>Favors and Debt</h2>
        Society for people of equal status is relate to a continuing sequence of trading favors. Trust, community, and reliance are built this way. 

        And you can earn favors that don't incur debt when people like you. 

        There are different levels of favors and all favors value is relative to the person. The more powerful or productive the people who owe you favors the greater value those favors are. 


        Favor amounts
        <ul>
          <li>Simple debt - 3 hours</li>
          <li>Small debt - 1 day or less</li>
          <li>Moderate debt - 1 week or less</li>
          <li>Large debt - 1 month or less</li>
          <li>Massive debt - 1 year or less</li>
          <li>Life debt - Your status is increased relative to that person. They can't repay that debt but tribute may be common</li>
        </ul>

        <h2>Difference between trust and attitude</h2>

        <h3>Mechanical</h3>
        Attitude gives free favors. Using this too often can hurt attitude. The result of the favor can also do it, because what you ask people for. 



        <h3>Narrative</h3>


        <h2>Status</h2>
        Status iseither lower, equal or higher. 

        Favors to a higher status are tribute
        Favors to a lower status are charity
        Favors to the same status are debt

        <h2>Gifting</h2>
        How cultures treat gifting to people of different status is largely dependent on those cultures, but generally gifting to people of equal status isn't a gift at all but a way to force debt on other people. You can't just give gifts outright you generally need a context. Invitations to things count as gifts. 
        <h2>Investing</h2>
        Investing takes a number of successful checks equal to the current rank of attitude or trust you are trying to raise to. An attitude of 3 or higher is a like, an attitude of 6 through 9 is love. Represent the successful check investment in that social aspect as a decimal. Once it reaches the whole number it rolls over increasing the whole number by 1. 


        <b>Investing</b> is working toward a lasting shift in a characters mood, attitude, trust or behavior. Only sometimes will this have an immediate effect. Investing is normally a controlled or common skill check, but can sometimes be dangerous. The number of successful checks it takes to have lasting change relates to the current intensity of the quality being influenced. 

        <p class='note'>
          Example of dangerous Investing: You’re at a party surrounded by various political rivals and you are using diplomacy to invest in the trust of the host, without hurting the trust of anyone else. 
        </p>
        <br/><span class="indent40"> </span>  <b>Pressing</b> is an attempt at creating an immediate change within someone and is generally much more difficult than investing. The effects of success or failure are only sometimes long lasting, although what is achieved due to the success can often have long lasting effect. Pressing is normally a dangerous check, but can sometimes be a controlled or common.
          <p class="note">Example of controlled Pressing: Trying to influence the mood of a crowd from calm to angry after nobles executed a folk hero</p>
   
      

      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Social System Overview -->

    <!-- Mood -->   
    <section class="section" id="moodSection">
        <header class='sectionHeader hideWrapper'>
          <button id="showmood" class="hidden showButton" onclick="show('mood');">Mood</button>
          <button id="hidemood" class="hide" onclick="hide('mood');">[&#8213;]</button>  
        </header>

      <article id="mood" class='sectionBody'>
       <h1>Mood</h1>
       <div class="divider"></div>
        <br/><span class="indent40"> </span> 

        Characters are always in a mood. Their mood represents the summary of their current emotional state and is the most apparent psychological aspect of another individual.
        
        <br/><span class="indent40"> </span> 

        Most characters have a few moods they commonly find themselves in, kind of a baseline of their personality and worldview. These common moods act as kind of a guideline with how they interact with the world and how the world interacts with them. 

        <br/><span class="indent40"> </span> 

        Moods are fairly fundgible, moods can change week to week, day to day, hour to hour or in extreme cases minute to minute. Some moods more likely to be fleeting, such as pity or disgust, and others to linger and are hard to shake, such as hopeful or sad. A characters common moods are generally those that linger, but each character has likely experienced nearly all of moods over the coure of thier life. 
        
        <br/><span class="indent40"> </span> 

        Narratively mood is important as it helps to breath life into the personality of the characters in the world.
        
        <br/><span class="indent40"> </span> 

        Mechanically mood is important as it affects TN when trying to influence someones attitue, trust, or behavior. 
        
        <br/><br/>

        Mood is influenced through Rouse and Handling. 

        <h2>Mood Intensity</h2>
        <span class="indent40"> </span> 

        Each mood is emotional state which has a type and intensity. There are 4 levels of intensity for each type and generally the relate to another mood on a spectrum, with Calm being the 0 in the middle. 
        <br/><br/>
        The effect of the mood on a roll is related to its intensity and if that mood will help or hurt the influence you are trying to have over them. 
        
        
        <p class='note'>
        Trying to convince a brave town guard to help you fight back a giant would be easy, while trying to convince a scared shopowner would be hard.<br/>
        Extremely Brave, +4<br/>
        Very Brave, +3<br/>
        Fairly Brave, +2<br/>
        Slightly Brave, +1<br/>
        Calm, 0<br/>
        Slightly Scared, -1<br/>
        Fairly Scared -2<br/>
        Very Scared -3<br/>
        Extremely Scared -4
        </p>
        <h3>Example Moods</h3>
        <ul>
          <li>Eustress | Distress</li>
          <li>Elated | Dejected</li>
          <li>Happy | Sad</li>
          <li>Brave | Scared</li>
          <li>Manic | Depressed</li>
          <li>Proud | Ashamed</li>
          <li>Schadenfreude | Pity</li>
          <li>Happy about the success of others | Envy</li>
          <li>Desire to protect | Anger</li>
          <li>Enticed | Disgusted</li>
          <li>Confident | Doubtful</li>
          <li>Hopeful | Despair</li>
          <li>Focused | Distracted/Flighty</li>
        </ul>


      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Mood -->
        

    <!-- Attitude -->   
    <section class="section" id="attitudeSection">
        <header class='sectionHeader hideWrapper'>
          <button id="showattitude" class="hidden showButton" onclick="show('attitude');">Attitude</button>
          <button id="hideattitude" class="hide" onclick="hide('attitude');">[&#8213;]</button>  
        </header>

      <article id="attitude" class='sectionBody'>
       <h1>Attitude</h1>
        <div class="divider"></div>
        <span class="indent40"> </span> 

        Attitude refers to a set of opinions, perceptions, emotions, and beliefs toward particular character, thing, idea, or event. They have a powerful influence over behavior and while generally persistant, can change. In short, it is how you care about and how you treat a subject. 

        <br/><span class="indent40"> </span> 

        During your upbringing you were told stories about the experiences of others and had your own, this likely shaped your initial attitudes toward things in the world. You might hate the rival tribe, or love a the knights of a far away kingdom based on tales you've heard. 

        <br/><span class="indent40"> </span> 

        Attitude does not prohibit moods, it is entirely possible for a character to love another but still get angry at them from their actions. If done frequently enough their attitude might decrease. 

        <br/><span class="indent40"> </span> 

        Attitude can also be temporarily altered by circumstance. A drunk villager who likes the the PC might act as if they hate them in their belligerence, however this doesn’t reflect a change in persistant attitude, just a brief change in behavior to reflect the circumstance.
        
        <br/><span class="indent40"> </span> 

        Likewise a very charming PC might temporarily Press a NPC to change from a Dislike to a Like attitude. The PC might use this change to request a favor from the NPC, and depending on the favor might end up hating the NPC instead of just Disliking them after the pc's charming influence wears off.


        <h2>Attitude Intensity</h2>
        <span class="indent40"> </span> There are 5 ranks of attitude intensity: Love - Like - Apathy - Dislike - Hate.
        <br/><br/>
        Vague simple definition of these terms:
        <ul>
          <li>Love: caring about things well-being more than your own</li>
          <li>Like: caring about things well-being</li>
          <li>Apathetic: don’t care about a things well-being </li>
          <li>Dislike: value harming things well-being</li>
          <li>Hate: value harming thingswell-being even at the some cost to your own</li>
        </ul>

        <span class="indent40"> </span> 

        Within each rank there are 3 degrees. Narratively these speak to the strength of the attitude. A character that has Love 3 for a cause is willing to die for it. Love 2 they are willing to risk death for it. Love 1 they might be willing to risk punishment or imprisonment fighting for it. 
        
        <br/><span class="indent40"> </span> 
        
        Mechanically they relate to TN for influencing attitude, and each degree must be acheived before rank can be improved. 
        
        <ul>
          <li>Love: +1,2,3</li>
          <li>Like: +1,2,3</li>
          <li>Apathy: +1, 0, -1</li>
          <li>Dislike: -1,2,3</li>
          <li>Hate: -1,2,3</li>
        </ul>

        <h2>Influencing Attitude</h2>
        <span class="indent40"> </span> 

        Various things can change attitude. Direct interaction is the most straight forward way but it is also common for various deeds a player takes to influence how others feel about and perceive them.
        
        <br/><span class="indent40"> </span> 

        Direct interaction is through spending time and utilizing the charm skill. 
        The base amout of time to make a Charm roll to invest is 3 hours (see Charm skill for more details). The number of successes needed to change a degree of attitude by one relates to the rank of their current attitude toward you. 
        
        <br/><span class="indent40"> </span> 

        Apathy:3<br/>
        Like or Dislike: 6 <br/>
        Love or Hate: 9<br/><br/>


        Example of influencing attitude. 
        <blockquote>
          Scenario: Poor, charming, sneaky street rat trying to seduce a princess.  
          <br/><br/>
          Pirncess: Value's boldness. Likes flowers, jewerly. Dislikes poor people and Rodge a prince that is courting her. 
          <br/><br/>
          The street rat sees the princess in the market one day and falls in love with her. Her initial attitude is one of dislike. However, our street rat is charming and persistant. Over the course several nights he breaks into the castle garden to speak with her. Impressed by his boldness (boosted to the charm roll) he gets her to like him and she opens up a little. He learns of her taste in flowers and jewerly and her dislike of Rodge. He continues his nightly escpades and manages to bring her tulips, a diamon necklace he 'found' (continuing his booted on charm rolls). Slowly she has come to like him. Finally, a chance opporutnity occurs in the market and the street rat humilates Rodge causing him to leave town in shame as his courtship wasn't effective anyway. Earning the love of the princess by saving her fathers pick in suitor, a man she dislikes. 
          <br/><br/>
          All told if our street rat succeeded at every roll he would of spent about 100 hours charming her to get her to attitude to Like +3 and finally his deed of saving her from the prince would move him into Love +1. 
        </blockquote> 
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Attitude -->
    
    <!-- Trust -->   
    <section class="section" id="attitudeSection">
        <header class='sectionHeader hideWrapper'>
          <button id="showtrust" class="hidden showButton" onclick="show('trust');">Trust</button>
          <button id="hidetrust" class="hide" onclick="hide('trust');">[&#8213;]</button>  
        </header>

      <article id="trust" class='sectionBody'>
       <h1>Trust</h1>
        <div class="divider"></div>
         Trust is ones perception on how reliable and effective another person or idea is. Through trust people come to rely upon each other, ideas, or institutions and in so doing allow those things to influence their beliefs and behaviors. 

        <h2>Trust vs Attitude</h2>
        In many instances the relationships and behaviors are similar between someones attitude and trust, and most of the time if you have a very positive attitude of them you'll also have high trust in them, but not always. 
        <br/><br/>
        
        Attitude relates to connection. Trust relates to how skeptical you are that a thing will do as you expect it to or that it says it will. 
        <br/><br/>
        
        A character an hate another while trusting their word. Often this is the reality if forming treaties between two warning nations. 
        <br/><br/>
        
        Like wise a character can love another while having no faith that they'll do what they say they will or be able to accomplish what they think they can. A parent with a rebellious child for instance. 

        <h2>Trust Intensity</h2>
        Like attitude there are 5 ranks of trust, with 3 degrees each: trust - confident - wary - suspicious - distrust. 
        <br/><br/>
        Vague simple definition of each
        <ul>
          <li>Trust: You almost always believe what they tell you and follow orders</li>
          <li>Confident: Most of the time you believe what they tell you and will follow orders</li>
          <li>Wary: Healthy skepticism toward their words and actions</li>
          <li>Supicious: More likely to think they are unreliable and deceptive than not</li>
          <li>Distrust: Near certain they will deceive or fail you</li>
        </ul>
        As players in Prae are often independent and adventuring, exploring, or investigating it is common they'll have few or no things they trust. 

        <h2>Influencing Trust</h2>
        As trust and attitude can often mirror each other narratively mechanically they are also often mirroring each other.
        <br/><br>
        Influencing trust is similar to influencing attitude except that it utilizes the Diplomacy skill isntead of the Charm skill. 
        <br/><br/>
        The base amount of time to roll the check is 3 hours. The number of success needed to change the degree trust relates to their current trust level toward you. 
        <br/><br/>
        Wary 3:
        Confident or Supicious: 6
        Trust or Distrust: 9
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Attitude -->

    <!-- Reputation Section -->   
    <section class="section" id="reputationSection">
        <header class='sectionHeader hideWrapper'>
          <button id="showreputation" class="hidden showButton" onclick="show('reputation');">Reputation</button>
          <button id="hidereputation" class="hide" onclick="hide('reputation');">[&#8213;]</button>  
        </header>

      <article id="reputation" class='sectionBody'>
       <h1>Reputation</h1>
       <div class="divider"></div>
       Over the course of play you're likely to develop a reputation. This reputation can spread through world of mouth or you might be given papers items to represent it. 
       <br/><br/>
       Reptuation modifies a persons initial attitude and trust of you, assuming they care about your reptuation. 
       <br/><br/>These modifcations are not always positive. If you save a caravan from raiders you might gain a better reputation with the nobles and mechants while getting a worse one with the peasants and resistance fighters that don't like how they are being ruled. 
       <br/><br/>
       Based on your childhood and training work with the GM create an initial reputation for your character. What individuals or factions might value your despise you?
       <br/><br/>
       While your reptuation with those people or factions may not often or ever going to come up in the games story it helps you further think about the past of your character and from their past how they would deal with the challenges in the present. 
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Reputation -->


    <!-- Magical Worlds -->
    <section class="section" id="magicalWorldsSection">
      <header class='hideWrapper sectionHeader'>
        <button id="showmagicalWorlds" class="hidden showButton" onclick="show('magicalWorlds');">Magical Worlds</button>
        <button id="hidemagicalWorlds" class="hide" onclick="hide('magicalWorlds');">[&#8213;]</button>
      </header>
      <article id="magicalWorlds" class="sectionBody">
        <h1>Magical Worlds</h1>
        <div class="divider"></div>
        
        <i><p class="wordNote">Have faith in those who lead you into light. Bless them with your prayers, the obstacles on the path of righteousness can not be overcome without your aid.</i> <br/>- Sacra Devon </p>

        <p class="wordNote"><b>Pray: a request or thanks to one you are devoted to.</b></p><br/>
        <span class="indent40"> </span>

        Magic flows through the worlds of Prae shaping its people, places, and problems. Magic comes from interactions with Fae, a type of energy that can be manipulated to create, influence, empower, or connect. Fae is measured in mana, a mana is a sufficient amount of Fae to reliably be manipulated by people, however people can only utilize the Fae that is within them, and there should be a way to <b>replenish</b> it. Through Pray, a common spell, mana can be <b>transferred</b> between things capable of containing it. In addition to characters some objects can contain mana and some of those objects can have it released from them for specific magical effects. Mana needs to come from somewhere and using it should have a <b>cost</b> beyond just the mana used to cast it.
        <br/><span class="indent40"> </span>
        Considering that mana is transferable, replenishing, and has costs to use is should become integrated into your world's economy and social structure. Imagining how society deals with this valuable resource is an important part of making worlds feel alive.

        <h2>Magic in Traea</h2>

        <b>Cost</b>: On Traea using mana draws the attention of and relates to the creation of Faen, monsters that feed on people. 
        <br/> 
        <b>Capacity and Replenishment</b>: Humans have a capacity of 3 mana. On Traea, each day people asleep between 3 and 4 a.m. (referred to by various names: the witching hour, devil's hour, hour of the Fae, etc.) regain their mana.
        <br/>
        <b>Transfer</b>: Mana is an active part of the economy in most cultures and various laws exist to regulate its use and storage.
        <br/>
        <b>Mana Storage</b>: On Traea special gemstomes generally called Tears can store mana. See the <a href="#tearsOverviewSection" class="internalLink"> Magic Item Overview</a> section below.

       <button id="showMagicWorldBuilding" class="hide hidden" onclick="hide('MagicWorldBuilding');">[-]</button>
       <button id="showMagicWorldBuilding" class="hide" onclick="show('MagicWorldBuilding');">[+]</button>
       <h2 id="MagicWorldBuilding">Magic in your own worlds of Prae</h2>
       <span class="indent40"> </span> 
       When imagining your own worlds make sure that your magic has a cost, way to replish itself, decide if you want to change how socities want to deal with its use and transfer, and what things can store it and how much. Here are some ideas in hopes to inspire you.
       <b>Cost</b>: Each time you use mana over X value it decreases a characters total capacity. 
       <b>Replinshement</b>: Drinking blood, eating people, relaxing, mana pools, gods, meditation, 
       <b>Storage</b>: Crafted items like voodoo dolls, potions, staffs, wands, Paten Disks, ritual knifes/athame (gain more capacity as they kill more things), 

        <!-- 
        Mana flows through the worlds of Prae. Through Prayers (a ) Mana is integral part the day to day life and it affects economy and improves the opportunity and well-being all people, but at what cost? 

        Magic is a force that should shape worlds. It's is an additional and powerful force of nature that our world doesn't have and it impacts nearly everyhting. Evolution, economies, morality, and many more societal structures should all be influenced by magic. A goal of Prae is to understand and account for the impact magic has on a world. 

        In Prae magic is powered by mana which is inherent to at least Player Characters and in Traea is innate to all people. Mana replenishes while sleeping, and is transferrable. This gives mana clear economic value, but it should also have relatively clear sources and costs to its use in your world. In Traea beliefs on the source change a bit based on culture, but all cultures are aware that it attracts the attention of Faen.

        Magic is the utilization of a manipulatable energy called Fae. Fae is measured in mana, a mana is a sufficient amount of Fae to be manipulated by people. Mana can used to create, influence, empower, or connect but using it has a <b>cost</b>. 

        Fae is almost everywhere and makes up almost everything but people can only utilize Fae bound to them. Each creature has a maximum capacity for the amount of mana that can be bound to them. Humans have a capacity of 3 and 

        Characters can learn various abilities that that allow them to utilize their mana. 
        -->
      </article>

      <footer class="sectionFooter">
      </footer>
    </section> 
    <!-- End Magical Worlds -->

    <!-- Magic Types -->
    <section class="section" id="magicTypesSection">
      <header class='hideWrapper sectionHeader'>
        <button id="showmagicTypes" class="hidden showButton" onclick="show('magicTypes');">Show Magic Types</button>
        <button id="hidemagicTypes" class="hide" onclick="hide('magicTypes');">[&#8213;]</button>
      </header>
      <article id="magicTypes" class="sectionBody">
        <h1>Interactions with Fae - How to use Magic</h1>
        <div class="divider"></div>
        <span class="indent40"> </span>


        Magic comes from interactions with Fae and different types of interactions create different types of magic:
        <br/><span class="indent40"> </span>
        <!--
      
        <h2>Categories of magic</h2>
        <span class="indent40"> </span>

        How you interact with Fae is just as important as how much of it you are manipulating, and some interactions can only be done so in small degrees. There are no Invocation or Potence rituals for example. The categories of magic are determined by how you interact with Fae.
      -->
        First Order Magic
        <ul>
          <li>Conjuration: Turns Fae into matter, cast through movements</li>
          <li>Incantation: Vibrates strings causing changes in the makeup of things, cast through sounds</li>
          <li>Ligation: Connects things, cast by arrangement of things directly or symbolically</li>
          <li>Potence: Letting Fae flow through the body enhancing one's self, cast through inner focus</li> 
        </ul>

        Second Order Magic: A combination of two types of magic in the First Order
        <ul>
          <li>Transmutation: Changes the makeup of inanimate objects</li>
          <li>Binding: Storing until certain triggers are met</li>
          <li>Augmentation: Adding to one's self without significant changing what is already there</li>
          <li>Imbuing: Storing emotions, thoughts, or memories in objects that can be pulled out at a later time</li>
          <li>Trance: Changing the strength of aspects of one's own mind</li>
          <li>Bonding: Shares skills between characters</li>
        </ul>

        Third Order Magic: A combination of three types of magic in the First Order
        <ul>
          <li>Transportation/Folding: Bridging space</li>
          <li>Transformaton/Shifting: Shapeshifting</li>
          <li>Healing: ?</li>
          <li>Enchantment: Controlling the behavior of others</li>
        </ul>

        Fourth Order Magic: Combination of the four types of magic, the priority of magic matters here
        <ul>
          <li>Divination: Enhanced awareness and sensitivity to systemic effect for changes in strings</li>
          <li>Awakening: Forming some sort of mind for inanmiate objects</li>
        </ul>

        <h2>Using Mana</h2>

        Each Player Character has a capacity of 3 Mana that generally restores daily. It can be used in various ways:
        <ul>
          <li>Gain <abbr class="boosted">Boosted</abbr> with one skill for the remainder of the scene</li>
          <li>Cast Spells</li>
          <li>Physical and Social Tricks have aspects that activate with Mana</li>
          <li>During a rest remove 1 Fatigue</li>
          <li>Heal 3 <abbr class="persistant">Severe</abbr> damage</li>
          <li>While in combat it can be coverted to Momentum equal to a characters Mana Conversion attribute</li>
        </ul> 

        <h3>Momentum</h3>
        <span class="indent40"> </span> 
        Momentum is an additional way that characters can utilize the Fae. Momentum is similar to adrenaline, it is additional energy the body is capable of manifesting when people are in dangerous situations, but it can't be consciously tapped into to enable magic otherwise.  

        <h2>Ambient Fae and Critical Marks</h2>
        <span class="indent40"> </span>
        Generally Fae is interacted with by character actively manipulating it, but sometimes ambient Fae can affect actions characters take in the world. Sometimes when characters make utilize their skills the results can be extreme (they roll a lot of Critical Marks) and this is mostly explained by ambient Fae responding to the characters intent.
        
          While skills can unreliably tap into the Fae the abilities a character has are direct interactions they've learned to do so. Talents all enable an additional use of mana for a discrete effect. Tricks are also often a discrete magical effect, but not always. Arcana taps into Fae a higher degree utilizing it for bursts of speed, Conjurations that last for a couple minutes, and can even manipulate the behavior or emotions of others through Invocations. Rituals an create magical effects that last for hours and some can be sustained for days or even made permanent. 

          <h1>FIND BETTER PLACE</h1>
          <a href="#cojurationSection" class="internalLink">Conjuration</a> rituals are a series of precise and specific movements (similar to a Kata, Tai Chi, Qigong, Bagua, etc). <a href="#divinationSection" class="internalLink">Divination</a> rituals are a deep meditation where the caster attunes to specific strings of Fae allowing them to more easily read and sense changes in them. <a href="invocationSection" class="internalLink">Invocation</a> augments to rituals create a sort of vibration in the Fae that can influence those that interact with the rituals. 

      </article>

      <footer class="sectionFooter">
      </footer>
    </section> 
    <!-- End Magic Types -->



    <!-- ritualsOverview -->
    <section class="section" id="ritualsOverviewSection">
      <header class="sectionHeader hideWrapper">
        <button id="showritualsOverview" class="hidden showButton" onclick="show('ritualsOverview');">Character Creation: Spell Overview</button>
        <button id="hideritualsOverview" class="hide" onclick="hide('ritualsOverview');">[&#8213;]</button>  
      </header>

      <article id="ritualsOverview" class="sectionBody">
        <h1>Spells</h1>
        <div class="divider"></div>
        <span class="indent40"> </span>

        Spells are longer form magic that often take minutes or potentially hours to complete.

        <h2>Powering Spells</h2>
        <span class="indent40"> </span>

        At the start of the spell the caster determines all sources of Mana it will pull from. The caster can use their own mana or mana from contributors.

        <p class="note">*Some Objects can store a large about of Mana but can only release it at smaller frequencies. 
          In this case the caster can pull only as much as it can release during the duration of the spell. </p>

        <h3>Initial Cost to Cast</h3>
        <span class="indent40"> </span>

        Half of the total cost to cast a spell, rounded up, is paid upon initiating the spell, the remainder is paid upon the completion. If for whatever reason there is no longer sufficient mana to complete the spell it fails. 
        
        <P class="note">
          Narratively the energy spent to cast a spell is spread out over its cast time, 
          this rule exists to try and make a fair representation of cost if a spell gets interrupted. 
          GM has discretion to change this for specific situations to fit narrative needs. 
          This rule can also be explained narratively by a mental commitment of mana to make the attempt and interruption can be enervating. 
        </p>
        
        <h3>Contributors</h3> 
        <span class="indent40"> </span>

        Contributors can be either willing creatures or objects that can hold mana, like a Tear. To pull mana from a contributor they must be touching the caster or touching another contributor that chains to the caster. The maximum number of contributors a caster can pull from is limited by their related skill rank:
        
        <ul>
          <li>Basic: 5</li>
          <li>Trained: 15</li>
          <li>Adept: 50</li>
          <li>Expert: 100</li>
          <li>Master: 1,000</li>
        </ul>

        <span class="indent40"> </span> 

        Unlike the caster a contributor does not need to actively be part of casting the Ritual. 
        However, they must stay within 900 feet (~150 spaces, ~300 meters/yards) of the caster throughout its cast time to contribute the cost at the end of the spell.

        <br/><span class="indent40"> </span>

        Cultures have developed various ways to keep participants in the area for the cast time large scale rituals. Communal meditation, song, meals, stories, etc. However, contributors are free to talk, move around, or even fight. 

        <h2>Pausing and Interrupting</h2>
        <span class="indent40"> </span> 

        Spells require focus and engagement from their caster. 
        If a combat starts while a character is involved in a spell they may choose to use their turn to continue the ritual.
        
        <br/><span class="indent40"> </span>

        Alternatively, they can use their Focus and either their Move or Action pause the casting of the spell. 
        A Ritual can not be paused for more minutes than the casters related skill rank in the ritual. 
        
        <br/><span class="indent40"> </span>

        If the caster can not or does not their Focus and Move or Action to maintaining the spell or they leave the cast area the spell starts to become interrupted. 
        If a spell has been interrupted for more rounds than casters related skill rank the cast ends unsuccessfuly and the mana already spent toward it is lost without effect. 

        <h2>Sustaining</h2>
        <span class="indent40"> </span>

        Some spells will have the Sustainable keyword. 
        This keyword allows the caster to sustain the effects of the spell for its duration, essentially instantly recasting it, if they spend the the same amount of mana as the cost to cast the spell. 
        <br/><span class="indent40"> </span>
        Sustaining a spells requires minimal thought or concentration and can be sustained as long as the player is conscious at the end of the duration (they can sleep, but most be awake at the end of the Duration to choose to sustain it). 
        The caster does not need to be near the cast or affect area of the spell to sustain it. 
        <br/><span class="indent40"> </span>
        If the caster had contributors in the spell they may be given mana from them if they are touching them or through other contributors chained through physical contact to them within 9 minutes of the end of the spells duration. 
        
        <h3>Diminishing Costs to Sustain</h3>
        <span class="indent40"> </span>

        Some spells have a diminishing sustain cost, this is communicated by adding a (D) at the end of the sustainable keyword. 
        If a spell has a diminishing sustain cost reduce the cost needed to sustain it in half, rounded up, per 9 days (1 week on Traea) of sustaining it.  

        <h3>Acceptances</h3>
        <span class="indent40"> </span>

        Some spells can reach Acceptance after being sustained for 27 days. At which point they are no longer subject to <a href="#conjurationSection" class="internalLink">Evanesence</a> and reality has come to accept their existence removing the cost to sustain.  

        <h2>Enhancements</h2>
        <span class="indent40"> </span>

        Most spells can be enhanced in various ways - how each spell can be enhanced is listed in their description. At the beginning of a spell the caster can choose to apply these enchancements increasing various aspects of its effect, but they generally require additional mana and a longer cast time.
        

        <h2>Augments</h2>
        <span class="indent40"> </span>

        Augments are very similar to Enhancements, except that they modify the effect rather than make it more potent. Augments require additional skills to apply. A contributor can work with the caster to apply an augment if they have a required skill but the caster does not, to do so they have to cast the entire spell as well rather than just be a passive participant. 

        <h2>Resisting</h2>
        <span class="indent40"> </span>

        Some spells can target specific beings for their effects. Creatures can resist these effects when the spell completes
        Spells that can be resisted will include the cost required to resist its effects (this is generally a flat mana cost). 
        Targets of these spells have a brief period of time, near the end of the casting, where they can feel Fae around them reaching out to them.

        <h2> Criteria</h2>
        <span class="indent40"> </span>

        Some spells can have criteria on what they affect. 

        These criteria cannot contain a proper noun or be adjective that describe the physical structure and size of a thing.

        <br/><span class="indent40"> </span> 
        
        Without careful consideration of criteria there is opportunity for mishap. If you're unsure of a critera is acceptable ask your GM. 
        <br/><br/>
        Examples of Criteria:<br/>
        Noun “Heart”<br/>
        Noun “Hair”<br/>
        Adjective of Hair “Brown”<br/>
        Noun “Claws”<br/>
        Adjective of Claws “18 inches”<br/>
    
        <h2>Common Spells</h2>
        <span class="indent40"> </span> 

        Harmony and Pray spells known by characters. Their maximum skill rank is considered their rank for these spells when considering how man contributors they can have. 
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Rituals Overview -->


    <!-- Tears Overview -->
    <section class="section" id="tearsOverviewSection">
      <header class='hideWrapper sectionHeader'>
        <button id="showtearsOverview" class="hidden showButton" onclick="show('tearsOverview');">Show Magic Items</button>
        <button id="hidetearsOverview" class="hide" onclick="hide('tearsOverview');">[&#8213;]</button>
      </header>
      <article id="tearsOverview" class="sectionBody">
        <h1> Tears or Magic Items Overview</h1>
        <div class="divider"></div>
        <span class="indent40"> </span>
        Tears are special gemstones of various shapes and sizes capable of storing mana and tied to the elements. Tears are measured in four apsects. 
        Clarity is one factor in determing a Tears mana capacity,tThe other is Carats or size. Tears particularly large can also radiate magical effects while containing Mana. 
        Cut and Color determine innate ways the Tear can utilize the mana held within for various effects. Color represents the elements inherent to the Tear and how its mana might manifest. While Cut can shape how it does so.

        <br/><span class="indent40"> </span>

        Tears are fairly rare and most are about 1.5 inch spheres, muddy white in color and opaque. Such Tears are capable of storing 2 mana and have no innate way to manifest it. 


        The rarest of Tears are as large as a house, almost transparent, with a deep color of a mixture of elements. Such Tears are almost never cut into in risk of damaging them. Some Tears have the right mix of properties the cutting them can add great value to them.

        <br/><span class="indent40"> </span> 

        Large Tears of incredible value to society as they allow for storing of a significant amount of mana allowing for a great reducing in any waste of mana on a day to day basis. Many cities are founded around large Tears that allow inhabitants to store mana and use it to create various resources: food, shelter and other things to make life easier. 

         <h2>Conjuration</h2>
        <span class="indent40"> </span> The most common type of Tears besides those just capable of holding mana can use that mana to conjure something. What they conjure is dependent on the cut and color of the Tear. A Tear that can conjure wood may be cut into the shape of a ladder, pole, chair, or other useful objects to easily create objects of value. Other Tears conjure fire, water, stone, plant fiber, bread, and salt or other spices. Such Tears can be incredibly valuable to society changing the economy or capability of especially in where larges groups of people can contribute their mana to these conjurations and are thus highly sought after. 

        <h2>Fusing and Enchantment</h2>
        <span class="indent40"> </span> Rare Tears of a color close to that of the elements can be fused into objects and when activated they imbue those objects with the power of one of the elements. This has a wide variety of practical applications for those lucky enough to own them, but it also creates special value for Prae. These Tears can be fused to weapons and armor to enchant them.

        <p><i>Examples of simple fusions</i> 
        <button id="hideFusionExamples" class="hide hidden" onclick="hide('FusionExamples');">[&#8213;]</button>
        <button id="showFusionExamples" class="hide" onclick="show('FusionExamples');">[ + ]</button>
        </p>

        <blockquote id="FusionExamples" class="hidden">


        <ul>
            <li>Weapon, fused with a fire Tear: Bonus to Critical Range, and a Critical Effect that applies Burning. </li>
            <li>Weapon, fused with water Tear: Bonus to Damage, and a Critical Effect that applies Vulnerable,</li>
        </ul>
        When fused with weapons the color determines the strength of the effect. A fire Tear of deep would greatly increase critical range and easily apply Burning. 


        <ul>
          <li>Armor, fused with a earth Tear: Bonus to Armor and when you take damage sharpnel flies off of you damaging everyone adjacent</li>
          <li>Shoes, fused with a air Tear: Give a spring to your step, increasing your pace and gives boosted to all athletics and acrobatics checks</li>
        </ul>
        </blockquote>

        <h2>Syphoning</h2>
        <span class="indent40"> </span> Some Tears can be activate to leak power. This power can syphoned to increase the potency of Blasts. How the power manifests depends on the type of Tear and can add specific types of Strings to a Blast with the power they leak.

        <p><i>Examples of simple fusions</i> 
        <button id="hideSyphonExamples" class="hide hidden" onclick="hide('SyphonExamples');">[&#8213;]</button>
        <button id="showSyphonExamples" class="hide" onclick="show('SyphonExamples');">[ + ]</button>
        </p>

        <blockquote id="SyphonExamples" class="hidden">


        <ul>
            <li>Syphon with a fire Tear: Adds 1 Fire String for free</li>
            <li>Sypohn fused with water Tear: Adds 1 Water String for free</li>
        </ul>
        When fused with weapons the color determines the strength of the effect. A fire Tear of deep would greatly increase critical range and easily apply Burning. 


        <ul>
          <li>Armor, fused with a earth Tear: Bonus to Armor and when you take damage sharpnel flies off of you damaging everyone adjacent</li>
          <li>Shoes, fused with a air Tear: Give a spring to your step, increasing your pace and gives boosted to all athletics and acrobatics checks</li>
        </ul>
        </blockquote>


        <h2>Shards</h2>
        <span class="indent40"> </span> Some Tears never fully form and others get damaged, the Tear shards act similarily to Tears except that mana can not be put into them, once the mana that is inside of them runs out the magic inherent to them becomes inert. 
      </article>

      <footer class="sectionFooter">
      </footer>
    </section> 
    <!-- End Tears Overview -->


    <!-- Conjugations -->
    <section class="section" id="conjugationSection"> 
      <header class="hideWrapper sectionHeader">
        <button id="showconjugation" class="hidden showButton" onclick="show('conjugation');">Conjugations</button>
        <button id="hideconjugation" class="hide" onclick="hide('conjugation');">[&#8213;]</button>
      </header>
      <article id="conjugation" class="sectionBody">
        <h1>Conjugations</h1>
        <div class="divider"></div>
        Needs details added

        </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Conjugation -->

    <!-- Conjurations -->
    <section class="section" id="conjurationSection"> 
      <header class="hideWrapper sectionHeader">
        <button id="showconjuration" class="hidden showButton" onclick="show('conjuration');">Conjurations</button>
        <button id="hideconjuration" class="hide" onclick="hide('conjuration');">[&#8213;]</button>
      </header>
      <article id="conjuration" class="sectionBody">
        <h1>Conjurations</h1>
        <div class="divider"></div>
        <span class="indent40"> </span> 

        Conjuration is the process of weaving strings of fae together to form matter.
        Weaving fae is a series of precise and specific movements (similar to a Kata, Tai Chi, Qigong, Bagua, etc). 
        These movements along with the casters will force fae into form. The more complex the conjuration the longer the more time and movement required.
        
        <br/><span class="indent40"> </span>

        Blasts are a quick movement over just a few seconds,
        while rituals are generally very slow and precise that take minutes or hours to complete.
        
        <br/><br/>

        Various movements and shapes are common within all weaving and tied to the four basic elements. 
        <ul>
          <li>Earth or Gi, cube and square</li>
          <li>Air or Ara, octahedron and diamond</li>
          <li>Water or Inx, icosahedron and hex</li>
          <li>Fire or Aros, tetrahedron and trianglish quadrilateral</li>
        </ul>

        <span class="indent40"> </span> Base elements are conjured in a crude and unpolished state. 
        Creating a stone slab is a common use of conjuration but the shape and smoothness of the slab is very rough. 
        As Weavers get more skilled in conjurations they can refine the shape and texture of the conjuration.
        Many Weavers even focus specifically on those things such that they can craft fine art, tools, or even weapons and armor from the fae.  

        <p class="note">When world building consider how conjuration would affect different cultures. 
          While this book focuses largely on applications for adventure and combat their are numerous other refinements and applications for conjuration.</p>

        <!-- <h2>VISUAL EXAMPLES OF CONJURATIONS WILL GO HERE</h2> -->

        <h2>Evanesence</h2>
        <span class="indent40"> </span>Recently conjured mana is subject to a force called Evanesence. 
        This effect reverts conjured matter back into energy. 
        Although it is possible to maintain a conjuration for a long period of time it is requires consistent effort. 

        If enough effort and energy is put into sustaining conjured matter for 27 days it becomes Accepted and is no longer subject to Evaesence.

        <p class="note">See the <a href="ritualSection" class="internalLink">Rituals section</a> for more details on sustaining</p>
        
        <h2>Dispelling</h2>
        <span class="indent40"> </span> Prior to Acceptance, a conjurations can be dispelled by meeting the power of a conjuration with its opposite.  

        <p class="note">This is mostly relevant for out of combat uses of conjurations. 
          If a character wants to us the Minor Conjure Element Arcana to create a stone wall blocking a doorway,
           its duration can be slightly decreased by Blasting it or greatly decreased by casting another Minor Conjure Element in the same location. 
           This is a largely fluid rule as the <abbr class="combat">Combat</abbr> durations are variable and feed on Momentum</p>

        <h2>Restrictions</h2>
        <span class="indent40"> </span>

         Fae is present in all creatures and is constantly being weaved between energy and matter. 
        This makes it all but impossible to weave inside of a creature. It would be like trying to control the flow of a cubic foot of water in a ocean with just your hands. 
        
        <br/><span class="indent40"> </span>

        Similarly it is impossible to conjure inside matter that is already substantive and dense.
        Conjuration does not allow alteration of already existing matter. 

        <h2>Illusions</h2>
        <span class="indent40"> </span> 

        Illusions are a particularly special conjuration. 
        All conjurations are creation, the trick with illusions is in creating part or only most of something. 
        This sort of shortcut allows much greater flexibility in what is being created,
        at the cost in completeness. Illusions rely on perception rather than substance to have an effect (see Illusory contours in out real world as a much less powerful example). 
        
        <br/><span class="indent40"> </span>

        With illusions specific aspects of the thing you are creating are left out, allowing the Weaver to conjure something that seems greater than it is. 
        However, when creatures recognize them for what them for what they are their effects are determined by the observer and not the conjuror. 
        Interacting with illusion when you know it is one is similar to looking at an Ambiguous Picture (see Spinning Dancer illusion) when you know both images are there. 
        You can see the world without the illusion, you can see it with it or even both at once. 
        This allows the creature interacting with the illusion decide if and when they want the illusion to be able to affect them. 
        <br/>

        <span class="indent40"> </span> 

        Illusions can cause damage, <a href="recoverySection" class="internalLink">injuries</a>, comas or even death (see Voodoo Death).
        Although all of them are psychosomatic and can be overcome, except death, by an understanding of the illusory nature of the effect.

        <p class="note">Illusions always deal psychnic damage and thus never affect non-living things.</p> 

        <h2>Resisting Illusions</h2>
        <span class="indent40"> </span> 

        The power of illusion does not come so much from the belief that it is real or not, 
        but rather the lack of suspicion that it lacks completeness.
        Once that suspicion exists, consciously or not, creatures start to resist the illusion. 
        Resisting an illusion is initially subconscious and comes from observations that it is not interacting with the rest of reality correctly. 
        
        <br/><span class="indent40"> </span>
        
        Movements, sound, touch, smell, taste or fae sense tip off slight inconsistencies with real and what is illusory. 
        The image itself might be slightly out of place, the caster might miss certain details of how the aristocracy wears clothing or the terrain surrounding the area of the effect might not make sense ecologically. 
        Small variances create suspicion which generally results in individuals taking more direct interaction with illusions or more closely observing them and eventually being able to resist them.
        
        <br/><span class="indent40"> </span>

        NEEDS REWORK: Each time a creature interacts with an illusion or observes interaction with one this TN is decreased by 1-5 based on how suspicious the result of the interaction was, as determined by the GM. 

        The default TN to resist an illusion is 6+|deceptionSkillRank|, creatures use Insight, Awareness or Lore to resist an illusion.   Decrease this TN by 3 for creatures that have a primary sense other than sight. 

        Once the TN is lower than a creatures passive Insight, Awareness or Fae they recognize the illusion for what it is. 
        This allows them to see both the reality and the illusion and not confuse the two preventing any harm it might cause.
        Characters can choose to allow an illusion to continue to affect them if they can hold focus on it and actively work to decieve themselves.
        Deception TN relates to the initial TN of the illusion and how significant the illusion is. 
        <br/><br/>
        I.e. As a character climbed an illusory rope into the the clouds it would become progressively more difficult to maintain the self-deception of the illusory rope. 

       
        </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Conjurations -->

    <!-- Divinations -->
    <section class="section" id="divinationSection"> 
      <header class="hideWrapper sectionHeader">
        <button id="showdivination" class="hidden showButton" onclick="show('divination');">Divinations</button>
        <button id="hidedivination" class="hide" onclick="hide('divination');">[&#8213;]</button>
      </header>
      <article id="divination" class='sectionBody'>
        <h1>Divinations</h1>
        <div class="divider"></div>
        All creatures have a sense for Mana, they are made of it and use in daily to perform various tasks or exert extra effort. 
        <br/><br/>
        Divination is a magic relating to that sense, 
        enhancing it to see minute changes mana in the world around them or a fairly precise makeup of objects they are focused on. 
        <br/><br/>
        All divinations are Rituals and while conjurations are about movement divinations are about stillness and focus allowing an opening the casters senses to a heightened perception of mana. 
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Divinations -->

    <!-- Invocations -->
    <section class="section" id="invocationSection"> 
      <header class="hideWrapper sectionHeader">
        <button id="showinvocation" class="hidden showButton" onclick="show('invocation');">Invocations</button>
        <button id="hideinvocation" class="hide" onclick="hide('invocation');">[&#8213;]</button>
      </header>
      <article id="invocation" class="sectionBody">
        <h1>Invocation</h1>
        <div class="divider"></div>

        <p class="wordNote"><i>Men of such obvious and exemplary charm must be lyers</i><br/> - Said on the Rim</p><br/>

        <span class="indent40"> </span>

        Invocations can be a subtle magic drawing a fine line magic and simple social influence, so thin that there might not be one. 
        While other invocations leave no room to doubt their magical nature. 
        
        <br/><span class="indent40"> </span>

        Invoking is a magic of influence, control and persuasion. 
        Over the years invokers have been called many things by many cultures
         singers, preachers, enchanters, storytellers, clerics, bards, marketers, minstrels, witches, poets, but Lyers is the most universal. 
        
        <br/><span class="indent40"> </span>

        Invoking affects the emotional state of its listeners by strumming or resonating the fae within them; changing mood, behavior or even beliefs of those it affected by the spell.
        It can even influence a creatures will to live or die. 
        
        <br/><span class="indent40"> </span>

        Speech is the most potent means of Invocation. Although various means of creating sound such as instruments or
        even crude methods like humming, whistling, stomping, clapping or banging things together can invoke emotion and behavior.
        Invocations mostly relate to sound, but not entirely, skilled Lyers can invoke with body language alone. 
       
        <h2>Invoke</h2>
        <span class="indent40"> </span>
        
        Invocations are Incantations with the intent to change a creatures immediate emotional and mental state.
        They can be focused on a single individual or spread to many enemies in range. 
        

        <h2>Arcana</h2>
        <span class="indent40"> </span>

        Arcana take more direct control of the behavior or emotions of those they affect. They are capable of emboldening your allies or demoralizing your enemies.  
        Most Invocation are Arcana are overt in their magical nature but for some the targets will be unaware of their effect until they end. 

        <h2>Augments to Rituals</h2>
        
        <span class="indent40"> </span>

        While there are no Invocation rituals various social skills allow augments to Conjurations. 

      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Invocations -->

    <!-- monstrous Worlds -->
    <section class="section" id="monstrousWorldsSection">
      <header class='hideWrapper sectionHeader'>
        <button id="showmonstrousWorlds" class="hidden showButton" onclick="show('monstrousWorlds');">Monstrous Worlds</button>
        <button id="hidemonstrousWorlds" class="hide" onclick="hide('monstrousWorlds');">[&#8213;]</button>
      </header>
      <article id="monstrousWorlds" class="sectionBody">
        <h1>Monstrous Worlds</h1>
        <div class="divider"></div>
        <i><p class="wordNote">As terrible as men are, there are also real monsters out there.</i> <br/>- Yagfae Jaklin </p>
        <p class="wordNote"><b>Prey: one that is hunted</b></p>
        
        <br/>
        <span class="indent40"> </span>Monsters roam the worlds of Prae. For as far back as anyone remembers they have preyed upon humanity. Fables passed down through the generations guess at their nature. Prae provides rules on how the the behavior and power various monsters called Faen. 

      </article>

      <footer class="sectionFooter">
      </footer>
    </section> 
    <!-- End monstrous Worlds -->



    <!-- Combat Overview -->
    <section class="section" id="combatOverviewSection"> 
      <header class="hideWrapper sectionHeader">
        <button id="showcombatOverview" class="hidden showButton" onclick="show('combatOverview');">Combat Overview</button>
        <button id="hidecombatOverview" class="hide" onclick="hide('combatOverview');">[&#8213;]</button>
      </header>
      <article id="combatOverview" class='sectionBody'>
        <h1 id="combatActionRules">Combat Overview</h1>
        <div class="divider"></div>
        <span class="indent40"> </span> Combat is likely to be common over the course of play. While the goals of a combat can vary defending on the narrative all combat will be structured in the same way. Combat in Prae asks its players to pay attention to various aspects of strategy and tactics. Movement, foresight, planning, cooperation, and careful use of resources are all required to succeed and excel in combat. 

        <h2>Combat Structure</h2>
        <span class="indent40"> </span> 

        A typical combat has two sides, the PCs against NPCs controlled by the GM.  Combat is then broken into rounds and turns. Each round is 6 seconds long and is made up of a turn for each character in the combat, once ever character has taken a turn start a new round. 

        <br/> <span class="indent40"> </span>

        While combat is turn based remember that it is simulating a real time combat and many of the mechanics should be imagined from that point of view. A character that is <abbr class="blind">Blinded</abbr> for a <abbr class="round">Round</abbr> is only unable to see for a brief window of time, they still have a mental image of the battle field and other senses to rely on. 
        
        <h3>Intiative order</h3>

        <span class="indent40"> </span>  

        At the start of combat each character rolls initiative to determine the sequence of turns. The character with the highest result gets the first turn, then each other gets a turn sequentially.

        <br/><br/>

        The initiative roll is 1d10 + Initiative (the sum of agility, wit, and empathy).

        <p class="note"><span class="indent40"> </span>

          If a tie occurs the the character with the higher initiative modifier goes first, if there is still a tie each character rolls a die to determine the order, highest die goes first.
        </p>

        <h3>A Turn</h3>
        <span class="indent40"> </span> 

        On each of their turns a character can perform, in any order, an <b>Action</b>, a <b>Move</b> and a <b>Focus</b>. Once per round they can also use one <b>Reaction</b>, and regain the ability to do so at the beginning of their turn.
        

        <p class="note"> <span class="indent40"> </span> 
          In a broad narrative sense these actions normally describe and dominate what the player is doing with aspects of themselves during a round. Actions relate largely to what the upper half of the body is doing, Move to the lower half, and Focus to something the player is giving specific attention to.

          <br/> <span class="indent40"> </span>

          Of course each of them will use some attention, lower body movement, upper body movement this just speaks to some specific things those aspects of their body will be doing during the round.
        </p>
        
        <h2>Communication in combat</h2>
        <span class="indent40"> </span> You can communicate over the course of the round, but keep in mind that a round is only 6 seconds long. If you're trying to have a long conversation with an enemy it should occur over multiple rounds and may often require a variety of skill checks (using your focus) if you're trying to change the  mood, attitude, trust, or behavior of an enemy. 
        

        <br/><span class="indent40"> </span> However, when players are communicating between each other you can be more verbose. Your characters have probably been traveling, training, and talking for a while. Except that they have and developed some short hand for spoken language while also communicate through body language, and can anticipate the actions of their allies in a way you a players cannot. So you should feel more free to speak to your allies about tactics, on your own turn and theirs. Ideally no players turn takes much longer than a minute. Try and be prepared to act quickly or know what questions you want to ask others about their turns or for advice on yours. 
         
        <br/><span class="indent40"> </span> As you get more experienced with the game and your group may choose to set a more strict and lower time limit on a turn. This will further challenge your master of the gaem, keep the flow of the game going, add to the intensity, and optimize your time at the table. 

        <h2>Combat Map</h2>
        <span class="indent40"> </span>

        Combat is intended to be played on hex grid, but a square one will work just fine. A space on the grid represents about 6 feet, 2 yards, or 2 meters. Characters should be represented on the map by some sort of token like a miniature. 

        <br/><span class="indent40"> </span>
        This grid helps players keep track character <a href="#PositionsSection" class="internalLink">position</a> which is important for determing not only the range of attacks, but various circumstantial benefits and penalities based on the relative position of creatures and environmental aspects of the combat map. 

        <h2>Actions</h2>
        <span class="indent40"> </span> At any point during an Action you can pull out or stow one item that is easily accessible and on your person.<br/><br/>
        There are five options for Actions:
        
        <ul id="attackActionList">
          <li>Make an Attack (Strike, Blast or Invoke)</li>
          <li>Use an Trick and make an Attack</li>  
          <li>Defend: Gain <abbr class="round">Round</abbr> <abbr class="vigilant">Covered</abbr></li>          
          <li>Use Sneak to Hide (see <a href="#sneakSection" class="internalLink">Sneak</a>)</li>
          <li>Cleanse, condition removal
            <div>
              <button id="hidecleanse" class="hide" onclick="hide('cleanse');">[&#8213;]</button>
              <button id="showcleanse" class="hide hidden" onclick="show('cleanse');">[ + ]</button>
            </div>
            <div id="cleanse"  class="abilityFieldset namFieldset">
              <div class="namLegend abilityLegend">Cleanse</div>
              <div class="abilityField namField"><b>Action</b> or <b>Focus:</b> 1 Recovery</div>
              <div class="abilityField namField"><b>Effect:</b> Remove a <abbr class="short">Short</abbr>, <abbr class="round">Round</abbr>, or <abbr class="combat">Combat</abbr> condition and all stacks of that condition from yourself</div>
            </div>
          </li>
        </ul>
        
       
        
        <h2>Moves</h2>
        <span class="indent40"> </span> 

        The standard Pace is 6. You can not take an Action or Focus during a Move. To move further you can Run or Sprint.

        <br/><br/>
        
        There are five common options in movement:
        
        <ul id="moveActionList">
          <li>Pace: move up to your Pace 6  (30ft, 12 yards/meters)</li>
          <li>Step: Slide 1</li>
          <li>Run: move up to your Run, see <a href="#athleticsSection" class="internalLink">Athletics</a>, can Focus to roll</li>
          <li>Sprint: move up to your Sprint, see <a href="#athleticsSection" class="internalLink">Athletics</a>, can Focus to roll</li>
          <li>Prone: Stand up from or fall Prone</li>
        </ul>

        <span class="indent40"> </span> There are also a variety special kinds of movement like Jumping, Climbing, Swimming, Crawling, etc. See <a href="#athleticsSection" class="internalLink">Athletics</a>.

        <h2>Focus</h2>
        There are five common options of Focus, and more can be learned through Talents:
        
        <ul>
          <li>Make a Skill roll (except using Sneak to Hide)<sup>[1]</sup></li>
          <li>Swap something in your hands with something stored on your body</li>
          <li>Use equipment readily accessible to do something besides attack<sup>[2]</sup></li>
          <li>Interact with something in your space or an adjacent one<sup>[2]</sup></li>
          <li>Cleanse if used with a Recovery Point, see above</li>
        </ul>
        <p class="note">[1]Unless a character uses a Focus action they must use their passive for all skills checks.</p>
        <p class="note">[2]GM discretion can require additional or alternative actions depending on what the character is doing</p>

        <h2>Reactions</h2>
        There are two common Reactions, and more can be learned through Talents:
        <ul>
          <li>Punish</li>
          <li>Skilled Reaction</li>
        </ul>
        <div class="flex">
        <div id="punish"  class="abilityFieldset handbookAbilityFieldset">
          <div class="namLegend abilityLegend">Punish</div>
          <div class="abilityField abilityKeywords namField">Physical, Threat</div>
          <div class="abilityField namField"><b>Reaction:</b> A creature moves out of a space you threaten without sliding, pushing, or pulling</div>
          <div class="abilityField namField"><b>Effect:</b> Deal |body| Pure damage to them</div>
          <div class="abilityField namField">Note: A creature can be Punished by more than one enemy that threatens them, but not the same enemy more than once in a turn</div>
        </div>

        <div id="skilledReaction"  class="abilityFieldset handbookAbilityFieldset">
          <div class="namLegend abilityLegend">Skilled Reaction</div>
          <div class="abilityField abilityKeywords namField">Physical, Mental, or Social depending on skill</div>
          <div class="abilityField namField"><b>Reaction</b>: Anything that results in you wanting to roll a skill check</div>
          <div class="abilityField namField"><b>Effect</b>: Gain <abbr class="round">Round</abbr> <abbr class="impaired">Impaired</abbr> then roll a skill check, this check is dangerous</div>
        </div>
        </div>
       

        <h2>Delaying your Turn</h2>
        <span class="indent40"> </span> At the beginning of your turn prior to anything else you can choose to delay your turn until a latter time in the initiative order. Change your initiative to a value of your choosing for the remainder of the combat. 

        <h2>Momentum</h2>
        <span class="indent40"> </span> Various abilities require your character to use their Momentum to activate in combat. 
        At the beginning of a characters first turn they gain their Initial Momentum and at the end of each of their turns they gain an additional Momentum. 
        All Momentum is lost at the end of a combat. 

        <h3>Mana Conversion</h3>
        <span class="indent40"> </span>At any point during a round a character can covert Mana to Momentum gaining Momentum equal to their Conversion. 
        <br/><br/>

        Conversion is equal to 3 + (might + will + faith)/3.
        <p class="note"> See <a href="#attributeDetailsSection" class="internalLink">Attribute Details </a> for more information on Mana. 

      </article> <!-- End combatActions -->
      <footer class="sectionFooter">
      </footer>
    </section>
     <!-- End combatActions Section -->


    <!-- Attacking -->
    <section class="section" id="attackingSection">
      <header class='sectionHeader hideWrapper'>
        <button id="showattacking" class="hidden showButton" onclick="show('attacking');">Attacking Rules</button>
        <button id="hideattacking" class="hide" onclick="hide('attacking');">[&#8213;]</button>  
      </header>

      <article id="attacking" class='sectionBody'>
        <h1>Attacking</h1>
        <div class="divider"></div>

        <span class="indent40"> </span>

        During most of your turns in combat you will use your Action to attack. To make an attack must first select a target within range, then roll a number of dice equal to your Rank in the attack, to make a Blast or Invoke attack you must have at least a Basic Rank.  Your modifier for that attack is related to the attack type: Body for Strike, Mind for Blast, and Spirit for Invoke. If the result of the roll meets or exceeds the TN of the attack The result of the roll determines whether you hit or miss with an attack. When Striking or Invoking if you roll a 10 you hit regardless of the targets Guard.
        
        <h2>TN of Attacks</h2>
        <span class="indent40"> </span>

        If your attack is a Strike or Invoke the Target Number of your attack is the targets Guard. If your attack is a Blast the TN is determined by the pattern of Blast you are trying to Conjure, see the <a href="#blast" class="internalLink">Blast</a> section. 

        <p class="note">Striking while wielding two weapons gives +1 to hit, if you hit you can choose which weapon you hit with</p>

        <h3>Damage of Attacks</h3>
        <ul>
          <li>Strike damage is your |body| + your weapon's damage if wielding one.</li>
          <li>Blast damage is 1 + 1 for each Hard String in your Blast pattern.</li>
          <li>Invoke damage depends on the number of dice you hit with, a target takes <abbr class="psychic">Psychic</abbr> 3 damage for each die that hits it.</li>
        </ul>

        <h2>Damage types</h2>
        <span class="indent40"> </span> 

        All attacks deal a type of damage, most of these types are just keywords for other mechanics to reference.

        <br/><span class="indent40"> </span>All weapons have at least one damage type they can deal, if a weapon has more than one type the attacker can choose which type they deal. Weapon damage types are: Bludgeoning, Piercing, or Slashing.

        <br/><br/>

        Invoke deals <abbr class="psychic">Psychic</abbr> damage. 

        <br/><br/>

        Blast damage type depends on the element conjured:
        <ul>
          <li>Earth deals bludgeoning or piercing damage</li> 
          <li>Air deals bludgeoning or slashing damage</li>
          <li>Ice/Water/Inx deals piercing damage</li>
          <li>Fire/Aros deals fire damage</li>
        </ul>

        <h3>Special damage types</h3>
        <ul>
          <li><abbr class="persistent">Severe</abbr> damage reduces maximum HP</li>
          <li><abbr class="psychic">Psychic</abbr> damage ignores armor, but can not damage things without a mind</li>
          <li><abbr class="pure">Pure</abbr> damage ignores armor</li>
        </ul>

        <h2>Threat, Melee Strikes, and Reach</h2>
        <span class="indent40"> </span> 
        Creatures threaten all spaces adjacent to them, those spaces are their threat area. Normally when striking with a melee weapon or unarmed creatures can only reach adjancet spaces. Some weapons or creatures have an increased reach, in such chases this does not increase their threat area. While threat and reach are similar they are two distinct areas.

        <br/><br/>

        Some conditions and circumstances remove a character’s ability to threaten: 
        <ul>
          <li>Prone</li>
          <li>Restrained</li>
        </ul>

        <h2>Combat sense</h2> 
        <span class="indent40"> </span> 

        While in combat it is hard to keep track of everything going on around you. 
        As attention shifts to immediate threats or targets characters can lose track of what is going on around them.
        
        <br/><span class="indent40"> </span> 

        Combat sense is made up of various sensory inputs but also memory, expectation, and communication with allies.
        Normally characters are fully aware of all others on the battlefield, but a variety of circumstances can change this. 
        <br/><span class="indent40"> </span> 

        Normally all creatures in line of sight are in combat sense. While threatened a creatures combat sense is reduced to 3 spaces. All things in combat are either in your combat sense, out of your combat sense, or <abbr class="hideen">Hidden</abbr> from you.

        
        Characters can not normally hide from others in their combat sense, and it is more difficult to shoot at enemies if you are in their combat sense and at distant range. 
        
 Things that are out of your combat sense are not Hidden from you, but it allows them to attempt to hide from you. 

        <br/><span class="indent40"> </span> 
        
        
        <h2 id="ranged">Ranged Attacks</h2>
        <span class="indent40"> </span>

        Ranged attacks include anything from shooting an Arrow, throwing a knife to a Blast or Invoke. 
        When considering what you can target with a ranged attack always consider the line of sight and line of effect requirements of the attack, and the specificed range relating to the weapon or type of attack you are making. 

        <h3>Projectiles</h3>
        <span class="indent40"> </span>

        All projectiles need line of effect and in most cases line of sight.
        In some cases a player may choose to target a location rather than a creature bypassing line of sight, 
        in such cases defer to your GMs discretion on chance to hit of anything in that line of effect. 
        
        <br/><span class="indent40"> </span> 

        Projectile attacks are <abbr class="impaired">Impaired</abbr> by interposing creatures and objects.
        
        <br/><br/>

        All projectiles have 3 ranges <b>close</b>, <b>distant</b>, and <b>arc</b>:
        <ul>
          <li>Close targets you attack normally</li>
          <li>Distant targets are <abbr class="vigilant">Covered</abbr> for each of your allies adjacent to them</li>
          <li>Distant targets are <abbr class="vigilant">Covered</abbr> for every 2 spaces greater than close range if you are inside their combat sense</li>
          <li>Arc targets can not be hit unless you are Hidden, they are stationary and will be for the air time of the attack with a minimum of a full round</li>
          <li>If the Arc target is a crowd, defer to GM discretion for firing into crowds</li>
        </ul>
        
        <p class="note">Creatures with <abbr class="slow">Slow</abbr> do not count as stationary.</p>
        <br/>

        Bow and Sling maximum ranges
        <ul>
          <li>Close: 6 spaces</li>
          <li>Distant: 12 spaces</li>
          <li>Arc: 90 spaces</li>
        </ul>

        Small thrown weapon maximum ranges
        <ul>
          <li>Close: 4</li>
          <li>Distant: 8 spaces</li>
          <li>Arc: 30 spaces </li>
        </ul>
        <p class="note">Characters can throw weapons larger than small. Decrease the maximum ranges by 1,2,10 spaces respectively for each additional size</p>   

        <h3>Blasts</h3>
        <span class="indent40"> </span> 

        Require line of sight to their target. Blasts target a space not an object or creature. The base range of a Blast pattern is 6 spaces but it can be improved by adding Long strings. Blasts are conjured at the target location and thus do not need line of effect. All Blasts are an Area of Effect even if they only affect one space. 
        
        <h3>Invocations</h3>
        <span class="indent40"> </span> 

        Have a range of three and require line of sight to every target. Targets that can't hear you have +1 Guard.
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Attacking -->


    <!-- Movement -->
    <section class="section" id="movementSection">
      <header class='sectionHeader hideWrapper'>
        <button id="showmovement" class="hidden showButton" onclick="show('movement');">Movement Rules</button>
        <button id="hidemovement" class="hide" onclick="hide('movement');">[&#8213;]</button>  
      </header>

      <article id="movement" class='sectionBody'>
        <h1>Movement</h1>
        <div class="divider"></div>

        <span class="indent40"> </span>

        During their move a character can normally move up to their Pace, however movement can be bit complex and there are a variety of obstacles, circumstances, and threats that will affect how you can or might choose to do so.  All of movement must be done at the same time. Moving out of a space an enemy threatens triggers Punish.

        <br/><br/>
        Pace base distance is 6.

        <h2>Difficult Ground</h2>
        <span class="indent40"> </span> 

        Ground can become difficult through a large variety of things. It can be spaces that are actually difficult to move over such as: slopped, slippery, rocky ground, etc. However, mechanically it also refers to anything that slows down movement such as: climbing, swimming, crawling, etc. 

        <br/><span class="indent40"> </span>

        Moving onto a space with Difficult Ground requires an additional movement for each stack of difficult ground. A space that is considered Difficult Ground 3 requires three additional movement, 4 total, to enter that space. Generally effects that create difficult ground stack with each other. 


        <h2>Occupied Spaces</h2>
        <span class="indent40"> </span>

        Creatures occupy spaces related to their size. Creatures can move through spaces their allies occupy but it counts as difficult ground. Sliding allows you to move through an allies space normally or an enemies space as if it were difficult grund. However, can not end your movement in an occupied space.


        <h2>Running, Sprinting, and other Special Movement</h2>
        <span class="indent40"> </span> 

        Your skill in Athletics determines how well you can run, sprint, or use other special movement. Your passive value can be used to give a baseline capability, but you may choose to use your Focus to make a common Athletics check to push yourself to greater distance. You must declare how far you are trying to go when making special moves, this will largely determine the TN of the check. 
        <br/><br/>
        Passive distance with unskilled athletics and 0 might:
        <ul>
        <li>Running 8 spaces. If you run gain <abbr class="round">Round</abbr> <abbr class="impaired">Impaired</abbr> and <abbr class="breached">Breached</abbr></li>
        <li>Sprinting 12 spaces. If you sprint gain 2 <abbr class="round">Round</abbr> <abbr class="impaired">Impaired</abbr> and <abbr class="breached">Breached</abbr></li>
        <li> Swimming 1 space. If you swim gain 3 <abbr class="round">Round</abbr> <abbr class="impaired">Impaired</abbr> and <abbr class="breached">Breached</abbr></li>
        <li> Climbing 1 space. If you climb gain 2 <abbr class="round">Round</abbr> <abbr class="impaired">Impaired</abbr> and <abbr class="breached">Breached</abbr></li>

        <li>Crawling 1 space. You remain Prone</li>
        </ul>

        <p class="note">See the <a href="#athleticsSection" class="internalLink">Athletics</a> section for more detail on determining difficulty, and potential impairment.</p>
        <p class="note">Characters can not take more than one type of special movement per turn.</p>

        <h3>Jumping</h3>
        <span class="indent40"> </span> 

        Characters can jump once during each move in addition to any other special movement. Either Athletics or Acrobatics can be used for jump. Passive value is used unless a character has used a Focus to make a related skill roll this round. 
        
        <br/><br/>
        Passive distance with unskilled athletics and 0 might is 1 space in length and 2 feet in height.

        <h2>Forced Movement</h2>
        <span class="indent40"> </span> Forcing an enemy movement generally represents capitalizing a mistake in enemy timing, balance, or emotional control. The distance they move relates to how long it takes to recover footing and resist the effect that is moving them. Normally it does not represent a force that they couldn’t resist if they were in full control and braced to resist.

        <br/><span class="indent40"> </span> 

        Imagine forcing an allies movement as creating openings in enemies threat area, guiding allies to preferred locations (in real time this would not look like extra movement but rather coordinated movement), and sometimes giving them extra movement through encouragement or magical effects. 

        <br/><span class="indent40"> </span> Some creatures have a Brace attribute, and creatures can use Poise to gain it. Characters with Brace can choose to reduce forced movement by up to their Brace value. Creatures of larger size and height gain two Brace for each size or height greater than 1.

        <p class="note">Forced Movement does not trigger Punish. 
          Forced Movement cannot move creatures onto or through impassable terrain, lift them or move them through solid objects.</p>
        <p class="note">Forced movement's distance is not affected by Difficult Ground. 
          Forcing someone over difficult ground will require them to make a Poise or Acrobatics check at TN 5 + number of spaced forced over difficult ground</p>

        <h3>Types of forced movement</h3>
        <br/><span class="indent40"> </span> <b>Push</b> creatures or objects must move further away from the source for each space pushed. 

        <br/><span class="indent40"> </span> <b>Pulled</b> creatures or objects must end up closer to the source for each space pulled or if they are already adjacent to the source they can be pulled to another adjacent space adjacent to the source. 
          
        <br/><span class="indent40"> </span> <b>Slide</b> can move the creature or object in any direction.         

        <p class="note">Forced movement does not ignore difficult ground, to force a creature into a space that is difficult ground it requires sufficient amount of movement to do so. Forcing into a space with Difficult Ground 3 requires 4 distance of forced movement.</p>
        <h3>Forcing into hazards</h3>
        <span class="indent40"> </span> 

        If a creature is forced into a Solid Object they take 1 damage per remaining space they would of been forced. If this solid object is a creature force them with the same type half the remaining distance. 
        
        <br/><span class="indent40"> </span> 

        If a creature is forced into a space with a significant elevation drop they will make extra effort to maintain their footing, if their position prior to this movement was not adjancet to the drop in elevation they regain their footing. Otherwise this is a case where Skilled Reaction to make a Posie skill check to Brace is wise for the character to try and prevent falling. 

        <h3>Increasing elevation with forced movement</h3>
        <span class="indent40"> </span> Normally effects can not force creatures into the air, however in some cases the GM might decide otherwise. For instance a character trying to get over a wall might try to make a powerful Blast of Air to help push themselves over. In such cases a good rule of thump is twice a characters size or height (which ever is greater) * elevation they are being pushed to for each space. 

        <h2>Flying</h2>
        <span class="indent40"> </span> Some effects allow a creature to fly. If those effects are limited to a number of spaces it is best to imagine these as giant leaps through the air bounding off of objects in the path. This type of movement ignores difficult ground but can not end their movement in the air. 

        <br/><span class="indent40"> </span> Need rules for creatures that can actually fly**


      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Movement -->


    <!-- Obstacles -->
    <section class="section" id="obstaclesSection">
      <header class='sectionHeader hideWrapper'>
        <button id="showobstacles" class="hidden showButton" onclick="show('obstacles');">Obstacle Rules</button>
        <button id="hideobstacles" class="hide" onclick="hide('obstacles');">[&#8213;]</button>  
      </header>

      <article id="obstacles" class='sectionBody'>
        <h1>Obstacles, Size, and Height</h1>
        <div class="divider"></div>
        <span class="indent40"> </span>  Various obactles are likely to show up in and out of combat. The rules here are meant to be general and in play you're likely to find specific cases where they do not quite work. Use your best judgement as to how to handle those situations but make them consistent and predictable is a very important part of how the games plays and making sure all players at the table have agency over their actions. 

        <h2>Solid Objects</h2>
        <span class="indent40"> </span>Objects are solid or not relative to an acting creature. An adult is generally a solid object to a child, but wouldn't be to an elephant. Size, height, material, and how set in an object is all play a part in determing how solid and object is to those acting on it. 

        <br/><span class="indent40"> </span> The solidness of an object can become relevant with forced movement as well as how a character can choose to overcome various obstacles in the world. 


        <h2>Spaces, Size and Height</h2>
        <span class="indent40"> </span>A Space is a 3 dimensional area of about 6 ft^3 area or 2 yards^3 or 2 meters^3.
        The exact dimensions of each space can vary slightly for the sake of story and simplicity. 

        <h3>Sizes</h3>
        <span class="indent40"> </span>Size defines the combined footprint of an object. Each increase in size increases its diameter by 2. 
        To figure out the total number of spaces in a creatures footprint at Size-1*6 spaces to the previous size. 
        The shape of the creature does not have to be spherical this number just allows you to see how many space it does take up, adjust its footprint based on 
        <ul>
          <li>Size 1/2: 1/2 space, 1 Yard or 1 Meter footprint</li>
          <li>Size 1: 1 space, 2 Yards or 2 Meters, 1 space diameter.</li>
          <li>Size 2: 7 spaces, 3 space diameter. 
          <li>Size 3: 19 spaces, 5 space diameter</li>
          <li>Size 4: 37 spaces, 7 space diameter</li>
          <li>Size 5: 61 spaces, 9 space diameter</li>
          <li>etc...</li>
        </ul>

        <h3>Height</h3>
        <span class="indent40"> </span>Height is simply the height of an object. This can go to any resolution the GM wishes but most aspects of combat will refer to whole numbers only. 
        Player characters have a height of 1 meaning they are about 6 ft tall. 
        Narratively this could vary down to 4 and up to 8 while still having a value of 1 for height for combat consideration.  

        For many situations defer to GM discretion for the impact of height on various actions and circumstance. 

        <h4>Sight and Height</h4>
        <span class="indent40"> </span> Creatures can see over things of less height but not equal or higher height. 
        Creatures can see over things of equal height is standing within reach of them. 
        A character with a height of 1 next to a 6 ft fence (height 1) can see over it. 
        To represent this in the world players can stand on their toes, 
        hop or otherwise gain temporary height to see over things slightly taller than them but in the same category. 
        

        <h3>Obstacles and Cover</h3>
        <span class="indent40"> </span> <abbr class="vigilant">Cover</abbr> is gained from obstacles if they are a solid object of at least half your size or height between you and the attacker or an solid object of your size and height partially between you and the attacker. 
        
        <h4>Total Cover</h4>
        <span class="indent40"> </span> A target has total cover if an obstacle more than twice their size and height is between the attacker and the target. 
        A target with total cover can’t be targeted directly by a strike or Invoke.
        

        <h2>Concealment</h2>
        <span class="indent40"> </span> 

        Concealment is something that obscures the senses. Some obstacles will grant concealment and cover, like a stone wall. Others will only grant cover, like a glass wall. While yet others will only grant concealment, like fog.

        <br/><span class="indent40"> </span>
        
        Concealed  is gained to a creature when all of their primary senses are obscured in relation to you. Most creatures primary sense is sight, so often when imagining concealment think of things that obscure vision. Sand storms, fog, darkness, bright lights, etc.
        
        <br/><span class="indent40"> </span> 
        
        Concealment removes you a a creatures combat sense but you are not hidden to them, creatures know your general area and thus the space you are in. While concealed you can be attacked, Strikes are <abbr class="blind">blind</abbr> when doing so and you have +1 Guard vs Invocations.

        <br/><span class="indent40"> </span> 

        While concealed you are not Hidden, Hidden requires you to be obscured to all of there senses, not just their primary ones.
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Movement -->




     <!-- Positions -->
    <section class="section" id="PositionsSection">
      <header class="sectionHeader hideWrapper">
        <button id="showPositions" class="hidden showButton" onclick="show('Positions');">Positions</button>
        <button id="hidePositions" class="hide" onclick="hide('Positions');">[&#8213;]</button>  
      </header>

      <article id="Positions" class='sectionBody'>
        <h1>Positional and Circumstantial Effects</h1>
        <div class="divider"></div>
        <span class="indent40"> </span> Positioning is an important part of Prae's tactical combat. Pay special attention to how you can get positional bonuses and penalties as well as the terrain or other circumstances that you can use to overcome your foes. 

        <h2>Threat area</h2>
        <span class="indent40"> </span>

        Creatures threaten all spaces adjacent to them. Threat by itself does not have an effect but other mechanics will reference threat or threatened spaces/areas (Such as Flanked, Punish, and Attitudes in combat: Dislikes). Properly positioning yourself to use your threat area can greatly change how effective you are in combat. 

        <h2 id="flanked">Flanked</h2>
        <span class="indent40"> </span> If you are threatened by two enemies that are not adjacent to each other you are Flanked. While Flanked you are <abbr class="breached">Breached</abbr>.

        <h2 id="covered">Protected</h2>
        <span class="indent40"> </span> While you are adjacent to an ally you give them <abbr class="vigilant">Cover</abbr>. Some other effect can give Protected but you can only gain 1 stack of <abbr class="vigilant">Cover</abbr> through Protected. Characters do not Protect allies while Prone. 

        <h2 id="difficultGround">Difficult Ground</h2>
        <span class="indent40"> </span> Precarious terrain be it sloped, rockey, slippery, etc. This type of terrain that prevents sure footing making it hard to defend oneself or Blast. For more information on Difficult Ground see the <a href="#movementSection" class="internalLink">Movement</a> section.
        <ul>
          <li>-1 Guard</li>
          <li><abbr class="impaired">Impairs</abbr> Blasts</li>
          <li>Moving onto a space with Difficult Ground requires an additional movement for each stack of difficult ground</li> 
        </ul>

        <h2 id="interposing">Interposing</h2>
        <span class="indent40"> </span>Interposing creatures and objects are those between you and a target. 
          <ul>
            <li>Attacks with a Line of Effect that are not AoE are <abbr class="impaired">Impaired</abbr> for each interposing creature or solid object.
            </li>
          </ul>

        <p class="note">This will most commonly apply to ranged strikes</p>
        <h2 id="prone">Prone</h2>
        <span class="indent40"> </span> Various effects or player choices can cause your character to gain the Prone position. While Prone you do not threaten or protect, move at half speed and cannot climb. It takes a move action to stand from Prone.  

          <ul>
            <li><abbr class="boosted">Boosts</abbr> Melee Strikes targeting you</li>
            <li><abbr class="impaired">Impairs</abbr> Ranged Strikes targeting you</li>
            <li><abbr class="impaired">Impairs</abbr> your Melee Strikes</li>
            <li>Twice <abbr class="impaired">Impairs</abbr> your Ranged Strikes, Invoke and Blasts</li>
          </ul>


        <h2 id="hidden">Hidden</h2>
        <span class="indent40"> </span> The <a href="#sneakSection" class="internalLink">Sneak</a> skill is the primary way to gain Hidden although some abilities or circumstances can give it as well. Whenever you attack you lose Hidden. While hidden enemies can not target you with attacks. 

          <ul>
            <li>When Hidden you gain <abbr class="boosted">Boosts</abbr> twice when making a melee Strike</li>
            <li>When Hidden you gain <abbr class="boosted">Boosts</abbr> when making a ranged Strike</li>
          </ul>
          
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Positions -->

    <!-- Conditions -->
    <section class="section" id="ConditionsSection">
      <header class='sectionHeader hideWrapper'>
        <button id="showConditions" class="hidden showButton" onclick="show('Conditions');">Conditions</button>
        <button id="hideConditions" class="hide" onclick="hide('Conditions');">[&#8213;]</button>  
      </header>

      <article id="Conditions" class='sectionBody'>
        <h1>Conditions</h1>
        <div class="divider"></div>
        <span class="indent40"> </span> 

        Conditions are effects that modify characters or the environment. All conditions have a duration. The conditions listed here are just the ones common enough to have their own name. There are many more that are specifically detailed by the abilities that create them. 
        
        <br/><br/>

        <b>Buffs</b>
        <ul>
          <li><abbr class="vigilant">Covered</abbr>: Strikes targeting you have -1 die, +1 Guard against Invoke, and +1 Armor against AoE</li>
          <li><abbr class="boosted">Boosted</abbr>: +1 die to rolls</li>
          <li><abbr class="haste">Haste</abbr>: +1 Action</li>
          <li><abbr class="quick">Quick</abbr>: +1 Move</li>
          <li><abbr class="focused">Focused</abbr>: +1 Focus</li>
        </ul>

        <b>Debuffs</b>
        <ul>
          <li> <abbr class="breached">Breached</abbr>: Strikes targeting you have +1 die, -1 Guard against Invoke, and <abbr class="vulnerable">Vulnerable</abbr> to AoE</li>
          <li> <abbr class="impaired">Impaired</abbr>: -1 die on rolls</li>
        </ul>
        
        <ul>
          <li><abbr class="blind">Blind</abbr>: Impairs Strikes and can not use Tricks with Strikes</li>
          <li><abbr class="dizzy">Dizzy</abbr>: Impairs Blasts and can not use Tricks with Strikes</li>
          <li><abbr class="gagged">Gagged</abbr>: Impairs Invokes and can not use Tricks with Strikes</li>
        </ul>

        <ul>
          <li><abbr class="stun">Stunned</abbr>: Can not Act, Move, or Focus</li>
          <li><abbr class="restrained">Restrained</abbr>: -1 Action</li>
          <li><abbr class="slow">Slow</abbr>: -1 Move </li>
          <li><abbr class="dazed">Dazed</abbr>: -1 Focus and can not React</li>
        </ul>

        <ul>
          <li><abbr class="burning">Burning</abbr>: Take 1 Pure damage at the beginning of your turn</li>
          <li><abbr class="bleeding">Bleeding</abbr>: Take 1 Pure damage for each Action, Move, or Focus they take</li>
          <li><abbr class="vulnerable">Vulnerable</abbr>: Increase each instance of damage you take by 1</li>
          <li><abbr class="meek">Meek</abbr>: Decrease damage you deal with attacks by 1</li>
          <li><abbr class="poisoned">Poisoned</abbr>: While poisoned all damage you take is Persistant</li>
        </ul> 

        <h2>Stacking Conditions</h2>
        <span class="indent40"> </span> Multiple instances of the same Conditions stack increase the potency of their effect. 

        <p class="note">If you have 4 stacks of Combat Burning you will take 4 Pure damage at the beginning of each of your turns. </p>
        <p class="note">If you give yourself <abbr class="short">Short</abbr> <abbr class="boosted">Boosted</abbr> and two <abbr class="round">Round</abbr> <abbr class="boosted">Boosted</abbr> you'll get 3 extra dice on the first roll you make and 2 on the second before the end of the your next turn.</p>

        <h2 id="durations">Durations</h2>
         <span class="indent40"> </span></span>Each condition has a duration, the durations listed here are the most common and have their own name. 
          <ul>
            <li><abbr class="short">Short</abbr>: Until the first time the condition has an effect or end of creators next turn, whichever is first.  ~3 seconds out of combat.</li>
            <li><abbr class="round">Round</abbr>: Until the end of creators next turn. ~6 seconds out of combat </li>
            <li><abbr class="combat">Combat</abbr>: Until you can take a breather or between 30-120 seconds out of combat</li>
            <li><abbr class="rest">Rest:</abbr>: Until you can take a short rest</li>
            <li><abbr class="day">Day</abbr>: The next time the character has a long rest</li>
            <li><abbr class="chronic">Chronic</abbr>: No duration end </li>
          </ul>
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Conditions -->

    <!-- Attitude and Combat -->
    <section class="section" id="AttitudeCombatSection">
      <header class='sectionHeader hideWrapper'>
        <button id="showAttitudeCombat" class="hidden showButton" onclick="show('AttitudeCombat');">Attitude and Combat</button>
        <button id="hideAttitudeCombat" class="hide" onclick="hide('AttitudeCombat');">[&#8213;]</button>  
      </header>

      <article id="AttitudeCombat" class='sectionBody'>
        <h1>Attitude and Combat</h1>
        <div class="divider"></div>
        <span class="indent40"> </span>
        Understanding the tactics and attitudes of creatures is an important for survival. A creatures attitude relates to who they prefer to attack and their tactics relate to how they move to get there. The more intelligent the creature the most sophsicated their combat tactics and attitudes. More details are provided in the accompanying Fables of Faen book.   

        <h2>Combat Strategy</h2>
        <span class="indent40"> </span>

        A creatures strategy dictates how they move, who they attack, and when they use abilities. Their strategy is a combination of their tactics and attitudes. 
        <br/><br/>
        Common Tactics, see <a href="golem-studios.com/faen_fables.html" class="internalLink">Fables of Faen</a> for more details 
        <ul>
          <li><b>Aggressive:</b> Moves to Flank, when approaching a creature will assume allies want to Flank and will move to the a space that allows them to do so. Won't run or sprint unless they can't reach anyone with their Pace. If they have an attack preference they dislike but can't reach and they can be punished they will step toward them unless that breaks a Flank of an enemy. Tie breaker Dislikes:l Lowest HP, Lowest Guard, Lowest Armor.</li>
          <li><b>Defensive:</b> Movest to Protect allies, when approaching a target they will move head on so allies can move adjacent and get Protected. Won't run or sprint unless they can't reach anyone with their Pace. They won't pursue fleeing enemies. Tie breaker Dislikes: did the most damage, highest Brawn</li>
          <li><b>Flighty (X):</b> Aggressive until X, often Desperate, then Defensive and will try and flee</li>
          <li><b>Dumb:</b> Move directly toward target with no consideration for flank or protection</li>
          <li><b>Tactical:</b> GM decides movement to be as effective as possible</li>
        </ul>

        <h2>Attitude</h2>
        <span class="indent40"> </span> 

        Attitude determines the attack preferences of creatures.  Attitude is affected by the characteristics or other creatures and circumstances. These attitudes can cause a monster to ignore, hate, or dislike various targets. 
        
        <ul>
          <li><b>Ignore:</b> Only attack if no other enemies can be reached this round without being punished</li>
          <li><b>Hate:</b> Attack even if they will be punished to while moving to reach them</li>
          <li><b>Dislike:</b> Attack they can be punished for moving to do so, (enemies have to both be threatening the path of movement and have a reaction to punish)</li>
        </ul>
        
        <span class="indent40"> </span>

        Start at the top of a characters attitude list and read down until there is a enemy creature meets one of the criteria, that is who they will attack this round. All creatures lowest priority attitude is 'Dislike: Closest enemy'. 

        <p class="note">If two targets are valid use the next lower criteria to determine who they will attack. If you go through all attitude criteria and there are still more than one valid target roll a die to determine which one is the preferred target for the combat or leave it up to GM discretion. 

        </p>
                
        <p class="wordNote"><i>Examples</i>
        <button id="hideCombatAttitudeExample" class="hide hidden" onclick="hide('CombatAttitudeExample');">[―]</button>
        <button id="showCombatAttitudeExample" class="hide" onclick="show('CombatAttitudeExample');">[ + ]</button>
        <blockquote id="CombatAttitudeExample" class="hidden">
          <b>Howler</b>
          <ul>
            <li>Tactics, Aggressive: Positions to Flank</li>
            <li>Hates: Flanked and Unprotected</li>
            <li>Dislikes: Flanked</li>
            <li>Dislikes: Unprotected</li>
          </ul>

          <b>Omul</b>
          <ul>
            <li>Tactics, Defensve: Positions to Protect and be Protected</li>
            <li>Hates: Enemy that did the most damage to them last turn</li>
            <li>Ignores: Injured</li>
            <li>Dislikes: Highest Brawn</li>
          </ul>

          <b>Goblyn</b>
          <ul>
            <li>Tactics, Flighty: Aggresive until Desperate then Defensive and tries to flee</li>
            <li>Hates: Creatures they are hidden from</li>
            <li>Hates: Injured</li>
            <li>Dislikes: Lowest HP</li>
            <li>Dislikes: Shinniest target</li>
          </ul>
        </blockquote>
      </p>
        
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Conditions -->



    <!-- Creation Skills-->
    <section class="section" id="characterCreationSection">
      <header class="sectionHeader hideWrapper">
        <button id="showcharacterCreation" class="hidden showButton" onclick="show('characterCreation');">Starting Skills & Abilities</button>
        <button id="hidecharacterCreation" class="hide" onclick="hide('characterCreation');">[&#8213;]</button>  
      </header>

      <article id="characterCreation" class="sectionBody">
        <h1>Character Creation: Skills and Abililties</h1>
        <div class="divider"></div>

        <h2>Check List</h2>
          <ul>
           <li>4 Childhood skill points (1 Physical, 1 Mental, 1 Social, 1 any)</li>
           <li>3 Training skill points (No more than 2 can be in the same category)</li>
           <li>3 more Training skill points used to increase any Basic to Trained Rank</li>
           <li>Select Way</li>
           <li>6 Abilities from skills with at least Basic training (1 Ritual, 1 Talent, 1 Trick, 2 Arcana, 1 any)</li>
           <li>Select Primary, Secondary and Tertiary Attributes (Body/Mind/Spirit)</li>
           <li>Primary and Secondary get a value of 2, Tertiary gets a value of 1</li>
           <li>Distribute points into Sub-Attributes (3 for Primary, 2 for Secondary, 1 for Tertiary) </li>
           <li>Select starting gear</li>
          </ul>
  
        <h2>Starting Skills</h2>
        Each character starts out with 2 sets of skills:
        <ul>
          <li>Childhood</li>
          <li>Training</li>
        </ul>

        <h3>Childhood</h3>
          <span class="indent40"> </span>The group of skills represents things that your character enjoyed doing or was forced to do in great frequency before the age of ~12.<br/>

          <span class="indent40"> </span>Try to think about what significantly influenced your character when they were a child. 
          These should relate to games your character played, required study, work, what they needed to do to survive, significant hobbies they had, or things their parent/caretaker/mentor/friends taught them. <br/>

          <span class="indent40"> </span>If your father was a soldier it is likely you grew up learning Strike, if your Mother was a scholar you might of grown up in a house full History books, or if you grew up on the street and you needed to hide and steal to survive maybe you learned  Sneak or Deception. <br/>

          <span class="indent40"> </span>In all likeliness there are few things that your player enjoys as much (or in some cases hates) as performing tasks related to these skills.
          <br/><br/>

          Increase each of the following to Basic skill rank:
          <ul>
            <li>1 physical skill</li>
            <li>1 mental skill</li>
            <li>1 social skill</li>
            <li>1 skill of Player’s choice</li>
          </ul>

        <h3>Training</h3>
          <span class="indent40"> </span>This group of skills represents how they grew from their childhood to where they are at the start of their adventure. 
          Adventurers often have intense, extreme and even traumatic backgrounds.
          What circumstances led your character to the dangerous, risky, and often lonely life of an adventurer.
          What stretched them to become who they are today.<br/>

          <span class="indent40"> </span>Your character could of received training any number of ways: 
          A school, soldiers academy, been forced to fight as a young gladiator, 
          born into a thieves guild, or simply trained themselves.<br/>

          <span class="indent40"> </span>In most cases this will relate directly to their <a href="#ways" class="internalLink">Way</a>. 
          Think of where your character would of been and what they would of been doing between the ages of ~12 and ~20. 
          What was their path that led to where they are today, then pick a skills that relate to that experience. 
          <br/>
          <br/>

          Increase each of the following to Basic skill rank:
          <ul>
            <li>1 physical, mental, or social skill</li>
            <li>1 skill of a different category than above</li>
            <li>1 skill of Player’s choice</li>
          </ul>

          Then increase any three skills of Basic to Trained Rank.

        <h3>Way</h2>
        Characters will increase one of their attack skills to Trained based on their Way. 


        <h2>Starting Abilities</h2>
        <span class="indent40"> </span>The abilities a character can choose are determined by their starting skills.<br/>
        A character must have at least a Basic Rank in a skill to choose its abilities. 
        <br/>
        <span class="indent40"> </span>Character start with any one Talent, one Trick, two Arcana, one Ritual, and one additional ability of the player's choosing. Additionally a characters Way will teach them one Talent and a Trick. 

        <h2>Career</h2>
        <span class="indent40"> </span>As characters progress past their Training the number of skills and abilities they know will increase, as will the maximum Rank of their skills. 

        <p class="note">See the <a href="#progress" class="internalLink">Gaining Levels</a> section. 
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Creation Skills -->

    <!-- Progression -->
    <section class="section" id="progressionSection">
      <header class="sectionHeader hideWrapper">
        <button id="showprogression" class="hidden showButton" onclick="show('progression');">Show progression</button>
        <button id="hideprogression" class="hide" onclick="hide('progression');">[&#8213;]</button>  
      </header>

      <article id="progression" class="sectionBody">
        <h1>Character Creation: progression</h1>
        <div class="divider"></div>
        <span class="indent40"> </span> 

        Throughout the course of play your character will overcome various obstacles improving their skills and abilities as well as learning new ones. This is represented by your character gaining levels. 

        <h2>Gaining Experience</h2>

        <h2>Gaining Levels</h2>

        <span class="indent40"> </span> At each level characters gain an additional attribute point to be spent on a specific priority of sub-attribites, a skill point, and 2 hit points per health categroy, as well as an increase to an attribute or a new ability. At levels 3, 7, and 10 the maximum Skill Rank also increases. 

         <div class="abilityFieldset">
          <div class="abilityLegend gLegend">Level Progression</div>
          <div class="flex bold abilityField gField">
            <div class="progressionCell">Level</div>
            <div class="progressionCell">Attributes</div>
            <div class="progressionCell">Att Points</div>
            <div class="progressionCell">Abilities</div>
            <div class="progressionCell">Skill Points</div>
            <div class="progressionCell">Max Rank</div>
            <div class="progressionCell">Hit Points</div>
            <div class="progressionCell">TNL</div>
          </div>
          <div class="flex abilityField gField">
            <div class="bold progressionCell">1</div>
            <div class="progressionCell">2/2/1</div>
            <div class="progressionCell">3/2/1</div>
            <div class="progressionCell">2/2</div>
            <div class="progressionCell">7</div>
            <div class="progressionCell">Trained</div>
            <div class="progressionCell">30/20/10</div>
            <div class="progressionCell">11</div>
          </div>
          <div class="flex abilityField gField">
            <div class="bold progressionCell">2</div>
            <div class="progressionCell">3/2/1</div>
            <div class="progressionCell">4/2/1 (+1P)</div>
            <div class="progressionCell">-</div>
            <div class="progressionCell">8</div>
            <div class="progressionCell">Trained</div>
            <div class="progressionCell">36/24/12</div>
            <div class="progressionCell">12</div>
          </div>
         <div class="flex abilityField gField">
            <div class="bold progressionCell">3</div>
            <div class="progressionCell">3/2/1</div>
            <div class="progressionCell">4/3/1 (+1S)</div>
            <div class="progressionCell">+1</div>
            <div class="progressionCell">9</div>
            <div class="progressionCell">Trained</div>
            <div class="progressionCell">42/28/14</div>
            <div class="progressionCell">13</div>
          </div>
          <div class="flex abilityField gField">
            <div class="bold progressionCell">4</div>
            <div class="progressionCell">3/2/2</div>
            <div class="progressionCell">4/3/2 (+1T)</div>
            <div class="progressionCell">-</div>
            <div class="progressionCell">10</div>
            <div class="progressionCell">Adept</div>
            <div class="progressionCell">48/32/16</div>
            <div class="progressionCell">14</div>
          </div>
          <div class="flex abilityField gField">
            <div class="bold progressionCell">5</div>
            <div class="progressionCell">3/2/2</div>
            <div class="progressionCell">5/3/2 (+1P)</div>
            <div class="progressionCell">+1</div>
            <div class="progressionCell">11</div>
            <div class="progressionCell">Adept</div>
            <div class="progressionCell">54/36/18</div>
            <div class="progressionCell">15</div>
          </div>
          <div class="flex abilityField gField">
            <div class="bold progressionCell">6</div>
            <div class="progressionCell">3/3/2</div>
            <div class="progressionCell">5/4/2 (+1S)</div>
            <div class="progressionCell">-</div>
            <div class="progressionCell">12</div>
            <div class="progressionCell">Adept</div>
            <div class="progressionCell">60/40/20</div>
            <div class="progressionCell">16</div>
          </div>
          <div class="flex abilityField gField">
            <div class="bold progressionCell">7</div>
            <div class="progressionCell">3/3/2</div>
            <div class="progressionCell">5/4/3 (+1T)</div>
            <div class="progressionCell">+1</div>
            <div class="progressionCell">13</div>
            <div class="progressionCell">Expert</div>
            <div class="progressionCell">66/44/22</div>
            <div class="progressionCell">17</div>
          </div>
          <div class="flex abilityField gField">
            <div class="bold progressionCell">8</div>
            <div class="progressionCell">4/3/2</div>
            <div class="progressionCell">6/4/3 (+1P)</div>
            <div class="progressionCell">-</div>
            <div class="progressionCell">14</div>
            <div class="progressionCell">Expert</div>
            <div class="progressionCell">72/48/24</div>
            <div class="progressionCell">18</div>
          </div>
          <div class="flex abilityField gField">
            <div class="bold progressionCell">9</div>
            <div class="progressionCell">4/3/2</div>
            <div class="progressionCell">6/5/3 (+1S)</div>
            <div class="progressionCell">+1</div>
            <div class="progressionCell">15</div>
            <div class="progressionCell">Expert</div>
            <div class="progressionCell">78/52/26</div>
            <div class="progressionCell">19</div>
          </div>
          <div class="flex abilityField gField">
            <div class="bold progressionCell">10</div>
            <div class="progressionCell">4/3/3</div>
            <div class="progressionCell">6/5/4 (+1T)</div>
            <div class="progressionCell">-</div>
            <div class="progressionCell">16</div>
            <div class="progressionCell">Master</div>
            <div class="progressionCell">84/56/28</div>
            <div class="progressionCell">20</div>
          </div>
          <div class="flex abilityField gField">
            <div class="bold progressionCell">11</div>
            <div class="progressionCell">4/3/3</div>
            <div class="progressionCell">7/5/4 (+1P)</div>
            <div class="progressionCell">+1</div>
            <div class="progressionCell">17</div>
            <div class="progressionCell">Master</div>
            <div class="progressionCell">90/60/30</div>
            <div class="progressionCell">21</div>
          </div>
        </div>

        <h2>Other Progression</h2>
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End progression -->

    <!-- Strike -->
    <section class="section" id="strikeSection">
        <header class="sectionHeader hideWrapper">
          <button id="showstrikeOverview" class="hidden showButton" onclick="show('strikeOverview');">Strike Attack Skill</button>
          <button id="hidestrikeOverview" class="hide" onclick="hide('strikeOverview');">[&#8213;]</button>
        </header>
        <article id="strikeOverview" class="sectionBody">
          <h1>Strike</h1>
          <div class="divider"></div>
          <span class="indent40"> </span> All physical attacks are a Strike regardless of if the character is using a melee weapon, ranged weapon, or their body to attack. 
          The relative position of you, your target, and your allies has significant impact on how effective a Strike can be.  
          <br/>
          <br/>
          The base damage and modifier to Strike attacks is |body|. 
          <h2>Positions and Strikes</h2>
          <ul>
            <li><a href="#PositionsSection" class="internalLink">Flanked</a> targets are <abbr class="breached">Breached</abbr> giving +1 die on Strikes</li>
            <li><a href="#PositionsSection" class="internalLink">Protected</a> targets are <abbr class="covered">Covered</abbr> giving -1 die on Strikes</li>
            <li><a href="#PositionsSection" class="internalLink">Prone</a> targets are <abbr class="breached">Breached</abbr> to Melee Strikes and <abbr class="covered">Covered</abbr> to Ranged</li>
            <li>Ranged targets are <abbr class="covered">Covered</abbr> for each <a href="#PositionsSection" class="internalLink">Interposing</a> object or creature</li>
          </ul>
          
          <h2>Critical Marks and Strikes</h2>
          <ul>
            <li>Critical Marks increase the damage of your attack by 1. </li>
            <li>Can trigger Critical Effects</li>
          </ul>

          <h2>Strike Fighting Styles</h2>
          <span class="indent40"> </span> Each Rank of Strike, starting at Basic, allows a character to specialize in a style of fighting that when utilized increases the critical range of their Strikes.
          <ul>
            <li>Assassin: +2 CR if hidden, +1 if ranged</li>
            <li>Dancer: +1 CR if you have Slid this round</li>
            <li>Mover: +2 CR with melee if your space is at least 3 from where you started your turn</li>
            <li>Opportunist: +1 CR if target is Breached</li>
            <li>Isolator: +1 CR if target is not Protected</li>
            <li>Steady: +1 CR if you have not moved this round</li>
            <li>Vanguard: +1 CR if more enemies are adjacent to you than allies</li>
          </ul>
          <!-- <b>Bludgeoning Specializations</b><br/>
          Knock CS 2: Push a hit enemy up to 3<br/>
          Topple CS 4: Knock a hit enemy Prone<br/><br/>

          <b>Piercing Specializations</b><br/>
          Spring CS 2: Slide and fly up to 3<br/>
          Pierce CS 4: Increase damage by 2<br/><br/>

          <b>Slashing Specailizations</b><br/>
          Bind CS 2: <abbr class="short">Short</abbr> <abbr class="breached">Breached</abbr> to a hit enemy<br/>
          Rend CS 4: <abbr class="combat">Combat</abbr> <abbr class="vulnerable">Vulnerable</abbr> to a hit enemy<br/><br/>
          
          <b>Two Handed Specailizations</b><br/>
          Wielding Two Handed: Reach<br/>
          Cleave CS 4: Deal weapon damage to second enemy within reach<br/><br/>

          <b>Shield Specailizations</b><br/>
          Wielding Shield: +1 armor to AoE<br/>
          Breathe CS 2: <abbr class="combat">Combat</abbr> Reinforce 2<br/>
        -->
        </article>
        <footer class="sectionFooter">
        </footer>
    </section> 
    <!-- End Strike -->

    <!-- Blast -->
    <section class="section" id="blastSection">
      <header class="sectionHeader hideWrapper">
        <button id="showblastOverview" class="hidden showButton" onclick="show('blastOverview');">Blast Attack Skill</button>
        <button id="hideblastOverview" class="hide" onclick="hide('blastOverview');">[&#8213;]</button>
      </header>
      <article id="blastOverview" class="sectionBody">
        <h1 id="blast">Blast</h1>
        <div class="divider"></div>

        <h2>Blasts</h2>
        <span class="indent40"> </span> 

        Blasts are a relatively simple but unique conjurations. All conjurations weave strings of Fae together to for matter, Blasts do so with velocity and up to some distance from the weaver and they are quick to evanesce lasting no more than a few seconds. When Blasting the character must choose at least one element they are proficient which describes the type of Blast and adds an effect.
        
        <br/><span class="indent40"> </span> 
        
        To use a Blast attack the character must have at least Basic Rank in the attack.
        
        Blasts are not subject to <a href="#loe" class="internalLink">Line of Effect</a> but the caster does need <a href="#los" class="internalLink">Line of Sight</a> to the target space.
        
        <p class="note">See <a href="#magicSection" class="internalLink">Magic</a> and <a href="#conjurationSection" class="internalLink">Conjuration</a> sections for more details. 
        <h2>Blast Area</h2>
        <span class="indent40"> </span> 

        Blasts, unlike Strike and Invoke, are a struggle against nature not an enemies Guard. They target an area and deal damage to all things in the area affected. By default the Blast Area has a diameter of 6 feet (2 meters/yards) or 1 space. 

        <p class="note">All Blasts have the AoE (Area of Effect) Keyword. Cover gives +1 Armor against AoE attacks, including Blasts</p>

        <h2>Constructing a Pattern</h2>
        <span class="indent40"> </span>

        Prior to Weaving a Blast a character must construct the Blast's Pattern.
        <br/>

        Base Blast pattern:
        <ul>
          <li>Damage: 1 </li>
          <li>Range: 6 spaces (~36 feet,  12 yards, or 12 meters)</li>
          <li>Blast Area: 1 space</li>
          <li>TN to cast: 5</li>
        </ul>
        <span class="indent40"> </span> 

        Weavers can choose to increase their Patterns potency and TN by adding Strings to their Blast. There is no limit to the variety of Strings that can be added nor the amount of each type.
        
        <br/><br/>

        String-Name (TN Increase): Bonus from adding this String
        <ul>
          <li>Hard (1): +1 Damage </li>
          <li>Soft (1): Store 1 power </li>
          <li>Wide (2): +2 Blast Area diameter </li>
          <li>Long (1): +1 Range </li>
        </ul>
        <span class="indent40"> </span> 

        After constructing their Pattern the caster makes a Blast roll and must meet or exceed the cast TN to complete and cast it. 

        <p class="note">If you only add Soft strings you may choose to to just store the power without needing to target a space and deal damage.</p>
      
        <h2>Critical Marks and Blasts</h2>
        <span class="indent40"> </span> 

        Marks do not add damage to Blasts, instead the caster stores power equal to their Critical Marks. Stored power can be spent prior to rolling a Blast to get +1 to hit for each Power spent. 
        
        <br /><span class="indent40"> </span> 
        
        If a character starts a turn with more than 9 stored power all of their power, except that gained from Critical Marks on Blasts this turn, is lost. 
        
        <h2>Elemental Proficiencies</h2>
        <span class="indent40"> </span> 

        Each Rank of this attack, starting at Basic, allows a character to become proficient in one basic elemental effect or an advanced element if they are already proficient in one of its basic elements. When Blastng choose one effect you are proficient in to apply to the Blast.
        
        <h3>Basic Elements</h3>  
        <ul>
          <li>Barrier (Earth): You or ally within range gains <abbr class="short">Short</abbr> +2 Armor</li>
          <li>Gust (Air): Push or Pull a creature in Blast Area up to 2, +1 per long string</li>    
          <li>Chill (Water): <abbr class="round">Round</abbr> <abbr class="vulnerable">Vulnerable</abbr> to all creatures in the blast area</li>
          <li>Ignite (Fire): A creature in Blast area gains <abbr class="combat">Combat</abbr> <abbr class="burning">Burning</abbr></li>
        </ul>

        <h3>Advanced Elements</h3>
        <span class="indent40"> </span> 

        Blast specializations are a combination of elements, a character must be proficient in one of the combined elements to learn a specialization.
        
        <ul>
          <li>Sandstorm (Earth & Air): <abbr class="round">Round</abbr> creatures in Blast Area are <abbr class="blind">Blinded</abbr></li>
          <li>Mud (Earth & Water): <abbr class="round">Round</abbr> Blast Area becomes Difficult Ground 1</li>
          <li>Cinder (Earth & Fire): <abbr class="combat">Combat</abbr> a space in Blast Area deals 3 pure damage to any creature that enters or ends their there</li>
          <li>Fog (Air & Water): <abbr class="combat">Combat</abbr> spaces in the blast area block vision through them but not into or out of them</li>
          <li>Lightning (Air & Fire): Blast affects all spaces between you and the target space, width 1</li>
          <li>Steam (Water & Fire):  <abbr class="round">Round</abbr> spaces in blast area block vision through them but not into or out of them and deal 1 pure damage to creatures that enter them or ends their turn there</li>
        </ul>

         <h2>Impaired by</h2>
        <ul>
          <li>Difficult ground</li>
          <li>Each enemy that threatens you</li>
          <li>Light Armor</li>
          <li>Shield</li>
          <li>Heavy Armor, <abbr class="impaired">impairs</abbr> twice</li>      
        </ul>
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Blast -->

    <!-- Invocation -->   
    <section class="section" id="invokeSection">
        <header class="sectionHeader hideWrapper">
          <button id="showinvokeOverview" class="hidden showButton" onclick="show('invokeOverview');">Invoke Attack Skill</button>
          <button id="hideinvokeOverview" class="hide" onclick="hide('invokeOverview');">[&#8213;]</button>  
        </header>

      <article id="invokeOverview" class="sectionBody">
        <h1>Invoke</h1>
        <div class="divider"></div>
        <span class="indent40"> </span> 

        <a href="#invocationSection" class="internalLink">Invoking</a> draws forth vairous emotions that impact the mind, create mental fatigue draining cognitive abilities, or even drive insane.
        
        <br/><span class="indent40"> </span> 

        Sound and fine control of it such as with speech is vital to effectively using Invocations. While targets don't need to share the same language, they do need to be able to be close enough to resonate the strings and display intent to create a emotional and psychic influence. While it is more difficult to do Invoking can be done through non-speech sounds and body language. 
        <br/><span class="indent40"> </span> 

        To use a Invoke attack the character must have at least Basic Rank in the attack, Invokes modifier is |spirit|.

        <p class="note"></p>

        <h2>Targets and Hitting with Invoke</h2>
        <span class="indent40"> </span> 

        Unlike other attacks each die of a Invoke hits or misses independently. Each die can choose a target within 3 spaces, any number of dice can be allocated to the same target.

        <br/><span class="indent40"> </span> 

        Each die hits and misses independently and can target a allies or enemies.
        Add |spirit| to each die to determine if they hit or miss. The TN to hit allies is 10 and for enemies it is their Guard. Allies heal 3 and enemies take 3 <abbr class="psychic">Psychic</abbr> damage for each die that hits them.

        <p class="note">All damage done to each creature is considered a single instance of damage</p>
        <p class="note">Dev Note *I might remove the healing option or restrict it to a small portion of the attack pool of to prevent any pressure or expectation of being a pure healer.</p>
        
        <h2>Conditions and Invoke</h2>
        <ul>
          <li>+1 to hit Flanked enemies</li>
          <li>-1 to hit Protected enemies</li>
          <li>-1 to hit Flanked allies</li>
          <li>+1 to hit Protected allies</li>
        </ul>
       
        <h2>Critical Marks and Invoke</h2>
        <ul>
          <li>Gain 1 momentum for each Critical Mark</li>
        </ul>
        
        <h2>Emotional Specializations</h2>
        <span class="indent40"> </span> Each Rank of Invoke, starting at Basic, allows a character to specialize in an Emotion. Invoke draws forth lots of emotions these specializations allowing for strengthening of specific ones. Each specialization applies to each die but emotions only affect allies or enemies.

        <ul>
          <li>Ire: Dice that miss enemies deal 1 damage</li>
          <li>Tranquility: Dice that miss allies heal 1</li>
          <li>Valor: Each hit ally gains Short Boosted</li>
          <li>Fear: Each hit enemy gains Short Impaired</li>
          <li>Hope: +1/2 to hit Marred/Desperate allies</li>
          <li>Despair: +1/2 to hit Marred/Desperate enemies</li>
          <li>Misery: +1 to hit for each enemy targeted</li>
          <li>Elation: +1 to hit for each ally targeted</li>
        </ul>      
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Invoke -->

    <!-- Pull Skills from Data Base -->
    
      <!-- Athletics -->
      <section class="section" id="AthleticsSection">
        <header class="sectionHeader hideWrapper">
          <button id="showAthletics" class="hidden showButton" onclick="show('Athletics');">Athletics</button>
          <button id="hideAthletics" class="hide" onclick="hide('Athletics');">[&#8213;]</button>  
        </header>

        <article id="Athletics" class="sectionBody">
          <h1>Athletics</h1>
          <div class="divider"></div>

          <div id="AthleticsDescription"><span class="indent40"> </span> Athletics covers actions related to strength and speed of movement. Such as Climbing, Crawling, Jumping, Running, Sprinting, and Swimming. 

<br/><span class="indent40"> </span> 

Sustaining any athletic action for while can cause fatigue or eventually exhaustion see the <a href="#EnduranceSection" class="internalLink">endurance</a> section for details. Active athletics checks are used for a round by round basis for sustained speed, such as travel speed while running always use the passive value. 

<h2>Climbing</h2>
<span class="indent40"> </span> When determining difficulty for climbing the TN depends on what you are trying to climb and how quickly you are trying to move. Acrobatics can also be used for climbing. 

<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>TN for climbing Rope or VO bouldering scale: 3</li>
<li>Base Movement: 1 space per move</li>
<li>+1 TN per additional space you want to move</li>
</ul>

<p><i>Speed TN Chart</i> 
<button id="hideclimbSpeedTN" class="hide hidden" onclick="hide('climbSpeedTN');">[&#8213;]</button>
<button id="showclimbSpeedTN" class="hide" onclick="show('climbSpeedTN');">[ + ]</button>
</p>

<blockquote id="climbSpeedTN" class="hidden">
<ul>
    <li>TN 5: 3 spaces</li>
    <li>TN 7: 5 spaces</li>
    <li>TN 10: 8 spaces (Speed climbing world record, 6 mph)</li>
    <li>TN 14: 12 spaces </li>
</ul>

<h3>References</h3>
<a href="https://www.youtube.com/watch?v=yq8-T2tDGV8"> Climbing old castle walls</a><br/>
<a href="https://www.youtube.com/watch?v=NUgOKoGsmq4"> Quick 20' climb</a><br/>
<a href="https://www.youtube.com/watch?v=n4n6xfu8VDU"> World record speed climb</a>
<a href="https://youtu.be/e863Qr0jaYo?t=221">Comparison of climb speeds on a speed climbing wall</a>
</blockquote>

<h3>Impaired by</h3>
<ul>
    <li>Heavy armor</li>
</ul>


<p class="note">On rounds you climb you are <abbr class="impaired">Impaired</abbr> 2 when making attacks or using skills other than athletics and endurance and <abbr class="breached">Breached</abbr> 2</p>

</blockquote>

<h2>Crawling</h2>
<span class="indent40"> </span> Moving while Prone is much slower than when on your feet, the TN depends on how quickly you are trying to move. Crawling may often give circumstantial bonuses, such as a <abbr class="boosted">boost</abbr> to stealth. Acrobatics can also be used for climbing. 
<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 3</li>
<li>Base Movement: 1 space per move</li>
<li>+1 TN per additional 2 feet you want to move (+3 per space)</li>
</ul>

<p><i>Speed TN Chart</i> 
<button id="hidecrawlSpeedTN" class="hide hidden" onclick="hide('crawlSpeedTN');">[&#8213;]</button>
<button id="showcrawlSpeedTN" class="hide" onclick="show('crawlSpeedTN');">[ + ]</button>
</p>

<blockquote id="crawlSpeedTN" class="hidden">
<ul>
    <li>TN 5: 3 spaces </li>
    <li>TN 7: 4 spaces</li>
    <li>TN 10: 6 spaces </li>
    <li>TN 14: 10 spaces </li>
</ul>
</blockquote>
</blockquote>

<h2>Jumping</h2>
<span class="indent40"> </span> The difficulty of a jump is determined by the distance and height of the job. A jump can be performed in during a move but does not allow a character to move further than they normally can. Acrobatics can also be used for jumping. 

<p class="note">The TNs provided assume the character is moving and not stationary before jumping, most of the time this will be the case but momentum is not easily communicated in a turn based game. Reduce these distance by half if you are making a jump from a stationary position</p>
<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 3</li>
<li>Base distance: 1 space (6 feet) </li>
<li>Base height: 2 feet</li>
<li>+1 TN per additional 3 feet of distance you want to add (2 per space)</li>
<li>+1 TN per additional foot of height you want to add </li>
</ul>

<p><i>Distance TN Chart</i> 
<button id="hidejumpDistanceTN" class="hide hidden" onclick="hide('jumpDistanceTN');">[&#8213;]</button>
<button id="showjumpDistanceTN" class="hide" onclick="show('jumpDistanceTN');">[ + ]</button>
</p>

<blockquote id="jumpDistanceTN" class="hidden">
This chart is for adding only distance to the jump
<ul>
    <li>TN 5: 2 spaces </li>
    <li>TN 7: 3 spaces</li>
    <li>TN 11: 5 spaces (world record is ~ 30 ft) </li>
    <li>TN 15: 7 spaces </li>
</ul>
</blockquote>

<p><i>Height TN Chart</i> 
<button id="hidejumpHeightTN" class="hide hidden" onclick="hide('jumHeightTN');">[&#8213;]</button>
<button id="showjumpHeightTN" class="hide" onclick="show('jumpHeightTN');">[ + ]</button>
</p>

<blockquote id="jumpHeightTN" class="hidden">
This chart is for adding only height to the jump
<ul>
    <li>TN 5: 4 feet </li>
    <li>TN 7: 6 feet (1 space)</li>
    <li>TN 9: 8 feet (world record is ~8 ft) </li>
    <li>TN 13: 12 feet (2 spaces) </li>
</ul>
</blockquote>

<h3>Impaired by</h3>
<ul>
    <li>Jump or landing space is Difficult Ground</li>
    <li>Heavy armor</li>
    <li>Each level of encumbrance <abbr class="impaired">Impairs</abbr> twice instead of once</li>
</ul>

</blockquote>

<h2>Running</h2>
<span class="indent40"> </span> Running is a faster speed than normal pace but one that is meant to be sustainable and that can more easily deal with obstacles and terrain than sprinting.
<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 3</li>
<li>Base Movement: 8 spaces per move</li>
<li>+1 TN per 2 additional spaces you wan to run</li>
</ul>
<p><i>Speed TN Chart</i> 
<button id="hiderunSpeedTN" class="hide hidden" onclick="hide('runSpeedTN');">[&#8213;]</button>
<button id="showrunSpeedTN" class="hide" onclick="show('runSpeedTN');">[ + ]</button>
</p>

<blockquote id="runSpeedTN" class="hidden">
<ul>
    <li>TN 5: 12 spaces</li>
    <li>TN 7: 16 spaces</li>
    <li>TN 9: 20 spaces (~13.5 mph, under a 2 hour marathon)</li>
    <li>TN 12: 26 spaces (~18 mph, highest passive value) </li>
</ul>

</blockquote>

<h3>Impaired by</h3>
<ul>
    <li>Heavy armor</li>
    <li>At least one space is difficult ground</li>
</ul>


<p class="note">On rounds you run you are <abbr class="impaired">Impaired</abbr>  when making attacks or using skills other than athletics and endurance and <abbr class="breached">Breached</abbr> </p>
</blockquote>

<h2>Sprinting</h2>
<span class="indent40"> </span> Trying to run as fast as possible.
<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 3</li>
<li>Base Movement: 12 spaces per move</li>
<li>+1 TN per 3 additional spaces you wan to sprint</li>
</ul>
<p><i>Speed TN Chart</i> 
<button id="hidesprintSpeedTN" class="hide hidden" onclick="hide('sprintSpeedTN');">[&#8213;]</button>
<button id="showsprintSpeedTN" class="hide" onclick="show('sprintSpeedTN');">[ + ]</button>
</p>

<blockquote id="sprintSpeedTN" class="hidden">
<ul>
    <li>TN 5: 16 spaces</li>
    <li>TN 7: 22 spaces</li>
    <li>TN 11: 34 spaces (~27 Mph and ~Usain Bolt's speed) </li>
    <li>TN 15: 46 spaces </li>
</ul>

</blockquote>

<h3>Impaired by</h3>
<ul>
    <li>Each space that is Difficult Ground</li>
    <li>Light armor</li>
    <li>Heavy armor <abbr class="impaired">Impairs</abbr> twice</li>
    <li>Each level of encumbrance <abbr class="impaired">Impairs</abbr> twice instead of once</li>
</ul>


<p class="note">On rounds you run you are <abbr class="impaired">Impaired</abbr> 2 when making attacks or using skills other than athletics and endurance and <abbr class="breached">Breached</abbr> 2 </p>
</blockquote>

<h2>Swimming</h2>
<span class="indent40"> </span> The TNs listed here assume there is not a strong current or large waves.
<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 3</li>
<li>Base Movement: 1 space</li>
<li>+2 TN per additional space you want to swim</li>
</ul>
<p><i>Speed TN Chart</i> 
<button id="hideswimSpeedTN" class="hide hidden" onclick="hide('swimSpeedTN');">[&#8213;]</button>
<button id="showswimSpeedTN" class="hide" onclick="show('swimSpeedTN');">[ + ]</button>
</p>

<blockquote id="swimSpeedTN" class="hidden">
<ul>
    <li>TN 5: 3 spaces</li>
    <li>TN 7: 5 spaces</li>
  <li>TN 11: 9 spaces (6mph world record)</li>

</ul>

</blockquote>

<h3>Impaired by</h3>
<ul>
    <li>Light armor</li>
    <li>Heavy armor <abbr class="impaired">Impairs</abbr> twice</li>
    <li>Each level of encumbrance <abbr class="impaired">Impairs</abbr> twice instead of once</li>
<li>Speed of the waters current</li>
</ul>


<p class="note">On rounds you run you are <abbr class="impaired">Impaired</abbr> 3 when making attacks or using skills other than athletics and endurance and <abbr class="breached">Breached</abbr> 3 </p>
</blockquote>
</div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Athletics Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                                        <div class="abilityFieldset talentFieldset handbookAbilityFieldset">
                <div class="abilityLegend talentLegend">Peak Condition (Athletics)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Talent, Potence:</b> Mana flows deep into your muscles and can be utilized for extreme bursts of speed. </div>
                <div class="abilityFieldEven">You can take two reactions each round. You can spend 1 mana to move twice as far for 1 athletics check. </div>
              </div>
                                    
            
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Fit (Athletics)</div>
                <div class="abilityField namField"><b>Talent:</b> You have honed your reflexes so very little gets past you</div>
                                  <div class="abilityField namField"><b>Passive:</b> You can take two reactions each round. </div>    
                                
                <div class="abilityField namField"><b>Reaction:</b> Adjacent enemy Slides away from you or attacks an ally</div>        
                <div class="abilityField abilityFieldLast namField"><b>Effect:</b> Slide 1</div>
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Swift (Athletics)</div>
                <div class="amField abilityField"><b>Trick, Potence:</b> You can focus your mana and momentum into your body to greatly but briefly increase your celerity. </div>
                <div class="amField abilityField"><b>Action:</b> 2/5 Momentum</div>         
                <div class="amField abilityField"><b>Effect (2):</b> Gain
<abbr class="short">Short</abbr> 
<abbr class="quick">Quick</abbr> or <abbr class="focused">Focused</abbr></div>
                                  <div class="amField abilityField"><b>Effect (5):</b> Gain 
<abbr class="short">Short</abbr> 
<abbr class="haste">Haste</abbr>. 
You can't use this effect more than once per round. </div>
                                <div class="amField abilityField abilityFieldLast"><b>1 Mana:</b> Move twice as far for one Athletics check or act when you normally would not be fast enough (surprise rounds, right when setting off a trap, etc). </div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Athletics -->
    
      <!-- Force -->
      <section class="section" id="ForceSection">
        <header class="sectionHeader hideWrapper">
          <button id="showForce" class="hidden showButton" onclick="show('Force');">Force</button>
          <button id="hideForce" class="hide" onclick="hide('Force');">[&#8213;]</button>  
        </header>

        <article id="Force" class="sectionBody">
          <h1>Force</h1>
          <div class="divider"></div>

          <div id="ForceDescription"><span class="indent40"> </span> Force relates to utilizing strength safely. Proper technique to maximize force for lifting, pushing or pulling heavy things. TN for this skill is largely dependent upon circumstance. Here are some very rough numbers. 

 

<h2>Dead Lift</h2>
<span class="indent40"> </span> Lifting an object of the ground to your hips. 

<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 3</li>
<li>Base Weight lifted: 100lbs </li>
<li>+1 TN per additional 100 lbs</li>
<li>+1 TN per space the character wants to move with the weight during a turn</li>
</ul>

<p><i>Weight TN Chart</i> 
<button id="hidedeadLiftTN" class="hide hidden" onclick="hide('deadLiftTN');">[&#8213;]</button>
<button id="showdeadLiftTN" class="hide" onclick="show('deadLiftTN');">[ + ]</button>
</p>

<blockquote id="deadLiftTN" class="hidden">
<ul>
    <li>TN 5: 300 lbs</li>
    <li>TN 8: 600 lbs</li>
    <li>TN 13: 1100 lbs (world record</li>
</ul>
</blockquote>

</blockquote>

<h2>Overhead lift from ground</h2>
<span class="indent40"> </span> Lifting an object of the ground to above your head with arms fully extended.


<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 3</li>
<li>Base Weight lifted: 100 lbs </li>
<li>+1 TN per additional 75 lbs</li>
<li>+1 TN space the character wants to move with the weight during a turn</li>
</ul>

<p><i>Weight TN Chart</i> 
<button id="hidecleanLiftTN" class="hide hidden" onclick="hide('cleanLiftTN');">[&#8213;]</button>
<button id="showcleanLiftTN" class="hide" onclick="show('cleanLiftTN');">[ + ]</button>
</p>

<blockquote id="cleanLiftTN" class="hidden">
<ul>
    <li>TN 5: 225 lbs</li>
    <li>TN 7:375 lbs</li>
     <li>TN 10: 600 (slightly above world record 'clean and jerk'</li>
    <li>TN 14: 900 lbs (slightly above world record</li>
</ul>
</blockquote>

</blockquote>
<h2>Feats of strength</h2>
<span class="indent40"> </span>The amount of weight people can pull or push is difficult to quantify as it is very circumstantial, rope pulleys harnesses, friction, etc.

<br/><br/>
Use your best judgement at the table to decided difficulty.
Here are some references of 'strong man feats.'
<br/><br/>
<a href="https://www.youtube.com/watch?v=ptO_rNYx8nM">Harness fire engine pull</a><br/>
<a href="https://www.youtube.com/watch?v=Sp3A2lx3Gxs">Carry and Drag</a><br/>
<a href="https://www.youtube.com/watch?v=gRu-hd250kI">Keg Toss</a><br/>
<a href="https://www.youtube.com/watch?v=sNz-8KwHry4">Car walk</a><br/>
 
<h2>Failing a Force Check</h2>
Failure likely results in a character injuring themselves, sometimes severely. At the least the character likely pulls and muscle maybe resulting in Impeded for physical skills until it heals. This could also often do health categories of damage, sometimes multiple. 


</div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Force Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                                        <div class="abilityFieldset talentFieldset handbookAbilityFieldset">
                <div class="abilityLegend talentLegend">Big (Force)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Talent, Potence:</b> Mana flows deep into your bones making you a rather large individual, which helps when trying to moving or breaking things. </div>
                <div class="abilityFieldEven">Reduce an targets brace by 2 if their size or height is larger than 1. You can spend 1 mana to shatter an object of your size and height or smaller that is not made of metal or stone.</div>
              </div>
                                    
            
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Forceful (Force)</div>
                <div class="abilityField namField"><b>Talent:</b> Your adept at leveraging force.</div>
                                  <div class="abilityField namField"><b>Passive:</b> You may increase your Pushes by 1</div>    
                                
                <div class="abilityField namField"><b>Reaction</b>: You push an adjacent enemy</div>        
                <div class="abilityField abilityFieldLast namField"><b>Effect:</b> Instead of pushing them deal damage equal to how much you would of pushed them.</div>
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Shatter (Force)</div>
                <div class="amField abilityField"><b>Trick, Potence:</b> Fae into strength you can destroy objects or push creatures.</div>
                <div class="amField abilityField"><b>Action:</b> 2/5 Momentum</div>         
                <div class="amField abilityField"><b>Effect (2):</b> Push a hit enemy up to 3 and <abbr class="short">Short</abbr> <abbr class="breached">Breached</abbr> them</div>
                                  <div class="amField abilityField"><b>Effect (5):</b> Push a hit enemy up to 6 and knock them Prone.</div>
                                <div class="amField abilityField abilityFieldLast"><b>1 Mana:</b> Shatter a object that is not made of stone or metal and is of your size and height or smaller. </div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Force -->
    
      <!-- Acrobatics -->
      <section class="section" id="AcrobaticsSection">
        <header class="sectionHeader hideWrapper">
          <button id="showAcrobatics" class="hidden showButton" onclick="show('Acrobatics');">Acrobatics</button>
          <button id="hideAcrobatics" class="hide" onclick="hide('Acrobatics');">[&#8213;]</button>  
        </header>

        <article id="Acrobatics" class="sectionBody">
          <h1>Acrobatics</h1>
          <div class="divider"></div>

          <div id="AcrobaticsDescription"><span class="indent40"> </span> Athletics relates to body control and precision of movement. Balancing on objects such as stilts, ladders, ropes and thing ledges,  overcoming obstacle without loosing a beat, and safely jumping from great heights are common uses of acrobatics. It can also used for climbing, crawling, jumping as well as the things below. 


<h2>Balance</h2>
<span class="indent40"> </span> This includes everything from tight rope walking, keeping non-sturdy objects balanced, to bounding between creatures trying to support you. 

<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 5</li>
<li>Base width of thing you're balancing on: 1 foot</li> 
<li>Base movement while balancing: 3 spaces </li>
<li>+1 TN per halving of the width of the object being balanced on</li>
<li>+/-1 TN per to increase/decrease movement by 1 space</li>
</ul>

<p><i>Balance TN Chart</i> 
<button id="hidetightRopeTN" class="hide hidden" onclick="hide('tightRopeTN');">[&#8213;]</button>
<button id="showtightRopeTN" class="hide" onclick="show('tightRopeTN');">[ + ]</button>
</p>

<blockquote id="tightRopeTN" class="hidden">
<ul>
    <li>TN 5: 1 foot </li>
    <li>TN 7: 3 inches </li>
    <li>TN 10: 4/10 of an inch</li>
    <li>TN 14: 2/100 of an inch</li>

</ul>
<h3>Reference</h3>
<ul>
<li>Balance beam is 4 inches wide</li>
<li>Wide Philippe Petit walked on between world trade center buildings five eighths of an inch thick</li>
<li>Spider web 0.00015748 inches thick </li>
<p class="note">Just because you can balance on a very thin thing doesn't mean the thing can support your weight</p>
</blockquote>

<h3>Impaired by</h3>
<ul>
<li>Heavy armor <abbr class="impaired"> Impairs </abbr> twice</li>
<li>Each level of encumbrance <abbr class="impaired">Impairs</abbr> twice instead of once</li>
<li>Environmental (wind) or active attempts (yanking a rope) to ruin your balance <abbr class="impaired">Impair</abbr> related to the force they create</li> 
</ul>
</blockquote>


<h2>Fall reduction TN</h2>
<span class="indent40"> </span> Through knowing how to properly impact the ground, and use momentum you acrobatics can let you jump from great heights safely. Acrobatics allows character to reduce the number of effective spaces fallen for calculating damage taken. Normal damage taken for falling onto a hard flat surface, like a stone pathway, is |number of spaces fallen|^2. 
<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 3</li>
<li>Base effective height reduction: 1 space</li>
<li>+1 TN per additional 3 feet</li>
<li>TN greatly influenced by surface you are landing on</li>
</ul>

<p><i>Fall Reduction TN Chart</i> 
<button id="hidefallReductionTN" class="hide hidden" onclick="hide('fallReductionTN');">[&#8213;]</button>
<button id="showfallReductionTN" class="hide" onclick="show('fallReductionTN');">[ + ]</button>
</p>

<blockquote id="fallReductionTN" class="hidden">
<ul>
    <li>TN 5: 2 spaces (12 ft)</li>
    <li>TN 7: 3 spaces (18 ft) </li>
    <li>TN 10: 4 spaces (27 ft)</li>
    <li>TN 15: 5 spaces (42 ft)</li>

</ul>
<h3>Reference</h3>
<ul>
<li>Various parkour jump videos</li>
<ul>
</blockquote>
</blockquote>

<h2>Other Acrobatics TN</h2>
Various other actions for performance or other function or overcoming physical obstacles can relate to acrobatics. Use the general guideline and GM discretion for these. 

</div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Acrobatics Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                                        <div class="abilityFieldset talentFieldset handbookAbilityFieldset">
                <div class="abilityLegend talentLegend">Tumbler (Acrobatics)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Talent, Potence:</b> Your ability to tumble be it aerials, flyaways, handspring, or wall run you can seemingly fly through the air.</div>
                <div class="abilityFieldEven">Decrease Punish damage you take by [|acrobaticsSkillRank|/2]. You can spend 1 mana when out of combat to fly for 30 feet. </div>
              </div>
                                    
            
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Elusive (Acrobatics)</div>
                <div class="abilityField namField"><b>Talent:</b></div>
                                  <div class="abilityField namField"><b>Passive:</b> Reduce Punish by 2</div>    
                                
                <div class="abilityField namField"><b>Reaction:</b> 2 Momentum, you take damage</div>        
                <div class="abilityField abilityFieldLast namField"><b>Effect:</b> Reduce damage by 3</div>
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Flourish (Acrobatics)</div>
                <div class="amField abilityField"><b>Trick, Potence:</b> Tumbling about your can move almost as if you were flying.</div>
                <div class="amField abilityField"><b>Action:</b> 2/5 Momentum</div>         
                <div class="amField abilityField"><b>Effect (2):</b> Fly and slide up to 3 then Attack. Gain <abbr class="short">Short</abbr> <abbr class="vigilant">Covered</abbr> and +1 Guard.</div>
                                  <div class="amField abilityField"><b>Effect (5):</b> Slide up to 6, 3 of which can count as flying. For this <abbr class="combat">Combat</abbr> gain 4 Flourish. During your turn you can spend 1 Flourish to gain <abbr class="short">Short</abbr> <abbr class="boosted">Boosted</abbr> or <abbr class="round">Round</abbr> <abbr class="vigilant">Covered</abbr>. No more than 2 points can be spent in a single round. </div>
                                <div class="amField abilityField abilityFieldLast"><b>1 Mana:</b> Fly for 30 feet</div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Acrobatics -->
    
      <!-- Sneak -->
      <section class="section" id="SneakSection">
        <header class="sectionHeader hideWrapper">
          <button id="showSneak" class="hidden showButton" onclick="show('Sneak');">Sneak</button>
          <button id="hideSneak" class="hide" onclick="hide('Sneak');">[&#8213;]</button>  
        </header>

        <article id="Sneak" class="sectionBody">
          <h1>Sneak</h1>
          <div class="divider"></div>

          <div id="SneakDescription"><span class="indent40"> </span>
Make a sneak roll to perform a action they do not want others to be aware of or to hide. Much of the difficulty is going to be based on the targets Awareness which is likely to be hidden from you as a player. As such you are going to have to make a variety of decisions based on your own roll without knowing the exact TN. 

<br/><span class="indent40"> </span> 
A master of sneaking is not only quick and silent but they develop a keen understanding of where others are directing their attention and how to avoid attracting it.

<h2>Hiding</h2>
<span class="indent40"> </span> 

Using concealment and the fog of combat you can gaps in a creatures awareness to appear in places your opponent does not expect. Hiding is a short term effect, momentarily getting lost in a crowd, maneuvering around an enemy in combat so they lose track of you, ducking around a corner, etc. Hiding gives you a brief window of opportunity to surprise a target, dart between hiding places at the right moment, or try and sneak away through stealth. 

<br/> <span class="indent40"> </span> Before you can attempt to hide declare which creatures you are trying to hide from. You must have moved this turn to a place outside of the combat awareness of all stated declared creatures.


<br/><span class="indent40"> </span> 
Creatures you are <a href="#hidden" class="internalLink">Hidden</a> from know you are around somewhere just not exactly where. They can attempt to find you with their awareness (a focus or skilled reaction to roll) if you enter their combat sense on their turn or during a round.

<br/><span class="indent40"> </span>
Hiding is risky you often need to lower your defenses, slow down, or as be patient to find a time and place to hide. As such using sneak to hide is always dangerous and a blunder leaves you <abbr class="round">round</abbr> <abbr class="breached">breached</abbr>. On success gain <abbr class="round">Round</abbr> <a href="#hidden" class="internalLink">Hidden</a> to all declared creatures. 




<p class="note">Unlike other skills using Sneak to Hide requires an Action not a Focus.</p>

<blockquote>
<h3>Determining Difficulty</h3>
As the TN is hidden determining difficulty will affect your result instead of the TN.
<ul>
<li>Base TN: 10 + highest awareness of all declared creatures</li>
<li>-1 modifier per additional declared creature</li>
<li>-2 modifier per space you ran</li>
<li>-3 modifier per space you sprinted</li>
<li>+1 modifier per space you have left that is outside if all targets combat awareness</li>
<li>+1 modifier per space you have left that has something interposing all declared creatures during your move</li>
<li>+1 modifier per space you have left that gave you concealment to all declared creatures</li>
<li>+2 modifier if rolling from a space that gives you concealment to all declared creatures</li>
</ul>
</blockquote>

<h3>Impaired by</h3>
<ul>
<li>Heavy armor <abbr class="impaired"> Impairs </abbr> twice</li>
<li>Each level of encumbrance <abbr class="impaired">Impairs</abbr> twice instead of once</li>
</ul>

<h2>Stealth</h2>
<span class="indent40"> </span> While in stealth creatures are unaware of your presence. The difficulty of maintaining stealth has a lot of factors. The awareness and alertness of creatures looking for you, your concealment, and how quickly you have to move to avoid detection. If you enter line of sight of an target they become aware of you.

<blockquote>
<h3>Determining Difficulty</h3>
As the TN is hidden determining difficulty will affect your result instead of the TN.
<ul>
<li>Base TN: highest Awareness of creatures you are trying to stealth from</li>
<li>TN affected by their Alertness, see <a href="#AwarenessSection" class="internalLink">Awareness</a> section</li>
<li>Base movement while stealthed: 3 spaces (~20ft)</li>
<li>-1 modifier per additional space you want to move</li>
<li>-1 modifier per creature you are within 6 spaces of</li>
<li>-1 modifier per space you enter that does not offer concealment</li>
<li>-2 modifier if you run</li>
<li>-3 modifier if you sprint</li>
</ul>


<h3>Impaired by</h3>
<ul>
<li>Heavy armor <abbr class="impaired"> Impairs </abbr> twice</li>
<li>Each level of encumbrance <abbr class="impaired">Impairs</abbr> twice instead of once</li>
</ul>
</blockquote>

<h2>Covering Tracks?</h2>
<h2>Subtle Communication</h2>
<span class="indent40"> </span> Sometimes you want to signal or otherwise communicate in full view of someone you do not want to notice the message. Doing so requires a sneak check

<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 5 + highest passive Awareness of creatures trying to hide communication from</li>
</ul>
</blockquote>

<h2>Pick Pocketing</h2>
<span class="indent40"> </span> Taking an attended object without drawing attention. An ideal lift is not just successfully snatching an item it is doing so without being noticed for some time afterward, so the mark has no clue who could of lifted something from them. Passing someone in a crowd and snatching their wallet is a harder sneak check than lifting of someone that is comfortable being close to you for an extended period of time. You need a least one hand free to attempt. 

<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 5 + highest passive Awareness of all creatures you are trying to hide your pick pocket from</li>
<li>-1 TN per 10 seconds you can be close to them without rising suspicion, up to 6</li>
<li>TN affected by their Alertness, see <a href="#AwarenessSection" class="internalLin"k>Awareness</a> section</li>
<li>Increase TN 2 per quarter load of the item you are trying to lift</li>
<li>TN affected by position on the body for the item you are trying to lift</li>
<li>TN affected by how locked down an item is</li>
</ul>

</blockquote>

<h2>Sleight of Hand</h2>
<span class="indent40"> </span> Moving unattended objects without observers noticing. 

<br/><br/>
<h2>References</h2>
<a href="https://www.youtube.com/watch?v=IGQmdoK_ZfY">invisible gorilla</a>, probably better to go in deception references<br/>
<a href="https://www.youtube.com/watch?v=o2kO_5cNF5k">3 card monte</a></br>
<a href="https://www.youtube.com/watch?v=6wTeQ2ly6Uw">Stage pickpocket</a><br/>
<a href="https://www.youtube.com/watch?v=gtOQXru2lo4">Pick pocket</a><br/>
<a href="https://www.youtube.com/watch?v=nftzMoYCdjU">Pick pocket 2 </a><br/>
<h4>Design Note</h4> 
Pickpocket might need to be a advanced skill combination between deception and sneak? Or maybe across over like athletics and acrobatics have?</div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Sneak Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                                        <div class="abilityFieldset talentFieldset handbookAbilityFieldset">
                <div class="abilityLegend talentLegend">Cloak of Shadow (Sneak)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Talent, Conjuration, Invocation, Potence:</b> Some mix of unconscious or uncontrollable mix conjuration, illusion, and potence causes shadows to cling to you and the memory if meeting you easily fade into the shadows of the mind.</div>
                <div class="abilityFieldEven">Increase your initial momentum by 2 if you start a combat starts while you are in stealth. You can spend 1 mana cause someone to forget an interaction with you until the next time you interact with them. </div>
              </div>
                                    
            
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Shifty (Sneak)</div>
                <div class="abilityField namField"><b>Talent:</b></div>
                                  <div class="abilityField namField"><b>Passive:</b> While Striking from Hidden increase your Damage by CS</div>    
                                
                <div class="abilityField namField"><b>Reaction:</b> An enemy ends their turn adjacent to you</div>        
                <div class="abilityField abilityFieldLast namField"><b>Effect:</b> Slide 1</div>
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Cloak of Shadow (Sneak)</div>
                <div class="amField abilityField"><b>Trick, Enchantment:</b> Your presence is but a shadow in the minds of of others</div>
                <div class="amField abilityField"><b>Action:</b> 2/5 Momentum</div>         
                <div class="amField abilityField"><b>On Hit (2):</b> <abbr class="round">Round</abbr> enemies do not threaten you, can not punish you, and they treat you as their lowest priority for dislikes</div>
                                  <div class="amField abilityField"><b>On Hit (5):</b> Gain Hidden to enemies you are out of combat sense from and did not damage this turn</div>
                                <div class="amField abilityField abilityFieldLast"><b>1 Mana:</b> After an interaction with someone you can spend 1 Mana and they forget who you are.</div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Sneak -->
    
      <!-- Endurance -->
      <section class="section" id="EnduranceSection">
        <header class="sectionHeader hideWrapper">
          <button id="showEndurance" class="hidden showButton" onclick="show('Endurance');">Endurance</button>
          <button id="hideEndurance" class="hide" onclick="hide('Endurance');">[&#8213;]</button>  
        </header>

        <article id="Endurance" class="sectionBody">
          <h1>Endurance</h1>
          <div class="divider"></div>

          <div id="EnduranceDescription"><span class="indent40"> </span> Endurance relates to your skill in sustaining difficult actions and resist some ill effects on the body. The TNs are equal to the TN of the check you are trying to sustain. The frequency of the check is determined here by how exhausting the task is. Failure threatens to give fatigue, if the character takes action that requires an Endurance check before a long rest they become Fatigued (<abbr class="day">Day</abbr> <abbr class="impaired">Impaired</abbr>) and the TN of the Endurance check rests to its base. 

<h2>Climbing, Crawling, Running, and Swimming</h2>

<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 1</li>
<li>Frequency: Every 10 minutes (100 rounds)</li>
<li>+1 TN per endurance check since a short rest</li>
</ul>
</blockquote>

<h2>Jumping</h2>

<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 3
<li>Frequency: Each jump you make in a row after the first</li>
<li>+1 TN per jump you have taken since a breather</li>
</ul>
</blockquote>

<h2>Sprinting</h2>

<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 7</li>
<li>Frequency: Every round (6 seconds)</li>
<li>+2 TN per round of sprinting since a short rest</li>
</ul>
</blockquote>

<h2>Resisting Effects</h2>
<span class="indent40"> </span> Various actions or effects may require you to take an endurance check, in those cases the effect will tell you the base TN, frequency of required checks, how the TN increases, and effect of failure.

<br/<br/>
Example with alcohol. 

<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 3</li>
<li>Frequency: Every 1.5 ounces consumed</li>
<li>+1 TN 1.5 ounces consumed since your last long rest</li>
</ul>
</blockquote></div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Endurance Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                                        <div class="abilityFieldset talentFieldset handbookAbilityFieldset">
                <div class="abilityLegend talentLegend">Tough (Endurance)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Talent, Potence:</b> A ruff and tumble life has hardened you to various dangers. </div>
                <div class="abilityFieldEven">Increase each Health Category by |enduranceSkillRank| HP. You can spend 2 mana to gain 3 recovery.</div>
              </div>
                                    
            
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Tough (Endurance)</div>
                <div class="abilityField namField"><b>Talent, Potence:</b></div>
                                  <div class="abilityField namField"><b>Passive:</b> Increase each Health Category by |enduranceSkillRank| HP.</div>    
                                
                <div class="abilityField namField"><b>Reaction:</b> 1 Fatigue, When you get a <abbr class="short">Short</abbr>, <abbr class="round">Round</abbr>, or <abbr class="combat">Combat</abbr> condition</div>        
                <div class="abilityField abilityFieldLast namField"><b>Effect:</b> Cleanse that condition</div>
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Surge (Endurance)</div>
                <div class="amField abilityField"><b>Trick, Potence:</b> Draw energy inward to invigorate yourself heal small injuries. </div>
                <div class="amField abilityField"><b>Action:</b> 2/5 Momentum</div>         
                <div class="amField abilityField"><b>Effect (2):</b> Heal self 2 + CS</div>
                                  <div class="amField abilityField"><b>Effect (5):</b> Heal self 6 + CS*3</div>
                                <div class="amField abilityField abilityFieldLast"><b>1 Mana:</b> Remove 2 Fatigue?</div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Endurance -->
    
      <!-- Poise -->
      <section class="section" id="PoiseSection">
        <header class="sectionHeader hideWrapper">
          <button id="showPoise" class="hidden showButton" onclick="show('Poise');">Poise</button>
          <button id="hidePoise" class="hide" onclick="hide('Poise');">[&#8213;]</button>  
        </header>

        <article id="Poise" class="sectionBody">
          <h1>Poise</h1>
          <div class="divider"></div>

          <div id="PoiseDescription"><span class="indent40"> </span> Poise relates to your ability to maintain your footing. It is in a lot of ways the flip side of the Force skill. Various effects could create a force on you and poise is well you can resist that force. If boulder is rolling down a hill at you, your skill in Poise is how well well can dig your feet in and shift its trajectory or stop its momentum. 



<h2>Brace</h2>
<span class="indent40"> </span>A frequent use of poise will to be resist effects that move you. This can be done passively or actively.

<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 5</li>
<li>Effect: <abbr class="round">Round</abbr> may reduce any forced movement by 1</li>
<li>+2 TN per additional 1 space of reduce movement</li>
</ul></div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Poise Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                                        <div class="abilityFieldset talentFieldset handbookAbilityFieldset">
                <div class="abilityLegend talentLegend">Sure Footed (Poise)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Talent, Conjugation:</b> Deft footwork allows you to move over small obstacles easily and carry additional weight without impediment. </div>
                <div class="abilityFieldEven">Reduce the cost to move onto difficult ground by 1. Ignore Guard and Blast penalties while on difficult ground. You can spend 1 mana to hold an object of up to twice your size and height in place without danger to yourself regardless of its weight for |poiseSkillRank| rounds.</div>
              </div>
                                    
            
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Sure Footed (Poise)</div>
                <div class="abilityField namField"><b>Talent:</b> The mountain does not move</div>
                                  <div class="abilityField namField"><b>Passive</b>: You treat Difficult Ground as if it had one less stack</div>    
                                
                <div class="abilityField namField"><b>Reaction:</b> 1 momentum, when an enemy forces you or an adjacent ally to move.</div>        
                <div class="abilityField abilityFieldLast namField"><b>Effect:</b> Roll Poise to Brace. Heal yourself or ally 1 for each movement prevented.</div>
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Hold (Poise)</div>
                <div class="amField abilityField"><b>Trick, Potence:</b> Pin</div>
                <div class="amField abilityField"><b>Action:</b> 2/5 Momentum</div>         
                <div class="amField abilityField"><b>On Hit (2):</b> A damaged enemy gains <abbr class="short">Short</abbr> <abbr class="impaired">Impaired</abbr> 2</div>
                                  <div class="amField abilityField"><b>On Hit (5):</b> A damaged enemy gains <abbr class="short">Round</abbr> <abbr class="restrained">Restrained</abbr></div>
                                <div class="amField abilityField abilityFieldLast"><b>1 Mana:</b> Hold an object in place  up to size and height of 3 for 18 seconds. (Portcullis, Draw Bridge, Large Door, etc).</div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Poise -->
    
      <!-- Lore -->
      <section class="section" id="LoreSection">
        <header class="sectionHeader hideWrapper">
          <button id="showLore" class="hidden showButton" onclick="show('Lore');">Lore</button>
          <button id="hideLore" class="hide" onclick="hide('Lore');">[&#8213;]</button>  
        </header>

        <article id="Lore" class="sectionBody">
          <h1>Lore</h1>
          <div class="divider"></div>

          <div id="LoreDescription"><span class="indent40"> </span> 

Lore checks represent how much you have studied and how well you recall history, human symbols, understand and sense magic. Lore can not be used on the same thing more than once per character. 

<h2>Fae Sense</h2>
<span class="indent40"> </span> 

Fae sense is a secondary sense for humans, feeling with it is similar to vision and sound, it sharpens based on distance and as the world is filled with magic the sense can get muddled and without giving specific attention to a location or thing details can get lost. Through study and effort it can be sharpened, represented by your rank in Lore.

<br/><span class="indent40"> </span> 

Unlike the other senses Fae sense uses your Lore instead of Awareness. It is passively like all other senses (using the passive value of Lore). It is used to identify various magical effects, understand ongoing magical effects and magic items, and even feel the amount and type of magic recently used in an area. 

<h2>Detect Sigils, Wards, and Conjured Senses</h2>
<span class="indent40"> </span> 

The TN to detect these rituals is almost always going be hidden information to players. The guide listed here is to help GMs understand what the players can sense but also help players be sure of what isn't around them based on their result.

<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>TN to detect: 7</li>
<li>Base distance from magic: 1 space</li>
<li>Increase TN by 1 for each space from magic</li>
<li>Increase TN by 1 for each Mask applied to the effect</li>
<li>Decrease TN by 2 if sustained over a month</li>
<li>Decrease TN by 2 if it was sustained for a year</li>
<li>Decrease TN by 1 for each year it has been sustained beyond the first</li>
<li>Decrease TN by 1 for each mana that spent on enhancements and augments during the ritual</li>
</ul>
</blockquote>

<h2>Identifying effect of Magic</h2>
<span class="indent40"> </span> This allows character to identify what magic items can do, the effect of known Sigils and Wards. The senses on a Conjured Sense and trace it to its creator. It also allows for identification of Illusions.
<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>TN to detect: 12</li>
<li>Base distance from magic: 1 space</li>
<li>Increase TN by 1 for each space from target</li>
<li>Decrease TN by 1 for each minute you study the target</li>
</ul>
</blockquote>

<h2>Detecting recent mana use</h2>
<span class="indent40"> </span> All mana used within 100 yards can be felt together, making it easier to detect, but each individual use of mana can be further investigated to get specific information about it. 

<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>TN to detect: 12</li>
<li>Base distance from magic: 1 space</li>
<li>+1 TN per space from location </li>
<li>+1 TN per hour since the mana was used</li>
<li>-1 TN per mana used</li>
</ul>
</blockquote>

<h2>History</h2>
<span class="indent40"> </span> Used to gain information about recorded historical events, historical people, and to infer information about current circumstances from the patterns of history. 

<br/><span class="indent40"> </span>

These checks let you ask questions to the GM about a subject or circumstance that they must answer honestly. These questions can be a series of sentences describing specific information you want to learn. 

These questions must me about that thing or relationships to that thing. 
<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 12</li>
<li>Base number of questions you can ask: 1</li>
<li>Increase TN by 2 to ask an additional question</li>
<li>Decrease the TN by 1 for every 20 years in the history the question is about</li>
</ul>
</blockquote>

<h2>Symbols & Customs</h2>
<span class="indent40"> </span> Lets you discern symbols: Holy symbols, warning symbols, heraldry, customs, etc</div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Lore Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                      
            
                          <div class="abilityFieldset ritualFieldset handbookAbilityFieldset">
                <div class="abilityLegend ritualLegend">Conjure Element (Lore)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Ritual, Conjuration, Sustainable (D)</b></div>
                <div class="abilityFieldEven">Allows you to conjure matter</div>
              </div>
              <br/>
                          <div class="abilityFieldset ritualFieldset handbookAbilityFieldset">
                <div class="abilityLegend ritualLegend">Retrospect (Lore)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Ritual, Divination, Resistible</b></div>
                <div class="abilityFieldEven">Allows player to gain specific insight into a creature or object</div>
              </div>
              <br/>
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Anticipate (Lore)</div>
                <div class="abilityField namField"><b>Talent, Divination:</b> Anticipating the future you know when it is best to act.</div>
                                
                <div class="abilityField namField"><b>Focus</b> or <b>Move</b></div>        
                <div class="abilityField abilityFieldLast namField"><b>Effect (Focus):</b> Gain <abbr class="short">Short</abbr> <abbr class="focused">Focused</abbr>

<br/>

<b>Effect (Move):</b> Gain <abbr class="short">Short</abbr> <abbr class="quick">Quick</abbr></div>
                                  <div class="abilityField namField abilityFieldLast"><b>Spell:</b> Retrospect</div>    
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Minor Conjure Element (Lore)</div>
                <div class="amField abilityField"><b>Trick, Conjuration:</b> Create and shape one of the base elements. </div>
                <div class="amField abilityField"><b>Action:</b> 4/7 Momentum</div>         
                <div class="amField abilityField"><b>Effect (4):</b> If Blast - gain a hit bonus of 2 + dice rolled
<br/>If Strike - Add any one basic elemental effect to your attack and for the rest of the Combat when you get 3 CS or more add that effect again. <br/>If Invoke - To each hit target you may apply a basic elemental effect.</div>
                                  <div class="amField abilityField"><b>Effect (7):</b> If Blast - increase 
 hit bonus to 4 + 2x dice rolled <br/> If Strike - Attack is AoE and hits all adjacent creatures. <br/>If Invoke - As 4 and +1 to hit for each target.</div>
                                <div class="amField abilityField abilityFieldLast"><b>Spell:</b> Conjure Element</div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Lore -->
    
      <!-- Survival -->
      <section class="section" id="SurvivalSection">
        <header class="sectionHeader hideWrapper">
          <button id="showSurvival" class="hidden showButton" onclick="show('Survival');">Survival</button>
          <button id="hideSurvival" class="hide" onclick="hide('Survival');">[&#8213;]</button>  
        </header>

        <article id="Survival" class="sectionBody">
          <h1>Survival</h1>
          <div class="divider"></div>

          <div id="SurvivalDescription"><span class="indent40"> </span>

<h2>Identification of Flora and Fauna</h2>
Base TN: 5

<h2>Identification of Faen</li>

<h2>First Aid</h2>

<h2>Tracking</h2>

<h2>Hiding Tracks</h2>

<h2>Hunting</h2></div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Survival Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                      
            
                          <div class="abilityFieldset ritualFieldset handbookAbilityFieldset">
                <div class="abilityLegend ritualLegend">Locate (Survival)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Ritual, Divination, Resistible*</b></div>
                <div class="abilityFieldEven">Allows you to locate things that fit specific criteria</div>
              </div>
              <br/>
                          <div class="abilityFieldset ritualFieldset handbookAbilityFieldset">
                <div class="abilityLegend ritualLegend">Restoration (Survival)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Ritual, Conjuration, Restore</b></div>
                <div class="abilityFieldEven">Restores health, removes fatigue and conditions</div>
              </div>
              <br/>
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Mend (Survival)</div>
                <div class="abilityField namField"><b>Talent, Healing:</b></div>
                                
                <div class="abilityField namField"><b>Focus:</b> 1 Fatigue</div>        
                <div class="abilityField abilityFieldLast namField"><b>Effect:</b> Ally within six Heals twice your Survival Skill Rank or remove one <abbr class="short">Short</abbr>, <abbr class="round">Round</abbr>, or <abbr class="combat">Combat</abbr> condition from them</div>
                                  <div class="abilityField namField abilityFieldLast"><b>Spell:</b> Restoration</div>    
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Stoneskin (Survival)</div>
                <div class="amField abilityField"><b>Trick, Binding:</b></div>
                <div class="amField abilityField"><b>Action:</b> 4/7 Momentum</div>         
                <div class="amField abilityField"><b>On Hit (4):</b> Ally or self gains <abbr class="combat">Combat</abbr> Reinforce 8</div>
                                  <div class="amField abilityField"><b>On Hit (7):</b> Yourself and all allies within 6 gain <abbr class="combat">Combat</abbr> Reinforce 5</div>
                                <div class="amField abilityField abilityFieldLast"><b>Spell:</b> Transformation</div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Survival -->
    
      <!-- Deception -->
      <section class="section" id="DeceptionSection">
        <header class="sectionHeader hideWrapper">
          <button id="showDeception" class="hidden showButton" onclick="show('Deception');">Deception</button>
          <button id="hideDeception" class="hide" onclick="hide('Deception');">[&#8213;]</button>  
        </header>

        <article id="Deception" class="sectionBody">
          <h1>Deception</h1>
          <div class="divider"></div>

          <div id="DeceptionDescription"><span class="indent40"> </span>Deception is the art of making people believe what isn't true, it requires a cleverness to pull off reliably but there are limits to what you can get someone to believe. The most trust that have in you the easier it is to get them to believe outlandish things. This is used for lying, disguises, distraction.

<h2>Lying</h2>
Base TN their insight +3:
Decrease TN by 1 for each level of trust they have in you.
Increase TN by 2 if the lie is silly
increase TN by 4 outlandish
Increase TN by 6 if it is absurd
Decrease TN by 4 if you construct a lie that makes then way to believe you

<h2>disguises</h2>
Base TN their insight +3:
Decrease TN by 1 for each level of trust they have in you.
Increase TN by 2 if the lie is silly
increase TN by 4 outlandish
Increase TN by 6 if it is absurd, a halfing trying to disguise themselves as a orc. </div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Deception Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                      
            
                          <div class="abilityFieldset ritualFieldset handbookAbilityFieldset">
                <div class="abilityLegend ritualLegend">Phantasm (Deception)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Ritual, Conjuration, Illusion, Sustainable (D)</b></div>
                <div class="abilityFieldEven">Allows you to conjure large and longer lasting illusions</div>
              </div>
              <br/>
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Misdirect (Deception)</div>
                <div class="abilityField namField"><b>Talent</b></div>
                                
                <div class="abilityField namField"><b>Focus</b> and 1 Momentum or <b>Move</b> and 1 Momentum</div>        
                <div class="abilityField abilityFieldLast namField"><b>Focus:</b> Adjacent enemy gains <abbr class="short">Short</abbr> <abbr class="dazed">Dazed</abbr>
<br/>
<b>Move:</b> Slide adjacent enemy 1</div>
                                  <div class="abilityField namField abilityFieldLast"><b>Spell:</b> Illusion</div>    
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Confuse (Deception)</div>
                <div class="amField abilityField"><b>Trick, Enchantment:</b> Your incantation reaches the mind of your enemy disorienting them</div>
                <div class="amField abilityField"><b>Action:</b> 4/7</div>         
                <div class="amField abilityField"><b>On Hit (4):</b> A damaged enemy gains <abbr class="combat">Combat</abbr> <abbr class="burning">Burning</abbr> and you can slide them 3</div>
                                  <div class="amField abilityField"><b>On Hit (7):</b> <abbr class="round">Round</abbr> a damaged enemy can not distinguish between friend and foe and at highest priority they Hate the closest creature.</div>
                                <div class="amField abilityField abilityFieldLast"><b>Spell:</b> Enchantment</div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Deception -->
    
      <!-- Insight -->
      <section class="section" id="InsightSection">
        <header class="sectionHeader hideWrapper">
          <button id="showInsight" class="hidden showButton" onclick="show('Insight');">Insight</button>
          <button id="hideInsight" class="hide" onclick="hide('Insight');">[&#8213;]</button>  
        </header>

        <article id="Insight" class="sectionBody">
          <h1>Insight</h1>
          <div class="divider"></div>

          <div id="InsightDescription">Ability to see through deception, assess moods, and stuff

<h2>Moods</h2>
Base TN 7:
Increase by 1 for each intensity of their mood beyond calm. 
Increase by 1 for each familiarity you have with them. 

<h2>Detecting deception</h2>
A lot of the difficulty of detecting lies is going to be hidden to the players.

Base TN their deception +2. 
Decrease TN by 1 for each familiarity you have with them. 

<h2>Detect intent</h2>
various aspects of communication can relate to intent, determining difficulty here is largely circumstantial. 

<h2>Detect Values</h2>
Through deduction of behavior in conflict, someones jobs, and reactions in conversation you can try and discern someones values. 

The more information you have on them the easier it is to ascertain their values.

However, you as a player will often need to deduce this yourself or go on specific information gathering missions or downtime to learn this information. </div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Insight Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                      
            
                          <div class="abilityFieldset ritualFieldset handbookAbilityFieldset">
                <div class="abilityLegend ritualLegend">Portent (Insight)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Ritual, Divination</b></div>
                <div class="abilityFieldEven">Allows the player to gain small insight into the result of actions</div>
              </div>
              <br/>
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Omen (Insight)</div>
                <div class="abilityField namField"><b>Trick, Divination:</b> You sense that failure looms ahead and you try to adjust your course, good luck.</div>
                                
                <div class="abilityField namField"><b>Reaction:</b> 1+ Momentum, you miss an attack</div>        
                <div class="abilityField abilityFieldLast namField"><b>Effect:</b> Reroll 1 die for each Momentum spent</div>
                                  <div class="abilityField namField abilityFieldLast"><b>Spell:</b> Portent</div>    
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Weak Spot (Insight)</div>
                <div class="amField abilityField"><b>Trick, Divination:</b> Setting your mind toward targets defenses you locate where they are vulnerable. </div>
                <div class="amField abilityField"><b>Action:</b> 4/7 Momentum</div>         
                <div class="amField abilityField"><b>Effect (4):</b> Give damaged enemies <abbr class="round">Round</abbr> <abbr class="vulnerable">Vulnerable</abbr> and each time they are hit increase this vulnerability by 1</div>
                                  <div class="amField abilityField"><b>On Hit (7):</b> Give damaged enemies <abbr class="combat">Combat</abbr> <abbr class="vulnerable">Vulnerable</abbr></div>
                                <div class="amField abilityField abilityFieldLast"><b>Spell:</b> Locate</div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Insight -->
    
      <!-- Tinkering -->
      <section class="section" id="TinkeringSection">
        <header class="sectionHeader hideWrapper">
          <button id="showTinkering" class="hidden showButton" onclick="show('Tinkering');">Tinkering</button>
          <button id="hideTinkering" class="hide" onclick="hide('Tinkering');">[&#8213;]</button>  
        </header>

        <article id="Tinkering" class="sectionBody">
          <h1>Tinkering</h1>
          <div class="divider"></div>

          <div id="TinkeringDescription"><h2>Picking Locks</h2>
TN of Lock with adjustment for time. 

<h2>Contraption</h2>
Jerry rigging a thing together. Needs a specific purpose, spend resources. Roll Tinkering the first time you use it. 

<h2>Repair?</h2>
Lets you repair somethings. 


Light but broad engineering. Picking locks, fixing things, jerry rigging things. 
</div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Tinkering Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                      
            
                          <div class="abilityFieldset ritualFieldset handbookAbilityFieldset">
                <div class="abilityLegend ritualLegend">Sigil (Tinkering)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Ritual, Conjuration, Sustainable (D)</b></div>
                <div class="abilityFieldEven">Allows you to create an effect on an area that creatures can trigger and get damaged from</div>
              </div>
              <br/>
                          <div class="abilityFieldset ritualFieldset handbookAbilityFieldset">
                <div class="abilityLegend ritualLegend">Ward (Tinkering)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Ritual, Conjuration, Sustainable (D)</b></div>
                <div class="abilityFieldEven">Allows you to create an effect on an area that notifies you when things enter it</div>
              </div>
              <br/>
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Cache (Tinkering)</div>
                <div class="abilityField namField"><b>Trick, Imbue:</b></div>
                                
                <div class="abilityField namField"><b>Reaction:</b> your turn starts and you are <abbr class="short">Short</abbr> or <abbr class="round">Round</abbr> <abbr class="boosted">Boosted</abbr></div>        
                <div class="abilityField abilityFieldLast namField"><b>Effect:</b> Remove all <abbr class="short">Short</abbr> or <abbr class="round">Round</abbr> <abbr class="boosted">Boosted</abbr> and apply them to yourself at the end of your turn with the same duration</div>
                                  <div class="abilityField namField abilityFieldLast"><b>Spell:</b> Imbue</div>    
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Minor Sigil (Tinkering)</div>
                <div class="amField abilityField"><b>Trick, Binding</b> You conjure a short lasting sigil in a place near you. </div>
                <div class="amField abilityField"><b>Action:</b> 4/7 Momentum</div>         
                <div class="amField abilityField"><b>Effect (4):</b> Target an unoccupied adjacent space, which becomes a threat. Minor Sigil triggers when a creature enters its space or you can trigger it with your Focus. 

When it triggers it <abbr class="round">Round</abbr> <abbr class="dazed">Dazes</abbr> and deals damage equal to twice the number of dice rolled on this attack to creatures in it space and those adjacent to it.</div>
                                  <div class="amField abilityField"><b>Effect (7):</b> As 4 Effect, except it <abbr class="round">Round</abbr> <abbr class="restrained">Restrains</abbr> instead of Daze.</div>
                                <div class="amField abilityField abilityFieldLast"><b>Spell:</b> Sigil</div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Tinkering -->
    
      <!-- Awareness -->
      <section class="section" id="AwarenessSection">
        <header class="sectionHeader hideWrapper">
          <button id="showAwareness" class="hidden showButton" onclick="show('Awareness');">Awareness</button>
          <button id="hideAwareness" class="hide" onclick="hide('Awareness');">[&#8213;]</button>  
        </header>

        <article id="Awareness" class="sectionBody">
          <h1>Awareness</h1>
          <div class="divider"></div>

          <div id="AwarenessDescription"><span class="indent40"> </span>
The passive value of Awareness is commonly referenced as it refers to your general ability to notice details. Checks for Awareness are similar to Endurance checks they are required to and in resist mental fatigue from remaining alert or actively investigating things. Failure threatens to give fatigue, if the character takes action that requires an Awareness check before a long rest they become Fatigued (<abbr class="day">Day</abbr> <abbr class="impaired">Impaired</abbr>). 

<h2>Alertness</h2>
<span class="indent40"> </span>

Your level of alertness determines a bonus modifier you get on passive awareness and affects how wide your line of sight is. Most of the time you will simply be at the 'Aware' start of alertness, however you can choose to enter a higher state, and some things might reduce your state. 

<ul>
<li>Asleep - No line of sight, -4 passive Awareness. Alertness level during a long rest</li>
<li>Relaxed or Distracted - Line of sight only directly forward or toward the thing that is distracting you, -2 Passive Awareness. Alertness during a short rest</li>
<li>Aware - Line of sight is the space in front of you an the two adjacent to it forming a cone of vision. Alertness during a breather</li>
<li>Alert - Noticed something but not sure if it means anything, the classic "did you hear something>", +2 passive Awareness. Dim light does not conceal. 360 degree line of sight, looking around</li>
<li>Fully Alert - Aware of a threat and are actively trying to identify it, +4 Passive Awareness. Dim light does not conceal. 360 degree line of sight, looking around.
</ul>

The more a character raises their Alertness between long rests the harder the checks become. Alert lasts for 10 minutes, Fully Alerts for a minute. At the end of these duration's a character must make their Awareness check. 

<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 3</li>
<li>Frequency, Alert / Full Alert: 10 minutes / 1 minute</li>
<li>+1 TN per Awareness check since a long rest</li>
<li>Failure: If you take an action that requires an Awareness check before a long rest gain Fatigue (<abbr class="day">Day</abbr> <abbr class="impaired">Impaired</abbr>)</li>
</ul>
</blockquote>
<h2>Investigating</h2>
<span class='indent40'> </span> Investigating is not simply looking something over. It is inspecting with caution, thought, and careful precision. The details are what is important when investigating and when you have any sort of pressure to do it quickly it causes mental strain. Investigation is used to find traps or secret doors, to listen through a door, look for hidden details, or similar tasks. This strain can cause fatigue and the more pressure you are under the more strain it will cause. The pressure on you is what determines the difficulty of the check. Pressure is a combination of time, clutter, and the area you are investigating. When you investigate something always learn what there is to learn, Awareness check determines if it was fatiguing. If the TN is below your passive Awareness you do not need to make a check. 

<br/><span class="indent40"> </span> 

Generally investigation applies to a single space or thing, although in some cases the GM may decide it makes more sense to investigate an area, such as a crime scene.

<br/><span class="indent40"> </span> 

Sometimes in the middle of an investigation you'll get information and you will want to push to learn more. Example: If you listen to a door for voices and hear some you might want to push to try and make out what they are saying. If it is possible to make out what they are saying (up to GM discretion) the mental strain is increased as you try and listen more intently. You might then want to push again to see if you can identify one of the voices (again up to GM discretion). You only increase the TN for a push during an investigation if it was possible to push for more information. 

<blockquote>
<h3>Determining Difficulty</h3>
<ul>
<li>Base TN: 5</li>
<li>Base time spent to investigate: 1 minute</li>
<li>+2 TN per 15 second reduction in investigation time</li>
<li>+1 TN per Awareness check since a long rest</li>
<li>+1-10 TN depending on clutter in the area, ask GM about clutter this should be known bf</li>
<li>-2 TN per additional 5 minutes you spend investigating</li>
<li>-2 TN if you are looking for a specific thing (hidden creatures, trip wire, keys, etc.)</li>
<li>Failure: If you take an action that requires an Awareness check before a long rest gain Fatigue (<abbr class="day">Day</abbr> <abbr class="impaired">Impaired</abbr>)</li>
</ul>
</blockquote>

<h3>References</h3>
<a href="http://ylsimplified.com/wp-content/uploads/2013/01/Clutter-Image-Rating-Scale-Living-Room.jpg">Clutter</a></div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Awareness Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                      
            
                          <div class="abilityFieldset ritualFieldset handbookAbilityFieldset">
                <div class="abilityLegend ritualLegend">Conjure Senses (Awareness)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Ritual, Conjuration, Divination, Sustainable</b></div>
                <div class="abilityFieldEven">Allows you to imbue your senses to an object</div>
              </div>
              <br/>
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Vigilant (Awareness)</div>
                <div class="abilityField namField"><b>Talent, Augmentation:</b></div>
                                
                <div class="abilityField namField"><b>Focus:</b> 1 Momentum</div>        
                <div class="abilityField abilityFieldLast namField"><b>Effect:</b> Gain <abbr class="short">Short</abbr> <abbr class="vigilant">Covered</abbr></div>
                                  <div class="abilityField namField abilityFieldLast"><b>Spell:</b> Conjure Senses</div>    
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Overwatch (Awareness)</div>
                <div class="amField abilityField"><b>Trick, Binding:</b> </div>
                <div class="amField abilityField"><b>Action:</b> 4/7 Momentum</div>         
                <div class="amField abilityField"><b>Effect, Threat (4):</b> <abbr class="round">Round</abbr> allies in your combat sense are <abbr class="vigilant">Covered</abbr></div>
                                  <div class="amField abilityField"><b>Effect (7):</b> As 4 effect and when one of your allies is hit you can react to deal damage to their attacker equal to you your Punish+CS of this attack</div>
                                <div class="amField abilityField abilityFieldLast"><b>Spell:</b> Ward</div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Awareness -->
    
      <!-- Compel -->
      <section class="section" id="CompelSection">
        <header class="sectionHeader hideWrapper">
          <button id="showCompel" class="hidden showButton" onclick="show('Compel');">Compel</button>
          <button id="hideCompel" class="hide" onclick="hide('Compel');">[&#8213;]</button>  
        </header>

        <article id="Compel" class="sectionBody">
          <h1>Compel</h1>
          <div class="divider"></div>

          <div id="CompelDescription">Compel is generally used to create a behavior in another. It leverages attitude to persuade someone to do something. 

<h2>Pressing with Compel</h2>

<blockquote>TN Adjusters based on target
Attitude: The more they like you the easier it is<br/>
Character: The more in aligns with their goals, values or character the easier it is<br/>
Mood: The more their mood lends itself to the action the easier it is<br/>
Immediate Consequence: The smaller the easier it is<br/>
</blockquote>

Attitude adjustment: 
<blockquote>They love you -4<br/>
They like you -2<br/>
The are ambivalent 0<br/>
They dislike you +2<br/>
They hate you +4<br/>
</blockquote>
In character adjustment, aligns with their values, goals or otherwise aligned to character:
<blockquote>
Very aligned -2<br/>
Slightly aligned 0 <br/>
Not aligned +2<br/>
Slightly in contrast +4<br/>
Greatly in contrast +6<br/>
</blockquote>

	Mood, the GM will use their discretion on how mood relates to the roll:
<blockquote>
		Greatly aligned with -4<br/>
		Slightly Aligned with -2<br/>
		Not Aligned 0<br/>
		Slightly in contrast with +2<br/>
		Greatly in contrast with +4<br/>
</blockquote>
	Immediate consequence:<blockquote>
		None: 0<br/>
		Minor: +1<br/>
		Medium: +2<br/>
		Major: +4<br/>
</blockquote></div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Compel Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                                        <div class="abilityFieldset talentFieldset handbookAbilityFieldset">
                <div class="abilityLegend talentLegend">Bully (Compel)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Talent, Potence:</b> Like it or not you have a tendency to push people around, which can make it quite hard to keep friends. </div>
                <div class="abilityFieldEven">Increase your Punish damage by 2. You have <abbr class="boosted">Boosted</abbr> when compelling someone who has an attitude of Love, Like, or Apathy toward you. Decrease their attitude toward you by 1 degree afterward. You can spend 1 mana to prevent this decrease of attitude. </div>
              </div>
                                    
            
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Bully (Compel)</div>
                <div class="abilityField namField"><b>Talent:</b></div>
                                  <div class="abilityField namField"><b>Passive:</b> Increase your Punish by 2.</div>    
                                
                <div class="abilityField namField"><b>Reaction:</b> Enemy misses you</div>        
                <div class="abilityField abilityFieldLast namField"><b>Effect:</b> Slide them 1</div>
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Roar (Compel)</div>
                <div class="amField abilityField"><b>Incantation:</b> You unleash a loud battle cry urging allies forward and pushing back your enemies. </div>
                <div class="amField abilityField"><b>Action:</b> 3/6 Momentum</div>         
                <div class="amField abilityField"><b>Effect (3):</b> Before or after your attack push all creatures within three up to 2. Yourself and pushed allies gain <abbr class="round">Round</abbr> <abbr class="boosted">Boosted</abbr></div>
                                  <div class="amField abilityField"><b>Effect (6):</b> Before or after your attack push all creatures within three spaces up to 3. Hit enemies that are hit and damaged gain <abbr class="round">Round</abbr> <abbr class="slow">Slow</abbr></div>
                                <div class="amField abilityField abilityFieldLast"><b>1 Mana:</b> As suggestion 5e spell if someone is afraid of you?</div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Compel -->
    
      <!-- Rouse -->
      <section class="section" id="RouseSection">
        <header class="sectionHeader hideWrapper">
          <button id="showRouse" class="hidden showButton" onclick="show('Rouse');">Rouse</button>
          <button id="hideRouse" class="hide" onclick="hide('Rouse');">[&#8213;]</button>  
        </header>

        <article id="Rouse" class="sectionBody">
          <h1>Rouse</h1>
          <div class="divider"></div>

          <div id="RouseDescription">Rouse is the skill relating to elevating moods and getting people to a place they are less likely to take, think about solutions to problems, and more likely to take extreme actions. 
<br/><br/>
Like all social skills it can be used to Press or Invest, although, like Handling, as it deals with Mood is easier to Press than attitude, trust, or behavior. Circumstances often require pressing mood as few people in extreme moods have interest in chatting for an extended length of time to allow for an invest roll. 
<br/>
Base TN: 3<br/>
For each hour you want to reduce this by increase the TN by 1. (+3 TN to Press)<br/>
-2 TN if they trust you<br/>
-4 if they love you<Br/>
+2 tn if they dislike you<br/>
+4 if they hate you<Br/>
+1 per intensity of the mood you're trying to create<br/>
+2 if they are currently hostile<br/>
+X or -X circumstances, like it is a mood they are unlikely to experience or a good reason they shouldn't elevate.<br/>
+1 TN per additional tier for the number of people you're trying to affect<br/>
</div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Rouse Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                                        <div class="abilityFieldset talentFieldset handbookAbilityFieldset">
                <div class="abilityLegend talentLegend">Inspire (Rouse)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Talent, Invocation:</b> Your mood can be contagious. </div>
                <div class="abilityFieldEven">Adjacent allies have +1 Critical Range. 

You can spend 1 mana to give boosted or impaired to people you rouse for their next skill check. </div>
              </div>
                                    
            
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Inspiring (Rouse)</div>
                <div class="abilityField namField"><b>Talent, Aura:</b></div>
                                  <div class="abilityField namField"><b>Passive:</b> Adjacent allies have +1 Critical Range</div>    
                                
                <div class="abilityField namField"><b>Reaction:</b> An ally misses</div>        
                <div class="abilityField abilityFieldLast namField"><b>Effect:</b> Give them <abbr class="short">Short</abbr> <abbr class="boosted">Boosted</abbr></div>
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Incite (Rouse)</div>
                <div class="amField abilityField"><b>Incantation:</b> Words of encouragement rouse an ally to action. </div>
                <div class="amField abilityField"><b>Action:</b> 3/6 Momentum</div>         
                <div class="amField abilityField"><b>Effect (3):</b> One ally within three gains <abbr class="short">Round</abbr> <abbr class="boosted">Boosted</abbr> and either <abbr class="quick">Quick</abbr> or <abbr class="focused">Focused</abbr></div>
                                  <div class="amField abilityField"><b>Effect (6):</b> One ally within three spaces gains <abbr class="round">Round</abbr> <abbr class="haste">Haste</abbr> and <abbr class="boosted">Boosted</abbr></div>
                                <div class="amField abilityField abilityFieldLast"><b>1 Mana:</b> One ally within 3 can act when they normally cannot (surprise rounds, right when setting off a trap, etc).</div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Rouse -->
    
      <!-- Charm -->
      <section class="section" id="CharmSection">
        <header class="sectionHeader hideWrapper">
          <button id="showCharm" class="hidden showButton" onclick="show('Charm');">Charm</button>
          <button id="hideCharm" class="hide" onclick="hide('Charm');">[&#8213;]</button>  
        </header>

        <article id="Charm" class="sectionBody">
          <h1>Charm</h1>
          <div class="divider"></div>

          <div id="CharmDescription">Charm relates to ones ability to delight others and utilizing that delight to manipulate the attitude. This influence can be brief just enough to get some information or given time can create and significant changes in someones reputation of you. While charm is primarily used to increase attitude it can also be used to decrease it. 
<br/><br/>
Where reciprocity, jovial flattery, a ear to lend to woes, friendly contact, and empathy for feelings are some techniques to increase attitude, criticism (especially when inaccurate), unsolicited advice, disregard for feelings, expectation of favors and friendship or gifts can be used to decrease it.
<br/><br/>


<h2>Influencing attitude</h2> 
Changing attitude generally takes time and requires more socializing than most other social skills.  The obstacles are mood, reputation and time. 
<br/><br/>
The higher someones mood the easier it is to increase attitude and harder it is to decrease it. The lower the easier to decrease it and harder to increase it. 
<br/><br/>
Reputation will determine a characters initial attitude toward you and the more you want to influence it from that the harder it becomes. Various personality traits and previous experience will influence reputation and this is largely a matter of GM discretion. 
<br/><br/>
The quicker you want to influence attitude to harder it is to do so. A suitor might court a lady for weeks, months or years to secure their adoration of a specific person. While another may push their luck in just a few minutes and risk decreasing attitude and trust. 
<br/><br/>Generally a hours of conversation in a exciting and comfortable environment will allow a charm roll for influence. If a character has the the opportunity to extend that by by a day or two it becomes easier, then easier again with a week or two, easier again with a month or two. 
<br/><br/>
To attempt to charm in a less than a few hours will increase the difficulty, and again less than an hour and again for each quarter hour less. 




<h3>Leveraging Attitude</h3>
Charm can be used to get greater favors than normal or decrease the chance attitude decreases from asking for favors. The TN of the check is largely up to GM discretion, refer to the general guideline for skill difficulty. 


<h2>Failing a Charm check</h2>
Failing charm often simply means you don't create the influence in. However, depending on what you were trying to utilize the new attitude for you can decrease their impression or trust toward you.

Lesser success allows you to play of the charm off in such a way that it will not influence attitude or trust.

<h2>Consequences/Changing an Impression</h2>
Based on how a character uses their influence on attitude it can create a lasting impression on attitude or trust. 

<h3>Examples</h3>
A charming merchant can sweep through, delight an village and gain small favors, capture hearts, entice desires and loosen tongues or britches. 
<br/><br/>
However, after the merchant moved on and the fire fades and villagers start to realize the were swindled giving much more than they got, the reputation of the merchant could decrease. </div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Charm Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                                        <div class="abilityFieldset talentFieldset handbookAbilityFieldset">
                <div class="abilityLegend talentLegend">Likable (Charm)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Invocation Talent:</b> I mean really...what's not to like?</div>
                <div class="abilityFieldEven">Enemies ignore you the first round of combat. 

When you fail a social roll you can spend 1 mana to ignore the consequences. 

</div>
              </div>
                                    
            
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Alluring (Charm)</div>
                <div class="abilityField namField"><b>Talent:</b></div>
                                  <div class="abilityField namField"><b>Passive:</b> +1 damage against unprotected enemies</div>    
                                
                <div class="abilityField namField"><b>Focus:</b> 1 Momentum</div>        
                <div class="abilityField abilityFieldLast namField"><b>Effect:</b> Pull an unprotected enemy within three 1</div>
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Lure (Charm)</div>
                <div class="amField abilityField"><b>Trick, Enchantment:</b> Your magnetic personality pulls others toward you</div>
                <div class="amField abilityField"><b>Action:</b> 3/6 Momentum</div>         
                <div class="amField abilityField"><b>Effect (3):</b> Pull one ally or damaged enemy within three up to 3 spaces. A creature you pulled with this effect gains <abbr class="short">Short</abbr> <abbr class="breached">Breached</abbr>.</div>
                                  <div class="amField abilityField"><b>Effect (6):</b> Pull any number of allies or damaged enemies within three up to a total of 6. All enemies pulled gain <abbr class="round">Round</abbr> <abbr class="dazed">Dazed</abbr> and  <abbr class="breached">
Breached</abbr></div>
                                <div class="amField abilityField abilityFieldLast"><b>1 Mana:</b> A creature that does not hate you will do you 1 small favor.</div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Charm -->
    
      <!-- Handling -->
      <section class="section" id="HandlingSection">
        <header class="sectionHeader hideWrapper">
          <button id="showHandling" class="hidden showButton" onclick="show('Handling');">Handling</button>
          <button id="hideHandling" class="hide" onclick="hide('Handling');">[&#8213;]</button>  
        </header>

        <article id="Handling" class="sectionBody">
          <h1>Handling</h1>
          <div class="divider"></div>

          <div id="HandlingDescription">Handling is the skill relating to calming moods and getting people to a place they are more likely to talk with you, think about solutions to problems and less likely to take extreme actions. 
<br/><br/>

Like all social skills it can be used to Press or Invest, although, like Rouse, as it deals with Mood is easier to Press than attitude, trust, or behavior. Circumstances often require pressing mood as few people in extreme moods have interest in chatting for an extended length of time to allow for an invest roll. 
<br/><br/>

Base TN: 3<br/>
For each hour you want to reduce this by increase the TN by 1. (+3 TN to Press)<br/> 
-2 TN if they like you<br/>
-4 if they love you<br/>
+2 tn if they dislike you<br/>
+4 if they hate you<br/>
+1 per intensity of the mood<br/>
+2 if they are currently hostile<br/>
+X or -X circumstances, like the presence of a thing that is creating the mood or a good reason they should calm down. <br/>
+1 TN per additional tier for the number of people you're trying to affect<br/>

</div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Handling Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                                        <div class="abilityFieldset talentFieldset handbookAbilityFieldset">
                <div class="abilityLegend talentLegend">Serene (Handling)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Talent, Invocation:</b> Your presence has a calming effect no those around you. </div>
                <div class="abilityFieldEven">Enemies ignore you for dislikes for 1 round after damaging you. When making social rolls you can spend 1 mana to consider your target's mood calm when determining difficulty.</div>
              </div>
                                    
            
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Allay (Handling)</div>
                <div class="abilityField namField"><b>Talent</b></div>
                                  <div class="abilityField namField"><b>Passive:</b> Enemies you have not damaged ignore you</div>    
                                
                <div class="abilityField namField"><b>Reaction:</b>1 Momentum, an ally within three is damaged.</div>        
                <div class="abilityField abilityFieldLast namField"><b>Effect:</b> Reduce the damage by up to your Handling Skill Rank, you take that much Pure damage.</div>
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Lash (Handling)</div>
                <div class="amField abilityField"><b>Trick, Enchantment:</b> With words sharp like a whip you bind or drive others into action.</div>
                <div class="amField abilityField"><b>Action:</b> 3/6 Momentum</div>         
                <div class="amField abilityField"><b>Effect (3):</b> An ally within three gains <abbr class="short">Short</abbr> <abbr class="boosted">Boosted</abbr> 2 and +1 Critical Range</div>
                                  <div class="amField abilityField"><b>On Hit (6):</b> A damaged enemy gains <abbr class="round">Round</abbr> <abbr class="breached">Breached</abbr> 2</div>
                                <div class="amField abilityField abilityFieldLast"><b>1 Mana:</b></div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Handling -->
    
      <!-- Diplomacy -->
      <section class="section" id="DiplomacySection">
        <header class="sectionHeader hideWrapper">
          <button id="showDiplomacy" class="hidden showButton" onclick="show('Diplomacy');">Diplomacy</button>
          <button id="hideDiplomacy" class="hide" onclick="hide('Diplomacy');">[&#8213;]</button>  
        </header>

        <article id="Diplomacy" class="sectionBody">
          <h1>Diplomacy</h1>
          <div class="divider"></div>

          <div id="DiplomacyDescription">Prevent worsening of attitude toward or a thing you are associated with. Can decrease attitude of a third party. </div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Diplomacy Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                                        <div class="abilityFieldset talentFieldset handbookAbilityFieldset">
                <div class="abilityLegend talentLegend">Bind</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Talent, Conjugation, Invocation:</b> You have a knack for preventing the manipulations of others.</div>
                <div class="abilityFieldEven">Adjacent enemies are Meek 1. You can spend 1 mana to Impair the a social skill of another for the remainder of the scene.</div>
              </div>
                                    
            
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Bureaucrat (Diplomacy)</div>
                <div class="abilityField namField"><b>Talent:</b> Adept at tying others up in red tape or turning their actions against them</div>
                                  <div class="abilityField namField"><b>Passive:</b> Flanked enemies adjacent to you deal -1 damage.</div>    
                                
                <div class="abilityField namField"><b>Reaction:</b>1 momentum, You gain a condition</div>        
                <div class="abilityField abilityFieldLast namField"><b>Effect:</b> Give the same condition to another creature within 3 with a <abbr class="round">Round</abbr> duration</div>
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Hush (Diplomacy)</div>
                <div class="amField abilityField"><b>Trick, Enchantment:</b> </div>
                <div class="amField abilityField"><b>Action:</b> 3/6 Momentum</div>         
                <div class="amField abilityField"><b>Effect (3):</b> +1 to hit or +1 Critical Range. Give a hit enemy <abbr class="round">Round</abbr> <abbr class="impaired">Impaired</abbr></div>
                                  <div class="amField abilityField"><b>Effect (6):</b> Either +2 to hit or +2 Critical Range. Damaged enemies gain <abbr class="short">Short</abbr> <abbr class="impaired">Impaired</abbr> and are Impaired an additional time for every 2 Critical Marks on this attack.</div>
                                <div class="amField abilityField abilityFieldLast"><b>1 Mana:</b> People within 30 feet of you get quiet for about two minutes.</div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Diplomacy -->
    
      <!-- Leadership -->
      <section class="section" id="LeadershipSection">
        <header class="sectionHeader hideWrapper">
          <button id="showLeadership" class="hidden showButton" onclick="show('Leadership');">Leadership</button>
          <button id="hideLeadership" class="hide" onclick="hide('Leadership');">[&#8213;]</button>  
        </header>

        <article id="Leadership" class="sectionBody">
          <h1>Leadership</h1>
          <div class="divider"></div>

          <div id="LeadershipDescription">Confidence, getting people not to question you, second think your commands, doubt you. 
<br/><br/>
Can be used to incite or discourage behaviors, similar to encourage and intimidate, although not through influencing emotion but more through creating an perception of authority. It is also limited to behavior it can't influence moods. More than any other social skill body language and projected confidence are the tools of leadership. While speech is still often utilized and important a lot can be done without it. 
<br/><br/>
Where the consequences of encourage and intimidate mostly relate to changes in attitude. The consequences of utilizing leadership relate to changes in trust. </div>
          <br/><br/>
          <div class="divider"></div>
          <h1>Leadership Abilities</h1>
          
          <!--
           <div class="flex" style="width:640px !important; margin-left:-45px">
                                        <div class="abilityFieldset talentFieldset handbookAbilityFieldset">
                <div class="abilityLegend talentLegend">Awe (Leadership)</div>
                <div class="abilityKeywords abilityFieldOdd"><b>Talent, Conjugation, Invocation:</b> The trust your allies place in you allows you lead them more effectively. </div>
                <div class="abilityFieldEven">Allies affected by your Tricks get +1 Critical Range. 

You can spend 1 mana to give another creature <abbr class="boosted">Boosted</abbr> to a skill for the remainder of the scene. 
</div>
              </div>
                                    
            
                      
          </div>
          -->
          <br/><br/>
          <div class="flex" style="width:640px !important; margin-left:-45px">

                          <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend namLegend">Bless (Leadership)</div>
                <div class="abilityField namField"><b>Talent</b></div>
                                  <div class="abilityField namField"><b>Passive:</b> Allies you <abbr class="boosted">Boost</abbr> have +1 Damage</div>    
                                
                <div class="abilityField namField"><b>Focus:</b> 1 Momentum</div>        
                <div class="abilityField abilityFieldLast namField"><b>Effect:</b> Target a space within three. <abbr class="round">Round</abbr> allies attacking from this space gain <abbr class="boosted">Boosted</abbr> and reduce the cost of an attack maneuver by 1 momentum
</div>
                  
              </div>
                                      <div class="abilityFieldset handbookAbilityFieldset">
                <div class="abilityLegend amLegend">Direct (Leadership)</div>
                <div class="amField abilityField"><b>Trick, Bonding:</b> With a sharp command your allies slide into position. </div>
                <div class="amField abilityField"><b>Action:</b> 3/6 Momentum</div>         
                <div class="amField abilityField"><b>Effect (3):</b> Slide any number of allies within three up to 3 total spaces. Give one ally 1 Momentum.</div>
                                  <div class="amField abilityField"><b>Effect (6):</b> Slide any number of allies up to 8 total spaces. Give one ally 3 momentum. </div>
                                <div class="amField abilityField abilityFieldLast"><b>1 Mana</b>: Boost the skill of an ally for the remainder of a scene</div>
              </div>
                      </div>

          <div style="clear:both;"></div>
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Leadership -->
        <!-- End Pull Skills from Data Base -->

          
      <!-- Pray (Common) -->
      <section class="section" id="Section">
        <header class="sectionHeader hideWrapper">
          <button id="show" class="hidden showButton" onclick="show('');">Ritual: Pray (Common)</button>
          <button id="hide" class="hide" onclick="hide('');">[&#8213;]</button>  
        </header>

        <article id="" class="sectionBody">
          <h1>Pray (Common)</h1>
          <div class="divider"></div>

          <div></div>

            <div class="abilityFieldset ritualFull">
              <div class="abilityLegend ritualLegend">Pray (Common)</div>
              <div class="abilityKeywords abilityField ritualField"><b>Ritual, Conjugation</b></div>
              <div class="abilityField ritualField"><b>Cost:</b> 1 Mana</div>
              <div class="abilityField ritualField"><b>Cast time:</b> 6 seconds</div>
              <div class="abilityField ritualField"><b>Duration:</b> Instant</div>
              <div class="abilityField ritualField"><b>Effect:</b> The Weaver can transfer mana freely between one willing participant and themselves. </div>
              <div class="abilityField ritualField"><b>Enhancements</b>
<blockquote>
Reach (6 second cast time): Increase number of participants you can transfer between by 1. </blockquote></div>
              <div class="abilityField ritualField"><b>Augments:</b> TBD</div>
              <div class="abilityField ritualField abilityFieldLast"><b>Resist:</b> N/A</div>
            </div>

            
                    </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Pray (Common) -->
          
      <!-- Harmony (Common) -->
      <section class="section" id="Section">
        <header class="sectionHeader hideWrapper">
          <button id="show" class="hidden showButton" onclick="show('');">Ritual: Harmony (Common)</button>
          <button id="hide" class="hide" onclick="hide('');">[&#8213;]</button>  
        </header>

        <article id="" class="sectionBody">
          <h1>Harmony (Common)</h1>
          <div class="divider"></div>

          <div></div>

            <div class="abilityFieldset ritualFull">
              <div class="abilityLegend ritualLegend">Harmony (Common)</div>
              <div class="abilityKeywords abilityField ritualField"><b>Ritual, Conjugation</b></div>
              <div class="abilityField ritualField"><b>Cost:</b> 1 Mana</div>
              <div class="abilityField ritualField"><b>Cast time:</b> 1 minute</div>
              <div class="abilityField ritualField"><b>Duration:</b> 1 hour</div>
              <div class="abilityField ritualField"><b>Effect:</b> The caster and the participants are in Harmony for a skill roll. This roll can be either a group action (climbing over a wall, sneaking past a guard) or a individuals action that other people can assist with (charming a drunk guard into giving up a password to enter a palace).


<br/><span class="indent40"> </span>

When taking a group action all ritual participants roll and share the highest result. Any impairment a character has is shared with everyone else (if the group is trying to sneak and one character has heavy armor all characters are impaired twice for this roll). 

<br/><span class="indent40"> </span>

When making an individual roll each participant that can assist rolls their skill as well. The instigator of the roll can use the result of any roll. 

</div>
              <div class="abilityField ritualField"><b>Enhancements:</b>
<ul>
<li>
Extend (1 Mana, 10 minute cast time): The result can be used a second time within the duration. Increase duration by 2 hours.
</li><li> 
Encompass (3 minute cast time): Can include an additional participant above your normal maximum. 
</li></ul></div>
              <div class="abilityField ritualField">Augments: TBD</div>
              <div class="abilityField ritualField abilityFieldLast">Resist: N/A</div>
            </div>

                          <h2>Gameplay Notes </h2>
              Any participant can use the individual harmonious roll, but the Weaver must allow them to use it when they try.            
                          <h2>Narrative Notes</h2>
              In the case of assisting those assisting should explain how they are doing so.                     </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Harmony (Common) -->
          
      <!-- Conjure Element (Lore) -->
      <section class="section" id="conjureElementSection">
        <header class="sectionHeader hideWrapper">
          <button id="showconjureElement" class="hidden showButton" onclick="show('conjureElement');">Ritual: Conjure Element (Lore)</button>
          <button id="hideconjureElement" class="hide" onclick="hide('conjureElement');">[&#8213;]</button>  
        </header>

        <article id="conjureElement" class="sectionBody">
          <h1>Conjure Element (Lore)</h1>
          <div class="divider"></div>

          <div></div>

            <div class="abilityFieldset ritualFull">
              <div class="abilityLegend ritualLegend">Conjure Element (Lore)</div>
              <div class="abilityKeywords abilityField ritualField"><b>Ritual, Conjuration, Sustainable (D)</b></div>
              <div class="abilityField ritualField"><b>Cost:</b> 1 Mana</div>
              <div class="abilityField ritualField"><b>Cast time:</b> 10 minutes</div>
              <div class="abilityField ritualField"><b>Duration:</b> 8 hours</div>
              <div class="abilityField ritualField"><b>Effect:</b> Select an element and target an unoccupied space on the ground. Conjure the element in that space, choose its orientation. 

<ul>
<li><b>Earth:</b> Create a 6ft, 6ft by 2in stone slab in the space (something similar to sandstone).
</li>
<li><b>Air:</b> Create a 60mph wind and choose its flow through the space(s). Stops small projectiles from going through, counts as difficult ground.
</li>
<li><b>Water:</b> Create a 6ft, 6ft by 2in ice slab, and decrease the temperature in the space by 30&deg;F(15&deg;C). Does not block line of sight. 
</li>
<li><b>Fire:</b> Fill the space with fire increasing the temperature of it to 130&deg;F (55&deg;C). Blocks line of sight and deals 3 Pure Fire damage to things that move into the space or starts their turn there.
</li>
</ul>
</div>
              <div class="abilityField ritualField"><b>Enhancements</b>
<ul>
<li> Area (1 mana, 5 minutes): Increase the area of the effect by 1 space</li>
<li> Stack (1 mana, 5 minutes): Create the same effect in an already selected space</li>
<li> Shape (1 mana, 30 minutes): Shape the effect in one space as you choose</li>
<li> Speed (1 mana): Reduce the cast time by 5 minutes, minimum 1 minute</li>
<li> Potency (1 mana, 5 minutes): Increase the potency of an effect in an already selected space
<blockquote
- Earth: Conjure a harder stone<br/>
- Air: Increase the speed of the wind by 60 mph.<br/>
- Water: Decrease the temperature in the space by 30&deg;F (15&deg;C). Creatures in space -
 gain <span class="vulnerable">Vulnerable</span>.<br/> 
- Fire: Increase the temperature in the space by 30&deg;F (15&deg;C) and increase damage dealt by 3.
</blockquote>
</li>
</ul>
</div>
              <div class="abilityField ritualField"><b>Augments</b>

<ul>
<li><b>Conjure Food or Water</b><br/>
<li><u>Requires:</u> Basic Survival</li>
<li><u>Additional Cost</u> 5 minute cast time</li>
<li><u>Effect:</u> You conjure 6 cubic feet of bread or water</li>
<br/>
<li><b>Advanced Conjuration</b><br/>
<li><u>Requires:</u> 1 Recipe is known per skill rank in lore?</li>
<li><u>Additional Cost:</u> 5 minutes per complexity of the recipe</li>
<li><u>Effect: </u>The elements can be combined with each other and the tangible aspect of them to create various types of matter. See <a href="https://docs.google.com/spreadsheets/d/1zKK0iLYExLc4LvaftuRW3v2_9MLDJmJEszgpfIQOoOU/edit?usp=sharing">Advanced Conjuration</a> and work with your GM to create things more complex than the base elements. 
</div>
              <div class="abilityField ritualField abilityFieldLast"><b>Resist/Counter:</b> Conjuration of the opposite element can counter the effect prior to it's acceptance. The potency of the countered element needs 1 more than the number of days it has been sustained.  There is sometimes a magical reaction to this counter, GM discretion. </div>
            </div>

                          <h2>Gameplay Notes </h2>
              Element Notes:
<blockquote>
&#8226; Earth: 12 HP per 2 cubic inches. Armor 4 and an additional 1 armor per stack.
<br/><br/>
&#8226; Air: Stacking allows for it to push creatures. 2 Stacks will push 1 a Size 1, height 1 creature. An additional stack is needed per increase in size or height.
</blockquote>



Sustaining Conjurations:<br/>
Earth and Water conjurations can become Accepted.<br/>
Fire and Air conjurations cannot become Accepted but their cost to sustain will diminish down its third  weeks cost. That mana is what sustains the fuel of the fire or force of the wind.<br/>
            
                    </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Conjure Element (Lore) -->
          
      <!-- Retrospect (Lore) -->
      <section class="section" id="retrospectSection">
        <header class="sectionHeader hideWrapper">
          <button id="showretrospect" class="hidden showButton" onclick="show('retrospect');">Ritual: Retrospect (Lore)</button>
          <button id="hideretrospect" class="hide" onclick="hide('retrospect');">[&#8213;]</button>  
        </header>

        <article id="retrospect" class="sectionBody">
          <h1>Retrospect (Lore)</h1>
          <div class="divider"></div>

          <div>The caster circles the target counter-clockwise for part of casting duration, stopping at various points to meditate. The speed and amount of circles completed relates the number of questions asked during the Ritual as are various times when the caster stops to meditate.</div>

            <div class="abilityFieldset ritualFull">
              <div class="abilityLegend ritualLegend">Retrospect (Lore)</div>
              <div class="abilityKeywords abilityField ritualField"><b>Ritual, Divination, Resistible</b></div>
              <div class="abilityField ritualField"><b>Cost:</b> 1 Mana</div>
              <div class="abilityField ritualField"><b>Cast time:</b> 5 minutes</div>
              <div class="abilityField ritualField"><b>Duration:</b> N/A</div>
              <div class="abilityField ritualField"><b>Effect:</b> Retrospect centers around and targets a person or object. Upon completion of this ritual the caster can ask a yes or no questions about the history of the target for the GM to answer. They cannot relate to any other specific people or things unless they are also included in the Ritual [1].
<br />
<br />
The target of the ritual must stay in the area of the ritual for the entire cast time. The ritual focus can be part of a person or object but the questions are restricted [2]. </div>
              <div class="abilityField ritualField"><b>Enhancements</b>
    <ul>
      <li>Question (1 mana, 10 minutes) You can ask two additional questions</li>
    </ul></div>
              <div class="abilityField ritualField"><b>Augments:</b> N/A</div>
              <div class="abilityField ritualField abilityFieldLast"><b>Resist/Counter:</b> 1 mana  to resist on Retrospect when you are the focus</div>
            </div>

                          <h2>Gameplay Notes </h2>
              
<ul>
<li>[1]: "Have you killed anyone?" is question that can result in an answer. "Did you kill George?" will not.
<br />
<br />

"Has a person with black hair passed by this door?" is a question that will result in an answer. "Has George passed through this door." Will not.</li>
<li>[2]: If I have the hair of a person I can ask questions about that person, however only as long as that hair was on a part of them. If the hair is 3 months old they caster can only get answers in relation to up to 3 months ago. </li>
</ul>            
                          <h2>Narrative Notes</h2>
              
<ul>
<li>Imagine this as reading the trace evidence of Strings on the ritual target</li>
</ul>                    </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Retrospect (Lore) -->
          
      <!-- Locate (Survival) -->
      <section class="section" id="locateSection">
        <header class="sectionHeader hideWrapper">
          <button id="showlocate" class="hidden showButton" onclick="show('locate');">Ritual: Locate (Survival)</button>
          <button id="hidelocate" class="hide" onclick="hide('locate');">[&#8213;]</button>  
        </header>

        <article id="locate" class="sectionBody">
          <h1>Locate (Survival)</h1>
          <div class="divider"></div>

          <div></div>

            <div class="abilityFieldset ritualFull">
              <div class="abilityLegend ritualLegend">Locate (Survival)</div>
              <div class="abilityKeywords abilityField ritualField"><b>Ritual, Divination, Resistible*</b></div>
              <div class="abilityField ritualField"><b>Cost:</b> 1 Mana</div>
              <div class="abilityField ritualField"><b>Cast time:</b> 10 minutes</div>
              <div class="abilityField ritualField"><b>Duration:</b> 30 minutes</div>
              <div class="abilityField ritualField"><b>Effect:</b> You focus on your Fae sense allowing you to see traces and influences of objects in the area.
<br />

Upon completion of the Ritual you can list 3 criteria. You connection to the Fae tells you the direction and general distance of the closest object that meets those criteria, up to 2 miles, for the duration. 
<br />
<br />
*Alternatively, if you have a piece of the thing you are looking for (page of a book, hair of a person) you can search for that thing specifically, doing so gives a slight tingle to the target and allows them to spend 1 mana to resist the rituals effects. </div>
              <div class="abilityField ritualField"><b>Enhancements</b>
    <ul>
      <li>Refine (1 mana) Increase criteria by 6</li>
      <li>Range (1 mana, 5 minutes) Increase search radius by 1 mile</li>
      <li>Length (1 mana, 5 minutes) Increase duration by 30 minutes</li>
    </ul></div>
              <div class="abilityField ritualField"><b>Augments</b>
    <ul>
      <li><b>Animal Messenger</b> <br/>
<u>Requires:</u> Basic Survival and Leadership<br/>
<u>Additional Cost:</u> 1 mana 10 Cast Time, adds Invocation keyword<br/>

<u>Effect:</u> Animal Messenger: This augment requires a beast friendly to the caster to be a target of the ritual. Upon completion the animal moves toward the target of the Ritual for the duration. Upon arriving it will stay with the target for 5 minutes before the ritual on the animal ends and they start behaving normally. Often casters of this augment will attach a message to the animal for the target of the ritual. The animal will try for 1 minute to overcome any obstacles in its path and if it can not make progress in that minute the Ritual will end. If it can not reach</li><br/>
      <li><b>Whispering Wind</b><br/>
<u>Requires:</u> Conjure Element Ritual or Air Blast Proficiency<br/>
<u>Additional Cost:</u> 1 mana, 10m Cast Time, adds Conjuration keyword<br/>

<u>Effect:</u> The wind carries 20 words whispered in the air or an object up to one ounce to the target of the ritual at 10 miles per hour (each instance of Whispering Wind allow an additional ounce or 20 words and increases the speed by 5 miles per hour). The wind avoid obstacles that it can, however if there is no way for the object to be carried to the target (if the object and the air can pass under a door, around trees, over cliffs, etc it will) it will slow down then stop once encounters a barrier it can not get around (such as if grabbed).</li><br/>
      <li><b>Obfuscate Effect</b><br/>
<u>Requires:</u> Adept Sneak or Deception<br/>
<u>Additional Cost:</u> 1 mana, 10m Cast time<br/>
<u>Effect:</u> When targeting a specific creature they immediately forget the effect happened if they resist it or not</li>
    </ul></div>
              <div class="abilityField ritualField abilityFieldLast"><b>Resist/Counter:</b> 1 Mana to Resist if you are specifically being located.</div>
            </div>

                          <h2>Gameplay Notes </h2>
              <ul>
<li>Survival checks can help you, with the assistance of the GM, in learning aspects of creatures to help refine this search.</li>
</ul>            
                          <h2>Narrative Notes</h2>
              <ul>
<li>While Retrospect looks at the trace evidence on the target, Locate looks for the trace evidence left by it</li>
</ul>                    </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Locate (Survival) -->
          
      <!-- Restoration (Survival) -->
      <section class="section" id="restorationSection">
        <header class="sectionHeader hideWrapper">
          <button id="showrestoration" class="hidden showButton" onclick="show('restoration');">Ritual: Restoration (Survival)</button>
          <button id="hiderestoration" class="hide" onclick="hide('restoration');">[&#8213;]</button>  
        </header>

        <article id="restoration" class="sectionBody">
          <h1>Restoration (Survival)</h1>
          <div class="divider"></div>

          <div></div>

            <div class="abilityFieldset ritualFull">
              <div class="abilityLegend ritualLegend">Restoration (Survival)</div>
              <div class="abilityKeywords abilityField ritualField"><b>Ritual, Conjuration, Restore</b></div>
              <div class="abilityField ritualField"><b>Cost:</b> 1 Mana</div>
              <div class="abilityField ritualField"><b>Cast time:</b> 5 minutes</div>
              <div class="abilityField ritualField"><b>Duration:</b> N/A</div>
              <div class="abilityField ritualField"><b>Effect:</b> Target a creature, they can remove one condition with a <abbr class="rest">rest</abbr> duration, |survivalSkillRank| <abbr class="persistent">persistent</abbr> damage, or restore 1 Recovery</div>
              <div class="abilityField ritualField"><b>Enhancements</b>
<ul>
<li>Restore Health (2 Mana, 10 minutes) Restore a health category
</li>
<li>Remove Pain(1 Mana, 10 minutes) Remove a condition with a <abbr class="day">Day</abbr> duration
    
</ul></div>
              <div class="abilityField ritualField"><b>Augments</b>

<ul>

<li><b>Remove Curse</b><br/>
<u>Requires:</u> Expert Handling & Insight <br/>

<u>Additional Cost:</u> 18 mana, 8 hours<br/>
 
<u>Effect</u> Remove a simple curse or suspend a more complex curse for 24 hours. While suspended another restore ritual with this augment can be cast to further simplify a curse. If the complexity of a curse is reduced below simple in this way it is removed. </li>
<br/>
<li><b>Bestow Curse</b><br/>
<u>Requires:</u> Expert Compel & Deception<br/>
<u>Additional Cost:</u> 18 mana, 6 hours<br/>

<u>Effect:</u> Apply a simple curse or increase the complexity of a curse you are creating in this ritual</li> 
    </ul></div>
              <div class="abilityField ritualField abilityFieldLast"></div>
            </div>

            
                          <h2>Narrative Notes</h2>
              <ul>
<li>Curse removal should be made easier or even made possible by doing specific things related to what caused the curse.</li>
<li>Bestowing Curses. This is a fairly open ended ability, I think it is rarely going to be used by adventures and the rules provided here are light to allow for a lot of creativity in how to use it. It can simply be a mechanical curse but feel free to make them quite interesting. See TV Tropes Curse page for ideas and examples. Just remember that this magic system is about creation, and curses that remove things or cause alterations (without creating something to do those things) are kind of outside of this magic system but if you as a GM are always free to do as you like (just be wary of breaking immersion and systemic cohesion for your players).</li>
<li>World Building: In theory this is about building up the structure of matter from the ground up. Which could in theory build a brain and body and reanimate or even clone an individual. In Gaia only those with a Godly skill level in Fae have refined enough ability to see and understand the complex pattern that makes up a brain, then only those with a Godly skill level in First-Aid have sufficient skill to restore elements of such a complex pattern. Although someone with both can, and in some cases have, created new life, there is still much science to be done to fully understand the impact of changes. While less knowlegable and skilled individuals have tried to restore people from the dead many attempts so far have has significant unintended effects, mostly with reconstructing the brain in the wrong way resulting in all sorts of changes accidental and often unrepeatable changes in personaility, creature ability and instincts. Think of Godly level Fae as the ability to do a genome sequence and a very detailed brain scan, then First-Aid is the ability to restore damaged aspects of a creature back to that. Tweaks can be made to DNA and brain structure in that process but only 2 godly level characters in the world have any experience with the implications of doing so and even they only just beyond playing with matches.</li>
</ul>                    </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Restoration (Survival) -->
          
      <!-- Phantasm (Deception) -->
      <section class="section" id="illusionSection">
        <header class="sectionHeader hideWrapper">
          <button id="showillusion" class="hidden showButton" onclick="show('illusion');">Ritual: Phantasm (Deception)</button>
          <button id="hideillusion" class="hide" onclick="hide('illusion');">[&#8213;]</button>  
        </header>

        <article id="illusion" class="sectionBody">
          <h1>Phantasm (Deception)</h1>
          <div class="divider"></div>

          <div>The caster walks shapes relating to all of Strings but never completing those shapes. </div>

            <div class="abilityFieldset ritualFull">
              <div class="abilityLegend ritualLegend">Phantasm (Deception)</div>
              <div class="abilityKeywords abilityField ritualField"><b>Ritual, Conjuration, Illusion, Sustainable (D)</b></div>
              <div class="abilityField ritualField"><b>Cost:</b> 1 Mana</div>
              <div class="abilityField ritualField"><b>Cast time:</b> 5 minutes</div>
              <div class="abilityField ritualField"><b>Duration:</b> 6 hours</div>
              <div class="abilityField ritualField"><b>Effect:</b> Target an area or thing encompassing 1 size and height or small. You create an visual illusion encompassing the target.
<br />
<br />

If targeting a thing:
The illusion moves with the thing relative to their movements or effects that force them to move. However, it must maintain the same basic shape of the thing. No significant changes in size, height or shape.
<br />
<br />

Targeting an area:
Create an image of an object, a creature or a change in the terrain</div>
              <div class="abilityField ritualField"><b>Enhancements</b>
    <ul>
<li>Expand (10 minutes): Increase size or height of the illusion by 1</li>
      <li>Illusory Touch and Temperature (1 mana and 5 minutes per 3 spaces affected): When  interacting or being interacted with  through touch it now has some substance and is capable of causing harm to people who do not resist it after an interaction with it. Increase the TN to resist by 1 and physical interaction with the illusion will result in much smaller reductions in the TN and often none at all. Ignore reduction primary sense to TN for creatures that have a primary sense that relates to touch. 

<p class="note">
Hitting an illusory creature that has added illusory substance will feel like hitting a real creature. Any damage done will be replicated as the character that conjured it imagines it would including wounds.
</p>
<br/>
</li>
      <li>Illusory Sound (1 mana and 2 minutes per per 3 spaces affected): The image now produces sound as the casters imagines it would including when it interacts with other things. This can include various sounds the image might make, including reactions to being hit, up to 90 words of speech played at specific times as determined by caster (but not in relation to an event). If targeting an area it can also produces any sounds the caster would like, but it can only be heard within the affected area. This sound can be loud enough to be quite unpleasant and intimidating, blocking out other sounds in the area but can not to cause harm. The source of the sound can be any part of the image created and once that source is located it can have significant decreases in TN if the source makes little sense relative to the image at the source. Increase the TN to resist by 1 and observing sound the image makes will result in much smaller reductions in the TN and often none at all. Ignore primary sense reduction to TN for creatures that have a primary sense that relates to sound (echo location). <br/><br/>
</li>
      <li>Illusory Smell (1 mana and 1 minute per 3 spaces affected): By default each part of the image smells as the caster believes it smells, however the caster can modify it to smell anyway the imagine it too. This smell can be pungent enough to be unpleasant and intimidating, blocking out other smells in the area but can not cause harm. The source of the smell can be any part of the image created and once that source is located it can have significant decreases in TN if the source makes little sense relative to the image. Increase the TN by resist by 1 and observing the smell the image makes will result in much smaller reductions in TN and often none at all. Ignore primary sense reduction to the TN for creatures that have a primary sense that relates to smell. <br/><br/></li>
      <li>Illusory Tate (1 mana and 1 minute per 3 spaces affected): By default it tastes as the caster would taste the image, however the caster can modify it to taste anyway they can imagine it too. The taste can vary enough to be unpleasant but not cause harm. This taste can be stronger than the thing normally tastes like, but the strong taste the thing would normally have the more likely there is to be suspicion. Each part of the image can and if it includes multiple objects or things likely does taste differently relative to what it is an image of. Increase the TN by 1 and observing the taste of the image will result in much smaller reductions in TN and often none at all. Ignore reduction to TN for creatures that have a primary sense of taste.<br/><br/></li>
      <li>Enhanced Deception (1 mana, per 3 spaces affected) Increase TN by 2<br/><br/></li>
    </ul></div>
              <div class="abilityField ritualField"><b>Augments</b>
    <ul>
      <li>Programmed Illusion, Adept Leadership (1 mana and 10 minutes per 3 spaces affected,  Time Cost): The caster can have the illusion react to various stimulus.<br/><br/> </li>
      <li>Tinkering: Triggered Illusion (1 mana per 3 criteria added, 30 minutes): The conjuration of the illusion is delayed until a something that fits the criteria enters the affected area</li>
    </ul></div>
              <div class="abilityField ritualField abilityFieldLast"><b>Resist/Counter:</b> See rules pertaining to illusions in the Conjuration section.

<br/><br/>
Illusions can be countered by casting a Ward ritual of equal or greater total Mana cost targeting the Illusion</div>
            </div>

                          <h2>Gameplay Notes </h2>
              Unlike standard illusions Phantasms are given substance by the major and the mind of the perceiver. Until a phantasm is understood to be an illusion it has substance. Once a character knows it is an illusion they can try and deceive themselves having their mind give it substance while they interact with it.             
                          <h2>Narrative Notes</h2>
              <ul>
<li>World Building: How accustom people in your world are to illusions will impact how effective they are. The more common it is to have illusion to easier time the average person will have in detecting them</li>
</ul>                    </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Phantasm (Deception) -->
          
      <!-- Portent (Insight) -->
      <section class="section" id="portentSection">
        <header class="sectionHeader hideWrapper">
          <button id="showportent" class="hidden showButton" onclick="show('portent');">Ritual: Portent (Insight)</button>
          <button id="hideportent" class="hide" onclick="hide('portent');">[&#8213;]</button>  
        </header>

        <article id="portent" class="sectionBody">
          <h1>Portent (Insight)</h1>
          <div class="divider"></div>

          <div></div>

            <div class="abilityFieldset ritualFull">
              <div class="abilityLegend ritualLegend">Portent (Insight)</div>
              <div class="abilityKeywords abilityField ritualField"><b>Ritual, Divination</b></div>
              <div class="abilityField ritualField"><b>Cost:</b> 1 Mana</div>
              <div class="abilityField ritualField"><b>Cast time:</b> 20 minutes</div>
              <div class="abilityField ritualField"><b>Duration:</b> 24 hours</div>
              <div class="abilityField ritualField"><b>Effect:</b> Focuses the caster on small slight changes in energy, allowing them to feel the effect of actions around them right as they are about to happen. This results in the character witnessing something like a deja vu and allowing them to glimpse into the outcome of an events.
<br />
<br />

Gain 3 Portent to be spent into these 'glimpses into the future'. Lose all Portent points if you take a long rest. Each rank of insight allows for greater glimpses into the future:

    <ul>
      <li><u>Basic, 1 Portent</u>: Re-roll any out of combat roll</li>
      <li><u>Trained, 2 Portent</u>: Undo an out of combat event no longer than 6 seconds for one character</li>
<li><u>Adept, 8 Portent</u>:undo an series of events no longer than 2 minutes (or 1 combat)</li></ul>

You can only affect events or dice created by you or ritual participants. When changing events or dice for someone that assisted with the Ritual they must reasonably be able to receive a split second warning from you. 
</div>
              <div class="abilityField ritualField"><b>Enhancements</b>
    <ul>
      <li>(1 mana, 10 minutes) Increase Portent points by 3</li>
      <li>(1 mana) Reduce cast time by 15 minutes</li>
    </ul></div>
              <div class="abilityField ritualField"><b>Augments:</b> N/A
</div>
              <div class="abilityField ritualField abilityFieldLast"><b>Resistible:</b> N/A</div>
            </div>

                          <h2>Gameplay Notes </h2>
              <ul>
<li>Declare the use of Portent points after a roll or action resolves but prior to the next action or end of a characters turn. This can also be used to re-roll out of combat rolls and 'undo' actions after seeing the immediate consequence. 
</li>
</ul>
            
                          <h2>Narrative Notes</h2>
              <ul>
<li>You as a player are choosing when to use your Portent, but the character is not, rather they are reacting to what insight presents itself.</li>
</ul>                    </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Portent (Insight) -->
          
      <!-- Sigil (Tinkering) -->
      <section class="section" id="sigilSection">
        <header class="sectionHeader hideWrapper">
          <button id="showsigil" class="hidden showButton" onclick="show('sigil');">Ritual: Sigil (Tinkering)</button>
          <button id="hidesigil" class="hide" onclick="hide('sigil');">[&#8213;]</button>  
        </header>

        <article id="sigil" class="sectionBody">
          <h1>Sigil (Tinkering)</h1>
          <div class="divider"></div>

          <div></div>

            <div class="abilityFieldset ritualFull">
              <div class="abilityLegend ritualLegend">Sigil (Tinkering)</div>
              <div class="abilityKeywords abilityField ritualField"><b>Ritual, Conjuration, Sustainable (D)</b></div>
              <div class="abilityField ritualField"><b>Cost:</b> 1 Mana</div>
              <div class="abilityField ritualField"><b>Cast time:</b> 20 minutes</div>
              <div class="abilityField ritualField"><b>Duration:</b> 12 hours</div>
              <div class="abilityField ritualField"><b>Effect:</b> Target a surface no smaller than 6" by 6" (like a page of a book) and no larger than 6' by 6'. When triggered it explodes dealing 6 <abbr class="persistent">persistent</abbr> damage with a diameter of 3 spaces (~18 feet). 
<br/>
<br/>

<b>Trigger Criteria:</b> A living creature touches the Sigil, which can be restricted by one criteria the caster chooses. 
<br/><br/>


Once triggered the sigil disappears.
<br/><br/>
Base TN to 'feel' a sigils presence, Lore: 8 (+1 per space away from it).<br/> 
Base TN to find a sigil, Awareness or Lore: 7 <br/>
Base TN to identify the effect of the sigil, Lore: 5 <br/>
</div>
              <div class="abilityField ritualField"><b>Enhancements</b>
<ul>
<li>Explosive (1 mana, 1 minute): Increase damage dealt by 6</li>
<li>Charge (2 mana, 10 minutes): Allows the sigil to trigger an additional time before disappearing. The same creature can't trigger it again within 1 minute.</li>
<li>Wide (1 mana, 1 minute): Increase diameter of explosion by 1</li>
<li>Restrict (1 mana, 5 minutes): Add up to an additional 3 trigger criteria</li>
<li>Inspirit (1 mana, 1 minute): - 1 Point, Inspirit: Increase the TN to resist effects from Augments by 1 up to [|tinkeringSkillRank|+10]</li>
</ul>
</div>
              <div class="abilityField ritualField"><b>Augments</b>

<li><b>Mask</b><br/>
<u>Requires:</u> Basic Deception<br/>
<u>Additional Cost:</u> 1 mana 5 minutes<br/>
<u>Effect:</u> Increases TN to detect by 3 and can decrease the size of the Sigil down to 1 inch (2.5cm) by 1 inch</li>
<br/>

<ul>
<li><b>Visual Trigger</b><br/>
<u>Requires:</u> Basic Awareness<br/>
<u>Additional Cost:</u> 1 mana<br/>
<u>Effect:</u> The Sigil can see things in front of it up to a distance of 2 spaces per 1 mana spent on this augment and trigger based on seeing things that fit its criteria.</li>

<br/>
<li><b>Auditory Trigger</b><br/>
<u>Requires:</u> Trained Awareness<br/>
<u>Additional Cost:</u> 1 point, 20 minutes<br/>
<u>Effect:</u> The Sigil can hear things around it of it up to a distance of 2 spaces per 1 mana spent on this augment.
Trigger criteria can be restricted by sound or forced to trigger with them, pick words or sounds as your criteria</li>
<br/>

<li><b>Overwhelming Fear</b><br/>
<u>Requires:</u> Adept Compel<br/>
<u>Additional Cost:</u> 2 mana, adds Invocation keyword<br/>
<u>Effect:</u> Damage type becomes Psychic. Creatures in the area must sprint away from the Sigil for 1 round and are inflicted with <abbr class="rest">Rest</abbr> <abbr class="breached">Breached</abbr>. They must make a Tinkering skill check with a TN equal to [3+|compelSkillRank| + |tinkeringSkillRank|]. For each number they fail the check by they sprint away from the Sigil for an additional round.
</li><br/>


<li><b>Euphoria</b><br/>
<u>Requires:</u> Adept Charm<br/> 
<u>Additional Cost:</u> 2 mana, adds Invocation keyword<br/>
<u>Effect:</u> Damage type becomes Psychic. Creatures in the area are inflicted with <abbr class="round">Round</abbr> <abbr class="stun">Stun</abbr> and <abbr class="rest">Rest</abbr> <abbr class="impaired">Impaired</abbr>. They must make a Tinkering check with a TN equal to [3+|tinkeringSkillRank| + |charmSkillRank|]. For each number they fail the check by they are stunned for an additional round or until they take damage</abbr>.</li>
<br/>



<li><b>Healing</b><br/>
<u>Requires:</u> Basic Survival<br/>
<u>Additional Cost</u>: 5 minutes<br/>
<u>Effect:</u> Instead of dealing damage the Sigil heals that amount to the creature that triggers it</li>
<br/>

<li><b>Restorative</b><br/>
<u>Requires:</u> Trained Survival<br/>
<u>Additional Cost</u>: 6 mana, 1 hour<br/>
<u>Effect:</u> Instead of dealing damage it restores a health category to the creature that triggers it</li>
<br/>


<li><b>Conflagrate</b><br/>
<u>Requires:</u> Blast Proficiency Fire or Conjure Element Ritual<br/>
<u>Additional Cost:</u> 1 mana per minute of effect + 1 per Wide enhancement<br/>
<u>Effect:</u> Fire ignites in affected spaces. It deals |tinkeringSkillRank| Pure damage to creatures and objects in that space or that move into it.
</li>
<br/>

<li><b>Rising Spire</b><br/>
<u>Requires:</u> Blast Proficiency Earth or Conjure Element Ritual<br/>
<u>Additional Cost:</u> 1 mana per minute of effect + 1 per wide enhancement<br/>
<u>Effect:</u> Stone rises to fill the area pushing creatures out of it, to a location of the creatures choice</li><br/>
</ul></div>
              <div class="abilityField ritualField abilityFieldLast"><b>Resistible:</b> For augments that require a skill check to resist the effect 1 mana can be spent to automatically succeed on this check. </div>
            </div>

                          <h2>Gameplay Notes </h2>
              <ul>
<li>Allies can help each other overcome social effects with leadership and counsel. Roll either of these skills contested by the TN, on success the ally gains Boosted on the skill check.</li>
<li>Base TN to detect with Awareness is [|tinkeringSkillRank|*2]. Increase this by 2 for Fae</li> 
<li>The more powerful the sigil the easier it is to detect, additionally the world around the sigil changes slightly due to its power and duration. TN to detect is -1 for a sigil that lasts over 12 hours, -2 for over a week, -3 for a season and -4 for 2 or more years. For longer sustained or accepted sigils dust might settle less on the sigil, tree roots might grow  tracing its pattern, etc.</li>
</ul>            
                    </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Sigil (Tinkering) -->
          
      <!-- Ward (Tinkering) -->
      <section class="section" id="wardSection">
        <header class="sectionHeader hideWrapper">
          <button id="showward" class="hidden showButton" onclick="show('ward');">Ritual: Ward (Tinkering)</button>
          <button id="hideward" class="hide" onclick="hide('ward');">[&#8213;]</button>  
        </header>

        <article id="ward" class="sectionBody">
          <h1>Ward (Tinkering)</h1>
          <div class="divider"></div>

          <div></div>

            <div class="abilityFieldset ritualFull">
              <div class="abilityLegend ritualLegend">Ward (Tinkering)</div>
              <div class="abilityKeywords abilityField ritualField"><b>Ritual, Conjuration, Sustainable (D)</b></div>
              <div class="abilityField ritualField"><b>Cost:</b> 1 mana</div>
              <div class="abilityField ritualField"><b>Cast time:</b> 20 minutes</div>
              <div class="abilityField ritualField"><b>Duration:</b> 24 hours</div>
              <div class="abilityField ritualField"><b>Effect:</b> You conjure a magical web of sorts in a 3 diameter area (~18 feet).  Whenever a non-gas enters the warded area the Ward warns you of the breach. It can be triggered 3 times before your connection to it fades and the effects of the ritual ends. Upon completing the ritual you can designate 6 criteria for things that will not trigger the Ward.
</div>
              <div class="abilityField ritualField"><b>Enhancements</b>
    <ul>
      <li> Strand (1 mana): Increase uses by 6</li>
      <li> Restrict (1 mana): Increase non-triggering criteria by 12</li>
      <li> Area (1 mana and 10 cast time): Increase diameter by 1</li>
    </ul></div>
              <div class="abilityField ritualField"><b>Augments</b>
<ul>

<li><b>Mask</b><br/>
<u>Requires:</u> Basic Deception<br/>
<u>Additional Cost:</u> 1 mana<br/>
<u>Effect:</u> Increases TN to detect by 3</li>
<br/>


<li><b>Stone Perimeter</b><br/>
<u>Requires:</u> Blast Proficiency Earth or Conjure Element Ritual<br/>
<u>Additional Cost:</u> 1 mana + 1 per Area enhancement
<u>Effect:</u> The outside  inch of the area, besides the bottom, becomes Sandstone with an Armor of 4 and HP of 12 per  8 inch area. The caster can choose not to apply this affect to any number of spaces</li><br/>

<li><b>Fog Flurry Perimeter</b><br/>
<u>Requires:</u> Blast Proficiency Air or Conjure Element Ritual<br/>
<u>Additional Cost:</u> The outside 3 inches of the area becomes a flurry blowing a thick fog around it at 60 mph. This blocks vision, small projectiles, sound and spaces touching the perimeter become difficult ground</li>
<br/>

<li><b>Darkness</b><br/>
<u>Requires:</u> Blast Proficiency Water or Conjure Element Ritual<br/>
<u>Additional Cost: </u> 1 mana + 1 per Area enhancement<br/>
<u>Effect:</u> The area is filled with magical Darkness. Only magical light of comparable strength can pierce the Darkness</li>
<br/>

<li><b>Light</b><br/>
<u>Requires:</u> Blast Proficiency Fire or Conjure Element Ritual<br/>
<u>Additional Cost</u>  1 mana + 1 per Area enhancement<br/>
<u>Effect:</u> The area is filled with magical light. It will not illuminate outside of the area but everything in the area can be seen. Only magical darkness of comparable strength can shade the light</li>
     
    </ul></div>
              <div class="abilityField ritualField abilityFieldLast"><b>Resistible:</b> Augments that allow a skill check can be by spending 1 mana. </div>
            </div>

                          <h2>Gameplay Notes </h2>
              <ul>
<li>The very small strings of magic that make up the Ward can be detected with Fae or Awareness. Base TN for a the Ward that has a non-obvious augment effect is [|tinkeringSkillRank|*2+4] to creatures near it. This TN is reduced in half once they have passed through it. </li>
</ul>            
                    </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Ward (Tinkering) -->
          
      <!-- Conjure Senses (Awareness) -->
      <section class="section" id="conjureSensesSection">
        <header class="sectionHeader hideWrapper">
          <button id="showconjureSenses" class="hidden showButton" onclick="show('conjureSenses');">Ritual: Conjure Senses (Awareness)</button>
          <button id="hideconjureSenses" class="hide" onclick="hide('conjureSenses');">[&#8213;]</button>  
        </header>

        <article id="conjureSenses" class="sectionBody">
          <h1>Conjure Senses (Awareness)</h1>
          <div class="divider"></div>

          <div></div>

            <div class="abilityFieldset ritualFull">
              <div class="abilityLegend ritualLegend">Conjure Senses (Awareness)</div>
              <div class="abilityKeywords abilityField ritualField"><b>Ritual, Conjuration, Divination, Sustainable</b></div>
              <div class="abilityField ritualField"><b>Cost:</b> 1 Mana</div>
              <div class="abilityField ritualField"><b>Cast time:</b> 20 minutes</div>
              <div class="abilityField ritualField"><b>Duration:</b> 1 hour</div>
              <div class="abilityField ritualField"><b>Effect:</b> While constructing the ritual the caster carefully imbues a conjured object with one of their senses (taste, touch, smell, sight, hearing and/or fae). The performer can spend up to 3 points while constructing the conjured ense. Each sense imbued to the object no longer works on the character's body  until the ritual's duration is over, even if the object is destroyed. The object imbued must be inanimate and between the size of a coin and 8 inch diameter sphere. On completion of the Ritual decide a quarter inch by quarter inch area on the object each sense is attached to that determines facing of the sense.
<br />
<br />

The Awareness skill rank of the Conjuration is 1: Untrained.
<br />
<br />



1 Point: Add Sight<br />
1 Point: Add Smell<br />
1 Point: Add Hearing<br />
1 Point: Add Taste<br />
1 Point: Add Touch<br />
1 Point: Increase TN to detect the Conjuration by 1<br />
1 Point: Increase Awareness skill Rank of conjured senses. This can not exceed casters skill Rank.<br/>
2 Points: Maintain one conjured sense on the character<br />
</div>
              <div class="abilityField ritualField"><b>Enhancements</b>
<ul>
      <li>Greater Sense (1 mana): Add 3 points to the ritual. </li>
    </ul></div>
              <div class="abilityField ritualField"><b>Augments</b>
<ul>
      <li>Creature Sense, Adept Handling (1 mana, 30 minutes) Imbue a living creature instead of a conjured object. The creature must be a focus of the ritual and stay in the cast area for the entire cast time.</li>
    </ul></div>
              <div class="abilityField ritualField abilityFieldLast"><b>Resistible:</b> N/A</div>
            </div>

                          <h2>Gameplay Notes </h2>
              <ul>
<li>The size of it is somewhere between a inch wide coin and human head. It can not move itself, it has no muscle or other means of locomotion.</li>
<li>The handling augment often puts senses in the same place the creature has them (as clothes, fur, etc will otherwise hinder a sense), although it is not required. This could be used to see from the back of an allies head to potentially warn them of danger.</li>
<li>Requires an Awareness check to detect. TN 13, reduced by 1 for each point spent in the ritual. The more powerful the magic the easier it is to detect with Fae sense.</li> 
</ul>            
                          <h2>Narrative Notes</h2>
              <ul>
<li>World Building: In theory this could be used to construct new senses, or expand them greater than they would be normally (infrared vision, hawk vision, dog sense of smell, etc). Conjuration is a magic of creation and if science advanced far enough to learn how different creatures had different sense a similar thing could be created. It would take some significant training of those Ritual performer to use them properly as their brain would be unused to getting that type of feedback.</li>
</ul>                    </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Conjure Senses (Awareness) -->
          
      <!-- Reason: Awaken -->
      <section class="section" id="awakenSection">
        <header class="sectionHeader hideWrapper">
          <button id="showawaken" class="hidden showButton" onclick="show('awaken');">Ritual: Reason: Awaken</button>
          <button id="hideawaken" class="hide" onclick="hide('awaken');">[&#8213;]</button>  
        </header>

        <article id="awaken" class="sectionBody">
          <h1>Reason: Awaken</h1>
          <div class="divider"></div>

          <div></div>

            <div class="abilityFieldset ritualFull">
              <div class="abilityLegend ritualLegend">Reason: Awaken</div>
              <div class="abilityKeywords abilityField ritualField">Mental, Conjuration, Sustainable (D)</div>
              <div class="abilityField ritualField">Mana cost: ?</div>
              <div class="abilityField ritualField">Cast time: ?</div>
              <div class="abilityField ritualField">Duration: ?</div>
              <div class="abilityField ritualField">Effect: This ritual allows for programming of objects to take specific actions. This is often related to simple basic movement and as such the object must be able to move. This a common use for this ritual would be to empower a Golem (that was conjured with the Conjure Elements ritual, or sculpted) to function. Objects have some basic understanding of how they look and are expected to behave, this is largely limited to movement. If a golem is told to �walk 30 feet forward every 10 seconds� it will now how to walk and you won�t have to program what �walk� means. This will be used to trigger other spells, make inanimate objects animate, speak or other things. </div>
              <div class="abilityField ritualField"><ul>
      <li>N/A</li>
    </ul></div>
              <div class="abilityField ritualField"><ul>
      <li>N/A</li>
    </ul></div>
              <div class="abilityField ritualField abilityFieldLast">Resistible: N/A</div>
            </div>

                          <h2>Gameplay Notes </h2>
              <ul>
<li>N/A</li>
</ul>            
                          <h2>Narrative Notes</h2>
              <ul>
<li>N/A</li>
</ul>                    </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Reason: Awaken -->
        <!-- End Pull Skills from Data Base -->


    <!-- Attribute Details -->   
    <section class="section" id="attributeDetailsSection">
      <header class="sectionHeader hideWrapper">
        <button id="showattributeDetails" class="hidden showButton" onclick="show('attributeDetails');">Character Creation: Attributes</button>
        <button id="hideattributeDetails" class="hide" onclick="hide('attributeDetails');">[&#8213;]</button>  
      </header>

      <article id="attributeDetails" class='sectionBody'>
        <h1>Attribute Details</h1>
        <div class="divider"></div>
        This section covers the specific rules regarding attributes and character creation. 

        <h2 id="attributePriority">Attribute Priortiy</h2>
        The first step is prioritizing your attributes. 
        <ul>
          <li>Select Body, Mind, or Spirit to be your primary
            <ul>
              <li>Primary attributes start with a value of 2, and has 3 attribute points to distribute to its sub-attributes</li>
              <li>Increase the value of your primary attribute to 3 at level two</li>
              <li>Increase the value of your primary attribute to 4 at level eight</li>
              <li>Gain an additional attribute point to distribute to a sub-attribute at levels 2, 5, 8 and 11</li>
            </ul>
          </li>
          <li>Select one of the remaining two to be your secondary
            <ul>
              <li>Secondary attributes start with a value of 2, and has 3 attribute points to distribute to its sub-attributes</li>
              <li>Increase the value of your secondary attribute to 3 at level six </li>
              <li>Increase the value of one of your primary's sub-attributes at levels 3, 6, and 9</li>
            </ul>
          </li>
          <li>The last one is your tertiary attribute
            <ul>
              <li>Tertiary attributes start with a value of 1, and has 1 attribute point to distribute to its sub-attributes</li>
              <li>Increase the value of your secondary attribute to 2 at level four</li>
              <li>Increase the value of your secondary attribute to 3 at level ten</li>
              <li>Increase the value of one of your primary's sub-attributes at levels 4, 7, and 10</li>
            </ul>
          </li>
        </ul>
        <p class="note">The maximum value of sub-attributes is equal to the attribute they belong to.</p>

        <h2 id="attributeList">Attributes</h2>
        <div class="attributeExampleWrapper" style="right:120px; position:relative; float:right;">
          <button id="showattributeExample" class="hide" onclick="show('attributeExample');">[ + ]</button>
          <button id="hideattributeExample" class="hide hidden" onclick="hide('attributeExample');">[&#8213;]</button>
          
        </div>
        <br/>

        <div id="attributeExample" class="hidden" style="float:right; text-align:center;">
          <b><u>Example, WIP, currently has old info</u></b><br/><br/>
          <!-- Level <input type="number" min="1" max="11" step="1" id="charLevel" value="1" onkeyup="setAttPoints(event);" onmouseup="setAttPoints(event);">
          <div class="attribtuePriority" style="margin-bottom:5px; margin-top:1px">
            <select id="primaryAtt" style="width: 77px;" onchange="attPriority('primary', event);">
              <option value="">1st</option>
              <option value="body">Body</option>
              <option value="mind">Mind</option>
              <option value="spirit">Spirit</option>
            </select>

            <select id="secondaryAtt" style="width: 77px;"onchange="attPriority('secondary', event);">
              <option value="">2nd</option>
              <option value="body">Body</option>
              <option value="mind">Mind</option>
              <option value="spirit">Spirit</option>
            </select>

            <select id="tertiaryAtt" style="width: 77px;"onchange="attPriority('tertiary', event);">
              <option value="">3rd</option>
              <option value="body">Body</option>
              <option value="mind">Mind</option>
              <option value="spirit">Spirit</option>
            </select>
          </div>

          <div class="coreAttributes">
            <table class="coreAttTable physicalAtt" style="width:135px !important;">
              <tr class="attValue">
                <td class="bodyColor"  width="60px">Body</td>
                <td class="filledField" id="bodyValue">0</td>
                <td rowspan=4 id="bodyRemaining" width="24px" style="text-align: center;">UA</td>
              </tr>
              <tr>
                <td class="mightSkill" style="text-align: center;">Might</td>
                <td><input class="inputField"  id="mightValue" type="number" min="0" max="0" step="1" value="0" onkeyup="setAttPoints(event);" onmouseup="setAttPoints(event);" onchange="setAttPoints(event);"/></td>
              </tr>
              <tr>
                <td class="agilitySkill" style="text-align: center;">Agility</td>
                <td><input class="inputField"  id="agilityValue" type="number" min="0" max="0" step="1" value="0" onkeyup="setAttPoints(event);" onmouseup="setAttPoints(event);" onchange="setAttPoints(event);"/></td>
              </tr>
              <tr>
                <td class="brawnSkill" style="text-align: center;">Brawn</td>
                <td><input class="inputField"  id="brawnValue" type="number" min="0" max="0" step="1" value="0" onkeyup="setAttPoints(event);" onmouseup="setAttPoints(event);" onchange="setAttPoints(event);"/></td>
              </tr>
            </table>

            <table class="coreAttTable mentalAtt" style="width:135px !important;">
              <tr class="attValue">
                <td class="mindColor" width="60px">Mind</td>
                <td class="filledField" id="mindValue">0</td>
                <td rowspan=4 id="mindRemaining" width="24px" style="text-align: center;">UA</td>
              </tr>
              <tr>
                <td class="willSkill" style="text-align: center;">Will</td>
                <td><input class="inputField" id="willValue" type="number" min="0" max="0" step="1" value="0" onkeyup="setAttPoints(event);" onmouseup="setAttPoints(event);" onchange="setAttPoints(event);"/></td>
              </tr>
              <tr>
                <td class="witSkill" style="text-align: center;">Wit</td>
                <td><input class="inputField" id="witValue" type="number" min="0" max="0" step="1" value="0" onkeyup="setAttPoints(event);" onmouseup="setAttPoints(event);" onchange="setAttPoints(event);"/></td>
              </tr>
              <tr>
                <td class="resolveSkill" style="text-align: center;">Resolve</td>
                <td><input class="inputField" id="resolveValue" type="number" min="0" max="0" step="1" value="0" onkeyup="setAttPoints(event);" onmouseup="setAttPoints(event);" onchange="setAttPoints(event);"/></td>
              </tr>
            </table>

            <table class="coreAttTable socialAtt">
              <tr class="attValue">
                <td class="spiritColor" width="60px">Spirit</td>
                <td class="filledField" id="spiritValue">0</td>
                <td rowspan=4 id="spiritRemaining" width="24px" style="text-align: center;">UA</td>
              </tr>
              <tr>
                <td class="vigorSkill" style="text-align: center;">Vigor</td>
                <td><input class="inputField"  id="vigorValue" type="number" min="0" max="0" step="1" value="0" onkeyup="setAttPoints(event);" onmouseup="setAttPoints(event);" onchange="setAttPoints(event);"/></td>
              </tr>
              <tr>
                <td class="empathySkill" style="text-align: center;">Empathy</td>
                <td><input class="inputField"  id="empathyValue" type="number" min="0" max="0" step="1" value="0" onkeyup="setAttPoints(event);" onmouseup="setAttPoints(event);" onchange="setAttPoints(event);"/></td>
              </tr>
              <tr>
                <td class="faithSkill" style="text-align: center;">Faith</td>
                <td><input class="inputField"  id="faithValue" type="number" min="0" max="0" step="1" value="0" onkeyup="setAttPoints(event);" onmouseup="setAttPoints(event);" onchange="setAttPoints(event);"/></td>
              </tr>
            </table>

          </div> <!-- End of coreAttributes -->

          <!-- 
          <div class="secondaryAttributes" style="height: 325px;">
            <table class="secTable">
              <tr>
                <td class="genAtt">Guard</td>
                <td class="filledField" id="guardValue">7</td>
              </tr>
              <tr>
                <td class="pSec">Unscathed</td>
                <td class="filledField" id="hpValue">30</td>
              </tr>
              <tr>
                <td class="mSec">Marred</td>
                <td class="filledField" id="marredValue">20</td>
              </tr>
              <tr>
                <td class="sSec">Desperate</td>
                <td class="filledField" id="desperateValue">10</td>
              </tr>
              <tr>
                <td class="sSec">Dead</td>
                <td class="filledField" id="deadValue">-10</td>
              </tr>
              <tr>
                <td class="genAtt">Recovery</td>
                <td class="filledField" id="recoveryValue">0</td>
              </tr>
              <tr>
                <td class="genAtt">Pace</td>
                <td class="filledField" id="paceValue">6</td>
              </tr>
              <tr>
                <td class="genAtt">Initiative</td>
                <td class="filledField" id="initValue">0</td>
              </tr>
              <tr>
                <td class="genAtt">Initial m</td>
                <td class="filledField" id="initialMomentumValue">3</td>
              </tr>
              <tr>
                <td class="genAtt">M &rarr; m</td>
                <td class="filledField" id="conversionValue">3</td>
              </tr>
              <tr>
                <td class="genAtt">Mana</td>
                <td><input style="width:20px; position:relative; text-align: center;" type="text" value="3"></td>
              </tr>
              <tr>
                <td class="genAtt">Armor</td>
                <td><input style="width:20px; position:relative; text-align: center;" type="text" value="0"></td>
              </tr>
            </table>
          </div> <!-- End of secondaryAttributes -->
        </div> <!-- End Attribute Example -->

        <b>Body</b>: Your general physical prowess. Modifier, and base damage for Strike Attack.
        <blockquote>
            <u>Might</u>: Relates to physical strength and control
            <ul>
              <li>Modifier for Athletics and Force</li>
              <li>Relates to Mana Conversion</li>
            </ul>
          <u>Agility</u>: Relates to physical speed and flexibility
            <ul>
              <li>Modifier for Acrobatics and Sneak</li>
              <li>Relates Initiative and Initial Momentum</li>
            </ul>
          <u>Brawn</u>: Relates to physical resilience and stability
            <ul>
              <li>Modifier for Endurance and Poise</li>
              <li>Relates to Recovery</li>
            </ul>
        </blockquote>
        <b>Mind</b>: Your general mental prowess. Modifier and base damage for Blast Attack.
        <blockquote>
          <u>Will</u>: Relates to mental strength and focus
            <ul>
              <li>Modifier for Lore and Survival</li>
              <li>Relates Mana Conversion</li>
            </ul>
          <u>Wit</u>: Relates to mental speed and flexibility
            <ul>
              <li>Modifier for Deception and Insight</li>
              <li>Relates to Initiative and Initial Momentum</li>
            </ul>
          <u>Resolve</u>: Relates to mental resilience and stability
            <ul>
              <li>Modifier for Awareness and Tinkering</li>
              <li>Relates to Recovery</li>
            </ul>
        </blockquote>
        <b>Spirit</b>: Your general social prowess. Modifier for Invoke Attack.
        <blockquote>
          <u>Vigor</u>: Relates to  emotional strength and influence
            <ul>
              <li>Modifier for Compel and Rouse</li>
              <li>Relates to Mana Conversion</li>
            </ul>
          <u>Empathy</u>: Relates to emotional understanding
            <ul>
              <li>Modifier for Charm and Handling</li>
              <li>Relates to Initiative and Initial Momentum</li>
            </ul>
          <u>Faith</u>: Relates to emotional resilience
            <ul>
              <li>Modifier for Diplomacy and Leadership</li>
              <li>Relates to Recovery</li>
            </ul>
        </blockquote>
        <b>Hit Points</b> are divided into categories.
        <ul>
          <li>Max HP: 30+6 per level</li>
          <li>Unscathed: Top health category, range from Max HP to Marred</li> 
          <li>Marred: Second health category, range from 20+4 per level to Desperate</li>
          <li>Desperate: Third health category, range from 10+2 per level to 1</li>
          <li>Dying: Final health category, its range is 0 to -10-2 per level.</li>  
        </ul>
        <b>Recovery</b>: Represents how well quickly your character can overcome injuries, conditions, and damage. Equal to 1 + (Brawn + Resolve + Faith)/3. See <a href="#RecoverySection" class="internalLink">Rest and Recovery</a> section. <br/><br/>
        <b>Armor</b>: Reduce all non-Pure damage by this value. This is primarily gained through equipped armor  <br/><br/>
        <b>Guard</b>: Target Number needed to hit you, equal to 7 plus the greatest of Body, Mind, or Spirit          <br/><br/>
        <b>Pace</b>: The base movement value of the character. <br/><br/>     
        <b>Initiative</b>: Equal to Agility + Wit + Empathy. Physical speed, speed of thought, and the ability to anticipate the actions of others all make up how quickly someone act in the face of danger.<br/><br/>
        <b>Initial Momentum</b>: Equal to 3 + (Agility + Wit + Empathy)/3<br/><br/>
        <b>Conversion</b>: Equal to 3 + (Might + Will + Vigor)/3          
      </article>
      <header class="sectionFooter">
      </header>
    </section>
    <!--End Attribute Details -->


    
    <!-- Ways -->
    <section class="section" id="waysSection">
      <header class="sectionHeader hideWrapper">
        <button id="showways" class="hidden showButton" onclick="show('ways');">Show Ways</button>
        <button id="hideways" class="hide" onclick="hide('ways');">[&#8213;]</button>  
      </header>

      <article id="ways" class="sectionBody">
        <h1>Character Creation: Ways</h1>
        <div class="divider"></div>
        <h2>Your Way</h2>
        <span class="indent40"> </span>A character's Way refers to experiences or training the character encountered, often in their early adolescence, that taught them how to fight, explore, survive, and overcome obstacles. <br/>

        <span class="indent40"> </span>Within a setting Ways are often tightely related to culture, institutions, or even personal experience. Mechanically they relate to a establishing a playstyle in combat. Narratively they are are often tied to a character's beliefs and traditions. <br/>

        <span class="indent40"> </span>Upon choosing a Way you character gets training in attack Skills and two abilities - a Talent and a Trick.<br/>
        <span class="indent40"> </span>Below are some common Ways to choose from or use as reference for working with a GM to design our own. 

        <h2>Way List</h2>
        <h3>Striking Ways</h3>
        <ul>
          <li><a href="#AdjunctSection" class="internalLink">Adjunct</a>: Cooperative skirmisher that creates openings in enemy defenses for their allies </li>
          <li><a href="#BattleragerSection" class="internalLink">Battlerager</a>: Risk taking warriors that often dive into mobs of enemies alone</li>
          <li><a href="#BerserkerSection" class="internalLink">Berserker</a>: Sacrifices defense for offense</li>
          <li><a href="#BladeDancerSection" class="internalLink">Blade Dancer</a>: Use mobility to find openings in enemy defenses or defend themselves </li>
          <li><a href="#BravoSection" class="internalLink">Bravo</a>: Striker that also uses their wit words to control the battle field and attack the pride of their enemies.</li>
          <li><a href="#IaidokaSection" class="internalLink">Iaidoka</a>: Train in knowing when to strike and doing so with speed</li>
          <li><a href="#SentinelSection" class="internalLink">Sentinel</a>: Enhances Protection they give and durable against many opponents.</li>
          <li><a href="#ShadowDancerSection" class="internalLink">Shadow Strider</a>: Dagger specialists that conjure shadows to protect them and conceal their movements.</li>
          <li><a href="#UnfetteredSection" class="internalLink">Unfettered<</a>: Unarmed specialist that hits pain points and utilizes Qi for blinding speed.</li>

        </ul>
        <h3>Blasting Ways</h3>
        <ul>
          <li> <a href="#BladeweaverSection" class="internalLink">Bladeweaver</a>: Empower their strikes with elements creating a rythme between striking and blasting </li>
          <li><a href="#BulwarkSection" class="internalLink">Bulwark</a>: Specializes in Earth, conjures a small stone obstacles for protection</li>
          <li><a href="#ChanelerSection" class="internalLink">Channeler</a>: Empowers areas that they can draw energy from in the near future.</li>
          <li><a href="#FireflySection" class="internalLink">Firefly</a>: Specializes in Fire, those who play with fire often get burned.</li>
          <li><a href="#StormCallerSection" class="internalLink">Mage Cadre</a>: Empowers and is empowered by allies, best in a small unit mages</li>
          <li><a href="#StormCallerSection" class="internalLink">Sculptor</a>: Specializes in Water, draws power from their own essence.</li>
          <li><a href="#StormCallerSection" class="internalLink">Stormcaller</a>: Specializes in Air, conjures a small whirlwind that threatens areas on the battilefield.</li>

        </ul>
        <h3>Invoking Ways</h3>
        <ul>
          <li><a href="#BreakerSection" class="internalLink">Breaker</a>: Utilizes fear to catch enemies of balance and weaken their defenses.</li>
          <li><a href="#OverseerrSection" class="internalLink">Overseer</a>: Avoids threatening situations and guides the position of allies.</li>
          <li><a href="#WardenSection" class="internalLink">Warden</a>: Extends and enhances the Cover they give.</li>
        </ul>
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Ways -->

    <!-- Pull Roles from Database -->
    
      <!-- Way of the "Adjunct"-->
      <section class="section" id="AdjunctSection">
        <header class="sectionHeader hideWrapper">
          <button id="showAdjunct" class="hidden showButton" onclick="show('Adjunct');">Show Way of the Adjunct</button>
          <button id="hideAdjunct" class="hide" onclick="hide('Adjunct');">[&#8213;]</button>  
        </header>

        <article id="Adjunct" class="sectionBody">
          <h1>Way of the Adjunct</h1>
          <div class="divider"></div>

          <div><span class="indent40"> </span>On the battlefield, a strong arm and skillful use of a weapon can save your life and batter your foes, but a sharp mind is capable of leading your allies to do so as well. Adjuncts are fighters that have trained with this as a guiding principle and when applied correctly, leads to fluid, cooperative assaults that break through even the most stalwart of defenses.

<br/><span class="indent40"> </span>

Adjuncts is most often found on the front lines, moving into opportune positions to assail foes while breaking enemies defenses. 

<h3>Examples of Training</h3>
Soliders, Gladiators, Atheletes, Bandits, Caravan Guards. 
<h3>Traea specifics</h3>
Druids, Savannah Tribes and Ring Tribes commonly train Adjuncts. They generally pair them with a Blade Dancers to optimize Flanking tactics in hunts and skirmishes. 
<h3>Suggested skills</h3>
Acrobatics, Insight, Leadership
<br/><br/>
<div class="divider"></div>
<h1>Attack: Strike</h1>
</div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">Expose</div>
              <div class="namField abilityField abilityKeywords"><b>Potence:</b> In coordination with your allies you can more easily break through enemy defenses. </div>
              <div class="namField abilityField abilityFieldLast"><b>Passive:</b>Flanked enemies adjacent to you are <abbr class="vulnerable">Vulnerable</abbr></div>
              <div class="namField abilityField"><b>Focus</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Effect:</b> Target adjacent enemy gains <abbr class="short">Short</abbr> <abbr class="breached">Breached</abbr>. Your attacks can not utilize this debuff. </div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Expose</legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Potence:</b> You've trained long and hard to bat aside enemy defenses to assist your allies</div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Adjunct -->
    
      <!-- Way of the "Berserk"-->
      <section class="section" id="BerserkSection">
        <header class="sectionHeader hideWrapper">
          <button id="showBerserk" class="hidden showButton" onclick="show('Berserk');">Show Way of the Berserk</button>
          <button id="hideBerserk" class="hide" onclick="hide('Berserk');">[&#8213;]</button>  
        </header>

        <article id="Berserk" class="sectionBody">
          <h1>Way of the Berserk</h1>
          <div class="divider"></div>

          <div>While other paths are honed through rigorous training, the Way of the Berserker is more often harnessed through primal instincts echoing within.

<br/><br/>
A Berserker scoffs at caution and focuses on frontline aggression. As blunt and direct as their fighting style may be, it often succeeds in putting more tactical foes off-balance or just dispatching them with sudden fury. These enraged warriors are at their strongest when surrounded by foes. 

<h3>Example training</h3>
Solo Gladiators, Raiders, Barbarians, City Guards. Individuals with little regard for organized combat. 


<h3>Traea specifics</h3>
They are common Free people in the Taiga, South Desert peoples, Forest Anarchists.  Although they can be found all over the world, many places have individuals who have little trust of others, no formal or organized combat training or have many people relying on them that don't have combat experience and need to go it alone. 


<h3>Suggested skills</h3>
Athletics, Lifting, Endurance, Survival, Intimidate.
<br/><br/>
<div class="divider"></div>
<h1>Attack: Strike</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">Reckless Rage</div>
              <div class="namField abilityField abilityKeywords"><b>Trance:</b> The more dire the situation the wider the Berserks grin</div>
              <div class="namField abilityField abilityFieldLast"><b>Passive:</b> With large weapons increase your Critical Range by 1 for each enemy that threatens you. While Enraged you can not be protected and do not protect and you gain one Rage for each Critical Mark you get with Strikes. While wearing no armor when you take damage reduce that damage by your Rage and reduce your Rage by 1.</div>
              <div class="namField abilityField"><b>Focus</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Effect:</b> Gain 3 Rage and <abbr class="combat">Combat</abbr> Enraged and <abbr class="dazed">Dazed</abbr></div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Reckless</legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Trance:</b> You unleash the powerful anger you've cultivated inside you. </div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Berserk -->
    
      <!-- Way of the "Blade Dancer"-->
      <section class="section" id="BladeDancerSection">
        <header class="sectionHeader hideWrapper">
          <button id="showBladeDancer" class="hidden showButton" onclick="show('BladeDancer');">Show Way of the Blade Dancer</button>
          <button id="hideBladeDancer" class="hide" onclick="hide('BladeDancer');">[&#8213;]</button>  
        </header>

        <article id="BladeDancer" class="sectionBody">
          <h1>Way of the Blade Dancer</h1>
          <div class="divider"></div>

          <div>Stories tell of the original Blade Dancers twirling through ranks of enemies with grace and deadly purpose, felling scores without so much as a scratch upon themselves. While more modern Blade Dancing holds onto the moniker, there is little requirement to make use of the bladed weapons those of eld made use of; Bludgeoning and Piercing attacks are easily adapted to their style of fighting. 
<br/><br/>

The mobility of these tactics is truly what defines it, allowing practitioners to expertly slide into favorable positions. A Blade Dancer is most effective when attacking in tandem with other aggressive allies as to split the defenses of their target.

<h3>Example training</h3>
Soliders, Gladiators, Atheletes, Bandits, Caravan Guards. Similar to Adjuncts individuals who have cooperative combat training. 

<h3>Traea specifics</h3>
Blade Dancers are common in most places in the world. Populations aren't large enough in most areas to raise armies so combat happens on smaller scales where tactical training often results in gaining minute positional advantages. 

<h3>Suggested skills</h3>
Athletics, Acrobatics, Dancing, Deception, Leadership.
<br/><br/>
<div class="divider"></div>
<h1>Attack: Strike</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">Blade</div>
              <div class="namField abilityField abilityKeywords"><b>Potence:</b> You've trained to exploit any weakness in your opponents defenses. </div>
              <div class="namField abilityField abilityFieldLast"><b>Passive:</b>+1 Mark with Strikes if your target is <abbr class="breached">Breached</abbr>, including if they gain it from being Flanked. </div>
              <div class="namField abilityField"><b>Focus</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Effect:</b> Either Slide 1 or gain <abbr class="round">Round</abbr> +1 Guard</div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Blade Dance</legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Physical:</b> You deftly maneuver around the battlefield looking for openings in your enemies defenses or strengthening your own. </div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Blade Dancer -->
    
      <!-- Way of the "Sentinel"-->
      <section class="section" id="SentinelSection">
        <header class="sectionHeader hideWrapper">
          <button id="showSentinel" class="hidden showButton" onclick="show('Sentinel');">Show Way of the Sentinel</button>
          <button id="hideSentinel" class="hide" onclick="hide('Sentinel');">[&#8213;]</button>  
        </header>

        <article id="Sentinel" class="sectionBody">
          <h1>Way of the Sentinel</h1>
          <div class="divider"></div>

          <div><span class="indent40"> </span>Sentinels hold the line. They are the staunch pillars of the battlefield that give structure to what would otherwise be chaos. 

<br/><span class="indent40"> </span>

The Way of the Sentinel instructs those trained in it to maintain composure, shed blows and stymie the combined efforts of unified foes. They are the hardened vanguards trained to ensure survival in blood battles. 
<br/><br/>
<h3>Example training</h3>
Bodyguards, Formation Soldiers, Elite Guards.

<h3>Traea specifics</h3>
Desert Tribe, 9 Holds, 

<h3>Suggested skills</h3>
Endurance, Poise, Survival, Compel
<br/><br/>
<div class="divider"></div>
<h1>Attack: Strike</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">Stern</div>
              <div class="namField abilityField abilityKeywords"><b>Potence:</b> Some one has to take a beating, and you've learned to be better at that than most. </div>
              <div class="namField abilityField abilityFieldLast"><b>Passive:</b> Gain +1 Armor. Gain an additional +1 Armor each time you are damaged, remove this bonus at the beginning of each of your turns.</div>
              <div class="namField abilityField">Focus</div>
              <div class="namField abilityField abilityFieldLast">Effect: Target an adjacent ally, until your next turn and as long as you are adjacent to them they gain +1 Armor and <abbr class="vigilant">Covered</abbr></div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Secure</legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Potence:</b> You've learned to better defend nearby allies as well as yourself. </div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Sentinel -->
    
      <!-- Way of the "Shadow Strider"-->
      <section class="section" id="ShadowDancerSection">
        <header class="sectionHeader hideWrapper">
          <button id="showShadowDancer" class="hidden showButton" onclick="show('ShadowDancer');">Show Way of the Shadow Strider</button>
          <button id="hideShadowDancer" class="hide" onclick="hide('ShadowDancer');">[&#8213;]</button>  
        </header>

        <article id="ShadowDancer" class="sectionBody">
          <h1>Way of the Shadow Strider</h1>
          <div class="divider"></div>

          <div>Elusive and unpredictable, Shadow Striders undo their opponents with grim efficiency. Those trained in this way excel at shedding the perception of their opponents and execute that advantage with precise, unexpected strikes.

<br/><br/>
Patience is critical as the Shadow Dancer gracefully glides through the Awareness of their opponents, waiting for optimal opportunities to strike. These stealthy attackers are most effective when allies are able to draw attention away from them.

<h3>Example training</h3)
Assassin, Bandit, Raider, Thief, Espionage specialists, Smuggler. 

<h3>Traea specifics</h3>
Shadow Dancers are fairly common within the Druid cells on Traea and they are found throughout all of them. 

<h3>Suggested skills</h3>
Sneak, Acrobatics, Deception, Awareness


<h2>Description of Shadow Step effect</h2>
Until the end of their turn, the character becomes wreathed in shadowy tendrils that reach for the darkness they created. These tendrils make it difficult to see just where the character is allowing them to safely move toward the darkness they created. 

<br/><br/>
<div class="divider"></div> 
<h1>Attack: Strike</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">Shadows Grace</div>
              <div class="namField abilityField abilityKeywords"><b>Conjuration/Potence:</b> You move as one with the shadows, gracefully striding between them to obfuscate your exact location</div>
              <div class="namField abilityField abilityFieldLast"><b>Passive:</b> While in dim light or darkness you are <abbr class="vigilant">Protected</abbr> and a +1 shield bonus to Guard. While dual wielding daggers increase their Critical Range by 1.</div>
              <div class="namField abilityField"><b>Focus</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Effect:</b> <abbr class="round">Round</abbr> fill one space within 2 with shadows. The space counts a dim light and blocks line of sight through the space but not into or out of it. As a move action you can have the shadows pull you to their space, doing so dispels them. </div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Shadow Step</legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Conjuration/Potence:</b> You briefly conjure dark shadows that reach to you with inky tendrils. You can choose to let them grasp and pull you</div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Shadow Strider -->
    
      <!-- Way of the "Bulwark"-->
      <section class="section" id="BulwarkSection">
        <header class="sectionHeader hideWrapper">
          <button id="showBulwark" class="hidden showButton" onclick="show('Bulwark');">Show Way of the Bulwark</button>
          <button id="hideBulwark" class="hide" onclick="hide('Bulwark');">[&#8213;]</button>  
        </header>

        <article id="Bulwark" class="sectionBody">
          <h1>Way of the Bulwark</h1>
          <div class="divider"></div>

          <div>Conjurers who follow the Way of the Bulwark have developed a sensitivity and understanding of the structure and form of the elements. Naturally, this gives them a specific attunement towards the element of Earth, and in society, they are often responsible for conjured advancements in transportation, construction, and fortifications.
<br/><br/>
In confrontations, a Bulwark provides opportunities for defense and can create obstacles in combat. Like other conjurers, they prefer maintaining distance from aggressive front liners and are most effective when other allies draw fire which they can help defend against.


<h3>Example training</h3>
Builders, Artist, Soldiers. Those that find the way of the Bulwark often have a history of long hard labor. 
<h3>Traea specifics</h3>
Especially common with Ring Tribes. 

<h3>Suggested skills</h3>
Endurance, Diplomacy, Lore, Survival
<br/><br/>
<div class="divider"></div>
<h1>Attack: Blast, must learn Earth</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">One with the Earth</div>
              <div class="namField abilityField abilityKeywords"><b>Conjuration:</b> With each blast you earthen fae sticks to you giving extra protection from attacks. </div>
              <div class="namField abilityField abilityFieldLast"><b>Passive:</b> After you Blast gain <abbr class="combat">Combat</abbr> Reinforce 1</div>
              <div class="namField abilityField"><b>Focus</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Effect:</b> Target an unoccupied space within 6. <abbr class="Round">Round</abbr> Conjure an Earth Ring in that space. Earth Rings provide <abbr class="vigilant">Protected</abbr> and +1 Armor to creatures it Protects. Moving into or out of a space with an Earth Ring costs 1 additional pace. You can not <abbr class="vigilant">Protect</abbr> or become <abbr class="vigilant">Protected</abbr> while you have an Earth Ring conjured. </div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Earth Ring</legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Conjuration:</b> For a brief time you can manifest the earth allowing those around it to use it for protection, but doing so requires constant motion to maintain it. </div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Bulwark -->
    
      <!-- Way of the "Channeler"-->
      <section class="section" id="ChannelerSection">
        <header class="sectionHeader hideWrapper">
          <button id="showChanneler" class="hidden showButton" onclick="show('Channeler');">Show Way of the Channeler</button>
          <button id="hideChanneler" class="hide" onclick="hide('Channeler');">[&#8213;]</button>  
        </header>

        <article id="Channeler" class="sectionBody">
          <h1>Way of the Channeler</h1>
          <div class="divider"></div>

          <div>Channelers are raw expressions of the energy that infuses everything. Gifted with the ability to channel magical power, they are capable of sudden, explosive bursts of conjuration. A Channeler is the most aggressive of conjurers, but due to the fickle nature of their techniques, they require exceptional foresight to take full advantage of it. 
<br/><br/>

Conjurers that can make use of this Way are often innately gifted with it, or spend long hours in study. They are most effective when blasting from a distance and with canny allies that can coordinate around their loci of channeled power.


<h3>Example training</h3>
Aristocracy, Elders, Academics, War Mages
<h3>Traea specifics</h3>
Ruling class in some of the Holds. The outer Ring tribes. Iren. Other places where conjuring is common and studied. 

<h3>Suggested skills</h3>
Lore, Poise, Tinkering. 
<br/><br/>
<div class="divider"></div>
<h1>Attack: Blast</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">Channel Power</div>
              <div class="namField abilityField abilityKeywords"><b>Conjuration:</b> You've learned to channel the power you've prepared making your Blasts significantly easier to execute. </div>
              <div class="namField abilityField abilityFieldLast"><b>Passive:</b> +3 to hit with Blasts when targeting a space you've Powered </div>
              <div class="namField abilityField"><b>Focus</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Effect:</b> Target a space within line of sight. At the end of your turn apply <abbr class="short">Short</abbr> Powered to that space.</div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Draw Power</legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Conjuration:</b> Drawing power from the Fae in a space with a bit of focus you can prepare a Blast with great potential. </div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Channeler -->
    
      <!-- Way of the "Stormcaller"-->
      <section class="section" id="StormcallerSection">
        <header class="sectionHeader hideWrapper">
          <button id="showStormcaller" class="hidden showButton" onclick="show('Stormcaller');">Show Way of the Stormcaller</button>
          <button id="hideStormcaller" class="hide" onclick="hide('Stormcaller');">[&#8213;]</button>  
        </header>

        <article id="Stormcaller" class="sectionBody">
          <h1>Way of the Stormcaller</h1>
          <div class="divider"></div>

          <div>Storm Calling is an aged tradition of Conjuring passed down through the generations. Mastery over weather initially developed as a means of survival in lands afflicted with harsh conditions but has evolved with man's ingenuity. Guiding hunting parties, calming turbulent seas on ship voyages, spurring tempests in the sieges of war; Storm Callers have found use in all of these roles.
<br/><br/>
More so than other Conjurers, training in this Way is a result of rigorous study making it attractive to learned, scholarly conjurers. In battle, Storm Callers make best use of their techniques from a distance where they can harass and control groups of enemies without any threat of retaliation.


<h3>Example training</h3>
Navigators, Sea Farers, Scholars, Wanderers.

<h3>Traea specifics</h3>
Iren, Ring Tribes, Destert Tribes. 
<h3>Suggested skills</h3>
Lifting, Intimidate

<br/><br/>
<div class="divider"></div>
<h1>Attack: Blast, must learn Air</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">One with the Wind</div>
              <div class="namField abilityField abilityKeywords"><b>Conjuration:</b> The fae speaks to you and the storm inside you listens to its guidance</div>
              <div class="namField abilityField abilityFieldLast"><b>Passive:</b> After you Blast you can Slide 1</div>
              <div class="namField abilityField"><b>Focus</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Effect:</b> Target an unoccupied space within 8, conjure a Whirlwind  in that space that lasts for a <abbr class="round">Round</abbr>. This whirlwind threatens its own and all adjacent spaces, its space  is difficult ground but doesn't count as occupied. A creature that moves into a space takes |mind| pure damage. You can not threaten or punish while you have a conjured whirlwind. 
</div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Whirlwind</legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Conjuration:</b> For a brief time you can summon the force of the storm lashing out all those around it and suffocating those inside it. </div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Stormcaller -->
    
      <!-- Way of the "Breaker"-->
      <section class="section" id="BreakerSection">
        <header class="sectionHeader hideWrapper">
          <button id="showBreaker" class="hidden showButton" onclick="show('Breaker');">Show Way of the Breaker</button>
          <button id="hideBreaker" class="hide" onclick="hide('Breaker');">[&#8213;]</button>  
        </header>

        <article id="Breaker" class="sectionBody">
          <h1>Way of the Breaker</h1>
          <div class="divider"></div>

          <div>The Way of the Breaker epitomizes the oppressive and terrifying forces of Invocation. Breakers are imposing opponents that utilize fear to overcome enemy defenses.
<br/><br/>

As their name suggests, they are specialists at breaking through enemy ranks forcing them to scatter and disorganize. Their presence inspires caution and distress within their foes, but this is a double edged sword for it makes them likely targets of focused attacks. Tactically, their techniques are best used at mid range just behind the front lines, creating vulnerabilities in enemy defenses.


<h3>Example training</h3>
The nature of the Breaker lends them to be found in nearly all backgrounds. Although they are particularly common amoung Thugs, City Guards or used tactically in more organized militaries. 

<h3>Traea specifics</h3>
They are common in most places in the world and almost non-existent in the Ring Tribes and the 7th Ring.  

<h3>Suggested skills</h3>
Endurance, Compel,
<br/><br/>
<div class="divider"></div>
<h1>Attack: Invoke</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">Break</div>
              <div class="namField abilityField abilityKeywords"><b>Incantation:</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Passive:</b> You can use Marks to apply damage to hit enemies instead of gain Momentum.</div>
              <div class="namField abilityField"><b>Focus</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Effect:</b> Target an enemy within 3. If Protected, push target 1, this push is unaffected by Brace. If not Protected, target gains <abbr class="round">Round</abbr> <abbr class="vulnerable">Vulnerable</abbr>. </div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Break</legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Incantation:</b> The fervor of your voice and glare can drive even the most fearsome creatures back or break their defenses. </div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Breaker -->
    
      <!-- Way of the "Overseer"-->
      <section class="section" id="OverseerSection">
        <header class="sectionHeader hideWrapper">
          <button id="showOverseer" class="hidden showButton" onclick="show('Overseer');">Show Way of the Overseer</button>
          <button id="hideOverseer" class="hide" onclick="hide('Overseer');">[&#8213;]</button>  
        </header>

        <article id="Overseer" class="sectionBody">
          <h1>Way of the Overseer</h1>
          <div class="divider"></div>

          <div>DEV NOTE: like many of the striking roles Overseers are likely to have a background in some skirmish fighting. They focus on tactical positioning, teamwork and assisting allies while staying out of danger. This could have a more broad background relating to encouraging people. Cheerleaders?

<br/><br/>
<div class="divider"></div>
<h1>Attack: Invoke</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">Oversight</div>
              <div class="namField abilityField abilityKeywords"><b>Incantation:</b> Trust is important on the battlefield and allies will quickly learn to keep you safe and heed your word of dangers and opportunities. </div>
              <div class="namField abilityField abilityFieldLast"><b>Passive:</b> While you are not Threatened allies within three have +1 Critical Range. When you gain Momentum from Critical Marks with Invoke you can choose to slide an ally 1 for each Mark instead of gaining momentum.</div>
              <div class="namField abilityField"><b>Focus</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Effect:</b> Target an ally within 3 spaces, Slide them 1</div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Guide</legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Social:</b> Your effective management of can create openings in enemy defenses and help your allies to fortify their own. </div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Overseer -->
    
      <!-- Way of the "Herald"-->
      <section class="section" id="WardenSection">
        <header class="sectionHeader hideWrapper">
          <button id="showWarden" class="hidden showButton" onclick="show('Warden');">Show Way of the Herald</button>
          <button id="hideWarden" class="hide" onclick="hide('Warden');">[&#8213;]</button>  
        </header>

        <article id="Warden" class="sectionBody">
          <h1>Way of the Herald</h1>
          <div class="divider"></div>

          <div>Safety is often as much a feeling as a reality. Through influence and presence some individuals can help those around them feel secure allowing them to venture forward into controlled situations they may otherwise be scared of.
<br/><br/>
This presense is the specialty of the Warden. The can extend this presence to Cover allies even when they are not adjacent allowing them greater protection over the battlefield spreading their influence wider than most others. 

<h3>Examples of Training</h3>

<h3>Traea Specifics</h3>

<h3>Suggested Skills</h3>

<br/><br/>
<div class="divider"></div>
<h1>Attack: Invoke</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">Tidings</div>
              <div class="namField abilityField abilityKeywords"><b>Talent</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Passive:</b> When you gain Momentum from Critical Marks with Invoke you can give that Momentum to an ally within 3 instead</div>
              <div class="namField abilityField"><b>Focus</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Effect:</b> Heal 1 for each enemy that threatens you</div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend"><b>Extend Presence:</b></legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Invocation:</b></div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Herald -->
    
      <!-- Way of the "Bladeweaver"-->
      <section class="section" id="BladeweaverSection">
        <header class="sectionHeader hideWrapper">
          <button id="showBladeweaver" class="hidden showButton" onclick="show('Bladeweaver');">Show Way of the Bladeweaver</button>
          <button id="hideBladeweaver" class="hide" onclick="hide('Bladeweaver');">[&#8213;]</button>  
        </header>

        <article id="Bladeweaver" class="sectionBody">
          <h1>Way of the Bladeweaver</h1>
          <div class="divider"></div>

          <div><h3>Example training</h3>

<h3>Traea specifics</h3>

<h3>Suggested skills</h3>
Lifting, Endurance, Compel
<br/><br/>
<div class="divider"></div>
<h1>Attack: Strike & Blast</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">Empowering Strikes</div>
              <div class="namField abilityField abilityKeywords"><b>Potence, Conjuration:</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Passive:</b> Ignore light armor penalties, while you had one hand free. 
<br/><br/>
When you hit with a melee Strike, gain 1 Power and instead of Critical Marks adding damage you can choose to store Power with any number of them instead</div>
              <div class="namField abilityField"><b>Focus:</b> 0/1 Power</div>
              <div class="namField abilityField abilityFieldLast"><b>Effect:</b>  If used before a Strike, spend 1 Power, use your Mind instead of Body for your Strike attribute and if you trigger a Critical Effect you can instead use a Elemental effect that you know.

<br/><br/>

If used after a Blast, <abbr class="short">Short</abbr> for every 2 TN increased on the Blast gain +1 Critical Range on Strikes</div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Blade Weaving</legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Potence, Conjuration:</b></div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Bladeweaver -->
    
      <!-- Way of the "Battlerager"-->
      <section class="section" id="BattleragerSection">
        <header class="sectionHeader hideWrapper">
          <button id="showBattlerager" class="hidden showButton" onclick="show('Battlerager');">Show Way of the Battlerager</button>
          <button id="hideBattlerager" class="hide" onclick="hide('Battlerager');">[&#8213;]</button>  
        </header>

        <article id="Battlerager" class="sectionBody">
          <h1>Way of the Battlerager</h1>
          <div class="divider"></div>

          <div><h3>Example training</h3>

<h3>Traea specifics</h3>

<h3>Suggested skills</h3>
Lifting, Endurance, Compel
<br/><br/>
<div class="divider"></div>
<h1>Attack Skill: Strike</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">Spikey/Hardened</div>
              <div class="namField abilityField abilityKeywords"><b>Potence, Stance:</b> Some people just like to run into the mob, amazingly some make it out alive. </div>
              <div class="namField abilityField abilityFieldLast"><b>Spikey:</b> Being adjacent to an ally a Battlerager neither gives or receives Protected. +1 CR for each enemy that threatens you. You deal Punish damage -1 to enemies that attack you. 

<br/><br/>
<b>Hardened:</b>
Gain <abbr class="vigilant">Protected</abbr> and reduce all forced movement by 2</div>
              <div class="namField abilityField"><b>Focus</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Effect:</b> If you have the Spikey Talent, on your next attack deal Punish damage to all creatures adjacent to you, Gain the Hardened Talent lose the Spikey Talent. If you have the Hardened Talent, Gain <abbr class="round">Round</abbr> <abbr class="boosted">Boosted</abbr> and <abbr class="breached">Breached</abbr>. Gain the Spikey Talent lose the Hardened Talent. </div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Battle Stance</legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Potence, Stance:</b></div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Battlerager -->
    
      <!-- Way of the "Bravo"-->
      <section class="section" id="RebukerSection">
        <header class="sectionHeader hideWrapper">
          <button id="showRebuker" class="hidden showButton" onclick="show('Rebuker');">Show Way of the Bravo</button>
          <button id="hideRebuker" class="hide" onclick="hide('Rebuker');">[&#8213;]</button>  
        </header>

        <article id="Rebuker" class="sectionBody">
          <h1>Way of the Bravo</h1>
          <div class="divider"></div>

          <div><h3>Example training</h3>

<h3>Traea specifics</h3>

<h3>Suggested skills</h3>
Athletics, Lifting, Compel
<br/><br/>
<div class="divider"></div>
<h1>Attack Skill: Strike and Invoke</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">Flaunt</div>
              <div class="namField abilityField abilityKeywords"><b>Potence:</b> Really now, what is more important than style?</div>
              <div class="namField abilityField abilityFieldLast"><b>Passive:</b> While you have one hand free and you are not wearing heavy armor you have a +1 Guard. Gain <abbr class="short">Short</abbr> +2 Critical Range with Strikes against enemies you hit with an Invoke.</div>
              <div class="namField abilityField"><b>Focus</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Effect:</b> Make an <abbr class="impaired">Impaired</abbr> 2 Invoke attack that can only target enemies. Hit enemies <abbr class="short">Short</abbr> hate you at their highest priority.</div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Flaunt and Flout</legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Invocation:</b> You have a knack for saying just the right thing to piss people off</b></div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Bravo -->
    
      <!-- Way of the "Iaidoka"-->
      <section class="section" id="IaidokaSection">
        <header class="sectionHeader hideWrapper">
          <button id="showIaidoka" class="hidden showButton" onclick="show('Iaidoka');">Show Way of the Iaidoka</button>
          <button id="hideIaidoka" class="hide" onclick="hide('Iaidoka');">[&#8213;]</button>  
        </header>

        <article id="Iaidoka" class="sectionBody">
          <h1>Way of the Iaidoka</h1>
          <div class="divider"></div>

          <div>Beware of lone swordsman, they are usually alone for a reason. 
<br/><br/>
<br/><br/>
<div class="divider"></div>
<h1>Attack: Strike</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">Quick Draw </div>
              <div class="namField abilityField abilityKeywords"><b>Potence:</b> Bursts of speed allow you to catch your enemy unaware. </div>
              <div class="namField abilityField abilityFieldLast"><b>Passive:</b> While you are not wearing heavy armor, and you are wielding a large weapon or dual wielding: When you roll initiative gain 1 Alacrity plus 1 Alacrity if you initiative exceeds 10.  
Gain +1 CR for each instance of Boosted you have on a Strike.</div>
              <div class="namField abilityField"><b>Focus</b> or <b>Reaction:</b> You are Missed</div>
              <div class="namField abilityField abilityFieldLast"><b>Effect (Reaction):</b> Gain 1 Alacrity<br/>
<b>Effect(Focus):</b>Gain <abbr class="short">Short</abbr> <abbr class="impaired">Impaired</abbr> on Strikes and 1 Alacrity or spend up to 2 Alacrity. Each Alacrity can be spent to gain <abbr class="short">Short</abbr> <abbr class="boosted">Boosted</abbr> or <abbr class="round">Round</abbr> <abbr class="vigilant">Covered</abbr>.</div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Bide Time</legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Potence:</b> You've learned how valuable patience can be when looking for the right time to Strike. </div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Iaidoka -->
    
      <!-- Way of the "Unfettered"-->
      <section class="section" id="UnfetteredSection">
        <header class="sectionHeader hideWrapper">
          <button id="showUnfettered" class="hidden showButton" onclick="show('Unfettered');">Show Way of the Unfettered</button>
          <button id="hideUnfettered" class="hide" onclick="hide('Unfettered');">[&#8213;]</button>  
        </header>

        <article id="Unfettered" class="sectionBody">
          <h1>Way of the Unfettered</h1>
          <div class="divider"></div>

          <div><br/><br/>
<div class="divider"></div><h1>Attack: Strike</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">Unburdened Power</div>
              <div class="namField abilityField abilityKeywords"><b>Potence:</b> There is something to be said for those who focus on inner strenth</div>
              <div class="namField abilityField abilityFieldLast"><b>Passive:</b> While unarmed and unarmored gain +2 Guard and 1 Qi for each Critical Mark you get with a Strike.
<br/><br/>

Your unarmed strikes deal pure damage, and have the following critical effects:

<br/><br/>

Nerve Strike CE 2: A hit enemy gains <abbr class="round">Round</abbr> <abbr class="impaired">Impaired</abbr>

<br/><br/>

Impact CE 3: Push a hit enemy up to 2

<br/><br/>

Pressure Point CE 4: A hit enemy gains <abbr class="combat">Combat</abbr> <abbr class="vulnerable">Vulnerable</abbr></div>
              <div class="namField abilityField"><b>Focus:</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Effect:</b> Increase your critical range by 2 on your next strike this turn.
<br/><br/> 
Or spend at least one Qi to make an unarmed strike with a number of dice equal to the Qi spent and heal CS. This strike does not generate Qi.


</div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Qi Strike</legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Potence:</b></div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Unfettered -->
    
      <!-- Way of the "Firefly"-->
      <section class="section" id="FireflySection">
        <header class="sectionHeader hideWrapper">
          <button id="showFirefly" class="hidden showButton" onclick="show('Firefly');">Show Way of the Firefly</button>
          <button id="hideFirefly" class="hide" onclick="hide('Firefly');">[&#8213;]</button>  
        </header>

        <article id="Firefly" class="sectionBody">
          <h1>Way of the Firefly</h1>
          <div class="divider"></div>

          <div>Fire is a tricky element to control and those who try can quickly get burned. However, some weavers have found a way to tap into the flames to heal themselves and draw power from it. They can have a powerful impact on the battlefield if they don't burn to bright. As the secrets of the phoenix are still locked away.

<br/><br/>
<div class="divider"></div>
<h1>Attack: Blast, must learn Fire</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">Burn Bright</div>
              <div class="namField abilityField abilityKeywords"><b>Potence:</b> Everyone thinks you are crazy. </div>
              <div class="namField abilityField abilityFieldLast"><b>Passive:</b> Increase your CR with Blasts by 1 each stack of Burning you have</div>
              <div class="namField abilityField"><b>Focus</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Effect:</b>Gain <abbr class="combat">Combat</abbr> <abbr class="burning">Burning</abbr> and <abbr class="short">Short</abbr> <abbr class="boosted">Boosted</abbr> on Blasts. If you hit on your next Blast heal 1 for each TN above 10 on that Blast.
</div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Inner Fire</legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Invocation, Conjuration:</b> But they just do understand the flames like you do. </div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Firefly -->
    
      <!-- Way of the "Sculptor"-->
      <section class="section" id="SculptorSection">
        <header class="sectionHeader hideWrapper">
          <button id="showSculptor" class="hidden showButton" onclick="show('Sculptor');">Show Way of the Sculptor</button>
          <button id="hideSculptor" class="hide" onclick="hide('Sculptor');">[&#8213;]</button>  
        </header>

        <article id="Sculptor" class="sectionBody">
          <h1>Way of the Sculptor</h1>
          <div class="divider"></div>

          <div><span class="indent40"> </span>Water flows into shapes more easily than other elements. Those that focus on it can learn to more precisely sculpt the area of their blast. 
<br/>
But that's not all they learn, by tapping into the power contained within their own bodies they can channel their blood into power. 
<br/><br/>
<div class="divider"></div>
<h1>Attack: Blast, must learn Water</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">Shape</div>
              <div class="namField abilityField abilityKeywords"><b>Conjuration:</b> You learned to make the Fae flow. </div>
              <div class="namField abilityField abilityFieldLast"><b>Passive</b> With each Wide string choose a space in the blast area or adjacent to it. Spaces in the blast area are removed from it, spaces you choose adjacent to the Blast area added to it. </div>
              <div class="namField abilityField"><b>Focus</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Effect:</b> Take 1 damage, gain 2 power. </div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Carve</legend>
              <div class="abilityFieldOdd abilityKeywords"><b>Potence, Conjuration:</b> Carving into your own essence allows you to draw on reserves of power. </div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Sculptor -->
    
      <!-- Way of the "Cadre"-->
      <section class="section" id="magecadreSection">
        <header class="sectionHeader hideWrapper">
          <button id="showmagecadre" class="hidden showButton" onclick="show('magecadre');">Show Way of the Cadre</button>
          <button id="hidemagecadre" class="hide" onclick="hide('magecadre');">[&#8213;]</button>  
        </header>

        <article id="magecadre" class="sectionBody">
          <h1>Way of the Cadre</h1>
          <div class="divider"></div>

          <div>Feel like this needs to exist in the world, not sure how often a player would take it without making a full mage party. 
<br/><br/>
<div class="divider"></div>
<h1>Attack: Blast</h1></div>

          <div class="flex">

            <div class="wayTalent abilityFieldset">
              <div class="abilityLegend namLegend">Conduit</div>
              <div class="namField abilityField abilityKeywords"><b>Conjuration</b></div>
              <div class="namField abilityField abilityFieldLast"><b>Passive:</b> Adjacent allies can use your Power when Blasting. When an adjacent ally gains Power from a Critical Mark gain 1 Power. </div>
              <div class="namField abilityField">Focus: 1 Power</div>
              <div class="namField abilityField abilityFieldLast">Effect: Give an adjacent ally 1 Power and <abbr class="short">Short</abbr> <abbr class="boosted">Boosted</abbr> on their next Blast</div>
            </div>

            <!--
            <div class="abilityFieldset namFieldset wayManeuver abilityColumnRight">
              <legend class="nonAtkMan abilityLegend namLegend">Charge</legend>
              <div class="abilityFieldOdd abilityKeywords">Conjuration</div>
              
            </div>
            --> 
          </div>
          <div style="clear:both;"></div>
          
        </article>
        <footer class="sectionFooter">
        </footer>
      </section>
      <!-- End Way of the Cadre -->
        <!-- End Pull Roles from Database -->

    <!-- Personality Section -->   
    <section class="section" id="personalitySection">
        <header class='sectionHeader hideWrapper'>
          <button id="showpersonality" class="hidden showButton" onclick="show('personality');">Personality</button>
          <button id="hidepersonality" class="hide" onclick="hide('personality');">[&#8213;]</button>  
        </header>

      <article id="personality" class='sectionBody'>
       <h1>Personality</h1>
       <div class="divider"></div>
       Your character is Prae, those that go before. It's likely they are familiar with taking risks, challenging preconcieved notions or the status quo, but that is not all that they are.
       <br/><br/>
       Often your character's personality, beliefs, moods, and values will grow and change over the adventure, or even become apparent through their actions to you and the other players when it wasn't previously. This section is just to give a baseline, its mean to guide how you think about the character not prevent you from changing or adapting them as the game moves forward. 

       <p class='note'>See social skills and system to get a better idea of values and moods. Refer to the campaign setting for influneces of race and ethnicity. </p>

       <h2>Values</h2>
       What does your character value, what do they care about and what do they trust. Often for characters in Prae this will relate to ideas and experiences more than people. As they've chosen, or in some cases been forced to, live a life on the fringe where few people or few people worth caring about are.  

       <h3>Influences</h3>When thinking about your values consider the part of the your character came from. It's general culture and their place within it. Which of that cultures values do the share and when the differ why?

       <h2>Moods</h2>
       The most common mood for all characters is generally calm. Besides that what are common moods your character experiences, how do the feel most days when they wake up or go to bed, are they easy to anger, often feel sorry for others, etc? 

      <p class='note'>In tolkienesque worlds these are often tied to the races. Dwarves are often jovial or grumpy. Elves proud and depressed. Orcs  angry and enegetic. Gnomes curious and silly.</p>

      <h2>Relaxing</h2>
      Where does your character feel at peace? Is it out in the wilderness hunting game? At a tavern drinking with friends or strangers telling stories? A private dinner debating the finer points of politics? Alleviating rarely used items from those who have to many?
      <br/><br/>
      While many games don't have a lot of opportunity for down time on or off screen. Knowing how they would spend it can help greatly with bringing them to life and can even help drive the story forward by giving hooks to your GM to drop information, know where you might be when crisis arises etc.
      <br/><br/>
      As mentioned in the childhood section its likely this relates to some of the skills you picked there. 
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Personality -->




    <!-- Gear -->   
    <section class="section" id="gearSection">
        <header class='sectionHeader hideWrapper'>
          <button id="showgear" class="hidden showButton" onclick="show('gear');">Gear</button>
          <button id="hidegear" class="hide" onclick="hide('gear');">[&#8213;]</button>  
        </header>

      <article id="gear" class='sectionBody'>
        <h1>Gear</h1>
        <div class="divider"></div>
        <span class="indent40"> </span>
        
        Proper preparation is an important part for any job, and more so for people expected to be at the forefront of solving problems. They value of arms and armor is apparent in a dangerous world, but simple items like rope can be just as important when trying to scale castle walls, dropping into a gorge or string and bells for creating a perimeter around your camp to warn intruders. 
      
        <h2>Load</h2>
        <span class="indent40"> </span>

        Load is a concept that merges the bulk, weight, and in part the fragility of an item. A durable and dense item weighs about 10 pounds. The less dense or durable an item the more load it requires relative to its weight. 

        <h3>Meaningful Load</h3>
        <span class="indent40"> </span>
        
        Some objects are insignificant enough that tracking their load is not worth the effort. Rings and Whistles are two common ones found on the Adventuring Gear List. That's not to say these objects have no weight or bulk and are not fragile but rather that individually those qualities are not meaningfuly prohibitive to carrying other things. Use your best judgement for determining load when carrying a lot of objects that do not normally have meaningful load. 

        <p class='note'>The first two sets of clothes with one load or less take zero load.</p>
        
        <h2>Inventory Slots</h2>
        <span class="indent40"> </span>
        
        Inventory slots represent the places you can safely store items on your person while keeping your hands free. They also further represent the fragility of items. Items that take a fraction of a load still need to be stored in a way to prevent them from being hurt or harming other items they are stored with. While paper is not particularly heavy or bulky it still takes up a load slot as if it isn’t given sufficient space and care it can easily be ripped, crumpled or stained.
        
        <br/><span class="indent40"> </span>

        Items with meaningful load require a minimum of 1 slot in your inventory, and take up to their load in slots. Items that take up less than 1 load and more than 0 can share that load with the same item (a torch takes up 1/4 of a load, you can have up to 4 torches that share 1 load, but if you carry least one Torch it will require 1 slot).
      
        <h3>Kits</h3>
        <span class="indent40"> </span> 

        Kits are specially built containers that allow different items to combine their load into fewer slots. In the kit section below is a list of kits characters can purchase to more efficiently manage their inventory slots. There are also some kits listed in the adventuring gear section for items that are commonly found as kits. Some crafters might be able to make additional kits but quality work doesn't come cheap. 


        <h2>Encumbrance</h2>
        <span class="indent40"> </span> 

        Your character is encumbered if holding more than 9 slots of load, and an additional encumbrance for every two load above that to a maximum of 18.
        While encumbered their Focus is required to safely carry their gear, and for each encumbrance they are <abbr class="impaired">Impaired</abbr> and have -1 Pace.
        
        <br/><span class="indent40"> </span>
        
        Additional restrictions can be placed by the GM based on how your load is distributed (I.e. if you need your hands to carry something it is unlikely you can climb a wall). 

        <h2>Money</h2>
        <span class="indent40"> </span>

        Before you can purchase gear lets talk about money!
        As Mana is transferrable it will relate directly to currency. It is even likely to be one of the oldest currencies in your world. Money is also measured in terms of hours, with a Tok being the base curreny and equivalent to about an hour of basic labor.

        <p class="note"> These numbers are adjusted to base 10 to for simplicity of the player, but numbers on Traea are in base 12 and slightly different for actual characters on Traea.</p><br/>

        <b>10 Tok (t) = 1 mana.</b> A Tok is roughly the number of working hours during the day and slightly more than a third of a Night (8 hours)<br/>
        <b>1 Night (g) = 3 mana.</b> A Night is the amount of mana a person produces each night<br/>
        <b>1 Lunar (l) = 100 mana.</b> A Lunar is roughly the amount of mana a person produces each month or lunar cycle (actually ~81 on Traea)<br/>
        <b>1 Solar (s) = 1000 mana.</b> A Solar is roughly the amount of mana person produces each year or trip around the sun (actually 984 on Traea)<br/>
        
        <br/><span class="indent40"> </span>

        Cultures generally have coins or other representations for each type of money. 
        Imagine these coins are about the size of a quarter and they take 1/400th of a load and 100 of them weigh 1 lb. All coins can share the same load and a coin pouch takes up 1 inventory slot. Various other small, durable, and low bulk items can fit in this slot and load as well (some jewelry, small Tears, etc).

        <br/><br/>
        You start with 90+6d10 Nights (g).
        
        <h2>Gear Management</h2>
        <span class="indent40"> </span>

        Fill in inventory slots with gear that your character is almost always carrying like weapons, armor, coin pouch, and kits. The remaining slot and are considered to be filled with gear of some sort. 
        There are various times in the game where your character is likely to know more about the world and how to achieve their goals than you will as a player.  One of those is preparation and gear, to represent that knowledge inventory slots are flexible.  

        <br/> <span class="indent40"> </span>

        At any time yo can replace a flexible slot with an item on the adventuring gear list that makes some sense that their character would anticipated a need for. Slots can regain their flexibility by finding a location that sells the item they added, discarding any remains of it, and payings its cost. 

        <br/> <span class="indent40"> </span>

        Picking up and storing gear for any significant amount of time will require you to drop the gear your flexible slot represents or become encumbered. While flexible slots are abstract they still represent gear and can be dropped, picked up, and found on your person. Some places you may require you leave your gear behind will require you to drop the abstract representation of gear that is a flexible slot.  


        <h3>Wield and Wear</h3>
        <span class="indent40"> </span> 

        Gear must we worn or wielded appropriately to have its intended effect. Some items can not be worn together (i.e. multiple cloaks, suits of armor or pairs of boots). Use your better judgement for what what can be worn, held and wielded together. 


        <h3>Alternative Gear Management</h3>
        <span class="indent40"> </span>

        Different styles of campaign or different parts of the same one can call for very different resolutions of gear management. 
        
        <br/><span class="indent40"> </span>

        In some games, or at parts during them, there can be value, challenge, and fun in making high resolution gear management an important part of the play, at which point the Surival alternative might be a good fit. Your group might out in the wilds with little opportunity to trade, shop, or earn money. They might be poor and oppressed and scraping by to get your next meal is part of the play.

        <br/><span class="indent40"> </span>

        While others might be could be around a large city filled with opportunities and resources and close attention to resources so the Simple alternative might make the most sense for your time at the tame.

        <br/><span class="indent40"> </span>

        <b>Simple Gear</b>
        <button id="hideSimpleGear" class="hide hidden" onclick="hide('SimpleGear');">[&#8213;]</button>
        <button id="showSimpleGear" class="hide" onclick="show('SimpleGear');">[ + ]</button>
        <blockquote id="SimpleGear" class='hidden'>
          <span class="indent40"> </span>

        Don't bother to track money for small purchases. Anything less than a 1g can be acquired for free in small numbers.
        Consumables (ammo, rations, ink, etc.) are unlimited over the long term with the expectation that you restock them when around civilization, but reasonably limited in the short term (you aren’t carrying 20 torches without having a reason to or having planned to). 
        
        <br/><span class="indent40"> </span>
        
        You can’t carry more gear than is reasonable (use the other variants as a loose guideline for what is reasonable). Your GM will tell your your level of encumberence, as you collect more gear you want to carry.
        
        
        <br/><br/>
        You still must track gear that your character wouldn't normally or reasonably have.
        </blockquote>

        <br/><span class="indent40"> </span>

        <b>Tracked Load</b>
        <button id="hideTrackedLoad" class="hide hidden" onclick="hide('TrackedLoad');">[&#8213;]</button>
        <button id="showTrackedLoad" class="hide" onclick="show('TrackedLoad');">[ + ]</button>
        <blockquote id="TrackedLoad" class='hidden'>

        <span class="indent40"> </span> You have no flexible slots and must track all you are carrying.
        You only have gear that is written on your sheet. Don’t track ammo or rations but you must allocate a slots for them.
        </blockquote>

        <br/><span class="indent40"> </span>

        <b>Survival</b>
        <button id="hideSurvivalGear" class="hide hidden" onclick="hide('SurvivalGear');">[&#8213;]</button>
        <button id="showSurvivalGear" class="hide" onclick="show('SurvivalGear');">[ + ]</button>
        <blockquote id="SurvivalGear" class='hidden'>
          <span class="indent40"> </span>
          Ask what gear is available for purchase to you prior to the game starting.
          You only have gear that is written on your sheet.

          <br/><span class="indent40"> </span>
          Load must make sense as to the location it is allocated. You can’t load your head up with boots, and you can’t separate an items load to more than one location or container. Keep track of all of your money, purchases, consumables, and where and in which containers they are stored. 

          <br/><br/>

          Total maximum load: Body*4+Might+Brawn<br/>
          Encumbered when load exceeds: Body*2+Agility+Brawn<br/>
          <br/>
          Load Slot Locations and maximum usable load.
          <ul>
            <li>Head 1</li>
            <li>Neck 1</li>
            <li>Hands 2</li>
            <li>Torso 3</li>
            <li>Waist 1</li>
          </ul>
          <h4>Wearable Containers</h4>
          Pack or large sheath increases torso slots by 3.<br/>
          Pouch, waterskin, or sheath increases waist slots by 1.<br/>
          Sack increases hands slots by 1 and occupies one hand.<br/>

          <p class="note">[1]Kits are also wearable containers, and increase your load in that location by their own load.</p> 
          <p class="note">[2]All of these numbers speak to usable load not maximum load I.e. hands can carry more than 2 load in some chases, moving furniture as an example. if your load in an location exceeds this useable load nothing in that location can be used without taking time and/or actions to reduce load to the maximum useable load.</p>
        </blockquote>
        
        <h3>Consumable gear</h3>
        <span class="indent40"> </span>

        Generally when using the survival rules, and some times when using the others, it will important to track the usage of items that can be used up or are damaged when used. Chalk, Candles, Paper, Soap, Oil, etc. In these cases look at their description for how quickly they are used. If that is not listed in their description each time they are used beyond the first without returning to a town roll 1d10, on a 1 they are consumed.
 
      </article>


      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Gear -->


    <!-- Gear -->   
    <section class="section" id="gearSection">
        <header class='sectionHeader hideWrapper'>
          <button id="showgear" class="hidden showButton" onclick="show('gear');"> Adventuring Gear List</button>
          <button id="hidegear" class="hide" onclick="hide('gear');">[&#8213;]</button>  
        </header>

      <article id="gear" class='sectionBody'>
        <h1>Adventuring Gear List</h1>
        <div class="divider"></div>

        <div class="abilityFieldset gearFieldset">
          <div class="abilityLegend gearLegend">Adventuring Gear List</div>
          <div class="gearTable">
          <div class="tableRow">
            <div class="tableHeaderLeft">Item</div>
            <div class="tableHeader">Cost</div>
            <div class="tableHeader">Load</div>
            <div class="tableHeader">Location</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Bedroll</div>
            <div class="tableCell">9g</div>
            <div class="tableCell">1/2</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Bell</div>
            <div class="tableCell">3g</div>
            <div class="tableCell">1/8</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Blanket</div>
            <div class="tableCell">6g</div>
            <div class="tableCell">1/2</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Book</div>
            <div class="tableCell">10g</div>
            <div class="tableCell">1/4</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Caltrop (50)</div>
            <div class="tableCell">5g</div>
            <div class="tableCell">1</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Candle</div>
            <div class="tableCell">1s</div>
            <div class="tableCell">1/5</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Chain (10ft)</div>
            <div class="tableCell">10g</div>
            <div class="tableCell">1</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Chalk</div>
            <div class="tableCell">1s</div>
            <div class="tableCell">1/5</div>
            <div class="tableCell">Torso/Waist/Neck</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Cord</div>
            <div class="tableCell">5g</div>
            <div class="tableCell">1/5</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Crowbar</div>
            <div class="tableCell">3g</div>
            <div class="tableCell">1/2</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Fishing Kit</div>
            <div class="tableCell">9g</div>
            <div class="tableCell">1</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Grappling Hook</div>
            <div class="tableCell">2g</div>
            <div class="tableCell">1/3</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Hunting Trap</div>
            <div class="tableCell">8g</div>
            <div class="tableCell">3</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Ink Pen</div>
            <div class="tableCell">2g</div>
            <div class="tableCell">1/10</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Lantern</div>
            <div class="tableCell">6g</div>
            <div class="tableCell">1/2</div>
            <div class="tableCell">Torso/Waist/Hands</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Lock</div>
            <div class="tableCell">5g*</div>
            <div class="tableCell">1/10</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Lockpicks</div>
            <div class="tableCell">10g</div>
            <div class="tableCell">1/10</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Makeup Kit</div>
            <div class="tableCell">9g</div>
            <div class="tableCell">1/2</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Mess kit</div>
            <div class="tableCell">18g</div>
            <div class="tableCell">1</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Mirror</div>
            <div class="tableCell">5g</div>
            <div class="tableCell">1/10</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Paper</div>
            <div class="tableCell">1s</div>
            <div class="tableCell">1/10</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Piton</div>
            <div class="tableCell">1s</div>
            <div class="tableCell">1/10</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Portable Ram</div>
            <div class="tableCell">20g</div>
            <div class="tableCell">4</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Rations (1 day)</div>
            <div class="tableCell">1s</div>
            <div class="tableCell">1/5</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Rope (30ft)</div>
            <div class="tableCell">10g</div>
            <div class="tableCell">1/2</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Sand timer</div>
            <div class="tableCell">3g</div>
            <div class="tableCell">1/4</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Shovel</div>
            <div class="tableCell">5g</div>
            <div class="tableCell">1/2</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Signal Whistle</div>
            <div class="tableCell">10g</div>
            <div class="tableCell">-</div>
            <div class="tableCell">Neck</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Signet Ring</div>
            <div class="tableCell">10g</div>
            <div class="tableCell">-</div>
            <div class="tableCell">Hand</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Soap</div>
            <div class="tableCell">1g</div>
            <div class="tableCell">1/10</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Tent</div>
            <div class="tableCell">20g</div>
            <div class="tableCell">1</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldEven abilityFieldLast">
            <div class="tableCellLeft">Torch</div>
            <div class="tableCell">1c</div>
            <div class="tableCell">1/4</div>
            <div class="tableCell">Torso</div>
          </div>
        </div>
      </div>
        <h2>Adventuring Gear Descriptions</h2>
        Blurb about descriptions goes here
        <blockquote>
        <b>Bedroll</b>: Reduce the number of hours you need to take a long rest by 1 
        <br/>
        <b>Bell</b>: ~70 decibels and can be purchased in various tones to allow for signaling and other communication. Larger bells can be purchased to increase the volume of the sound. 
        <br/>
        <b>Blanket</b>: Bonus in dealing with cold temperature or exposure, will add when those rules are added
        <br/>
        <b>Book</b>: Empty, 6" by 8", 200 pages
        <br/>
        <b>Caltrop</b>: 50 of them can be used to fill a space. The space is difficult ground and moving into the space deals 3 damage
        <br/>
        <b>Candle</b>: A 1 inch radius by 12 inches tall candle. It burns for 8 hours giving off a soft light to their space and adjancet spaces. It can be scented to allow for signaling, pleasure, etc. Some scents might be impossible or increase the cost. Can also be colored and used for sealing wax. 
        <br/>
        <b>Chain</b>: 10 ft long, 1 inch thick. Force TN 15 to break. 
        <br/>
        <b>Chalk</b>: 1 in radius by 12 inches tall. Can be purhcased in various colors.
        <br/>
        <b>Cord</b>: 20ft of 2mm silk cord, can be used for fishing line, trip wire, etc.
        <b>Crowbar</b>: Used to pry apart things, an important tool for taking various actions in the world
        <br/>
        <b>Fishing Kit</b>: 20 ft of 2mm silk cord, fishing hooks, and a small fishing net. 
        <br/>
        <b>Grappling Hook</b>: Assist setting rope up in places you couldn't normally reach.
        <br/>
        <b>Hunting Trap</b>: Diffcult ground for those who know the trap is there. Otherwise snaps and slows the first creature to enter the trap until it is removed and deals 1 HC of damage. Boosted when making survival rolls for hunting food. 
        <br/>
        <b>Ink Pen & Pen Knife</b>: Sturdy reed pen and includes a small pen knife to sharpen it
        <br/>
        <b>Lantern</b>: Each side of the lantern has shutters allowing you to easily direct and control the brightness of the light. 
        <b>Lock</b>: TN 7 lock, double in price for each increase in TN
        <br/>
        <b>Lockpicks</b>: They open common locks
        <br/>
        <b>Makeup Kit</b>: Small container that holds various shades of makeup and a mirror. If you have sufficient time to apply makeup gain boosted when make deception rolls for disguise.
        <br/>
        <b>Mess Kit</b>: Small container that can be heated to cook food and contains a small plate, small cup, cutlery, and spices. Once per day an extra 30 minutes during a short rest and a ration can be spent to allow you eat a hearty meal.
        <br/>
        <b>Mirror</b>: can be used to signal with light.
        <br/> 
        <b>Paper</b>: 18" by 18" piece of paper
        <br/>
        <b>Piton Pulley</b>: Generally hammered into a wall to with rope to run through to assit in climbing safety. These also have a small pulley at the end. 
        <br/>
        <b>Portable Ram</b>: Boosted to Force checks when trying to knock down walls or doors
        <br/>
        <b>Rations (1 day)</b>: Standard ration, not a healthy meal
        <br/>
        <b>Rope (30ft)</b>: 1/2 inch thick
        <br/>
        <b>Sand timer</b>: 2-10 minute sand timer, can be used to synchronize or keep track of timing. Larger onces can be purchased, the load increase accordingly.
        <br/>
        <b>Shovel</b>: Used for digging
        <br/>
        <b>Signal Whistle</b>: Used for auditory signaling, can be constructed to sound like a whole variety of things. 
        <br/>
        <b>Signet Ring</b>: Used to indentify yourself as an individual or part of a group, can be pressed into wax to show who the message is from. 
        <br/>
        <b>Soap</b>: Can be used to gain boosted to resist or overcome diseases?
        <br/>
        <b>Tent</b>: Bonus when dealing with cold temperature and reduce the hours you need to sleep during a long rest by 1. 
        <br/>
        <b>Torch</b>: Emits light for an hour in a 40 ft area.  
        </blockquote>

        <div class="gearTable abilityFieldset gearFieldset">
          <div class="abilityLegend gearLegend">Liquids and their Containers</div>
          <div class="tableRow">
            <div class="tableHeaderLeft">Item</div>
            <div class="tableHeader">Cost</div>
            <div class="tableHeader">Load</div>
            <div class="tableHeader">Location</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellFull">Liquid Containers</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Flask</div>
            <div class="tableCell">1g</div>
            <div class="tableCell">1/8* (full)</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Vial</div>
            <div class="tableCell">1g</div>
            <div class="tableCell">1/4*</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Waterskin</div>
            <div class="tableCell">1g</div>
            <div class="tableCell">1/2 (full)</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellFull">Liquids</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Ale</div>
            <div class="tableCell">1c</div>
            <div class="tableCell">1/10 (16oz)</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Ink</div>
            <div class="tableCell">1g</div>
            <div class="tableCell">1/10 (16oz)</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Oil</div>
            <div class="tableCell">1g</div>
            <div class="tableCell">1/10 (16oz)</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Perfume</div>
            <div class="tableCell">1g</div>
            <div class="tableCell">1/10 (16oz)</div>
            <div class="tableCell">Torso/Waist</div>
          </div><div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Water</div>
            <div class="tableCell">1g</div>
            <div class="tableCell">1/10 (16oz)</div>
            <div class="tableCell">Torso/Waist</div>
          </div><div class="tableRow abilityFieldEven abilityFieldLast">
            <div class="tableCellLeft">Wine</div>
            <div class="tableCell">1g</div>
            <div class="tableCell">1/10 (16oz)</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
        </div>


        <div class="gearTable abilityFieldset gearFieldset">
          <div class="abilityLegend gearLegend"> Kit</div>
          <div class="tableRow">
            <div class="tableHeaderLeft">Kit</div>
            <div class="tableHeader">Cost</div>
            <div class="tableHeader">Load</div>
            <div class="tableHeader">Location</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellKit">Camp Kit</div>
            <div class="tableCell">55g</div>
            <div class="tableCell">3</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Bedroll</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Blanket</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">2x Flask of Oil</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Lantern</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Tent</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellKit">Cartographers Kit</div>
            <div class="tableCell">25g</div>
            <div class="tableCell">1</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Book of Maps, with room for more</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Ink Pen</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Paper (10)</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Sand timer (5 minute)</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Small flasks of different colored ink (5)</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellKit">Entertainers Kit</div>
            <div class="tableCell">30g</div>
            <div class="tableCell">3</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Book of songs, poems, and fables</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Clothes, Common</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Clothes, Fine</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Clothes, Official</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Clothes, Travelers</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Flask of Perfume</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Makeup Kit</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellKit">Explorers Kit</div>
            <div class="tableCell">50g</div>
            <div class="tableCell">3</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Bedroll</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Blanket</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Flask of Oil</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Lantern</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Piton (10)</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Rope (30ft)</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Signal Whistle</div>
          </div>   
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Torch (4)</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellKit">Liquids Kit</div>
            <div class="tableCell">5g</div>
            <div class="tableCell">1</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Flask of Ale</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Flask of Wine</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Vial of Oil</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Waterskin</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellKit">Magistrate Kit</div>
            <div class="tableCell">99g</div>
            <div class="tableCell">3</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Book of Laws</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Book of Names</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Candle x3 (often used as sealing wax)</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Chain (10ft)</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Clothes, Fine</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Flask of Ink</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Ink Pen</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Lock</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Mess Kit</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Signet Ring</div>
          </div>    
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Soap</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Tent</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellKit">Rangers Kit</div>
            <div class="tableCell">60g</div>
            <div class="tableCell">6</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Bedroll</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Blanket</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Caltrop</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Fishing Kit</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Hunting Trap</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Signet Whistle</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Waterskin</div>
          </div>   
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellKit">Scholar Kit</div>
            <div class="tableCell">35g</div>
            <div class="tableCell">2</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Book x3 (various lore, with room for more)</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Candles (5)</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Flask of Ink (2)</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Ink Pen</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Paper (10)</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Signet Ring (personal)</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellKit">Scout Kit</div>
            <div class="tableCell">90g</div>
            <div class="tableCell">3</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Bell</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Book</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Candle (wax often used to take imprints)</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Caltrop</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Chalk</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Cord</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Crowbar</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Grappling Hook</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Ink Pen</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Lockpicks</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Mirror</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Rope (30ft)</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Sand timer (5 minutes)</div>
          </div>   
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Signet Whistle (bird or screaming sounds)</div>
          </div>    
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Signet Ring x3 (of decently large groups, like city guards or a church)</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellKit">Traveler Kit</div>
            <div class="tableCell">25g</div>
            <div class="tableCell">3</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Bedroll</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Blanket</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Clothes, Travelers</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Flask of Oil</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Lantern</div>
          </div>
          <div class="tableRow abilityFieldEven abilityFieldLast">
            <div class="tableCellLeft">Rations (5)</div>
          </div>
        </div>
        <br/><br/>
        <div class="gearTable abilityFieldset gearFieldset">
          <div class="abilityLegend gearLegend">Clothes</div>
          <div class="tableRow">
            <div class="tableHeaderLeft">Item</div>
            <div class="tableHeader">Cost</div>
            <div class="tableHeader">Load</div>
            <div class="tableHeader">Location</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellFull">Clothes</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Common</div>
            <div class="tableCell">1g</div>
            <div class="tableCell">1/4</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Cold Weather</div>
            <div class="tableCell">1g</div>
            <div class="tableCell">1/2</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Fine</div>
            <div class="tableCell">1g</div>
            <div class="tableCell">1/2</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Hot Weather</div>
            <div class="tableCell">1g</div>
            <div class="tableCell">1/8</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Official</div>
            <div class="tableCell">1g</div>
            <div class="tableCell">1/2</div>
            <div class="tableCell">Torso/Waist</div>
          </div>
          <div class="tableRow abilityFieldEven abilityFieldLast">
            <div class="tableCellLeft">Travelers</div>
            <div class="tableCell">1g</div>
            <div class="tableCell">1/2</div>
            <div class="tableCell">Torso/Waist</div>
          </div>      
        </div>
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Gear -->


    <!-- Weapon Rules -->  
    <section class="section" id="weaponRulesSection">
      <header class="sectionHeader hideWrapper">
        <button id="showweaponRules" class="hidden showButton" onclick="show('weaponRules');">Weapon Rules</button>
        <button id="hideweaponRules" class="hide" onclick="hide('weaponRules');">[&#8213;]</button>  
      </header>

      <article id="weaponRules" class="sectionBody">
        <h1>Weapon Rules</h1>
        <div class="divider"></div>
        Weapons have three mechanical characteristics. <br/>
        Load which determines damage.<br/>
        Class which determines a damage keyword.<br/>
        Type which determines Critical Effect.<br/>
        <br/>

        <b>Load</b> like all gear determines how much space it takes up on your person. Additionaly it relates to how much damage weapons deal. 
        <br/><br/>

        If the load is less than 1/2, it is a small weapon and deals 3 damage.<br/>
        If the load is 1/2 or greater but less than 1, it is a medium weapon and deals 4 damage.<br/>
        If the load is 1 it is a large weapon, requires two hands to wield, and deals 5 damage.

        <p class="note">[1]Load 1 is the largest weapon a size 1 creature can weird effectively, but various monsters will use larger weapons. </p>

        <p class="note">[2]Small weapons, with a load less than 1/2, are often less effective in combat their benefit relates to being easier to throw and hide.</p>
        <br/>
        <b>Class</b> relates to a damage type keyword, by itself this has no mechanical effect. However, some things are more resistant or vulnerable to different damage types. Class types: Bludgenoing (B), Slashing (S), Piercing (P)
        <br/><br/>
       
        <b>Type</b> relates to the weapons Critical Effect although within each type there is still a large variety of shapes and styles of weapon. Various cultures or groups will have specific looks or apsects to how they forge weapons.
        <br/><br/>

        <b>Ranged Weapons</b> require two hands to use. Ranged weapon load can be combined with the load of their ammo and containers that hold ammo.
        <br/><br/>
        <div class="gearTable abilityFieldset gearFieldset">
          <div class="gearLegend abilityLegend">Critical Effects</div>
          <div class="tableRow">
            <div class="tableHeaderLeft">Type</div>
            <div class="tableHeaderFull">Critical Effect</div>
          </div>

                                                            <div class="tableRow abilityFieldEven">

                <div class="tableCellLeft">Axe</div>
                <div class="tableCellFull">Rend (2): <abbr class="short">Short</abbr> <abbr class="breached">Breached</abbr></div>
              </div>
                                                              <div class="tableRow abilityFieldEven">

                <div class="tableCellLeft">Club</div>
                <div class="tableCellFull">Smack (2): <abbr class="short">Short</abbr> <abbr class="impaired">Impaired</abbr></div>
              </div>
                                                              <div class="tableRow abilityFieldEven">

                <div class="tableCellLeft">Dagger</div>
                <div class="tableCellFull">Slit (3): +2 damage, +6 if Hidden</div>
              </div>
                                                              <div class="tableRow abilityFieldEven">

                <div class="tableCellLeft">Hammer</div>
                <div class="tableCellFull">Knock (3): Push up to 3</div>
              </div>
                                                              <div class="tableRow abilityFieldEven">

                <div class="tableCellLeft">Spear</div>
                <div class="tableCellFull">Spring (2): Slide self up to 2</div>
              </div>
                                                              <div class="tableRow abilityFieldEven">

                <div class="tableCellLeft">Sword</div>
                <div class="tableCellFull">Flow (3): Self <abbr class="short">Short</abbr> <abbr class="boosted">Boosted</abbr></div>
              </div>
                                                              <div class="tableRow abilityFieldEven">

                <div class="tableCellLeft">Bow</div>
                <div class="tableCellFull">Flow (4): Self <abbr class="short">Short</abbr> <abbr class="boosted">Boosted</abbr></div>
              </div>
                                                              <div class="tableRow abilityFieldEven">

                <div class="tableCellLeft">Sling</div>
                <div class="tableCellFull">Knock (4): Push up to 3</div>
              </div>
                                                              <div class="tableRow abilityFieldEven">

                <div class="tableCellLeft">Bolas</div>
                <div class="tableCellFull">Entangle (4): <abbr class="short">Short</abbr> <abbr class='slow'>Slow</abbr></div>
              </div>
                                                              <div class="tableRow abilityFieldEven">

                <div class="tableCellLeft">Shield</div>
                <div class="tableCellFull">Breathe (2): <abbr class="combat">Combat</abbr> Reinforce 2 self</div>
              </div>
                              </div>

      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Weapons -->


    <!-- Weapons -->  
    <section class="section" id="weaponsSection">
      <header class="sectionHeader hideWrapper">
        <button id="showweapons" class="hidden showButton" onclick="show('weapons');">Weapon List</button>
        <button id="hideweapons" class="hide" onclick="hide('weapons');">[&#8213;]</button> 
      </header>

      <article id="weapons" class="sectionBody">
        <h1>Weapon List</h1>
        <div class="divider"></div>
        This list here is just to give an general idea of weapons and their properties its not an exhaustive list. However, you should be able to find a weapon mechanically similar even if stlyishly differing. 
        <div class="abilityFieldset weaponFieldset">
          <div class="weaponLegend abilityLegend">Weapon List</div>
            <div class="tableRow bodyColor">
              <div class="tableHeader">Weapon</div>
              <div class="tableHeader">Cost</div>
              <div class="tableHeader">Load</div>
              <div class="tableHeader">Class</div>
              <div class="tableHeader">Type</div>
            </div> 
            <div class="tableRow abilityFieldEven">
              <div class="tableCellFull">Ammo</div>
            </div> 
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellLeft">Arrow (10)</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1/4</div>
            </div>
            <div class="tableRow abilityFieldEven">
              <div class="tableCellLeft">Bolt (10)</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1/2</div>
            </div> 
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellFull">Small Weapons</div>
            </div> 
            <div class="tableRow abilityFieldEven">
              <div class="tableCellLeft">Dagger</div>
              <div class="tableCell">1s</div>
              <div class="tableCell">1/5</div>
              <div class="tableCell">P</div>
              <div class="tableCell">Dagger</div>
            </div>
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellLeft">Gladius</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1/3</div>
              <div class="tableCell">S/P</div>
              <div class="tableCell">Straight Sword</div>
            </div>
            <div class="tableRow abilityFieldEven">
             <div class="tableCellLeft">Hatchet</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1/3</div>
              <div class="tableCell">S</div>
              <div class="tableCell">Axe</div>
            </div> 
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellLeft">Hammer</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1/3</div>
              <div class="tableCell">B</div>
              <div class="tableCell">Hammer</div>
            </div> 
            <div class="tableRow abilityFieldEven">
              <div class="tableCellLeft">Cutlass</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1/3</div>
              <div class="tableCell">P</div>
              <div class="tableCell">Backsword</div>
            </div>
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellLeft">Stiletto</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1/5</div>
              <div class="tableCell">P</div>
              <div class="tableCell">Thrust Sword</div>
            </div>
            <div class="tableRow abilityFieldEven">
              <div class="tableCellLeft">Nunchaku</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1/3</div>
              <div class="tableCell">B</div>
              <div class="tableCell">Chain</div>
            </div>
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellLeft">Tonfa</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1/3</div>
              <div class="tableCell">B</div>
              <div class="tableCell">Club</div>
            </div>
            <div class="tableRow abilityFieldEven">
              <div class="tableCellFull">Ranged</div>
            </div>
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellLeft">Bolas</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1/4</div>
              <div class="tableCell">B</div>
              <div class="tableCell">Bolas</div>
            </div> 
            <div class="tableRow abilityFieldEven">
              <div class="tableCellLeft">Shortbow</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1/4</div>
              <div class="tableCell">P</div>
              <div class="tableCell">Bow</div>
            </div>
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellLeft">Short Sling</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">-</div>
              <div class="tableCell">B</div>
              <div class="tableCell">Sling</div>
            </div>            
            <div class="tableRow abilityFieldEven">
              <div class="tableCellFull">Medium Weapons</div>
            </div>
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellLeft">Battleaxe</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">2/3</div>
              <div class="tableCell">S</div>
              <div class="tableCell">Axe</div>
            </div>
            <div class="tableRow abilityFieldEven">
              <div class="tableCellLeft">Flail</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">2/3</div>
              <div class="tableCell">B</div>
              <div class="tableCell">Chain</div>
            </div> 
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellLeft">Long Sword</div>
              <div class="tableCell">1s</div>
              <div class="tableCell">1/2</div>
              <div class="tableCell">S/P</div>
              <div class="tableCell">Straight Sword</div>
            </div>
            <div class="tableRow abilityFieldEven">
              <div class="tableCellLeft">Mace</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">2/3</div>
              <div class="tableCell">B</div>
              <div class="tableCell">Club</div>
            </div>
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellLeft">Rapier</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1/2</div>
              <div class="tableCell">P</div>
              <div class="tableCell">Thrust Sword</div>
            </div> 
            <div class="tableRow abilityFieldEven">
              <div class="tableCellLeft">Sabre</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1/2</div>
              <div class="tableCell">S</div>
              <div class="tableCell">Backsword</div>
            </div> 
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellLeft">Short Spear</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">2/3</div>
              <div class="tableCell">P</div>
              <div class="tableCell">Spear</div>
            </div>
            <div class="tableRow abilityFieldEven">
              <div class="tableCellLeft">Warhammer</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">2/3</div>
              <div class="tableCell">B</div>
              <div class="tableCell">Hammer</div>
            </div>
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellFull">Ranged</div>
            </div> 
            <div class="tableRow abilityFieldEven">
              <div class="tableCellLeft">Long Bow</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1/2</div>
              <div class="tableCell">P</div>
              <div class="tableCell">Bow</div>
            </div>
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellLeft">Long Sling</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">-</div>
              <div class="tableCell">B</div>
              <div class="tableCell">Sling</div>
            </div>
            <div class="tableRow abilityFieldEven">
              <div class="tableCellFull">Large Weapons</div>
            </div>
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellLeft">Estoc</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1</div>
              <div class="tableCell">P</div>
              <div class="tableCell">Thrust Sword</div>
            </div>
            <div class="tableRow abilityFieldEven">
              <div class="tableCellLeft">Falchion</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1</div>
              <div class="tableCell">S</div>
              <div class="tableCell">Backsword</div>
            </div>
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellLeft">Greataxe</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1</div>
              <div class="tableCell">S</div>
              <div class="tableCell">Axe</div>
            </div> 
            <div class="tableRow abilityFieldEven">
              <div class="tableCellLeft">Greatsword</div>
              <div class="tableCell">1s</div>
              <div class="tableCell">1</div>
              <div class="tableCell">S/P</div>
              <div class="tableCell">Straight Sword</div>
            </div>
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellLeft">Kanabo</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1</div>
              <div class="tableCell">B</div>
              <div class="tableCell">Club</div>
            </div>
            <div class="tableRow abilityFieldEven">
              <div class="tableCellLeft">Maul</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1</div>
              <div class="tableCell">B</div>
              <div class="tableCell">Hammer</div>
            </div>
            <div class="tableRow abilityFieldOdd">
              <div class="tableCellLeft">Meteor Hammer</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1</div>
              <div class="tableCell">B</div>
              <div class="tableCell">Chain</div>
            </div> 
            <div class="tableRow abilityFieldEven abilityFieldLast">
              <div class="tableCellLeft">Spear</div>
              <div class="tableCell">1g</div>
              <div class="tableCell">1</div>
              <div class="tableCell">P</div>
              <div class="tableCell">Spear</div>
            </div> 
        </div>
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Weapons -->


    <!-- Armor and Shields -->   
    <section class="section" id="armorSection">
        <header class='sectionHeader hideWrapper'>
          <button id="showarmor" class="hidden showButton" onclick="show('armor');">Armor and Shields</button>
          <button id="hidearmor" class="hide" onclick="hide('armor');">[&#8213;]</button>  
        </header>

      <article id="armor" class='sectionBody'>
        <h1>Armor and Shields</h1>
        <div class="divider"></div>
        There are two types of armor: Light and Heavy. 
        <br/><br/>
        <div class="ritualFieldset abilityFieldset">
          <div class="ritualLegend abilityLegend">Armor List</div>
          <div class="mindColor tableRow">
            <div class="tableHeaderLeft">Item</div>
            <div class="tableHeader">Cost</div>
            <div class="tableHeader">Load</div>
            <div class="tableHeader">Location</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellFull">Armor</div>
          </div>
          <div class="tableRow abilityFieldOdd">
            <div class="tableCellLeft">Light</div>
            <div class="tableCell">12g</div>
            <div class="tableCell">1</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldEven">
            <div class="tableCellLeft">Heavy</div>
            <div class="tableCell">24g</div>
            <div class="tableCell">2</div>
            <div class="tableCell">Torso</div>
          </div>
          <div class="tableRow abilityFieldOdd abilityFieldLast">
            <div class="tableCellLeft">Shield</div>
            <div class="tableCell">1g</div>
            <div class="tableCell">1</div>
            <div class="tableCell">Torso</div>
          </div>
        </div>
        <br/>
        <b>Light Armor</b> is designed to provide some defense and impair as little movement as possible.
        <br/>
        Bonus
        <ul>
          <li>+1 Armor</li>
        </ul> 
        Impairs
        <ul>
          <li>Blast</li>
          <li>Sprinting and Swimming</li>
        </ul>
        Examples of Light armor:<br/>
        Lamellar, Brigandine, Breast plate, chain shirt 
        <br/><Br/>

        <b>Heavy Armor</b> focuses more on defense than mobility, and generally covers head to toe. 
        <br/>
        Bonus
        <ul>
          <li>+2 Armor</li>
        </ul>
        Impairs
        <ul>
          <li>Ranged Strikes</li>
          <li>Jumping, climbing, and jogging</li>
        </ul>
        Impairs Twice
        <ul>
          <li>Blast</li>
          <li>Sprinting and swimming</li>
          <li>Prevents use of Acrobatics and Sneak Tricks and Arcana</li>
        </ul>


        Examples of Heavy Armor:<br/>
        Scale, Ring, Splint, Laminar, Plate, o-yoroi

        <!--
        <h2>Heavy Armor</h2>
        Heavy armor is designed toward maximum protection at the most of mobility
        <br/>
        Effects
        <ul>
          <li>+3 Armor</li>
          <li>-1 Pace</li>
          <li>-3 to Blast Rolls</li>
          <li>-2 to hit with Ranged Strikes</li>
          <li>-3 to sprinting and swimming rolls</li>
          <li>-2 to jumping, climbing and jogging rolls<li>
          <li>-4 to all rolls when using the Acrobatics, Dancing or Sneaking skills</li>
          <li>Can not use any abilities from Acrobatics, Dancing or Sneaking skills</li>
        </ul>

        Examples of Heavy Armor:
        Plated Mail, Platedate Armor, o-yoroi
        --> 
        <br/><br/>
        <b>Shields</b><br/>
        Bonus
        <ul>
          <li>+1 Shield bonus to Guard<br/>
        </ul>
        Impair
        <ul>
          <li>Impairs Blast</li>
        </ul>

        <b>Large shields</b><br/>
        Bonus
        <ul>
          <li>+1 Shield bonus to Guard to you and peple you Cover</li>
        </ul>
        Impair
        <ul>
          <li>Impairs all Attacks</li>
        </ul>
        
      </article>
      <footer class="sectionFooter">
      </footer>
    </section>
    <!-- End Gear -->


</div>
<!-- D10 Ends Here -->

    </div>
</body>


</html>
