var metadata = {"author":"Lisandro Ronconi", 
                "name":"SplitPage for Facebook", 
                "description":"Split Facebook home Page into two main sections: menu and wall. Also it adds some shortcuts to relevant functionalities",
                "id":"splitPage-facebook-licha"};

function getAccessibilityAugmenter(){
    return new FacebookListSplitWrapper();
};

function FacebookListSplitWrapper(){
	this.languages = {"es":{},"en":{}};
	this.languages["es"]["main"] = "Principal";
	this.languages["es"]["menu"] = "Menu izquierdo";
	this.languages["es"]["toolbar"] = "Herramientas";
	this.languages["es"]["recomendaciones"] = "Cumpleaños y recomendaciones";
};

FacebookListSplitWrapper.prototype = new AbstractInstanceRefactoring();

FacebookListSplitWrapper.prototype.setTargetURLs = function(){
    this.addTargetURL(/https:\/\/www.facebook.com\//);
};

FacebookListSplitWrapper.prototype.initialize = function (language) {

    var refactoring = new SplitPage.SplitPage("Facebook page");

    var main = new SplitPage.SplitedSection(this.languages[language]["main"], refactoring);
    main.addElement(".//*[@id='contentArea']");


    //document.evaluate("//*[@id='blueBar']", document, null, XPathResult.ANY_TYPE, null).iterateNext().setAttribute("style", "position:absolute !important")
    var menu = new SplitPage.SplitedSection(this.languages[language]["menu"], refactoring);
    menu.addElement(".//*[@id='leftCol']");

    var tools = new SplitPage.SplitedSection(this.languages[language]["toolbar"], refactoring);
    tools.addElement(".//*[@id='pagelet_bluebar']");

    var recomendacion = new SplitPage.SplitedSection(this.languages[language]["recomendaciones"], refactoring);
    recomendacion.addElement(".//*[@id='rightCol']");


    refactoring.addSplitedSection(main);
    refactoring.addSplitedSection(menu);
    refactoring.addSplitedSection(tools);
    refactoring.addSplitedSection(recomendacion);

    refactoring.setAsFirstSplitedSection();

    refactoring.setAsMain(main);
    this.abstract_refactoring = refactoring;

};

FacebookListSplitWrapper.prototype.initRefactoringForPageLoaded = function(doc,language){
	
};

//override
FacebookListSplitWrapper.prototype.adaptDocument = function (doc) {
    if (doc.body.getAttribute("class").indexOf("home") > -1) {
        //esta en el muro de alguien logueado
        this.abstract_refactoring.adaptDocument(doc);
    }
};
