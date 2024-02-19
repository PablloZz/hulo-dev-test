function getPropertyValue<T extends HTMLElement>(element: T, property: string) {
  return window.getComputedStyle(element).getPropertyValue(property);
}

export { getPropertyValue };
