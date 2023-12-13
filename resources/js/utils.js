export const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.visibility = 'visible';
                entry.target.classList.add('rotateXIn');
            }, 250);
        }
    });
});
