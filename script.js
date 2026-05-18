// Aguarda o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // LÓGICA DO CARROSSEL (HOME)
    // ==========================================
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-image');
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');
    const dots = document.querySelectorAll('.dot');

    if (carouselSlide && carouselImages.length > 0) {
        let currentIndex = 0;
        const totalImages = carouselImages.length;

        function updateCarousel() {
            const displacement = -100 * currentIndex;
            carouselSlide.style.transform = `translateX(${displacement}%)`;
            
            dots.forEach(dot => dot.classList.remove('active'));
            if(dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        }

        function nextImage() {
            currentIndex++;
            if (currentIndex >= totalImages) currentIndex = 0;
            updateCarousel();
        }

        function prevImage() {
            currentIndex--;
            if (currentIndex < 0) currentIndex = totalImages - 1;
            updateCarousel();
        }

        nextBtn.addEventListener('click', nextImage);
        prevBtn.addEventListener('click', prevImage);
        setInterval(nextImage, 5000);
    }

    // ==========================================
    // LÓGICA DA GALERIA DE FOTOS (PRODUTO)
    // ==========================================
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(function(thumbnail) {
            thumbnail.addEventListener('click', function() {
                mainImage.src = this.src;
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // ==========================================
    // LÓGICA DE QUANTIDADE (CARRINHO)
    // ==========================================
    const btnMinus = document.getElementById('minus');
    const btnPlus = document.getElementById('plus');
    const qtyInput = document.getElementById('qty-input');

    if (btnMinus && btnPlus && qtyInput) {
        btnMinus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            if (val > 1) qtyInput.value = val - 1;
        });

        btnPlus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            qtyInput.value = val + 1;
        });
    }

    // ==========================================
    // LÓGICA DE CÁLCULO DE FRETE (VIACEP API)
    // ==========================================
    const btnFrete = document.querySelector('.shipping-search-btn') || document.querySelector('.btn-pesquisa-cep');
    const inputCep = document.querySelector('.cep-input') || document.querySelector('.shipping-bar input');
    const divResultado = document.querySelector('.frete-resultado');

    if (btnFrete && inputCep && divResultado) {
        btnFrete.addEventListener('click', () => {
            let cep = inputCep.value.replace(/\D/g, '');

            if (cep.length !== 8) {
                divResultado.style.display = 'block';
                divResultado.style.color = '#e63946'; 
                divResultado.innerHTML = '<i class="fas fa-exclamation-circle"></i> CEP inválido. Digite 8 números.';
                return;
            }

            divResultado.style.display = 'block';
            divResultado.style.color = 'var(--text-main)'; 
            divResultado.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculando frete...';

            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(dados => {
                    if (dados.erro) {
                        divResultado.style.color = '#e63946';
                        divResultado.innerHTML = '<i class="fas fa-times-circle"></i> CEP não encontrado.';
                    } else {
                        let valorFrete = dados.uf === 'SP' ? "R$ 12,90" : "R$ 25,90";
                        let prazo = dados.uf === 'SP' ? "1 a 2 dias úteis" : "5 a 7 dias úteis";

                        divResultado.style.color = '#4caf50'; 
                        divResultado.innerHTML = `
                            <strong>Frete para:</strong> ${dados.localidade} - ${dados.uf}<br>
                            <span style="color: var(--text-main); display: block; margin-top: 5px;">
                                <i class="fas fa-box"></i> Padrão: <strong>${valorFrete}</strong> (${prazo})
                            </span>
                        `;
                    }
                })
                .catch(() => {
                    divResultado.style.color = '#e63946';
                    divResultado.innerHTML = '<i class="fas fa-wifi"></i> Erro ao conectar. Tente novamente.';
                });
        });
    }

    // ==========================================
    // LÓGICA DA BARRA DE PESQUISA (MOCK)
    // ==========================================
    const searchInputs = document.querySelectorAll('.search-bar input');
    
    searchInputs.forEach(searchInput => {
        const searchContainer = searchInput.parentElement;
        const searchResults = document.createElement('div');
        searchResults.className = 'search-results';
        searchContainer.appendChild(searchResults);

        const bancoDeProdutos = [
            { nome: "SSD 1TB NVMe M.2", url: "produto.html" },
            { nome: "Placa Mãe Gamer B550", url: "produto.html" },
            { nome: "Memória RAM 16GB (2x8)", url: "produto.html" },
            { nome: "Headset Gamer 7.1", url: "produto.html" },
            { nome: "Mouse Gamer Pro 16k DPI", url: "produto.html" },
            { nome: "Teclado Mecânico Switch Red", url: "produto.html" },
            { nome: "Kit de Ferramentas Manutenção", url: "produto.html" },
            { nome: "Cadeira Gamer Ergonômica", url: "produto.html" },
            { nome: "Notebook Acer Nitro V15", url: "produto.html" }
        ];

        searchInput.addEventListener('input', function() {
            const termoBusca = this.value.toLowerCase();
            searchResults.innerHTML = ''; 

            if (termoBusca.length > 0) {
                const resultadosEncontrados = bancoDeProdutos.filter(produto => 
                    produto.nome.toLowerCase().includes(termoBusca)
                );

                if (resultadosEncontrados.length > 0) {
                    searchResults.style.display = 'block'; 
                    resultadosEncontrados.forEach(produto => {
                        const link = document.createElement('a');
                        link.href = produto.url;
                        link.textContent = produto.nome;
                        searchResults.appendChild(link);
                    });
                } else {
                    searchResults.style.display = 'block';
                    const semResultado = document.createElement('a');
                    semResultado.href = "#";
                    semResultado.textContent = "Nenhum produto encontrado";
                    semResultado.style.color = "var(--text-muted)";
                    semResultado.style.pointerEvents = "none"; 
                    searchResults.appendChild(semResultado);
                }
            } else {
                searchResults.style.display = 'none'; 
            }
        });

        document.addEventListener('click', function(event) {
            if (!searchContainer.contains(event.target)) {
                searchResults.style.display = 'none';
            }
        });
    });

    // ==========================================
    // LÓGICA DE TAMANHO DE FONTE GLOBAL
    // ==========================================
    let tamanhoFonteAtual = localStorage.getItem('voxtech_fontSize') ? parseInt(localStorage.getItem('voxtech_fontSize')) : 100;
    // O segredo está aqui: usar documentElement em vez de body
    document.documentElement.style.fontSize = tamanhoFonteAtual + '%';
    
    const btnAumentar = document.getElementById('btn-aumentar-fonte');
    const btnDiminuir = document.getElementById('btn-diminuir-fonte');
    const btnNormal = document.getElementById('btn-normal-fonte');

    if (btnAumentar && btnDiminuir && btnNormal) {
        btnAumentar.addEventListener('click', () => {
            if (tamanhoFonteAtual < 150) {
                tamanhoFonteAtual += 10;
                document.documentElement.style.fontSize = tamanhoFonteAtual + '%';
                localStorage.setItem('voxtech_fontSize', tamanhoFonteAtual);
            }
        });

        btnDiminuir.addEventListener('click', () => {
            if (tamanhoFonteAtual > 80) {
                tamanhoFonteAtual -= 10;
                document.documentElement.style.fontSize = tamanhoFonteAtual + '%';
                localStorage.setItem('voxtech_fontSize', tamanhoFonteAtual);
            }
        });

        btnNormal.addEventListener('click', () => {
            tamanhoFonteAtual = 100;
            document.documentElement.style.fontSize = tamanhoFonteAtual + '%';
            localStorage.setItem('voxtech_fontSize', tamanhoFonteAtual);
        });
    }

    // ==========================================
    // LÓGICA DO LEITOR DE TELA GLOBAL INTELIGENTE (VOZ)
    // ==========================================
    
    // 1. Injetar Estilos CSS para o Botão Flutuante Dinâmico
    const styles = document.createElement('style');
    styles.innerHTML = `
        #voxtech-global-tts {
            position: fixed; bottom: 20px; left: 20px; z-index: 9999;
            height: 50px; width: 50px; /* Inicia como Círculo */
            background-color: var(--red-primary); color: white;
            border: none; border-radius: 25px;
            cursor: pointer; box-shadow: 0 5px 15px rgba(0,0,0,0.5);
            display: flex; align-items: center; justify-content: flex-start;
            overflow: hidden; white-space: nowrap;
            transition: width 0.3s ease-in-out, background-color 0.3s, border-radius 0.3s;
            padding: 0; font-family: 'Inter', sans-serif;
        }
        /* Efeito Expandir (Pílula) no Hover ou quando falando */
        #voxtech-global-tts:hover, #voxtech-global-tts.speaking {
            width: 160px;
        }
        /* Estilo do Ícone */
        #voxtech-global-tts .tts-icon {
            font-size: 18px;
            min-width: 50px; /* Garante que o ícone fique centralizado no círculo inicial */
            display: flex; justify-content: center; align-items: center;
        }
        /* Estilo do Texto (Escondido inicialmente) */
        #voxtech-global-tts .tts-text {
            opacity: 0; width: 0;
            font-size: 14px; font-weight: bold;
            transition: opacity 0.2s 0.1s, width 0.3s;
        }
        /* Mostra o texto no Hover ou quando falando */
        #voxtech-global-tts:hover .tts-text, #voxtech-global-tts.speaking .tts-text {
            opacity: 1; width: auto; margin-right: 20px;
        }
        /* Cores no Hover */
        #voxtech-global-tts:hover { background-color: #c32b38; }
        /* Estado: Falando (Muda cor para destacar) */
        #voxtech-global-tts.speaking { background-color: #333; } 
    `;
    document.head.appendChild(styles);

    // 2. Criar Estrutura do Botão
    const btnLeitorGlobal = document.createElement('button');
    btnLeitorGlobal.id = 'voxtech-global-tts';
    // Estrutura interna: Ícone separado do Texto para animação
    btnLeitorGlobal.innerHTML = `
        <span class="tts-icon"><i class="fas fa-volume-up"></i></span>
        <span class="tts-text">Ouvir Página</span>
    `;
    document.body.appendChild(btnLeitorGlobal);

    let falando = false;
    const ttsText = btnLeitorGlobal.querySelector('.tts-text');
    const ttsIcon = btnLeitorGlobal.querySelector('.tts-icon i');

    // 3. Ação de Clique Inteligente
    btnLeitorGlobal.addEventListener('click', () => {
        
        if (falando) {
            // SE ESTIVER FALANDO -> PARAR
            window.speechSynthesis.cancel();
            resetarBotao();
        } else {
            // SE ESTIVER EM SILÊNCIO -> TENTAR LER

            // A. Verificar se há texto selecionado pelo usuário
            const textoSelecionado = window.getSelection().toString().trim();
            let textoParaLer = "";
            let ehSelecao = false;

            if (textoSelecionado) {
                // PRIORIDADE: Ler seleção
                textoParaLer = textoSelecionado;
                ehSelecao = true;
            } else {
                // FALLBACK: Ler conteúdo principal (<main>)
                const conteudoPrincipal = document.querySelector('main');
                if (conteudoPrincipal) {
                    textoParaLer = conteudoPrincipal.innerText;
                }
            }

            // B. Executar a leitura se houver texto
            if (textoParaLer) {
                const mensagem = new SpeechSynthesisUtterance(textoParaLer);
                mensagem.lang = 'pt-BR';
                mensagem.rate = 1.1; // Velocidade

                window.speechSynthesis.speak(mensagem);
                falando = true;

                // C. Feedback Visual do Botão
                btnLeitorGlobal.classList.add('speaking'); // Mantém expandido e muda cor
                ttsIcon.className = 'fas fa-stop'; // Ícone de Parar
                
                // Texto dinâmico
                if (ehSelecao) {
                    ttsText.innerText = 'Parar Seleção';
                } else {
                    ttsText.innerText = 'Parar Página';
                }

                // D. Resetar quando a fala terminar sozinha
                mensagem.onend = () => {
                    resetarBotao();
                };
            }
        }
    });

    // Função auxiliar para voltar o botão ao estado original
    function resetarBotao() {
        falando = false;
        btnLeitorGlobal.classList.remove('speaking');
        ttsIcon.className = 'fas fa-volume-up'; // Ícone original
        ttsText.innerText = 'Ouvir Página'; // Texto original
    }

});

// ==========================================
    // LÓGICA DE ABAS DO CHECKOUT (PAGAMENTO)
    // ==========================================
    const radiosPagamento = document.querySelectorAll('input[name="pagamento"]');
    const formCartao = document.getElementById('form-cartao');
    const formPix = document.getElementById('form-pix');

    if (radiosPagamento.length > 0 && formCartao && formPix) {
        radiosPagamento.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'cartao') {
                    formCartao.style.display = 'block';
                    formPix.style.display = 'none';
                } else if (e.target.value === 'pix') {
                    formCartao.style.display = 'none';
                    formPix.style.display = 'block';
                }
            });
        });
    }