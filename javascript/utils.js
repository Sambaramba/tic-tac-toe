console.log("utils file loaded");

export function createDomElement(element, text, elementId, elementClass, attributes = {}) {
       const domElement = document.createElement(element);
       if(text) {domElement.textContent = text}
       if(elementId) { domElement.id = elementId}
       if(elementClass) { domElement.classList.add(elementClass)}
       if(attributes) {
         Object.entries(attributes).forEach(([key, value]) => {
            domElement.setAttribute(key, value);
         });
       }   
       return domElement;
}