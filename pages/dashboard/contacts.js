import React, {useEffect, useState} from 'react';
import ContactMessage from "../../components/ContactMessage";
import DashboardLayout from "../../components/DashboardLayout";

const Contacts = () => {
    const [messages, setMessages] = useState(null);

    useEffect(async () => {
        const response = await fetch("https://api.etucyber.com/api/contact", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "include"
        });
        const data = await response.json();

        setMessages(data.messages);
    }, []);

    return (
        <DashboardLayout>
            <React.Fragment>
                <div className="row">
                    <div className="col col-md-8 mx-auto">
                        <h2>İletişim Mesajları</h2>
                        {messages &&
                        messages.map((msg, idx) => {
                            return (
                                <ContactMessage
                                    firstName={msg.firstName}
                                    lastName={msg.lastName}
                                    message={msg.message}
                                    email={msg.email}
                                />
                            );
                        })}
                    </div>
                </div>
            </React.Fragment>
        </DashboardLayout>
    );
};

export default Contacts;
