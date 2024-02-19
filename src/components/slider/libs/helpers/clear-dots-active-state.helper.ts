function clearDotsActiveState(dots: HTMLDivElement) {
  (Array.from(dots.children) as HTMLDivElement[]).forEach(dot => {
    dot.classList.remove("active");
  });
}

export { clearDotsActiveState };
