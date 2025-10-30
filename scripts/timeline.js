// ===== SISTEMA DE TIMELINE INTERATIVA =====

class TimelineManager {
    constructor() {
        this.timelineData = [
            {
                year: '2016',
                image: 'foto-2016.JPG',
                title: 'O Início de Tudo',
                memory: 'Onde nossa história começou...<br>Nosso primeiro capítulo de amor. ❤️',
                emoji: '💕',
                color: '#ff6b9d'
            },
            {
                year: '2017', 
                image: 'foto-2017.JPG',
                title: 'Descobrindo o Amor',
                memory: 'Conhecendo cada detalhe seu,<br>cada dia mais apaixonado. 💕',
                emoji: '🌹',
                color: '#667eea'
            },
            {
                year: '2018',
                image: 'foto-2018.jpg',
                title: 'Construindo Sonhos',
                memory: 'Sonhos realizando,<br>construindo nosso futuro. ✨',
                emoji: '⭐',
                color: '#ffd700'
            },
            {
                year: '2019',
                image: 'foto-2019.jpg',
                title: 'Momentos Dourados',
                memory: 'Celebrando cada conquista,<br>ao seu lado tudo ganha cor. 🌟',
                emoji: '🎉',
                color: '#ff6347'
            },
            {
                year: '2020',
                image: 'foto-2020.jpg',
                title: 'Força Juntos',
                memory: 'Enfrentando desafios juntos,<br>descobrindo nossa força. 💪',
                emoji: '💪',
                color: '#98fb98'
            },
            {
                year: '2021',
                image: 'foto-2021.jpg',
                title: 'Renovação',
                memory: 'Renascendo juntos,<br>o amor se renovando. 🌸',
                emoji: '🌸',
                color: '#dda0dd'
            },
            {
                year: '2022',
                image: 'foto-2022.jpg',
                title: 'Crescimento',
                memory: 'Crescendo e amadurecendo,<br>nosso amor mais forte. 🌱',
                emoji: '🌱',
                color: '#90ee90'
            },
            {
                year: '2023',
                image: 'foto-2023.jpg',
                title: 'Tesouros do Coração',
                memory: 'Tesouros guardados no coração,<br>momentos preciosos que vivemos. 💎',
                emoji: '💎',
                color: '#87ceeb'
            },
            {
                year: '2024',
                image: 'foto-2024.jpg',
                title: 'Realizando Sonhos',
                memory: 'Construindo nosso futuro,<br>realizando sonhos lado a lado. 🏠',
                emoji: '🏠',
                color: '#f0a0a0'
            },
            {
                year: '2025',
                image: 'foto-2025.jpg',
                title: 'Celebração Especial',
                memory: 'Hoje celebrando você,<br>e todos os anos que virão! 🎂',
                emoji: '🎂',
                color: '#ff69b4'
            }
        ];
        
        this.currentIndex = 0;
        this.isAnimating = false;
        
        this.init();
    }

    init() {
        this.createTimeline();
        this.setupScrollObserver();
        this.setupKeyboardNavigation();
        this.setupTouchNavigation();
    }

    createTimeline() {
        const container = document.getElementById('timeline-items');
        if (!container) return;

        // Limpar container
        container.innerHTML = '';

        this.timelineData.forEach((item, index) => {
            const timelineItem = this.createTimelineItem(item, index);
            container.appendChild(timelineItem);
        });

        // Adicionar navegação da timeline
        this.addTimelineNavigation(container);
    }

    createTimelineItem(item, index) {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.dataset.index = index;
        
        const isLeft = index % 2 === 0;
        timelineItem.classList.add(isLeft ? 'timeline-left' : 'timeline-right');

        timelineItem.innerHTML = `
            <div class="timeline-dot" style="background: linear-gradient(135deg, ${item.color}, #fff)">
                <span class="dot-emoji">${item.emoji}</span>
                <div class="dot-pulse" style="border-color: ${item.color}"></div>
            </div>
            <div class="timeline-content" style="border-left: 3px solid ${item.color}">
                <div class="timeline-year" style="color: ${item.color}">${item.year}</div>
                <div class="timeline-title">${item.title}</div>
                
                <div class="timeline-photo-container">
                    <div class="timeline-photo" onclick="timelineManager.showPhotoDetail('${item.image}', '${item.year}', '${item.title}')">
                        <img src="${item.image}" alt="Memória de ${item.year}" loading="lazy" 
                             onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZvdG8gJHtpdGVtLnllYXJ9PC90ZXh0Pjwvc3ZnPic">
                        <div class="photo-overlay">
                            <div class="overlay-icon">📸</div>
                            <div class="overlay-text">Clique para ampliar</div>
                        </div>
                        <div class="photo-effects"></div>
                    </div>
                </div>
                
                <div class="timeline-memory">${item.memory}</div>
                
                <div class="timeline-actions">
                    <button class="memory-btn" onclick="timelineManager.addHeartToMemory(${index})" title="Adicionar coração">
                        💕 <span class="heart-count">0</span>
                    </button>
                    <button class="share-btn" onclick="timelineManager.shareMemory(${index})" title="Compartilhar memória">
                        📱 Compartilhar
                    </button>
                </div>
            </div>
        `;

        return timelineItem;
    }

    addTimelineNavigation(container) {
        const navigation = document.createElement('div');
        navigation.className = 'timeline-navigation';
        navigation.innerHTML = `
            <div class="timeline-nav-dots">
                ${this.timelineData.map((_, index) => 
                    `<div class="nav-dot" data-index="${index}" onclick="timelineManager.scrollToItem(${index})"></div>`
                ).join('')}
            </div>
            <div class="timeline-controls">
                <button class="timeline-control-btn" onclick="timelineManager.previousItem()" title="Anterior">
                    ← Anterior
                </button>
                <button class="timeline-control-btn" onclick="timelineManager.nextItem()" title="Próximo">
                    Próximo →
                </button>
            </div>
        `;
        
        container.parentElement.appendChild(navigation);
    }

    setupScrollObserver() {
        const options = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateTimelineItem(entry.target);
                    
                    // Atualizar navegação
                    const index = parseInt(entry.target.dataset.index);
                    this.updateNavigation(index);
                }
            });
        }, options);

        // Observar todos os items da timeline
        document.querySelectorAll('.timeline-item').forEach(item => {
            this.observer.observe(item);
        });
    }

    animateTimelineItem(item) {
        if (item.classList.contains('animated')) return;
        item.classList.add('animated');

        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.timeline-content');
        const photo = item.querySelector('.timeline-photo');

        // Animar ponto
        setTimeout(() => {
            dot.style.transform = 'scale(1.2)';
            setTimeout(() => {
                dot.style.transform = 'scale(1)';
            }, 300);
        }, 200);

        // Animar conteúdo
        setTimeout(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 400);

        // Animar foto
        setTimeout(() => {
            if (photo) {
                photo.style.opacity = '1';
                photo.style.transform = 'scale(1)';
            }
        }, 600);

        // Efeito de partículas
        this.createTimelineParticles(item);
    }

    createTimelineParticles(item) {
        const rect = item.getBoundingClientRect();
        const dot = item.querySelector('.timeline-dot');
        const dotRect = dot.getBoundingClientRect();
        
        // Criar partículas ao redor do ponto
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'timeline-particle';
                particle.style.cssText = `
                    position: fixed;
                    left: ${dotRect.left + dotRect.width / 2}px;
                    top: ${dotRect.top + dotRect.height / 2}px;
                    width: 4px;
                    height: 4px;
                    background: ${this.timelineData[item.dataset.index].color};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                `;
                
                document.body.appendChild(particle);
                
                const angle = (i / 6) * Math.PI * 2;
                const distance = 30 + Math.random() * 40;
                const endX = dotRect.left + dotRect.width / 2 + Math.cos(angle) * distance;
                const endY = dotRect.top + dotRect.height / 2 + Math.sin(angle) * distance;
                
                particle.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${endX - (dotRect.left + dotRect.width / 2)}px, ${endY - (dotRect.top + dotRect.height / 2)}px) scale(0)`, opacity: 0 }
                ], {
                    duration: 1000,
                    easing: 'ease-out'
                }).onfinish = () => particle.remove();
            }, i * 100);
        }
    }

    showPhotoDetail(imageSrc, year, title) {
        // Criar modal detalhado
        const modal = document.createElement('div');
        modal.className = 'photo-detail-modal';
        modal.innerHTML = `
            <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
            <div class="modal-container">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <span class="modal-year">${year}</span>
                    <button class="modal-close" onclick="this.closest('.photo-detail-modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="modal-image-container">
                        <img src="${imageSrc}" alt="${title} - ${year}" loading="lazy">
                        <div class="image-effects"></div>
                    </div>
                    <div class="modal-info">
                        <p>Uma memória especial de ${year} ❤️</p>
                        <div class="modal-actions">
                            <button onclick="timelineManager.addHeartToPhoto('${year}')" class="heart-photo-btn">
                                💕 Adorei esta memória
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Efeitos visuais
        this.createPhotoEffects(modal);
        
        // Som
        if (window.app) {
            window.app.playPageTurnSound();
        }
    }

    createPhotoEffects(modal) {
        const imageContainer = modal.querySelector('.modal-image-container');
        
        // Criar corações flutuantes ao redor da imagem
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'modal-heart';
                heart.innerHTML = '💕';
                heart.style.cssText = `
                    position: absolute;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    font-size: ${12 + Math.random() * 8}px;
                    pointer-events: none;
                    animation: modalHeartFloat 3s ease-out forwards;
                `;
                
                imageContainer.appendChild(heart);
                setTimeout(() => heart.remove(), 3000);
            }, i * 300);
        }
    }

    addHeartToMemory(index) {
        const heartBtn = document.querySelector(`[data-index="${index}"] .memory-btn`);
        const heartCount = heartBtn.querySelector('.heart-count');
        const currentCount = parseInt(heartCount.textContent);
        
        heartCount.textContent = currentCount + 1;
        
        // Animação do botão
        heartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            heartBtn.style.transform = 'scale(1)';
        }, 200);
        
        // Criar coração flutuante
        this.createFloatingHeart(heartBtn);
        
        // Salvar no localStorage
        localStorage.setItem(`timeline-hearts-${index}`, currentCount + 1);
    }

    addHeartToPhoto(year) {
        // Efeito de explosão de corações
        const modal = document.querySelector('.photo-detail-modal');
        const imageContainer = modal.querySelector('.modal-image-container');
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💖';
                heart.style.cssText = `
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    font-size: ${15 + Math.random() * 10}px;
                    pointer-events: none;
                    z-index: 10;
                `;
                
                imageContainer.appendChild(heart);
                
                const angle = (i / 15) * Math.PI * 2;
                const distance = 50 + Math.random() * 100;
                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance;
                
                heart.animate([
                    { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 1 },
                    { transform: `translate(${endX}px, ${endY}px) scale(1.5)`, opacity: 0 }
                ], {
                    duration: 1500,
                    easing: 'ease-out'
                }).onfinish = () => heart.remove();
            }, i * 80);
        }
    }

    createFloatingHeart(element) {
        const rect = element.getBoundingClientRect();
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top}px;
            font-size: 16px;
            pointer-events: none;
            z-index: 10000;
        `;
        
        document.body.appendChild(heart);
        
        heart.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: 'translateY(-80px) scale(1.5)', opacity: 0 }
        ], {
            duration: 1500,
            easing: 'ease-out'
        }).onfinish = () => heart.remove();
    }

    shareMemory(index) {
        const item = this.timelineData[index];
        
        if (navigator.share) {
            navigator.share({
                title: `Memória de ${item.year}`,
                text: `${item.title} - Uma memória especial! ❤️`,
                url: window.location.href
            }).catch(err => console.log('Erro ao compartilhar:', err));
        } else {
            // Fallback - copiar para clipboard
            const text = `Memória de ${item.year}: ${item.title} ❤️\n${window.location.href}`;
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('Link copiado para a área de transferência! 📋');
            }).catch(() => {
                this.showToast('Não foi possível copiar o link 😔');
            });
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'timeline-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 14px;
            z-index: 10000;
            animation: toastShow 3s ease-out forwards;
        `;
        
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // ===== NAVEGAÇÃO =====
    scrollToItem(index) {
        const item = document.querySelector(`[data-index="${index}"]`);
        if (item) {
            item.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            this.currentIndex = index;
            this.updateNavigation(index);
        }
    }

    nextItem() {
        if (this.currentIndex < this.timelineData.length - 1) {
            this.scrollToItem(this.currentIndex + 1);
        }
    }

    previousItem() {
        if (this.currentIndex > 0) {
            this.scrollToItem(this.currentIndex - 1);
        }
    }

    updateNavigation(index) {
        this.currentIndex = index;
        
        // Atualizar pontos de navegação
        document.querySelectorAll('.nav-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Atualizar botões de controle
        const prevBtn = document.querySelector('.timeline-control-btn:first-child');
        const nextBtn = document.querySelector('.timeline-control-btn:last-child');
        
        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) nextBtn.disabled = index === this.timelineData.length - 1;
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch(e.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextItem();
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousItem();
                    break;
            }
        });
    }

    setupTouchNavigation() {
        let touchStartY = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextItem();
                } else {
                    this.previousItem();
                }
            }
        }, { passive: true });
    }

    // ===== PERSISTÊNCIA =====
    loadSavedHearts() {
        for (let i = 0; i < this.timelineData.length; i++) {
            const savedHearts = localStorage.getItem(`timeline-hearts-${i}`);
            if (savedHearts) {
                const heartCount = document.querySelector(`[data-index="${i}"] .heart-count`);
                if (heartCount) {
                    heartCount.textContent = savedHearts;
                }
            }
        }
    }

    // ===== LIMPEZA =====
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// CSS para timeline
const timelineCSS = `
<style>
.timeline-item {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.timeline-item.visible {
    opacity: 1;
    transform: translateY(0);
}

.timeline-dot {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    cursor: pointer;
}

.dot-emoji {
    font-size: 1.2rem;
    z-index: 2;
}

.dot-pulse {
    position: absolute;
    width: 40px;
    height: 40px;
    border: 2px solid;
    border-radius: 50%;
    animation: dotPulse 2s ease-in-out infinite;
}

.timeline-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #444;
    margin-bottom: 15px;
}

.timeline-photo-container {
    position: relative;
    margin: 20px 0;
}

.timeline-photo {
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    cursor: pointer;
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.6s ease;
}

.photo-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s ease;
}

.timeline-photo:hover .photo-overlay {
    opacity: 1;
}

.overlay-icon {
    font-size: 2rem;
    margin-bottom: 8px;
}

.timeline-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.memory-btn, .share-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.memory-btn {
    background: linear-gradient(135deg, #ff6b9d, #c44569);
    color: white;
}

.share-btn {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
}

.memory-btn:hover, .share-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.timeline-navigation {
    position: sticky;
    bottom: 20px;
    text-align: center;
    margin-top: 40px;
    z-index: 100;
}

.timeline-nav-dots {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 15px;
}

.nav-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: all 0.3s ease;
}

.nav-dot.active {
    background: #ff6b9d;
    transform: scale(1.3);
}

.timeline-controls {
    display: flex;
    gap: 15px;
    justify-content: center;
}

.timeline-control-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.9);
    color: #444;
    cursor: pointer;
    transition: all 0.3s ease;
}

.timeline-control-btn:hover:not(:disabled) {
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.timeline-control-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.photo-detail-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: modalFadeIn 0.3s ease-out;
}

.modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
}

.modal-container {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    animation: modalSlideIn 0.4s ease-out;
}

.modal-header {
    padding: 20px;
    background: linear-gradient(135deg, #ff6b9d, #667eea);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-close {
    width: 30px;
    height: 30px;
    border: none;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
}

.modal-body {
    padding: 20px;
}

.modal-image-container {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
}

.modal-image-container img {
    max-width: 100%;
    max-height: 60vh;
    border-radius: 10px;
}

.heart-photo-btn {
    background: linear-gradient(135deg, #ff6b9d, #c44569);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.heart-photo-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 157, 0.4);
}

.timeline-toast {
    animation: toastShow 3s ease-out forwards;
}

@keyframes dotPulse {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
}

@keyframes modalFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes modalSlideIn {
    from { transform: scale(0.8) translateY(50px); opacity: 0; }
    to { transform: scale(1) translateY(0); opacity: 1; }
}

@keyframes modalHeartFloat {
    0% { transform: translateY(0) scale(0.5); opacity: 1; }
    100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
}

@keyframes toastShow {
    0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
    10%, 90% { opacity: 1; transform: translateX(-50%) translateY(0); }
    100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
}

@media (max-width: 768px) {
    .timeline-navigation {
        position: relative;
        bottom: auto;
    }
    
    .timeline-controls {
        flex-direction: column;
        align-items: center;
    }
    
    .timeline-control-btn {
        width: 200px;
    }
}
</style>
`;

// Adicionar CSS
document.head.insertAdjacentHTML('beforeend', timelineCSS);

// Inicializar timeline quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.timelineManager = new TimelineManager();
    console.log('📸 Sistema de timeline carregado!');
});
