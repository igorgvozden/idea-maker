import React, { Component, Fragment } from 'react';
import './sidebar.scss';
import { database } from '../../firebase/config';

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            categoriesRefs: [],
            newCategory: ''
        }
    }

    async componentDidMount() {
        let items = [];
        let itemsrefs = [];

        database.ref('categories').on('child_added', async function (dataSnapshot) {
            items.push(dataSnapshot.val());
            itemsrefs.push(dataSnapshot.key)
            await this.setState({
                categories: items,
                categoriesRefs: itemsrefs
            });
        }.bind(this));
    }

    deleteCategory (ideaReference) {
        let categoryInDb = database.ref(`categories/${ideaReference}`);
        categoryInDb.remove();

        this.hardReload();
    }

    getNewCategoryName = (e) => {
        this.setState({ newCategory: e.target.value })
    }

    addCategory = () => {
        let newNum = this.state.categories.length;

        database.ref(`categories/${newNum}`).set(this.state.newCategory);
    }

    updateCategory (ideaReference) {
        let categoryInDb = database.ref(`categories/${ideaReference}`);
        categoryInDb.set(this.state.newCategory);
    
        this.hardReload();
    }
    
    hardReload = () => {
        window.location.reload(false); 
    }

    render () {
        const { categories, categoriesRefs } = this.state;
        return (
            <div className='sidebar'>
                <h4 className='sidebar__title'>What kind of ideas you have?</h4>
                <div className='sidebar__inputs'>
                    {   categories.length > 0
                        ? categories.map((category, i) => 
                        <div className='sidebar__inputs-container' key={i}>
                            <input className='sidebar__inputs-container__input'  type='text' name={`input${i}`} defaultValue={category} onChange={(e) => this.getNewCategoryName(e)}></input>
                            <p className='sidebar__inputs-container__input-btn sidebar__inputs-container__input-btn--edit' onClick={() => this.updateCategory(categoriesRefs[i])}>Update</p>
                            <p className='sidebar__inputs-container__input-btn sidebar__inputs-container__input-btn--delete' onClick={() => this.deleteCategory(categoriesRefs[i])}>Delete</p>
                        </div>
    
                            )
                        : <Fragment></Fragment>
                    }
                    <div className='sidebar__inputs-container'>
                        <input className='sidebar__inputs-container__input'  type='text' name='addinput' onChange={(e) => this.getNewCategoryName(e)}></input>
                        <p className='sidebar__inputs-container__input-btn sidebar__inputs-container__input-btn--add' onClick={ () => this.addCategory() }>Add</p>
                    </div>  
                </div>
            </div>
        )
    }
}

export default Sidebar;