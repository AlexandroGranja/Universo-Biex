// ===== SISTEMA DE UNIVERSO 3D INTERATIVO =====

class Universo3D {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.planets = [];
        this.stars = [];
        this.nebulas = [];
        
        // Controles touch
        this.touch = {
            isActive: false,
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            deltaX: 0,
            deltaY: 0,
            scale: 1,
            rotation: { x: 0, y: 0, z: 0 },
            velocity: { x: 0, y: 0 }
        };
        
        // Câmera 3D
        this.camera = {
            x: 0,
            y: 0,
            z: 1000,
            rotationX: 0,
            rotationY: 0,
            fov: 500
        };
        
        // Estado da animação
        this.animationId = null;
        this.isActive = false;
        
        this.init();
    }

    init() {
        this.createCanvas();
        this.setupEventListeners();
        this.createUniverse();
        this.startAnimation();
    }

    createCanvas() {
        // Criar canvas 3D
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'universo3d';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            z-index: -1;
            background: radial-gradient(ellipse at center, #0a0a2e 0%, #000000 100%);
            touch-action: none;
            user-select: none;
        `;
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
    }

    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        this.ctx.scale(dpr, dpr);
    }

    setupEventListeners() {
        // Touch Events para mobile
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
        
        // Mouse Events para desktop
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        
        // Gestos avançados
        this.canvas.addEventListener('gesturestart', (e) => this.handleGestureStart(e), { passive: false });
        this.canvas.addEventListener('gesturechange', (e) => this.handleGestureChange(e), { passive: false });
        this.canvas.addEventListener('gestureend', (e) => this.handleGestureEnd(e), { passive: false });
        
        // Redimensionamento
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Orientação do dispositivo
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => this.handleDeviceOrientation(e));
        }
    }

    // ===== CRIAÇÃO DO UNIVERSO =====
    createUniverse() {
        this.createStarfield();
        this.createNebulas();
        this.createPlanets();
        this.createCosmicDust();
        this.createMemoryPlanets();
    }

    createStarfield() {
        // Criar campo de estrelas 3D
        for (let i = 0; i < 800; i++) {
            this.stars.push({
                x: (Math.random() - 0.5) * 4000,
                y: (Math.random() - 0.5) * 4000,
                z: (Math.random() - 0.5) * 4000,
                size: Math.random() * 2 + 0.5,
                brightness: Math.random(),
                twinkle: Math.random() * Math.PI * 2,
                color: this.getStarColor()
            });
        }
    }

    getStarColor() {
        const colors = [
            '#ffffff', '#ffe4b5', '#ffd700', '#87ceeb', 
            '#ff69b4', '#98fb98', '#dda0dd', '#f0e68c'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    createNebulas() {
        // Criar nebulosas coloridas
        for (let i = 0; i < 5; i++) {
            this.nebulas.push({
                x: (Math.random() - 0.5) * 3000,
                y: (Math.random() - 0.5) * 3000,
                z: (Math.random() - 0.5) * 3000,
                size: 200 + Math.random() * 400,
                color: this.getNebulaColor(),
                opacity: 0.1 + Math.random() * 0.3,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.005
            });
        }
    }

    getNebulaColor() {
        const colors = [
            '#ff69b4', '#667eea', '#ffd700', '#ff6347', 
            '#98fb98', '#dda0dd', '#87ceeb'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    createPlanets() {
        // Criar planetas decorativos
        for (let i = 0; i < 8; i++) {
            this.planets.push({
                x: (Math.random() - 0.5) * 2500,
                y: (Math.random() - 0.5) * 2500,
                z: (Math.random() - 0.5) * 2500,
                size: 20 + Math.random() * 80,
                color: this.getPlanetColor(),
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                orbitRadius: 100 + Math.random() * 200,
                orbitSpeed: (Math.random() - 0.5) * 0.01,
                orbitAngle: Math.random() * Math.PI * 2
            });
        }
    }

    getPlanetColor() {
        const colors = [
            '#ff6b9d', '#667eea', '#ffd700', '#ff6347',
            '#98fb98', '#dda0dd', '#87ceeb', '#f0a0a0'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    createCosmicDust() {
        // Criar poeira cósmica
        for (let i = 0; i < 300; i++) {
            this.particles.push({
                x: (Math.random() - 0.5) * 5000,
                y: (Math.random() - 0.5) * 5000,
                z: (Math.random() - 0.5) * 5000,
                size: Math.random() * 1.5 + 0.5,
                color: 'rgba(255, 255, 255, 0.6)',
                velocity: {
                    x: (Math.random() - 0.5) * 0.5,
                    y: (Math.random() - 0.5) * 0.5,
                    z: (Math.random() - 0.5) * 0.5
                }
            });
        }
    }

    createMemoryPlanets() {
        // Planetas especiais representando memórias
        const memories = [
            { year: '2016', color: '#ff6b9d', emoji: '💕' },
            { year: '2017', color: '#667eea', emoji: '🌹' },
            { year: '2018', color: '#ffd700', emoji: '⭐' },
            { year: '2019', color: '#ff6347', emoji: '🎉' },
            { year: '2020', color: '#98fb98', emoji: '💪' },
            { year: '2021', color: '#dda0dd', emoji: '🌸' },
            { year: '2022', color: '#90ee90', emoji: '🌱' },
            { year: '2023', color: '#87ceeb', emoji: '💎' },
            { year: '2024', color: '#f0a0a0', emoji: '🏠' },
            { year: '2025', color: '#ff69b4', emoji: '🎂' }
        ];

        memories.forEach((memory, index) => {
            const angle = (index / memories.length) * Math.PI * 2;
            const radius = 800;
            
            this.planets.push({
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                z: (Math.random() - 0.5) * 400,
                size: 60 + Math.random() * 40,
                color: memory.color,
                emoji: memory.emoji,
                year: memory.year,
                isMemory: true,
                rotation: 0,
                rotationSpeed: 0.01,
                orbitRadius: radius,
                orbitSpeed: 0.003,
                orbitAngle: angle,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02
            });
        });
    }

    // ===== CONTROLES TOUCH =====
    handleTouchStart(e) {
        e.preventDefault();
        this.touch.isActive = true;
        
        if (e.touches.length === 1) {
            this.touch.startX = e.touches[0].clientX;
            this.touch.startY = e.touches[0].clientY;
            this.touch.currentX = this.touch.startX;
            this.touch.currentY = self.touch.startY;
        }
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(20);
        }
    }

    handleTouchMove(e) {
        e.preventDefault();
        if (!this.touch.isActive) return;
        
        if (e.touches.length === 1) {
            this.touch.currentX = e.touches[0].clientX;
            this.touch.currentY = e.touches[0].clientY;
            
            this.touch.deltaX = this.touch.currentX - this.touch.startX;
            this.touch.deltaY = this.touch.currentY - this.touch.startY;
            
            // Atualizar rotação da câmera
            this.camera.rotationY += this.touch.deltaX * 0.01;
            this.camera.rotationX += this.touch.deltaY * 0.01;
            
            // Limitar rotação vertical
            this.camera.rotationX = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.camera.rotationX));
            
            this.touch.startX = this.touch.currentX;
            this.touch.startY = this.touch.currentY;
        }
    }

    handleTouchEnd(e) {
        e.preventDefault();
        this.touch.isActive = false;
        
        // Aplicar inércia
        this.touch.velocity.x = this.touch.deltaX * 0.1;
        this.touch.velocity.y = this.touch.deltaY * 0.1;
    }

    // ===== CONTROLES MOUSE (DESKTOP) =====
    handleMouseDown(e) {
        this.touch.isActive = true;
        this.touch.startX = e.clientX;
        this.touch.startY = e.clientY;
    }

    handleMouseMove(e) {
        if (!this.touch.isActive) return;
        
        this.touch.deltaX = e.clientX - this.touch.startX;
        this.touch.deltaY = e.clientY - this.touch.startY;
        
        this.camera.rotationY += this.touch.deltaX * 0.01;
        this.camera.rotationX += this.touch.deltaY * 0.01;
        
        this.camera.rotationX = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.camera.rotationX));
        
        this.touch.startX = e.clientX;
        this.touch.startY = e.clientY;
    }

    handleMouseUp(e) {
        this.touch.isActive = false;
    }

    // ===== GESTOS AVANÇADOS =====
    handleGestureStart(e) {
        e.preventDefault();
        this.touch.scale = e.scale;
    }

    handleGestureChange(e) {
        e.preventDefault();
        const scaleDelta = e.scale - this.touch.scale;
        this.camera.z = Math.max(200, Math.min(2000, this.camera.z - scaleDelta * 100));
        this.touch.scale = e.scale;
    }

    handleGestureEnd(e) {
        e.preventDefault();
    }

    // ===== ORIENTAÇÃO DO DISPOSITIVO =====
    handleDeviceOrientation(e) {
        if (!this.isActive) return;
        
        const alpha = e.alpha || 0; // Z axis
        const beta = e.beta || 0;   // X axis
        const gamma = e.gamma || 0; // Y axis
        
        // Aplicar rotação suave baseada na orientação
        this.camera.rotationY += (gamma * 0.01 - this.camera.rotationY) * 0.1;
        this.camera.rotationX += (beta * 0.01 - this.camera.rotationX) * 0.1;
    }

    // ===== PROJEÇÃO 3D =====
    project3D(x, y, z) {
        // Aplicar rotação da câmera
        const cos_x = Math.cos(this.camera.rotationX);
        const sin_x = Math.sin(this.camera.rotationX);
        const cos_y = Math.cos(this.camera.rotationY);
        const sin_y = Math.sin(this.camera.rotationY);
        
        // Rotação em Y (horizontal)
        const x1 = x * cos_y - z * sin_y;
        const z1 = x * sin_y + z * cos_y;
        
        // Rotação em X (vertical)
        const y1 = y * cos_x - z1 * sin_x;
        const z2 = y * sin_x + z1 * cos_x;
        
        // Projeção perspectiva
        const distance = z2 + this.camera.z;
        if (distance <= 0) return null;
        
        const scale = this.camera.fov / distance;
        
        return {
            x: x1 * scale + this.canvas.width / 2,
            y: y1 * scale + this.canvas.height / 2,
            scale: scale,
            distance: distance
        };
    }

    // ===== RENDERIZAÇÃO =====
    render() {
        // Limpar canvas
        this.ctx.fillStyle = 'rgba(0, 0, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Renderizar nebulosas
        this.renderNebulas();
        
        // Renderizar estrelas
        this.renderStars();
        
        // Renderizar planetas
        this.renderPlanets();
        
        // Renderizar partículas
        this.renderParticles();
        
        // Aplicar inércia
        this.applyInertia();
    }

    renderStars() {
        this.stars.forEach(star => {
            const projected = this.project3D(star.x, star.y, star.z);
            if (!projected || projected.distance < 0) return;
            
            // Atualizar brilho cintilante
            star.twinkle += 0.1;
            const brightness = star.brightness * (0.5 + 0.5 * Math.sin(star.twinkle));
            
            const size = star.size * projected.scale;
            if (size < 0.1) return;
            
            this.ctx.save();
            this.ctx.globalAlpha = brightness;
            this.ctx.fillStyle = star.color;
            this.ctx.shadowBlur = size * 2;
            this.ctx.shadowColor = star.color;
            
            this.ctx.beginPath();
            this.ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }

    renderNebulas() {
        this.nebulas.forEach(nebula => {
            const projected = this.project3D(nebula.x, nebula.y, nebula.z);
            if (!projected || projected.distance < 0) return;
            
            nebula.rotation += nebula.rotationSpeed;
            
            const size = nebula.size * projected.scale;
            if (size < 5) return;
            
            this.ctx.save();
            this.ctx.globalAlpha = nebula.opacity;
            this.ctx.translate(projected.x, projected.y);
            this.ctx.rotate(nebula.rotation);
            
            // Gradiente radial para nebulosa
            const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, size);
            gradient.addColorStop(0, nebula.color);
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(-size, -size, size * 2, size * 2);
            
            this.ctx.restore();
        });
    }

    renderPlanets() {
        // Ordenar planetas por distância (z-buffer)
        const sortedPlanets = [...this.planets].sort((a, b) => {
            const distA = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
            const distB = Math.sqrt(b.x * b.x + b.y * b.y + b.z * b.z);
            return distB - distA;
        });
        
        sortedPlanets.forEach(planet => {
            // Atualizar órbita
            if (planet.orbitSpeed) {
                planet.orbitAngle += planet.orbitSpeed;
                planet.x = Math.cos(planet.orbitAngle) * planet.orbitRadius;
                planet.y = Math.sin(planet.orbitAngle) * planet.orbitRadius;
            }
            
            const projected = this.project3D(planet.x, planet.y, planet.z);
            if (!projected || projected.distance < 0) return;
            
            planet.rotation += planet.rotationSpeed;
            
            let size = planet.size * projected.scale;
            
            // Efeito de pulsação para planetas de memória
            if (planet.isMemory) {
                planet.pulse += planet.pulseSpeed;
                size *= 1 + 0.2 * Math.sin(planet.pulse);
            }
            
            if (size < 2) return;
            
            this.ctx.save();
            this.ctx.translate(projected.x, projected.y);
            this.ctx.rotate(planet.rotation);
            
            // Sombra/glow
            this.ctx.shadowBlur = size * 0.5;
            this.ctx.shadowColor = planet.color;
            
            // Gradiente do planeta
            const gradient = this.ctx.createRadialGradient(
                -size * 0.3, -size * 0.3, 0,
                0, 0, size
            );
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.3, planet.color);
            gradient.addColorStop(1, this.darkenColor(planet.color, 0.3));
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Emoji para planetas de memória
            if (planet.isMemory && size > 15) {
                this.ctx.font = `${size * 0.6}px Arial`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(planet.emoji, 0, 0);
                
                // Ano
                if (size > 25) {
                    this.ctx.font = `${size * 0.2}px Arial`;
                    this.ctx.fillStyle = 'white';
                    this.ctx.fillText(planet.year, 0, size + 10);
                }
            }
            
            this.ctx.restore();
        });
    }

    renderParticles() {
        this.particles.forEach(particle => {
            // Atualizar posição
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            particle.z += particle.velocity.z;
            
            // Reposicionar se sair dos limites
            if (Math.abs(particle.x) > 2500) particle.velocity.x *= -1;
            if (Math.abs(particle.y) > 2500) particle.velocity.y *= -1;
            if (Math.abs(particle.z) > 2500) particle.velocity.z *= -1;
            
            const projected = this.project3D(particle.x, particle.y, particle.z);
            if (!projected || projected.distance < 0) return;
            
            const size = particle.size * projected.scale;
            if (size < 0.2) return;
            
            this.ctx.save();
            this.ctx.globalAlpha = 0.6;
            this.ctx.fillStyle = particle.color;
            
            this.ctx.beginPath();
            this.ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }

    applyInertia() {
        // Aplicar inércia à rotação
        this.camera.rotationY += this.touch.velocity.x * 0.01;
        this.camera.rotationX += this.touch.velocity.y * 0.01;
        
        // Diminuir velocidade gradualmente
        this.touch.velocity.x *= 0.95;
        this.touch.velocity.y *= 0.95;
        
        // Limitar rotação X
        this.camera.rotationX = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.camera.rotationX));
    }

    // ===== UTILITÁRIOS =====
    darkenColor(color, factor) {
        // Escurecer cor hexadecimal
        const hex = color.replace('#', '');
        const r = Math.floor(parseInt(hex.substr(0, 2), 16) * factor);
        const g = Math.floor(parseInt(hex.substr(2, 2), 16) * factor);
        const b = Math.floor(parseInt(hex.substr(4, 2), 16) * factor);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // ===== CONTROLE DA ANIMAÇÃO =====
    startAnimation() {
        this.isActive = true;
        this.animate();
    }

    animate = () => {
        if (!this.isActive) return;
        
        this.render();
        this.animationId = requestAnimationFrame(this.animate);
    }

    stop() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    // ===== CONTROLES PÚBLICOS =====
    zoomIn() {
        this.camera.z = Math.max(200, this.camera.z - 100);
    }

    zoomOut() {
        this.camera.z = Math.min(2000, this.camera.z + 100);
    }

    resetView() {
        this.camera.rotationX = 0;
        this.camera.rotationY = 0;
        this.camera.z = 1000;
        this.touch.velocity.x = 0;
        this.touch.velocity.y = 0;
    }

    focusOnMemory(year) {
        const memoryPlanet = this.planets.find(p => p.year === year);
        if (memoryPlanet) {
            // Calcular ângulo para focar no planeta
            const targetAngleY = Math.atan2(memoryPlanet.x, memoryPlanet.z);
            const targetAngleX = Math.atan2(memoryPlanet.y, Math.sqrt(memoryPlanet.x * memoryPlanet.x + memoryPlanet.z * memoryPlanet.z));
            
            // Animar câmera para a posição
            this.animateCamera(targetAngleY, targetAngleX, 800);
        }
    }

    animateCamera(targetY, targetX, targetZ) {
        const startY = this.camera.rotationY;
        const startX = this.camera.rotationX;
        const startZ = this.camera.z;
        
        const duration = 2000; // 2 segundos
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing função
            const ease = 1 - Math.pow(1 - progress, 3);
            
            this.camera.rotationY = startY + (targetY - startY) * ease;
            this.camera.rotationX = startX + (targetX - startX) * ease;
            this.camera.z = startZ + (targetZ - startZ) * ease;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
}

// CSS para controles do universo
const universoCSS = `
<style>
.universo-controls {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1000;
}

.universo-btn {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.universo-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

.universo-btn:active {
    transform: scale(0.95);
}

.universo-info {
    position: fixed;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    color: white;
    padding: 20px;
    border-radius: 15px;
    max-width: 250px;
    font-size: 0.9rem;
    line-height: 1.4;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    z-index: 1000;
}

.universo-info.show {
    opacity: 1;
    pointer-events: all;
}

.universo-touch-hint {
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 107, 157, 0.9);
    color: white;
    padding: 15px 25px;
    border-radius: 25px;
    font-size: 1rem;
    text-align: center;
    animation: universoHintPulse 2s ease-in-out infinite;
    z-index: 1000;
    max-width: 90%;
}

@keyframes universoHintPulse {
    0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.9; }
    50% { transform: translateX(-50%) scale(1.05); opacity: 1; }
}

@media (max-width: 768px) {
    .universo-controls {
        bottom: 100px;
        right: 15px;
    }
    
    .universo-btn {
        width: 45px;
        height: 45px;
        font-size: 1rem;
    }
    
    .universo-info {
        left: 15px;
        right: 15px;
        max-width: none;
        top: 20px;
        transform: none;
    }
}
</style>
`;

// Adicionar CSS
document.head.insertAdjacentHTML('beforeend', universoCSS);

// Inicializar universo quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.universo3D = new Universo3D();
    
    // Adicionar controles
    const controls = document.createElement('div');
    controls.className = 'universo-controls';
    controls.innerHTML = `
        <button class="universo-btn" onclick="universo3D.zoomIn()" title="Zoom In">🔍</button>
        <button class="universo-btn" onclick="universo3D.zoomOut()" title="Zoom Out">🔎</button>
        <button class="universo-btn" onclick="universo3D.resetView()" title="Reset View">🏠</button>
        <button class="universo-btn" onclick="toggleUniversoInfo()" title="Ajuda">❓</button>
    `;
    document.body.appendChild(controls);
    
    // Adicionar informações
    const info = document.createElement('div');
    info.className = 'universo-info';
    info.id = 'universo-info';
    info.innerHTML = `
        <h3>🌌 Controles do Universo</h3>
        <p>📱 <strong>Celular:</strong></p>
        <p>• Deslize para navegar</p>
        <p>• Pinch para zoom</p>
        <p>• Incline o device</p>
        <br>
        <p>🖱️ <strong>Desktop:</strong></p>
        <p>• Arraste para rotacionar</p>
        <p>• Use os botões para zoom</p>
        <br>
        <p>✨ Toque nos planetas coloridos para ver as memórias!</p>
    `;
    document.body.appendChild(info);
    
    // Adicionar dica inicial
    const hint = document.createElement('div');
    hint.className = 'universo-touch-hint';
    hint.innerHTML = '✨ Deslize com o dedo para navegar pelo universo de memórias! 🌌';
    document.body.appendChild(hint);
    
    // Remover dica após 5 segundos
    setTimeout(() => {
        hint.style.opacity = '0';
        setTimeout(() => hint.remove(), 500);
    }, 5000);
    
    console.log('🌌 Universo 3D carregado! Use gestos para navegar!');
});

// Função para toggle das informações
function toggleUniversoInfo() {
    const info = document.getElementById('universo-info');
    info.classList.toggle('show');
}
