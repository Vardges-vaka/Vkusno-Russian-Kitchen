import { PublicHeader, PublicFooter } from "../_shared_comps/_public.shared_comps.index.js";

import "./00_contact_styles/Contact.css";

const Contact = () => {
    return (
        <div className="contact">
            <PublicHeader />
            <div className="contact-content">
                <h1>Contact</h1>
            </div>
            <PublicFooter />
        </div>
    )
}

export default Contact;