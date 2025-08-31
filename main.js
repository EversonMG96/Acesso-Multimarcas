const vehicleData = {
            'audi_r8': {
                name: 'Audi R8',
                images: [
                    "https://images.unsplash.com/photo-1621289196309-8472535b91b5?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1511994689255-b461113b2909?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1555547432-84c6799516aa?q=80&w=2070&auto=format&fit=crop"
                ]
            },
            'mercedes_c_class': {
                name: 'Mercedes-Benz C-Class',
                images: [
                    "https://images.unsplash.com/photo-1627072554747-d1a89c836934?q=80&w=1932&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1582290647167-16017b8f0477?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1584347712497-8c3461ce5854?q=80&w=1932&auto=format&fit=crop"
                ]
            },
            'porsche_911': {
                name: 'Porsche 911',
                images: [
                    "https://images.unsplash.com/photo-1574765636306-382a3928e469?q=80&w=1932&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1581093836338-79174668b812?q=80&w=1932&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1621532884633-9111867c4278?q=80&w=1932&auto=format&fit=crop"
                ]
            },
            'bmw_m5': {
                name: 'BMW M5',
                images: [
                    "https://images.unsplash.com/photo-1517524008697-cd09a9640984?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1551670989-13ae532822a9?q=80&w=2070&auto=format&fit=crop"
                ]
            },
            'ferrari_488': {
                name: 'Ferrari 488',
                images: [
                    "https://images.unsplash.com/photo-1549480104-54794e75a34a?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1542362567-20149022638a?q=80&w=2070&auto=format&fit=crop"
                ]
            },
            'lamborghini_huracan': {
                name: 'Lamborghini Huracán',
                images: [
                    "https://images.unsplash.com/photo-1627344955747-920f32194639?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1542362567-20149022638a?q=80&w=2070&auto=format&fit=crop"
                ]
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

        // Lida com o modal de detalhes do veículo
        const detailsModal = document.getElementById('details-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalCarouselContainer = document.getElementById('modal-carousel-container');
        let modalCarouselInterval = null;

        function showDetails(carKey) {
            const car = vehicleData[carKey];
            if (!car) return;

            modalTitle.textContent = car.name;
            setupModalCarousel(car.images);

            detailsModal.classList.remove('hidden');
            detailsModal.classList.add('flex');
        }

        function closeDetailsModal() {
            detailsModal.classList.remove('flex');
            detailsModal.classList.add('hidden');
            // Limpa o carrossel do modal ao fechar
            modalCarouselContainer.innerHTML = '';
            // Limpa o intervalo do carrossel para evitar bugs
            if (modalCarouselInterval) {
                clearInterval(modalCarouselInterval);
            }
        }

        // Lógica para configurar o carrossel do modal
        function setupModalCarousel(images) {
            modalCarouselContainer.innerHTML = ''; // Limpa o conteúdo anterior

            let currentSlide = 0;

            // Cria o div principal do carrossel
            const carouselInner = document.createElement('div');
            carouselInner.className = 'relative w-full h-full';
            modalCarouselContainer.appendChild(carouselInner);

            // Adiciona as imagens
            images.forEach((src, index) => {
                const slide = document.createElement('div');
                slide.className = `carousel-slide w-full h-full absolute inset-0 transition-opacity duration-1000 ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
                slide.innerHTML = `<img src="${src}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/1F2937/D1D5DB?text=Imagem+indisponível'" alt="Imagem do veículo" class="w-full h-full object-cover rounded-lg">`;
                carouselInner.appendChild(slide);
            });

            const slides = carouselInner.querySelectorAll('.carousel-slide');

            // Função para mostrar o slide
            const showSlide = (index) => {
                slides.forEach((slide, i) => {
                    slide.classList.remove('opacity-100');
                    slide.classList.add('opacity-0');
                    if (i === index) {
                        slide.classList.remove('opacity-0');
                        slide.classList.add('opacity-100');
                    }
                });
            };

            // Função para mudar o slide
            const changeSlide = (direction) => {
                currentSlide = (currentSlide + direction + slides.length) % slides.length;
                showSlide(currentSlide);
            };

            // Adiciona botões de navegação se houver mais de uma imagem
            if (images.length > 1) {
                const prevButton = document.createElement('button');
                prevButton.className = 'absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-colors z-20 focus:outline-none';
                prevButton.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>`;
                prevButton.onclick = () => changeSlide(-1);
                modalCarouselContainer.appendChild(prevButton);

                const nextButton = document.createElement('button');
                nextButton.className = 'absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-colors z-20 focus:outline-none';
                nextButton.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`;
                nextButton.onclick = () => changeSlide(1);
                modalCarouselContainer.appendChild(nextButton);

                // Autoplay
                modalCarouselInterval = setInterval(() => {
                    changeSlide(1);
                }, 5000);
            }
        }
        
        // Lógica para o carrossel do banner principal
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

        // Adiciona a função global para os botões do HTML
        window.changeSlide = changeHeroSlide;

        window.onload = function() {
            showHeroSlide(0);
            if (heroSlides.length > 1) {
                startHeroCarousel();
            }
        };