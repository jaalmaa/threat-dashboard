import React, { Component } from 'react';

export class UrlVT extends Component {

    render() {

        if (this.props.data.error) {
            return(
                <span>URL not found</span>
            )
        }

        else {

            var url = this.props.url

            if (url.startsWith('https://')) {
                url = url.slice('https://'.length)
            }
            
            else if (url.startsWith('http://')) {
                url = url.slice('http://'.length)
            }

            url = url.split("/")[0]

            var gui_link = "https://www.virustotal.com/gui/domain/" + url

            return(
                <a href={gui_link}>VT: { this.props.data.data.attributes.last_analysis_stats.malicious } detections</a>
            )

        }
    }

}

export class HashVT extends Component {

    render() {

        if (this.props.data.error) {
            return(
                <span>Hash not found</span>
            )
        }

        else {

            var gui_link = "https://www.virustotal.com/gui/file/" + this.props.hash

            return(
                <a href={gui_link}>VT: { this.props.data.data.attributes.last_analysis_stats.malicious } detections</a>
            )
        }
    }

}

