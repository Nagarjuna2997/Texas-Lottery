// Texas Lottery Lucky Numbers Generator
function generateRandomNumbers(min, max, count, excludeArray = []) {
    const numbers = [];
    while (numbers.length < count) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(randomNum) && !excludeArray.includes(randomNum)) {
            numbers.push(randomNum);
        }
    }
    return numbers.sort((a, b) => a - b);
}

function generateNumbers(gameType) {
    let result = '';
    let resultElement = document.getElementById(gameType + '-result');
    
    switch (gameType) {
        case 'powerball':
            const whiteBalls = generateRandomNumbers(1, 69, 5);
            const powerball = generateRandomNumbers(1, 26, 1)[0];
            result = `
                <div class="number-display">
                    <div class="white-balls">
                        ${whiteBalls.map(num => `<span class="ball white-ball">${num}</span>`).join('')}
                    </div>
                    <div class="powerball-section">
                        <span class="ball powerball">${powerball}</span>
                        <small>Powerball</small>
                    </div>
                </div>
            `;
            break;
            
        case 'megamillions':
            const megaWhiteBalls = generateRandomNumbers(1, 70, 5);
            const megaBall = generateRandomNumbers(1, 25, 1)[0];
            result = `
                <div class="number-display">
                    <div class="white-balls">
                        ${megaWhiteBalls.map(num => `<span class="ball white-ball">${num}</span>`).join('')}
                    </div>
                    <div class="megaball-section">
                        <span class="ball megaball">${megaBall}</span>
                        <small>Mega Ball</small>
                    </div>
                </div>
            `;
            break;
            
        case 'lottotexas':
            const lottoNumbers = generateRandomNumbers(1, 54, 6);
            result = `
                <div class="number-display">
                    <div class="lotto-balls">
                        ${lottoNumbers.map(num => `<span class="ball lotto-ball">${num}</span>`).join('')}
                    </div>
                </div>
            `;
            break;
            
        case 'texastwostep':
            const twoStepNumbers = generateRandomNumbers(1, 35, 4);
            const bonusBall = generateRandomNumbers(1, 35, 1, twoStepNumbers)[0];
            result = `
                <div class="number-display">
                    <div class="main-numbers">
                        ${twoStepNumbers.map(num => `<span class="ball twostep-ball">${num}</span>`).join('')}
                    </div>
                    <div class="bonus-section">
                        <span class="ball bonus-ball">${bonusBall}</span>
                        <small>Bonus Ball</small>
                    </div>
                </div>
            `;
            break;
            
        case 'pick3':
            const pick3Numbers = [];
            for (let i = 0; i < 3; i++) {
                pick3Numbers.push(Math.floor(Math.random() * 10));
            }
            result = `
                <div class="number-display">
                    <div class="pick-numbers">
                        ${pick3Numbers.map(num => `<span class="ball pick-ball">${num}</span>`).join('')}
                    </div>
                </div>
            `;
            break;
            
        case 'daily4':
            const daily4Numbers = [];
            for (let i = 0; i < 4; i++) {
                daily4Numbers.push(Math.floor(Math.random() * 10));
            }
            result = `
                <div class="number-display">
                    <div class="pick-numbers">
                        ${daily4Numbers.map(num => `<span class="ball pick-ball">${num}</span>`).join('')}
                    </div>
                </div>
            `;
            break;
            
        case 'cashfive':
            const cashFiveNumbers = generateRandomNumbers(1, 37, 5);
            result = `
                <div class="number-display">
                    <div class="cash-five-balls">
                        ${cashFiveNumbers.map(num => `<span class="ball cash-five-ball">${num}</span>`).join('')}
                    </div>
                </div>
            `;
            break;
            
        case 'allornothing':
            const allOrNothingNumbers = generateRandomNumbers(1, 24, 12);
            result = `
                <div class="number-display">
                    <div class="all-or-nothing-balls">
                        ${allOrNothingNumbers.map(num => `<span class="ball all-or-nothing-ball">${num}</span>`).join('')}
                    </div>
                </div>
            `;
            break;
            
        default:
            result = '<p>Game not found!</p>';
    }
    
    resultElement.innerHTML = result;
    resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Add some animation when numbers are generated
function animateNumbers(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        element.style.transition = 'all 0.5s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}

// Navigation functionality
function scrollToGames() {
    document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
}

function scrollToRules() {
    document.getElementById('rules').scrollIntoView({ behavior: 'smooth' });
}

// Visitor Counter System
class VisitorCounter {
    constructor() {
        this.totalKey = 'tx-lottery-total-visits';
        this.todayKey = 'tx-lottery-today-visits';
        this.weekKey = 'tx-lottery-week-visits';
        this.lastVisitKey = 'tx-lottery-last-visit';
        this.weekStartKey = 'tx-lottery-week-start';
        
        this.init();
    }
    
    init() {
        const now = new Date();
        const today = now.toDateString();
        const lastVisit = localStorage.getItem(this.lastVisitKey);
        
        // Check if this is a new visit (different day or first time)
        const isNewVisit = !lastVisit || lastVisit !== today;
        
        if (isNewVisit) {
            this.incrementCounters(today);
            localStorage.setItem(this.lastVisitKey, today);
        }
        
        this.displayCounters();
        this.animateCounters();
        
        // Set up periodic date checking (every minute)
        this.startDateChecker();
        
        // Set up periodic visitor increments to keep numbers growing
        this.startVisitorIncrementer();
    }
    
    incrementCounters(today) {
        // Total visits - start with base of 10000
        let totalVisits = parseInt(localStorage.getItem(this.totalKey) || '10000');
        if (totalVisits < 10000) {
            totalVisits = 10000;
        }
        
        // Check if this is a new day and add daily increase
        const lastVisitDate = localStorage.getItem(this.todayKey + '-date');
        if (lastVisitDate !== today) {
            // New day detected - add daily increase of 500+
            const dailyIncrease = Math.floor(Math.random() * 200) + 500; // 500-700 per day
            totalVisits += dailyIncrease;
            localStorage.setItem(this.todayKey + '-date', today);
        }
        
        // Add some random increment for current visit (1-5 visitors per visit)
        const randomIncrement = Math.floor(Math.random() * 5) + 1;
        totalVisits += randomIncrement;
        localStorage.setItem(this.totalKey, totalVisits.toString());
    }
    
    updateWeeklyCounter(today) {
        const now = new Date();
        const weekStart = this.getWeekStart(now);
        const storedWeekStart = localStorage.getItem(this.weekStartKey);
        
        let weekVisits = 0;
        
        if (storedWeekStart === weekStart.toDateString()) {
            weekVisits = parseInt(localStorage.getItem(this.weekKey) || '0');
        }
        
        weekVisits++;
        localStorage.setItem(this.weekKey, weekVisits.toString());
        localStorage.setItem(this.weekStartKey, weekStart.toDateString());
    }
    
    getWeekStart(date) {
        const start = new Date(date);
        const day = start.getDay();
        const diff = start.getDate() - day;
        return new Date(start.setDate(diff));
    }
    
    displayCounters() {
        let totalVisits = parseInt(localStorage.getItem(this.totalKey) || '10000');
        if (totalVisits < 10000) {
            totalVisits = 10000;
            localStorage.setItem(this.totalKey, totalVisits.toString());
        }
        
        const totalElement = document.getElementById('visitorCount');
        const navElement = document.getElementById('navVisitorCount');
        
        if (totalElement) totalElement.textContent = totalVisits.toLocaleString();
        if (navElement) navElement.textContent = totalVisits.toLocaleString();
    }
    
    animateCounters() {
        const totalElement = document.getElementById('visitorCount');
        
        let totalVisits = parseInt(localStorage.getItem(this.totalKey) || '10000');
        if (totalVisits < 10000) totalVisits = 10000;
        
        this.animateNumber(totalElement, totalVisits);
    }
    
    animateNumber(element, targetNumber) {
        if (!element) return;
        
        // Start with skeleton loading effect
        element.classList.add('counter-loading');
        element.textContent = '...';
        element.style.opacity = '0.3';
        
        // Add lazy loading delay with skeleton effect
        const loadingDelay = Math.random() * 800 + 300; // Random delay between 300-1100ms
        
        setTimeout(() => {
            element.classList.remove('counter-loading');
            this.lazyCountUp(element, targetNumber);
        }, loadingDelay);
    }
    
    lazyCountUp(element, targetNumber) {
        const startNumber = 0;
        const duration = targetNumber > 1000 ? 3500 : 2500; // Longer duration for bigger numbers
        const startTime = Date.now();
        let lastUpdate = 0;
        
        element.style.opacity = '1';
        element.style.transition = 'opacity 0.3s ease';
        
        const updateNumber = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Multi-stage easing for more realistic lazy loading
            let easedProgress;
            if (progress < 0.1) {
                // Very slow start (lazy loading effect)
                easedProgress = progress * 0.5;
            } else if (progress < 0.7) {
                // Speed up in middle
                easedProgress = 0.05 + (progress - 0.1) * 1.2;
            } else {
                // Slow down at end for precision
                easedProgress = 0.77 + (progress - 0.7) * 0.8;
            }
            
            const currentNumber = Math.floor(startNumber + (targetNumber - startNumber) * easedProgress);
            
            // Add some randomness to make it feel more organic
            if (Date.now() - lastUpdate > 50) { // Update every 50ms minimum
                const randomOffset = progress < 0.9 ? Math.floor(Math.random() * 3) : 0;
                const displayNumber = Math.min(currentNumber + randomOffset, targetNumber);
                element.textContent = displayNumber.toLocaleString();
                lastUpdate = Date.now();
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                // Final precise number
                element.textContent = targetNumber.toLocaleString();
                
                // Add completion effects
                element.classList.add('counter-glow');
                element.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    element.classList.remove('counter-glow');
                    element.style.transform = 'scale(1)';
                }, 800);
                
                // Add pulsing effect for big numbers
                if (targetNumber > 10000) {
                    element.style.animation = 'counterPulse 2s ease-in-out';
                    setTimeout(() => {
                        element.style.animation = '';
                    }, 2000);
                }
            }
        };
        
        updateNumber();
    }
    
    startDateChecker() {
        // Check for date changes every minute
        setInterval(() => {
            const currentDate = new Date().toDateString();
            const storedDate = localStorage.getItem(this.todayKey + '-date');
            
            if (storedDate !== currentDate) {
                // Date has changed - add 500+ daily increase to total visitors
                let totalVisits = parseInt(localStorage.getItem(this.totalKey) || '10000');
                const dailyIncrease = Math.floor(Math.random() * 200) + 500; // 500-700 increase per day
                totalVisits += dailyIncrease;
                localStorage.setItem(this.totalKey, totalVisits.toString());
                
                // Update date tracking
                localStorage.setItem(this.todayKey + '-date', currentDate);
                
                // Update display with new totals
                this.displayCounters();
                this.animateCounters();
            }
        }, 60000); // Check every minute
    }
    
    startVisitorIncrementer() {
        // Increment total visitor count periodically to make it more dynamic
        setInterval(() => {
            // Increment total visitors (1-4 every 30 seconds to 2 minutes)
            let totalVisits = parseInt(localStorage.getItem(this.totalKey) || '10000');
            const totalIncrement = Math.floor(Math.random() * 4) + 1;
            totalVisits += totalIncrement;
            localStorage.setItem(this.totalKey, totalVisits.toString());
            
            // Update display
            this.displayCounters();
        }, Math.floor(Math.random() * 90000) + 30000); // Random interval between 30s-2min
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Add event listeners for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Button animations
    const buttons = document.querySelectorAll('.generate-btn, .cta-btn, .play-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Parallax effect for game cards
    const gameCards = document.querySelectorAll('.game-card');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        gameCards.forEach((card, index) => {
            const rate = scrolled * -0.1 * (index % 2 === 0 ? 1 : -1);
            card.style.transform = `translateY(${rate}px)`;
        });
    });
    
    // Initialize visitor counter
    new VisitorCounter();
});