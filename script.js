document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        fetch('section.json').then(response => {
            if (!response.ok) {
                throw new Error('Failed to load sections data');
            }
            return response.json();
        }),
        fetch('service.json').then(response => {
            if (!response.ok) {
                throw new Error('Failed to load products data');
            }
            return response.json();
        }),
        fetch('coaches.json').then(response => {
            if (!response.ok) {
                throw new Error('Failed to load coaches data');
            }
            return response.json();
        }),
        fetch('membership.json').then(response => {
            if (!response.ok) {
                throw new Error('Failed to load membership data');
            }
            return response.json();
        })
    ])
    .then(([sectionsData, serviceData, coachesData, membershipData]) => {
    
        renderNavigation(sectionsData.navigation);
        renderHeroSection(sectionsData.hero);
        renderDirectorySection(sectionsData.directory, serviceData);
        renderClubGuideSection(sectionsData.clubGuide);
        renderCoachesSection(coachesData);
        renderMembershipSection(membershipData);
        renderFooter(sectionsData.footer);
        
    })
    .catch(error => {
        console.error('Error loading data:', error);
        document.body.innerHTML = `
            <div class="error-container">
                <h2>Oops! Something went wrong</h2>
                <p>We couldn't load the page content. Please try again later.</p>
                <p>Error details: ${error.message}</p>
            </div>
        `;
    });
});

function renderNavigation(navigationData) {
    const headerElement = document.getElementById('header');
    
    const navElement = document.createElement('nav');
    navElement.className = 'navbar';
    
    const logoDiv = document.createElement('div');
    logoDiv.className = 'logo';
    
    const logoLink = document.createElement('a');
    logoLink.href = navigationData.logo.link;
    
    const logoImg = document.createElement('img');
    logoImg.src = navigationData.logo.image;
    logoImg.alt = navigationData.logo.alt;
    logoImg.width = navigationData.logo.width;
    
    logoLink.appendChild(logoImg);
    logoDiv.appendChild(logoLink);
    
    const logoText = document.createElement('a');
    logoText.href = navigationData.logo.link;
    logoText.textContent = navigationData.logo.text;
    logoDiv.appendChild(logoText);
    
    const navLinksDiv = document.createElement('div');
    navLinksDiv.className = 'nav-links';
    
    navigationData.links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.textContent = link.text;
        navLinksDiv.appendChild(linkElement);
    });
    
    const burgerDiv = document.createElement('div');
    burgerDiv.className = 'burger';
    burgerDiv.id = 'burger';
    
    const burgerImg = document.createElement('img');
    burgerImg.src = 'images/burger.svg';
    burgerImg.alt = 'Menu';
    burgerImg.width = 30;
    
    burgerDiv.appendChild(burgerImg);
    
    navElement.appendChild(logoDiv);
    navElement.appendChild(navLinksDiv);
    navElement.appendChild(burgerDiv);
    
    headerElement.appendChild(navElement);
}

function renderHeroSection(heroData) {
    const mainElement = document.getElementById('main-content');
    
    const heroSection = document.createElement('section');
    heroSection.className = 'hero';
    
    const heroTextDiv = document.createElement('div');
    heroTextDiv.className = 'hero-text';
    
    const h1 = document.createElement('h1');
    h1.textContent = heroData.title;
    
    const h2 = document.createElement('h2');
    h2.textContent = heroData.subtitle;
    
    const description = document.createElement('p');
    description.textContent = heroData.description;
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';
    
    heroData.buttons.forEach(button => {
        const buttonElement = document.createElement('button');
        buttonElement.className = `button ${button.class}`;
        buttonElement.textContent = button.text;
        buttonElement.onclick = function() {
            location.href = button.link;
        };
        buttonsDiv.appendChild(buttonElement);
    });
    
    heroTextDiv.appendChild(h1);
    heroTextDiv.appendChild(h2);
    heroTextDiv.appendChild(description);
    heroTextDiv.appendChild(buttonsDiv);
    
    const arrowDiv = document.createElement('div');
    arrowDiv.className = 'arrow';
    
    const arrowImg = document.createElement('img');
    arrowImg.src = heroData.arrow.image;
    arrowImg.alt = heroData.arrow.alt;
    
    arrowDiv.appendChild(arrowImg);
    
    heroSection.appendChild(heroTextDiv);
    heroSection.appendChild(arrowDiv);
    
    mainElement.appendChild(heroSection);
}

function renderDirectorySection(directoryData, serviceData) {
    const mainElement = document.getElementById('main-content');
    
    const directorySection = document.createElement('section');
    directorySection.className = 'directory';
    directorySection.id = 'club_directory';
    
    const h2 = document.createElement('h2');
    h2.textContent = directoryData.title;
    
    const description = document.createElement('p');
    description.textContent = directoryData.description;
    
    const directoryGrid = document.createElement('div');
    directoryGrid.className = 'directory-grid';

    serviceData.forEach(service => {
        const directoryItem = document.createElement('div');
        directoryItem.className = `directory-item ${service.id.toLowerCase()}`;
        
        let content;
        
        if (service.external) {
            content = document.createElement('a');
            content.href = service.link;
            content.target = "_blank";
        } else {
            content = document.createElement('img');
            content.src = service.imageUrl;
            content.alt = service.title;
            
            if (service.link !== "#") {
                content.onclick = function() {
                    location.href = service.link;
                };
            }
        }
        
        if (service.external) {
            const img = document.createElement('img');
            img.src = service.imageUrl;
            img.alt = service.title;
            content.appendChild(img);
        }
        
        const span = document.createElement('span');
        span.textContent = service.title;
        
        directoryItem.appendChild(content);
        directoryItem.appendChild(span);
        directoryGrid.appendChild(directoryItem);
    });
    
    directorySection.appendChild(h2);
    directorySection.appendChild(description);
    directorySection.appendChild(directoryGrid);
    
    mainElement.appendChild(directorySection);
}

function renderClubGuideSection(guideData) {
    const mainElement = document.getElementById('main-content');
    
    const guideSection = document.createElement('section');
    guideSection.className = 'club-guide';
    guideSection.id = 'club_guide';
    
    const container = document.createElement('div');
    container.className = 'guide-container';
    
    const heading = document.createElement('div');
    heading.className = 'heading';
    
    const h2 = document.createElement('h2');
    h2.textContent = guideData.title;
    
    const subtitle = document.createElement('p');
    subtitle.textContent = guideData.subtitle;
    
    heading.appendChild(h2);
    heading.appendChild(subtitle);
    
    const content = document.createElement('div');
    content.className = 'guide-content';
    
    const videoDiv = document.createElement('div');
    videoDiv.className = 'guide-video';
    
    const video = document.createElement('video');
    video.src = guideData.videoSrc;
    video.controls = true;
    video.alt = "Club tour";
    
    videoDiv.appendChild(video);
    
    const textDiv = document.createElement('div');
    textDiv.className = 'guide-text';
    
    const h3 = document.createElement('h3');
    h3.textContent = guideData.heading;
    
    const description = document.createElement('p');
    description.textContent = guideData.description;
    
    const button = document.createElement('button');
    button.className = 'button member';
    button.textContent = guideData.buttonText;
    button.onclick = function() {
        location.href = guideData.buttonLink;
    };
    
    textDiv.appendChild(h3);
    textDiv.appendChild(description);
    textDiv.appendChild(button);
    
    content.appendChild(videoDiv);
    content.appendChild(textDiv);
    
    container.appendChild(heading);
    container.appendChild(content);
    
    guideSection.appendChild(container);
    
    mainElement.appendChild(guideSection);
    
    const separator = document.createElement('hr');
    separator.className = 'separator';
    mainElement.appendChild(separator);
}

function renderCoachesSection(coachesData) {
    const mainElement = document.getElementById('main-content');
    
    const coachesSection = document.createElement('section');
    coachesSection.className = 'coaches';
    coachesSection.id = 'our_coaches';
    
    const h2 = document.createElement('h2');
    h2.textContent = coachesData.title;
    
    const description = document.createElement('p');
    description.textContent = coachesData.description;
    
    const coachesGrid = document.createElement('div');
    coachesGrid.className = 'coaches-grid';
    
    coachesData.coaches.forEach(coach => {
        const coachDiv = document.createElement('div');
        coachDiv.className = 'coach';
        
        const img = document.createElement('img');
        img.src = coach.image;
        img.alt = `Coach ${coach.id}`;
        
        const h3 = document.createElement('h3');
        h3.textContent = coach.name;
        
        const p = document.createElement('p');
        p.textContent = coach.description;
        
        coachDiv.appendChild(img);
        coachDiv.appendChild(h3);
        coachDiv.appendChild(p);
        
        coachesGrid.appendChild(coachDiv);
    });
    
    coachesSection.appendChild(h2);
    coachesSection.appendChild(description);
    coachesSection.appendChild(coachesGrid);
    
    mainElement.appendChild(coachesSection);
}

function renderMembershipSection(membershipData) {
    const mainElement = document.getElementById('main-content');
    
    const membershipSection = document.createElement('section');
    membershipSection.className = 'membership';
    membershipSection.id = 'membership';
    
    const h2 = document.createElement('h2');
    h2.textContent = membershipData.title;
    
    const description = document.createElement('p');
    description.textContent = membershipData.description;
    
    const form = document.createElement('form');
    form.className = 'cta-form';
    
    membershipData.formFields.forEach(field => {
        const input = document.createElement('input');
        input.type = field.type;
        input.placeholder = field.placeholder;
        form.appendChild(input);
    });
    
    const button = document.createElement('button');
    button.className = 'button cta';
    button.textContent = membershipData.buttonText;
    
    form.appendChild(button);
    
    membershipSection.appendChild(h2);
    membershipSection.appendChild(description);
    membershipSection.appendChild(form);
    
    mainElement.appendChild(membershipSection);
}

function renderFooter(footerData) {
    const footerElement = document.getElementById('footer');
    
    const logoDiv = document.createElement('div');
    logoDiv.className = 'footer-logo';
    
    const logoLink = document.createElement('a');
    logoLink.href = '#';
    
    const logoImg = document.createElement('img');
    logoImg.src = footerData.logo.image;
    logoImg.alt = footerData.logo.alt;
    logoImg.width = footerData.logo.width;
    
    logoLink.appendChild(logoImg);
    logoDiv.appendChild(logoLink);
    
    const logoTextDiv = document.createElement('div');
    logoTextDiv.className = 'footer-logo-text';
    
    const logoTextLink = document.createElement('a');
    logoTextLink.href = '#';
    logoTextLink.textContent = footerData.logo.text;
    
    logoTextDiv.appendChild(logoTextLink);
    
    const socialsGrid = document.createElement('div');
    socialsGrid.className = 'socials-grid';
    
    footerData.socials.forEach(social => {
        const socialLink = document.createElement('a');
        socialLink.href = social.link;
        
        if (social.platform !== 'Website') {
            socialLink.target = '_blank';
        }
        
        const socialImg = document.createElement('img');
        socialImg.src = social.icon;
        socialImg.alt = social.platform;
        
        socialLink.appendChild(socialImg);
        socialsGrid.appendChild(socialLink);
    });
    
    const copyright = document.createElement('p');
    copyright.textContent = footerData.copyright;
    
    footerElement.appendChild(logoDiv);
    footerElement.appendChild(logoTextDiv);
    footerElement.appendChild(socialsGrid);
    footerElement.appendChild(copyright);
}
