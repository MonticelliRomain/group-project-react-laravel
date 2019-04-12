import React, { Component } from 'react';
import CarouselContent from './util/carousel';
import DisplayAll from './display-all';

export default class Home extends Component {
    render() {

        return (
            <div>
                <div>
                    <CarouselContent />
                </div>

                <DisplayAll />

            </div>

        )
    }
}
