import { useState } from 'react';
import styles from './WhatsAppSender.module.css';

const WhatsAppSender = () => {
    const [phoneNumbers, setPhoneNumbers] = useState('');
    const [numbersList, setNumbersList] = useState([]);
    const [sentNumbers, setSentNumbers] = useState({});
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Validate phone number format
    const isValidPhoneNumber = (number) => {
        const cleaned = number.replace(/[^0-9+]/g, '');
        // Phone numbers should be 10-15 digits (international format)
        return cleaned.length >= 10 && cleaned.length <= 15;
    };

    const handleInputChange = (e) => {
        // Filter input to only allow numbers, spaces, commas, new lines, and "+" characters
        const filteredInput = e.target.value.replace(/[^\d,+\s\n]/g, '');
        setPhoneNumbers(filteredInput);
        setErrorMessage(''); // Clear error when user types
    };

    const handleSubmit = () => {
        if (!phoneNumbers) {
            setErrorMessage('Please enter at least one phone number');
            return;
        }

        const numbersArray = phoneNumbers.split(/[\n,]+/).map((num) => num.trim());
        const nonEmptyNumbers = numbersArray.filter((num) => num !== '');

        // Remove duplicates using Set
        const uniqueNumbers = [...new Set(nonEmptyNumbers)];

        // Validate all numbers
        const validNumbers = uniqueNumbers.filter(isValidPhoneNumber);
        const invalidNumbers = uniqueNumbers.filter(num => !isValidPhoneNumber(num));

        if (invalidNumbers.length > 0) {
            setErrorMessage(`${invalidNumbers.length} invalid number(s) removed. Valid numbers must be 10-15 digits.`);
        } else {
            setErrorMessage('');
        }

        if (validNumbers.length === 0) {
            setErrorMessage('No valid phone numbers found. Numbers must be 10-15 digits.');
            setNumbersList([]);
            return;
        }

        setNumbersList(validNumbers);
        setSentNumbers({}); // Reset sent status when new numbers are submitted
    };

    const handleSend = (number) => {
        if (number) {
            const formattedNumber = number.replace(/[^0-9]/g, '');
            const messageParam = message ? `?text=${encodeURIComponent(message)}` : '';
            const whatsappURL = `https://wa.me/${formattedNumber}${messageParam}`;

            // Open WhatsApp and check for popup blocker
            const newWindow = window.open(whatsappURL, '_blank');

            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                setErrorMessage('Please allow popups to send WhatsApp messages');
            } else {
                setSentNumbers((prevState) => ({ ...prevState, [number]: true }));
                setErrorMessage(''); // Clear error on successful send
            }
        }
    };

    const handleClear = () => {
        setPhoneNumbers('');
        setNumbersList([]);
        setSentNumbers({});
        setMessage('');
        setErrorMessage('');
    };

    const handleSendAll = () => {
        if (numbersList.length === 0) return;

        numbersList.forEach((number, index) => {
            // Add delay between opens to avoid overwhelming the browser
            setTimeout(() => {
                handleSend(number);
            }, index * 500); // 500ms delay between each
        });
    };

    return (
        <div className={styles.whatsappSender}>
            <textarea
                id="phone-numbers-textarea"
                placeholder="Paste phone numbers separated by commas or new lines (e.g., +1234567890, +9876543210)"
                value={phoneNumbers}
                onChange={handleInputChange}
                rows={6}
                className={styles.textarea}
                aria-label="Phone numbers input"
            />

            <textarea
                placeholder="Optional: Enter a message to send (leave empty for no message)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className={styles.textarea}
                aria-label="Message template input"
            />

            <div className={styles.buttonGroup}>
                <button onClick={handleSubmit} className={styles.button}>
                    Submit
                </button>
                <button onClick={handleClear} className={styles.clearButton}>
                    Clear
                </button>
            </div>

            {/* Error message display */}
            {errorMessage && (
                <div className={styles.errorMessage} role="alert">
                    {errorMessage}
                </div>
            )}

            {/* Display the total number of extracted numbers */}
            {numbersList.length > 0 && (
                <div className={styles.count}>
                    Total Numbers Extracted: {numbersList.length} | Sent: {Object.keys(sentNumbers).length}
                </div>
            )}

            {numbersList.length > 0 && (
                <>
                    <button onClick={handleSendAll} className={styles.sendAllButton}>
                        Send to All ({numbersList.length})
                    </button>

                    <ul className={styles.list}>
                        {numbersList.map((number) => (
                            <li key={number} className={styles.listItem}>
                                <span
                                    className={
                                        sentNumbers[number]
                                            ? styles.numberSent
                                            : styles.number
                                    }
                                >
                                    {number}
                                </span>{' '}
                                <button
                                    onClick={() => handleSend(number)}
                                    className={`${styles.sendButton} ${sentNumbers[number] ? styles.sendButtonSent : ''
                                        }`}
                                    disabled={sentNumbers[number]}
                                    aria-label={`Send WhatsApp message to ${number}`}
                                >
                                    {sentNumbers[number] ? 'Sent ✓' : 'Send'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default WhatsAppSender;