import React from "react"
import "../styles/Footer.css"

export default function Footer() {
    const [quoteObj, setQuoteObj] = React.useState({})
    
    React.useEffect(() => {
        fetch("https://api.quotable.io/quotes/random")
        .then(res => res.json())
        .then(data => setQuoteObj(data[0]))
    }, [])
    
    return (
        <footer className="footer-wrapper">
            <p className="quote-text">"{Object.keys(quoteObj).length === 0 ? "Quote Text" : quoteObj.content}"</p>     
            <p className="quote-author">{Object.keys(quoteObj).length === 0 ? "Quote Author" : quoteObj.author}</p>     
        </footer>
    )
}