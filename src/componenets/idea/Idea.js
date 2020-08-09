import React, { Component, Fragment } from 'react';
import './idea.scss';
import '../home/home.scss';
import IdeaEditor from '../ideaEditor/IdeaEditor';
import { database } from '../../firebase/config';

class Idea extends Component {
    constructor(props) {
        super(props);

        this.state ={
            showEditor: false,
            ideaReference: '',
            id: 1,
            date: '',
            name: '',
            description: '',
            rating: '',
            category: '',
            outcome: ''
        }
    }

    toggleEditor (p) {
        this.setState({ showEditor: p });
    }

    createName = (e) => {
        this.setState({ name: e.target.value });
    }

    createDescription = (e) => {
        this.setState({ description: e.target.value });
    }

    createRating = (e) => {
        this.setState({ rating: e.target.value });
    }

    createCategory = (e) => {
        this.setState({ category: e.target.value });
    }

    createOutcome = (e) => {
        this.setState({ outcome: e.target.value });
    }

    deleteIdea (ideaReference) {
        let ideaInDb = database.ref(`ideas/${ideaReference}`);
        ideaInDb.remove();

        this.toggleEditor(false);
        this.props.hardReload();
    }

    updateIdea (ideaReference) {
        const { name, description, rating, category, outcome } = this.state;

        let ideaInDb = database.ref(`ideas/${ideaReference}`);
        ideaInDb.update({
            'name': name,
            'description': description,
            'rating': rating,
            'category': category,
            'outcome': outcome
        });

        this.toggleEditor(false);
        this.props.hardReload();
    }

    componentDidMount () {
        this.setState({
            ideaReference: this.props.ideaRef,
            date: this.props.idea.date,
            name: this.props.idea.name,
            description: this.props.idea.description,
            rating: this.props.idea.rating,
            category: this.props.idea.category,
            outcome: this.props.idea.outcome,
        });
    }

    render () {
        const { idea, ideaRef } = this.props;
        const { id, date, name, description, rating, category, outcome } = this.state;

        return (
            <Fragment>
                <div className='home__add-idea home__add-idea--template home__add-idea--editable' onClick={() => this.toggleEditor(true)}>
                    <h1 className='home__add-idea__plus home__add-idea__plus--template'> {idea.name} </h1>
                    <p className='home__add-idea__plus home__add-idea__plus--template'>this idea is {idea.rating} </p>
                    <p className='home__add-idea__plus home__add-idea__plus--template'>{idea.category} </p>
                </div>
                {
                    this.state.showEditor
                    ? <IdeaEditor 
                        toggleEditor={(e) => this.toggleEditor(e)}
                        deleteIdea ={() => this.deleteIdea(ideaRef)}
                        updateIdea={() => this.updateIdea(ideaRef)}
                        createName={ (e) => this.createName(e) }
                        createCategory={ (e) => this.createCategory(e) }
                        createDescription={ (e) => this.createDescription(e) }
                        createOutcome={ (e) => this.createOutcome(e) }
                        createRating={ (e) => this.createRating(e) }
                        id={id}
                        date={date}
                        name={name}
                        description={description}
                        rating={rating}
                        category={category}
                        outcome={outcome}
                        notifications={[]}
                        firebaseCategories={this.props.categories}
                    />
                    : <Fragment></Fragment>
                }
                
            </Fragment>   
        )
    }
}

export default Idea;