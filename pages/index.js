import Head from 'next/head';
import WhatsAppSender from '../components/WhatsAppSender';
import Image from 'next/image';

const SendWhatsApp = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <Head>
                <title>Send WhatsApp Messages Easily - Bulk WhatsApp Sender Tool</title>
                <meta
                    name="description"
                    content="Easily send WhatsApp messages to multiple numbers with our user-friendly bulk WhatsApp sender tool. Save time and increase efficiency with just a few clicks."
                />
                <meta
                    name="keywords"
                    content="WhatsApp sender, bulk WhatsApp sender, send WhatsApp messages, WhatsApp tool, automate WhatsApp, WhatsApp marketing"
                />
                <meta name="author" content="Batch WHAT!" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="Send WhatsApp Messages Easily - Bulk WhatsApp Sender Tool" />
                <meta
                    property="og:description"
                    content="Easily send WhatsApp messages to multiple numbers with our user-friendly bulk WhatsApp sender tool."
                />
            </Head>

            {/* Main Content */}
            <div className="page-container">
                <header className="header">
                    <div className="logo-container">
                        <Image
                            src="/assets/batchwhat-logo-nobg-sm.png"
                            alt="BatchWhat Logo"
                            width={100}
                            height={100}
                            className="logo"
                        />
                    </div>
                    <h1 className="header-title">Bulk WhatsApp Sender Tool</h1>
                    <p className="header-subtitle">
                        Quickly send WhatsApp messages to multiple contacts with our easy-to-use tool. Perfect for businesses and marketers looking to save time.
                    </p>
                </header>

                <main className="main-content">
                    <WhatsAppSender />
                    <section className="info-section">
                        <h2>How to Use the Bulk WhatsApp Sender Tool</h2>
                        <p>
                            Simply paste your list of phone numbers, click "Submit", and then click "Send" next to each number to open a new WhatsApp message. Our tool will handle the rest for you, ensuring that you can easily reach out to multiple contacts with minimal effort.
                        </p>
                        <h3>Why Choose Our Tool?</h3>
                        <ul className="benefits-list">
                            <li>💬 Easy to use with no technical skills required</li>
                            <li>🚀 Fast and efficient message sending</li>
                            <li>🔒 Secure and private - we don't store your data</li>
                            <li>🌐 Perfect for businesses, marketers, and individuals</li>
                        </ul>
                    </section>

                    <section className="cta-section">
                        <h2>Get Started Today!</h2>
                        <p>
                            Start sending WhatsApp messages in bulk to grow your business and reach more customers. Our tool is designed to save you time and help you communicate more effectively.
                        </p>
                        <button onClick={() => document.getElementById('phone-numbers-textarea').focus()} className="cta-button">Try It Now!</button>
                    </section>
                </main>

                <footer className="footer">
                    <p>© {currentYear} Batch WHAT!. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
};

export default SendWhatsApp;