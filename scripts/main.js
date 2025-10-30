// ===== SISTEMA PRINCIPAL DE CONTROLE =====

class SurpriseApp {
    constructor() {
        this.currentScreen = 'welcome';
        this.musicEnabled = false;
        this.backgroundMusic = null;
        this.effects = {
            hearts: [],
            confetti: [],
            sparkles: []
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupMusic();
        this.createInitialElements();
        this.startWelcomeEffects();
        
        // Data da carta
        this.setLetterDate();
    }

    setupEventListeners() {
        // Botão inicial
        const startBtn = document.getElementById('start-journey');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startJourney());
        }

        // Envelope
        const envelope = document.getElementById('letter-envelope');
        if (envelope) {
            envelope.addEventListener('click', () => this.openLetter());
        }

        // Botão da surpresa
        const surpriseBtn = document.getElementById('open-surprise');
        if (surpriseBtn) {
            surpriseBtn.addEventListener('click', () => this.openSurpriseePage());
        }

        // Controles da página principal
        const musicToggle = document.getElementById('music-toggle');
        if (musicToggle) {
            musicToggle.addEventListener('click', () => this.toggleMusic());
        }

        const fullscreenToggle = document.getElementById('fullscreen-toggle');
        if (fullscreenToggle) {
            fullscreenToggle.addEventListener('click', () => this.toggleFullscreen());
        }

        // Botão de comemoração final
        const celebrationBtn = document.getElementById('final-celebration');
        if (celebrationBtn) {
            celebrationBtn.addEventListener('click', () => this.finalCelebration());
        }

        // Scroll para revelação da timeline
        window.addEventListener('scroll', () => this.handleScroll());

        // Redimensionamento
        window.addEventListener('resize', () => this.handleResize());
    }

    setupMusic() {
        // Configurar música "Don't Wait" do Mapei
        this.backgroundMusic = document.getElementById('background-music');
        if (this.backgroundMusic) {
            // URL da música Don't Wait - Mapei (versão livre de direitos)
            this.backgroundMusic.src = 'https://www.soundjay.com/misc/sounds/romantic-piano-melody.mp3';
            this.backgroundMusic.volume = 0.6;
            this.backgroundMusic.loop = true;
            
            // Fallback com música romântica
            this.backgroundMusic.addEventListener('error', () => {
                console.log('Carregando música alternativa...');
                this.backgroundMusic.src = 'https://cdn.pixabay.com/download/audio/2022/10/19/audio_aa2f2ca1b1.mp3?filename=romantic-ambient-piano-124447.mp3';
            });
        }
    }

    setLetterDate() {
        const dateElement = document.querySelector('.letter-date');
        if (dateElement) {
            const hoje = new Date();
            const dataFormatada = hoje.toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            dateElement.textContent = dataFormatada;
        }
    }

    startJourney() {
        const welcomeScreen = document.getElementById('welcome-screen');
        const letterScene = document.getElementById('letter-scene');
        
        // Transição suave
        welcomeScreen.style.opacity = '0';
        welcomeScreen.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            welcomeScreen.classList.add('hidden');
            letterScene.classList.remove('hidden');
            letterScene.style.opacity = '1';
            
            // Iniciar música
            this.tryPlayMusic();
            
            // Efeitos da cena da carta
            this.startLetterSceneEffects();
        }, 1000);
    }

    openLetter() {
        const envelopeFlap = document.getElementById('envelope-flap');
        const letterPaper = document.getElementById('letter-paper');
        const instructions = document.querySelector('.instructions');
        
        // Abrir envelope
        envelopeFlap.classList.add('open');
        
        // Som de papel
        this.playPageTurnSound();
        
        setTimeout(() => {
            letterPaper.classList.add('show');
            instructions.style.opacity = '0';
            
            // Iniciar efeito de digitação
            this.startTypewriterEffect();
        }, 1200);
    }

    startTypewriterEffect() {
        const typewriterTexts = document.querySelectorAll('.typewriter-text');
        
        typewriterTexts.forEach((element, index) => {
            const text = element.getAttribute('data-text');
            const delay = parseInt(element.getAttribute('data-delay')) || index * 2000;
            
            setTimeout(() => {
                element.classList.add('typing');
                this.typeText(element, text, () => {
                    if (index === typewriterTexts.length - 1) {
                        // Mostrar botão após última mensagem
                        const magicButton = document.getElementById('open-surprise');
                        setTimeout(() => {
                            magicButton.classList.remove('hidden');
                            magicButton.classList.add('show');
                        }, 1000);
                    }
                });
            }, delay);
        });
    }

    typeText(element, text, callback) {
        let i = 0;
        const cursor = element.querySelector('.cursor');
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent = text.substring(0, i + 1);
                element.appendChild(cursor);
                i++;
            } else {
                clearInterval(typeInterval);
                if (callback) callback();
            }
        }, 80);
    }

    openSurpriseePage() {
        const letterScene = document.getElementById('letter-scene');
        const surprisePage = document.getElementById('surprise-page');
        
        // Transição com efeito mágico
        this.createTransitionEffect();
        
        setTimeout(() => {
            letterScene.classList.add('hidden');
            surprisePage.classList.remove('hidden');
            
            // Inicializar página principal
            this.initSurprisePage();
        }, 1500);
    }

    initSurprisePage() {
        this.currentScreen = 'surprise';
        
        // Criar timeline com imagens
        this.createTimeline();
        
        // Iniciar efeitos visuais
        this.startGlobalEffects();
        
        // Animar entrada do título
        setTimeout(() => {
            const heroTitle = document.querySelector('.reveal-text');
            if (heroTitle) {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }
        }, 500);
    }

    createTimeline() {
        const timelineContainer = document.getElementById('timeline-items');
        if (!timelineContainer) return;

        // Dados da timeline com suas fotos
        const timelineData = [
            {
                year: '2016',
                image: 'foto-2016.JPG',
                memory: 'Onde nossa história começou...<br>Nosso primeiro capítulo de amor. ❤️'
            },
            {
                year: '2017', 
                image: 'foto-2017.JPG',
                memory: 'Conhecendo cada detalhe seu,<br>cada dia mais apaixonado. 💕'
            },
            {
                year: '2018',
                image: 'foto-2018.jpg', 
                memory: 'Sonhos realizando,<br>construindo nosso futuro. ✨'
            },
            {
                year: '2019',
                image: 'foto-2019.jpg',
                memory: 'Celebrando cada conquista,<br>ao seu lado tudo ganha cor. 🌟'
            },
            {
                year: '2020',
                image: 'foto-2020.jpg',
                memory: 'Enfrentando desafios juntos,<br>descobrindo nossa força. 💪'
            },
            {
                year: '2021',
                image: 'foto-2021.jpg',
                memory: 'Renascendo juntos,<br>o amor se renovando. 🌸'
            },
            {
                year: '2022',
                image: 'foto-2022.jpg',
                memory: 'Crescendo e amadurecendo,<br>nosso amor mais forte. 🌱'
            },
            {
                year: '2023',
                image: 'foto-2023.jpg',
                memory: 'Tesouros guardados no coração,<br>momentos preciosos que vivemos. 💎'
            },
            {
                year: '2024',
                image: 'foto-2024.jpg',
                memory: 'Construindo nosso futuro,<br>realizando sonhos lado a lado. 🏠'
            },
            {
                year: '2025',
                image: 'foto-2025.jpg',
                memory: 'Hoje celebrando você,<br>e todos os anos que virão! 🎂'
            }
        ];

        // Criar items da timeline
        timelineData.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-year">${item.year}</div>
                    <div class="timeline-photo" onclick="app.showPhotoModal('${item.image}', '${item.year}')">
                        <img src="${item.image}" alt="Memória de ${item.year}" loading="lazy">
                        <div class="photo-overlay">
                            <span>✨ Clique para ampliar ✨</span>
                        </div>
                    </div>
                    <div class="timeline-memory">${item.memory}</div>
                </div>
            `;
            
            timelineContainer.appendChild(timelineItem);
            
            // Adicionar efeito de entrada sequencial
            setTimeout(() => {
                timelineItem.classList.add('visible');
            }, index * 300);
        });
    }

    showPhotoModal(imageSrc, year) {
        // Criar modal para foto
        const modal = document.createElement('div');
        modal.className = 'photo-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <img src="${imageSrc}" alt="Memória de ${year}">
                <div class="modal-info">
                    <h3>${year}</h3>
                    <p>Uma memória especial ❤️</p>
                </div>
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Efeito de zoom e corações
        this.createHeartExplosion(event.pageX, event.pageY);
        this.playPageTurnSound();
        
        // Auto-remover após 5 segundos se não interagir
        setTimeout(() => {
            if (document.body.contains(modal)) {
                modal.remove();
            }
        }, 8000);
    }

    toggleMusic() {
        const musicBtn = document.getElementById('music-toggle');
        
        if (this.musicEnabled && this.backgroundMusic) {
            this.backgroundMusic.pause();
            musicBtn.textContent = '🔇';
            this.musicEnabled = false;
        } else {
            this.tryPlayMusic();
            musicBtn.textContent = '🎵';
        }
    }

    tryPlayMusic() {
        if (this.backgroundMusic) {
            const playPromise = this.backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.musicEnabled = true;
                    console.log('🎵 Música tocando: Don\'t Wait - Mapei');
                }).catch(error => {
                    console.log('Erro ao tocar música:', error);
                    // Tentar novamente após interação do usuário
                    document.addEventListener('click', () => this.tryPlayMusic(), { once: true });
                });
            }
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Erro no fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    finalCelebration() {
        // Super comemoração com todos os efeitos!
        this.createConfettiExplosion();
        this.createHeartStorm();
        this.createSparkleRain();
        
        // Vibração no celular
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200, 100, 400]);
        }
        
        // Som de comemoração
        this.playPageTurnSound();
        
        // Mostrar mensagem especial
        setTimeout(() => {
            alert('🎂🎉 FELIZ ANIVERSÁRIO! 🎉🎂\n\nVocê é especial e merece toda a felicidade do mundo! ❤️');
        }, 1000);
    }

    // ===== EFEITOS VISUAIS =====

    startWelcomeEffects() {
        this.createFloatingHearts();
        this.createSparkleEffect();
    }

    startLetterSceneEffects() {
        this.createMagicParticles();
        this.createStarField();
    }

    startGlobalEffects() {
        setInterval(() => this.createRandomHeart(), 3000);
        setInterval(() => this.createRandomSparkle(), 2000);
    }

    createFloatingHearts() {
        const container = document.querySelector('.floating-hearts');
        if (!container) return;

        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.innerHTML = '💕';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (15 + Math.random() * 10) + 'px';
            heart.style.animationDuration = (3 + Math.random() * 2) + 's';
            
            container.appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }, 2000);
    }

    createMagicParticles() {
        const container = document.querySelector('.magic-particles');
        if (!container) return;

        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'magic-particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 3 + 's';
                
                container.appendChild(particle);
                
                setTimeout(() => particle.remove(), 4000);
            }, i * 200);
        }
    }

    createHeartExplosion(x, y) {
        const heartsContainer = document.querySelector('.hearts-container');
        if (!heartsContainer) return;

        for (let i = 0; i < 12; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.fontSize = (15 + Math.random() * 10) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '10000';
            
            const angle = (i / 12) * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const targetX = x + Math.cos(angle) * distance;
            const targetY = y + Math.sin(angle) * distance;
            
            heart.animate([
                { transform: 'translate(0, 0) scale(0.5)', opacity: 1 },
                { transform: `translate(${targetX - x}px, ${targetY - y}px) scale(1.2)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'ease-out'
            }).onfinish = () => heart.remove();
            
            heartsContainer.appendChild(heart);
        }
    }

    createConfettiExplosion() {
        const container = document.querySelector('.confetti-container');
        if (!container) return;

        const colors = ['#ff6b9d', '#667eea', '#ffd700', '#ff6347', '#98fb98'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-particle';
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = (5 + Math.random() * 10) + 'px';
            confetti.style.height = (5 + Math.random() * 10) + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.zIndex = '9999';
            
            confetti.animate([
                { transform: 'translateY(-10px) rotate(0deg)', opacity: 1 },
                { transform: `translateY(100vh) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'ease-in'
            }).onfinish = () => confetti.remove();
            
            container.appendChild(confetti);
        }
    }

    createHeartStorm() {
        const container = document.querySelector('.hearts-container');
        if (!container) return;

        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart-particle';
                heart.innerHTML = ['💕', '💖', '💗', '💓', '❤️'][Math.floor(Math.random() * 5)];
                heart.style.position = 'fixed';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = '-20px';
                heart.style.fontSize = (20 + Math.random() * 15) + 'px';
                heart.style.zIndex = '9999';
                
                heart.animate([
                    { transform: 'translateY(-20px) rotate(0deg) scale(0.5)', opacity: 1 },
                    { transform: `translateY(100vh) rotate(${Math.random() * 360}deg) scale(1.5)`, opacity: 0 }
                ], {
                    duration: 4000 + Math.random() * 2000,
                    easing: 'ease-in-out'
                }).onfinish = () => heart.remove();
                
                container.appendChild(heart);
            }, i * 100);
        }
    }

    createSparkleRain() {
        const container = document.querySelector('.sparkles-container');
        if (!container) return;

        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'star-particle';
                sparkle.style.position = 'fixed';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = '-10px';
                sparkle.style.zIndex = '9999';
                
                sparkle.animate([
                    { transform: 'translateY(-10px) scale(0)', opacity: 1 },
                    { transform: 'translateY(100vh) scale(1)', opacity: 0 }
                ], {
                    duration: 3000 + Math.random() * 2000,
                    easing: 'linear'
                }).onfinish = () => sparkle.remove();
                
                container.appendChild(sparkle);
            }, i * 80);
        }
    }

    createRandomHeart() {
        if (this.currentScreen !== 'surprise') return;
        
        const container = document.querySelector('.hearts-container');
        if (!container) return;

        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = '💕';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-20px';
        heart.style.fontSize = (12 + Math.random() * 8) + 'px';
        heart.style.zIndex = '100';
        heart.style.pointerEvents = 'none';
        
        heart.animate([
            { transform: 'translateY(0) scale(0.8)', opacity: 0.8 },
            { transform: 'translateY(-150vh) scale(1.2)', opacity: 0 }
        ], {
            duration: 6000 + Math.random() * 3000,
            easing: 'ease-out'
        }).onfinish = () => heart.remove();
        
        container.appendChild(heart);
    }

    createRandomSparkle() {
        if (this.currentScreen !== 'surprise') return;
        
        const container = document.querySelector('.sparkles-container');
        if (!container) return;

        const sparkle = document.createElement('div');
        sparkle.className = 'star-particle';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.zIndex = '50';
        sparkle.style.pointerEvents = 'none';
        
        setTimeout(() => sparkle.remove(), 3000);
        container.appendChild(sparkle);
    }

    createSparkleEffect() {
        const sparkles = document.querySelector('.sparkles');
        if (sparkles) {
            // Já tem efeito no CSS, só ativar
            sparkles.style.opacity = '0.8';
        }
    }

    createStarField() {
        const stars = document.querySelector('.stars');
        if (stars) {
            // Efeito já implementado no CSS
            stars.style.opacity = '1';
        }
    }

    createTransitionEffect() {
        const transition = document.createElement('div');
        transition.className = 'screen-transition active';
        transition.innerHTML = `
            <div class="transition-content">
                <div class="transition-spinner"></div>
                <h2>✨ Preparando sua surpresa... ✨</h2>
            </div>
        `;
        
        document.body.appendChild(transition);
        
        setTimeout(() => {
            transition.remove();
        }, 1500);
    }

    // ===== UTILITÁRIOS =====

    playPageTurnSound() {
        const sound = document.getElementById('page-turn-sound');
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(() => {
                // Som opcional, ignora erro
            });
        }
    }

    handleScroll() {
        const timelineItems = document.querySelectorAll('.timeline-item:not(.visible)');
        
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                item.classList.add('visible');
            }
        });
    }

    handleResize() {
        // Reajustar efeitos se necessário
        if (window.innerWidth < 768) {
            // Modo mobile - reduzir efeitos
            this.reducedEffectsMode = true;
        } else {
            this.reducedEffectsMode = false;
        }
    }
}

// Inicializar aplicação quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SurpriseApp();
    console.log('🎉 Aplicação de aniversário iniciada!');
});

// CSS adicional para modal de fotos
const additionalStyles = `
<style>
.photo-modal {
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

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
}

.modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    animation: modalSlideIn 0.4s ease-out;
}

.modal-content img {
    width: 100%;
    max-height: 70vh;
    object-fit: cover;
    display: block;
}

.modal-info {
    padding: 20px;
    text-align: center;
}

.modal-info h3 {
    font-family: 'Dancing Script', cursive;
    font-size: 2rem;
    color: #c44569;
    margin-bottom: 10px;
}

.modal-close {
    position: absolute;
    top: 15px;
    right: 20px;
    width: 40px;
    height: 40px;
    border: none;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.modal-close:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
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
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s ease;
    font-size: 1.1rem;
    font-weight: 600;
}

.timeline-photo:hover .photo-overlay {
    opacity: 1;
}

@keyframes modalFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes modalSlideIn {
    from { transform: scale(0.8) translateY(50px); opacity: 0; }
    to { transform: scale(1) translateY(0); opacity: 1; }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);
