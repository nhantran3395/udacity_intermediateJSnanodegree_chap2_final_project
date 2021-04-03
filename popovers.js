const popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]'),
);
popoverTriggerList.map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl),
);
