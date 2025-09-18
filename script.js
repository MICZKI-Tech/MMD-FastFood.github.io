// Nawigacja między sekcjami
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Usuń klasę active ze wszystkich linków
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Dodaj klasę active do klikniętego linku
        this.classList.add('active');
        
        // Ukryj wszystkie sekcje
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Pokaż odpowiednią sekcję
        const sectionId = this.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
        
        // Przewiń do góry strony
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Filtrowanie menu
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Usuń klasę active ze wszystkich przycisków
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        
        // Dodaj klasę active do klikniętego przycisku
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        
        // Pokaż/ukryj elementy menu
        document.querySelectorAll('.menu-item').forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Symulacja zamówienia
document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function() {
        const itemName = this.parentElement.querySelector('.menu-item-title').textContent;
        const itemPrice = this.parentElement.querySelector('.menu-item-price').textContent;
        
        // Tworzymy modal/popup z potwierdzeniem
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
        
        modal.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 10px; text-align: center; max-width: 400px;">
                <h2 style="color: #ff6b6b; margin-bottom: 1rem;">Dodano do koszyka!</h2>
                <p style="margin-bottom: 1rem;">${itemName}</p>
                <p style="font-weight: bold; color: #4ecdc4; margin-bottom: 1.5rem;">${itemPrice}</p>
                <button id="close-modal" style="background: #ff6b6b; color: white; border: none; padding: 0.7rem 1.5rem; border-radius: 5px; cursor: pointer;">Zamknij</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Dodajemy obsługę zamknięcia modala
        document.getElementById('close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
    });
});

// Inicjalizacja strony - ukryj wszystkie sekcje poza aktywną
document.addEventListener('DOMContentLoaded', function() {
    // Ukryj wszystkie sekcje poza aktywną
    document.querySelectorAll('.section').forEach(section => {
        if (!section.classList.contains('active')) {
            section.style.display = 'none';
        }
    });
    
    // Dodaj efekt wczytywania dla lepszego UX
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
