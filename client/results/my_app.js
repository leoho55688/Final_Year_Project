import * as fs from "fs"

const result = {
    "Credit Card Payment Systems and Protocols": [
        {
            "question": "Which of the following payment methods involves the use of a physical card that is inserted into a payment terminal?",
            "answers": [
                "Contactless Payments",
                "Mobile Payments",
                "Chip-and-PIN Payments",
                "Online Payments"
            ],
            "correct_answer": "Chip-and-PIN Payments",
            "explanation": "Chip-and-PIN payments involve the use of a physical card that is inserted into a payment terminal and requires the user to enter a PIN (Personal Identification Number) to complete the transaction. Contactless Payments, Mobile Payments, and Online Payments are related to other payment methods that do not require the use of a physical card.",
            "correct": true
        },
        {
            "question": "What is the primary benefit of using EMV Chip Technology?",
            "answers": [
                "Increased security against fraud",
                "Faster transaction processing",
                "Reduced transaction fees",
                "Improved customer convenience"
            ],
            "correct_answer": "Increased security against fraud",
            "explanation": "EMV Chip Technology uses a microchip embedded in the payment card to store and process transaction data, making it more difficult for fraudsters to counterfeit or steal card information.",
            "correct": true
        },
        {
            "question": "Which of the following factors is NOT a key consideration when evaluating the effectiveness of a payment system?",
            "answers": ["Security", "Convenience", "Cost", "Innovation"],
            "correct_answer": "Innovation",
            "explanation": "While innovation is important for the advancement of payment systems, it is not a key consideration when evaluating their effectiveness. The effectiveness of a payment system is primarily determined by its security, convenience, and cost.",
            "correct": true
        },
        {   
            "question": "Which of the following is a key security measure used to prevent fraud in digital payments?",
            "answers": ["Encryption", "Tokenization", "Biometric authentication", "All of the above"],
            "correct_answer": "All of the above",
            "explanation": "Encryption, tokenization, and biometric authentication are all important security measures used to protect digital payments from fraud.",
            "correct": true
        },
        {
            "question": "Which technology replaces magnetic stripe cards with embedded chips?",
            "answers": ["EMV", "NFC", "QR code"],
            "correct_answer": "EMV",
            "explanation": "EMV (Europay, MasterCard, and Visa) is a global standard for chip-based payment cards that provides enhanced security and fraud protection compared to traditional magnetic stripe cards.",
            "correct": true
        },
    ],
    "Capital Structure and Valuation": [
        {
            "question": "Which of the following is a potential benefit of using debt financing?",
            "answers": [
                "Increased financial flexibility",
                "Reduced cost of capital",
                "Improved access to capital",
                "All of the above"
            ],
            "correct_answer": "All of the above",
            "explanation": "Debt financing can provide a number of benefits, including increased financial flexibility, reduced cost of capital, and improved access to capital.",
            "correct": false
        },
        {
            "question": "Which of the following statements about the impact of capital structure on firm value is true?",
            "answers": [
                "Capital structure has no impact on firm value.",
                "Firms with higher debt levels have higher firm value.",
                "Optimal capital structure maximizes firm value.",
                "Capital structure affects the riskiness of the firm."
            ],
            "correct_answer": "Optimal capital structure maximizes firm value.",
            "explanation": "Optimal capital structure balances debt and equity to maximize firm value. Higher debt levels can increase risk and cost of capital, while lower debt levels can limit growth opportunities. Therefore, (A) and (B) are incorrect. (D) is correct, but it is a restatement of the key concept rather than a specific answer to the question.",
            "correct": true
        },
        {
            "question": "Which of the following ratios measures the efficiency of a firm's use of its assets?",
            "answers": [
                "(A) Return on Assets (ROA)",
                "(B) Debt-to-Equity Ratio",
                "(C) Current Ratio",
                "(D) Gross Profit Margin"
            ],
            "correct_answer": "(A) Return on Assets (ROA)",
            "explanation": "ROA measures the profitability of a firm relative to its total assets. It indicates how effectively the firm is utilizing its assets to generate profits.",
            "correct": true
        },
        {
            "question": "Which of the following is NOT a factor that affects the optimal capital structure of a firm?",
            "answers": [
                "(A) Tax rate",
                "(B) Business risk",
                "(C) Growth opportunities",
                "(D) Management's risk tolerance"
            ],
            "correct_answer": "(D) Management's risk tolerance",
            "explanation": "Management's risk tolerance is not a factor that directly affects the optimal capital structure of a firm. The optimal capital structure is determined by the firm's tax rate, business risk, and growth opportunities.",
            "correct": true
        },
        {
            "question": "Which of the following is a key assumption of the Capital Asset Pricing Model (CAPM)?",
            "answers": [
                "(A) Investors are risk-averse",
                "(B) The market is efficient",
                "(C) All investors have the same investment horizon",
                "(D) The risk-free rate is constant"
            ],
            "correct_answer": "(B) The market is efficient",
            "explanation": "CAPM assumes that the market is efficient, meaning that all available information is reflected in the prices of securities.",
            "correct": true
        }
    ],
    "AS-AD model": [
        {
            "question": "Which of the following is NOT a determinant of aggregate demand?",
            "answers": [
                "Consumer spending",
                "Investment",
                "Government spending",
                "Technology"
            ],
            "correct_answer": "Technology",
            "explanation": "Aggregate demand is the total demand for goods and services in an economy. It is determined by consumer spending, investment, government spending, and net exports. Technology is not a determinant of aggregate demand.",
            "correct": true
        },
        {
            "question": "Which of the following is a policy tool used to stimulate aggregate demand?",
            "answers": [
                "Fiscal policy",
                "Monetary policy",
                "Supply-side economics",
                "Structural reforms"
            ],
            "correct_answer": "Fiscal policy",
            "explanation": "Fiscal policy involves government spending and taxation, which can be used to increase or decrease aggregate demand. Expansionary fiscal policy tools include increasing government spending, decreasing taxes, or increasing government transfers. Doing any of these things will increase aggregate demand, leading to a higher output, higher employment, and a higher price level.",
            "correct": true
        },
        {
            "question": "Which of the following factors is most likely to cause a shift in the aggregate supply curve to the right?",
            "answers": [
                "(A) A decrease in the price of oil",
                "(B) An increase in the minimum wage",
                "(C) A technological innovation",
                "(D) A natural disaster"
            ],
            "correct_answer": "(C) A technological innovation",
            "explanation": `A technological innovation can increase the productivity of firms, allowing them to produce more output at a given price level. This would shift the aggregate supply curve to the right.
            (A) A decrease in the price of oil would shift the aggregate supply curve to the left, as it would make it more expensive for firms to produce goods and services.
            (B) An increase in the minimum wage would also shift the aggregate supply curve to the left, as it would increase the cost of labor for firms.
            (D) A natural disaster would also shift the aggregate supply curve to the left, as it would disrupt production and make it more difficult for firms to produce goods and services.`,
            "correct": true
        },
        {
            "question": "How does fiscal policy affect the level of economic growth?",
            "answers": [
                "(A) By increasing government spending",
                "(B) By reducing taxes",
                "(C) By increasing the money supply",
                "(D) By decreasing the interest rate"
            ],
            "correct_answer": "(A) By increasing government spending",
            "explanation": "Fiscal policy involves the use of government spending and taxation to influence the economy. Increasing government spending can stimulate economic growth by increasing aggregate demand. Reducing taxes can also have a positive impact on economic growth by increasing disposable income and investment. However, increasing the money supply and decreasing the interest rate are typically associated with monetary policy, not fiscal policy.",
            "correct": true
        },
        {
            "question": "Which of the following is a key principle of Keynesian economics?",
            "answers": [
                "Aggregate demand is the primary determinant of output.",
                "Government spending can stimulate economic growth.",
                "Fiscal policy is more effective than monetary policy.",
                "The economy is self-correcting in the long run."
            ],
            "correct_answer": "Aggregate demand is the primary determinant of output.",
            "explanation": "Keynesian economics emphasizes the role of aggregate demand in determining economic output. Aggregate demand is the total demand for goods and services in an economy. It is the sum of consumption, investment, government spending, and net exports. Keynesian economists argue that aggregate demand is the primary determinant of output because it determines the level of production in the economy. When aggregate demand is high, businesses will produce more goods and services, and the economy will grow. When aggregate demand is low, businesses will produce less goods and services, and the economy will contract.",
            "correct": false
        }
    ],
    "Banking, Foreign Exchange, Clearing and Settlement Systems": [
        {
            "question": "Which of the following is a key challenge in cross-border payments?",
            "answers": [
                "Regulatory compliance",
                "Currency conversion",
                "Transaction fees",
                "Settlement delays"
            ],
            "correct_answer": "Regulatory compliance",
            "explanation": "Regulatory compliance is a major challenge in cross-border payments due to the different regulations and requirements in different jurisdictions. These regulations can include anti-money laundering (AML) and know-your-customer (KYC) requirements, as well as restrictions on the flow of funds. Failure to comply with these regulations can result in fines, penalties, and even criminal prosecution.",
            "correct": true
        },
        {
            "question": "Which of the following organizations is responsible for facilitating cross-border payments?",
            "answers": [
                "SWIFT",
                "Visa",
                "Mastercard",
                "PayPal"
            ],
            "correct_answer": "SWIFT",
            "explanation": "SWIFT (Society for Worldwide Interbank Financial Telecommunication) is a global network that connects banks and financial institutions, enabling them to send and receive secure financial messages, including cross-border payment instructions. SWIFT facilitates cross-border payments by providing a standardized and secure messaging system that allows banks to communicate with each other and exchange payment instructions. This enables banks to process cross-border payments efficiently and securely, ensuring that funds are transferred between accounts in different countries in a timely and reliable manner.",
            "correct": true
        },
        {
            "question": "Which of the following is NOT a challenge associated with international money transfers?",
            "answers": [
                "High transaction fees",
                "Slow processing times",
                "Currency exchange rate fluctuations",
                "Lack of transparency"
            ],
            "correct_answer": "Lack of transparency",
            "explanation": "International money transfers are typically transparent, as they are subject to regulations and reporting requirements.",
            "correct": false
        },
        {
            "question": "Which of the following is a potential benefit of Central Bank Digital Currencies (CBDCs)?",
            "answers": [
                "Increased financial inclusion",
                "Reduced transaction costs",
                "Enhanced security",
                "All of the above"
            ],
            "correct_answer": "All of the above",
            "explanation": "Central Bank Digital Currencies (CBDCs) are digital forms of fiat currencies issued by central banks. They have the potential to offer several benefits, including:\n\n    * **Increased financial inclusion:** CBDCs can make it easier for people who do not have access to traditional banking services to participate in the financial system. This is because CBDCs can be used to make payments and store value without the need for a bank account.\n    * **Reduced transaction costs:** CBDCs can reduce transaction costs by eliminating the need for intermediaries such as banks and credit card companies. This can make it cheaper for businesses to accept payments and for consumers to make purchases.\n    * **Enhanced security:** CBDCs can be more secure than traditional fiat currencies because they are based on blockchain technology. Blockchain is a distributed ledger system that makes it very difficult to counterfeit or hack CBDCs.",
            "correct": true
        },
        {
            "question": "Which of the following is a primary function of a central bank?",
            "answers": ["Setting interest rates", "Printing money", "Regulating banks", "All of the above"],
            "correct_answer": "All of the above",
            "explanation": "Central banks are responsible for managing a country's monetary policy, which includes setting interest rates, printing money, and regulating banks. \n\n* **Setting interest rates:** Central banks set interest rates to influence the cost of borrowing and lending in the economy. Higher interest rates make it more expensive to borrow money, which can slow down economic growth. Lower interest rates make it cheaper to borrow money, which can stimulate economic growth.\n\n* **Printing money:** Central banks print money to increase the money supply in the economy. This can help to stimulate economic growth by making it easier for businesses to invest and hire workers. However, printing too much money can lead to inflation, which is a general increase in prices.\n\n* **Regulating banks:** Central banks regulate banks to ensure that they are safe and sound. This includes setting capital requirements, which are the amount of money that banks must hold in reserve. Central banks also supervise banks to make sure that they are not taking on too much risk.",
            "correct": true
        }     
    ],
    "Message Authentication Code and Digital Certificate": [
        {
            "question": "What is a Message Authentication Code (MAC)?",
            "answers": [
                "(A) A cryptographic hash function",
                "(B) A symmetric encryption algorithm",
                "(C) A digital signature",
                "(D) A one-time password"
            ],
            "correct_answer": "(B) A symmetric encryption algorithm",
            "explanation": "A Message Authentication Code (MAC) is a cryptographic algorithm that generates a short, fixed-length code that is used to authenticate a message. The MAC is generated using a secret key that is shared between the sender and receiver of the message. When the receiver receives the message, they can use the MAC to verify that the message came from the sender and that it has not been tampered with. Symmetric encryption algorithms are used to encrypt and decrypt data using the same key. This makes them faster and more efficient than asymmetric encryption algorithms, which use different keys for encryption and decryption. MACs are typically used to protect the integrity of messages, such as financial transactions or medical records.",
            "correct": true
        },
        {
            "question": "Which of the following is NOT a benefit of using digital certificates?",
            "answers": ["(A) Authentication", "(B) Non-repudiation", "(C) Confidentiality", "(D) Integrity"],
            "correct_answer": "(C) Confidentiality",
            "explanation": "Digital certificates do not provide confidentiality. They are primarily used for authentication, non-repudiation, and integrity. Confidentiality is typically achieved through the use of encryption algorithms.",
            "correct": true
        },
        {
            "question": "Which of the following is a limitation of using symmetric encryption for secure communication?",
            "answers": [
                "Data confidentiality",
                "Key distribution",
                "Message integrity",
                "Computational complexity"
            ],
            "correct_answer": "Key distribution",
            "explanation": "Symmetric encryption requires the sender and receiver to share a secret key, which can be difficult to distribute securely. \n    If the key is intercepted by an unauthorized party, they can decrypt the messages. \n    Therefore, key distribution is a major limitation of using symmetric encryption for secure communication.",
            "correct": true
        },
        {
            "question": "Which of the following is a benefit of using a digital signature?",
            "answers": [
                "(A) Provides non-repudiation",
                "(B) Encrypts message content",
                "(C) Ensures message confidentiality",
                "(D) Verifies message authenticity",
            ],
            "correct_answer": "(A) Provides non-repudiation",
            "explanation": "Digital signatures provide two main benefits: authentication and non-repudiation. \n    Authentication ensures that the message came from the claimed sender, while non-repudiation ensures that the sender cannot deny having sent the message. \n    Encryption, message confidentiality, and message authenticity are all benefits of other cryptographic techniques.",
            "correct": true
        },
        {
            "question": "Which of the following is NOT a type of cryptographic attack?",
            "answers": [
                "(A) Brute-force attack",
                "(B) Man-in-the-middle attack",
                "(C) Replay attack",
                "(D) Denial-of-service attack"
            ],
            "correct_answer": "(D) Denial-of-service attack",
            "explanation": "Denial-of-service attacks are not cryptographic attacks. They are network attacks that aim to disrupt the availability of a service or resource. Cryptographic attacks, on the other hand, are designed to break or bypass cryptographic algorithms or protocols.",
            "correct": true
        }
    ]
}

const str_result = JSON.stringify(result)

fs.writeFileSync("./my_app.json", str_result)