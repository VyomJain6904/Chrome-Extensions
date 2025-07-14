const BIRTHDATE = "2004-09-06";

const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
    },
    {
        text: "Life is what happens to you while you're busy making other plans.",
        author: "John Lennon",
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
    },
    {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle",
    },
    {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins",
    },
    {
        text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
        author: "Martin Luther King Jr.",
    },
    {
        text: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb",
    },
    {
        text: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs",
    },
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    {
        text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
        author: "Albert Einstein",
    },
    {
        text: "Be the change that you wish to see in the world.",
        author: "Mahatma Gandhi",
    },
    {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs",
    },
    {
        text: "Life is 10% what happens to you and 90% how you react to it.",
        author: "Charles R. Swindoll",
    },
    {
        text: "The only true wisdom is in knowing you know nothing.",
        author: "Socrates",
    },
    {
        text: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu",
    },
    {
        text: "That which does not kill us makes us stronger.",
        author: "Friedrich Nietzsche",
    },
    {
        text: "Life is really simple, but we insist on making it complicated.",
        author: "Confucius",
    },
    { text: "The unexamined life is not worth living.", author: "Socrates" },
    { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    {
        text: "Yesterday is history, tomorrow is a mystery, today is a gift.",
        author: "Eleanor Roosevelt",
    },
    {
        text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
    },
    {
        text: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
        author: "James Cameron",
    },
    {
        text: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.",
        author: "Maya Angelou",
    },
    {
        text: "The question isn't who is going to let me; it's who is going to stop me.",
        author: "Ayn Rand",
    },
];

function updateSecondsLived()
{
    const birthDate = new Date(BIRTHDATE);
    const now = new Date();
    const diffTime = Math.abs(now - birthDate);
    const diffSeconds = Math.floor(diffTime / 1000);

    const formatted = diffSeconds.toLocaleString().replace(/,/g, ":");

    document.getElementById("secondsDisplay").textContent = formatted;
}

function updateDate()
{
    const now = new Date();
    const dateString = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    document.getElementById("dateDisplay").textContent = dateString;
}

function getGreeting()
{
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 17) return "Good afternoon!";
    if (hour < 21) return "Good evening!";
    return "Good night!";
}

function getRandomQuote()
{
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function init()
{
    // Update seconds lived
    updateSecondsLived();
    setInterval(updateSecondsLived, 1000); // Update every second

    // Update date
    updateDate();
    setInterval(updateDate, 86400000); // Update every day

    // Set greeting
    document.getElementById("greeting").textContent = getGreeting();

    // Set random quote
    const randomQuote = getRandomQuote();
    document.getElementById("quote").textContent = `"${randomQuote.text}"`;
    document.getElementById("quoteAuthor").textContent = `— ${randomQuote.author}`;
}

init();