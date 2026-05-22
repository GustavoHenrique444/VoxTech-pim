# VoxTech 🖥️🔴

> E-commerce front-end de hardware e periféricos de alta performance.

Projeto desenvolvido como parte do **Projeto Integrado Multidisciplinar (PIM)** do curso de **Análise e Desenvolvimento de Sistemas (ADS) da UNIP**. O objetivo é apresentar a interface completa e funcional de uma loja virtual focada no público gamer e em entusiastas de manutenção e montagem de PCs, com forte ênfase em usabilidade e acessibilidade.

---

## 🚀 Funcionalidades

O front-end simula toda a jornada de um cliente real, incluindo:

* **Jornada de Compra Completa:** Navegação desde a Home (Vitrine), passando por Filtros de Categoria interativos, Página de Produto detalhada, Carrinho com cálculo de frete (API ViaCEP) e tela de Checkout (simulação dinâmica de Cartão de Crédito/Pix).
* **Área do Cliente:** Telas de Login, Cadastro e um Painel de Perfil (Dashboard) completo com histórico de pedidos.
* **Acessibilidade de Alto Nível (A11y):**
  * Integração nativa com o Widget **VLibras**.
  * Sistema de **redimensionamento de fonte global** persistente (salvo via LocalStorage).
  * **Leitor de Tela Inteligente (TTS)** construído em JS, capaz de ler seleções de texto do usuário ou o conteúdo principal da página automaticamente.
* **Design Responsivo:** Layout fluido e moderno (Dark Theme com detalhes em vermelho) adaptável para dispositivos móveis e desktops.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica e acessível.
* **CSS3:** Flexbox, CSS Grid, variáveis globais (`:root`) e uso estratégico de unidades relativas (`rem`) para garantir o escalonamento visual perfeito do site.
* **JavaScript (Vanilla):** Manipulação ágil do DOM, lógicas de carrossel, filtros simulados, consumo de API REST para cálculo de CEP e integração com a *SpeechSynthesis API* nativa dos navegadores.

---

## ⚙️ Como Executar

Como se trata de um projeto focado no Front-end, não é necessária a instalação de dependências, bibliotecas ou servidores locais.

1. Clone este repositório: 
   ```bash
   git clone [https://github.com/GustavoHenrique444/VoxTech-pim.git](https://github.com/GustavoHenrique444/VoxTech-pim.git)
