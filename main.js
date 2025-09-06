// Dados dos veículos com as imagens para o carrossel do modal e a descrição pré-escrita
        const vehicleData = {
            'audi_r8': {
                name: 'Audi R8',
                images: [
                    "https://images.unsplash.com/photo-1621289196309-8472535b91b5?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1511994689255-b461113b2909?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1555547432-84c6799516aa?q=80&w=2070&auto=format&fit=crop"
                ],
                description: 'O Audi R8 é um ícone de engenharia alemã, conhecido pelo seu design futurista e pelo desempenho do motor V10. Uma máquina que combina luxo, velocidade e tecnologia de ponta para uma experiência de condução inigualável.'
            },
            'mercedes_c_class': {
                name: 'Mercedes-Benz C-Class',
                images: [
                    "https://images.unsplash.com/photo-1627072554747-d1a89c836934?q=80&w=1932&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1582290647167-16017b8f0477?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1584347712497-8c3461ce5854?q=80&w=1932&auto=format&fit=crop"
                ],
                description: 'A Classe C da Mercedes-Benz oferece o equilíbrio perfeito entre elegância e modernidade. Com um interior sofisticado e tecnologia de ponta, este sedan proporciona uma viagem confortável e segura, ideal para quem valoriza o requinte.'
            },
            'porsche_911': {
                name: 'Porsche 911',
                images: [
                    "https://images.unsplash.com/photo-1574765636306-382a3928e469?q=80&w=1932&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1581093836338-79174668b812?q=80&w=1932&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1621532884633-9111867c4278?q=80&w=1932&auto=format&fit=crop"
                ],
                description: 'O Porsche 911 é um verdadeiro ícone de design e performance. A sua forma intemporal e a engenharia de precisão garantem uma experiência de condução emocionante e única, digna do seu legado lendário.'
            },
            'bmw_m5': {
                name: 'BMW M5',
                images: [
                    "https://images.unsplash.com/photo-1517524008697-cd09a9640984?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1551670989-13ae532822a9?q=80&w=2070&auto=format&fit=crop"
                ],
                description: 'O BMW M5 é a personificação da elegância e da potência. Combina a sofisticação de um sedan de luxo com a performance brutal de um carro desportivo, oferecendo uma dinâmica de condução inigualável.'
            },
            'ferrari_488': {
                name: 'Ferrari 488',
                images: [
                    "https://images.unsplash.com/photo-1549480104-54794e75a34a?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1542362567-20149022638a?q=80&w=2070&auto=format&fit=crop"
                ],
                description: 'A Ferrari 488 é uma obra de arte da engenharia italiana, projetada para a máxima emoção na estrada e na pista. O seu design aerodinâmico e o motor V8 turbo criam uma sinfonia de velocidade e precisão que cativa todos os sentidos.'
            },
            'lamborghini_huracan': {
                name: 'Lamborghini Huracán',
                images: [
                    "https://images.unsplash.com/photo-1627344955747-920f32194639?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1542362567-20149022638a?q=80&w=2070&auto=format&fit=crop"
                ],
                description: 'O Lamborghini Huracán não é apenas um carro, é uma declaração. Com as suas linhas agressivas e motor aspirado, ele oferece uma experiência de condução visceral e uma presença imponente que o distingue em qualquer lugar.'
            }
        };

        // Lógica de navegação entre páginas e seções
        function showPage(pageId) {
            document.querySelectorAll('.page-section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(`${pageId}-page`).style.display = 'block';
            window.scrollTo(0, 0);
        }

        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Lógica do menu móvel
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMenu = document.getElementById('close-menu');

        function openMobileMenu() {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            setTimeout(() => {
                mobileMenu.classList.add('translate-x-0');
            }, 10);
        }
        
        function closeMobileMenu() {
            mobileMenu.classList.remove('translate-x-0');
            setTimeout(() => {
                mobileMenu.classList.remove('flex');
                mobileMenu.classList.add('hidden');
            }, 300);
        }

        menuToggle.addEventListener('click', openMobileMenu);
        closeMenu.addEventListener('click', closeMobileMenu);

        // Lida com o envio do formulário de contato
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const formMessage = document.getElementById('form-message');
            formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
            formMessage.classList.remove('hidden', 'text-red-500');
            formMessage.classList.add('text-green-500');
            this.reset();
        });

        // Lógica do carrossel do banner principal
        let heroCarouselInterval = null;
        let heroCurrentSlide = 0;
        const heroSlides = document.querySelectorAll('#hero-carousel .carousel-slide');

        const showHeroSlide = (index) => {
            heroSlides.forEach((slide, i) => {
                slide.classList.remove('opacity-100');
                slide.classList.add('opacity-0');
                if (i === index) {
                    slide.classList.remove('opacity-0');
                    slide.classList.add('opacity-100');
                }
            });
        };

        const changeHeroSlide = (direction) => {
            heroCurrentSlide = (heroCurrentSlide + direction + heroSlides.length) % heroSlides.length;
            showHeroSlide(heroCurrentSlide);
        };

        const startHeroCarousel = () => {
            if (heroCarouselInterval) clearInterval(heroCarouselInterval);
            heroCarouselInterval = setInterval(() => changeHeroSlide(1), 5000);
        };

        window.onload = function() {
            showHeroSlide(0);
            if (heroSlides.length > 1) {
                startHeroCarousel();
            }
            applyThemeFromLocalStorage();

            // Configura os event listeners para a navegação principal e móvel
            setupNavigation();
        };

        // Lógica para configurar a navegação, substituindo os 'onclick' no HTML
        function setupNavigation() {
            const navLinks = [
                { id: 'nav-veiculos', page: 'home', section: 'veiculos' },
                { id: 'nav-sobre', page: 'home', section: 'sobre' },
                { id: 'nav-contato', page: 'home', section: 'contato' },
                { id: 'mobile-nav-veiculos', page: 'home', section: 'veiculos' },
                { id: 'mobile-nav-sobre', page: 'home', section: 'sobre' },
                { id: 'mobile-nav-contato', page: 'home', section: 'contato' },
                { id: 'hero-cta', page: 'home', section: 'veiculos' },
                { id: 'home-logo', page: 'home', section: 'top' }, // Rola para o topo da home
            ];

            navLinks.forEach(linkData => {
                const link = document.getElementById(linkData.id);
                if (link) {
                    link.addEventListener('click', (e) => {
                        e.preventDefault(); // Impede o comportamento padrão do link

                        if (linkData.page) {
                            showPage(linkData.page);
                        }

                        if (linkData.section && linkData.section !== 'top') {
                            scrollToSection(linkData.section);
                        } else if (linkData.section === 'top') {
                             window.scrollTo({ top: 0, behavior: 'smooth' });
                        }

                        // Fecha o menu móvel se estiver aberto
                        closeMobileMenu();
                    });
                }
            });
        }

        // Lida com o modal de detalhes do veículo
        const detailsModal = document.getElementById('details-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalCarouselContainer = document.getElementById('modal-carousel-container');
        const modalDescription = document.getElementById('modal-description');
        let currentCarKey = null;

        let modalCarouselInterval = null;

        function showDetails(carKey) {
            const car = vehicleData[carKey];
            if (!car) return;

            currentCarKey = carKey;
            modalTitle.textContent = car.name;
            setupModalCarousel(car.images);
            modalDescription.textContent = car.description;

            detailsModal.classList.remove('hidden');
            detailsModal.classList.add('flex');
        }

        function closeDetailsModal() {
            detailsModal.classList.remove('flex');
            detailsModal.classList.add('hidden');
            modalCarouselContainer.innerHTML = '';
            if (modalCarouselInterval) {
                clearInterval(modalCarouselInterval);
            }
        }

        // Lógica para configurar o carrossel do modal
        function setupModalCarousel(images) {
            modalCarouselContainer.innerHTML = '';

            let currentSlide = 0;

            const carouselInner = document.createElement('div');
            carouselInner.className = 'relative w-full h-full';
            modalCarouselContainer.appendChild(carouselInner);

            images.forEach((src, index) => {
                const slide = document.createElement('div');
                slide.className = `carousel-slide w-full h-full absolute inset-0 transition-opacity duration-1000 ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
                slide.innerHTML = `<img src="${src}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/1F2937/D1D5DB?text=Imagem+indisponível'" alt="Imagem do veículo" class="w-full h-full object-cover rounded-lg">`;
                carouselInner.appendChild(slide);
            });

            const slides = carouselInner.querySelectorAll('.carousel-slide');

            const showModalSlide = (index) => {
                slides.forEach((slide, i) => {
                    slide.classList.remove('opacity-100');
                    slide.classList.add('opacity-0');
                    if (i === index) {
                        slide.classList.remove('opacity-0');
                        slide.classList.add('opacity-100');
                    }
                });
            };

            const changeModalSlide = (direction) => {
                currentSlide = (currentSlide + direction + slides.length) % slides.length;
                showModalSlide(currentSlide);
            };

            if (images.length > 1) {
                const prevButton = document.createElement('button');
                prevButton.className = 'absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-colors z-20 focus:outline-none';
                prevButton.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>`;
                prevButton.onclick = () => changeModalSlide(-1);
                modalCarouselContainer.appendChild(prevButton);

                const nextButton = document.createElement('button');
                nextButton.className = 'absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-colors z-20 focus:outline-none';
                nextButton.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`;
                nextButton.onclick = () => changeModalSlide(1);
                modalCarouselContainer.appendChild(nextButton);

                modalCarouselInterval = setInterval(() => {
                    changeModalSlide(1);
                }, 5000);
            }
        }

        // Lógica de alternância de tema
        const themeToggle = document.getElementById('theme-toggle');

        function applyThemeFromLocalStorage() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }

        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // Adiciona a função global para os botões do HTML
        window.changeHeroSlide = changeHeroSlide;
        window.showPage = showPage;
        window.showDetails = showDetails;
        window.closeDetailsModal = closeDetailsModal;
        window.closeMobileMenu = closeMobileMenu;