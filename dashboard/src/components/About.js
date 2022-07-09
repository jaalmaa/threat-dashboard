import React from 'react';
import './About.scss'


function AboutText() {

    /* Change the text here to alter the paragraph explaining the project. */
    const summary = `
        Threatdash is an open-source project designed to automate and present the collection, aggregation and analysis of honeypot data.
        Currently using the Cowrie honeypot, this dashboard updates as new attacks occur against these systems and presents 
        the enriched data from each attack. 
        This way the attack data and potential indicators of compromise (IOCs) are presented in a way that is easy to understand 
        without the need to review endless honeypot output logs.
        `;
    
    const paragraph2 = `
        Using the MITRE® ATT&CK framework, the analysis of the attacks against deployed honeypots is then automated and 
        classified against different technique IDs.
    `

    return (
        <div className='about-text'>
            <p>{ summary }</p>
            <p>{ paragraph2 }</p>
        </div>
    )
}

function AboutLinks() {

    const ghLogo = <svg className='icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
    return (
        <div className='links-section-container'>
            <a href="https://github.com/threatdash">{ ghLogo }</a>
        </div>
    )
}

function CopyrightNotice() {
    let year = "2022";
    return (
        <div className='copyright-footer'>
            Copyright © { year } Threatdash.
        </div>
    )
}

function About() {
    return (
        <div className='page-container'>
            <div className='page-title'>
                <h1>About Threatdash</h1>
            </div>
            <div className='page-body'>
                <AboutText />
                <hr></hr>
                <AboutLinks />
                <CopyrightNotice />
            </div>
        </div>
    );
}

export default About;