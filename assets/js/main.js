const modal = document.querySelector("#purchase-modal");
const modalOpenButton = document.querySelector("[data-modal-open]");
const modalCloseButton = document.querySelector("[data-modal-close]");

let lastFocusedElement = null;

const openModal = () => {
    if (!modal || !modalCloseButton) return;

    lastFocusedElement = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    modalCloseButton.focus();
};

const closeModal = () => {
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
};

if (modal && modalOpenButton && modalCloseButton) {
    modalOpenButton.addEventListener("click", (event) => {
        event.preventDefault();
        openModal();
    });

    modalOpenButton.addEventListener("keydown", (event) => {
        if (event.key === " ") {
            event.preventDefault();
            openModal();
        }
    });

    modalCloseButton.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });
}