const trainingModules = {
    video: [
        {
            id: "v1",
            title: "Identifying Suspicious Email Headers",
            description: "Learn how to analyze email headers to spot phishing attempts before opening them.",
            duration: "4 mins",
            level: "Beginner",
            thumbnail: "https://i.postimg.cc/rpNcf706/email-header.jpg",
            type: "video",
            popular: true,
            videoUrl: "https://www.youtube.com/embed/U7tbJVSInvo?si=Y8y89nIyVV2rE7F0"
        },
        {
            id: "v2",
            title: "Spotting Fake URLs and Domains",
            description: "Master the techniques to identify malicious URLs and lookalike domains.",
            duration: "6 mins",
            level: "Intermediate",
            thumbnail: "https://i.postimg.cc/bwQjv4RG/fake-url.jpg",
            type: "video",
            popular: true,
            videoUrl: "https://www.youtube.com/embed/Th7nu3aTqLs?si=aaUqKZJKswcE-Ifo"
        },
        {
            id: "v3",
            title: "Social Engineering Tactics Explained",
            description: "Understand the psychological tricks attackers use to manipulate victims.",
            duration: "7 mins",
            level: "Intermediate",
            thumbnail: "https://i.postimg.cc/MT3C4wzL/social-eng.jpg",
            type: "video",
            popular: false,
            videoUrl: "https://www.youtube.com/embed/v7VTJhkJUUY?si=zVGzpVN1xHKcw09G"
        },
        {
            id: "v4",
            title: "Protecting Your Digital Identity",
            description: "Essential practices to safeguard your personal information online.",
            duration: "14 mins",
            level: "Advanced",
            thumbnail: "https://i.postimg.cc/g0DYhvvH/image.png",
            type: "video",
            popular: false,
            videoUrl: "https://www.youtube.com/embed/HMJJygiOjhk?si=bMy1vDBLEntvA1R7"
        },
        {
            id: "v5",
            title: "Advanced Email Security Features",
            description: "Learn how to leverage built-in security features in modern email clients.",
            duration: "14 min",
            level: "Advanced",
            thumbnail: "https://i.postimg.cc/vZwMSPhv/image.png",
            type: "video",
            popular: false,
        },
    ],
    text: [
        {
            id: "t1",
            title: "The Anatomy of a Phishing Email",
            description: "A comprehensive breakdown of common elements found in phishing attempts.",
            readTime: "5 min read",
            level: "Beginner",
            icon: "mail",
            type: "text",
            thumbnail: "https://i.postimg.cc/0jC3WfyV/image.png",
            popular: true,
            content: {
                sections: [
                    {
                        title: "Introduction",
                        content: "Phishing emails are messages that try to trick you into revealing personal information, like passwords or banking details. They often look real but have sneaky signs that give them away."
                    },
                    {
                        title: "Common Signs of a Phishing Email",
                        content: "1. Suspicious Sender – The email might come from an address that looks familiar but is slightly different. Scammers try to imitate trusted companies.\n\n2. Urgent or Scary Messages – If an email says, \"Your account will be locked unless you act now!\" it's likely fake. Scammers use fear to make people rush.\n\n3. Links to Fake Websites – They might ask you to click a link that leads to a fake website where they steal your information.\n\n4. Poor Spelling and Grammar – Legitimate companies carefully check their emails for errors. If an email has many mistakes, it's suspicious.\n\n5. Unexpected Attachments – Phishing emails often include strange attachments. These files may contain viruses that can harm your computer or phone."
                    },
                    {
                        title: "How to Stay Safe",
                        content: "1. Think Before You Click – Never click on links or download attachments from unexpected emails.\n\n2. Verify the Sender – If the email seems suspicious, contact the company directly through their official website, NOT the email provided in the message.\n\n3. Use Strong Passwords – Secure your accounts with unique passwords, and turn on two-factor authentication (2FA) for extra protection.\n\n4. Report Phishing Attempts – If you receive a phishing email, report it to your email provider or IT team."
                    },
                    {
                        title: "Conclusion",
                        content: "Phishing scams are common, but with the right knowledge, you can protect yourself. Stay alert, and always double-check messages before responding!"
                    }
                ]
            }
        },
        {
            id: "t2",
            title: "Red Flags in Business Email Compromise",
            description: "Learn to identify suspicious requests from seemingly legitimate business contacts.",
            readTime: "8 min read",
            level: "Intermediate",
            icon: "alert",
            thumbnail: "https://i.postimg.cc/4yFvx7LJ/image.png",
            type: "text",
            popular: true,
            content: {
                sections: [
                    {
                        title: "Introduction to Business Email Compromise",
                        content: "Business Email Compromise (BEC) is a sophisticated form of phishing that targets companies and their employees. It's a scam where attackers pretend to be someone you trust—like your boss, a supplier, or a client—to trick you into sending money or sharing sensitive information. These scams can look real, but there are warning signs to watch for.\n\nBEC attacks have evolved significantly over the years, becoming more sophisticated and harder to detect. They often involve careful research and social engineering to appear legitimate."
                    },
                    {
                        title: "Common Signs of a BEC Scam",
                        content: "1. Unexpected Payment Requests – If an email asks you to transfer money or change payment details, be careful. Always double-check with the real person using a trusted phone number.\n\n2. Urgency and Pressure – Scammers want you to act fast so you don't have time to think. They may say things like, \"This must be done immediately!\"\n\n3. Slightly Different Email Addresses – Attackers create emails that look almost right but have tiny changes, like \"john.smith@company.com\" vs. \"john.srnith@company.com\" (notice the small spelling change).\n\n4. Unusual Wording or Tone – If the email sounds different from how the sender usually writes—short sentences, missing details, or odd language—it could be a scam.\n\n5. Fake Invoices or Documents – If an email includes a payment request or contract you weren't expecting, verify it first before taking action.\n\n6. New Bank Details – Be cautious if an email suddenly says to send money to a different account. Always confirm with a phone call or separate email sent to an address you know is safe."
                    },
                    {
                        title: "Advanced BEC Techniques",
                        content: "1. CEO Fraud – Attackers impersonate company executives to authorize fraudulent transactions.\n\n2. Vendor Email Compromise – Scammers target the supply chain by impersonating trusted vendors.\n\n3. Attorney Impersonation – Fraudsters pose as lawyers to add legitimacy to their requests.\n\n4. Data Theft – BEC attacks that focus on stealing sensitive information rather than money.\n\n5. Multi-Stage Attacks – Complex scams that involve multiple steps and targets."
                    },
                    {
                        title: "How to Protect Yourself",
                        content: "1. Verify Before Sending Money – Always confirm big transactions directly with the person or company.\n\n2. Check Email Addresses Closely – Even small spelling differences can mean it's fake.\n\n3. Don't Click Suspicious Links or Attachments – They may install malware or steal your login information.\n\n4. Turn On Multi-Factor Authentication (MFA) – This adds an extra security step when logging in.\n\n5. Report Suspicious Emails – If an email feels off, report it to your IT team or email provider."
                    },
                    {
                        title: "Response and Recovery",
                        content: "1. Immediate Actions – Steps to take when you suspect a BEC attack.\n\n2. Communication Protocol – How to alert relevant parties about potential fraud.\n\n3. Documentation – What information to gather for investigation.\n\n4. Recovery Process – Steps to recover from a successful BEC attack.\n\n5. Prevention Measures – How to strengthen defenses against future attacks."
                    },
                    {
                        title: "Case Studies and Examples",
                        content: "1. Real-World Examples – Analysis of successful BEC attacks.\n\n2. Common Scenarios – Typical situations where BEC attacks occur.\n\n3. Warning Signs – How to identify potential BEC attempts.\n\n4. Prevention Success Stories – Examples of successful BEC prevention.\n\n5. Lessons Learned – Key takeaways from past incidents."
                    },
                    {
                        title: "Conclusion",
                        content: "BEC scams rely on tricking people, but if you stay cautious and double-check emails, you can avoid falling for them. Stay sharp, and always question unexpected requests! Remember that prevention is always better than recovery, and staying informed about the latest BEC techniques is crucial for maintaining security."
                    }
                ]
            }
        },
        {
            id: "t3",
            title: "Phishing Response Protocol",
            description: "Step-by-step guide on what to do when you encounter a suspected phishing attempt.",
            readTime: "6 min read",
            level: "Beginner",
            icon: "shield",
            thumbnail: "/images/phishing-anatomy-thumbnail.jpg",
            type: "text",
            popular: false,
            content: {
                sections: [
                    {
                        title: "Introduction",
                        content: "When you encounter a suspected phishing attempt, it's crucial to know exactly what to do. This guide will walk you through the proper response protocol to protect yourself and your organization."
                    },
                    {
                        title: "Immediate Actions",
                        content: "1. Don't Click Anything – If you receive a suspicious email, don't click any links or download any attachments.\n\n2. Don't Reply – Never respond to a suspected phishing email, even to say 'no' or 'stop'.\n\n3. Don't Forward – Avoid forwarding the email to others, as this could spread the threat.\n\n4. Don't Delete – Keep the email for reporting purposes, but mark it as spam in your email client."
                    },
                    {
                        title: "Reporting Steps",
                        content: "1. Report to IT – Forward the email to your IT security team or help desk.\n\n2. Use Report Button – Most email clients have a 'Report Phishing' or 'Report Spam' button.\n\n3. Document Details – Note the time you received the email and any actions you took.\n\n4. Alert Colleagues – If the phishing attempt targets your organization, warn your team."
                    },
                    {
                        title: "Follow-up Actions",
                        content: "1. Change Passwords – If you clicked any links or entered information, change your passwords immediately.\n\n2. Check Accounts – Review your accounts for any suspicious activity.\n\n3. Enable 2FA – If not already enabled, set up two-factor authentication.\n\n4. Update Security Software – Ensure your security software is up to date."
                    },
                    {
                        title: "Prevention Tips",
                        content: "1. Stay Informed – Keep up with the latest phishing tactics.\n\n2. Regular Training – Participate in security awareness training.\n\n3. Verify Sources – Always verify the sender's identity before taking action.\n\n4. Use Security Tools – Keep your security software and systems updated."
                    }
                ]
            }
        },
        {
            id: "t4",
            title: "Secure Password Management",
            description: "Best practices for creating and managing strong, unique passwords.",
            readTime: "7 min read",
            level: "Beginner",
            icon: "lock",
            thumbnail: "/images/phishing-anatomy-thumbnail.jpg",
            type: "text",
            popular: false,
            content: {
                sections: [
                    {
                        title: "Introduction",
                        content: "Strong password management is essential for protecting your digital accounts. This guide will help you understand how to create and maintain secure passwords."
                    },
                    {
                        title: "Creating Strong Passwords",
                        content: "1. Length Matters – Use at least 12 characters in your passwords.\n\n2. Mix Characters – Include uppercase and lowercase letters, numbers, and symbols.\n\n3. Avoid Common Words – Don't use easily guessable information like birthdays or names.\n\n4. Be Unique – Use different passwords for each account.\n\n5. Use Passphrases – Consider using a memorable phrase with numbers and symbols."
                    },
                    {
                        title: "Password Management Tools",
                        content: "1. Password Managers – Use trusted tools to store and generate passwords.\n\n2. Two-Factor Authentication – Enable 2FA whenever possible.\n\n3. Regular Updates – Change passwords periodically.\n\n4. Secure Storage – Never store passwords in plain text or share them via email."
                    },
                    {
                        title: "Best Practices",
                        content: "1. Regular Audits – Review and update weak passwords.\n\n2. Recovery Options – Set up secure account recovery methods.\n\n3. Safe Sharing – Use secure methods if you must share passwords.\n\n4. Stay Updated – Keep up with password security recommendations."
                    }
                ]
            }
        },
        {
            id: "t5",
            title: "Advanced Threat Analysis",
            description: "Technical deep-dive into analyzing suspicious emails and attachments.",
            readTime: "12 min read",
            level: "Advanced",
            icon: "search",
            type: "text",
            popular: false,
            thumbnail: "/images/phishing-anatomy-thumbnail.jpg",
            content: {
                sections: [
                    {
                        title: "Introduction",
                        content: "Advanced threat analysis requires a deep understanding of email security and attack patterns. This guide will help you identify sophisticated phishing attempts that might bypass basic security measures."
                    },
                    {
                        title: "Email Header Analysis",
                        content: "1. SPF Records – Learn to verify Sender Policy Framework records.\n\n2. DKIM Signatures – Understand DomainKeys Identified Mail validation.\n\n3. DMARC Policies – Analyze Domain-based Message Authentication.\n\n4. Header Chain – Track the complete path of an email.\n\n5. IP Reputation – Check sender IP addresses against known threats."
                    },
                    {
                        title: "Attachment and Link Analysis",
                        content: "1. File Verification – Identify potentially malicious file types.\n\n2. URL Analysis – Break down URLs to spot suspicious domains.\n\n3. Content Inspection – Look for malicious code or scripts.\n\n4. Safe Testing – Learn how to safely test suspicious attachments.\n\n5. Hash Checking – Use file hashes to identify known threats."
                    },
                    {
                        title: "Advanced Detection",
                        content: "1. Behavior Analysis – Identify automated or malicious patterns.\n\n2. Social Engineering – Spot sophisticated manipulation attempts.\n\n3. Technical Anomalies – Recognize unusual characteristics.\n\n4. Threat Intelligence – Use threat feeds and databases.\n\n5. Machine Learning – Understand AI-based threat detection."
                    },
                    {
                        title: "Response and Mitigation",
                        content: "1. Incident Response – Steps to take when a threat is identified.\n\n2. Containment – How to prevent the spread of malicious content.\n\n3. Documentation – How to report security incidents.\n\n4. Analysis – Learning from security events.\n\n5. Policy Updates – Adapting security measures."
                    }
                ]
            }
        },
    ],
}

export default trainingModules
