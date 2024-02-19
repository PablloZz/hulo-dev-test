function createElement<T extends HTMLElement>(
  name: string,
  classes?: string[],
  attributes?: Record<string, string>
) {
  const element = document.createElement(name) as T;
  setElementAttributes(element, classes, attributes);

  return element;
}

function setElementAttributes<T extends HTMLElement>(
  element: T,
  classes?: string[],
  attributes?: Record<string, string>
) {
  element.classList.add(...classes);

  if (attributes) {
    Object.keys(attributes).map(key => {
      element.setAttribute(key, attributes[key]);
    });
  }
}

export { createElement };
