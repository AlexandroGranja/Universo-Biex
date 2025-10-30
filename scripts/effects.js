// ===== SISTEMA DE EFEITOS VISUAIS AVANÇADOS =====

class VisualEffects {
    constructor() {
        this.particles = [];
        this.isRunning = false;
        this.containers = {
            hearts: null,
            confetti: null,
            sparkles: null
        };
        
        this.init();
    }

    init() {
        this.setupContainers();
        this.setupEventListeners();
    }

    setupContainers() {
        this.containers.hearts = document.querySelector('.hearts-container');
        this.containers.confetti = document.querySelector('.confetti-container');
        this.containers.sparkles = document.querySelector('.sparkles-container');
    }

    setupEventListeners() {
        // Efeitos ao clicar em qualquer lugar
        document.addEventListener('click', (e) => {
            if (!e.target.closest('button') && !e.target.closest('.modal-content')) {
                this.createClickEffect(e.pageX, e.pageY);
            }
        });

        // Efeitos ao passar mouse sobre elementos especiais
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('timeline-dot')) {
                this.createHoverEffect(e.target);
            }
        });
    }

    // ===== EFEITOS DE CLIQUE =====
    createClickEffect(x, y) {
        this.createRipple(x, y);
        this.createSparkBurst(x, y);
        
        // Som sutil
        this.playClickSound();
    }

    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.cssText = `
            position: fixed;
            left: ${x - 25}px;
            top: ${y - 25}px;
            width: 50px;
            height: 50px;
            border: 2px solid rgba(255, 107, 157, 0.6);
            border-radius: 50%;
            transform: scale(0);
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(ripple);
        
        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(4)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => ripple.remove();
    }

    createSparkBurst(x, y) {
        const colors = ['#ff6b9d', '#667eea', '#ffd700', '#ff6347'];
        
        for (let i = 0; i < 8; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark-particle';
            spark.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
            `;
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 30 + Math.random() * 50;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
            document.body.appendChild(spark);
            
            spark.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800 + Math.random() * 400,
                easing: 'ease-out'
            }).onfinish = () => spark.remove();
        }
    }

    // ===== EFEITOS DE HOVER =====
    createHoverEffect(element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Criar aura brilhante
        const aura = document.createElement('div');
        aura.className = 'hover-aura';
        aura.style.cssText = `
            position: fixed;
            left: ${x - 40}px;
            top: ${y - 40}px;
            width: 80px;
            height: 80px;
            background: radial-gradient(circle, rgba(255, 107, 157, 0.3), transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 50;
            animation: auraGlow 1s ease-out forwards;
        `;
        
        document.body.appendChild(aura);
        setTimeout(() => aura.remove(), 1000);
    }

    // ===== EFEITOS CONTÍNUOS =====
    startContinuousEffects() {
        if (this.isRunning) return;
        this.isRunning = true;
        
        // Corações flutuantes contínuos
        this.heartInterval = setInterval(() => {
            this.createFloatingHeart();
        }, 4000);
        
        // Estrelas cintilantes
        this.sparkleInterval = setInterval(() => {
            this.createTwinkleStars();
        }, 2000);
        
        // Partículas ambientes
        this.ambientInterval = setInterval(() => {
            this.createAmbientParticles();
        }, 3000);
    }

    stopContinuousEffects() {
        this.isRunning = false;
        
        if (this.heartInterval) clearInterval(this.heartInterval);
        if (this.sparkleInterval) clearInterval(this.sparkleInterval);
        if (this.ambientInterval) clearInterval(this.ambientInterval);
    }

    createFloatingHeart() {
        if (!this.containers.hearts) return;
        
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = ['💕', '💖', '💗', '💓'][Math.floor(Math.random() * 4)];
        heart.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            bottom: -30px;
            font-size: ${12 + Math.random() * 8}px;
            pointer-events: none;
            z-index: 100;
            opacity: 0.7;
        `;
        
        this.containers.hearts.appendChild(heart);
        
        heart.animate([
            { transform: 'translateY(0) rotate(0deg) scale(0.8)', opacity: 0.7 },
            { transform: 'translateY(-120vh) rotate(360deg) scale(1.2)', opacity: 0 }
        ], {
            duration: 8000 + Math.random() * 4000,
            easing: 'ease-out'
        }).onfinish = () => heart.remove();
    }

    createTwinkleStars() {
        if (!this.containers.sparkles) return;
        
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('div');
            star.className = 'twinkle-star';
            star.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #fff, #ffd700);
                border-radius: 50%;
                pointer-events: none;
                z-index: 50;
                box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
            `;
            
            this.containers.sparkles.appendChild(star);
            
            star.animate([
                { opacity: 0, transform: 'scale(0)' },
                { opacity: 1, transform: 'scale(1.5)' },
                { opacity: 0, transform: 'scale(0)' }
            ], {
                duration: 2000,
                easing: 'ease-in-out'
            }).onfinish = () => star.remove();
        }
    }

    createAmbientParticles() {
        if (!this.containers.sparkles) return;
        
        const particle = document.createElement('div');
        particle.className = 'ambient-particle';
        particle.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${2 + Math.random() * 4}px;
            height: ${2 + Math.random() * 4}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 20;
        `;
        
        this.containers.sparkles.appendChild(particle);
        
        particle.animate([
            { opacity: 0, transform: 'translateY(0)' },
            { opacity: 0.8, transform: 'translateY(-50px)' },
            { opacity: 0, transform: 'translateY(-100px)' }
        ], {
            duration: 6000,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }

    // ===== EFEITOS ESPECIAIS DE COMEMORAÇÃO =====
    createBirthdayExplosion() {
        this.createMegaConfetti();
        this.createHeartShower();
        this.createStarBurst();
        this.createRainbowRipple();
    }

    createMegaConfetti() {
        if (!this.containers.confetti) return;
        
        const colors = ['#ff6b9d', '#667eea', '#ffd700', '#ff6347', '#98fb98', '#dda0dd'];
        
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'mega-confetti';
                confetti.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: -20px;
                    width: ${8 + Math.random() * 12}px;
                    height: ${8 + Math.random() * 12}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                    pointer-events: none;
                    z-index: 9999;
                `;
                
                this.containers.confetti.appendChild(confetti);
                
                confetti.animate([
                    { 
                        transform: 'translateY(-20px) rotate(0deg)', 
                        opacity: 1 
                    },
                    { 
                        transform: `translateY(100vh) rotate(${720 + Math.random() * 360}deg)`, 
                        opacity: 0 
                    }
                ], {
                    duration: 4000 + Math.random() * 2000,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }).onfinish = () => confetti.remove();
            }, i * 50);
        }
    }

    createHeartShower() {
        if (!this.containers.hearts) return;
        
        const heartTypes = ['💕', '💖', '💗', '💓', '❤️', '💙', '💜', '💚'];
        
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'shower-heart';
                heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
                heart.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: -30px;
                    font-size: ${20 + Math.random() * 15}px;
                    pointer-events: none;
                    z-index: 9999;
                `;
                
                this.containers.hearts.appendChild(heart);
                
                heart.animate([
                    { 
                        transform: 'translateY(-30px) rotate(0deg) scale(0.5)', 
                        opacity: 1 
                    },
                    { 
                        transform: `translateY(100vh) rotate(${Math.random() * 360}deg) scale(1.5)`, 
                        opacity: 0 
                    }
                ], {
                    duration: 5000 + Math.random() * 3000,
                    easing: 'ease-in'
                }).onfinish = () => heart.remove();
            }, i * 150);
        }
    }

    createStarBurst() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < 16; i++) {
            const star = document.createElement('div');
            star.className = 'burst-star';
            star.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, #fff, #ffd700);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                box-shadow: 0 0 15px rgba(255, 215, 0, 1);
            `;
            
            document.body.appendChild(star);
            
            const angle = (i / 16) * Math.PI * 2;
            const distance = 200 + Math.random() * 300;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            star.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(0)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(2)`, 
                    opacity: 0 
                }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: 'ease-out'
            }).onfinish = () => star.remove();
        }
    }

    createRainbowRipple() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const ripple = document.createElement('div');
                ripple.className = 'rainbow-ripple';
                ripple.style.cssText = `
                    position: fixed;
                    left: ${centerX - 50}px;
                    top: ${centerY - 50}px;
                    width: 100px;
                    height: 100px;
                    border: 3px solid;
                    border-image: linear-gradient(45deg, #ff6b9d, #667eea, #ffd700, #ff6347) 1;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9998;
                    transform: scale(0);
                    opacity: 1;
                `;
                
                document.body.appendChild(ripple);
                
                ripple.animate([
                    { transform: 'scale(0)', opacity: 1 },
                    { transform: 'scale(8)', opacity: 0 }
                ], {
                    duration: 2000,
                    easing: 'ease-out'
                }).onfinish = () => ripple.remove();
            }, i * 400);
        }
    }

    // ===== EFEITOS SONOROS =====
    playClickSound() {
        // Som sintético para clique
        if (typeof AudioContext !== 'undefined') {
            try {
                const audioContext = new AudioContext();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
            } catch (e) {
                // Ignorar se não conseguir criar som
            }
        }
    }

    // ===== LIMPEZA =====
    cleanup() {
        this.stopContinuousEffects();
        
        // Remover partículas existentes
        document.querySelectorAll('.floating-heart, .twinkle-star, .ambient-particle').forEach(el => {
            el.remove();
        });
    }
}

// CSS adicional para os efeitos
const effectsCSS = `
<style>
@keyframes auraGlow {
    0% { transform: scale(0); opacity: 0.6; }
    50% { transform: scale(1.2); opacity: 0.3; }
    100% { transform: scale(1.5); opacity: 0; }
}

.click-ripple {
    animation: rippleExpand 0.6s ease-out forwards;
}

@keyframes rippleExpand {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(4); opacity: 0; }
}

.floating-heart {
    animation: heartFloatUp 8s ease-out forwards;
}

@keyframes heartFloatUp {
    0% { transform: translateY(0) rotate(0deg) scale(0.8); opacity: 0.7; }
    25% { opacity: 1; }
    75% { opacity: 0.8; }
    100% { transform: translateY(-120vh) rotate(360deg) scale(1.2); opacity: 0; }
}

.twinkle-star {
    animation: starTwinkle 2s ease-in-out forwards;
}

@keyframes starTwinkle {
    0%, 100% { opacity: 0; transform: scale(0); }
    50% { opacity: 1; transform: scale(1.5); }
}

.ambient-particle {
    animation: ambientFloat 6s ease-out forwards;
}

@keyframes ambientFloat {
    0% { opacity: 0; transform: translateY(0); }
    25% { opacity: 0.8; }
    75% { opacity: 0.6; }
    100% { opacity: 0; transform: translateY(-100px); }
}

/* Efeitos especiais para dispositivos móveis */
@media (max-width: 768px) {
    .mega-confetti {
        width: 6px !important;
        height: 6px !important;
    }
    
    .shower-heart {
        font-size: 16px !important;
    }
    
    .burst-star {
        width: 4px !important;
        height: 4px !important;
    }
}
</style>
`;

// Adicionar CSS
document.head.insertAdjacentHTML('beforeend', effectsCSS);

// Inicializar efeitos quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.visualEffects = new VisualEffects();
    console.log('✨ Sistema de efeitos visuais carregado!');
});
