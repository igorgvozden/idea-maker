import React from 'react';
import './navigation.scss';

function Navigation () {
    return (
        <div className='navigation'>
            <h1 className='navigation__idea-logo'>idea<span className='navigation__idea-logo__span'>*</span></h1>
            <p className='navigation__idea-text'>Never forget anyth.... um... <span className='navigation__idea-text__span'>..what was I saying again?</span></p>
        </div>
    )
}

export default Navigation;