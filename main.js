document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    const mainPhoto = document.querySelector('.main-photo img');
    const galleryPhotos = document.querySelectorAll('.photo-gallery img');
    
    // Map regular photos to their modal versions
    const modalPhotos = {
        'src/ph/ph1.png': 'src/ph/ph1.png',
        'src/ph/ph2.png': 'src/ph/vitalikmodal1.png',  // First additional photo maps to modal1
        'src/ph/ph3.png': 'src/ph/vitalikmodal2.png'   // Second additional photo maps to modal2
    };
    
    const allPhotos = [
        mainPhoto,
        ...galleryPhotos
    ];
    let currentPhotoIndex = 0;

    // Function to update modal image
    function updateModalImage(index) {
        currentPhotoIndex = index;
        const clickedPhoto = allPhotos[index];
        const regularSrc = clickedPhoto.getAttribute('src'); // Use getAttribute instead of .src
        const fullPath = regularSrc;
        modalImg.src = modalPhotos[fullPath] || regularSrc;
        
        modalImg.onload = function() {
            const modalHeight = window.innerHeight * 0.8;
            this.style.height = modalHeight + 'px';
            this.style.width = 'auto';
            this.style.objectFit = 'contain';
        };
    }

    function navigatePhoto(direction) {
        currentPhotoIndex = (currentPhotoIndex + direction + allPhotos.length) % allPhotos.length;
        updateModalImage(currentPhotoIndex);
    }

    // Open modal when clicking any photo
    function openModal(index) {
        modal.style.display = 'flex';
        currentPhotoIndex = index;
        updateModalImage(currentPhotoIndex);
        document.body.style.overflow = 'hidden';
    }

    // Add click handlers to all photos
    mainPhoto.addEventListener('click', () => openModal(0));
    galleryPhotos.forEach((photo, index) => {
        photo.addEventListener('click', () => openModal(index + 1));
    });

    // Add click handlers for arrow buttons
    document.querySelector('.left-arrow').addEventListener('click', function(e) {
        e.stopPropagation();
        navigatePhoto(-1);
    });

    document.querySelector('.right-arrow').addEventListener('click', function(e) {
        e.stopPropagation();
        navigatePhoto(1);
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                navigatePhoto(-1);
            } else if (e.key === 'ArrowRight') {
                navigatePhoto(1);
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target === modal.firstElementChild) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Prevent click on image from closing modal
    modalImg.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Connect modal functionality
    const connectModal = document.getElementById('connectModal');
    const connectBtn = document.querySelector('.register-btn');
    const closeConnectBtn = document.querySelector('.close-connect-modal');

    // Open connect modal
    connectBtn.addEventListener('click', function() {
        connectModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close connect modal
    closeConnectBtn.addEventListener('click', function() {
        connectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close on outside click
    connectModal.addEventListener('click', function(e) {
        if (e.target === connectModal) {
            connectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Write modal functionality
    const writeModal = document.getElementById('writeModal');
    const successModal = document.getElementById('successModal');
    const writeBtn = document.querySelector('.write-btn');
    const sendMessageBtn = document.querySelector('.send-message-btn');
    const closeSuccessBtn = document.querySelector('.close-success-modal');
    const messageInput = document.querySelector('.message-input');

    // Open write modal
    writeBtn.addEventListener('click', function() {
        writeModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Send message and show success
    sendMessageBtn.addEventListener('click', function() {
        if (messageInput.value.trim() === '') {
            messageInput.classList.add('invalid');
            messageInput.addEventListener('input', function() {
                messageInput.classList.remove('invalid');
            }, { once: true });
        } else {
            writeModal.style.display = 'none';
            successModal.style.display = 'flex';
            messageInput.value = '';
            messageInput.classList.remove('invalid');
        }
    });

    // Close success modal
    closeSuccessBtn.addEventListener('click', function() {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modals on outside click
    writeModal.addEventListener('click', function(e) {
        if (e.target === writeModal) {
            writeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
