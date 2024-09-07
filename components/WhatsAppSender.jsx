import { useState } from 'react';
import './WhatsAppSender.css';

const WhatsAppSender = () => {
    const [phoneNumbers, setPhoneNumbers] = useState('');
    const [numbersList, setNumbersList] = useState([]);
    const [sentNumbers, setSentNumbers] = useState({});

    const handleInputChange = (e) => {
        // Filter input to only allow numbers, spaces, commas, new lines, and "+" characters
        const filteredInput = e.target.value.replace(/[^\d,+\s\n]/g, '');
        setPhoneNumbers(filteredInput);
    };

    const handleSubmit = () => {
        if (!phoneNumbers) return;

        const numbersArray = phoneNumbers.split(/[\n,]+/).map((num) => num.trim());
        setNumbersList(numbersArray.filter((num) => num !== '')); // Exclude empty strings
    };

    const handleSend = (number) => {
        if (number) {
            const formattedNumber = number.replace(/[^0-9]/g, '');
            const whatsappURL = `https://wa.me/${formattedNumber}`;
            window.open(whatsappURL, `_blank`);
            setSentNumbers((prevState) => ({ ...prevState, [number]: true }));
        }
    };

    return (
        <div className="whatsapp-sender">
            <textarea
                placeholder="Paste phone numbers separated by commas or new lines"
                value={phoneNumbers}
                onChange={handleInputChange} // Updated handler to filter input
                rows={6}
                className="whatsapp-sender__textarea"
            />
            <button onClick={handleSubmit} className="whatsapp-sender__button">
                Submit
            </button>

            {/* Display the total number of extracted numbers */}
            {numbersList.length > 0 && (
                <div className="whatsapp-sender__count">
                    Total Numbers Extracted: {numbersList.length}
                </div>
            )}

            {numbersList.length > 0 && (
                <ul className="whatsapp-sender__list">
                    {numbersList.map((number, index) => (
                        <li key={index} className="whatsapp-sender__list-item">
                            <span
                                className={
                                    sentNumbers[number]
                                        ? 'whatsapp-sender__number--sent'
                                        : 'whatsapp-sender__number'
                                }
                            >
                                {number}
                            </span>{' '}
                            <button
                                onClick={() => handleSend(number)}
                                className={`whatsapp-sender__send-button ${sentNumbers[number] ? 'whatsapp-sender__send-button--sent' : ''
                                    }`}
                                disabled={sentNumbers[number]}
                            >
                                Send
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WhatsAppSender;