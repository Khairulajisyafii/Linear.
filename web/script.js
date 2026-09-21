document.addEventListener('DOMContentLoaded', () => {
    console.log("Dashboard Loaded Successfully!");
    
    // Setup interactivity for sidebar
    const sidebarItems = document.querySelectorAll('.sidebar li');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            sidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // --- Modal Preview Logic ---
    const previewModal = document.getElementById('previewModal');
    const modalTitle = document.getElementById('modalTitle');
    const closeModalBtn = document.getElementById('closeModal');
    const startRoadmapBtn = document.getElementById('startRoadmapBtn');
    
    // All buttons that trigger the preview
    const previewButtons = document.querySelectorAll('.preview-btn');

    previewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Get the title from data attribute
            const title = e.target.getAttribute('data-title');
            modalTitle.innerText = title;
            
            // Show modal
            previewModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent scrolling background
        });
    });

    // Close modal function
    const closeModal = () => {
        previewModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // restore scrolling
    };

    closeModalBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside content
    previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) {
            closeModal();
        }
    });

    // Action button inside modal
    startRoadmapBtn.addEventListener('click', () => {
        const currentTitle = modalTitle.innerText;
        alert(`Berhasil! Anda sekarang mengikuti roadmap: ${currentTitle}. Status di Dashboard akan diperbarui.`);
        closeModal();
        
        // Simulasikan merubah state "Roadmap Aktif" (Hanya visual demo)
        const emptyState = document.querySelector('.active-roadmap .empty-state');
        if (emptyState) {
            emptyState.innerHTML = `
                <div style="text-align: left; width: 100%;">
                    <h3 style="margin-bottom: 1rem;">Sedang Berjalan: ${currentTitle}</h3>
                    <p style="color: var(--text-light); margin-bottom: 1rem;">Lanjutkan langkah Anda selanjutnya!</p>
                    <div style="background: var(--white); border: 1px solid var(--gray); padding: 1rem; border-radius: 8px;">
                        <strong>Tahap 1:</strong> Riset & Persyaratan <br>
                        <progress value="20" max="100" style="width: 100%; margin-top: 10px;"></progress>
                    </div>
                </div>
            `;
        }
    });
});
