# 💕 Surpresa de Aniversário Interativa 🎂

Uma experiência mágica e interativa de aniversário com efeitos 3D, música e timeline de memórias!

## ✨ Funcionalidades

### 🎭 **Experiência Completa**
- **Carta Animada 3D**: Envelope que se abre com efeito de máquina de escrever
- **Universo 3D Interativo**: Navegue pelo espaço com gestos touch
- **Timeline de Memórias**: Fotos e lembranças organizadas por ano
- **Efeitos Visuais**: Corações, confetes, estrelas e partículas
- **Música de Fundo**: Don't Wait - Mapei (com fallbacks românticos)

### 📱 **Controles Mobile/Touch**
- **Deslizar**: Navegue pelo universo 3D
- **Pinch**: Zoom in/out no espaço
- **Toque**: Interaja com elementos e fotos
- **Orientação**: Use a inclinação do dispositivo
- **Gestos**: Swipe para navegar na timeline

### 🎵 **Sistema de Áudio**
- Música de fundo automática
- Efeitos sonoros para interações
- Controle de volume e mute
- Múltiplos fallbacks de áudio

## 🚀 Como Usar

### **Opção 1: GitHub Pages (Recomendado)**

1. **Fazer Fork/Clone do repositório**
2. **Substituir as fotos**: Coloque suas fotos com os nomes:
   - `foto-2016.JPG`
   - `foto-2017.JPG` 
   - etc... até `foto-2025.jpg`
3. **Ativar GitHub Pages**:
   - Vá em `Settings` → `Pages`
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Save
4. **Compartilhar o link**: `https://seuusuario.github.io/nome-do-repo/`

### **Opção 2: Local**
```bash
# Clone o repositório
git clone https://github.com/seuusuario/surpresa-aniversario.git

# Abra o index.html no navegador
open index.html
```

## 📁 Estrutura do Projeto

```
📂 projeto/
├── 📄 index.html              # Página principal
├── 📂 styles/
│   ├── 🎨 main.css           # Estilos principais
│   ├── 🎨 carta.css          # Estilos da carta 3D
│   └── 🎨 animations.css     # Animações avançadas
├── 📂 scripts/
│   ├── ⚡ main.js            # Controle principal
│   ├── ⚡ effects.js         # Efeitos visuais
│   ├── ⚡ timeline.js        # Timeline interativa
│   └── ⚡ universo3d.js      # Universo 3D touch
├── 🖼️ foto-2016.JPG          # Suas fotos (2016-2025)
├── 🖼️ foto-2017.JPG
└── 📖 README.md              # Este arquivo
```

## 🎨 Personalização

### **Modificar Textos**
Edite o arquivo `index.html` para personalizar:
- Mensagens da carta
- Timeline de memórias
- Títulos e descrições

### **Trocar Cores**
No arquivo `styles/main.css`, modifique as variáveis CSS:
```css
:root {
    --primary-pink: #ff6b9d;    /* Cor principal */
    --primary-purple: #c44569;  /* Cor secundária */
    --primary-blue: #667eea;    /* Cor de destaque */
}
```

### **Adicionar Mais Anos**
No arquivo `scripts/timeline.js`, adicione novos objetos ao array `timelineData`:
```javascript
{
    year: '2026',
    image: 'foto-2026.jpg',
    title: 'Novo Ano',
    memory: 'Nova memória especial! ❤️',
    emoji: '🎉',
    color: '#ff69b4'
}
```

## 🌟 Efeitos Especiais

### **Universo 3D**
- 800+ estrelas cintilantes
- 5 nebulosas coloridas
- 8 planetas decorativos
- 10 planetas de memórias (2016-2025)
- 300 partículas de poeira cósmica

### **Interações**
- Toque nas fotos para ampliar
- Clique em qualquer lugar para efeitos
- Use gestos para navegação 3D
- Botão de comemoração final

### **Animações**
- Carta que se abre realisticamente
- Efeito de máquina de escrever
- Transições suaves entre telas
- Partículas físicas realistas

## 📱 Compatibilidade

### **Mobile** ✅
- iOS Safari
- Chrome Android
- Firefox Mobile
- Edge Mobile

### **Desktop** ✅
- Chrome/Chromium
- Firefox
- Safari
- Edge

### **Recursos**
- Touch/gestos nativos
- Orientação do dispositivo
- Vibração (quando disponível)
- Fullscreen API
- Web Audio API

## 🎵 Música

A experiência inclui:
- **Principal**: Don't Wait - Mapei (similar/livre)
- **Fallback 1**: Piano romântico ambiente
- **Fallback 2**: Melodia de aniversário
- **Efeitos**: Sons de página, cliques, celebração

## 🐛 Resolução de Problemas

### **Fotos não aparecem**
- Verifique se os nomes dos arquivos estão corretos
- Use formatos: `.jpg`, `.jpeg`, `.png`
- Tamanho recomendado: máximo 2MB por foto

### **Música não toca**
- Alguns navegadores exigem interação do usuário primeiro
- Clique no botão de música ou toque na tela
- Verifique se o volume não está mudo

### **Efeitos lentos no celular**
- Use modo avião + WiFi para melhor performance
- Feche outros apps em segundo plano
- Alguns efeitos são reduzidos automaticamente no mobile

## 💝 Dicas de Uso

1. **Melhor experiência**: Use no celular em landscape
2. **Primeira vez**: Permita áudio quando solicitado
3. **Fotos**: Use imagens com boa qualidade
4. **Compartilhar**: Envie apenas o link, não arquivos
5. **Personalizar**: Modifique textos para sua situação

## ❤️ Feito com Amor

Este projeto foi criado com muito carinho para proporcionar uma experiência única e inesquecível de aniversário. Cada efeito, animação e detalhe foi pensado para emocionar e surpreender!

### **Tecnologias Utilizadas**
- HTML5 Canvas para gráficos 3D
- CSS3 com animações avançadas
- JavaScript ES6+ para interatividade
- Web APIs (Touch, Audio, Vibration, Orientation)
- Matemática 3D para projeção e rotação

---

## 🚀 **Como Subir no GitHub Pages**

### **Passo a Passo Completo:**

1. **Criar conta no GitHub** (github.com)
2. **Novo repositório**: 
   - Nome: `surpresa-aniversario` (ou similar)
   - Público ✅
   - Add README ✅
3. **Upload dos arquivos**:
   - Arraste todos os arquivos do projeto
   - Commit: "Adicionar surpresa de aniversário"
4. **Ativar Pages**:
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: main
   - Save
5. **Aguardar 2-5 minutos**
6. **Link final**: `https://seuusuario.github.io/surpresa-aniversario/`

### **Exemplo de link final:**
`https://joao123.github.io/surpresa-aniversario/`

**Pronto! Agora é só compartilhar o link! 🎉**

---

*Criado com 💕 para momentos especiais inesquecíveis!*
