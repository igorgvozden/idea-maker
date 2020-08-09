import React, { Component, Fragment } from 'react';
import './home.scss';
import IdeaEditor from '../ideaEditor/IdeaEditor';
import { database } from '../../firebase/config';
import Idea from '../idea/Idea';

class Home extends Component {
    constructor (props) {
        super(props);

        this.state = {
            firebaseIdeasRefs: [],
            firebaseIdeas: [],
            firebaseCategories: [],
            showEditor: false,
            id: null,
            date: new Date(),
            name: '',
            description: '',
            rating: '',
            category: '',
            outcome: '',
            notifications: []
        }
    }

    toggleEditor (p) {
        this.setState({ 
            showEditor: p, 
            notifications: [] 
        });   
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

    refreshComponent () {
        this.setState({ state: this.state });
    }

    hardReload = () => {
        window.location.reload(false); 
    }

    validateForm = (state) => {
        let validator = true;
        let notifications = [];

        if (state.name.length < 1) {
            validator = false;
            notifications.push('Your idea should have a Name');
        }
        state.firebaseIdeas.forEach(idea => {
            if (state.name === idea.name) {
                notifications.push('That idea Name already exists');
                validator = false;
            }
        });
        if (state.description.length < 1) {
            validator = false;
            notifications.push('Describe your idea');
        }
        if (state.category === '') {
            validator = false;
            notifications.push('Choose a Category');
        }
        if (state.rating === '') {
            validator = false;
            notifications.push('Choose a Rating');
        }
        if (state.outcome.length < 1) {
            validator = false;
            notifications.push('What is expected Outcome?');
        }
        if (validator === false) {
            return notifications;
        }
        return validator;
    }

    submitIdea = (e) => {
        e.preventDefault();

        const { id, name, description, rating, category, outcome} = this.state;

        if (this.validateForm(this.state) === true) {
            database.ref('ideas').push({
                id: id,
                name: name,
                date: String(new Date()),
                description: description,
                rating: rating,
                category: category,
                outcome: outcome
            });
            this.toggleEditor(false); 
        } else {
            this.setState({ notifications: this.validateForm(this.state) })
        }   
    }

    componentDidMount() {
        let items = [];
        let itemsrefs = [];

        database.ref('ideas').on('child_added', async function(dataSnapshot) {
            items.push(dataSnapshot.val());
            itemsrefs.push(dataSnapshot.key)
            await this.setState({
              firebaseIdeas: items,
              firebaseIdeasRefs: itemsrefs
            });
          }.bind(this));

          let categories = [];
          let categoriesRefs = [];

          database.ref('categories').on('child_added', async function(dataSnapshot) {
            categories.push(dataSnapshot.val());
            categoriesRefs.push(dataSnapshot.key)
            await this.setState({
              firebaseCategories: categories,
              firebaseCategoriesRefs: categoriesRefs
            });
          }.bind(this));
    }

    render () {

        return(
            <Fragment>
                <div className='home'>
                    <div className='home__add-idea__container'>
                        <div className='home__add-idea home__add-idea--first' onClick={() => this.toggleEditor(true)}>
                            <h1 className='home__add-idea__plus'> + <br/><span className='home__add-idea__plus-span'>add idea</span></h1>
                        </div>
                    </div>
                     {
                         this.state.firebaseIdeas.length > 0
                         ? this.state.firebaseIdeas.map((idea, i) => {
                             return (
                                <Idea 
                                    key={i} 
                                    idea={idea} 
                                    ideaRef={this.state.firebaseIdeasRefs[i]} 
                                    categories={this.state.firebaseCategories}
                                    toggleEditor={() => this.toggleEditor(true)}
                                    hardReload={() => this.hardReload()}
                                    notifications={this.state.notifications}
                                />
                             )
                         })
                         :
                            <Fragment>
                                <h4 className='home__add-idea__container-btn' onClick={ () => this.refreshComponent() }>Show saved ideas</h4>
                                <div className='home__add-idea__container'>
                                    <div className='home__add-idea home__add-idea--template'>
                                        <h1 className='home__add-idea__plus'> idea </h1>
                                    </div>

                                    <div className='home__add-idea home__add-idea--template'>
                                        <h1 className='home__add-idea__plus'> idea </h1>
                                    </div>

                                    <div className='home__add-idea home__add-idea--template'>
                                        <h1 className='home__add-idea__plus'> idea </h1>
                                    </div>

                                    <div className='home__add-idea home__add-idea--template'>
                                        <h1 className='home__add-idea__plus'> idea </h1>
                                    </div>
                                </div>
                            </Fragment>
                     }
                </div>
                {
                    this.state.showEditor
                    ?   <IdeaEditor 
                            toggleEditor={ (e) => this.toggleEditor(e) }
                            createName={ (e) => this.createName(e) }
                            createCategory={ (e) => this.createCategory(e) }
                            createDescription={ (e) => this.createDescription(e) }
                            createOutcome={ (e) => this.createOutcome(e) }
                            createRating={ (e) => this.createRating(e) }
                            submitIdea={ (e) => this.submitIdea(e) }
                            notifications={this.state.notifications}
                            firebaseCategories={this.state.firebaseCategories}
                        />
                    :   <Fragment></Fragment>
                }
                
            </Fragment>
        )
    }
}

export default Home;