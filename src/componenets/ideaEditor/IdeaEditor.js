import React, { Component, Fragment } from 'react';
import './ideaEditor.scss';

class IdeaEditor extends Component {
    constructor(props) {
        super(props);

        this.state ={
            id: null,
            date: '',
            name: '',
            description: '',
            rating: '',
            category: '',
            outcome: ''
        }
    }

    componentDidMount () {
        if (this.props.id) {
            this.setState({ 
                id: this.props.id,
                name: this.props.name,
                description: this.props.description,
                rating: this.props.rating,
                category: this.props.category,
                outcome: this.props.outcome
            })
        }     
    }

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    render () {
        const { toggleEditor, createName, createCategory, createDescription, createOutcome, createRating, submitIdea, date, deleteIdea, updateIdea, notifications } = this.props;

        return (
            <div className='editor'>
                <form className='editor-form'>
                    <p className='editor-form__close-btn' onClick={ () => toggleEditor(false) }>Close</p>
                    <h2 className='editor-form__title'>Craft your idea:</h2>
                    <label className='editor-form__label'>
                        
                        <input className='editor-form__input' type="text" name="name" defaultValue={this.state.name} placeholder='name it' onChange={ (e) => createName(e) }/>
                    </label>

                    <label className='editor-form__label'>
                        
                        <textarea className='editor-form__textarea' rows='5' name='description' defaultValue={this.state.description} placeholder='describe it' onChange={ (e) => createDescription(e) }></textarea>
                    </label>

                    <label className='editor-form__label'>Category: 
                    <p className='editor-form__label editor-form__label--highlighted'>{this.state.category}</p>
                        <select className='editor-form__select' name='category' defaultValue={this.state.category} onChange={ (e) => createCategory(e) }>
                            {
                                this.props.firebaseCategories.map((category, i) => <option key={i} value={category}>{category}</option>)
                            }
                        </select>
                    </label>
                    
                    <label className='editor-form__label'>Rated as: 
                        <p className='editor-form__label editor-form__label--highlighted'>{this.state.rating}</p>
                        <select className='editor-form__select' name='rating' defaultValue={this.state.rating} onChange={ (e) => createRating(e) }>
                            <option defaultValue value="Just an idea">Just an idea</option>
                            <option value="Maybe">Maybe</option>
                            <option value="Worth trying">Worth trying</option>
                            <option value="Major GO!">Go!</option>
                            <option value="EPIC!">Epic!</option>
                        </select>
                    </label>

                    <label className='editor-form__label'>
                        <textarea className='editor-form__textarea' rows='5' name='outcome' defaultValue={this.state.outcome} placeholder='Outcome: e.g. I think this is going to be major, major GO!'
                        onChange={ (e) => createOutcome(e) }>
                        </textarea>
                    </label>
                    {
                        this.state.name !== ''
                        ? 
                            <Fragment>
                                <input className='editor-form__submit-btn' type="button" value="Update" onClick={ () => updateIdea() }/>
                                <input className='editor-form__submit-btn' type="button" value="Delete this idea" onClick={ () => deleteIdea() }/>
                                <p>Idea created: { date.slice(0, 21) }</p>
                            </Fragment>       
                        : 
                            <Fragment>
                                <input className='editor-form__submit-btn' type="submit" value="Save idea" onClick={ (e) => submitIdea(e) }/>
                            </Fragment>
                    }
                </form>
                <div className='editor__validate-notifications'>
                    {
                         notifications.length > 0
                        ?
                        notifications.map((note, i) => <p key={i} className='editor__validate-notifications__ptag'>{note}</p>)
                        : <Fragment></Fragment>
                    }
                </div>
            </div>
        )
    }
}

export default IdeaEditor;