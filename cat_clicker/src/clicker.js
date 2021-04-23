
const handleImageClick = (elementId) => {
    const clicksElement = document.getElementById(elementId);
    if(clicksElement){
        const clicks = clicksElement.innerHTML || 0;
        clicksElement.innerHTML = parseInt(clicks) + 1;
    }
}

const textComponent = (componentId, text) => {
    const div = document.createElement('div');
    div.id="text";
    div.innerHTML = `
        <p id="${componentId}">${text}</p>
    `;
    return div;
}

const titleComponent = (componentId, text) => {
    const div = document.createElement('div');
    div.id="heading";
    div.innerHTML = `
        <h2 id="${componentId}">${text}</h1>
    `;
    return div;
}
const imageComponent = (componentId, src, onclick) => {
    const div = document.createElement('div');
    div.id = "img";
    div.innerHTML = `
        <img id="${componentId}" src="${src}" onclick="${onclick}" />
    `;
    return div;
}

const catClicker = (componentId, title, text, imgSrc) => {
    const textId= `clickerText-${componentId}`;
    const div = document.createElement('div');
    div.id="catClicker";
    const onImageClick = handleImageClick(textId);
    div.appendChild(titleComponent(`title-${componentId}`,title));
    div.appendChild(imageComponent(`image-${componentId}`, imgSrc, onImageClick));
    div.appendChild(textComponent(textId, text));
    return div;
}

const bodyContent = () => {
    const innitialText = "You have not clicked the image yet";
    const catClicker1 = catClicker("cat-clicker-1", "First Cat", innitialText, "./images/cat-banner.png");
    const catClicker2 = catClicker("cat-clicker-2", "Second Cat", innitialText, "./images/cat2.jpg");
    document.getElementById('body-content').appendChild(catClicker1);
    document.getElementById('body-content').appendChild(catClicker2);
}

window.onload = function() {
    bodyContent();
}