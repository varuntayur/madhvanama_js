
this.introSec2ShlokasEng = {};
this.aboutSripada2ShlokasEng = {}
this.madhSecName2ShlokasEng = {};
this.madhSecName2ShlokasKan = {};
this.madhSecName2ShlokasSan = {};

this.my_media;
this.aboutSripadarajaruCached = null;
this.madhvanamaCached = null;
this.introCached = null;

this.isManualStop = false;
this.forceAudioPlayStop = false;
this.mediaIndex = 0;
this.audioPlayType = null;
this.madhvanama2ShlokaMediaList = {};

this.madhvanamaMediaList = ["madhvanama1_0.aac",
    "madhvanama1_1.aac", "madhvanama1_2.aac",
    "madhvanama1_3.aac", "madhvanama1_4.aac",
    "madhvanama1_5.aac", "madhvanama1_6.aac",
    "madhvanama1_7.aac", "madhvanama1_8.aac",
    "madhvanama1_9.aac", "madhvanama1_10.aac",
    "madhvanama1_11.aac", "madhvanama1_12.aac",
    "madhvanama1_13.aac", "madhvanama1_14.aac",
    "madhvanama1_15.aac", "madhvanama1_16.aac",
    "madhvanama1_17.aac", "madhvanama1_18.aac",
    "madhvanama1_19.aac", "madhvanama1_20.aac",
    "madhvanama1_21.aac", "madhvanama1_22.aac",
    "madhvanama1_23.aac", "madhvanama1_24.aac",
    "madhvanama1_25.aac", "madhvanama1_26.aac",
	"madhvanama1_27.aac", "madhvanama1_28.aac",
	"madhvanama1_29.aac", "madhvanama1_30.aac"];
	
var app = {
    initialize: function () {
        loading('show');
		console.log('initialize application');
        this.loadData();
        this.bindEvents();
        loading('hide');
    },
    bindEvents: function () {
        /*document.addEventListener('deviceready', this.onDeviceReady, false);*/
        document.addEventListener('backbutton', this.backButtonCallback, false);
        $('#listviewMainMenu').on('click', 'li', function () {
            var selected_index = $(this).index();
            if (selected_index > 0) {

                loading('show');
                var listIndex = "li." + selected_index;
                var menuName = $('#listviewMainMenu').children(listIndex).text().trim();
                mediaIndex = 0;
                forceAudioPlayStop = false;
                switch (menuName) {

                    case "ಮಧ್ವನಾಮಾ ಪರಿಚಯ":
                        app.loadIntroduction();
                        break;
                    case "ಶ್ರೀಪಾದರಾಜರು":
                        app.loadAboutSripadarajaru();
                        break;
                    case "ಮಧ್ವನಾಮಾ":
                        app.loadMadhvanama();
                        break;                    
                }

                loading('hide');
            }

        });
        $('#collapserAboutSripada').on('click', this.collapseAll);
        $('#expanderAboutSripada').on('click', this.expandAll);
		
        $('#collapserMenuMadhvanama').on('click', this.collapseAll);
        $('#expanderMenuMadhvanama').on('click', this.expandAll);
        
        $('#saveSettings').on("click", this.saveSettings);
        $("#popupSettings").bind({
            popupbeforeposition: function (event, ui) {

                if (localStorage.languageSelected !== null) {
                    $("input[name=radio-choice-lang][value=" + localStorage.languageSelected + "]").prop('checked', true);
                }
                if (localStorage.learningMode !== null) {
                    $("#slider-flip-learn").val(localStorage.learningMode).slider('refresh');
                }

                console.log('--Displaying the saved settings--');
                console.log(localStorage.languageSelected);
                console.log(localStorage.learningMode);
                console.log('----');
            }
        });
        $(window).on("navigate", function (event, data) {
            var direction = data.state.direction;
            if (direction === 'back') {
                console.log('Back button pressed');
                this.stopAudio();
            }
            if (direction === 'forward') {
                console.log('forward  button pressed');
                this.stopAudio();
            }
        });
    },
    loadData: function () {

        /* introduction  */
        $.getJSON("data/introduction-eng.json", function (data) {
            var sections = data["sections"];
            console.log('No. of sections in introduction (Eng) :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
                introSec2ShlokasEng[secName] = shlokaList;
            }

        });
        /* about sripadarajaru */
        $.getJSON("data/aboutsripadarajaru-eng.json", function (data) {
            var sections = data["sections"];
            console.log('No. of sections in About Sripadarajaru (Eng) :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
                aboutSripada2ShlokasEng[secName] = shlokaList;
            }

        });
				
		/* madhvanama */
		$.getJSON("data/madhvanama-eng.json", function (data) {
            var sections = data["sections"];
            console.log('No. of sections in Madhvanama (Eng) :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName + ' Shloka Count:' + shlokaList.length);
                madhSecName2ShlokasEng[secName] = shlokaList;
            }

        });
		
        $.getJSON("data/madhvanama-kan.json", function (data) {
            var sections = data["sections"];
            console.log('No. of sections in Madhvanama (Kan)  :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName + ' Shloka Count:' + shlokaList.length);
                madhSecName2ShlokasKan[secName] = shlokaList;
            }

        });
        $.getJSON("data/madhvanama-san.json", function (data) {
            var sections = data["sections"];
            console.log('No. of sections in Madhvanama (San) :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName + ' Shloka Count:' + shlokaList.length);
                madhSecName2ShlokasSan[secName] = shlokaList;
            }

        });
      
        madhvanama2ShlokaMediaList["madhvanama"] = madhvanamaMediaList;
		console.log('Madhvanama Media Count :' + madhvanama2ShlokaMediaList["madhvanama"].length);
		
        app.setDefaultSettings();
    },
    setDefaultSettings: function () {
        if (localStorage.languageSelected === undefined) {

            localStorage.languageSelected = "kannada";
            console.log('setting the default language to sanskrit');
        }

        if (localStorage.learningMode === undefined) {
            console.log('setting the default learning mode to on');
            localStorage.learningMode = "on";
        }
    },
    saveSettings: function () {
        window.localStorage.setItem("learningMode", $("#slider-flip-learn").val());
        window.localStorage.setItem("languageSelected", $('input[name=radio-choice-lang]:checked').val());
        console.log('--Saved the settings--');
        console.log('Language:' + localStorage.languageSelected);
        console.log('Learning Mode:' + localStorage.learningMode);
        console.log('----');
                
        $("#listviewMadhvanama").empty();
    
    },
    collapseAll: function () {
        $('[data-role="collapsible"]').each(function () {
            var coll = $(this);
            coll.collapsible({collapsed: true});
        });
    },
    expandAll: function () {
        $('[data-role="collapsible"]').each(function () {
            var coll = $(this);
            coll.collapsible({collapsed: false});
        });
    },
    loadIntroduction: function () {
        $.mobile.navigate("#introduction");
        var parentElementDiv = '#listviewIntro';
        if (introCached !== null) {			
            console.log("intro, loading cached contents");
            $(parentElementDiv).append(introCached);
            $('[data-role="collapsible"]').parent().enhanceWithin();
            return;
        }

        // shlokas to be displayed in one page
        console.log("intro, building the contents with learning mode off");
        introCached = app.buildIntroPage(parentElementDiv);
        loading('hide');
    },
	
	loadAboutSripadarajaru: function () {
        $.mobile.navigate("#aboutSripadarajaru");
        var parentElementDiv = '#listviewAboutSripada';
        if (aboutSripadarajaruCached !== null) {			
            console.log("aboutSripadarajaru, loading cached contents");
            $(parentElementDiv).append(aboutSripadarajaruCached);
            $('[data-role="collapsible"]').parent().enhanceWithin();
            return;
        }

        // shlokas to be displayed in one page
        console.log("aboutSripadarajaru, building the contents with learning mode off");
        aboutSripadarajaruCached = app.buildAboutSripadarajaruPage(parentElementDiv);
        loading('hide');
    },
    
    loadMadhvanama: function () {
        $.mobile.navigate("#madhvanama");
        var parentElementDiv = '#listviewMadhvanama';        

        // shlokas to be displayed in one page
        if (localStorage.learningMode === 'off') {
			$(parentElementDiv).empty();
            console.log("madhvanama, building the contents with learning mode off");
            app.buildMadhvanamaInSinglePage(parentElementDiv);
			
        }
        else {
			$(parentElementDiv).empty();
            console.log("madhvanama, building the contents with learning mode on");
            app.buildMadhvanama(parentElementDiv, 'on');
        }
        loading('hide');
    },
	
	buildAboutSripadarajaruPage: function (parentElementDiv) {

        var secNum = 1;
        for (var key in aboutSripada2ShlokasEng) {
            console.log('Building aboutSripadarajaru for section:' + key);
            var shlokaListEng = aboutSripada2ShlokasEng[key];
            introCached = app.buildIntroContent(shlokaListEng, parentElementDiv);
            secNum++;
        }
    },
    
    buildIntroPage: function (parentElementDiv) {

        var secNum = 1;
        for (var key in introSec2ShlokasEng) {
            console.log('Building intro for section:' + key);
            var shlokaListEng = introSec2ShlokasEng[key];
            introCached = app.buildIntroContent(shlokaListEng, parentElementDiv);
            secNum++;
        }
    },
    buildMadhvanama: function (parentElementDiv) {
		
        var secNum = 1;
        for (var key in madhSecName2ShlokasEng) {
            console.log('Building madhvanama for section:' + key);
            //var headerSection = "<div data-role='header'><h1>" + key + "</h1></div>";
            //$(parentElementDiv).append(headerSection);
            var shlokaListEng = madhSecName2ShlokasEng[key];
            var shlokaListKan = madhSecName2ShlokasKan[key];
            var shlokaListSan = madhSecName2ShlokasSan[key];
            app.buildMadhvanamaContent('madhvanama', secNum, shlokaListEng, shlokaListSan, shlokaListKan, parentElementDiv);
            secNum++;
        }		
    },
    buildMadhvanamaInSinglePage: function (parentElementDiv) {

        var secNum = 1;
        for (var key in madhSecName2ShlokasEng) {
            console.log('Building madhvanama for section:' + key);
            //var headerSection = "<div data-role='header'><h1>" + key + "</h1></div>";
            //$(parentElementDiv).append(headerSection);
            var shlokaListEng = madhSecName2ShlokasEng[key];
            var shlokaListKan = madhSecName2ShlokasKan[key];
            var shlokaListSan = madhSecName2ShlokasSan[key];
            app.buildMadhvanamaContentInOnePage('madhvanama', shlokaListEng, shlokaListSan, shlokaListKan, parentElementDiv);
            secNum++;
        }
    },
    
    buildMadhvanamaContentInOnePage: function (type, engList, sanList, kanList, parentElementDiv) {

        audioPlayType = type;
        var shlokaContentPrelude = "<fieldset class='ui-grid-e center'>";
        shlokaContentPrelude += "<div class='ui-block-b'><button class='ui-btn ui-icon-delete ui-btn-icon-left' onclick=\"stopAudioLoop(" + true + ")\">Stop</button></div>";
        shlokaContentPrelude += "<div class='ui-block-c'><button class='ui-btn ui-icon-audio ui-btn-icon-left' onclick=\"playAudioLoop()\">Play</button></div>";
        shlokaContentPrelude += "</fieldset>";
        $(parentElementDiv).append(shlokaContentPrelude);
        for (var shlokaNum = 0; shlokaNum < engList.length; shlokaNum++) {

            var shlokaEng = engList[shlokaNum];
            var shlokaKan = kanList[shlokaNum];
            var shlokaSan = sanList[shlokaNum];
            var shlokaTextEng = shlokaEng["text"];
            var shlokaTextKan = shlokaKan["text"];
            var shlokaTextSan = shlokaSan["text"];
            var shlokaContent = "<p>";
            shlokaContent += "<h3>" + 'Shloka ' + (shlokaEng["num"] === '0' ? "Dhyanam" : shlokaEng["num"]) + "</h3>";
            shlokaContent += "<p>" + shlokaTextEng.replace(/\n/g, '<br/>') + "</p>";
            if (localStorage.languageSelected === 'kannada')
                shlokaContent += "<p>" + shlokaTextKan.replace(/\n/g, '<br/>') + "</p>";
            if (localStorage.languageSelected === 'sanskrit')
                shlokaContent += "<p>" + shlokaTextSan.replace(/\n/g, '<br/>') + "</p>";
            shlokaContent += "<a href='#' onclick='$.mobile.silentScroll(0)'>Back To Top</a>";
            shlokaContent += "</p>";
            shlokaContentPrelude += shlokaContent;
            $(parentElementDiv).append(shlokaContent);
        }        
    },
    buildIntroContent: function (engList, parentElementDiv) {

        for (var shlokaNum = 0; shlokaNum < engList.length; shlokaNum++) {

            var shlokaEng = engList[shlokaNum];
            var shlokaTextEng = shlokaEng["text"];
            var shlokaEngExp = shlokaEng["explanation"];
            var notesList = shlokaEngExp["notesList"];
            var shlokaContent = "<p>" + shlokaTextEng.replace(/\n/g, '<br/>') + "</p>";
            $(parentElementDiv).append(shlokaContent);
            var iterShlokaContent = "";
            for (var k = 0; k < notesList.length; k++) {
                var notes = notesList[k];
                var expTitle = notes["title"];
                var expText = notes["text"];
                iterShlokaContent += "<p><b>" + expTitle + "</b></p>";
                iterShlokaContent += "<p>" + expText.replace(/\n/g, '<br/>') + "</p>";
                iterShlokaContent += "<a href='#' onclick='$.mobile.silentScroll(0)'>Back To Top</a>";
            }
            $(parentElementDiv).append(iterShlokaContent);
        }
        $('[data-role="collapsible"]').parent().enhanceWithin();
        return shlokaContent + iterShlokaContent;
    },
    buildMadhvanamaContent: function (type, secNum, engList, sanList, kanList, parentElementDiv) {

        for (var shlokaNum = 0; shlokaNum < engList.length; shlokaNum++) {

            var shlokaEng = engList[shlokaNum];
            var shlokaKan = kanList[shlokaNum];
            var shlokaSan = sanList[shlokaNum];
            var shlokaTextEng = shlokaEng["text"];
            var shlokaTextKan = shlokaKan["text"];
            var shlokaTextSan = shlokaSan["text"];
            var shlokaEngExp = shlokaEng["explanation"];
            var notesList = shlokaEngExp["notesList"];
            if (type !== null) {
                var shlokaContent = "<div data-role='collapsible' data-theme='b'>";
                shlokaContent += "<fieldset class='ui-grid-e center'>";
                shlokaContent += "<div class='ui-block-b'><button class='ui-btn ui-icon-delete ui-btn-icon-left' onclick=\"stopAudio()\">Stop</button></div>";
                var audioFile = "audio/" + type + secNum + "_" + shlokaNum + ".aac";
                shlokaContent += "<div class='ui-block-c'><button class='ui-btn ui-icon-audio ui-btn-icon-left' onclick=\"playAudio('" + audioFile + "')\">Play</button></div>";
                shlokaContent += "</fieldset>";
            }
            shlokaContent += "<h3>" + 'Shloka ' + (shlokaEng["num"] === '0' ? "Dhyanam" : shlokaEng["num"]) + "</h3>";
            shlokaContent += "<p>" + shlokaTextEng.replace(/\n/g, '<br/>') + "</p>";
            if (localStorage.languageSelected === 'kannada')
                shlokaContent += "<p>" + shlokaTextKan.replace(/\n/g, '<br/>') + "</p>";
            if (localStorage.languageSelected === 'sanskrit')
                shlokaContent += "<p>" + shlokaTextSan.replace(/\n/g, '<br/>') + "</p>";
			var explanation = '';			
            for (var k = 0; k < notesList.length; k++) {
				
                var notes = notesList[k];
                var expTitle = notes["title"];
                var expText = notes["text"];
                explanation += "<p><b>" + expTitle + "</b></p>";
                explanation += "<p>" + expText.replace(/\n/g, '<br/>') + "</p>";
                explanation += "<a href='#' onclick='$.mobile.silentScroll(0)'>Back To Top</a>";               				
            }	
			shlokaContent += explanation;		
			$(parentElementDiv).append(shlokaContent);				
        }
        $('[data-role="collapsible"]').parent().enhanceWithin();
    },
    
    backButtonCallback: function () {
        console.log('Back button pressed..');
        forceAudioPlayStop = true;
        stopAudio();
        $.mobile.navigate("#home");
        return false;
    }
    
};
function loading(showOrHide) {
    if (showOrHide === 'show') {
        $("body").addClass("loading");
    }
    else
        $("body").removeClass("loading");
}
// Play audio
//
function playAudio(src) {

    if (this.my_media !== null)
        stopAudio();
    var path = window.location.pathname;
    path = path.substr(path, path.length - 10);
    // Create Media object from src 
    this.my_media = new Media('file://' + path + src, onSuccess, onError);	
	console.log('playing track' + 'file://' + path + src);
    // Play audio
    this.my_media.play();
}

function playAudioLoop() {

    var mediaPlaylist = madhvanama2ShlokaMediaList[audioPlayType];
    if (this.mediaIndex > (mediaPlaylist.length - 1)) {
        console.log("playAudioLoop():Play Audio reached end of list." + this.mediaIndex + "/" + mediaPlayList.length);
        return;
    }
    var curMediaItem = "audio/" + mediaPlaylist[this.mediaIndex++];
    if (this.my_media) {
        this.stopAudio();
        console.log("stopAudio():Stop Audio Success");
    }

    var path = window.location.pathname;
    path = path.substr(path, path.length - 10);
    this.my_media = new Media('file://' + path + curMediaItem, onSuccessLoop, onErrorLoop, onStatus);
    this.my_media.play();
    console.log("playAudioLoop():Play Audio Success" + curMediaItem);
}

function stopAudioLoop(isManualStop) {
    if (this.my_media) {
        forceAudioPlayStop = Boolean(isManualStop);
        this.my_media.stop();
        this.my_media = null;
        console.log("stopAudioLoop():Stop Audio Loop Success");
    }
}

function stopAudio() {
    if (this.my_media) {
        this.my_media.stop();
        this.my_media = null;
        console.log("stopAudio():Stop Audio Success");
    }
}

function onSuccessLoop() {
    console.log("playAudioLoop():Audio Success");
    this.my_media = null;
}

function onSuccess() {
    console.log("playAudio():Audio Success");
    this.my_media = null;
}

function onErrorLoop(error) {
    console.log('Encountered an error trying to play the sound track. Details: code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}

function onError(error) {
    console.log('Encountered an error trying to play the sound track. Details: code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}
function onStatus(status) {
    if (status === Media.MEDIA_STOPPED) {
        console.log("playAudio():Audio stop success, will begin next track");
        if (forceAudioPlayStop) {
            forceAudioPlayStop = false;
            return;
        }
        playAudioLoop();
    }
}


