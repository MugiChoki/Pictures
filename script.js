document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.box img');
    const captions = document.querySelectorAll('.box h3');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    const closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.innerHTML = '&times;';
    lightbox.appendChild(closeButton);

    const lightboxImage = document.createElement('img');
    lightbox.appendChild(lightboxImage);

    const captionText = document.createElement('div');
    captionText.classList.add('caption');
    lightbox.appendChild(captionText);

    const prevButton = document.createElement('button');
    prevButton.classList.add('prev');
    prevButton.innerHTML = '&#10094;';
    lightbox.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.classList.add('next');
    nextButton.innerHTML = '&#10095;';
    lightbox.appendChild(nextButton);

    let currentIndex = 0;

    function showImage(index) {
        if (index < 0 || index >= images.length) return;
        lightboxImage.src = images[index].src;
        captionText.innerHTML = captions[index].innerText;
        lightbox.classList.add('active');
        currentIndex = index;
    }

    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            showImage(index);
        });
    });

    closeButton.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImage && e.target !== prevButton && e.target !== nextButton) {
            lightbox.classList.remove('active');
        }
    });

    prevButton.addEventListener('click', () => {
        showImage(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showImage(currentIndex + 1);
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                showImage(currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showImage(currentIndex + 1);
            } else if (e.key === 'Escape') {
                lightbox.classList.remove('active');
            }
        }
    });

    // Swipe gesture detection
    let startX = 0;
    let endX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    lightbox.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    lightbox.addEventListener('touchend', () => {
        if (startX - endX > 50) {
            showImage(currentIndex + 1); // Swipe left to show next image
        } else if (endX - startX > 50) {
            showImage(currentIndex - 1); // Swipe right to show previous image
        }
    });
});
