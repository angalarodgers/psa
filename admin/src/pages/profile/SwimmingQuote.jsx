import React, { useState, useEffect } from "react";

const SwimmingQuote = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const quotes = [
        "Swimming is not a sport, it's a way of life.",
        "The water is your friend. You don't have to fight with water, just share the same spirit as the water, and it will help you move.",
        "Learning to swim is like learning to walk. It takes time, patience, and practice.",
        "Swimming is not just a sport, it's a survival skill.",
        "Swimming is the ultimate stress reliever. It's hard to think about anything else when you're in the water.",
        "Swimming is a great equalizer. No matter who you are, you can benefit from learning how to swim.",
        "Swimming is one of the few activities that uses every muscle in your body. It's a great workout!",
        "Swimming is like meditation. It allows you to clear your mind and focus on your breathing.",
        "Swimming is a life skill. It can save your life or someone else's.",
        "Swimming is a way to connect with nature. It's a peaceful and calming experience.",
        "Swimming at Pro Swim Academy Kenya is not just about learning how to swim. It's about building confidence and making lifelong memories.",
        "At Pro Swim Academy Kenya, we believe that everyone can learn how to swim with the right guidance and instruction.",
        "Swimming is a fun and challenging activity that can keep you fit and healthy for life. Join us at Pro Swim Academy Kenya to start your journey!",
        "Swimming is a skill that can be learned at any age. Don't wait, start your lessons at Pro Swim Academy Kenya today.",
        "Swimming is not just a hobby, it's a passion. At Pro Swim Academy Kenya, we're passionate about helping you achieve your goals in the pool and beyond.",
        "Swimming is a great way to stay active and social. Join the Pro Swim Academy Kenya community and meet like-minded swimmers today!",
      ];

      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
    }, 6000); // 10 minutes in milliseconds
    return () => clearInterval(interval);
  }, []);

  return <>{quote}</>;
};

export default SwimmingQuote;
