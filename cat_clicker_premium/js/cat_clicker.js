const cats = [
    {
        name: "cat 1",
        clicksCount: 0,
        url: "./images/cat1.png"
    },
    {
        name: "cat 2",
        clicksCount: 0,
        url: "./images/cat2.jpg"
    },
    {
        name: "cat 3",
        clicksCount: 0,
        url: "./images/cat3.jpg"
    },
    {
        name: "cat 4",
        clicksCount: 0,
        url: "./images/cat4.jpg"
    },
    {
        name: "cat 5",
        clicksCount: 0,
        url: "./images/cat5.jpg"
    }
]

$(function(){

    var model = {
        init: function() {
            if (!localStorage.cats) {
                localStorage.cats = JSON.stringify(cats);
                localStorage.currentCat = JSON.stringify({});
            }
        },

        increment: function(name) {
            const catList = JSON.parse(localStorage.cats);
            const index = catList?.indexOf(catList?.find( cat => cat.name == name));
            
            if(index => 0 && catList[index]) {
                catList[index].clicksCount += 1;
                localStorage.cats = JSON.stringify(catList);
                localStorage.currentCat = JSON.stringify(catList[index]);
            }
        },

        getAllCats: function() {
            return JSON.parse(localStorage.cats);
        },

        getCatByName: function(name) {
            return this.getAllCats()?.find(cat => cat.name == name);
        }
    };


    var octopus = {
        incrementCatClick: function(name) {
            model.increment(name);
            view.renderCurrentCat();
        },

        getCats: function() {
            return model.getAllCats();
        },

        existsCat: function(cat){
            return  this.getCats()?.find(item => item.name == cat.name);       
        },

        setCurrentCat: function(name) {
            const selectedCat = model.getCatByName(name);
            localStorage.currentCat = JSON.stringify(selectedCat);
            view.renderCurrentCat();
        },

        getCurrentCat: function() {
            return localStorage.currentCat;
        },

        clearCurrentCat: function() {
            localStorage.currentCat = JSON.stringify({});
            const catList = model.getAllCats();
            catList.map( cat => cat.clicksCount = 0);
            localStorage.cats = JSON.stringify(catList);
        },

        init: function() {
            model.init();
            view.init();
        }
    };

    var components = {
        paragraph: function(className, id, text){
            const p = document.createElement('p');
            p.className = className;
            p.id = id;
            p.innerText = text;
            return p;
        },

        image: function(className, id, src){
            const img = document.createElement('img');
            img.id = id;
            img.className = className;
            img.src = src;
            return img;
        },

        title: function(className, id, type, text){
            const title = document.createElement(type);
            title.id = id;
            title.className = className;
            title.textContent= text;
            return title;
        },

        button: function(className, id, textContent){
            var button = document.createElement('button');
            button.id = id;
            button.className = className;
            button.textContent = textContent;
            return button;
        },

        myAlert: function(text){
            alert(text);
        }
    };

    var view = {
        init: function() {
            this.catSelector = $('#cat-selector');
            this.currentCat = $('#current-cat')
            view.render();
        },

        render: function(){
            this.renderButtonsList();
            this.renderCurrentCat();
        },

        renderButtonsList: function(){
            const buttonList = [];
            octopus.getCats()?.forEach(function(cat){
                const catButton = components.button("cat-selector-button", `cat-selector-button-${cat?.name}`, cat?.name);
                catButton.addEventListener('click', ((catCopy) => function(){ octopus.setCurrentCat(catCopy?.name) })(cat));               
                buttonList?.push(catButton);
            });
            const clearButton = components.button("cat-selector-button", `cat-selector-button-clear`, "clear");
            clearButton.addEventListener('click', function(){ 
                octopus.clearCurrentCat();
                components.myAlert("Lets start again! all the data will be cleared. ") 
            });
            buttonList?.push(clearButton);
            this.catSelector.html = "";
            this.catSelector.append( buttonList );
        },

        renderCurrentCat: function(){
            const currentCat = JSON.parse(octopus.getCurrentCat());
            if(currentCat && octopus.existsCat(currentCat)){
               this.configureCurrentCatContext();

                let imageElement = components.paragraph("current-cat-text", "image-error", "The image could not be load from the source");
                
                if(currentCat?.url){
                    imageElement = components.image("current-cat-img", "current-cat-img", currentCat?.url);
                    imageElement.addEventListener('click', function(){ octopus.incrementCatClick(currentCat?.name) });
                }

                this.currentCat.empty();
                this.currentCat.append( components.title("current-cat-title", "current-cat-title", "h3", currentCat?.name) );
                this.currentCat.append( imageElement );
                this.currentCat.append( components.paragraph("current-cat-text", "current-cat-text", `Number of clicks: ${currentCat?.clicksCount || 0}`) );
            }
        },

        configureCurrentCatContext: function(){ 
            if(!this.currentCat.hasClass("current-cat")){
                $('#current-cat-before').append( components.title("current-cat-primary-title", "current-cat-heading", "h2", "Now click on your cat!") ); 
                this.currentCat.removeClass("current-cat-empty");
                this.currentCat.addClass("current-cat");
            }
        }
    }

    octopus.init();
});