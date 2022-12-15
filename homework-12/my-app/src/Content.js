import './Content.css';
import photo from './crew-card-img-05.jpg';
import photo2x from './crew-card-img-05@2x.jpg';

function Content() {
    return (
        <div className="worker__wrap">
            <section className="worker">
                <img className="worker__img" src={photo} srcset={`${photo2x} 2x`} alt="Oksana" />
                <div className="worker__info">
                    <h1 className="title worker__info-title">Oksana Kobzar</h1>
                    <p className="worker__info-job-title">Equity partner, Attorney-at-law</p>
                    <a className="worker__info-mail worker__info--circle" href="mailto:kobzar@forstudy.space">
                        kobzar@forstudy.space
                    </a>
                    <a className="worker__info-linked worker__info--circle" href="index.html">
                        LinkedIn profile
                    </a>
                </div>
                <div className="worker__main">
                    <p className="worker__main-text">
                        Oksana heads the practice of international trade and shipping. He specializes in resolving
                        disputes related to the purchase and sale of raw materials and transportation of goods by sea.
                    </p>
                    <p className="worker__main-text">
                        Desis represents the interests of shipowners, freight forwarders, cargo owners, shipping agents,
                        container lines, as well as international banks and P&I clubs.
                    </p>
                    <p className="worker__main-title">Education</p>
                    <p className="worker__main-text">National University "Odessa Law Academy", Master of Law.</p>
                    <p className="worker__main-title">Experience</p>
                    <p className="worker__main-text">
                        Her professional experience includes resolving disputes under English law and representing
                        interests in foreign commercial arbitrations such as GAFTA, FOSFA and LMAA. Danilo also
                        represents the interests of clients in the state courts of Ukraine on similar disputes, as well
                        as in the ICAC and IAC at the CCI of Ukraine
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Content;
