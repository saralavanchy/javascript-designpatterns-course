const image = (componentId, src, elementId) => {
    const img = document.createElement('img');
    img.id = `img-${componentId}`;
    img.src = src;
    img.onclick = function() {handleImageClick(elementId)};
    img.style.borderRadius="8px";
    img.style.width="500px";
    img.style.height="400px";
    return img;
}

const Text = (componentId, text) => {
    const div = document.createElement('div');
    div.id="text";
    div.innerHTML = `
        <p id="${componentId}">${text}</p>
    `;
    return div;
}

const Title = (componentId, text) => {
    const div = document.createElement('div');
    div.id="heading";
    div.innerHTML = `
        <h2 id="${componentId}">${text}</h1>
    `;
    return div;
}

function handleImageClick(elementId) {
    const clicksElement = document.getElementById(elementId);
    console.log()
    if(clicksElement){
        const clicks = parseInt(clicksElement.innerHTML) ? parseInt(clicksElement.innerHTML) : 0;
        clicksElement.innerHTML = parseInt(clicks) + 1;
    }
}

const catClicker = (componentId, title, text, imgSrc) => {
    const textId= `clickerText-${componentId}`;
    const div = document.createElement('div');
    div.id="catClicker-component";
    div.appendChild(Title(`title-${componentId}`,title));
    div.appendChild(image(`image-${componentId}`, imgSrc, textId));
    div.appendChild(Text(textId, text));
    return div;
}

const bodyContent = () => {
    const innitialText = "You have not clicked the image yet";
    const div = document.createElement('div');
    div.style.display="flex";
    div.style.flexDirection="row";
    div.id="catClicker-row";
    div.appendChild(catClicker("cat-clicker-1", "First Cat", innitialText, "./images/cat-banner.png"));
    div.appendChild(catClicker("cat-clicker-2", "Second Cat", innitialText, "./images/cat2.jpg"));
    document.getElementById('body-content').appendChild(div);
}

window.onload = function() {
    bodyContent();
}